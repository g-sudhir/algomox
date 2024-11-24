require("dotenv").config({ path: "./../config.env" });
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET;

const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
};

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.userId;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = { generateToken, getUserIdFromToken };
