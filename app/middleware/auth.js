const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { RefreshToken } = require("../../models");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_ACCES_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json(err);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { verifyToken };
