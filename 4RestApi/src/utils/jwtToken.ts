import jwt from "jsonwebtoken";
import { access_token_secret, refresh_token_secret } from "../config/config";

const accessTokenSecret = access_token_secret as string;
const refreshTokenSecret = refresh_token_secret as string;

export const generateAccessToken = (userId: string): string => {
  const activeToken = jwt.sign({ userId }, accessTokenSecret, {
    expiresIn: "15m",
  });
  return activeToken;
};

export const generateRefreshToken = (userId: string): string => {
  const refreshToken = jwt.sign({ userId }, refreshTokenSecret as string, {
    expiresIn: "7d",
  });
  return refreshToken;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    return decoded;
  } catch (error) {
    return null;
  }
};

export const refreshAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, refreshTokenSecret);
    if (typeof decoded === "object" && "userId" in decoded) {
      const accessToken = generateAccessToken(decoded.userId);
      return accessToken;
    }
    return null;
  } catch (error) {
    return null;
  }
};
