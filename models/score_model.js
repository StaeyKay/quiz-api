import { Types, Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const scoreSchema = new Schema (
    {
        score: {type: Number},
        playerId: {type: Types.ObjectId, ref: 'Player', required: true}
    },
    {
        timestamps: true
    }
);

scoreSchema.plugin(toJSON);

export const ScoreModel = model("Score", scoreSchema);