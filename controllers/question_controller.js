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
    // Get query params
    const { limit, page, filter, fields } = req.query;

    const queryFilter = filter ? JSON.parse(filter) : {};
    const selectFields = fields ? JSON.parse(fields) : {};

    if (queryFilter.category) {
      queryFilter.category = { $regex: queryFilter.category, $options: "i" };
    }

    const questions = await QuestionModel.paginate(
      { ...queryFilter },
      { select: selectFields, sort: { createdAt: -1 }, limit, page }
    );

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

// Endpoint to edit a question
export const editQuestion = async (req, res) => {
  try {
    const question = await QuestionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!question) {
      return res.status(404).json("Question not found");
    }
    // Return response
    res.status(200).json({
      message: "The question has been updated successfully",
      question: question,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Endpoint to delete a question
export const deleteQuestion = async (req, res) => {
  const question = await QuestionModel.findByIdAndDelete(req.params.id);
  if (!question) {
    return res.status(404).json("Question not found");
  }
  res.status(200).json({ message: "Question deleted succeessfully" });
};

// Endpoint to get a question by id
export const getQuestionById = async (req, res) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (!question) {
      return res.status(404).json("Question not found");
    }
    res.status(200).json(question);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

// Endpoint to filter questions by words in the question text
export const filterQuestionsByText = async (req, res) => {
  try {
    const { filter } = req.query; // Extract query string from request
    const queryFilter = filter ? JSON.parse(filter) : {};
    if (!queryFilter.question) {
      return res
        .status(400)
        .json({ message: "Query parameter 'question' is required." });
    }

    const questions = await QuestionModel.find({
      question: { $regex: queryFilter.question, $options: "i" }, // Case-insensitive search
    });

    if (!questions) {
      return res.status(400).json("Question(s) not found");
    }

    res.status(200).json(questions);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
