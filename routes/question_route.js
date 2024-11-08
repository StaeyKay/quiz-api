import { Router } from "express";
import {
  createQuestion,
  deleteQuestion,
  editQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionsByCategory,
} from "../controllers/question_controller.js";

// Create a router
export const questionRouter = Router();

// Define routes
questionRouter.post("/questions", createQuestion);

questionRouter.get("/questions", getAllQuestions);

questionRouter.get("/questions/:category", getQuestionsByCategory);

questionRouter.patch("/questions/:id", editQuestion);

questionRouter.delete("/questions/:id", deleteQuestion);

questionRouter.get("/questions/id/:id", getQuestionById);
