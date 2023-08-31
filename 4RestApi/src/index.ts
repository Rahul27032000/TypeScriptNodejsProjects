import app from "./app";
import { SERVER_PORT, connectDb } from "./config/config";

const port = SERVER_PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
