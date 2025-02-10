import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";
import { dbConnection } from "./config/db.js";
import { questionRouter } from "./routes/question_route.js";
import { playerRouter } from "./routes/player_route.js";
import { scoreRouter } from "./routes/score_route.js";

const app = express();

expressOasGenerator.handleResponses(app, {
  alwaysServeDocs: true,
  tags: ["players", "questions", "score"],
  mongooseModels: mongoose.modelNames(),
});

// Apply middlewares
app.use(express.json());
app.use(cors({ Credentials: true, origin: "*" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET, //encrypts the file
    resave: false,
    saveUninitialized: true,
    // cookie: {secure: true}
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

// Use routes
app.use("/api/v1", questionRouter);
app.use("/api/v1", playerRouter);
app.use("/api/v1", scoreRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect("/api-docs/"));

// Connect to database
dbConnection();

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
