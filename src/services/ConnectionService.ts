import ConnectionRepo from "@src/repos/ConnectionRepo";
import { ApiResponse } from "@src/models/ApiResponse";
import { ConnectRequest } from "@src/models/ConnectRequest";
import UserRepo from "@src/repos/UserRepo";
import { generateUUId } from "./UserService";

// **** Variables **** //

export const USER_NOT_FOUND_ERR = "User not found";

// **** Functions **** //

/**
 * connect one user.
 */
async function connect(connectReq: ConnectRequest): Promise<ApiResponse> {
  const friendObj = await UserRepo.findUserByEmail(connectReq.friendEmail);

  if (!friendObj) {
    return { httpCode: 409, apiMsg: "can not find your friend" };
  }

  const connectObj = await ConnectionRepo.findConnection(connectReq);

  if (connectObj) {
    return { httpCode: 409, apiMsg: "duplicate friends" };
  }

  await ConnectionRepo.insertConnection({
    ...connectReq,
    connectionId: generateUUId(),
  });
  //   const isExisted = await UserRepo.findUser(registerReq);

  //   if (isExisted) {
  //     return { httpCode: 409, apiMsg: "username is existed" };
  //   }
  //   const salt = generateSalt();
  //   registerReq.password = hashPassword(registerReq.password, salt);

  //   const userObj: User = {
  //     ...registerReq,
  //     userId: generateuserId(),
  //     ps: salt,
  //     isActive: true,
  //   };

  //   await UserRepo.insertUser(userObj);
  return { httpCode: 201, apiMsg: "create connection successfully" };
}

/**
 * get All connections.
 */
async function query(userId: string): Promise<ApiResponse> {
  const data = await ConnectionRepo.findConnections(userId);

  return { httpCode: 201, apiMsg: "", data };
}

// **** Export default **** //

export default {
  connect,
  query,
} as const;