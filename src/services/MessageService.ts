import ConnectionRepo from "@src/repos/ConnectionRepo";
import { ApiResponse } from "@src/models/ApiResponse";
import { ConnectRequest } from "@src/models/ConnectRequest";
import UserRepo from "@src/repos/UserRepo";
import { InsertMessageRequest } from "@src/models/InsertMessageRequest";
import MessageRepo from "@src/repos/MessageRepo";

// **** Variables **** //

export const USER_NOT_FOUND_ERR = "User not found";

// **** Functions **** //

/**
 * insert message .
 */
async function insertMessage(
  insertMessageRequest: InsertMessageRequest
): Promise<ApiResponse> {
  await MessageRepo.insertMessage(insertMessageRequest);

  return { httpCode: 201, apiMsg: "create message successfully" };
}

/**
 * get All connections.
 */
async function queryMessagesById(userId: string): Promise<ApiResponse> {
  const data = await MessageRepo.findMessagesByConnectionId(userId);

  return { httpCode: 201, apiMsg: "", data };
}

// **** Export default **** //

export default {
  insertMessage,
  queryMessagesById,
} as const;
