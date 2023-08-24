import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
