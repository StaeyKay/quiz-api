import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import mongoosePaginate from "mongoose-paginate-v2";

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true },
    category: { type: String, required: true },
    playerId: { type: Types.ObjectId, ref: "Player", required: true },
  },
  {
    timestamps: true,
  }
);

questionSchema.plugin(toJSON);
questionSchema.plugin(mongoosePaginate);

export const QuestionModel = model("Question", questionSchema);
