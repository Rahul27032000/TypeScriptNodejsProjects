import { Schema, model } from "mongoose";

const UserSchema = new Schema({
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

export const UserModel = model("User", UserSchema);

export const getUser = UserModel.find();

export const getUserByUsername = (username: string) =>
  UserModel.findOne({ username });

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => {
  new UserModel(values).save().then((user) => {
    user.toObject();
  });
};

export const deleteUserById = (id: string) => {
  UserModel.findByIdAndDelete({ _id: id });
};

export const updateUserById = (id: string, values: Record<string, any>) => {
  UserModel.findByIdAndUpdate(id, values);
};
