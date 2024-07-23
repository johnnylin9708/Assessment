import User from "@src/models/User";
import { MongoClient } from "mongodb";
import mongoose, { Schema } from "mongoose";

// **** Variables **** //

const uri = process.env.MONGODB_CONNECT_URI || "";

const client = new MongoClient(uri);

// **** Types **** //

export interface UserDocument extends Document {
  userId: string;
  email: string;
  username: string;
  password?: string;
  ps?: string;
  isActive?: boolean;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// **** Functions **** //

const UserModel = mongoose.model(
  "users",
  new Schema({
    userId: String,
    username: String,
    email: String,
    password: String,
    ps: String,
    isActive: Boolean,
    avatar: String,
  })
);

/**
 * Insert a user into Document.
 */
async function insertUser(data: {
  userId?: string;
  username?: string;
  password?: string;
  ps?: string;
  isActive?: boolean;
  avatar?: string;
}) {
  try {
    const doc = new UserModel(data);

    return (await doc.save()) as unknown as UserDocument;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await client.close();
  }
}

/**
 * Get a user.
 */
async function findUserByEmail(email: string) {
  try {
    console.log(email);
    return (await UserModel.findOne({
      email,
    })) as unknown as UserDocument;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await client.close();
  }
}

/**
 * Get a user.
 */
async function findUserById(userId: string) {
  try {
    return (await UserModel.findOne({
      userId,
    })) as unknown as UserDocument;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await client.close();
  }
}

/**
 * Update user info.
 */
async function updateUser(data: {
  userId?: string;
  username?: string;
  password?: string;
  ps?: string;
  isActive?: boolean;
  avatar?: string;
}) {
  try {
    return (await UserModel.updateOne(
      { userId: data.userId },
      {
        $set: {
          password: data.password,
          avatar: data.avatar,
          ps: data.ps,
        },
      }
    )) as unknown as UserDocument;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await client.close();
  }
}

// **** Export default **** //

export default {
  insertUser,
  findUserByEmail,
  findUserById,
  updateUser,
} as const;
