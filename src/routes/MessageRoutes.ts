import { IReq, IRes } from "./types/express/misc";
import { InsertMessageRequest } from "@src/models/InsertMessageRequest";
import MessageService from "@src/services/MessageService";

// **** Functions **** //

/**
 * Insert.
 */
async function insertMessage(req: IReq<InsertMessageRequest>, res: IRes) {
  const insertMsgReqBody = req.body;

  const apiRes = await MessageService.insertMessage(insertMsgReqBody);

  return res.status(apiRes.httpCode).json(apiRes);
}

/**
 * Query by connection Id.
 */
async function queryMessagesById(req: IReq, res: IRes) {
  const connectionId = req.params.connectionId;

  const apiRes = await MessageService.queryMessagesById(connectionId);

  return res.status(apiRes.httpCode).json(apiRes);
}

// **** Export default **** //

export default {
  insertMessage,
  queryMessagesById,
} as const;
