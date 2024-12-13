const express = require("express");
const {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getMyEvents,
  getEventRegistrations,
} = require("../controllers/eventController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

// Public routes
router.get("/", getAllEvents);
router.get("/:id", getEvent);

// Protected routes
router.use(protect);

// User routes
router.get("/my/events", getMyEvents);
router.post("/:id/register", registerForEvent);

// Admin routes
router.use(restrictTo("admin"));
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.get("/:id/registrations", getEventRegistrations);

module.exports = router;
