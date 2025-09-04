import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

app.use("cors");
app.use(express.json());

const app = express;
const PORT = 7777;

app.listen(PORT, function () {
  console.info(` Server is running in port ${PORT}`);
});

app.get("/", function (req, res) {
  res.json({ message: "Welcome to the server. GET comfy" });
});
