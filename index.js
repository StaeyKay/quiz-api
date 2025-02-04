import express from "express";
import "dotenv/config";
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";
import { dbConnection } from "./config/db.js";
import { questionRouter } from "./routes/question_route.js";
import { playerRouter } from "./routes/player_route.js";

const app = express();

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

// Connect to database
dbConnection();

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
