const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((_, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

const orders = require("./data/orders.js");

server.get("/orders", (_, res) => {
  res.json(orders);
});

server.get("/status", (_, res) => {
  res.json({ status: "Running" });
});

module.exports = {
  server,
  orders,
};
