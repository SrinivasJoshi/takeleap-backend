const serverless = require("serverless-http");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const { Mentor } = require("./models/mentorSchema");
const port = process.env.PORT || 3000;
const cors = require('cors');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json())
app.get("/takeleap", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

// POST endpoint to add a mentor
app.post('/takeleap/addMentor', async (req, res) => {
  try {
    const mentor = new Mentor(req.body.mentorData);
    const savedMentor = await mentor.save();
    res.status(201).json(savedMentor);
  } catch (error) {
    console.error('Error adding mentor:', error);
    res.status(500).json({ message: 'Failed to add mentor', error: error.message });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

exports.handler = serverless(app);
