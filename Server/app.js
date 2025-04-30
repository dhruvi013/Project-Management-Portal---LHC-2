const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://dhruvipatrl1611:IKPo8HAYyyl7mLhA@cluster0.fww8jwy.mongodb.net/project_portal')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const adminRoutes = require('./routes/admin.route');
app.use('/api/admin', adminRoutes);
const companyadminRoutes = require('./routes/companyadmin.route');
app.use('/api/companyadmin', companyadminRoutes);
const employeeRoute = require('./routes/employee.route');
app.use('/api/employee', employeeRoute);
const projectRoute = require('./routes/project.route');
app.use('/api/project', projectRoute);



// Server
app.listen(5000, () => console.log('Server running on port 5000'));
