import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, wecome to the classroom API");
});

const port = 8000;

app.listen(port, () => {
  console.log(`server listening to http://localhost:${port}`);
});
