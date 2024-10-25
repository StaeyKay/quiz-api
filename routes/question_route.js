import { Router } from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionsByCategory,
} from "../controllers/question_controller.js";

// Create a router
export const questionRouter = Router();

// Define routes
questionRouter.post("/questions", createQuestion);

questionRouter.get("/questions", getAllQuestions);

questionRouter.get("/questions/:category", getQuestionsByCategory);
