import mongoose, { Schema, model } from "mongoose";

const refreshToken = new Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const RefreshToken = model("RefreshToken", refreshToken);

export default RefreshToken;
