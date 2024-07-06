import HttpStatusCodes from "@src/common/HttpStatusCodes";

import UserService from "@src/services/UserService";
import { User } from "@src/models/User";
import { IReq, IRes } from "./types/express/misc";
import { RegisterRequest } from "@src/models/RegisterRequest";
import { LoginRequest } from "@src/models/LoginRequest";

// **** Functions **** //

/**
 * Register.
 */
async function register(req: IReq<RegisterRequest>, res: IRes) {
  const user = req.body;

  const apiRes = await UserService.register(user);

  return res.status(apiRes.httpCode).json(apiRes);
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
async function login(req: IReq<LoginRequest>, res: IRes) {
  const user = req.body;

  const apiRes = await UserService.login(user);
  return res.status(apiRes.httpCode).json(apiRes);
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
  login,
  // getAll,
  // add,
  // update,
  // delete: delete_,
} as const;
