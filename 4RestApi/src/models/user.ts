import { Schema, model, Document } from "mongoose";
import { Authentication } from "../interfaces/authentication";

interface UserDocument extends Document {
  username: string;
  email: string;
  authentication: Authentication;
}

const UserSchema = new Schema<UserDocument>({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },

  authentication: {
    password: {
      type: String,
      require: true,
    },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = model<UserDocument>("User", UserSchema);

export const getUser = UserModel.find();

export const getUserByUsername = (username: string) =>
  UserModel.findOne({ username });

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = async (values: Record<string, any>) => {
  try {
    const user = await new UserModel(values).save();
    return user.toObject();
  } catch (error) {
    throw error; // Rethrow the error to be caught by the caller
  }
};

export const deleteUserById = (id: string) => {
  UserModel.findByIdAndDelete({ _id: id });
};

export const updateUserById = (id: string, values: Record<string, any>) => {
  UserModel.findByIdAndUpdate(id, values);
};
