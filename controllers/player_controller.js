import e from "express";
import { PlayerModel } from "../models/player_model.js";

export function saveSessionData(session) {
  const sessionString = JSON.stringify(session);
  window.localStorage.setItem("DATABASE", sessionString);
}

// Start new game session
export const startSession = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Player name is required" });
    }

    const player = await PlayerModel.create({
      name,
      currentScore: 0,
      isActive: true,
    });

    // Generate a session for the player
    req.session.player = { id: player.id };

    return res.status(201).json({
      message: "Game session started successfully",
      // playerId: player.id,
      // sessionID: req.sessionID,
      // session: req.session,
      player,
    });
  } catch (error) {
    console.error("Error starting game session", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// End game session
export const endSession = async (req, res) => {
  try {
    const { playerId, score, category } = req.body;

    const player = await PlayerModel.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    player.gameHistory.push({
      score,
      category,
    });
    player.currentScore = 0;
    player.isActive = false;
    await player.save();

    // Destroy user session
    await req.session.destroy();

    return res.status(200).json({
      message: "Game session ended",
      player,
    });
  } catch (error) {
    console.log("Error ending game session", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get player details
export const getPlayerStats = async (req, res) => {
  try {
    const { playerId } = req.params;
    const player = await PlayerModel.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    return res.status(200).json(player);
  } catch (error) {
    console.log("Error fetching player stats", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
