import { User } from "@src/models/User";
import orm, { UserDocument } from "./UserOrm";

// **** Functions **** //

/**
 * Register one user
 */
async function insertUser(user: User): Promise<UserDocument | null> {
  return await orm.insertUser(user);
}

/**
 * Find one user`
 */
async function findUserByEmail(email: string): Promise<UserDocument | null> {
  return await orm.findUserByEmail(email);
}

/**
 * Find one user
 */
async function findUserById(userId: string): Promise<UserDocument | null> {
  return await orm.findUserById(userId);
}

/**
 * Update user data
 */
async function updateUser(user: User): Promise<UserDocument | null> {
  return await orm.updateUser(user);
}

// **** Export default **** //

export default {
  insertUser,
  findUserByEmail,
  findUserById,
  updateUser,
} as const;
