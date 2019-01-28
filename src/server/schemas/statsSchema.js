const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statsSchema = new Schema({
  name: String,
  location: { type: String, required: true },
  setting: Boolean, // indoor true, outdoor false
  type: { type: String, required: true },
  rating: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  flashed: Boolean,
  onsited: Boolean
});

module.exports = mongoose.model('Stats', statsSchema);
