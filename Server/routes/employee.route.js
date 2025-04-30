const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');

const MAX_EMPLOYEES = 25;

// Route: POST /api/employee/add
router.post('/add', async (req, res) => {
  const { name, email, position, companyId } = req.body;

  try {
    const employeeCount = await Employee.countDocuments({ companyId });

    if (employeeCount >= MAX_EMPLOYEES) {
      return res.status(400).json({ message: `You can only have up to ${MAX_EMPLOYEES} employees.` });
    }

    const newEmployee = await Employee.create({ name, email, position, companyId });
    res.status(201).json({ message: 'Employee added', employee: newEmployee });
  } catch (error) {
    console.error('Add employee error:', error);
    res.status(500).json({ message: 'Error adding employee', error: error.message });
  }
});

// For Express.js + MongoDB/Mongoose:
router.get('/api/employee', async (req, res) => {
  try {
    const employees = await Employee.find(); // <-- This hits the "employee" table/collection
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching employees' });
  }
});
