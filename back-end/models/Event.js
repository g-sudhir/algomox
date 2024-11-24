const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  category: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Event', eventSchema);
