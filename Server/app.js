const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ No options needed with Mongoose 6+
mongoose.connect('mongodb+srv://dhruvipatrl1611:IKPo8HAYyyl7mLhA@cluster0.fww8jwy.mongodb.net/project_portal')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const adminRoutes = require('./routes/admin.route');
app.use('/api/admin', adminRoutes);

// Server
app.listen(5000, () => console.log('Server running on port 5000'));
