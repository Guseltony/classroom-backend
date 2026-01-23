// import("apminsight")
//   .then(({ default: AgentAPI }) => AgentAPI.config())
//   .catch(() => console.log("APM not available in this environment"));

import AgentAPI from "apminsight";
AgentAPI.config();

import express from "express";
import subjectsRouter from "./routes/subjects.js";
import cors from "cors";
import securityMiddleware from "./middleware/security.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();
const port = 8000;

if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not set in .env file");
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));


app.use(securityMiddleware);

app.use("/api/subjects", subjectsRouter);

app.get("/", (req, res) => {
  res.send("Hello, wecome to the classroom API");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
