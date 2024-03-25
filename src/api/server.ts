import express from "express";
import cors from "cors";
import helmet from "helmet";
import winston from "winston";
import morgan from "morgan";

import todoRouter from "./routes/todos";

const app = express();
const port = process.env.PORT ?? 3001;

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

const winstonStream = {
  write: (text: string) => {
    logger.debug(text);
  },
};

app.use(morgan("combined", { stream: winstonStream }));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "API up" });
});

app.use("/api/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

export default app;
