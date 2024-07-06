import HttpStatusCodes from "@src/common/HttpStatusCodes";

import UserService from "@src/services/UserService";
import { User } from "@src/models/User";
import { IReq, IRes } from "./types/express/misc";

// **** Functions **** //

/**
 * Register.
 */
async function register(req: IReq<User>, res: IRes) {
  const user = req.body;

  const users = await UserService.register(user);
  return res.status(HttpStatusCodes.CREATED).json({ users });
}

/**
 * Change Password.
 */
async function changePassword(req: IReq<User>, res: IRes) {
  const user = req.body;

  // const users = await UserService.changePassword(user)
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Login.
 */
async function login(req: IReq<User>, res: IRes) {
  const user = req.body;

  const users = await UserService.login(user);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
// async function delete_(req: IReq, res: IRes) {
//   const id = +req.params.id;
//   await UserService.delete(id);
//   return res.status(HttpStatusCodes.OK).end();
// }

// **** Export default **** //

export default {
  register,
  // getAll,
  // add,
  // update,
  // delete: delete_,
} as const;
