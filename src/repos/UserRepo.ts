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

// **** Export default **** //

export default {
  insertUser,
  findUser,
  // getOne,
  // persists,
  // getAll,
  // add,
  // update,
  // delete: delete_,
} as const;
