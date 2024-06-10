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
      res.status(200).send({Status:'500',Data:[],err:'Internal Server Error',errorMessage:error.toString()});
    }
});

router.get('/getMentorById',async(req,res)=>{
    const xata = getXataClient();
    const mentordId = req.body.mentorId;
    try {
      let {contactNumber,...data} = await xata.db['personalMentors'].read(mentordId);
      if(!data){
        return res.status(200).send({Status:'200',Data:[],err:''});
      }
      let admitIds = data.admitLinks ? data.admitLinks : [];
      let expIds = data.professionalLinks ? data.professionalLinks : [];
      let academicId = data.academicLink?.id;
      let mentorshipId = data.mentorshipLink?.id;

      let admits = await Promise.all(admitIds.map(async (admitId) => {
        return await xata.db.admits.read(admitId);
      }));

      let professionalExperiences = await Promise.all(expIds.map(async (expId) => {
        return await xata.db.professionalExperiences.read(expId);
      }));

      let academicData = [];
      if(academicId){
        academicData = await xata.db.academic.read(academicId);
      }
      let mentorshipData =[];
      if(mentorshipId){
        mentorshipData = await xata.db.mentorship.read(mentorshipId);
      }

      const {admitLinks,professionalLinks,academicLink,mentorshipLink,...finalData} = {
        admits,
        academicData,
        mentorshipData,
        professionalExperiences,
        ...data,
      }

      res.status(200).send({Status:'200',Data:finalData,err:''});
    } catch (error) {
      console.log(error);
      res.status(200).send({Status:'500',Data:[],err:'Internal Server Error',errorMessage:error.toString()});
    }
});

router.post('/addMentorPersonalData', upload.single('file'), async (req, res) => {
  const xata = getXataClient();
  let data = req.body; 
  console.log(data)

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
      avatar: [avatar],
      admitLinks: admitIds
    });

    console.log(mentors);

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
      gpaScore:parseInt(data.gpaScore),
      gpaTotal:parseInt(data.gpaTotal),
      startTerm:data.startTerm,
      startYear:parseInt(data.startYear),
      endTerm:data.endTerm,
      endYear:parseInt(data.endYear),

      undergradUni:data.undergradUni,
      undergradProgram:data.undergradProgram,
      undergradGpaScore:parseInt(data.undergradGpaScore),
      undergradGpaTotal:parseInt(data.undergradGpaTotal),
      classRank:parseInt(data.classRank),
      totalStudents:parseInt(data.totalStudents),
      underStartYear:parseInt(data.underStartYear),
      underEndYear:parseInt(data.underEndYear),

      numberOfDoi:parseInt(data.numberOfDoi),
      doi:data.doi,
    });

     // Link this to personalMentor table
     const updatedMentorData = await xata.db.personalMentors.update(data.id,{academicLink:academicRecord.id});
     updatedMentorData.update({academicLink : academicRecord.id});
 
     res.status(200).send({Status:'200',Data:[],error:''});
  } catch (error) {
    console.log(error);
    res.status(400).send({Status: '400', Data: [], error})
  }
});

router.post('/addMentorProfessionalData',async(req,res)=>{
  const xata = getXataClient();
  let data = req.body; 

  try {
    const professionalExps = await xata.db.professionalExperiences.create(data.professionalExperiences);
    const professionalExpIds = professionalExps.map((professionalExp) => professionalExp.id);

    // Link this to personalMentor table
    const updatedMentorData = await xata.db.personalMentors.update(data.id,{professionalLinks:professionalExpIds});
    updatedMentorData.update({professionalLinks : professionalExpIds});

    res.status(200).send({Status:'200',Data:[],error:''});
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
      studentsToMentor: parseInt(data.studentsToMentor),
      reasonToMentor: data.reasonToMentor,
    });

     // Link this to personalMentor table
     const updatedMentorData = await xata.db.personalMentors.update(data.id,{mentorshipLink:mentorshipData.id});
     updatedMentorData.update({mentorshipLink : mentorshipData.id});
 
     res.status(200).send({Status:'200',Data:[],error:''});

  } catch (error) {
    console.log(error);
    res.status(400).send({Status: '400', Data: [], error})
  }
});


module.exports = router;