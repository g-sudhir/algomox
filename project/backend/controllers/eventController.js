const Event = require("../models/Event");
const { catchAsync } = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Get all events
const getAllEvents = catchAsync(async (req, res) => {
  const { search, category, startDate, endDate } = req.query;
  const query = {};

  // Search filter
  if (search) {
    query.$text = { $search: search };
  }

  // Category filter
  if (category) {
    query.category = category;
  }

  // Date filter
  if (startDate || endDate) {
    query.startDate = {};
    if (startDate) query.startDate.$gte = new Date(startDate);
    if (endDate) query.startDate.$lte = new Date(endDate);
  }

  const events = await Event.find(query)
    .populate("organizer", "name email")
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    results: events.length,
    data: { events },
  });
});

// Get single event
const getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id)
    .populate("organizer", "name email")
    .populate("registrations.user", "name email");

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { event },
  });
});

// Create event
const createEvent = catchAsync(async (req, res) => {
  const event = await Event.create({
    title: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    venue: req.body.location,
    imageUrl: req.body.image,
    organizer: req.user.id,
    isPublished: true,
  });

  res.status(201).json({
    status: "success",
    data: { event },
  });
});
// 675b0cc55738a261abd6fba4
// Update event
const updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  // Check if user is the organizer
  if (event.organizer.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new AppError("You are not authorized to update this event", 403)
    );
  }

  Object.assign(event, req.body);
  await event.save();

  res.status(200).json({
    status: "success",
    data: { event },
  });
});

// Delete event
const deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  // Check if user is the organizer
  if (event.organizer.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new AppError("You are not authorized to delete this event", 403)
    );
  }

  await event.deleteOne();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Register for event
const registerForEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  // Check if event is full
  if (event.registrationCount >= event.capacity) {
    return next(new AppError("Event is full", 400));
  }

  // Check if user is already registered
  const alreadyRegistered = event.registrations.some(
    (reg) => reg.user.toString() === req.user.id
  );

  if (alreadyRegistered) {
    return next(new AppError("You are already registered for this event", 400));
  }

  event.registrations.push({
    user: req.user.id,
    status: "confirmed",
  });

  await event.save();

  res.status(200).json({
    status: "success",
    message: "Successfully registered for the event",
  });
});

// Get user's registered events
const getMyEvents = catchAsync(async (req, res) => {
  const events = await Event.find({
    "registrations.user": req.user.id,
    "registrations.status": "confirmed",
  }).populate("organizer", "name email");

  res.status(200).json({
    status: "success",
    results: events.length,
    data: { events },
  });
});

// Get event registrations (admin only)
const getEventRegistrations = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id).populate(
    "registrations.user",
    "name email profileImage"
  );
  console.log(event);

  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { registrations: event.registrations },
  });
});

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getMyEvents,
  getEventRegistrations,
};
