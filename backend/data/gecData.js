// ============================================================
//   GEC Bhavnagar – Complete Seed Data  ★ 2026-27 UPDATED ★
//   Government Engineering College, Bhavnagar, Gujarat
// ============================================================

const branchesData = [

  // ────────────────────────────────────────────────────────
  //  COMPUTER ENGINEERING (CE)
  // ────────────────────────────────────────────────────────
  {
    code: 'CE', name: 'Computer Engineering',
    shortDescription: 'Software architecture, algorithms, AI/ML and computing systems.',
    fullDescription: 'Computer Engineering at GEC Bhavnagar prepares students in core CS fundamentals including Data Structures, DBMS, OS, and modern fields like AI/ML, Cloud Computing, and Cybersecurity. NBA Accredited. 60 seats.',
    intake: 60, hod: 'Dr. Hardik Molia', hodEmail: 'hod.ce@gecbhavnagar.ac.in',
    establishedYear: 2004, accreditation: 'NBA Accredited',
    labsAndFacilities: ['Software Development Lab (40 systems)','Advanced Computing Lab','Networking & Cybersecurity Lab','AI/ML Research Lab','Project Development Lab'],
    careerOpportunities: ['Full Stack Developer','AI / ML Engineer','Software Architect','Cybersecurity Analyst','DevOps / Cloud Engineer','Data Scientist','Mobile App Developer'],
    topRecruiters: ['TCS','Infosys','Wipro','HCL','Capgemini','L&T Infotech','Tata Elxsi','Accenture'],
    averagePackage: '₹5.0 LPA', highestPackage: '₹14 LPA', placementPercent: 78,
    keywords: ['computer','ce','software','programming','coding','cs','cse','computer engineering'],
    faculty: [
      { name:'Dr. Hardik Molia', designation:'Associate Professor & HOD', qualification:'Ph.D. (Computer Science)', specialization:'Machine Learning, Data Mining', experience:'15+ years', email:'hardik.molia@gecbhavnagar.ac.in', subjectsTaught:['Machine Learning','Data Mining','Research Methodology'], isHOD:true },
      { name:'Mr. K. P. Kandoriya', designation:'Assistant Professor', qualification:'M.E. (Computer Engineering)', specialization:'Database Systems, Web Technology', experience:'9 years', email:'kp.kandoriya@gecbhavnagar.ac.in', subjectsTaught:['DBMS','Advanced Java','Web Technology'] },
      { name:'Mr. Ashish Nimavat', designation:'Assistant Professor', qualification:'M.Tech (CSE)', specialization:'Computer Networks, Cybersecurity', experience:'8 years', email:'ashish.nimavat@gecbhavnagar.ac.in', subjectsTaught:['Computer Networks','Cybersecurity','Operating Systems'] },
      { name:'Mr. Chinmay Vyas', designation:'Assistant Professor', qualification:'M.E. (Information Technology)', specialization:'Cloud Computing, DevOps', experience:'7 years', email:'chinmay.vyas@gecbhavnagar.ac.in', subjectsTaught:['Cloud Computing','Software Engineering','Linux'] },
      { name:'Prof. H. S. Sanghavi', designation:'Assistant Professor', qualification:'M.E. (Computer Engineering)', specialization:'Algorithms, Compiler Design', experience:'10 years', email:'hs.sanghavi@gecbhavnagar.ac.in', subjectsTaught:['Design & Analysis of Algorithms','Compiler Design','TOC'] },
      { name:'Mr. Kirit Rathod', designation:'Assistant Professor', qualification:'M.Tech (CSE)', specialization:'Artificial Intelligence, Python', experience:'6 years', email:'kirit.rathod@gecbhavnagar.ac.in', subjectsTaught:['Artificial Intelligence','Python Programming','Data Structures'] },
    ],
    semesters: [
      { semNumber:1, subjects:[
        { code:'3110005', name:'Mathematics-I',               credits:5, type:'Theory',    faculty:'Maths Dept.'     },
        { code:'3110003', name:'Physics',                     credits:4, type:'Theory',    faculty:'Physics Dept.'   },
        { code:'3110004', name:'Chemistry',                   credits:4, type:'Theory',    faculty:'Chemistry Dept.' },
        { code:'3110007', name:'English Communication',       credits:3, type:'Theory',    faculty:'Humanities Dept.'},
        { code:'3110006', name:'Elements of Electrical Engg.',credits:4, type:'Theory',    faculty:'EE Dept.'        },
      ]},
      { semNumber:2, subjects:[
        { code:'3120005', name:'Mathematics-II',              credits:5, type:'Theory',    faculty:'Maths Dept.'     },
        { code:'3120009', name:'Programming for Problem Solving (C)', credits:4, type:'Theory', faculty:'Mr. Kirit Rathod' },
        { code:'3120010', name:'Workshop',                    credits:2, type:'Practical', faculty:'Workshop Dept.'  },
        { code:'3120011', name:'Engineering Drawing',         credits:3, type:'Theory',    faculty:'Maths Dept.'     },
      ]},
      { semNumber:3, subjects:[
        { code:'3130006', name:'Mathematics-III (Discrete Maths)',     credits:4, type:'Theory', faculty:'Maths Dept.' },
        { code:'3130701', name:'Data Structures & Algorithms',         credits:4, type:'Theory', faculty:'Prof. H. S. Sanghavi' },
        { code:'3130702', name:'Digital Electronics & Logic Design',   credits:4, type:'Theory', faculty:'EC Dept.' },
        { code:'3130703', name:'Object Oriented Programming (C++)',    credits:4, type:'Theory', faculty:'Mr. Ashish Nimavat' },
        { code:'3130704', name:'Computer Organization & Architecture', credits:4, type:'Theory', faculty:'Mr. K. P. Kandoriya' },
      ]},
      { semNumber:4, subjects:[
        { code:'3140705', name:'Database Management Systems',  credits:4, type:'Theory', faculty:'Mr. K. P. Kandoriya' },
        { code:'3140706', name:'Operating Systems',            credits:4, type:'Theory', faculty:'Mr. Ashish Nimavat' },
        { code:'3140707', name:'Design & Analysis of Algorithms', credits:4, type:'Theory', faculty:'Prof. H. S. Sanghavi' },
        { code:'3140708', name:'Web Technology',               credits:4, type:'Theory', faculty:'Mr. K. P. Kandoriya' },
        { code:'3140709', name:'Microprocessors & Interfacing',credits:3, type:'Theory', faculty:'EC Dept.' },
      ]},
      { semNumber:5, subjects:[
        { code:'3150710', name:'Computer Networks',      credits:4, type:'Theory', faculty:'Mr. Ashish Nimavat' },
        { code:'3150711', name:'Theory of Computation',  credits:4, type:'Theory', faculty:'Prof. H. S. Sanghavi' },
        { code:'3150712', name:'Software Engineering',   credits:4, type:'Theory', faculty:'Mr. Chinmay Vyas' },
        { code:'3150713', name:'Artificial Intelligence',credits:4, type:'Theory', faculty:'Mr. Kirit Rathod' },
        { code:'3150714', name:'Advanced Java',          credits:4, type:'Theory', faculty:'Mr. K. P. Kandoriya' },
      ]},
      { semNumber:6, subjects:[
        { code:'3160715', name:'Machine Learning',    credits:4, type:'Theory',    faculty:'Dr. Hardik Molia'  },
        { code:'3160716', name:'Compiler Design',     credits:4, type:'Theory',    faculty:'Prof. H. S. Sanghavi' },
        { code:'3160717', name:'Cloud Computing',     credits:4, type:'Theory',    faculty:'Mr. Chinmay Vyas'  },
        { code:'3160718', name:'Cybersecurity',       credits:4, type:'Theory',    faculty:'Mr. Ashish Nimavat'},
        { code:'3160719', name:'Minor Project',       credits:4, type:'Practical', faculty:'All Faculty'       },
      ]},
      { semNumber:7, subjects:[
        { code:'3170720', name:'Data Science',               credits:4, type:'Theory',    faculty:'Dr. Hardik Molia' },
        { code:'3170721', name:'IoT & Embedded Systems',     credits:4, type:'Theory',    faculty:'Mr. Kirit Rathod' },
        { code:'3170722', name:'Blockchain Technology',      credits:4, type:'Theory',    faculty:'Mr. Chinmay Vyas' },
        { code:'3170723', name:'Major Project – Phase I',   credits:6, type:'Practical', faculty:'All Faculty'      },
      ]},
      { semNumber:8, subjects:[
        { code:'3180730', name:'Big Data Analytics',         credits:4, type:'Theory',    faculty:'Dr. Hardik Molia' },
        { code:'3180731', name:'Natural Language Processing',credits:4, type:'Theory',    faculty:'Mr. Kirit Rathod' },
        { code:'3180732', name:'Major Project – Phase II',  credits:10,type:'Practical', faculty:'All Faculty'      },
      ]},
    ],
  },

  // ────────────────────────────────────────────────────────
  //  INFORMATION TECHNOLOGY (IT)
  // ────────────────────────────────────────────────────────
  {
    code:'IT', name:'Information Technology',
    shortDescription:'Information storage, management, software development and networking.',
    fullDescription:'IT at GEC Bhavnagar covers management of information systems, software development, networking, and enterprise computing. Students gain skills in DBMS, Web Dev, Cyber Security, and IT project management.',
    intake:60, hod:'Mr. Shailesh Molia', hodEmail:'hod.it@gecbhavnagar.ac.in',
    establishedYear:2004, accreditation:'AICTE Approved',
    labsAndFacilities:['IT Systems Lab','Networking Lab','Database Lab','Web Technologies Lab','Cyber Security Lab'],
    careerOpportunities:['Database Administrator','IT Consultant','Systems Analyst','Web Application Developer','Network Administrator','IT Project Manager','ERP Consultant'],
    topRecruiters:['TCS','Infosys','Accenture','Mphasis','Persistent Systems','Hexaware','Cognizant'],
    averagePackage:'₹4.8 LPA', highestPackage:'₹11 LPA', placementPercent:74,
    keywords:['information technology','it','database','web','networking','software','it branch'],
    faculty:[
      { name:'Mr. Shailesh Molia',  designation:'Assistant Professor & HOD', qualification:'M.E. (IT)',   specialization:'Software Engineering, Project Management', experience:'13 years', subjectsTaught:['Software Engineering','IT Project Management'], isHOD:true },
      { name:'Mr. Anoop Patel',     designation:'Assistant Professor',        qualification:'M.Tech (IT)', specialization:'Cybersecurity, Networking',  experience:'9 years',  subjectsTaught:['Cybersecurity','Computer Networks'] },
      { name:'Mr. Jayesh Rathod',   designation:'Assistant Professor',        qualification:'M.E. (CSE)', specialization:'Web Technologies, React',    experience:'7 years',  subjectsTaught:['Web Technologies','Advanced Web Dev','JavaScript Frameworks'] },
      { name:'Ms. Sweta Garasia',   designation:'Assistant Professor',        qualification:'M.E. (IT)',   specialization:'DBMS, Data Warehousing',    experience:'8 years',  subjectsTaught:['DBMS','Data Warehousing & Mining','SQL'] },
      { name:'Mr. Nishidh Chavda',  designation:'Assistant Professor',        qualification:'M.Tech (CSE)',specialization:'Cloud, DevOps',             experience:'6 years',  subjectsTaught:['Cloud Computing','Linux','DevOps'] },
      { name:'Mr. Virendra Barot',  designation:'Assistant Professor',        qualification:'M.E. (IT)',   specialization:'Python, AI',               experience:'7 years',  subjectsTaught:['Python','AI Fundamentals','Data Science'] },
      { name:'Mr. Bharat Vainsh',   designation:'Assistant Professor',        qualification:'M.E. (CSE)', specialization:'Mobile Computing, Android', experience:'6 years',  subjectsTaught:['Mobile Computing','Android Development'] },
    ],
    semesters:[
      { semNumber:3, subjects:[ {name:'Data Structures',faculty:'Mr. Virendra Barot'},{name:'OOP with Java',faculty:'Mr. Jayesh Rathod'},{name:'Computer Organization',faculty:'Mr. Nishidh Chavda'} ]},
      { semNumber:4, subjects:[ {name:'DBMS',faculty:'Ms. Sweta Garasia'},{name:'Web Technology',faculty:'Mr. Jayesh Rathod'},{name:'Python Programming',faculty:'Mr. Virendra Barot'},{name:'Computer Networks',faculty:'Mr. Anoop Patel'} ]},
      { semNumber:5, subjects:[ {name:'Software Engineering',faculty:'Mr. Shailesh Molia'},{name:'Cybersecurity',faculty:'Mr. Anoop Patel'},{name:'Advanced Java',faculty:'Mr. Jayesh Rathod'},{name:'Mobile Computing',faculty:'Mr. Bharat Vainsh'} ]},
      { semNumber:6, subjects:[ {name:'Cloud Computing',faculty:'Mr. Nishidh Chavda'},{name:'Data Warehousing & Mining',faculty:'Ms. Sweta Garasia'},{name:'IT Project Management',faculty:'Mr. Shailesh Molia'},{name:'Minor Project',faculty:'All Faculty'} ]},
      { semNumber:7, subjects:[ {name:'Blockchain',faculty:'Mr. Nishidh Chavda'},{name:'AI & ML',faculty:'Mr. Virendra Barot'},{name:'Major Project Phase I',faculty:'All Faculty'} ]},
      { semNumber:8, subjects:[ {name:'ERP Systems',faculty:'Mr. Shailesh Molia'},{name:'IoT Applications',faculty:'Mr. Bharat Vainsh'},{name:'Major Project Phase II',faculty:'All Faculty'} ]},
    ],
  },

  // ────────────────────────────────────────────────────────
  //  ICT
  // ────────────────────────────────────────────────────────
  {
    code:'ICT', name:'Information & Communication Technology',
    shortDescription:'Bridges IT with telecommunication and embedded communication networks.',
    fullDescription:'ICT at GEC Bhavnagar integrates Information Technology with Telecommunication networks. Students study Digital Communication, Embedded Systems, Signal Processing, IoT, and Data Science.',
    intake:30, hod:'Ms. Bindi Joshi', hodEmail:'hod.ict@gecbhavnagar.ac.in',
    establishedYear:2010, accreditation:'AICTE Approved',
    labsAndFacilities:['Signal Processing Lab','Embedded Systems Lab','Communication Lab','IoT Lab'],
    careerOpportunities:['Network Security Specialist','Embedded Systems Developer','Data Architect','Communication Systems Engineer','Telecom Infrastructure Manager','IoT Engineer'],
    topRecruiters:['Airtel','BSNL','Reliance Jio','Nokia','Ericsson','Tata Communications'],
    averagePackage:'₹4.2 LPA', highestPackage:'₹9.5 LPA', placementPercent:70,
    keywords:['ict','information communication technology','telecom','embedded','signal','ict branch'],
    faculty:[
      { name:'Ms. Bindi Joshi',    designation:'Assistant Professor & HOD', qualification:'M.E. (ICT)',   specialization:'Digital Communication, Signal Processing', experience:'11 years', subjectsTaught:['Digital Communication','Signal Processing','Telecom Networks'], isHOD:true },
      { name:'Mr. Mehul Vala',     designation:'Assistant Professor',        qualification:'M.E. (EC)',    specialization:'Embedded Systems, VLSI',               experience:'8 years',  subjectsTaught:['Embedded Systems','VLSI Design','Microcontrollers'] },
      { name:'Ms. Khyati Chavda',  designation:'Assistant Professor',        qualification:'M.Tech (IT)', specialization:'Data Science, Python',                 experience:'6 years',  subjectsTaught:['Data Science','Python','Machine Learning Basics'] },
    ],
    semesters:[
      { semNumber:3, subjects:[ {name:'Data Structures',faculty:'Ms. Khyati Chavda'},{name:'Digital Electronics',faculty:'Mr. Mehul Vala'},{name:'Signals & Systems',faculty:'Ms. Bindi Joshi'} ]},
      { semNumber:4, subjects:[ {name:'Digital Communication',faculty:'Ms. Bindi Joshi'},{name:'Embedded Systems',faculty:'Mr. Mehul Vala'},{name:'Python & Data Science',faculty:'Ms. Khyati Chavda'} ]},
      { semNumber:5, subjects:[ {name:'Computer Networks',faculty:'Ms. Bindi Joshi'},{name:'VLSI Design',faculty:'Mr. Mehul Vala'},{name:'Machine Learning',faculty:'Ms. Khyati Chavda'} ]},
      { semNumber:6, subjects:[ {name:'Wireless Communication',faculty:'Ms. Bindi Joshi'},{name:'IoT & Sensor Networks',faculty:'Mr. Mehul Vala'},{name:'Big Data',faculty:'Ms. Khyati Chavda'},{name:'Minor Project',faculty:'All Faculty'} ]},
      { semNumber:7, subjects:[ {name:'5G & Next Gen Networks',faculty:'Ms. Bindi Joshi'},{name:'RTOS',faculty:'Mr. Mehul Vala'},{name:'Major Project Phase I',faculty:'All Faculty'} ]},
      { semNumber:8, subjects:[ {name:'Industry 4.0',faculty:'Mr. Mehul Vala'},{name:'Deep Learning',faculty:'Ms. Khyati Chavda'},{name:'Major Project Phase II',faculty:'All Faculty'} ]},
    ],
  },

  // ────────────────────────────────────────────────────────
  //  MECHANICAL ENGINEERING (MECH)
  // ────────────────────────────────────────────────────────
  {
    code:'MECH', name:'Mechanical Engineering',
    shortDescription:'Design, manufacture, and maintenance of mechanical systems and machines.',
    fullDescription:'Mechanical Engineering at GEC Bhavnagar covers Thermodynamics, Machine Design, Manufacturing, CAD/CAM, Fluid Mechanics, and more. One of the oldest and most respected departments, NBA Accredited.',
    intake:60, hod:'Dr. S. M. Mehta', hodEmail:'hod.mech@gecbhavnagar.ac.in',
    establishedYear:1963, accreditation:'NBA Accredited',
    labsAndFacilities:['Thermodynamics Lab','Fluid Mechanics Lab','Manufacturing Lab','CAD/CAM Lab','Automobile Lab','Strength of Materials Lab','Heat Transfer Lab'],
    careerOpportunities:['Design Engineer (Automotive)','Production Manager','Maintenance Engineer','Thermal Power Plant Engineer','Robotics Designer','Quality Control Engineer'],
    topRecruiters:['L&T','ONGC','Tata Motors','Mahindra','GSFC','IOCL','BHEL','GAIL','Adani'],
    averagePackage:'₹4.0 LPA', highestPackage:'₹10 LPA', placementPercent:67,
    keywords:['mechanical','mech','machine','thermodynamics','manufacturing','cad','cam','automobile'],
    faculty:[
      { name:'Dr. S. M. Mehta',   designation:'Professor & HOD',          qualification:'Ph.D. (Mechanical)',      specialization:'Thermodynamics, Heat Transfer',        experience:'21+ years', subjectsTaught:['Thermodynamics','Heat Transfer','Thermal Engineering'], isHOD:true },
      { name:'Dr. Janak Valaki',  designation:'Associate Professor',       qualification:'Ph.D. (Production Engg.)',specialization:'Manufacturing, CAD/CAM',               experience:'16 years',  subjectsTaught:['CAD/CAM','Manufacturing Processes','CNC Technology'] },
      { name:'Dr. D. B. Jani',    designation:'Associate Professor',       qualification:'Ph.D. (Thermal Engg.)',   specialization:'Fluid Mechanics, Energy',              experience:'15 years',  subjectsTaught:['Fluid Mechanics & Machinery','Refrigeration & AC','Energy Engineering'] },
      { name:'Dr. Mehul Mehta',   designation:'Assistant Professor',       qualification:'Ph.D. (Machine Design)',  specialization:'Machine Design, FEM',                 experience:'11 years',  subjectsTaught:['Machine Design','Theory of Machines','FEM Analysis'] },
      { name:'Dr. Sanjay Zala',   designation:'Assistant Professor',       qualification:'Ph.D. (Industrial Engg.)',specialization:'Industrial Engg., Operations Research',experience:'10 years',  subjectsTaught:['Industrial Engineering','Operations Research','TQM'] },
    ],
    semesters:[
      { semNumber:3, subjects:[ {name:'Mechanics of Solids',faculty:'Dr. Mehul Mehta'},{name:'Thermodynamics',faculty:'Dr. S. M. Mehta'},{name:'Manufacturing Processes',faculty:'Dr. Janak Valaki'} ]},
      { semNumber:4, subjects:[ {name:'Fluid Mechanics',faculty:'Dr. D. B. Jani'},{name:'Theory of Machines',faculty:'Dr. Mehul Mehta'},{name:'Material Science',faculty:'Dr. Janak Valaki'} ]},
      { semNumber:5, subjects:[ {name:'Heat Transfer',faculty:'Dr. S. M. Mehta'},{name:'Machine Design',faculty:'Dr. Mehul Mehta'},{name:'CAD/CAM',faculty:'Dr. Janak Valaki'},{name:'Industrial Engineering',faculty:'Dr. Sanjay Zala'} ]},
      { semNumber:6, subjects:[ {name:'Fluid Machinery',faculty:'Dr. D. B. Jani'},{name:'Refrigeration & AC',faculty:'Dr. D. B. Jani'},{name:'FEM',faculty:'Dr. Mehul Mehta'},{name:'Minor Project',faculty:'All Faculty'} ]},
      { semNumber:7, subjects:[ {name:'Automation & Robotics',faculty:'Dr. Janak Valaki'},{name:'Operations Research',faculty:'Dr. Sanjay Zala'},{name:'Major Project Phase I',faculty:'All Faculty'} ]},
      { semNumber:8, subjects:[ {name:'Total Quality Management',faculty:'Dr. Sanjay Zala'},{name:'Renewable Energy',faculty:'Dr. D. B. Jani'},{name:'Major Project Phase II',faculty:'All Faculty'} ]},
    ],
  },

  // ────────────────────────────────────────────────────────
  //  CIVIL ENGINEERING (CIVIL)
  // ────────────────────────────────────────────────────────
  {
    code:'CIVIL', name:'Civil Engineering',
    shortDescription:'Design and construction of infrastructure, buildings and structures.',
    fullDescription:'Civil Engineering at GEC Bhavnagar covers Structural Analysis, Geotechnical Engineering, Transportation, Environmental Engineering, and Surveying. Students are prepared for roles in construction, government (GPSC/UPSC), and consulting.',
    intake:60, hod:'Mrs. Vishwa Dave', hodEmail:'hod.civil@gecbhavnagar.ac.in',
    establishedYear:1963, accreditation:'NBA Accredited',
    labsAndFacilities:['Structures Lab','Geotechnical Lab','Fluid Mechanics Lab','Surveying Lab','Environmental Lab','CAD Lab'],
    careerOpportunities:['Structural Engineer','Site Supervisor','Urban Infrastructure Planner','Hydrologist','Quantity Surveyor','Government (GPSC/UPSC)','Construction Manager'],
    topRecruiters:['L&T Construction','NHAI','GMDC','GPSC','GIDC','Shapoorji Pallonji','Adani','Afcons'],
    averagePackage:'₹3.8 LPA', highestPackage:'₹8.5 LPA', placementPercent:62,
    keywords:['civil','construction','structural','surveying','concrete','rcc','infrastructure','civil engineering'],
    faculty:[
      { name:'Mrs. Vishwa Dave',    designation:'Assistant Professor & HOD', qualification:'M.E. (Structural)',      specialization:'Structural Analysis, RCC Design',          experience:'13 years', subjectsTaught:['Structural Analysis','RCC Design','Earthquake Engg.'], isHOD:true },
      { name:'Mr. Yashodhar Pathak',designation:'Assistant Professor',        qualification:'M.E. (Civil)',           specialization:'Geotechnical Engineering',                 experience:'10 years', subjectsTaught:['Geotechnical Engineering','Foundation Design'] },
      { name:'Mr. Purvang Pandya',  designation:'Assistant Professor',        qualification:'M.E. (Transportation)', specialization:'Transportation, Highway Engineering',       experience:'9 years',  subjectsTaught:['Transportation Engineering','Highway Engineering'] },
      { name:'Mr. Chintan Gajjar',  designation:'Assistant Professor',        qualification:'M.E. (Environmental)',  specialization:'Environmental Engineering, Water Resources',experience:'8 years',  subjectsTaught:['Environmental Engineering','Water Resources'] },
      { name:'Mr. Saad Golwala',    designation:'Assistant Professor',        qualification:'M.E. (Structural)',      specialization:'Steel Structures, Building Design',        experience:'7 years',  subjectsTaught:['Steel Structures','Advanced Structural Design','Surveying'] },
    ],
    semesters:[
      { semNumber:3, subjects:[ {name:'Fluid Mechanics',faculty:'Mr. Chintan Gajjar'},{name:'Building Materials',faculty:'Mrs. Vishwa Dave'},{name:'Surveying',faculty:'Mr. Saad Golwala'} ]},
      { semNumber:4, subjects:[ {name:'Structural Analysis I',faculty:'Mrs. Vishwa Dave'},{name:'Geotechnical Engineering',faculty:'Mr. Yashodhar Pathak'},{name:'Transportation Engineering',faculty:'Mr. Purvang Pandya'} ]},
      { semNumber:5, subjects:[ {name:'RCC Design',faculty:'Mrs. Vishwa Dave'},{name:'Water Resources',faculty:'Mr. Chintan Gajjar'},{name:'Foundation Design',faculty:'Mr. Yashodhar Pathak'} ]},
      { semNumber:6, subjects:[ {name:'Steel Structures',faculty:'Mr. Saad Golwala'},{name:'Environmental Engineering',faculty:'Mr. Chintan Gajjar'},{name:'Traffic Engineering',faculty:'Mr. Purvang Pandya'},{name:'Minor Project',faculty:'All Faculty'} ]},
      { semNumber:7, subjects:[ {name:'Earthquake Engineering',faculty:'Mrs. Vishwa Dave'},{name:'Advanced Foundation',faculty:'Mr. Yashodhar Pathak'},{name:'Major Project Phase I',faculty:'All Faculty'} ]},
      { semNumber:8, subjects:[ {name:'Urban Planning',faculty:'Mr. Purvang Pandya'},{name:'Pre-stressed Concrete',faculty:'Mr. Saad Golwala'},{name:'Major Project Phase II',faculty:'All Faculty'} ]},
    ],
  },

  // ────────────────────────────────────────────────────────
  //  ELECTRONICS & COMMUNICATION (EC)
  // ────────────────────────────────────────────────────────
  {
    code:'EC', name:'Electronics & Communication Engineering',
    shortDescription:'Electronic circuits, VLSI, semiconductor devices and wireless communication.',
    fullDescription:'EC at GEC Bhavnagar covers VLSI Design, Microprocessors, Satellite Communication, RF Engineering, Analog/Digital Electronics, and Signal Processing. NBA Accredited. 60 seats.',
    intake:60, hod:'Dr. Hasmukh Koringa', hodEmail:'hod.ec@gecbhavnagar.ac.in',
    establishedYear:1963, accreditation:'NBA Accredited',
    labsAndFacilities:['Electronic Circuits Lab','VLSI Lab','Microprocessor Lab','Communication Lab','Antenna & RF Lab','Signal Processing Lab'],
    careerOpportunities:['VLSI Design Engineer','RF Engineer','Embedded Systems Engineer','Telecom Engineer','Hardware Design Engineer','Signal Processing Engineer','PCB Design Engineer'],
    topRecruiters:['Texas Instruments','Qualcomm','Intel','Samsung','Tata Elxsi','ISRO (campus drive)','Intelec'],
    averagePackage:'₹4.5 LPA', highestPackage:'₹12 LPA', placementPercent:72,
    keywords:['electronics','ec','communication','vlsi','microprocessor','circuit','signal','rf','telecom','ec branch'],
    faculty:[
      { name:'Dr. Hasmukh Koringa', designation:'Professor & HOD',       qualification:'Ph.D. (Electronics)',    specialization:'VLSI, Semiconductor Devices',             experience:'19 years', subjectsTaught:['VLSI Design','Semiconductor Physics','Advanced VLSI'], isHOD:true },
      { name:'Dr. Devang Jani',     designation:'Associate Professor',    qualification:'Ph.D. (Communication)', specialization:'Wireless Communication, Signal Processing',experience:'15 years', subjectsTaught:['Wireless Communication','Digital Signal Processing','Antenna Design'] },
      { name:'Dr. Janak Trivedi',   designation:'Assistant Professor',    qualification:'Ph.D. (Embedded Sys.)', specialization:'Microprocessors, Embedded Systems',       experience:'12 years', subjectsTaught:['Microprocessors','Embedded Systems','ARM Architecture'] },
      { name:'Dr. Miral Patel',     designation:'Assistant Professor',    qualification:'Ph.D. (Electronics)',   specialization:'Analog Electronics, Amplifiers',          experience:'10 years', subjectsTaught:['Analog Electronics','Linear IC Design','RF Engineering'] },
      { name:'Dr. Amit Rathod',     designation:'Assistant Professor',    qualification:'Ph.D. (Communication)', specialization:'Satellite Communication, Optical Fiber',   experience:'9 years',  subjectsTaught:['Satellite Communication','Optical Fiber Communication','Communication Theory'] },
    ],
    semesters:[
      { semNumber:3, subjects:[ {name:'Network Analysis',faculty:'Dr. Miral Patel'},{name:'Digital Electronics',faculty:'Dr. Hasmukh Koringa'},{name:'Electronic Devices & Circuits',faculty:'Dr. Miral Patel'} ]},
      { semNumber:4, subjects:[ {name:'Signals & Systems',faculty:'Dr. Devang Jani'},{name:'Microprocessors',faculty:'Dr. Janak Trivedi'},{name:'Analog Electronics',faculty:'Dr. Miral Patel'},{name:'Control Systems',faculty:'Dr. Devang Jani'} ]},
      { semNumber:5, subjects:[ {name:'Digital Signal Processing',faculty:'Dr. Devang Jani'},{name:'Communication Theory',faculty:'Dr. Amit Rathod'},{name:'Embedded Systems',faculty:'Dr. Janak Trivedi'},{name:'VLSI Design',faculty:'Dr. Hasmukh Koringa'} ]},
      { semNumber:6, subjects:[ {name:'Wireless Communication',faculty:'Dr. Devang Jani'},{name:'RF & Antenna Design',faculty:'Dr. Miral Patel'},{name:'Advanced VLSI',faculty:'Dr. Hasmukh Koringa'},{name:'Minor Project',faculty:'All Faculty'} ]},
      { semNumber:7, subjects:[ {name:'Satellite Communication',faculty:'Dr. Amit Rathod'},{name:'Optical Fiber Communication',faculty:'Dr. Amit Rathod'},{name:'Major Project Phase I',faculty:'All Faculty'} ]},
      { semNumber:8, subjects:[ {name:'Advanced Communication Systems',faculty:'Dr. Devang Jani'},{name:'IoT & Industry 4.0',faculty:'Dr. Janak Trivedi'},{name:'Major Project Phase II',faculty:'All Faculty'} ]},
    ],
  },
];

