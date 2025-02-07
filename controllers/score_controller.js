import { ScoreModel } from "../models/score_model.js";

// Endpoint to post player score
export const addScore = async (req, res) => {
    try {
        console.log("request body:", req)
        const {player, score} = req.body;
        if(!player && !score) {
            return res.status(400).json("Player and score not found")
        }
        const scoreSaved = await ScoreModel.create(req.body)
        return res.status(200).json(scoreSaved)
    } catch (error) {
        console.log("error posting score:", error.message);
        return res.status(400).json("error posting score:", error.message)
    }
}