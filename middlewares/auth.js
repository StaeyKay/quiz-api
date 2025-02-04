export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.player) {
    next();
  } else {
    return res.status(401).json({ message: "No player session" });
  }
};
