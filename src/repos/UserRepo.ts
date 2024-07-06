import { User } from "@src/models/User";
import orm, { UserDocument } from "./mongodb";

// **** Functions **** //

/**
 * Register one user
 */
async function insertUser(user: User): Promise<UserDocument | null> {
  return await orm.insertUser(user);
}

/**
 * Find one user
 */
async function findUser(user: User): Promise<UserDocument | null> {
  return await orm.findUser(user);
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
  findUser,
  updateUser,
  // getOne,
  // persists,
  // getAll,
  // add,
  // update,
  // delete: delete_,
} as const;
