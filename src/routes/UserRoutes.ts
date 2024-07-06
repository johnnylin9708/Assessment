import HttpStatusCodes from "@src/common/HttpStatusCodes";

import UserService from "@src/services/UserService";
import { User } from "@src/models/User";
import { IReq, IRes } from "./types/express/misc";
import { RegisterRequest } from "@src/models/RegisterRequest";
import { LoginRequest } from "@src/models/LoginRequest";
import { ChangePswRequest } from "@src/models/ChangePswRequest";

// **** Functions **** //

/**
 * Register.
 */
async function register(req: IReq<RegisterRequest>, res: IRes) {
  const registerReqBody = req.body;

  const apiRes = await UserService.register(registerReqBody);

  return res.status(apiRes.httpCode).json(apiRes);
}

/**
 * Change Password.
 */
async function changePassword(req: IReq<ChangePswRequest>, res: IRes) {
  const changePswReqBody = req.body;

  const apiRes = await UserService.changePassword(changePswReqBody);
  return res.status(apiRes.httpCode).json(apiRes);
}

/**
 * Login.
 */
async function login(req: IReq<LoginRequest>, res: IRes) {
  const loginReqBody = req.body;

  const apiRes = await UserService.login(loginReqBody);
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
  changePassword,
  // getAll,
  // add,
  // update,
  // delete: delete_,
} as const;
