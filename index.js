import express from "express";
import "dotenv/config";
import cors from "cors";
import { dbConnection } from "./config/db.js";
import { questionRouter } from "./routes/question_route.js";

const app = express();

// Apply middlewares
app.use(express.json());
app.use(cors({ Credentials: true, origin: "*" }));

// Use routes
app.use("/api/v1", questionRouter);

// Connect to database
dbConnection();

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
