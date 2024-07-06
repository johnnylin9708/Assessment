import jsonfile from "jsonfile";

import { User } from "@src/models/User";
import { MongoClient } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { ApiResponse } from "@src/routes/types/types";

// **** Variables **** //

const uri = process.env.MONGODB_CONNECT_URI || "";

const client = new MongoClient(uri);

// **** Types **** //

interface IDb {
  users: User[];
}

// **** Functions **** //

/**
 * Insert a user into Document.
 */
async function insertUser(data: {
  username: String;
  password: String;
  ps: String;
  isActive: Boolean;
  avatar: String;
}): Promise<ApiResponse> {
  // async function insertDoc(): Promise<IDb> {
  try {
    const UserModel = mongoose.model(
      "users",
      new Schema({
        username: String,
        password: String,
        ps: String,
        isActive: Boolean,
        avatar: String,
      })
    );

    const isExisted = await UserModel.where("username").equals(data.username);
    if (isExisted.length) {
      return { httpCode: 409, apiMsg: "username is existed" };
    }
    const doc = new UserModel(data);

    doc.save().then((res) => {
      return { httpCode: 201 };
    });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
  return { httpCode: 400, apiMsg: "Bad Request" };
}

/**
 * Get a user.
 */
async function findUser(data: {
  username: String;
  password: String;
  ps: String;
  isActive: Boolean;
  avatar: String;
}) {
  // async function insertDoc(): Promise<IDb> {
  try {
    const UserModel = mongoose.model(
      "users",
      new Schema({
        username: String,
        password: String,
        ps: String,
        isActive: Boolean,
        avatar: String,
      })
    );
    const doc = await UserModel.where("username").equals(data.username);
    if (doc.length) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await client.close();
  }
  return false;
}

/**
 * Update the file.
 */
// function saveDb(db: IDb): Promise<void> {
//   return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
// }

// **** Export default **** //

export default {
  insertUser,
  findUser,
} as const;
