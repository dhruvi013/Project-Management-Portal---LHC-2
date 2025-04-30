const express = require('express');
const router = express.Router();
const Package = require('../models/package.model');

// Hardcoded admin credentials
const SUPER_ADMIN = { username: 'admin', password: 'admin123' };

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === SUPER_ADMIN.username && password === SUPER_ADMIN.password) {
    return res.json({ success: true });
  }
  return res.status(401).json({ message: 'Unauthorized' });
});

// Create package endpoint
router.post('/packages', async (req, res) => {
  try {
    const { name, maxProjects, maxUsers } = req.body;
    const newPackage = new Package({ name, maxProjects, maxUsers });
    await newPackage.save();
    res.json(newPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating package', error });
  }
});

// View packages
router.get('/packages', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error });
  }
});

//Delete package by ID
router.delete('/packages/:id', async (req, res) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    res.json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package', error });
  }
});

module.exports = router;
