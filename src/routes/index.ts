import { Router } from "express";
import jetValidator from "jet-validator";

import Paths from "../common/Paths";
import User from "@src/models/User";
import UserRoutes from "./UserRoutes";

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

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// **** Export default **** //

export default apiRouter;
