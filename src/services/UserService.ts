import RouteError from "@src/common/RouteError";
import HttpStatusCodes from "@src/common/HttpStatusCodes";

import UserRepo from "@src/repos/UserRepo";
import { User } from "@src/models/User";
import { RegisterRequest } from "@src/models/RegisterRequest";
import { ApiResponse } from "@src/models/ApiResponse";
import { LoginRequest } from "@src/models/LoginRequest";
import { LoginResponse } from "@src/models/LoginResponse";
import { UserDocument } from "@src/repos/mongodb";
import { ChangePswRequest } from "@src/models/ChangePswRequest";
import { ValidateRefreshTokenRequest } from "@src/models/ValidateRefreshTokenRequest";
import { ValidateRefreshTokenResponse } from "@src/models/ValidateRefreshTokenRespone";

// **** Variables **** //

export const USER_NOT_FOUND_ERR = "User not found";
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// **** Functions **** //

/**
 * password encryption
 */
function hashPassword(password: string, salt: string) {
  const hash = crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
  return hash;
}

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

/**
 * UUID
 */
function generateUserId() {
  return uuidv4();
}

/**
 * token generation and validation
 */

function generateAccessToken() {
  const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN };

  return jwt.sign({}, process.env.JWT_SECRET, options);
}
function verifyAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function refreshAccessToken() {
  return jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
}

function generateRefreshToken() {
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN };

  return jwt.sign({}, secret, options);
}

function verifyRefreshToken(token: string) {
  const secret = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Register one user.
 */
async function register(registerReq: RegisterRequest): Promise<ApiResponse> {
  const isExisted = await UserRepo.findUser(registerReq);

  if (isExisted) {
    return { httpCode: 409, apiMsg: "username is existed" };
  }
  const salt = generateSalt();
  registerReq.password = hashPassword(registerReq.password, salt);

  const userObj: User = {
    ...registerReq,
    userid: generateUserId(),
    ps: salt,
    isActive: true,
  };

  await UserRepo.insertUser(userObj);
  return { httpCode: 201, apiMsg: "register successfully" };
}

/**
 * Login.
 */
async function login(loginReq: LoginRequest): Promise<LoginResponse> {
  const existedUser = await UserRepo.findUser(loginReq);

  if (existedUser && existedUser.ps) {
    const hashPsw = hashPassword(loginReq.password, existedUser.ps);

    if (
      hashPsw === existedUser.password &&
      loginReq.username === existedUser.username
    ) {
      return {
        httpCode: 200,
        apiMsg: "login successfully",
        accessToken: generateAccessToken(),
        refreshToken: generateRefreshToken(),
      };
    } else {
      return { httpCode: 204, apiMsg: "invalid password" };
    }
  }

  return { httpCode: 204, apiMsg: "invalid username" };
}

/**
 * Change Password.
 */
async function changePassword(
  changePwsReq: ChangePswRequest,
  accessToken: string
): Promise<ApiResponse> {
  const verifyRes = verifyAccessToken(accessToken);

  if (!verifyRes.success) {
    return { httpCode: 401, apiMsg: verifyRes.error };
  }

  const userObj = {
    username: changePwsReq.username,
    password: changePwsReq.oldPassword,
  };

  const existedUser = await UserRepo.findUser(userObj);

  if (!existedUser || !existedUser.ps) {
    return { httpCode: 204, apiMsg: "can't find this user" };
  }
  const isOldPswMatched =
    hashPassword(changePwsReq.oldPassword, existedUser.ps) ===
    existedUser.password;
  if (!isOldPswMatched) {
    return { httpCode: 409, apiMsg: "old password is invalid" };
  }
  const salt = generateSalt();

  const newUserObj = {
    userid: existedUser.userid,
    username: existedUser.username,
    password: hashPassword(changePwsReq.newPassword, salt),
    ps: salt,
  };
  UserRepo.updateUser(newUserObj);

  return { httpCode: 200, apiMsg: "password changed successfully" };
}

/**
 * Validate refresh token then generate a new JWT token.
 */
async function validateRefreshToken(
  validateRefreshTokenReq: ValidateRefreshTokenRequest
): Promise<ValidateRefreshTokenResponse> {
  const verifyRes = verifyRefreshToken(validateRefreshTokenReq.refreshToken);
  if (!verifyRes.success) {
    return { httpCode: 401, apiMsg: verifyRes.error };
  }

  return {
    httpCode: 200,
    apiMsg: "generate new token successfully",
    accessToken: refreshAccessToken(),
  };
}

// **** Export default **** //

export default {
  register,
  login,
  changePassword,
  validateRefreshToken,
} as const;
