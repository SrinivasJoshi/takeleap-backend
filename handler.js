require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const mentorRouter = require('./routes/mentors');

app.use(cors());
app.use(express.json())

app.use('/takeleap',mentorRouter);

// // POST endpoint to add a mentor
// app.post('/takeleap/addMentor', async (req, res) => {
//   const xata = getXataClient();
//   try {
//     let data = req.body.mentorData;
//     const greScore = await xata.db.greScore.create({
//       Q:parseInt(data.greQ),
//       V:parseInt(data.greV),
//       AWA:parseInt(data.greAWA)
//     });
//     const toeflScore = await xata.db.toeflScore.create({
//       speaking:parseInt(data.toeflSpeaking),
//       listening:parseInt(data.toeflListening),
//       reading:parseInt(data.toeflReading),
//       writing:parseInt(data.toeflWriting),
//     });

//     const publications = await xata.db.publications.create(data.publications);
//     const professionalExperiences = await xata.db.professionalExperiences.create(data.professionalExperiences);

//     const publicationIds = publications.map((publication) => publication.id);
//     const experienceIds = professionalExperiences.map((experience) => experience.id);

//     const mentor = await xata.db.mentors.create({
//       name:data.name,
//       gender: data.gender,
//       currentLocation: data.currentLocation,
//       currentStatus: data.currentStatus,
//       classRank: parseInt(data.classRank),
//       greLink:greScore.id,
//       toeflLink:toeflScore.id,
//       contactNumber: data.contactNumber,

//       underGradInstitution: data.underGradInstitution,
//       underGradDegree: data.underGradDegree,
//       undergraduateGPA: parseFloat(data.undergraduateGPA),

//       postGraduateInstitution: data.postGraduateInstitution,
//       postGraduateDegree: data.postGraduateDegree,
//       programName: data.programName,
//       universityName: data.universityName,

//       publicationLinks : publicationIds,
//       experienceLinks: experienceIds,
//     })

//     res.status(201).json(mentor);
//   } catch (error) {
//     console.error('Error adding mentor:', error);
//     res.status(500).json({ message: 'Failed to add mentor', error: error.message });
//   }
// });

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app
// exports.handler = serverless(app);
