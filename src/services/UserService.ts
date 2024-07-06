import RouteError from "@src/common/RouteError";
import HttpStatusCodes from "@src/common/HttpStatusCodes";

import UserRepo from "@src/repos/UserRepo";
import { User } from "@src/models/User";
import { ApiResponse } from "@src/routes/types/types";

// **** Variables **** //

export const USER_NOT_FOUND_ERR = "User not found";
const crypto = require("crypto");

// **** Functions **** //

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
 * Register one user.
 */
async function register(user: User): Promise<ApiResponse> {
  const salt = generateSalt();
  user.password = hashPassword(user.password, salt);
  user.ps = salt;

  return UserRepo.insertUser(user);
}

/**
 * Login.
 */
async function login(user: User): Promise<Boolean> {
  // const salt = generateSalt();
  // user.password = hashPassword(user.password, salt);
  // user.ps = salt;
  return UserRepo.findUser(user);
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
