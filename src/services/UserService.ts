import UserRepo from "@src/repos/UserRepo";
import { User } from "@src/models/User";
import { RegisterRequest } from "@src/models/RegisterRequest";
import { ApiResponse } from "@src/models/ApiResponse";
import { LoginRequest } from "@src/models/LoginRequest";
import { LoginResponse } from "@src/models/LoginResponse";
import { ChangePswRequest } from "@src/models/ChangePswRequest";
import { ValidateRefreshTokenRequest } from "@src/models/ValidateRefreshTokenRequest";
import { ValidateRefreshTokenResponse } from "@src/models/ValidateRefreshTokenRespone";
import { GetDummnyDataResponse } from "@src/models/GetDummnyDataResponse";

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
export function generateUUId() {
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
  const isExisted = await UserRepo.findUserByEmail(registerReq.email);

  if (isExisted) {
    return { httpCode: 409, apiMsg: "email is existed" };
  }
  const salt = generateSalt();
  registerReq.password = hashPassword(registerReq.password, salt);

  const userObj: User = {
    ...registerReq,
    userId: generateUUId(),
    ps: salt,
    isActive: true,
  };

  await UserRepo.insertUser(userObj);
  return {
    httpCode: 201,
    apiMsg: "Registration successful! Please proceed to the login page",
  };
}

/**
 * Login.
 */
async function login(loginReq: LoginRequest): Promise<LoginResponse> {
  const existedUser = await UserRepo.findUserByEmail(loginReq.email);

  if (existedUser && existedUser.ps) {
    const hashPsw = hashPassword(loginReq.password, existedUser.ps);

    if (
      hashPsw === existedUser.password &&
      loginReq.email === existedUser.email
    ) {
      return {
        httpCode: 200,
        userId: existedUser.userId,
        apiMsg: "login successfully",
        accessToken: generateAccessToken(),
        refreshToken: generateRefreshToken(),
        userName: existedUser.userName,
      };
    } else {
      return {
        httpCode: 400,
        apiMsg:
          "Sorry, the password you entered is incorrect. Please try again.",
      };
    }
  }

  return {
    httpCode: 400,
    apiMsg: "Sorry, the email you entered is incorrect. Please try again.",
  };
}

/**
 * Change Password.
 */
async function changePassword(
  changePwsReq: ChangePswRequest,
  accessToken: string
): Promise<ApiResponse> {
  // const verifyRes = verifyAccessToken(accessToken);

  // if (!verifyRes.success) {
  //   return { httpCode: 401, apiMsg: verifyRes.error };
  // }

  // const userObj = {
  //   username: changePwsReq.username,
  //   password: changePwsReq.oldPassword,
  // };

  // const existedUser = await UserRepo.findUser(userObj);

  // if (!existedUser || !existedUser.ps) {
  //   return { httpCode: 400, apiMsg: "can't find this user" };
  // }
  // const isOldPswMatched =
  //   hashPassword(changePwsReq.oldPassword, existedUser.ps) ===
  //   existedUser.password;
  // if (!isOldPswMatched) {
  //   return { httpCode: 409, apiMsg: "old password is invalid" };
  // }
  // const salt = generateSalt();

  // const newUserObj = {
  //   userId: existedUser.userId,
  //   username: existedUser.username,
  //   password: hashPassword(changePwsReq.newPassword, salt),
  //   ps: salt,
  // };
  // UserRepo.updateUser(newUserObj);

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

/**
 * Get Dummny data.
 */
async function getDummnyData(
  accessToken: string
): Promise<GetDummnyDataResponse> {
  const verifyRes = verifyAccessToken(accessToken);

  console.log(verifyRes);
  if (!verifyRes.success && verifyRes.error === "jwt expired") {
    return { httpCode: 202, apiMsg: verifyRes.error };
  } else if (!verifyRes.success && verifyRes.error === "invalid token") {
    return { httpCode: 400, apiMsg: verifyRes.error };
  }

  return {
    httpCode: 200,
    apiMsg: "get successfully",
    register: {
      username: "david",
      password: "123456",
      avatar: "base64",
    },
    login: {
      username: "david",
      password: "123456",
    },
    changePassword: {
      username: "david",
      oldPassword: "123456",
      newPassword: "123",
    },
    validateRefreshToken: {
      refreshToken:
        "please refer to the response in login api. If it is expired, please use validate refresh token to regenerate a new one",
    },
  };
}

// **** Export default **** //

export default {
  register,
  login,
  changePassword,
  validateRefreshToken,
  getDummnyData,
} as const;
