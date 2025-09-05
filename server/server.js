import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 7777;
app.listen(PORT, function () {
  console.info(` Server is running in port ${PORT}`);
});

app.get("/", function (req, res) {
  res.json({ message: "Welcome to the server. GET comfy" });
});

app.get("/comments", async (req, res) => {
  const query = await db.query(
    "select name, visitdate, comments from guestform"
  );
  console.log(query);
  res.json(query.rows);
});
