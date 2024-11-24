const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

router.route("/login").post(userController.getUserId);

router.route("/register").post(userController.createUserId);

router.route("/user-events").get(userController.userEvents);

module.exports = router;