// ────────────────────────────────────────────────────────
//  PLACEMENT STATISTICS  ★ 2025-26 UPDATED ★
// ────────────────────────────────────────────────────────
const placementData = {
  year: '2025-26',
  totalStudentsPlaced: 203,
  highestPackage: '₹14 LPA (CE)',
  averagePackage: '₹4.7 LPA',
  totalCompanies: 32,
  overallPlacementPercent: 74,
  topCompanies: ['TCS','Infosys','Wipro','L&T','Capgemini','HCL','Accenture','Cognizant','ONGC','GSFC','Tata Motors','Adani Group','Mahindra','Samsung','Reliance'],
  branchWiseStats: [
    { branch:'CE',    placed:47, total:60, highestPackage:'₹14 LPA',  averagePackage:'₹5.0 LPA' },
    { branch:'IT',    placed:44, total:60, highestPackage:'₹11 LPA',  averagePackage:'₹4.8 LPA' },
    { branch:'EC',    placed:43, total:60, highestPackage:'₹12 LPA',  averagePackage:'₹4.5 LPA' },
    { branch:'MECH',  placed:40, total:60, highestPackage:'₹10 LPA',  averagePackage:'₹4.0 LPA' },
    { branch:'CIVIL', placed:37, total:60, highestPackage:'₹8.5 LPA', averagePackage:'₹3.8 LPA' },
    { branch:'ICT',   placed:21, total:30, highestPackage:'₹9.5 LPA', averagePackage:'₹4.2 LPA' },
  ],
  records: [
    { year:'2025-26', branch:'CE',   company:'TCS',             role:'Software Developer',       package:'₹3.36 LPA', studentsPlaced:9,  type:'On-Campus' },
    { year:'2025-26', branch:'CE',   company:'Infosys',         role:'Systems Engineer',         package:'₹3.6 LPA',  studentsPlaced:7,  type:'On-Campus' },
    { year:'2025-26', branch:'CE',   company:'L&T Infotech',    role:'Engineer Trainee',         package:'₹5.0 LPA',  studentsPlaced:4,  type:'On-Campus' },
    { year:'2025-26', branch:'CE',   company:'Capgemini',       role:'Analyst',                  package:'₹4.8 LPA',  studentsPlaced:5,  type:'On-Campus' },
    { year:'2025-26', branch:'IT',   company:'Wipro',           role:'Project Engineer',         package:'₹3.5 LPA',  studentsPlaced:8,  type:'On-Campus' },
    { year:'2025-26', branch:'IT',   company:'Accenture',       role:'Associate Software Engg.', package:'₹4.5 LPA',  studentsPlaced:6,  type:'On-Campus' },
    { year:'2025-26', branch:'EC',   company:'Tata Elxsi',      role:'Design Engineer',          package:'₹6.5 LPA',  studentsPlaced:4,  type:'On-Campus' },
    { year:'2025-26', branch:'EC',   company:'Samsung R&D',     role:'Junior Engineer',          package:'₹7 LPA',    studentsPlaced:2,  type:'On-Campus' },
    { year:'2025-26', branch:'MECH', company:'L&T Construction',role:'Site Engineer',            package:'₹4.5 LPA',  studentsPlaced:7,  type:'On-Campus' },
    { year:'2025-26', branch:'MECH', company:'ONGC',            role:'Junior Engineer',          package:'₹7.5 LPA',  studentsPlaced:2,  type:'On-Campus' },
    { year:'2025-26', branch:'CIVIL',company:'Shapoorji Pallonji',role:'Project Engineer',       package:'₹4.0 LPA',  studentsPlaced:5,  type:'On-Campus' },
    { year:'2025-26', branch:'CIVIL',company:'ADANI Group',     role:'Site Engineer',            package:'₹4.5 LPA',  studentsPlaced:4,  type:'On-Campus' },
    { year:'2025-26', branch:'ICT',  company:'Airtel',          role:'Network Engineer',         package:'₹4.5 LPA',  studentsPlaced:3,  type:'On-Campus' },
  ],
};

