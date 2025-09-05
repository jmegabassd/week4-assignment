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
    "select name, visitdate, comments, email from guestform"
  );
  console.log(query);
  res.json(query.rows);
});

app.post("/comments-add", (req, res) => {
  const newComments = req.body;
  const query = db.query(
    `INSERT INTO guestform (name, visitdate, comments, email)
    VALUES ($1, $2, $3, $4)`,
    [
      newComments.name,
      newComments.visitdate,
      newComments.comments,
      newComments.email,
    ]
  );
  res.json("Data sent", query);
});
