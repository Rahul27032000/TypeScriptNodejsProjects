// importing confidential data from config
import { config } from "./config/config";
import express from "express";
import authRouter from "./routes/auth";
const app = express();
const port = config.port as string;

app.use(express.json());
app.use("/auth", authRouter);

app.get("/", (req, res) => res.send("Hello World!"));

// start the server
app.listen(port, () => {
  // make a connection to the database
  config.db();
  console.log(`Example app listening on port ${port}!`);
});
