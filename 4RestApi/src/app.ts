import express, { Request, Response } from "express";
const app = express();
import router from "./routes";
import { errorHandler, notFound } from "./middleware/middleware";
import { MessageResponse } from "./interfaces/messageResponse";

app.get("/", (req: Request, res: Response<MessageResponse>) =>
  res.json({ message: "hello world" })
);
app.use("/api/v1", router);
app.use(notFound);
app.use(errorHandler);

export default app;
