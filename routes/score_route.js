import { Router } from "express";
import { addScore } from "../controllers/score_controller.js";

export const scoreRouter = Router();

scoreRouter.post("/score", addScore);