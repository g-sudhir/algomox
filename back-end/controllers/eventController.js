const Event = require("./../models/eventsModel");

exports.getAllEvent = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      status: "success",
      data: events,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.postEvent = async (req, res) => {
  try {
    console.log(req.body);
    const newEvent = await Event.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Event created successfully",
      data: {
        newEvent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// exports.postRegisterEvent = (req, res) => {};
