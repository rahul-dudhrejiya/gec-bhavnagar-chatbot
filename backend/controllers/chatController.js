const Branch = require('../models/Branch');
const { PlacementStats, Holiday, Notice, GTUInfo, ChatHistory } = require('../models/OtherModels');

// ─── Intent Detection ─────────────────────────────────────────────────────────
const INTENTS = {
  GREETING: { patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'hii', 'helo'], response: 'greeting' },
  ABOUT_COLLEGE: { patterns: ['about college', 'about gec', 'about gecbhavnagar', 'tell me about', 'what is gec', 'history', 'established', 'overview', 'introduction'], response: 'about' },
  BRANCH_LIST: { patterns: ['all branch', 'list of branch', 'which branch', 'branches available', 'departments', 'what courses', 'programs offered'], response: 'branches' },
  BRANCH_DETAIL: { patterns: ['ce', 'computer engineering', 'it', 'information technology', 'ict', 'information communication', 'mech', 'mechanical', 'civil', 'ec', 'electronics', 'communication engineering'], response: 'branch_detail' },
  FACULTY: { patterns: ['faculty', 'professor', 'teacher', 'staff', 'lecturer', 'hod', 'head of department', 'sir', 'ma\'am'], response: 'faculty' },
  SUBJECTS: { patterns: ['subject', 'syllabus', 'course', 'curriculum', 'topic', 'semester', 'sem'], response: 'subjects' },
  PLACEMENT: { patterns: ['placement', 'package', 'salary', 'job', 'recruit', 'company', 'campus', 'lpa', 'offer', 'hired', 'drive', 'highest package', 'average package'], response: 'placement' },
  HOLIDAY: { patterns: ['holiday', 'vacation', 'off day', 'leave', 'festival', 'break', 'college off', 'holiday list', 'calendar'], response: 'holiday' },
  GTU_RESULT: { patterns: ['result', 'marks', 'grade', 'score', 'pass', 'fail', 'gtu result', 'semester result', 'check result'], response: 'gtu_result' },
  GTU_PAPERS: { patterns: ['question paper', 'old paper', 'previous paper', 'past paper', 'sample paper', 'paper download', 'gtu paper', 'model paper'], response: 'gtu_papers' },
  GTU_PORTAL: { patterns: ['student portal', 'gtu portal', 'login', 'enrollment', 'hall ticket', 'admit card'], response: 'gtu_portal' },
  GTU_EXAM: { patterns: ['exam', '70 30', '100 marks', 'internal marks', 'external', 'passing marks', 'minimum marks', 'how exam works', 'grading', 'attendance'], response: 'gtu_exam' },
  GTU_SYLLABUS: { patterns: ['syllabus', 'gtu syllabus', 'study material', 'curriculum', 'subject list'], response: 'gtu_syllabus' },
  GTU_TIMETABLE: { patterns: ['exam timetable', 'exam schedule', 'exam date', 'date sheet', 'when exam'], response: 'gtu_timetable' },
  SCHOLARSHIP: { patterns: ['scholarship', 'mysy', 'fees', 'fee structure', 'financial aid', 'sc st obc', 'digital gujarat', 'free'], response: 'scholarship' },
  TIMING: { patterns: ['timing', 'time', 'college hour', 'when open', 'when close', 'office hour', 'working hour', 'college start', 'college end'], response: 'timing' },
  CONTACT: { patterns: ['contact', 'phone', 'email', 'address', 'location', 'where is', 'how to reach', 'number'], response: 'contact' },
  HOSTEL: { patterns: ['hostel', 'accommodation', 'room', 'stay', 'boys hostel', 'girls hostel', 'mess'], response: 'hostel' },
  LIBRARY: { patterns: ['library', 'book', 'journal', 'reading room', 'e-library', 'digital library'], response: 'library' },
  LABS: { patterns: ['lab', 'laboratory', 'practical', 'equipment', 'facility', 'facilities'], response: 'labs' },
  THANKS: { patterns: ['thank', 'thanks', 'thank you', 'thx', 'ty'], response: 'thanks' },
  BYE: { patterns: ['bye', 'goodbye', 'see you', 'exit', 'quit', 'cya'], response: 'bye' },
  HELP: { patterns: ['help', 'what can you do', 'how to use', 'menu', 'options', 'features'], response: 'help' },
  NOTICE: { patterns: ['notice', 'announcement', 'news', 'update', 'latest', 'notification', 'circular'], response: 'notices' },
};

