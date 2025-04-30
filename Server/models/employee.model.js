const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
