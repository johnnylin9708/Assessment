import RouteError from "@src/common/RouteError";
import HttpStatusCodes from "@src/common/HttpStatusCodes";

import UserRepo from "@src/repos/UserRepo";
import { User } from "@src/models/User";
import { RegisterRequest } from "@src/models/RegisterRequest";
import { ApiResponse } from "@src/models/ApiResponse";
import { LoginRequest } from "@src/models/LoginRequest";
import { LoginResponse } from "@src/models/LoginResponse";
import { UserDocument } from "@src/repos/mongodb";

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

function generateAccessToken(user: UserDocument) {
  const payload = {
    id: user.userid,
    username: user.username,
  };

  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN };

  return jwt.sign(payload, secret, options);
}
function verifyAccessToken(token: string) {
  const secret = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function generateRefreshToken(user: UserDocument) {
  const payload = {
    id: user.userid,
    email: user.username,
  };

  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN };

  return jwt.sign(payload, secret, options);
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
async function register(user: RegisterRequest): Promise<ApiResponse> {
  const isExisted = await UserRepo.findUser(user);

  if (isExisted) {
    return { httpCode: 409, apiMsg: "username is existed" };
  }

  const salt = generateSalt();
  user.password = hashPassword(user.password, salt);

  const userObj: User = {
    ...user,
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
async function login(user: LoginRequest): Promise<LoginResponse> {
  const existedUser = await UserRepo.findUser(user);

  if (existedUser && existedUser.ps) {
    const hashPsw = hashPassword(user.password, existedUser.ps);

    if (
      hashPsw === existedUser.password &&
      user.username === existedUser.username
    ) {
      return {
        httpCode: 200,
        apiMsg: "login successfully",
        accessToken: generateAccessToken(existedUser),
        refreshToken: generateRefreshToken(existedUser),
      };
    } else {
      return { httpCode: 204, apiMsg: "invalid password" };
    }
  }

  return { httpCode: 204, apiMsg: "invalid username" };
}

/**
 * Update one user.
 */
// async function updateOne(user: IUser): Promise<void> {
//   const persists = await UserRepo.persists(user.id);
//   if (!persists) {
//     throw new RouteError(
//       HttpStatusCodes.NOT_FOUND,
//       USER_NOT_FOUND_ERR,
//     );
//   }
//   // Return user
//   return UserRepo.update(user);
// }

/**
 * Delete a user by their id.
 */
// async function _delete(id: number): Promise<void> {
//   const persists = await UserRepo.persists(id);
//   if (!persists) {
//     throw new RouteError(
//       HttpStatusCodes.NOT_FOUND,
//       USER_NOT_FOUND_ERR,
//     );
//   }
//   // Delete user
//   return UserRepo.delete(id);
// }

// **** Export default **** //

export default {
  register,
  login,
  // getAll,
  // addOne,
  // updateOne,
  // delete: _delete,
} as const;