// Detect branch from message
const detectBranch = (msg) => {
  const branchMap = {
    'ce': ['ce', 'computer engineering', 'comp', 'cse'],
    'it': ['it', 'information technology', 'infotech'],
    'ict': ['ict', 'information communication technology', 'information & communication'],
    'mech': ['mech', 'mechanical engineering', 'mechanical', 'me'],
    'civil': ['civil', 'civil engineering'],
    'ec': ['ec', 'electronics', 'electronics and communication', 'e&c', 'ecp'],
  };
  for (const [code, aliases] of Object.entries(branchMap)) {
    if (aliases.some(a => msg.includes(a))) return code.toUpperCase();
  }
  return null;
};

// Detect intent from user message
const detectIntent = (msg) => {
  const lower = msg.toLowerCase();
  let bestIntent = null;
  let bestScore = 0;
  for (const [intent, config] of Object.entries(INTENTS)) {
    const score = config.patterns.filter(p => lower.includes(p)).length;
    if (score > bestScore) { bestScore = score; bestIntent = intent; }
  }
  return bestScore > 0 ? bestIntent : null;
};

// ─── Response Generators ──────────────────────────────────────────────────────

const generateResponse = async (intent, branch, msg) => {
  switch (intent) {

    case 'GREETING':
      return {
        text: `🎓 **Jai GEC Bhavnagar!**\n\nHello! I am your **GEC Bhavnagar College Assistant** – your smart guide to everything about Government Engineering College, Bhavnagar.\n\nI can help you with:\n• Branch details, faculty & subjects\n• Placement statistics & companies\n• GTU results, papers & portal\n• Holiday calendar & notices\n• College timings & contact info\n\nWhat would you like to know today? 😊`,
        category: 'greeting',
        suggestions: ['Show all branches', 'Placement info', 'Holiday list', 'GTU results'],
      };

    case 'ABOUT_COLLEGE':
      return {
        text: `🏛️ **About Government Engineering College, Bhavnagar**\n\n📍 **Location:** Vidyanagar, Bhavnagar, Gujarat – 364002\n🗓️ **Established:** 1963 (one of the oldest GECs in Gujarat)\n🎓 **Affiliated:** Gujarat Technological University (GTU)\n✅ **Approved by:** AICTE, Government of Gujarat\n🌐 **Website:** https://www.gecbhavnagar.ac.in\n\n**Branches Offered:**\n• Computer Engineering (CE) – 60 seats\n• Information Technology (IT) – 60 seats\n• Electronics & Communication (EC) – 60 seats\n• Mechanical Engineering (MECH) – 60 seats\n• Civil Engineering (CIVIL) – 60 seats\n• Info. & Communication Tech. (ICT) – 30 seats\n\n**Total Intake:** ~330 students/year\n\n**Facilities:**\n🏠 Separate Boys & Girls Hostels\n📚 Central Library with Digital Access\n🔬 40+ Modern Laboratories\n🏋️ Sports Complex\n💻 Wi-Fi Campus`,
        category: 'college_info',
        suggestions: ['Branch details', 'Placement stats', 'Contact us', 'Holiday list'],
      };

    case 'BRANCH_LIST': {
      const branches = await Branch.find({}, 'code name intake hod averagePackage placementPercent');
      const list = branches.map(b =>
        `• **${b.code}** – ${b.name}\n   HOD: ${b.hod} | Intake: ${b.intake} | Avg Pkg: ${b.averagePackage}`
      ).join('\n\n');
      return {
        text: `📚 **All Branches at GEC Bhavnagar**\n\n${list}\n\n💡 Ask about any branch for detailed info, faculty, subjects & careers!`,
        category: 'branches',
        suggestions: ['CE details', 'IT details', 'MECH details', 'CIVIL details', 'EC details', 'ICT details'],
      };
    }

    case 'BRANCH_DETAIL':
    case 'FACULTY':
    case 'SUBJECTS': {
      const branchCode = branch || detectBranch(msg);
      if (!branchCode) {
        return {
          text: `📚 Which branch are you interested in?\n\nAvailable branches:\n• **CE** – Computer Engineering\n• **IT** – Information Technology\n• **ICT** – Information & Communication Technology\n• **MECH** – Mechanical Engineering\n• **CIVIL** – Civil Engineering\n• **EC** – Electronics & Communication\n\nJust type the branch name or code!`,
          category: 'branch_info',
          suggestions: ['CE details', 'IT details', 'MECH details', 'EC details', 'CIVIL details', 'ICT details'],
        };
      }
      const b = await Branch.findOne({ code: branchCode });
      if (!b) return { text: `Branch "${branchCode}" not found. Try CE, IT, ICT, MECH, CIVIL, or EC.`, category: 'error' };

      if (intent === 'FACULTY') {
        const facultyList = b.faculty.map(f =>
          `👨‍🏫 **${f.name}** ${f.isHOD ? '(HOD)' : ''}\n   ${f.designation} | ${f.qualification}\n   Specialization: ${f.specialization}\n   Subjects: ${f.subjectsTaught?.join(', ') || 'N/A'}`
        ).join('\n\n');
        return {
          text: `🏫 **${b.name} – Faculty Details**\n\n${facultyList}`,
          category: 'faculty',
          suggestions: [`${branchCode} subjects`, `${branchCode} placement`, `${branchCode} careers`, 'Other branches'],
        };
      }

      if (intent === 'SUBJECTS') {
        const semNum = msg.match(/sem(?:ester)?\s*(\d)/i)?.[1];
        if (semNum) {
          const sem = b.semesters.find(s => s.semNumber === parseInt(semNum));
          if (sem) {
            const subList = sem.subjects.map(s => `• **${s.name}** (${s.code || ''}) – ${s.faculty}`).join('\n');
            return { text: `📖 **${b.name} – Semester ${semNum} Subjects**\n\n${subList}`, category: 'subjects' };
          }
        }
        const semsList = b.semesters.map(s =>
          `**Sem ${s.semNumber}:** ${s.subjects.map(sub => sub.name).join(', ')}`
        ).join('\n');
        return {
          text: `📖 **${b.name} – All Semesters Subjects**\n\n${semsList}\n\n💡 Ask "CE sem 4 subjects" for specific semester details!`,
          category: 'subjects',
          suggestions: [`${branchCode} sem 4`, `${branchCode} sem 5`, `${branchCode} sem 6`, `${branchCode} faculty`],
        };
      }

      // Full branch detail
      return {
        text: `🏛️ **${b.name} (${b.code})**\n\n📌 ${b.fullDescription}\n\n👤 **HOD:** ${b.hod}\n📧 ${b.hodEmail}\n🎓 **Intake:** ${b.intake} students\n✅ **Accreditation:** ${b.accreditation}\n\n💼 **Career Opportunities:**\n${b.careerOpportunities.map(c => `• ${c}`).join('\n')}\n\n🏢 **Top Recruiters:** ${b.topRecruiters.join(', ')}\n\n📊 **Placement Stats:**\n• Average Package: ${b.averagePackage}\n• Highest Package: ${b.highestPackage}\n• Placement %: ${b.placementPercent}%\n\n🔬 **Labs & Facilities:**\n${b.labsAndFacilities.map(l => `• ${l}`).join('\n')}`,
        category: 'branch_info',
        suggestions: [`${branchCode} faculty`, `${branchCode} subjects`, `${branchCode} placement`, 'Other branches'],
      };
    }

    case 'PLACEMENT': {
      const placement = await PlacementStats.findOne({ year: '2025-26' });
      if (!placement) return { text: 'Placement data not available right now.', category: 'placement' };

      const branchCode = detectBranch(msg);
      if (branchCode) {
        const stat = placement.branchWiseStats.find(s => s.branch === branchCode);
        if (stat) {
          const records = placement.records.filter(r => r.branch === branchCode);
          const recText = records.map(r => `• ${r.company} – ${r.role} – ${r.package} (${r.studentsPlaced} placed)`).join('\n');
          return {
            text: `💼 **${branchCode} Placement Stats (2025-26)**\n\n• Students Placed: ${stat.placed}/${stat.total}\n• Placement %: ${Math.round(stat.placed/stat.total*100)}%\n• Highest Package: ${stat.highestPackage}\n• Average Package: ${stat.averagePackage}\n\n**Top Recruiters:**\n${recText || '• Data updating soon'}`,
            category: 'placement',
            suggestions: ['Overall placement', 'Company list', 'Placement preparation', 'Other branches'],
          };
        }
      }

      const bwStats = placement.branchWiseStats.map(s =>
        `• **${s.branch}:** ${s.placed}/${s.total} placed | Avg: ${s.averagePackage} | High: ${s.highestPackage}`
      ).join('\n');

      return {
        text: `💼 **GEC Bhavnagar Placement Statistics (2025-26)**\n\n📊 **Overall:**\n• Total Students Placed: ${placement.totalStudentsPlaced}\n• Overall Placement %: ${placement.overallPlacementPercent}%\n• Highest Package: ${placement.highestPackage}\n• Average Package: ${placement.averagePackage}\n• Total Companies: ${placement.totalCompanies}\n\n**Branch-wise Placement:**\n${bwStats}\n\n🏢 **Top Recruiting Companies:**\n${placement.topCompanies.map(c => `• ${c}`).join('\n')}`,
        category: 'placement',
        suggestions: ['CE placement', 'IT placement', 'MECH placement', 'EC placement', 'Preparation tips'],
      };
    }

    case 'HOLIDAY': {
      const holidays = await Holiday.findOne({ academicYear: '2026-27' });
      if (!holidays) return { text: 'Holiday data not available.', category: 'holiday' };

      const national = holidays.holidays.filter(h => h.type === 'National');
      const festival = holidays.holidays.filter(h => h.type === 'Festival');
      const university = holidays.holidays.filter(h => h.type === 'University');

      const fmt = (arr) => arr.map(h => `• ${h.date} (${h.day || ''}) – ${h.occasion}`).join('\n');

      return {
        text: `📅 **GEC Bhavnagar Holiday Calendar 2026-27**\n\n🇮🇳 **National Holidays:**\n${fmt(national)}\n\n🪔 **Festival Holidays:**\n${fmt(festival)}\n\n🎓 **University Breaks:**\n${fmt(university)}\n\n⏰ **College Timings:**\n• Weekdays: ${holidays.collegeTimings.weekdays}\n• Saturday: ${holidays.collegeTimings.saturday}\n• ${holidays.collegeTimings.offSaturdays}\n• Sunday: ${holidays.collegeTimings.sunday}`,
        category: 'holiday',
        suggestions: ['GTU exam schedule', 'College timing', 'Academic calendar', 'Notices'],
      };
    }

    case 'GTU_RESULT':
      return {
        text: `📊 **GTU Results – How to Check**\n\n🔗 **Direct Link:** https://gturesults.in/\n\nSteps to check:\n1. Visit https://gturesults.in/\n2. Enter your **Enrollment Number**\n3. Select **Semester** and **Exam Year**\n4. Click **Submit** to view results\n\n💡 **Also available at:** https://gtu.ac.in\n\n⚠️ If you don't find results, check your email for result notification from GTU.`,
        category: 'gtu_result',
        suggestions: ['GTU student portal', 'Revaluation info', 'GTU question papers', 'GTU exam info'],
      };

    case 'GTU_PAPERS':
      return {
        text: `📄 **GTU Previous Year Question Papers**\n\n🔗 **Download Here:** https://gtu.ac.in/OldQuestionPapers/OldQuestionPapers.aspx\n\nHow to use:\n1. Go to the link above\n2. Select your **Branch** (e.g., CE, IT, Mech)\n3. Select your **Semester** (1 to 8)\n4. Choose the **Subject**\n5. Download papers in PDF format\n\n📚 **Pro tip:** Practice at least 5 years of papers before your exam!`,
        category: 'gtu_papers',
        suggestions: ['GTU syllabus', 'GTU results', 'Exam timetable', 'GTU portal'],
      };

    case 'GTU_EXAM':
      return {
        text: `📝 **GTU Examination System – How It Works**\n\n**Marks Scheme (Total: 100)**\n• 🏫 Internal Assessment: **30 marks**\n  - Mid-Sem Exam: 20 marks\n  - Assignment/Practical: 10 marks\n• 🏛️ External University Exam: **70 marks**\n\n**Passing Criteria:**\n• Minimum 40% overall (40/100)\n• Must pass each component separately\n• Attendance: Minimum 75% required\n\n**Exam Types:**\n• Regular Exam (Nov-Dec & Apr-May)\n• Remedial Exam for failed students\n• Back/ATKT Exams\n\n**Grade System:**\n• AA (Outstanding): 91-100\n• AB (Excellent): 81-90\n• BB (Very Good): 71-80\n• BC (Good): 61-70\n• CC (Average): 51-60\n• CD (Satisfactory): 45-50\n• DD (Pass): 40-44\n• FF (Fail): Below 40\n\n🔗 Official GTU Site: https://gtu.ac.in`,
        category: 'gtu_exam',
        suggestions: ['Check results', 'Download papers', 'GTU portal', 'Revaluation'],
      };

    case 'GTU_PORTAL':
      return {
        text: `💻 **GTU Student Portal**\n\n🔗 **Portal Link:** https://student.gtu.ac.in/Login.aspx\n\n**What you can do on GTU Portal:**\n• ✅ Fill Exam Forms\n• 📄 Download Hall Ticket / Admit Card\n• 📊 View Semester Results\n• 💰 Pay Exam Fees\n• 📚 View Enrollment Details\n• 🔄 Apply for Revaluation / Rechecking\n• 📋 Download Migration Certificate\n\n**Login with:** Your GTU Enrollment Number + Password\n\n⚠️ Forgot password? Use "Forgot Password" option or contact your college exam section.`,
        category: 'gtu_portal',
        suggestions: ['GTU results', 'Hall ticket', 'Exam form', 'GTU papers'],
      };

    case 'GTU_SYLLABUS':
      return {
        text: `📚 **GTU Syllabus**\n\n🔗 **Download Syllabus:** https://gtu.ac.in/syllabus/syllabus.aspx\n\nSteps:\n1. Visit the syllabus portal\n2. Select your **Programme** (B.E.)\n3. Select your **Branch**\n4. Select **Semester**\n5. Download the PDF syllabus\n\n💡 For branch-specific subjects, ask me:\n• "CE sem 5 subjects"\n• "MECH sem 4 syllabus"\n• "IT sem 6 subjects"`,
        category: 'academics',
        suggestions: ['CE subjects', 'IT subjects', 'GTU papers', 'Timetable'],
      };

    case 'GTU_TIMETABLE':
      return {
        text: `📅 **GTU Exam Timetable**\n\n🔗 **Official Link:** https://gtu.ac.in/timetable/timetable.aspx\n\n**Typical Exam Schedule:**\n• Winter Exams: November – December\n• Summer Exams: April – May\n• Remedial Exams: January & June\n\n⏰ Exam timings: Usually 10:30 AM to 1:30 PM\n\n✅ Detailed timetable is published ~1 month before exams on GTU portal.`,
        category: 'academics',
        suggestions: ['GTU results', 'Hall ticket', 'GTU papers', 'GTU portal'],
      };

    case 'SCHOLARSHIP':
      return {
        text: `🎓 **Scholarship Information**\n\n**1. MYSY – Mukhyamantri Yuva Swavalamban Yojana**\n• Eligibility: General category, Family income < ₹6 LPA\n• Benefits: Tuition fee + Hostel fee waiver\n• Portal: https://mysy.guj.nic.in/\n\n**2. Digital Gujarat Scholarship**\n• For SC, ST, OBC, SEBC students\n• Apply at: https://digitalgujarat.gov.in/\n\n**3. Post-Matric Scholarship (GOI)**\n• For SC/ST students\n• National Scholarship Portal: https://scholarships.gov.in/\n\n**4. Merit Scholarship**\n• For students with 75%+ marks\n• Through college office\n\n💡 **Fee Structure:**\n• Boys: ~₹1,500/year (Government quota)\n• Girls: FREE (Government scheme)\n• TFWS (Tuition Fee Waiver Scheme): FREE\n\n📞 Contact college accounts office for scholarship assistance.`,
        category: 'fees_scholarship',
        suggestions: ['Fee payment', 'Contact college', 'GTU portal'],
      };

    case 'TIMING':
      return {
        text: `⏰ **GEC Bhavnagar College Timings**\n\n• **Weekdays (Mon-Fri):** 10:45 AM – 5:45 PM\n• **Saturday:** 10:45 AM – 5:45 PM (1st, 3rd, 5th)\n• **2nd & 4th Saturday:** HOLIDAY\n• **Sunday:** HOLIDAY\n\n🏛️ **Office Hours:**\n• Mon-Fri: 10:30 AM – 5:30 PM\n• Saturday: 10:30 AM – 1:00 PM\n\n📚 **Library Hours:**\n• Mon-Fri: 9:00 AM – 6:00 PM\n• Saturday: 9:00 AM – 2:00 PM\n\n🎓 **Exam Timings (GTU):**\n• Morning Session: 10:30 AM – 1:30 PM\n• Afternoon Session (if any): 2:30 PM – 5:30 PM`,
        category: 'college_info',
        suggestions: ['Holiday list', 'Contact info', 'GTU exam schedule'],
      };

    case 'CONTACT':
      return {
        text: `📞 **GEC Bhavnagar – Contact Information**\n\n🏛️ **Address:**\nGovernment Engineering College, Bhavnagar\nVidyanagar, Bhavnagar, Gujarat – 364002\n\n📞 **Phone:** +91-278-2521234 / 2521235\n📧 **Email:** principal@gecbhavnagar.ac.in\n🌐 **Website:** https://www.gecbhavnagar.ac.in\n\n**Department Contacts:**\n• CE Dept: hod.ce@gecbhavnagar.ac.in\n• IT Dept: hod.it@gecbhavnagar.ac.in\n• EC Dept: hod.ec@gecbhavnagar.ac.in\n• MECH Dept: hod.mech@gecbhavnagar.ac.in\n• CIVIL Dept: hod.civil@gecbhavnagar.ac.in\n• ICT Dept: hod.ict@gecbhavnagar.ac.in\n\n📍 **How to reach:**\nNear Vidyanagar, Bhavnagar – accessible by local buses and auto-rickshaws from Bhavnagar city center.`,
        category: 'contact',
        suggestions: ['College website', 'GTU portal', 'Placement cell'],
      };

    case 'HOSTEL':
      return {
        text: `🏠 **GEC Bhavnagar Hostel Facilities**\n\n**Boys Hostel:**\n• Located inside campus\n• Capacity: ~300 students\n• Facilities: Mess, Wi-Fi, 24/7 Security\n• Rooms: Double/Triple sharing\n\n**Girls Hostel:**\n• Separate building with warden\n• Capacity: ~150 students\n• Facilities: Mess, Wi-Fi, 24/7 Security\n• Wardens on duty round the clock\n\n**Common Facilities:**\n• 🍽️ Canteen & Mess\n• 📡 Wi-Fi throughout campus\n• 🔒 CCTV Surveillance\n• 🏋️ Sports Ground\n• 🚑 Medical Room\n\n📞 For hostel admission, contact college administration.\nEmail: principal@gecbhavnagar.ac.in`,
        category: 'college_info',
        suggestions: ['College fees', 'Contact info', 'About college'],
      };

    case 'LIBRARY':
      return {
        text: `📚 **GEC Bhavnagar Central Library**\n\n**Collection:**\n• 20,000+ Technical Books\n• 500+ Journals & Periodicals\n• Access to NPTEL, IEEE, Elsevier databases\n• E-books & Digital Resources\n\n**Facilities:**\n• Reading Room (100+ seats)\n• Reprography Center\n• Computer Terminals for e-access\n• OPAC (Online Public Access Catalog)\n\n⏰ **Library Hours:**\n• Mon-Fri: 9:00 AM – 6:00 PM\n• Saturday: 9:00 AM – 2:00 PM\n\n💡 **NPTEL Online Courses:** https://nptel.ac.in\n💡 **SWAYAM (Free Online Courses):** https://swayam.gov.in`,
        category: 'college_info',
        suggestions: ['NPTEL courses', 'GTU syllabus', 'Study resources'],
      };

    case 'LABS':
      return {
        text: `🔬 **GEC Bhavnagar – Laboratories & Facilities**\n\n**Computer Science / IT / ICT:**\n• Software Development Lab (40 systems)\n• Networking & Cybersecurity Lab\n• AI/ML Research Lab\n• Database Lab\n\n**Electronics & Communication:**\n• VLSI Design Lab\n• Microprocessor & Embedded Lab\n• Communication & RF Lab\n• Signal Processing Lab\n\n**Mechanical Engineering:**\n• Thermodynamics Lab\n• Fluid Mechanics Lab\n• CAD/CAM Lab\n• Manufacturing/Workshop Lab\n• Automobile Lab\n\n**Civil Engineering:**\n• Structural Analysis Lab\n• Geotechnical Lab\n• Surveying Lab\n• Environmental Lab\n\n**Common Facilities:**\n• Campus Wi-Fi\n• Central Library\n• Auditorium (500 capacity)\n• Seminar Halls\n• Sports Complex`,
        category: 'college_info',
        suggestions: ['About college', 'Branch details', 'Contact info'],
      };

    case 'NOTICE': {
      const notices = await Notice.find().sort({ createdAt: -1 }).limit(5);
      if (!notices.length) return { text: 'No notices available right now.', category: 'notice' };
      const noticeList = notices.map(n =>
        `📌 **${n.title}** ${n.isImportant ? '⚠️ IMPORTANT' : ''}\n   ${n.description}\n   ${n.link ? `🔗 ${n.link}` : ''}`
      ).join('\n\n');
      return {
        text: `📋 **Latest Notices & Announcements**\n\n${noticeList}`,
        category: 'notice',
        suggestions: ['GTU updates', 'Exam info', 'Placement news'],
      };
    }

    case 'HELP':
      return {
        text: `🤖 **GEC Bhavnagar Assistant – What I Can Do**\n\n**📚 Academic Info:**\n• Branch details (CE/IT/ICT/MECH/CIVIL/EC)\n• Faculty lists and HOD details\n• Subjects per semester\n• GTU syllabus & papers\n\n**🎓 GTU Services:**\n• Check GTU results (gturesults.in)\n• Download old question papers\n• Exam timetable & schedule\n• GTU student portal guide\n• How GTU exam marks work (70+30)\n\n**💼 Placements:**\n• Placement statistics 2025-26\n• Company names & packages\n• Branch-wise placement data\n\n**📅 College Info:**\n• Holiday calendar 2026-27\n• College timings\n• Scholarships (MYSY, SC/ST)\n• Hostel & facilities\n\n**🔗 Useful Links:**\n• GEC Website: https://gecbhavnagar.ac.in\n• GTU Portal: https://student.gtu.ac.in\n• GTU Results: https://gturesults.in\n\n💬 Just type your question naturally!`,
        category: 'help',
        suggestions: ['Branch details', 'GTU results', 'Placement info', 'Holiday list'],
      };

    case 'THANKS':
      return {
        text: '😊 You\'re welcome! Happy to help you. Feel free to ask anything about GEC Bhavnagar or GTU anytime!\n\n🎓 *All the best for your studies!*',
        category: 'small_talk',
        suggestions: ['GTU results', 'Placement info', 'Branch details'],
      };

    case 'BYE':
      return {
        text: '👋 **Goodbye!** All the best for your studies!\n\n🎓 *GEC Bhavnagar – Engineering Excellence Since 1963*\n\nFeel free to come back anytime you need help!',
        category: 'small_talk',
        suggestions: [],
      };

    default: {
      // Try GTU info search
      const gtuInfo = await GTUInfo.findOne({
        keywords: { $in: [msg.toLowerCase()] }
      });
      if (gtuInfo) {
        return {
          text: `ℹ️ **${gtuInfo.title}**\n\n${gtuInfo.description}\n\n🔗 **Link:** ${gtuInfo.url}`,
          category: gtuInfo.category,
          suggestions: ['GTU results', 'GTU papers', 'GTU portal'],
        };
      }

      return {
        text: `🤔 I couldn't find specific information for that query.\n\nTry asking about:\n• **Branches:** "Tell me about CE" / "IT faculty"\n• **GTU:** "Check GTU result" / "Download papers"\n• **Placement:** "Placement stats 2024"\n• **Holidays:** "Holiday list"\n• **Timing:** "College timing"\n\nOr type "help" to see all features!`,
        category: 'fallback',
        suggestions: ['Help', 'Branch details', 'GTU results', 'Holiday list'],
      };
    }
  }
};

