import HttpStatusCodes from "@src/common/HttpStatusCodes";

import UserService from "@src/services/UserService";
import { User } from "@src/models/User";
import { IReq, IRes } from "./types/express/misc";
import { RegisterRequest } from "@src/models/RegisterRequest";
import { LoginRequest } from "@src/models/LoginRequest";
import { ChangePswRequest } from "@src/models/ChangePswRequest";
import { ValidateRefreshTokenRequest } from "@src/models/ValidateRefreshTokenRequest";

// **** Functions **** //

/**
 * Register.
 */
async function register(req: IReq<RegisterRequest>, res: IRes) {
  const registerReqBody = req.body;

  const apiRes = await UserService.register(registerReqBody);

  return res.status(apiRes.httpCode).json(apiRes);
}

/**
 * Change Password.
 */
async function changePassword(req: IReq<ChangePswRequest>, res: IRes) {
  const changePswReqBody = req.body;

  const apiRes = await UserService.changePassword(changePswReqBody);
  return res.status(apiRes.httpCode).json(apiRes);
}

/**
 * Login.
 */
async function login(req: IReq<LoginRequest>, res: IRes) {
  const loginReqBody = req.body;

  const apiRes = await UserService.login(loginReqBody);
  return res.status(apiRes.httpCode).json(apiRes);
}

/**
 * Validate Refresh Token.
 */
async function validateRefreshToken(
  req: IReq<ValidateRefreshTokenRequest>,
  res: IRes
) {
  const validateRefreshTokenReqBody = req.body;

  const apiRes = await UserService.validateRefreshToken(
    validateRefreshTokenReqBody
  );
  return res.status(apiRes.httpCode).json(apiRes);
}

// **** Export default **** //

export default {
  register,
  login,
  changePassword,
  validateRefreshToken,
} as const;
