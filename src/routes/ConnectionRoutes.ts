import { IReq, IRes } from "./types/express/misc";
import { ConnectRequest } from "@src/models/ConnectRequest";
import ConnectionService from "@src/services/ConnectionService";

// **** Functions **** //

/**
 * Connect.
 */
async function connect(req: IReq<ConnectRequest>, res: IRes) {
  const connectReqBody = req.body;

  const apiRes = await ConnectionService.connect(connectReqBody);

  return res.status(apiRes.httpCode).json(apiRes);
}

/**
 * Query.
 */
async function query(req: IReq<ConnectRequest>, res: IRes) {
  const userId = req.params.userId;

  const apiRes = await ConnectionService.query(userId);

  return res.status(apiRes.httpCode).json(apiRes);
}

// **** Export default **** //

export default {
  connect,
  query,
} as const;
