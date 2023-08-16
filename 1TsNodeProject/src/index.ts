import express, { Request, Response } from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("GET request to the homepage");
});

app.post("/", function (req, res) {
  res.send("POST request to the homepage");
});

app.get("/books/:bookId", (req, res) => {
  res.send(req.params.bookId);
});

app.post("/update", function (req, res) {
  const { name, description } = req.body;
  res.send(`Name ${name}, desc ${description}`);
});

app.delete("/products/:id", function (req, res) {
  const { id } = req.params;
  res.send(`Delete record with id ${id}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
