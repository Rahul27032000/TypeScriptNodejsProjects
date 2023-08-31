import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const SERVER_PORT = process.env.PORT || 4000;
const MONGO_USERNAME = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASS;

export const access_token_secret = process.env.ACCESS_TOKEN;
export const refresh_token_secret = process.env.REFRESH_TOKEN;

const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.zxum6mo.mongodb.net/TypeScriptNode?retryWrites=true&w=majority`;

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("databse connected");
  } catch (e) {
    console.log(e);
  }
};
