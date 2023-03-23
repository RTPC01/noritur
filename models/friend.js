const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  username: String,
  location: String
});

module.exports = mongoose.model('Friend', friendSchema);