require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const mentorRouter = require('./routes/mentors');

app.use(cors());
app.use(express.json())

app.use('/takeleap',mentorRouter);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app