// ────────────────────────────────────────────────────────
//  HOLIDAY CALENDAR  ★ 2026-27 UPDATED ★
// ────────────────────────────────────────────────────────
const holidayData = {
  academicYear: '2026-27',
  holidays: [
    // ── National Holidays ──
    { date:'15 Aug 2026', day:'Saturday',  occasion:'Independence Day',       type:'National' },
    { date:'02 Oct 2026', day:'Friday',    occasion:'Gandhi Jayanti',         type:'National' },
    { date:'26 Jan 2027', day:'Tuesday',   occasion:'Republic Day',           type:'National' },
    { date:'14 Nov 2026', day:'Saturday',  occasion:"Children's Day",         type:'National' },
    { date:'14 Apr 2027', day:'Wednesday', occasion:'Dr. Ambedkar Jayanti',   type:'National' },
    { date:'01 May 2027', day:'Saturday',  occasion:'Gujarat Sthapana Divas', type:'National' },
    // ── Festival Holidays ──
    { date:'25 Aug 2026', day:'Tuesday',   occasion:'Janmashtami',            type:'Festival' },
    { date:'02 Oct 2026', day:'Friday',    occasion:'Navratri Start',         type:'Festival' },
    { date:'02 Oct 2026', day:'Friday',    occasion:'Dussehra',               type:'Festival' },
    { date:'20 Oct 2026', day:'Tuesday',   occasion:'Diwali – Laxmi Pujan',   type:'Festival' },
    { date:'21 Oct 2026', day:'Wednesday', occasion:'Diwali – Balipratipada', type:'Festival' },
    { date:'22 Oct 2026', day:'Thursday',  occasion:'Bhai Beej',              type:'Festival' },
    { date:'24 Nov 2026', day:'Tuesday',   occasion:'Guru Nanak Jayanti',     type:'Festival' },
    { date:'14 Jan 2027', day:'Thursday',  occasion:'Uttarayan (Makar Sankranti)', type:'Festival' },
    { date:'26 Feb 2027', day:'Friday',    occasion:'Maha Shivratri',         type:'Festival' },
    { date:'19 Mar 2027', day:'Friday',    occasion:'Holi',                   type:'Festival' },
    { date:'29 Mar 2027', day:'Monday',    occasion:'Dhuleti (Rang Panchami)',type:'Festival' },
    { date:'25 Dec 2026', day:'Friday',    occasion:'Christmas',              type:'Festival' },
    // ── University / Semester Breaks ──
    { date:'Dec 2026 – Jan 2027', day:'Multiple', occasion:'Winter Vacation (GTU Declared)', type:'University' },
    { date:'May – Jun 2027',      day:'Multiple', occasion:'Summer Vacation (GTU Declared)', type:'University' },
  ],
  collegeTimings: {
    weekdays:    '10:45 AM to 5:45 PM',
    saturday:    '10:45 AM to 5:45 PM (1st, 3rd, 5th Saturdays)',
    offSaturdays:'2nd & 4th Saturdays are holidays',
    sunday:      'Weekly holiday',
  },
};

