import express from "express";
import cors from "cors";
import helmet from "helmet";
import todoRouter from "./routes/todos";

const app = express();
const port = process.env.PORT ?? 3001;

app.use(helmet()); // Security HTTP headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON body

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

export default app;
