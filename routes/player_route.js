import { Router } from "express";
import {
  endSession,
  getPlayerStats,
  startSession,
} from "../controllers/player_controller.js";

export const playerRouter = Router();

playerRouter.post("/players/start", startSession);
playerRouter.post("/players/end", endSession);
playerRouter.get("/players/:playerId", getPlayerStats);
