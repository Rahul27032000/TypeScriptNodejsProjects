import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

// middleware
// Add this middleware to parse JSON request bodies
app.use(express.json());

type TUser = {
  username: string;
  password: string;
};

const users: TUser[] = [];

// route that returns all users
app.get("/users", (req: Request, res: Response) => res.send(users));

// route for creating a new user
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    if (!username && !password) {
      return res.status(400).send("Provide username and password");
    }

    // check if the user already exists
    if (users.some((user) => user.username === username)) {
      return res.status(400).send("User with given username already exists");
    }

    // hash the password
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // add user to the list
    users.push({
      username,
      password: hashedPassword,
    });

    return res.status(201).send("User created successfully");
  } catch {
    return res.status(500).send("Server error");
  }
});

// route for login user
app.post("/users/login", async (req, res) => {
  const user: TUser | undefined = users.find(
    (user) => user.username === req.body.username
  );

  if (user == undefined) {
    res.status(400).send("cannot find user");
  } else {
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        res.send("success");
      } else {
        res.send("password is not correct");
      }
    } catch {
      res.status(500).send();
    }
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
