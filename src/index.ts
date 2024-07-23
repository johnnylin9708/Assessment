import "./pre-start"; // Must be the first import
import logger from "jet-logger";

import EnvVars from "@src/common/EnvVars";
import server from "./server";
import { Server } from "socket.io";

// **** Run **** //

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

const app = server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
// socket
const io = new Server(app, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    socket.join(userId);
  });

  socket.on("chatMessage", (data) => {
    io.to(data.receiverId).emit("chatMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
