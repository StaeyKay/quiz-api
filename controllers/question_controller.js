import { QuestionModel } from "../models/question_model.js";

// Endpoint to add new questions
export const createQuestion = async (req, res) => {
  try {
    const question = await QuestionModel.create(req.body);
    res.status(200).json(question);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// Endpoint to get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await QuestionModel.find();
    res.status(200).json(questions);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// Endpoint to get questions by their category, displayed in random order
export const getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const questions = await QuestionModel.aggregate([
      { $match: { category } }, // Filter by category
      { $sample: { size: 20 } }, // Randomly select 20 questions
    ]);
    res.status(200).json(questions);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

