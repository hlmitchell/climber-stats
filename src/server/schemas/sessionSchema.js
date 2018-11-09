const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('sessions', sessionSchema);