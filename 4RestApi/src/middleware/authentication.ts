import { Request, Response, NextFunction } from "express";
import { getUserById } from "../models/user";
import { verifyToken } from "../utils/jwtToken";

export const authentiaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies["access_token"];
    const refreshToken = req.cookies["refresh_token"];

    if (!accessToken) {
      return res.status(401).json({ message: "Access denied" });
    }

    const decoded = verifyToken(accessToken);
    // const user = await getUserById(decoded as string);
    console.log(decoded);
    next();
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
