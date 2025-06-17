const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
// Configure CORS to allow requests from any origin during development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
const secretKey = "jimil";
const users = [];

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

  if (!token) {
    return res.status(401).send({
      message: "No token provided",
    });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).send({
        message: "Invalid token",
      });
    }
    req.user = user;
    req.password = users.find(user => user.username === user.username).password;

    next();
  });
}

app.get("/me", authenticateToken ,(req, res) => {
    const user = req.user;
    const password = req.password;
    console.log(user);
    res.send({
        username: user.username,
        password: password
    });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign(
      {
        username: user.username,
      },
      secretKey
    );

    user.token = token;
    res.send({
      token,
    });
    console.log(users);
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (users.find((user) => user.username === username)) {
    res.status(400).send("Account already exists");
  } else {
    const token = jwt.sign({ username }, secretKey);
    users.push({ username, password, token });
    res.status(200).send("Signup successful");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
