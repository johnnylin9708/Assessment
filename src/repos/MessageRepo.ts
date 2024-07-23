import { InsertMessageRequest } from "@src/models/InsertMessageRequest";
import orm, { MessageDocument } from "./MeesageOrm";

// **** Functions **** //

/**
 * Insert Message
 */
async function insertMessage(
  insertMessageRequest: InsertMessageRequest
): Promise<MessageDocument | null> {
  return await orm.insertMessage(insertMessageRequest);
}

/**
 * Find all connection
 */
async function findMessagesByConnectionId(
  connectionId: string
): Promise<MessageDocument | null> {
  return await orm.findMessagesByConnectionId(connectionId);
}

// **** Export default **** //

export default {
  insertMessage,
  findMessagesByConnectionId,
  //   findConnections,
  //   findConnection,
} as const;
