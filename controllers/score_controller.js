import { ScoreModel } from "../models/score_model.js";
import { PlayerModel } from "../models/player_model.js";

// Endpoint to post player score
export const addScore = async (req, res) => {
  try {
    const { playerId, score, category } = req.body;
    if (playerId === undefined || score === undefined || !category) {
      return res.status(400).json("PlayerId, score and category are required");
    }
    // Create score entry
    const scoreSaved = await ScoreModel.create({playerId, score, category});

    // Update player's game history
    const player = await PlayerModel.findByIdAndUpdate(
      playerId,
      {
        $push: {gameHistory: {score, category, date: new Date()}},
        currentScore: score
      },
      {new: true}
    );
      if(!player) {
        return res.status(404).json({message: "Player not found"});
      }
    
    return res.status(200).json({
      message: "Score added and game history updated",
      scoreSaved,
      player,
    });
  } catch (error) {
    console.log("error posting score:", error.message);
    return res.status(400).json("error posting score:", error.message);
  }
};
