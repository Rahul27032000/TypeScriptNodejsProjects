import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jst from "jsonwebtoken";
import { config } from "../config/config";
import User from "../models/User";
import RefreshToken from "../models/RefreshToken";

const Access_Token = config.access_token;
const Refresh_Token = config.refresh_token;

// controller for registering user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // extract data from request
  const { email, password, username } = req.body;

  //   check does the user exist with given email, if it does then send an error message
  const does_user_exist_with_given_email = await User.findOne({ email: email });
  if (does_user_exist_with_given_email) {
    return res.status(400).json({ message: "user exists with given email" });
  }

  //   check does the user exist with given username, if it does then send an error message
  const does_user_exist_with_given_username = await User.findOne({
    username: username,
  });
  if (does_user_exist_with_given_username) {
    return res.status(400).json({ message: "user exists with given username" });
  }

  //   check all information is provided
  if (!(username && password && email)) {
    return res.status(400).json({ message: "provide enough information" });
  }
  //   after passing through all checks we can create a new user and

  try {
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a new user with given data
    const user = new User({
      username: username,
      password: hashedPassword,
      email: email,
    });
    await user.save();

    // finally send the response of new user created to api
    return res.status(201).json(user);
  } catch (error) {
    // if anything goes wrong we send the error message

    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    // finally send the response of new user created to api
    return res.status(201).json(users);
  } catch (error) {
    // if anything goes wrong we send the error message

    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
