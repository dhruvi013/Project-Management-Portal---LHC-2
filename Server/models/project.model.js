const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
