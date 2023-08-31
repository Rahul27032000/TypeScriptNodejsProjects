import { Request, Response } from "express";
import { MessageResponse } from "../interfaces/messageResponse";
import { createUser, getUserByEmail, getUserByUsername } from "../models/user";
import { hashPassword, verifyPassword } from "../utils/password";
import { User } from "../interfaces/authentication";
import { UserResponse } from "../interfaces/userResponse";
import {
  loginBodyValidation,
  signUpBodyValidation,
} from "../utils/validtionSchema";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtToken";

export const register = async (req: Request, res: Response<UserResponse>) => {
  try {
    const { error } = signUpBodyValidation(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, email, password } = req.body;

    const existingUserByUsername = await getUserByUsername(username);

    if (existingUserByUsername) {
      return res.status(403).json({ message: "Username already in use" });
    }

    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
      return res.status(403).json({ message: "Email already in use" });
    }

    const hashedPassword = await hashPassword(password);

    const user: User = await createUser({
      email,
      username,
      authentication: {
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { error } = loginBodyValidation(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await getUserByEmail(email).select(
      "+authentication.password +authentication.sessionToken"
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isValidPassword: boolean = await verifyPassword(
      password,
      user.authentication.password
    );

    if (!isValidPassword) {
      return res.status(403).json({ message: "Incorrect Password" });
    }

    const accessToken = generateAccessToken(user._id);

    console.log(user);
    console.log(user.authentication.sessionToken);
    console.log("------------------");

    if (!user.authentication.sessionToken) {
      const refreshToken = generateRefreshToken(user._id);
      user.authentication.sessionToken = refreshToken;
      user.save();
      console.log(user);
      return res
        .status(200)
        .json({ message: "Login successful", accessToken, refreshToken });
    }

    const refreshToken = user.authentication.sessionToken;

    res.cookie("access_token", accessToken);
    res.cookie("refresh_token", refreshToken);

    return res
      .status(200)
      .json({ message: "Login successful", accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
