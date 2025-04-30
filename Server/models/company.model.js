const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  adminName: { type: String, required: true },
  adminEmail: { type: String, required: true, unique: true },
  adminPassword: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // 'Pending' or 'Approved'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Company', companySchema);
