import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import appRouter from "./app/app";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5000", "http://127.0.0.1:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(logger("dev"));

app.use("/", appRouter);

export default app;
