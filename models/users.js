const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  age: Number,
  gender: String,
  location: String,
  phoneNumber: String
});

module.exports = mongoose.model('User', userSchema);