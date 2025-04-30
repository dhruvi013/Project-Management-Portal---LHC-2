// company.routes.js

const express = require('express');
const router = express.Router();
const Company = require('../models/company.model');
const Package = require('../models/package.model');

// Hardcoded super admin credentials
const SUPER_ADMIN = { username: 'admin', password: 'admin123' };

// Login endpoint
router.post('/login', async (req, res) => {
    const { adminEmail, adminPassword } = req.body;
    if (adminEmail === SUPER_ADMIN.adminEmail && adminPassword === SUPER_ADMIN.adminPassword) {
      return res.json({ success: true });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  });
  
// Register company admin
router.post('/register', async (req, res) => {
  const { companyName, adminName, adminEmail, adminPassword, packageName } = req.body;

  try {
    // Check if the provided packageName exists in the Package collection
    const package = await Package.findOne({ name: packageName });
    if (!package) {
      return res.status(400).json({ message: 'Invalid package name' });
    }

    const existingCompany = await Company.findOne({ adminEmail });
    if (existingCompany) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const newCompany = new Company({
      companyName,
      adminName,
      adminEmail,
      adminPassword,
      packageName: package._id,  // Store the ObjectId of the package
    });

    await newCompany.save();
    res.status(201).json({ success: true, message: 'Registration successful. Awaiting admin approval.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering company admin', error });
  }
});

// Approve company admin (super admin only)
router.post('/approve/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.status = 'Approved';
    await company.save();
    res.json({ success: true, message: 'Company approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving company', error });
  }
});

// View registered companies (super admin only)
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.find().populate('packageName');  // Populate packageName field
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching companies', error });
  }
});

module.exports = router;
