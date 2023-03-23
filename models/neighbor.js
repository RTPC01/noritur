const mongoose = require('mongoose');

const neighborSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String
});

module.exports = mongoose.model('Neighbor', neighborSchema);