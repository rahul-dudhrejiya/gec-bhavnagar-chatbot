const mongoose = require('mongoose');

// ─── Placement Model ──────────────────────────────────────────────────────────
const PlacementRecordSchema = new mongoose.Schema({
  year: { type: String, required: true },
  branch: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String },
  package: { type: String },
  studentsPlaced: { type: Number },
  type: { type: String, enum: ['On-Campus', 'Off-Campus', 'PPO'], default: 'On-Campus' },
});

const PlacementStatsSchema = new mongoose.Schema(
  {
    year: { type: String, required: true },
    totalStudentsPlaced: { type: Number },
    highestPackage: { type: String },
    averagePackage: { type: String },
    totalCompanies: { type: Number },
    overallPlacementPercent: { type: Number },
    topCompanies: [{ type: String }],
    branchWiseStats: [
      {
        branch: String,
        placed: Number,
        total: Number,
        highestPackage: String,
        averagePackage: String,
      },
    ],
    records: [PlacementRecordSchema],
  },
  { timestamps: true }
);

// ─── Holiday Model ────────────────────────────────────────────────────────────
const HolidaySchema = new mongoose.Schema(
  {
    academicYear: { type: String, required: true }, // e.g., "2025-26"
    holidays: [
      {
        date: { type: String, required: true },
        day: { type: String },
        occasion: { type: String, required: true },
        type: {
          type: String,
          enum: ['National', 'Festival', 'Regional', 'University', 'Weekend'],
          default: 'Festival',
        },
      },
    ],
    collegeTimings: {
      weekdays: { type: String, default: '10:45 AM to 5:45 PM' },
      saturday: { type: String, default: '10:45 AM to 5:45 PM (1st, 3rd, 5th)' },
      offSaturdays: { type: String, default: '2nd & 4th Saturdays are holidays' },
      sunday: { type: String, default: 'Holiday' },
    },
  },
  { timestamps: true }
);

// ─── Notice / Announcement Model ──────────────────────────────────────────────
const NoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ['Exam', 'Placement', 'Holiday', 'Academic', 'Sports', 'Cultural', 'General'],
      default: 'General',
    },
    branch: { type: String, default: 'All' },
    postedDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },
    link: { type: String },
    isImportant: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ─── Chat History Model ───────────────────────────────────────────────────────
const ChatHistorySchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    messages: [
      {
        role: { type: String, enum: ['user', 'bot'], required: true },
        text: { type: String, required: true },
        category: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    totalMessages: { type: Number, default: 0 },
    userAgent: { type: String },
  },
  { timestamps: true }
);

// ─── GTU Info Model ───────────────────────────────────────────────────────────
const GTUInfoSchema = new mongoose.Schema(
  {
    category: { type: String, required: true }, // 'result', 'papers', 'portal', 'exam', etc.
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    keywords: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = {
  PlacementStats: mongoose.model('PlacementStats', PlacementStatsSchema),
  Holiday: mongoose.model('Holiday', HolidaySchema),
  Notice: mongoose.model('Notice', NoticeSchema),
  ChatHistory: mongoose.model('ChatHistory', ChatHistorySchema),
  GTUInfo: mongoose.model('GTUInfo', GTUInfoSchema),
};
