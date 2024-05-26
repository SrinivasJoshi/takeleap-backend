const serverless = require("serverless-http");
const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require('cors');
const {getXataClient} = require('./xata');

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
  const xata = getXataClient();
  try {
    let data = req.body.mentorData;
    const greScore = await xata.db.greScore.create({Q:data.greQ,V:data.greV,AWA:data.greAWA});
    const toeflScore = await xata.db.toeflScore.create({
      speaking:data.toeflSpeaking,
      listening:data.toeflListening,
      reading:data.toeflReading,
      writing:data.toeflWriting,
    });

    const publications = await xata.db.publications.create(data.publications);
    const professionalExperiences = await xata.db.professionalExperiences.create(data.professionalExperiences);

    const publicationIds = publications.map((publication) => publication.id);
    const experienceIds = professionalExperiences.map((experience) => experience.id);

    const mentor = await xata.db.mentors.create({
      name:data.name,
      gender: data.gender,
      currentLocation: data.currentLocation,
      currentStatus: data.currentStatus,
      classRank: data.classRank,
      greLink:greScore.id,
      toeflLink:toeflScore.id,
      contactNumber: data.contactNumber,

      underGradInstitution: data.underGradInstitution,
      underGradDegree: data.underGradDegree,
      undergraduateGPA: data.undergraduateGPA,

      postGraduateInstitution: data.postGraduateInstitution,
      postGraduateDegree: data.postGraduateDegree,
      programName: data.programName,
      universityName: data.universityName,

      publicationLinks : publicationIds,
      experienceLinks: experienceIds,
    })

    res.status(201).json(mentor);
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

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

module.exports = app
// exports.handler = serverless(app);
