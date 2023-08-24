import express, { Request, Response } from "express";
import router from "./routes";
import { errorHandler, notFound } from "./middleware/middleware";

const app = express();

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));
app.use("/api/v1", router);
app.use(notFound);
app.use(errorHandler);

export default app;
