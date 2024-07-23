import { ConnectRequest } from "@src/models/ConnectRequest";
import User from "@src/models/User";
import { MongoClient } from "mongodb";
import mongoose, { Schema } from "mongoose";
import UserRepo from "./UserRepo";
import { InsertMessageRequest } from "@src/models/InsertMessageRequest";

// **** Variables **** //

const uri = process.env.MONGODB_CONNECT_URI || "";

const client = new MongoClient(uri);

// **** Types **** //

export interface MessageDocument extends Document {
  connectionId: string;
  senderId: string;
  senderEmail: string;
  receiverEmail: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

// **** Functions **** //

const MessageModel = mongoose.model(
  "messages",
  new Schema({
    connectionId: String,
    senderId: String,
    senderEmail: String,
    receiverEmail: String,
    receiverId: String,
    text: String,
    timestamp: Number,
  })
);

/**
 * Insert a connection into Document.
 */
async function insertMessage(data: InsertMessageRequest) {
  try {
    const doc = new MessageModel(data);

    return (await doc.save()) as unknown as MessageDocument;
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
async function findMessagesByConnectionId(connectionId: string) {
  try {
    return (await MessageModel.find({
      connectionId,
    })) as unknown as MessageDocument;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await client.close();
  }
}

// **** Export default **** //

export default {
  insertMessage,
  findMessagesByConnectionId,
} as const;
