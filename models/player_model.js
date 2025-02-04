import { model, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const playerSchema = new Schema(
  {
    name: { type: String, required: true },
    currentScore: { type: Number, default: 0 },
    gameHistory: [
      {
        date: { type: Date, default: Date.now },
        score: Number,
        category: String,
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

playerSchema.plugin(toJSON);

export const PlayerModel = model("Player", playerSchema);
