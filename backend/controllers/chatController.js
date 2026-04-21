const Branch = require('../models/Branch');
const { PlacementStats, Holiday, Notice, GTUInfo, ChatHistory } = require('../models/OtherModels');

// ─────────────────────────────────────────────────────────────────────────────
//  BRANCH DETECTION  — runs first, checks exact branch names
// ─────────────────────────────────────────────────────────────────────────────
const detectBranch = (msg) => {
  const m = msg.toLowerCase().trim();

  // Check ICT before IT so "ict" doesn't match "it"
  if (m.includes('ict') || m.includes('information communication') || m.includes('information & communication')) return 'ICT';
  if (m.includes('computer engineering') || m.includes('comp eng') || m === 'ce') return 'CE';
  if (m.match(/\bce\b/)) return 'CE';
  if (m.includes('information technology') || m.includes('info tech')) return 'IT';
  if (m.match(/\bit\b/) && !m.includes('ict')) return 'IT';
  if (m.includes('mechanical') || m.includes('mech')) return 'MECH';
  if (m.includes('civil')) return 'CIVIL';
  if (m.includes('electronics') || m.includes('communication engineering')) return 'EC';
  if (m.match(/\bec\b/)) return 'EC';
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
//  SEMESTER DETECTION
// ─────────────────────────────────────────────────────────────────────────────
const detectSem = (msg) => {
  const m = msg.match(/sem(?:ester)?\s*(\d)/i) || msg.match(/(\d)(?:st|nd|rd|th)?\s*sem/i);
  return m ? parseInt(m[1]) : null;
};

// ─────────────────────────────────────────────────────────────────────────────
//  INTENT DETECTION
//  ORDER MATTERS — more specific intents checked first
//  Each intent has a priority score based on keyword specificity
// ─────────────────────────────────────────────────────────────────────────────
const detectIntent = (msg) => {
  const m = msg.toLowerCase().trim();

  // ── 1. Exact small talk first ────────────────────────────────────────────
  if (['hi','hello','hey','hii','helo','yo','sup','namaste'].includes(m)) return 'GREETING';
  if (['bye','goodbye','cya','see you'].includes(m)) return 'BYE';
  if (m.match(/^thank|^thanks|^ty\b|^thx/)) return 'THANKS';

  // ── 2. Specific GTU intents (before general "subjects" check) ────────────
  if (m.includes('result') || m.includes('check result') || m.includes('gtu result') || m.includes('marks') || m.includes('grade') || m.includes('pass') || m.includes('fail') || m.includes('score')) return 'GTU_RESULT';
  if (m.includes('question paper') || m.includes('old paper') || m.includes('previous paper') || m.includes('past paper') || m.includes('model paper') || m.includes('paper download') || m.includes('gtu paper')) return 'GTU_PAPERS';
  if (m.includes('hall ticket') || m.includes('admit card') || m.includes('exam form') || m.includes('gtu portal') || m.includes('student portal') || m.includes('gtu login')) return 'GTU_PORTAL';
  if (m.includes('70') && m.includes('30') || m.includes('internal marks') || m.includes('external marks') || m.includes('exam scheme') || m.includes('exam pattern') || m.includes('passing marks') || m.includes('attendance')) return 'GTU_EXAM';
  if (m.includes('gtu syllabus') || m.includes('download syllabus') || (m.includes('syllabus') && !m.includes('subject'))) return 'GTU_SYLLABUS';
  if (m.includes('exam timetable') || m.includes('exam schedule') || m.includes('exam date') || m.includes('date sheet') || m.includes('when exam')) return 'GTU_TIMETABLE';
  if (m.includes('revaluation') || m.includes('rechecking') || m.includes('photocopy') || m.includes('recounting')) return 'REVALUATION';

  // ── 3. Specific branch-related intents ───────────────────────────────────
  // FACULTY — check before branch_info
  if (m.includes('faculty') || m.includes('professor') || m.includes('teacher') || m.includes('staff') || m.includes('lecturer') || m.includes('who teach') || (m.includes('hod') && !m.includes('about'))) return 'FACULTY';

  // SUBJECTS — check before branch_info
  if (m.includes('subject') || m.includes('sem ') || m.includes('semester') || m.includes(' sem') || m.includes('sem1') || m.includes('sem2') || m.includes('sem3') || m.includes('sem4') || m.includes('sem5') || m.includes('sem6') || m.includes('sem7') || m.includes('sem8') || m.includes('syllabus') || m.includes('curriculum') || m.includes('all subject') || m.includes('which subject')) return 'SUBJECTS';

  // PLACEMENT — check before branch_info
  if (m.includes('placement') || m.includes('package') || m.includes('salary') || m.includes('lpa') || m.includes('placed') || m.includes('hiring') || m.includes('recruit') || m.includes('company visit') || m.includes('campus drive') || m.includes('job offer') || m.includes('highest package') || m.includes('average package')) return 'PLACEMENT';

  // CAREER
  if (m.includes('career') || m.includes('scope') || m.includes('future') || m.includes('opportunity') || m.includes('after graduation') || m.includes('after degree') || m.includes('job option')) return 'CAREER';

  // BRANCH INFO — general branch overview
  if (m.includes('branch') || m.includes('about ce') || m.includes('about it') || m.includes('about mech') || m.includes('about civil') || m.includes('about ec') || m.includes('about ict') || m.includes('tell me about') || m.includes('detail') || m.includes('info about')) return 'BRANCH_INFO';

  // ── 4. College info intents ──────────────────────────────────────────────
  if (m.includes('all branch') || m.includes('list branch') || m.includes('branches available') || m.includes('which branch') || m.includes('departments') || m.includes('courses offered')) return 'BRANCHES';
  if (m.includes('about college') || m.includes('about gec') || m.includes('history') || m.includes('established') || m.includes('gec bhavnagar') || m.includes('overview') || m.includes('introduction') || m.includes('what is gec')) return 'ABOUT';
  if (m.includes('scholarship') || m.includes('mysy') || m.includes('fee') || m.includes('financial aid') || m.includes('sc st') || m.includes('digital gujarat')) return 'SCHOLARSHIP';
  if (m.includes('holiday') || m.includes('vacation') || m.includes('off day') || m.includes('college off') || m.includes('holiday list') || m.includes('calendar') || m.includes('festival')) return 'HOLIDAY';
  if (m.includes('timing') || m.includes('time') || m.includes('college hour') || m.includes('when open') || m.includes('working hour') || m.includes('college start') || m.includes('college end')) return 'TIMING';
  if (m.includes('contact') || m.includes('phone') || m.includes('address') || m.includes('email') || m.includes('location') || m.includes('where is gec') || m.includes('how to reach')) return 'CONTACT';
  if (m.includes('hostel') || m.includes('accommodation') || m.includes('room') || m.includes('mess') || m.includes('stay')) return 'HOSTEL';
  if (m.includes('library') || m.includes('book') || m.includes('journal') || m.includes('reading room')) return 'LIBRARY';
  if (m.includes('lab') || m.includes('laboratory') || m.includes('facility') || m.includes('facilities') || m.includes('equipment')) return 'LABS';
  if (m.includes('notice') || m.includes('announcement') || m.includes('latest news') || m.includes('circular') || m.includes('notification')) return 'NOTICE';
  if (m.includes('help') || m.includes('what can you') || m.includes('how to use') || m.includes('menu') || m.includes('commands') || m.includes('features')) return 'HELP';

  // ── 5. Greeting catch-all ────────────────────────────────────────────────
  if (m.includes('hello') || m.includes('hi') || m.includes('good morning') || m.includes('good afternoon') || m.includes('good evening') || m.includes('namaste')) return 'GREETING';

  // ── 6. If message is just a branch code like "CE", "IT", "MECH" ──────────
  const branchCodes = ['ce', 'it', 'ict', 'mech', 'civil', 'ec'];
  if (branchCodes.includes(m)) return 'BRANCH_INFO';

  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
//  RESPONSE BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

const buildBranchOverview = (b) => {
  const faculty = b.faculty.map(f =>
    `• **${f.name}** ${f.isHOD ? '(HOD)' : ''} — ${f.designation}\n  Subjects: ${f.subjectsTaught?.slice(0,3).join(', ')}`
  ).join('\n');

  const careers = b.careerOpportunities?.slice(0,5).map(c => `• ${c}`).join('\n') || '';
  const labs = b.labsAndFacilities?.slice(0,4).map(l => `• ${l}`).join('\n') || '';

  return `🏛️ **${b.name} (${b.code})**

${b.fullDescription}

👤 **HOD:** ${b.hod}
📧 ${b.hodEmail}
🎓 **Intake:** ${b.intake} seats | ✅ ${b.accreditation}

👨‍🏫 **Faculty (${b.faculty?.length || 0} members):**
${faculty}

🔬 **Labs:**
${labs}

💼 **Top Career Options:**
${careers}

🏢 **Recruiters:** ${b.topRecruiters?.join(' · ')}

📊 **Placement:** Avg ${b.averagePackage} | High ${b.highestPackage} | ${b.placementPercent}% placed`;
};

const buildFacultyDetail = (b) => {
  const list = b.faculty.map((f, i) =>
    `**${i + 1}. ${f.name}** ${f.isHOD ? '👑 (HOD)' : ''}
   🏷️ ${f.designation}
   🎓 ${f.qualification}
   🔬 ${f.specialization}
   ⏳ Experience: ${f.experience}
   📚 Teaches: ${f.subjectsTaught?.join(', ')}
   📧 ${f.email || 'department email'}`
  ).join('\n\n');

  return `👨‍🏫 **${b.name} (${b.code}) — All Faculty**

Total: ${b.faculty.length} faculty members

${list}`;
};

const buildSubjectsBySem = (b, semNum) => {
  const sem = b.semesters?.find(s => s.semNumber === semNum);
  if (!sem) {
    const available = b.semesters?.map(s => `Sem ${s.semNumber}`).join(', ') || 'Not loaded';
    return `Semester ${semNum} not found for ${b.code}.\nAvailable: ${available}\n\nTry: "${b.code} sem 5 subjects"`;
  }

  const subjects = sem.subjects.map((s, i) =>
    `**${i + 1}. ${s.name}**${s.code ? ` [${s.code}]` : ''}
   👨‍🏫 Faculty: ${s.faculty}
   📝 Topics: ${s.description || 'Core subject'}
   💎 Credits: ${s.credits || '-'} | ${s.type || 'Theory'}`
  ).join('\n\n');

  return `📖 **${b.name} (${b.code}) — Semester ${semNum}**

Total subjects: ${sem.subjects.length}

${subjects}

💡 Type "${b.code} sem ${semNum < 8 ? semNum + 1 : 7}" for next/prev semester!`;
};

const buildAllSubjects = (b) => {
  if (!b.semesters?.length) return `Subject data for ${b.code} not found. Try asking "CE sem 5 subjects" directly.`;

  const list = b.semesters.map(s =>
    `**Sem ${s.semNumber}:** ${s.subjects.map(sub => sub.name).join(' · ')}`
  ).join('\n\n');

  return `📚 **${b.name} (${b.code}) — All Semesters**

${list}

💡 For details type: "${b.code} sem 5 subjects" or "${b.code} sem 4"`;
};

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN RESPONSE GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
const generateResponse = async (intent, branchCode, msg, semNum) => {

  // ── GREETING ──────────────────────────────────────────────────────────────
  if (intent === 'GREETING') {
    return {
      text: `👋 **Hello! Welcome to GEC Bhavnagar Student Assistant.**

I can help you with:

📚 **Branches** — CE, IT, ICT, MECH, CIVIL, EC
   • Faculty list, HOD, labs, career options

📖 **Subjects** — Ask "CE sem 5 subjects" or "IT sem 4"

🎓 **GTU** — Results, papers, portal, syllabus, timetable

💼 **Placements** — 2025-26 stats, companies, packages

📅 **Holidays** — Complete 2026-27 calendar

🎁 **Scholarships** — MYSY, SC/ST, Digital Gujarat

🏛️ **College** — Timings, hostel, library, contact

Just type your question below! 😊`,
      category: 'greeting',
      suggestions: ['CE Branch', 'IT Branch', 'GTU Result', 'Placement Stats', 'Holiday List', 'Help'],
    };
  }

  // ── ABOUT COLLEGE ─────────────────────────────────────────────────────────
  if (intent === 'ABOUT') {
    return {
      text: `🏛️ **Government Engineering College, Bhavnagar**

📍 Vidyanagar, Bhavnagar, Gujarat – 364002
🗓️ **Established:** 1963
🎓 **Affiliated:** Gujarat Technological University (GTU)
✅ **Approved by:** AICTE, Government of Gujarat
🌐 **Website:** https://www.gecbhavnagar.ac.in
📞 **Phone:** +91-278-2521234
📧 **Email:** principal@gecbhavnagar.ac.in

**6 Branches:**
• CE — Computer Engineering (60 seats) — NBA Accredited
• IT — Information Technology (60 seats)
• EC — Electronics & Communication (60 seats) — NBA Accredited
• MECH — Mechanical Engineering (60 seats) — NBA Accredited
• CIVIL — Civil Engineering (60 seats) — NBA Accredited
• ICT — Info & Communication Technology (30 seats)

**Total Intake:** ~330 students/year

**Facilities:** Boys & Girls Hostels · Central Library · 40+ Labs · Sports Complex · Wi-Fi Campus`,
      category: 'college_info',
      suggestions: ['All Branches', 'Placement Stats', 'Contact Info', 'Holiday List'],
    };
  }

  // ── ALL BRANCHES LIST ─────────────────────────────────────────────────────
  if (intent === 'BRANCHES') {
    const branches = await Branch.find({}, 'code name intake hod averagePackage placementPercent accreditation');
    const list = branches.map(b =>
      `**${b.code}** — ${b.name}\n   HOD: ${b.hod} | ${b.intake} seats | Avg: ${b.averagePackage}`
    ).join('\n\n');
    return {
      text: `📚 **All Branches at GEC Bhavnagar**\n\n${list}\n\n💡 Type any branch name for details — e.g. "CE branch" or "IT faculty"`,
      category: 'branches',
      suggestions: ['CE Branch', 'IT Branch', 'MECH Branch', 'EC Branch', 'CIVIL Branch', 'ICT Branch'],
    };
  }

  // ── FACULTY ───────────────────────────────────────────────────────────────
  if (intent === 'FACULTY') {
    const code = branchCode;
    if (!code) {
      return {
        text: `Which branch faculty do you want?\n\n• **CE faculty** — Computer Engineering professors\n• **IT faculty** — IT professors\n• **MECH faculty** — Mechanical professors\n• **EC faculty** — Electronics professors\n• **CIVIL faculty** — Civil professors\n• **ICT faculty** — ICT professors`,
        category: 'faculty',
        suggestions: ['CE Faculty', 'IT Faculty', 'MECH Faculty', 'EC Faculty', 'CIVIL Faculty', 'ICT Faculty'],
      };
    }
    const b = await Branch.findOne({ code });
    if (!b) return { text: `Branch ${code} not found.`, category: 'error', suggestions: [] };
    return {
      text: buildFacultyDetail(b),
      category: 'faculty',
      suggestions: [`${code} Subjects`, `${code} Sem 5`, `${code} Placement`, `${code} Branch Details`],
    };
  }

  // ── SUBJECTS ──────────────────────────────────────────────────────────────
  if (intent === 'SUBJECTS') {
    const code = branchCode;
    const sem  = semNum;

    if (!code) {
      return {
        text: `Which branch subjects?\n\nExamples:\n• "**CE sem 5 subjects**"\n• "**IT sem 4**"\n• "**MECH sem 6 subjects**"\n• "**EC all subjects**"\n\nJust type branch + semester number!`,
        category: 'subjects',
        suggestions: ['CE Sem 5', 'IT Sem 4', 'MECH Sem 5', 'EC Sem 6', 'CIVIL Subjects', 'ICT Subjects'],
      };
    }

    const b = await Branch.findOne({ code });
    if (!b) return { text: `Branch ${code} not found.`, category: 'error', suggestions: [] };

    if (sem) {
      return {
        text: buildSubjectsBySem(b, sem),
        category: 'subjects',
        suggestions: [`${code} Sem ${sem < 8 ? sem + 1 : sem - 1}`, `${code} Faculty`, `${code} Branch Details`, `All ${code} Subjects`],
      };
    }

    // No sem specified — show all semesters overview
    return {
      text: buildAllSubjects(b),
      category: 'subjects',
      suggestions: [`${code} Sem 3`, `${code} Sem 5`, `${code} Sem 7`, `${code} Faculty`],
    };
  }

  // ── BRANCH INFO (general overview) ───────────────────────────────────────
  if (intent === 'BRANCH_INFO') {
    const code = branchCode;
    if (!code) {
      return {
        text: `Which branch would you like to know about?\n\n• **CE** — Computer Engineering\n• **IT** — Information Technology\n• **ICT** — Info & Communication Technology\n• **MECH** — Mechanical Engineering\n• **CIVIL** — Civil Engineering\n• **EC** — Electronics & Communication`,
        category: 'branch_info',
        suggestions: ['CE Branch', 'IT Branch', 'MECH Branch', 'EC Branch', 'CIVIL Branch', 'ICT Branch'],
      };
    }
    const b = await Branch.findOne({ code });
    if (!b) return { text: `Branch "${code}" not found.`, category: 'error', suggestions: [] };
    return {
      text: buildBranchOverview(b),
      category: 'branch_info',
      suggestions: [`${code} Faculty`, `${code} Sem 5 Subjects`, `${code} Placement`, `${code} Career`],
    };
  }

  // ── PLACEMENT ─────────────────────────────────────────────────────────────
  if (intent === 'PLACEMENT') {
    const stats = await PlacementStats.findOne().sort({ year: -1 });
    if (!stats) return { text: 'Placement data not available.', category: 'placement', suggestions: [] };

    const code = branchCode;
    if (code) {
      const bw   = stats.branchWiseStats?.find(s => s.branch === code);
      const recs = stats.records?.filter(r => r.branch === code) || [];
      const recText = recs.length
        ? recs.map(r => `• **${r.company}** — ${r.role} — ${r.package} (${r.studentsPlaced} students)`).join('\n')
        : '• Detailed records updating soon';

      return {
        text: `💼 **${code} Branch — Placement ${stats.year}**

• Students Placed: **${bw?.placed || '–'}/${bw?.total || '–'}**
• Placement %: **${bw ? Math.round((bw.placed / bw.total) * 100) : '–'}%**
• Highest Package: **${bw?.highestPackage || '–'}**
• Average Package: **${bw?.averagePackage || '–'}**

**Companies that visited ${code}:**
${recText}`,
        category: 'placement',
        suggestions: ['Overall Placement', 'All Branch Stats', `${code} Faculty`, `${code} Career`],
      };
    }

    // Overall stats
    const bwText = stats.branchWiseStats?.map(s =>
      `**${s.branch}:** ${s.placed}/${s.total} placed | Avg: ${s.averagePackage} | High: ${s.highestPackage}`
    ).join('\n') || '';

    return {
      text: `💼 **GEC Bhavnagar Placement ${stats.year}**

**Overall:**
• Total Placed: **${stats.totalStudentsPlaced}** students
• Overall Placement %: **${stats.overallPlacementPercent}%**
• Highest Package: **${stats.highestPackage}**
• Average Package: **${stats.averagePackage}**
• Companies Visited: **${stats.totalCompanies}**

**Branch-wise:**
${bwText}

**Top Companies:**
${stats.topCompanies?.join(' · ')}`,
      category: 'placement',
      suggestions: ['CE Placement', 'IT Placement', 'MECH Placement', 'EC Placement'],
    };
  }

  // ── CAREER ────────────────────────────────────────────────────────────────
  if (intent === 'CAREER') {
    const code = branchCode;
    if (!code) {
      return {
        text: `Which branch career options?\n\nAsk like:\n• "CE career"\n• "MECH scope"\n• "EC job opportunities"\n• "IT future"`,
        category: 'college_info',
        suggestions: ['CE Career', 'IT Career', 'MECH Career', 'EC Career'],
      };
    }
    const b = await Branch.findOne({ code });
    if (!b) return { text: `Branch ${code} not found.`, category: 'error', suggestions: [] };
    const careers = b.careerOpportunities?.map((c, i) => `${i + 1}. ${c}`).join('\n') || 'Data not available';
    return {
      text: `💼 **${b.name} (${code}) — Career Options**

${careers}

🏢 **Top Recruiters:**
${b.topRecruiters?.join(' · ')}

📊 **Placement 2025-26:**
• Average: ${b.averagePackage}
• Highest: ${b.highestPackage}
• ${b.placementPercent}% students placed`,
      category: 'placement',
      suggestions: [`${code} Placement`, `${code} Faculty`, `${code} Subjects`],
    };
  }

  // ── HOLIDAY ───────────────────────────────────────────────────────────────
  if (intent === 'HOLIDAY') {
    const hol = await Holiday.findOne().sort({ academicYear: -1 });
    if (!hol) return { text: 'Holiday data not available.', category: 'holiday', suggestions: [] };

    const nat  = hol.holidays.filter(h => h.type === 'National');
    const fest = hol.holidays.filter(h => h.type === 'Festival');
    const univ = hol.holidays.filter(h => h.type === 'University');
    const fmt  = arr => arr.map(h => `• **${h.date}** — ${h.occasion}`).join('\n');

    return {
      text: `📅 **Holiday Calendar ${hol.academicYear}**

🇮🇳 **National Holidays:**
${fmt(nat)}

🪔 **Festival Holidays:**
${fmt(fest)}

🎓 **University Vacations:**
${fmt(univ)}

⏰ **College Timings:**
• Weekdays: ${hol.collegeTimings?.weekdays}
• ${hol.collegeTimings?.offSaturdays}
• Sunday: Holiday`,
      category: 'holiday',
      suggestions: ['College Timing', 'GTU Exam Schedule', 'Notices', 'GTU Results'],
    };
  }

  // ── GTU RESULT ────────────────────────────────────────────────────────────
  if (intent === 'GTU_RESULT') {
    return {
      text: `📊 **How to Check GTU Result**

🔗 **Click here:** https://gturesults.in

**Steps:**
1. Open https://gturesults.in
2. Enter your **Enrollment Number** (12 digits)
3. Select **Exam Type** (Nov/Dec or Apr/May)
4. Click **Submit** → Your result appears!

🔗 **Also on GTU official site:** https://www.gtu.ac.in

🔗 **Detailed marksheet:** https://student.gtu.ac.in/Login.aspx

💡 **Tip:** If result not found, check enrollment number carefully — leading zeros matter!`,
      category: 'gtu_result',
      suggestions: ['Hall Ticket', 'GTU Papers', 'Revaluation', 'GTU Portal'],
    };
  }

  // ── GTU PAPERS ────────────────────────────────────────────────────────────
  if (intent === 'GTU_PAPERS') {
    return {
      text: `📄 **GTU Previous Year Question Papers**

🔗 **Download here:**
https://gtu.ac.in/OldQuestionPapers/OldQuestionPapers.aspx

**Steps:**
1. Open the link above
2. Select **Programme** → B.E.
3. Select your **Branch** (CE, IT, EC, etc.)
4. Select **Semester** (1 to 8)
5. Select **Subject**
6. Download PDF — completely free!

💡 **Pro tip:** Solve last 5 years papers. GTU pattern repeats!

📚 Also check syllabus: https://gtu.ac.in/syllabus/syllabus.aspx`,
      category: 'gtu_papers',
      suggestions: ['GTU Syllabus', 'Exam Timetable', 'GTU Results', 'GTU Portal'],
    };
  }

  // ── GTU PORTAL ────────────────────────────────────────────────────────────
  if (intent === 'GTU_PORTAL') {
    return {
      text: `💻 **GTU Student Portal**

🔗 **Login at:** https://student.gtu.ac.in/Login.aspx

**What you can do:**
• ✅ Fill Exam Forms (before deadline!)
• 📄 Download Hall Ticket / Admit Card
• 📊 View Semester Results
• 💰 Pay Exam Fees online
• 🔄 Apply for Revaluation / Rechecking
• 📋 Download Migration Certificate

**Login:** GTU Enrollment Number + Password

⚠️ Forgot password? Click "Forgot Password" on login page or contact college exam section.`,
      category: 'gtu_portal',
      suggestions: ['GTU Result', 'Hall Ticket', 'Exam Form Deadline', 'Revaluation'],
    };
  }

  // ── GTU EXAM SCHEME ───────────────────────────────────────────────────────
  if (intent === 'GTU_EXAM') {
    return {
      text: `📝 **GTU Examination System**

**Marks Scheme (Total: 100):**
• 🏫 **Internal: 30 marks**
  — Mid-Sem Exam: 20 marks
  — Assignment/Practical: 10 marks
• 🏛️ **External University Exam: 70 marks**

**Passing Criteria:**
• Minimum **40%** overall required
• Must pass each component separately
• Min 12/30 internal + Min 28/70 external

**Attendance:**
• Minimum **75%** attendance per subject
• Below 75% → Not allowed to sit in exam!

**Grade System:**
• AA (91-100) — Outstanding
• AB (81-90) — Excellent
• BB (71-80) — Very Good
• BC (61-70) — Good
• CC (51-60) — Average
• DD (40-44) — Pass
• FF (Below 40) — Fail`,
      category: 'gtu_exam',
      suggestions: ['GTU Result', 'GTU Papers', 'GTU Portal', 'Hall Ticket'],
    };
  }

  // ── GTU SYLLABUS ─────────────────────────────────────────────────────────
  if (intent === 'GTU_SYLLABUS') {
    return {
      text: `📚 **GTU Syllabus**

🔗 **Download at:** https://gtu.ac.in/syllabus/syllabus.aspx

**Steps:**
1. Visit link above
2. Select Programme: **B.E.**
3. Select your Branch
4. Select Semester
5. Download PDF — free!

💡 For our database subjects (with faculty names), ask:
• "CE sem 5 subjects"
• "IT sem 4 subjects"
• "MECH sem 5"`,
      category: 'academics',
      suggestions: ['CE Sem 5 Subjects', 'IT Sem 4', 'GTU Papers', 'Exam Timetable'],
    };
  }

  // ── GTU TIMETABLE ─────────────────────────────────────────────────────────
  if (intent === 'GTU_TIMETABLE') {
    return {
      text: `📅 **GTU Exam Timetable**

🔗 **Official link:** https://gtu.ac.in/timetable/timetable.aspx

**Exam Schedule:**
• **Winter Exams:** November – December
• **Summer Exams:** April – May
• **Remedial/Back:** January & June

⏰ **Exam Timing:** Usually 10:30 AM to 1:30 PM

📢 Timetable is published ~30 days before exams on GTU website.`,
      category: 'academics',
      suggestions: ['GTU Results', 'Hall Ticket', 'GTU Papers', 'GTU Portal'],
    };
  }

  // ── REVALUATION ───────────────────────────────────────────────────────────
  if (intent === 'REVALUATION') {
    return {
      text: `🔄 **GTU Revaluation / Rechecking**

🔗 **Apply at:** https://student.gtu.ac.in/Login.aspx

**Process:**
1. Login to GTU Student Portal
2. Go to "Revaluation / Rechecking" section
3. Select the subject and exam
4. Pay the revaluation fee online
5. Submit application

**Types:**
• **Rechecking** — re-totalling of marks (cheaper)
• **Revaluation** — re-checking of answers
• **Photocopy** — get your answer sheet copy

⚠️ Apply within the deadline after result declaration!`,
      category: 'gtu_portal',
      suggestions: ['GTU Result', 'GTU Portal', 'Hall Ticket', 'GTU Papers'],
    };
  }

  // ── SCHOLARSHIP ───────────────────────────────────────────────────────────
  if (intent === 'SCHOLARSHIP') {
    return {
      text: `🎓 **Scholarship Information**

**1. MYSY — Mukhyamantri Yuva Swavalamban Yojana**
🔗 https://mysy.guj.nic.in
• For: General category, family income < ₹6 LPA
• Benefit: Full tuition fee + hostel fee waiver
• Apply: Online at mysy.guj.nic.in before deadline

**2. Digital Gujarat (SC/ST/OBC/SEBC)**
🔗 https://digitalgujarat.gov.in
• Government schemes for reserved category students

**3. National Scholarship Portal (Central Govt)**
🔗 https://scholarships.gov.in
• Post-matric scholarship for SC/ST students

**Fee Structure (Govt. Quota):**
• Boys: ~₹1,500/year only
• Girls: FREE (State Government scheme)
• TFWS Quota: FREE

📞 Contact college accounts office for help.`,
      category: 'fees_scholarship',
      suggestions: ['MYSY Apply', 'College Contact', 'Fee Structure', 'GTU Portal'],
    };
  }

  // ── TIMING ────────────────────────────────────────────────────────────────
  if (intent === 'TIMING') {
    return {
      text: `⏰ **GEC Bhavnagar College Timings**

📅 **Weekdays (Mon–Fri):** 10:45 AM – 5:45 PM
📅 **1st, 3rd, 5th Saturday:** 10:45 AM – 5:45 PM
📅 **2nd & 4th Saturday:** HOLIDAY
📅 **Sunday:** HOLIDAY

🏛️ **Office Hours:**
• Mon–Fri: 10:30 AM – 5:30 PM
• Working Saturday: 10:30 AM – 1:00 PM

📚 **Library Hours:**
• Mon–Fri: 9:00 AM – 6:00 PM
• Working Saturday: 9:00 AM – 2:00 PM`,
      category: 'college_info',
      suggestions: ['Holiday List', 'Contact Info', 'Hostel Info', 'Library Info'],
    };
  }

  // ── CONTACT ───────────────────────────────────────────────────────────────
  if (intent === 'CONTACT') {
    return {
      text: `📞 **GEC Bhavnagar Contact Information**

🏛️ **Address:**
Government Engineering College, Bhavnagar
Vidyanagar, Bhavnagar, Gujarat – 364002

📞 **Phone:** +91-278-2521234 / 2521235
📧 **Email:** principal@gecbhavnagar.ac.in
🌐 **Website:** https://www.gecbhavnagar.ac.in

**Department Emails:**
• CE: hod.ce@gecbhavnagar.ac.in
• IT: hod.it@gecbhavnagar.ac.in
• EC: hod.ec@gecbhavnagar.ac.in
• MECH: hod.mech@gecbhavnagar.ac.in
• CIVIL: hod.civil@gecbhavnagar.ac.in
• ICT: hod.ict@gecbhavnagar.ac.in`,
      category: 'contact',
      suggestions: ['About College', 'College Timing', 'Hostel Info'],
    };
  }

  // ── HOSTEL ────────────────────────────────────────────────────────────────
  if (intent === 'HOSTEL') {
    return {
      text: `🏠 **GEC Bhavnagar Hostel Facilities**

**Boys Hostel:**
• Capacity: ~300 students
• Rooms: Double/Triple sharing
• Mess with daily meals
• Wi-Fi + 24/7 Security + CCTV

**Girls Hostel:**
• Separate building with lady warden
• Capacity: ~150 students
• All facilities + round-the-clock security

**Common Facilities:**
• 🍽️ Canteen (subsidized rates)
• 📡 Campus Wi-Fi
• 🏋️ Sports Ground
• 🚑 Medical Room

📞 Contact: principal@gecbhavnagar.ac.in | +91-278-2521234`,
      category: 'college_info',
      suggestions: ['College Timing', 'Scholarship Info', 'Contact College'],
    };
  }

  // ── LIBRARY ───────────────────────────────────────────────────────────────
  if (intent === 'LIBRARY') {
    return {
      text: `📚 **GEC Bhavnagar Central Library**

**Collection:**
• 20,000+ Technical Books
• 500+ Journals & Periodicals
• NPTEL, IEEE, Elsevier digital access

**Facilities:**
• Reading Room — 100+ seats
• Computer terminals for e-access
• Reprography / Photocopy center

⏰ **Hours:**
• Mon–Fri: 9:00 AM – 6:00 PM
• Working Saturday: 9:00 AM – 2:00 PM

🔗 **Free Online:**
• NPTEL: https://nptel.ac.in
• SWAYAM: https://swayam.gov.in`,
      category: 'college_info',
      suggestions: ['NPTEL Courses', 'GTU Papers', 'College Contact'],
    };
  }

  // ── LABS ─────────────────────────────────────────────────────────────────
  if (intent === 'LABS') {
    const branches = await Branch.find({}, 'code name labsAndFacilities');
    const labText = branches.map(b =>
      `**${b.code}:**\n${b.labsAndFacilities?.slice(0, 3).map(l => `• ${l}`).join('\n') || 'N/A'}`
    ).join('\n\n');
    return {
      text: `🔬 **GEC Bhavnagar Labs & Facilities**\n\n${labText}\n\n**Common Facilities:**\n• Central Library · Auditorium · Sports Complex\n• Boys & Girls Hostels · Campus Wi-Fi`,
      category: 'college_info',
      suggestions: ['CE Branch', 'IT Branch', 'MECH Branch'],
    };
  }

  // ── NOTICE ────────────────────────────────────────────────────────────────
  if (intent === 'NOTICE') {
    const notices = await Notice.find().sort({ isImportant: -1, createdAt: -1 }).limit(5);
    if (!notices.length) return { text: 'No notices available right now.', category: 'notice', suggestions: [] };
    const list = notices.map((n, i) =>
      `${i + 1}. ${n.isImportant ? '⚠️ **IMPORTANT** ' : ''}**${n.title}**\n   ${n.description}`
    ).join('\n\n');
    return {
      text: `📋 **Latest Notices**\n\n${list}`,
      category: 'notice',
      suggestions: ['GTU Result', 'Placement Drive', 'Holiday List', 'Scholarship'],
    };
  }

  // ── HELP ─────────────────────────────────────────────────────────────────
  if (intent === 'HELP') {
    return {
      text: `🤖 **How to Use GEC Bhavnagar Assistant**

**Branch Questions:**
• "CE branch" → full CE overview
• "IT faculty" → all IT professors
• "MECH sem 5 subjects" → sem 5 subjects
• "EC career" → EC job options
• "CIVIL placement" → CIVIL stats

**GTU Questions:**
• "GTU result" → how to check result
• "Question papers" → download papers
• "Hall ticket" → GTU portal guide
• "70 30 scheme" → GTU exam system
• "Exam timetable" → exam schedule

**College Questions:**
• "Holiday list" → 2026-27 calendar
• "College timing" → working hours
• "MYSY scholarship" → scholarship info
• "Hostel" → hostel details

💡 Type naturally — I understand normal English!`,
      category: 'help',
      suggestions: ['CE Branch', 'GTU Result', 'Placement Stats', 'Holiday List'],
    };
  }

  // ── THANKS ───────────────────────────────────────────────────────────────
  if (intent === 'THANKS') {
    return {
      text: `😊 You're welcome! Happy to help.\n\nFeel free to ask anything about GEC Bhavnagar anytime! 🎓`,
      category: 'small_talk',
      suggestions: ['CE Branch', 'GTU Result', 'Holiday List', 'Help'],
    };
  }

  // ── BYE ──────────────────────────────────────────────────────────────────
  if (intent === 'BYE') {
    return {
      text: `👋 Goodbye! All the best for your studies!\n\n🎓 GEC Bhavnagar — Engineering Excellence Since 1963`,
      category: 'small_talk',
      suggestions: [],
    };
  }

  // ── FALLBACK — also try GTU info search ──────────────────────────────────
  const gtuInfo = await GTUInfo.findOne({
    $or: [
      { keywords: { $elemMatch: { $regex: msg.toLowerCase().split(' ')[0], $options: 'i' } } },
      { title: { $regex: msg, $options: 'i' } },
    ],
  });
  if (gtuInfo) {
    return {
      text: `ℹ️ **${gtuInfo.title}**\n\n${gtuInfo.description}\n\n🔗 **Link:** ${gtuInfo.url}`,
      category: gtuInfo.category,
      suggestions: ['GTU Results', 'GTU Papers', 'GTU Portal', 'GTU Syllabus'],
    };
  }

  return {
    text: `🤔 I didn't quite understand that.\n\nTry asking like:\n• "**CE branch**" — branch overview\n• "**IT faculty**" — faculty list\n• "**MECH sem 5 subjects**" — subjects\n• "**GTU result**" — check result\n• "**Placement stats**" — placement data\n• "**Holiday list**" — holiday calendar\n\nOr type "**help**" to see everything I can do!`,
    category: 'fallback',
    suggestions: ['Help', 'CE Branch', 'GTU Result', 'Placement Stats', 'Holiday List'],
  };
};

// ─────────────────────────────────────────────────────────────────────────────
//  EXPORTED HANDLERS
// ─────────────────────────────────────────────────────────────────────────────
exports.processChat = async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { message, sessionId = 'anon' } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ success: false, error: 'Message cannot be empty' });
    }

    const intent     = detectIntent(message);
    const branchCode = detectBranch(message);
    const semNum     = detectSem(message);

    const result = await generateResponse(intent, branchCode, message, semNum);

    // Save to chat history (non-blocking)
    ChatHistory.findOneAndUpdate(
      { sessionId },
      {
        $push: {
          messages: [
            { role: 'user', text: message, timestamp: new Date() },
            { role: 'bot', text: result.text, category: result.category, timestamp: new Date() },
          ],
        },
        $inc: { totalMessages: 2 },
      },
      { upsert: true }
    ).catch(() => {});

    res.json({
      success: true,
      response: result.text,
      category: result.category,
      suggestions: result.suggestions || [],
      intent: intent || 'unknown',
      detectedBranch: branchCode,
    });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ success: false, error: 'Server error processing chat.' });
  }
};

exports.searchQuery = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ success: false, error: 'Query required' });
    const [branches, gtuInfo] = await Promise.all([
      Branch.find(
        { $text: { $search: q } },
        { score: { $meta: 'textScore' }, code: 1, name: 1, shortDescription: 1, hod: 1 }
      ).sort({ score: { $meta: 'textScore' } }).limit(5),
      GTUInfo.find({
        $or: [
          { keywords: { $regex: q.toLowerCase() } },
          { title: { $regex: q, $options: 'i' } },
        ],
      }).limit(3),
    ]);
    res.json({ success: true, query: q, branches, gtuInfo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
