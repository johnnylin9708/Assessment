import { User } from "@src/models/User";
import { getRandomInt } from "@src/util/misc";
import orm from "./mongodb";
import { ApiResponse } from "@src/routes/types/types";

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(email: string): Promise<User | null> {
  // const db = await orm.openDb();
  // for (const user of db.users) {
  //   if (user.email === email) {
  //     return user;
  //   }
  // }
  return null;
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  // const db = await orm.openDb();
  // for (const user of db.users) {
  //   if (user.id === id) {
  //     return true;
  //   }
  // }
  return false;
}

/**
 * Get all users.
 */
// async function getAll(): Promise<IUser[]> {
//   const db = await orm.openDb();
//   return db.users;
// }

/**
 * Register one user
 */
async function insertUser(user: User): Promise<ApiResponse> {
  return await orm.insertUser(user);
}

/**
 * Find one user
 */
async function findUser(user: User): Promise<Boolean> {
  return await orm.findUser(user);
}

/**
 * Update a user.
 */
// async function update(user: IUser): Promise<void> {
//   const db = await orm.openDb();
//   for (let i = 0; i < db.users.length; i++) {
//     if (db.users[i].id === user.id) {
//       const dbUser = db.users[i];
//       db.users[i] = {
//         ...dbUser,
//         name: user.name,
//         email: user.email,
//       };
//       return orm.saveDb(db);
//     }
//   }
// }

/**
 * Delete one user.
 */
// async function delete_(id: number): Promise<void> {
//   const db = await orm.openDb();
//   for (let i = 0; i < db.users.length; i++) {
//     if (db.users[i].id === id) {
//       db.users.splice(i, 1);
//       return orm.saveDb(db);
//     }
//   }
// }

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
