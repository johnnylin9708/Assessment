/**
 * Setup express server.
 */

import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import logger from "jet-logger";
import { Server } from "socket.io";

import "express-async-errors";

import BaseRouter from "@src/routes";

import Paths from "@src/common/Paths";
import EnvVars from "@src/common/EnvVars";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import RouteError from "@src/common/RouteError";
import { NodeEnvs } from "@src/common/misc";
import { createServer } from "http";

// **** Variables **** //

const app = express();
const cors = require("cors");

const mongoose = require("mongoose");

// **** MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Check MongoDB connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan("dev"));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// CORS
app.use(cors({ origin: "*", credentials: true }));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
      logger.err(err, true);
    }
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
      status = err.status;
    }
    return res.status(status).json({ error: err.message });
  }
);
const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

// **** Export default **** //

export default app;
