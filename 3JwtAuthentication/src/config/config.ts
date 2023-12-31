import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const SERVER_PORT = process.env.PORT || 4000;
const MONGO_USERNAME = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASS;

const access_token = process.env.ACCESS_TOKEN;
const refresh_token = process.env.REFRESH_TOKEN;

const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.zxum6mo.mongodb.net/NodeTypeScriptJWTAuthApp?retryWrites=true&w=majority`;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("databse connected");
  } catch (e) {
    console.log(e);
  }
};
export const config = {
  port: SERVER_PORT,
  db: connectDb,
  access_token,
  refresh_token,
};
