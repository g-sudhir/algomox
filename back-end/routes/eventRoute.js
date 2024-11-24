const express = require("express");
const eventController = require("./../controllers/eventController");

const router = express.Router();

router
  .route("/")
  .get(eventController.getAllEvent)
  .post(eventController.postEvent);

// router.route("/:id").post(eventController.postRegisterEvent);

module.exports = router;
