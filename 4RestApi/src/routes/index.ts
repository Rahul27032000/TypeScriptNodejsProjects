import { Request, Response, Router } from "express";
import { MessageResponse } from "../interfaces/messageResponse";
import userRouter from "./authentication";
import { authentiaction } from "../middleware/authentication";

const router = Router();

router.get<{}, MessageResponse>(
  "/",
  authentiaction,
  (req: Request, res: Response) => {
    res.send("Welcome");
  }
);

router.use("/authentication", userRouter);

export default router;
