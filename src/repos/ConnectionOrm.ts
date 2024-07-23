import { ConnectRequest } from "@src/models/ConnectRequest";
import User from "@src/models/User";
import { MongoClient } from "mongodb";
import mongoose, { Schema } from "mongoose";
import UserRepo from "./UserRepo";

// **** Variables **** //

const uri = process.env.MONGODB_CONNECT_URI || "";

const client = new MongoClient(uri);

// **** Types **** //

export interface ConnectionDocument extends Document {
  connectionId: string;
  userId: string;
  userEmail: string;
  friendId: string;
  friendEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

// **** Functions **** //

const ConnectionModel = mongoose.model(
  "connections",
  new Schema({
    connectionId: String,
    userId: String,
    userEmail: String,
    friendId: String,
    friendEmail: String,
  })
);

/**
 * Insert a connection into Document.
 */
async function insertConnection(data: ConnectRequest) {
  try {
    const friendEmail = data.friendEmail;
    const userId = data.userId;
    const userObj = await UserRepo.findUserById(userId);
    const friendObj = await UserRepo.findUserByEmail(friendEmail);

    const doc = new ConnectionModel({
      userId,
      userEmail: userObj?.email,
      friendId: friendObj?.userId,
      friendEmail: friendObj?.email,
      connectionId: data.connectionId,
    });

    return (await doc.save()) as unknown as ConnectionDocument;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await client.close();
  }
}

/**
 * Find connections .
 */
async function findConnectionsById(userId: string) {
  try {
    return (await ConnectionModel.find({
      $or: [{ userId }, { friendId: userId }],
    })) as unknown as ConnectionDocument;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await client.close();
  }
}

/**
 * Find a connection .
 */
async function findConnectionByEmail(data: ConnectRequest) {
  try {
    return (await ConnectionModel.findOne({
      friendEmail: data.friendEmail,
      userId: data.userId,
    })) as unknown as ConnectionDocument;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await client.close();
  }
}

// **** Export default **** //

export default {
  insertConnection,
  findConnectionsById,
  findConnectionByEmail,
} as const;
