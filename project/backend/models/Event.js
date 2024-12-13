const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
    },
    // capacity: {
    //   type: Number,
    //   required: [true, "Capacity is required"],
    // },
    // category: {
    //   type: String,
    //   required: [true, "Category is required"],
    //   enum: ["conference", "workshop", "seminar", "other"],
    // },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registrations: [registrationSchema],
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for registration count
eventSchema.virtual("registrationCount").get(function () {
  return this.registrations.length;
});

// Virtual for available spots
eventSchema.virtual("availableSpots").get(function () {
  return this.capacity - this.registrations.length;
});

// Index for searching
eventSchema.index({ title: "text", description: "text" });

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
