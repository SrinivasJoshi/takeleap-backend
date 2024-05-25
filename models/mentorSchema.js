const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  journalName: { type: String, required: [true, 'Journal name is required'] },
  link: { type: String },
});

const ProfessionalExpSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  companyName: { type: String, required: [true, 'Company name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  awardsRecognition: { type: String },
  numberOfPromotions: { type: Number },
});

const GREScoreSchema = new mongoose.Schema({
  Q: { type: Number, required: true },
  V: { type: Number, required: true },
  AWA: { type: Number, required: true },
  total: {
    type: Number,
    validate: {
      validator: function(v) {
        // Automatically calculate total if not provided
        if (!this.total) {
          this.total = this.Q + this.V + this.AWA;
        }
        return v === this.Q + this.V + this.AWA;
      },
      message: props => `Total GRE score does not match the sum of the parts: expected ${props.value}`
    }
  },
});

const TOEFLScoreSchema = new mongoose.Schema({
  speaking: { type: Number, required: true },
  writing: { type: Number, required: true },
  listening: { type: Number, required: true },
  reading: { type: Number, required: true },
  total: {
    type: Number,
    validate: {
      validator: function(v) {
        // Automatically calculate total if not provided
        if (!this.total) {
          this.total = this.speaking + this.writing + this.listening + this.reading;
        }
        return v === this.speaking + this.writing + this.listening + this.reading;
      },
      message: props => `Total TOEFL score does not match the sum of the parts: expected ${props.value}`
    }
  },
});

const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  currentLocation: { type: String, required: true },
  currentStatus: { type: String, enum: ['Working', 'Student'], required: true },
  classRank: { type: Number, required: true },
  greScore: GREScoreSchema,
  toeflScore: TOEFLScoreSchema,

  underGradInstitution: { type: String, required: true },
  underGradDegree: { type: String, required: true },
  undergraduateGPA: { type: Number, required: true, min: 0, max: 4 },
  
  postGraduateInstitution: { type: String, required: true },
  postGraduateDegree: { type: String, required: true },
  programName: { type: String, required: true },
  universityName: { type: String, required: true },
  
  publications: { type: [PublicationSchema], default: [] },
  professionalExperiences: { type: [ProfessionalExpSchema], default: [] },
});
const Mentor = mongoose.model('Mentor', MentorSchema);
module.exports = {Mentor}
