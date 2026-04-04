const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, default: 'Assistant Professor' },
  qualification: { type: String },
  specialization: { type: String },
  experience: { type: String },
  email: { type: String },
  subjectsTaught: [{ type: String }],
  isHOD: { type: Boolean, default: false },
});

const SubjectSchema = new mongoose.Schema({
  code: { type: String },
  name: { type: String, required: true },
  credits: { type: Number },
  type: { type: String, enum: ['Theory', 'Practical', 'Tutorial'], default: 'Theory' },
  faculty: { type: String },
});

const SemesterSchema = new mongoose.Schema({
  semNumber: { type: Number, required: true },
  subjects: [SubjectSchema],
});

const BranchSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true }, // CE, IT, ICT...
    name: { type: String, required: true },
    shortDescription: { type: String },
    fullDescription: { type: String },
    intake: { type: Number },
    hod: { type: String },
    hodEmail: { type: String },
    establishedYear: { type: Number },
    accreditation: { type: String, default: 'NBA Accredited' },
    labsAndFacilities: [{ type: String }],
    careerOpportunities: [{ type: String }],
    topRecruiters: [{ type: String }],
    faculty: [FacultySchema],
    semesters: [SemesterSchema],
    averagePackage: { type: String },
    highestPackage: { type: String },
    placementPercent: { type: Number },
    keywords: [{ type: String }], // For search
  },
  { timestamps: true }
);

// Full-text index for search
BranchSchema.index({ name: 'text', shortDescription: 'text', keywords: 'text' });

module.exports = mongoose.model('Branch', BranchSchema);
