const express = require("express");
const adminController = require("./../controllers/adminController");

const router = express.Router();

router.route("/login").post(adminController.adminLogin);

router.route("/register").post(adminController.adminRegister);

module.exports = router;
