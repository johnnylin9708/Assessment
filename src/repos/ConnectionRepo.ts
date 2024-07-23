import { ConnectRequest } from "@src/models/ConnectRequest";
import orm, { ConnectionDocument } from "./ConnectionOrm";

// **** Functions **** //

/**
 * Register one user
 */
async function insertConnection(
  connectRequest: ConnectRequest
): Promise<ConnectionDocument | null> {
  return await orm.insertConnection(connectRequest);
}

/**
 * Find all connection
 */
async function findConnections(
  userId: string
): Promise<ConnectionDocument | null> {
  return await orm.findConnectionsById(userId);
}

/**
 * Find one connection
 */
async function findConnection(
  connectRequest: ConnectRequest
): Promise<ConnectionDocument | null> {
  return await orm.findConnectionByEmail(connectRequest);
}

// **** Export default **** //

export default {
  insertConnection,
  findConnections,
  findConnection,
  //   findConnections,
  //   findConnection,
} as const;
