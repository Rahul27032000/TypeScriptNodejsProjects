import { Router } from "express";
import { register, getAllUser } from "../controller/auth";

const authRouter = Router();

authRouter.get("/", getAllUser);
authRouter.post("/", register);

export default authRouter;
