import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: Number, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

questionSchema.plugin(toJSON);

export const QuestionModel = model("Question", questionSchema);
