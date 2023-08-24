import { Request, Response, Router } from "express";
import { MessageResponse } from "../interfaces/messageResponse";

const router = Router();

router.get<{}, MessageResponse>("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

export default router;
