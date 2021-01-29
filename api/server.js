const express = require("express");

const Users = require("./users/users-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/users", (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/users", (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.delete("/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json("user has been deleted")
    })
    .catch(err => {
      res.status(400).json(err.message)
    })
});

module.exports = server;
