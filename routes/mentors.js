require('dotenv/config');
// const {ClerkExpressWithAuth,ClerkExpressRequireAuth} = require('@clerk/clerk-sdk-node');
const express = require('express');
const { getXataClient } = require('../xata');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getAllMentors', async(req, res) => {
  const xata = getXataClient();
    try {
      let data = await xata.db['personalMentors'].getMany();
      res.status(200).send({Status:'200',Data:data,err:''});
    } catch (error) {
      console.log(error);
      res.status(200).send({Status:'500',Data:[],err:'Internal Server Error'});
    }
});

router.get('/getMentorById',async(req,res)=>{
    const xata = getXataClient();
    const mentordId = req.body.mentorId;
    try {
      let data = await xata.db['personalMentors'].read(mentordId);
      res.status(200).send({Status:'200',Data:data,err:''});
    } catch (error) {
      console.log(error);
      res.status(200).send({Status:'500',Data:[],err:'Internal Server Error'});
    }
});

router.post('/addMentorPersonalData', upload.single('file'), async (req, res) => {
  const xata = getXataClient();
  let data = req.body; 

  try {
    const admits = await xata.db.admits.create(JSON.parse(data.admits));
    const admitIds = admits.map((admit) => admit.id);

    let avatar = {};
    if (req.file) {
      const file = req.file;
      const imageName = file.originalname;
      const base64Content = file.buffer.toString('base64');
      avatar = {
        name: imageName,
        mediaType: 'image/*',
        base64Content: base64Content
      };
    }

    const mentors = await xata.db.personalMentors.create({
      id: data.id,
      name: data.name,
      gender: data.gender,
      currentLocation: data.currentLocation,
      currentStatus: data.currentStatus,
      contactNumber: data.contactNumber,
      greScore: parseInt(data.greScore),
      toeflScore: parseInt(data.toeflScore),
      avatar: avatar,
      admitLinks: admitIds
    });

    res.status(200).send({Status: '201', Data: mentors, error: ''})
  } catch (error) {
    console.log(error);
    res.status(400).send({Status: '400', Data: [], error})
  }
});

router.post('/addMentorAcademicData',async(req,res)=>{
  const xata = getXataClient();
  let data = req.body; 

  try {
    const academicRecord = await xata.db.academic.create({
      masterUni: data.masterUni,
      masterProgram: data.masterProgram,
      gpaScore:data.gpaScore,
      gpaTotal:data.gpaTotal,
      startTerm:data.startTerm,
      startYear:data.startYear,
      endTerm:data.endTerm,
      endYear:data.endYear,

      undergradUni:data.undergradUni,
      undergradProgram:data.undergradProgram,
      undergradGpaScore:data.undergradGpaScore,
      undergradGpaTotal:data.undergradGpaTotal,
      classRank:data.classRank,
      totalStudents:data.totalStudents,
      underStartYear:data.underStartYear,
      underEndYear:data.underEndYear,

      numberOfDoi:data.numberOfDoi,
      doi:data.doi,
    });

     // Link this to personalMentor table
     const updatedMentorData = await xata.db.personalMentors.update(data.id,{academicLink:academicRecord.id});
     updatedMentorData.update({academicLink : academicRecord.id});
 
     res.send(200).send({Status:'200',Data:[],error:''});
  } catch (error) {
    console.log(error);
    res.status(400).send({Status: '400', Data: [], error})
  }
});

router.post('/addMentorProfessionalData',async(req,res)=>{
  const xata = getXataClient();
  let data = req.body; 

  try {
    const professionalExps = await xata.db.professionalExperiences.create(data);
    const professionalExpIds = professionalExps.map((professionalExp) => professionalExp.id);

    // Link this to personalMentor table
    const updatedMentorData = await xata.db.personalMentors.update(data.id,{professionalLinks:professionalExpIds});
    updatedMentorData.update({professionalLinks : professionalExpIds});

    res.send(200).send({Status:'200',Data:[],error:''});
  } catch (error) {
    console.log(error);
    res.status(400).send({Status: '400', Data: [], error})
  }
});

router.post('/addMentorMentorshipData',async(req,res)=>{
  const xata = getXataClient();
  let data = req.body; 

  try {
    const mentorshipData = await xata.db.mentorship.create({
      programs: data.programs,
      expertise: data.expertise,
      studentsToMentor: data.studentsToMentor
    });

     // Link this to personalMentor table
     const updatedMentorData = await xata.db.personalMentors.update(data.id,{mentorshipLink:mentorshipData.id});
     updatedMentorData.update({mentorshipLink : mentorshipData.id});
 
     res.send(200).send({Status:'200',Data:[],error:''});

  } catch (error) {
    console.log(error);
    res.status(400).send({Status: '400', Data: [], error})
  }
});

router.post('/addMentor', async (req, res) => {
    const xata = getXataClient();
    try {
      let data = req.body.mentorData;
      const greScore = await xata.db.greScore.create({
        Q:parseInt(data.greQ),
        V:parseInt(data.greV),
        AWA:parseInt(data.greAWA)
      });
      const toeflScore = await xata.db.toeflScore.create({
        speaking:parseInt(data.toeflSpeaking),
        listening:parseInt(data.toeflListening),
        reading:parseInt(data.toeflReading),
        writing:parseInt(data.toeflWriting),
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
        classRank: parseInt(data.classRank),
        greLink:greScore.id,
        toeflLink:toeflScore.id,
        contactNumber: data.contactNumber,
  
        underGradInstitution: data.underGradInstitution,
        underGradDegree: data.underGradDegree,
        undergraduateGPA: parseFloat(data.undergraduateGPA),
  
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
  

module.exports = router;