// ────────────────────────────────────────────────────────
//  GTU IMPORTANT LINKS  ★ 2026-27 ★
// ────────────────────────────────────────────────────────
const gtuInfoData = [
  { category:'result',     title:'GTU Results',               description:'Check GTU semester exam results. Enter enrollment number to view results.',           url:'https://gturesults.in/',                                             keywords:['result','marks','grade','pass','fail','score','semester result','exam result'] },
  { category:'portal',     title:'GTU Student Portal',        description:'Official GTU student portal for enrollment, exam forms, fee payment and academic info.', url:'https://student.gtu.ac.in/Login.aspx',                              keywords:['student portal','enrollment','login','gtu portal','student login','my account'] },
  { category:'papers',     title:'GTU Old Question Papers',   description:'Download previous year GTU question papers branch-wise and semester-wise.',           url:'https://gtu.ac.in/OldQuestionPapers/OldQuestionPapers.aspx',        keywords:['question papers','old papers','previous papers','past papers','gtu papers','paper download'] },
  { category:'syllabus',   title:'GTU Syllabus 2026-27',      description:'Official GTU syllabus for all branches and semesters. Includes scheme and credits.',   url:'https://gtu.ac.in/syllabus/syllabus.aspx',                          keywords:['syllabus','curriculum','course','subject list','scheme','study material','gtu syllabus'] },
  { category:'timetable',  title:'GTU Exam Timetable',        description:'Official GTU exam schedule. Check exam dates and timings for current semester.',       url:'https://gtu.ac.in/timetable/timetable.aspx',                        keywords:['timetable','exam schedule','exam date','exam time','date sheet','when exam'] },
  { category:'hall_ticket',title:'GTU Hall Ticket / Admit Card', description:'Download GTU exam hall ticket before your examination from student portal.',       url:'https://student.gtu.ac.in/Login.aspx',                              keywords:['hall ticket','admit card','exam card','permission slip'] },
  { category:'exam',       title:'GTU Exam Scheme 70+30',     description:'GTU uses 70 marks External (University Exam) + 30 marks Internal. Min 40% to pass each component. Attendance min 75% required.', url:'https://gtu.ac.in', keywords:['exam','70 30','100 marks','internal','external','passing','minimum marks','gtu exam','attendance'] },
  { category:'revaluation',title:'GTU Revaluation / Rechecking', description:'Apply for revaluation, rechecking, or photocopy of answer sheet after result.',  url:'https://student.gtu.ac.in/Login.aspx',                              keywords:['revaluation','rechecking','recounting','photocopy','answer sheet'] },
  { category:'college',    title:'GEC Bhavnagar Official Website', description:'Official website of Government Engineering College, Bhavnagar.',               url:'https://www.gecbhavnagar.ac.in',                                    keywords:['college website','official website','gec website','gecbhavnagar'] },
  { category:'scholarship',title:'MYSY Scholarship 2026-27',  description:'MYSY for General category students with family income below 6 LPA. SC/ST/OBC via Digital Gujarat. Apply online.', url:'https://mysy.guj.nic.in/', keywords:['scholarship','mysy','financial aid','fees waiver','digital gujarat','sc','st','obc','general'] },
  { category:'scholarship',title:'National Scholarship Portal', description:'Central government scholarships for SC/ST/OBC students. Apply at NSP portal.',   url:'https://scholarships.gov.in/',                                      keywords:['nsp','national scholarship','post matric','sc st scholarship','central scholarship'] },
  { category:'nptel',      title:'NPTEL Online Courses (Free)', description:'Free certified online courses from IITs and IISc. Earn valuable certificates.',   url:'https://nptel.ac.in',                                               keywords:['nptel','online course','certificate','swayam','free course','iit course'] },
];

