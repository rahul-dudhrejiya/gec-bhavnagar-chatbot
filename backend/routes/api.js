const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');
const { PlacementStats, Holiday, Notice } = require('../models/OtherModels');

// ─── Branch Routes ─────────────────────────────────────────────────────────────

// GET /api/branches – all branches summary
router.get('/branches', async (req, res) => {
  try {
    const branches = await Branch.find({}, '-semesters -faculty._id -__v');
    res.json({ success: true, count: branches.length, data: branches });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// GET /api/branches/:code – single branch full detail
router.get('/branches/:code', async (req, res) => {
  try {
    const branch = await Branch.findOne({ code: req.params.code.toUpperCase() });
    if (!branch) return res.status(404).json({ success: false, error: 'Branch not found' });
    res.json({ success: true, data: branch });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// GET /api/branches/:code/faculty
router.get('/branches/:code/faculty', async (req, res) => {
  try {
    const branch = await Branch.findOne({ code: req.params.code.toUpperCase() }, 'code name faculty');
    if (!branch) return res.status(404).json({ success: false, error: 'Branch not found' });
    res.json({ success: true, branch: branch.code, data: branch.faculty });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// GET /api/branches/:code/semesters/:sem
router.get('/branches/:code/semesters/:sem', async (req, res) => {
  try {
    const branch = await Branch.findOne({ code: req.params.code.toUpperCase() }, 'code name semesters');
    if (!branch) return res.status(404).json({ success: false, error: 'Branch not found' });
    const sem = branch.semesters.find(s => s.semNumber === parseInt(req.params.sem));
    if (!sem) return res.status(404).json({ success: false, error: 'Semester not found' });
    res.json({ success: true, branch: branch.code, data: sem });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// ─── Placement Routes ─────────────────────────────────────────────────────────

// GET /api/placements
router.get('/placements', async (req, res) => {
  try {
    const data = await PlacementStats.findOne({ year: '2025-26' });
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// GET /api/placements/:branch
router.get('/placements/:branch', async (req, res) => {
  try {
    const data = await PlacementStats.findOne({ year: '2025-26' });
    if (!data) return res.status(404).json({ success: false, error: 'Placement data not found' });
    const branchStat = data.branchWiseStats.find(s => s.branch === req.params.branch.toUpperCase());
    const records = data.records.filter(r => r.branch === req.params.branch.toUpperCase());
    res.json({ success: true, branch: req.params.branch.toUpperCase(), stats: branchStat, records });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// ─── Holiday Routes ───────────────────────────────────────────────────────────

// GET /api/holidays
router.get('/holidays', async (req, res) => {
  try {
    const data = await Holiday.findOne({ academicYear: '2025-26' });
    res.json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// ─── Notice Routes ────────────────────────────────────────────────────────────

// GET /api/notices
router.get('/notices', async (req, res) => {
  try {
    const { branch, category, limit = 10 } = req.query;
    const filter = {};
    if (branch) filter.branch = { $regex: branch, $options: 'i' };
    if (category) filter.category = category;
    const data = await Notice.find(filter).sort({ isImportant: -1, createdAt: -1 }).limit(parseInt(limit));
    res.json({ success: true, count: data.length, data });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// ─── Search Route ─────────────────────────────────────────────────────────────

// GET /api/search?q=keyword
router.get('/search', async (req, res) => {
  const { chatController } = require('../controllers/chatController');
  // Re-use search from chat controller
  const { q } = req.query;
  if (!q) return res.status(400).json({ success: false, error: 'Query required' });
  try {
    const [branches, gtuInfo] = await Promise.all([
      Branch.find(
        { $text: { $search: q } },
        { score: { $meta: 'textScore' }, code: 1, name: 1, shortDescription: 1, hod: 1 }
      ).sort({ score: { $meta: 'textScore' } }).limit(5),
      require('../models/OtherModels').GTUInfo.find(
        { $or: [{ keywords: { $regex: q.toLowerCase() } }, { title: { $regex: q, $options: 'i' } }] }
      ).limit(3),
    ]);
    res.json({ success: true, query: q, branches, gtuInfo });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// ─── College General Info ─────────────────────────────────────────────────────
router.get('/college-info', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Government Engineering College, Bhavnagar',
      established: 1963,
      affiliated: 'Gujarat Technological University (GTU)',
      approved: 'AICTE, Government of Gujarat',
      address: 'Vidyanagar, Bhavnagar, Gujarat – 364002',
      phone: '+91-278-2521234',
      email: 'principal@gecbhavnagar.ac.in',
      website: 'https://www.gecbhavnagar.ac.in',
      gtuWebsite: 'https://www.gtu.ac.in',
      branches: ['CE', 'IT', 'ICT', 'MECH', 'CIVIL', 'EC'],
      totalIntake: 330,
      timings: {
        weekdays: '10:45 AM – 5:45 PM',
        saturday: '10:45 AM – 5:45 PM (1st, 3rd, 5th)',
        offSaturdays: '2nd & 4th Saturdays – Holiday',
        sunday: 'Holiday',
      },
    },
  });
});

module.exports = router;
