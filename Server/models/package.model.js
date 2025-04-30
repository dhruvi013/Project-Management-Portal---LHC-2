const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  name: String,
  maxProjects: Number,
  maxUsers: Number
});

module.exports = mongoose.model('Package', PackageSchema);