// ────────────────────────────────────────────────────────
//  NOTICES  ★ 2026-27 ★
// ────────────────────────────────────────────────────────
const noticesData = [
  { title:'End Semester Exam Form – Nov/Dec 2026',    description:'Students must fill exam forms via GTU Student Portal before the deadline. Exam fee payment mandatory. Defaulters will not get hall ticket.',              category:'Exam',      branch:'All',           isImportant:true,  link:'https://student.gtu.ac.in/Login.aspx' },
  { title:'Campus Placement Drive – TCS & Infosys 2026', description:'TCS and Infosys are conducting campus drives for BE students. Eligible: CE, IT, ICT, EC with CGPA 6.5+. Register at T&P cell.',                  category:'Placement', branch:'CE,IT,ICT,EC', isImportant:true  },
  { title:'Diwali Vacation 2026 – 17 to 24 Oct',    description:'College will remain closed for Diwali as per GTU academic calendar. Students are advised to plan accordingly.',                                          category:'Holiday',   branch:'All',           isImportant:false },
  { title:'NPTEL Online Courses – Oct 2026 Enrollment', description:'Students can enroll in NPTEL courses for free certifications. Swayam portal enrollment open for Oct-Dec 2026 semester.',                            category:'Academic',  branch:'All',           isImportant:false, link:'https://nptel.ac.in' },
  { title:'GTU Convocation 2026',                   description:'GTU Convocation ceremony for 2025-26 passing out batch. Details will be shared by college admin.',                                                       category:'Academic',  branch:'All',           isImportant:false },
  { title:'Annual Technical Fest – IGNITRON 2026',  description:'GEC Bhavnagar annual technical and cultural fest. Events: paper presentation, hackathon, coding contest, robotics. Registration open.',                   category:'Cultural',  branch:'All',           isImportant:false },
  { title:'MYSY Scholarship Renewal 2026-27',       description:'Students already receiving MYSY scholarship must renew before 31 Oct 2026. Visit mysy.guj.nic.in for renewal process.',                                  category:'Academic',  branch:'All',           isImportant:true,  link:'https://mysy.guj.nic.in' },
];

module.exports = { branchesData, placementData, holidayData, gtuInfoData, noticesData };