// ─── Main Chat Controller ─────────────────────────────────────────────────────
exports.processChat = async (req, res) => {
  try {
    const { message, sessionId = 'anon' } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Message cannot be empty' });
    }

    const intent = detectIntent(message);
    const branch = detectBranch(message.toLowerCase());
    const result = await generateResponse(intent, branch, message);

    // Save to chat history (async, non-blocking)
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
      { upsert: true, new: true }
    ).catch(err => console.error('Chat history save error:', err));

    res.json({
      success: true,
      response: result.text,
      category: result.category,
      suggestions: result.suggestions || [],
      intent: intent || 'unknown',
      detectedBranch: branch,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, error: 'Server error processing chat.' });
  }
};

// Search controller
exports.searchQuery = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ success: false, error: 'Search query required' });

    const [branches, gtuInfo] = await Promise.all([
      Branch.find(
        { $text: { $search: q } },
        { score: { $meta: 'textScore' }, code: 1, name: 1, shortDescription: 1 }
      ).sort({ score: { $meta: 'textScore' } }).limit(5),
      GTUInfo.find({ keywords: { $regex: q.toLowerCase() } }).limit(3),
    ]);

    res.json({ success: true, branches, gtuInfo, query: q });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ success: false, error: 'Search failed' });
  }
};
