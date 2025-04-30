const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');

// Hardcoded limits
const MAX_EMPLOYEES = 25;

router.post('/add', async (req, res) => {
  const { name, email, position, companyId } = req.body;

  try {
    // Check the number of existing employees for the company
    const employeeCount = await Employee.countDocuments({ companyId });

    if (employeeCount >= MAX_EMPLOYEES) {
      return res.status(400).json({ message: `You can only have up to ${MAX_EMPLOYEES} employees.` });
    }

    const newEmployee = await Employee.create({ name, email, position, companyId });
    res.status(201).json({ message: 'Employee added', employee: newEmployee });
  } catch (error) {
    console.error(error); // Log the error for better debugging
    res.status(500).json({ message: 'Error adding employee', error: error.message });
  }
});

module.exports = router;
