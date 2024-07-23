import { Router } from "express";
import jetValidator from "jet-validator";

import Paths from "../common/Paths";
import UserRoutes from "./UserRoutes";
import ConnectionRoutes from "./ConnectionRoutes";
import MessageRoutes from "./MessageRoutes";

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// ** Add UserRouter ** //

const userRouter = Router();

// Register one user
userRouter.post(
  Paths.Users.Register,
  // validate(["user", User.isUser])
  UserRoutes.register
);

// Login
userRouter.post(
  Paths.Users.Login,
  // validate(["user", User.isUser])
  UserRoutes.login
);

// Change user's password
userRouter.put(
  Paths.Users.ChangePsw,
  // validate(["user", User.isUser])
  UserRoutes.changePassword
);

// Validate refresh tolken
userRouter.post(
  Paths.Users.ValidateRefreshToken,
  // validate(["user", User.isUser])
  UserRoutes.validateRefreshToken
);

// Get Dummny data
userRouter.get(
  Paths.Users.DummnyData,
  // validate(["user", User.isUser])
  UserRoutes.getDummnyData
);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// Connection
const connectionRouter = Router();
// Create Connection
connectionRouter.post(Paths.Connection.Connect, ConnectionRoutes.connect);
// Get All Connections
connectionRouter.get(Paths.Connection.Query, ConnectionRoutes.query);

apiRouter.use("", connectionRouter);

// Message
const messageRouter = Router();
// Insert
messageRouter.post(Paths.Message.Insert, MessageRoutes.insertMessage);
// Query all message by connectionId
messageRouter.get(Paths.Message.Query, MessageRoutes.queryMessagesById);

apiRouter.use("", messageRouter);

// **** Export default **** //

export default apiRouter;
