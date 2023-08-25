import express, { Request, Response } from "express";
const app = express();
import router from "./routes";
import { errorHandler, notFound } from "./middleware/middleware";
import { MessageResponse } from "./interfaces/messageResponse";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";

// middleware
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req: Request, res: Response<MessageResponse>) =>
  res.json({ message: "hello world" })
);

app.use("/api/v1", router);

// middleware for all routes who are not registered
app.use(notFound);
app.use(errorHandler);

export default app;
