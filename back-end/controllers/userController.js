const jwtProvider = require('../config/jwtProvider');
const User = require('../models/User');

exports.getUserProfileHandler = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];
    const userId = await jwtProvider.getUserIdFromToken(jwt);

    console.log("user id ", userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "user not found with id: " + userId });
    }

    user.password = null; 

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      error: error.message,
      status: "Fail",
    });
  }
};
