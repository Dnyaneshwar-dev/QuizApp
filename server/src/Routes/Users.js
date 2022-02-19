const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const DB = require("./DB");

// Create User in DB
Router.post("/create", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.send({ error: "Incomplete Parameters" });
  }

  DB.users
    .create({
      data: {
        username: username,
        password: password,
      },
    })
    .then((result) => {
      const token = jwt.sign({ user: username }, "SECRET_KEY");
      res.send({ ok: true, data: result, token: token });
    })
    .catch((error) => {
      console.log(error);
      res.send({ ok: false, error: error });
    });
});

Router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    res.send({ ok: false, error: "Incomplete Parameters" });
  }
  try {
    const result = await DB.users.findFirst({ where: { username: username } });
    if (!result) {
      res.send({ ok: false, error: "User Not Found" });
    } else {
      if (result.password === password) {
        const token = jwt.sign({ name: username }, "SECRET_KEY");
        res.send({ ok: true, token: token });
      } else {
        res.send({ ok: false, error: "Wrong Password" });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error });
  }
});

// Get user Data
Router.get("/:uid", (req, res) => {});

module.exports = Router;
