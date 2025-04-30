const express = require('express');
const router = express.Router();
const Project = require('../models/project.model');

// Hardcoded limits
const MAX_PROJECTS = 5;

router.post('/add', async (req, res) => {
  const { name, description, companyId } = req.body;

  try {
    // Check the number of existing projects for the company
    const projectCount = await Project.countDocuments({ companyId });

    if (projectCount >= MAX_PROJECTS) {
      return res.status(400).json({ message: `You can only have up to ${MAX_PROJECTS} projects.` });
    }

    const newProject = await Project.create({ name, description, companyId });
    res.status(201).json({ message: 'Project created', project: newProject });
  } catch (error) {
    console.error(error); // Log the error for better debugging
    res.status(500).json({ message: 'Error adding project', error: error.message });
  }
});

module.exports = router;
