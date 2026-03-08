export interface Chapter {
  id: string;
  name: string;
  videoId?: string;
  hasPdf: boolean;
  hasFlashcards: boolean;
  progress: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export interface ClassData {
  id: string;
  name: string;
  subjects: Subject[];
}

export const studyData: ClassData[] = [
  {
    id: "11",
    name: "Class 11",
    subjects: [
      {
        id: "bio-11",
        name: "Biology",
        icon: "🧬",
        color: "hsl(152 60% 45%)",
        chapters: [
          { id: "b11-1", name: "The Living World", videoId: "XxGA5oDakfE", hasPdf: true, hasFlashcards: true, progress: 80 },
          { id: "b11-2", name: "Biological Classification", videoId: "Lsrc3RsmRR4", hasPdf: true, hasFlashcards: true, progress: 60 },
          { id: "b11-3", name: "Plant Kingdom", videoId: "dK3cSQ-bUOk", hasPdf: true, hasFlashcards: false, progress: 30 },
          { id: "b11-4", name: "Animal Kingdom", videoId: "oZ2K8s-EDWI", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-5", name: "Morphology of Flowering Plants", videoId: "uJGNw9q7Y0k", hasPdf: true, hasFlashcards: true, progress: 45 },
          { id: "b11-6", name: "Anatomy of Flowering Plants", videoId: "2AxfI2MOg1Y", hasPdf: true, hasFlashcards: false, progress: 10 },
          { id: "b11-7", name: "Structural Organisation in Animals", videoId: "LphbT_gA0wk", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-8", name: "Cell: The Unit of Life", videoId: "URUJD5NEXC8", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-9", name: "Biomolecules", videoId: "Fm8WvUZ2tG4", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-10", name: "Cell Cycle and Cell Division", videoId: "I_JKOW4q0kE", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-11", name: "Photosynthesis in Higher Plants", videoId: "XSMjfvpDtTY", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-12", name: "Respiration in Plants", videoId: "jx5EPssOa-4", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b11-13", name: "Plant Growth and Development", videoId: "qotkBuFDweg", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-14", name: "Breathing and Exchange of Gases", videoId: "AecVsC20bWo", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-15", name: "Body Fluids and Circulation", videoId: "acZpClySY8M", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-16", name: "Excretory Products and their Elimination", videoId: "5ZujlW79F38", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b11-17", name: "Locomotion and Movement", videoId: "IRfNiBjTPIE", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-18", name: "Neural Control and Coordination", videoId: "lww4zSsXjmI", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-19", name: "Chemical Coordination and Integration", videoId: "62uwD8bSWgw", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-20", name: "Digestion and Absorption", videoId: "9Wx-P5LMlUA", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-21", name: "Transport in Plants", videoId: "Amu0xgVZqSk", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b11-22", name: "Mineral Nutrition", videoId: "XdetX5l5jlk", hasPdf: true, hasFlashcards: true, progress: 0 },
        ],
      },
      {
        id: "chem-11",
        name: "Chemistry",
        icon: "⚗️",
        color: "hsl(243 75% 55%)",
        chapters: [
          { id: "c11-1", name: "Some Basic Concepts of Chemistry", videoId: "bn9EPxmsveI", hasPdf: true, hasFlashcards: true, progress: 70 },
          { id: "c11-2", name: "Structure of Atom", videoId: "rf6p4q5chdE", hasPdf: true, hasFlashcards: true, progress: 50 },
          { id: "c11-3", name: "Classification of Elements and Periodicity", videoId: "TL0Y5bvMGOY", hasPdf: true, hasFlashcards: false, progress: 20 },
          { id: "c11-4", name: "Chemical Bonding and Molecular Structure", videoId: "xMa1BQ8z5Jo", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-5", name: "Thermodynamics", videoId: "brP0DPGCl70", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-6", name: "Equilibrium", videoId: "MCzpku3FFGY", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-7", name: "Redox Reactions", videoId: "nhITtEaaCtA", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c11-8", name: "Organic Chemistry: Some Basic Principles", videoId: "XPsRxCRT5NU", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-9", name: "Hydrocarbons", videoId: "OLRlIZx0AoI", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-10", name: "States of Matter", videoId: "4gzDl9FUdY0", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-11", name: "Hydrogen", videoId: "z8ICFcxaSy4", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c11-12", name: "The s-Block Elements", videoId: "PpuPUMfr91Y", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-13", name: "The p-Block Elements", videoId: "jkvPgY1GPIU", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-14", name: "Environmental Chemistry", videoId: "E14pC77u0oQ", hasPdf: true, hasFlashcards: false, progress: 0 },
        ],
      },
      {
        id: "phy-11",
        name: "Physics",
        icon: "⚛️",
        color: "hsl(38 92% 55%)",
        chapters: [
          { id: "p11-1", name: "Physical World", videoId: "lst2Np8MHsQ", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-2", name: "Units and Measurements", videoId: "bin4OCO-LSc", hasPdf: true, hasFlashcards: true, progress: 90 },
          { id: "p11-3", name: "Motion in a Straight Line", videoId: "ia9dkboJ69w", hasPdf: true, hasFlashcards: true, progress: 65 },
          { id: "p11-4", name: "Motion in a Plane", videoId: "L6F5RYlzOmA", hasPdf: true, hasFlashcards: false, progress: 40 },
          { id: "p11-5", name: "Laws of Motion", videoId: "0JZwiF1e0Kc", hasPdf: true, hasFlashcards: true, progress: 15 },
          { id: "p11-6", name: "Work, Energy and Power", videoId: "ke_kmMUoGnw", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-7", name: "System of Particles and Rotational Motion", videoId: "VqVZA0IE4uQ", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-8", name: "Gravitation", videoId: "bd8LoU8QLkI", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-9", name: "Mechanical Properties of Solids", videoId: "a2T84FeLIdY", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p11-10", name: "Mechanical Properties of Fluids", videoId: "Ele4sqz0cUI", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-11", name: "Thermal Properties of Matter", videoId: "vsozTe2eu6Y", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-12", name: "Thermodynamics", videoId: "7HvVinACmVU", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-13", name: "Kinetic Theory", videoId: "qDZik-DcQJA", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p11-14", name: "Oscillations", videoId: "8FmM-xbyKto", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-15", name: "Waves", videoId: "XiXRhdQBMF8", hasPdf: true, hasFlashcards: true, progress: 0 },
        ],
      },
    ],
  },
  {
    id: "12",
    name: "Class 12",
    subjects: [
      {
        id: "bio-12",
        name: "Biology",
        icon: "🧬",
        color: "hsl(152 60% 45%)",
        chapters: [
          { id: "b12-1", name: "Reproduction in Organisms", videoId: "X3TAROotFfI", hasPdf: true, hasFlashcards: true, progress: 55 },
          { id: "b12-2", name: "Sexual Reproduction in Flowering Plants", videoId: "KC6-_8jajc4", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-3", name: "Human Reproduction", videoId: "uPkbucnXafE", hasPdf: true, hasFlashcards: true, progress: 30 },
          { id: "b12-4", name: "Reproductive Health", videoId: "idwKgk_-gBM", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-5", name: "Principles of Inheritance and Variation", videoId: "y_VhUbbwE3s", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-6", name: "Molecular Basis of Inheritance", videoId: "0S5jWfsPTQE", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b12-7", name: "Evolution", videoId: "GhHOjC4oxh8", hasPdf: true, hasFlashcards: true, progress: 20 },
          { id: "b12-8", name: "Human Health and Disease", videoId: "OhslGoa4jfA", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-9", name: "Strategies for Enhancement in Food Production", videoId: "WJtXVv1l0tY", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b12-10", name: "Microbes in Human Welfare", videoId: "1qSTLasnoNc", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-11", name: "Biotechnology: Principles and Processes", videoId: "Amu0xgVZqSk", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-12", name: "Biotechnology and its Applications", videoId: "XdetX5l5jlk", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-13", name: "Organisms and Populations", videoId: "AecVsC20bWo", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b12-14", name: "Ecosystem", videoId: "acZpClySY8M", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-15", name: "Biodiversity and Conservation", videoId: "qotkBuFDweg", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-16", name: "Environmental Issues", videoId: "jx5EPssOa-4", hasPdf: true, hasFlashcards: true, progress: 0 },
        ],
      },
      {
        id: "chem-12",
        name: "Chemistry",
        icon: "⚗️",
        color: "hsl(243 75% 55%)",
        chapters: [
          { id: "c12-1", name: "The Solid State", videoId: "4gzDl9FUdY0", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-2", name: "Solutions", videoId: "9_al8Z4MbrY", hasPdf: true, hasFlashcards: true, progress: 40 },
          { id: "c12-3", name: "Electrochemistry", videoId: "XzPkOvCLV2A", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-4", name: "Chemical Kinetics", videoId: "yMPNzINbwXg", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c12-5", name: "Surface Chemistry", videoId: "z8ICFcxaSy4", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-6", name: "General Principles of Isolation of Elements", videoId: "AQagzcRoDkM", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c12-7", name: "The p-Block Elements", videoId: "PpuPUMfr91Y", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-8", name: "The d- and f-Block Elements", videoId: "_oxFIEr4PZ8", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-9", name: "Coordination Compounds", videoId: "jkvPgY1GPIU", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-10", name: "Haloalkanes and Haloarenes", videoId: "-4b4FIvz3ow", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-11", name: "Alcohols, Phenols and Ethers", videoId: "E14pC77u0oQ", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c12-12", name: "Aldehydes, Ketones and Carboxylic Acids", videoId: "OLRlIZx0AoI", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-13", name: "Amines", videoId: "MCzpku3FFGY", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-14", name: "Biomolecules", videoId: "nhITtEaaCtA", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-15", name: "Polymers", videoId: "XPsRxCRT5NU", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c12-16", name: "Chemistry in Everyday Life", videoId: "LphbT_gA0wk", hasPdf: true, hasFlashcards: true, progress: 0 },
        ],
      },
      {
        id: "phy-12",
        name: "Physics",
        icon: "⚛️",
        color: "hsl(38 92% 55%)",
        chapters: [
          { id: "p12-1", name: "Electric Charges and Fields", videoId: "VFbyDCG_j18", hasPdf: true, hasFlashcards: true, progress: 75 },
          { id: "p12-2", name: "Electrostatic Potential and Capacitance", videoId: "ObHE27Mg10U", hasPdf: true, hasFlashcards: true, progress: 50 },
          { id: "p12-3", name: "Current Electricity", videoId: "5DqfaYA8_Sc", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-4", name: "Moving Charges and Magnetism", videoId: "8FmM-xbyKto", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-5", name: "Magnetism and Matter", videoId: "7HvVinACmVU", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p12-6", name: "Electromagnetic Induction", videoId: "XiXRhdQBMF8", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-7", name: "Alternating Current", videoId: "qDZik-DcQJA", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-8", name: "Electromagnetic Waves", videoId: "1qSTLasnoNc", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-9", name: "Ray Optics and Optical Instruments", videoId: "VqVZA0IE4uQ", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-10", name: "Wave Optics", videoId: "bd8LoU8QLkI", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p12-11", name: "Dual Nature of Radiation and Matter", videoId: "a2T84FeLIdY", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-12", name: "Atoms", videoId: "Ele4sqz0cUI", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-13", name: "Nuclei", videoId: "vsozTe2eu6Y", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-14", name: "Semiconductor Electronics", videoId: "lst2Np8MHsQ", hasPdf: true, hasFlashcards: true, progress: 0 },
        ],
      },
    ],
  },
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  chapter: string;
  explanation: string;
}

export const sampleQuiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which of the following is NOT a characteristic of living organisms?",
    options: ["Growth", "Reproduction", "Decay", "Metabolism"],
    correctAnswer: 2,
    subject: "Biology",
    chapter: "The Living World",
    explanation: "Decay is not a defining characteristic of living organisms. Growth, reproduction, and metabolism are key features of life.",
  },
  {
    id: "q2",
    question: "The SI unit of force is:",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correctAnswer: 1,
    subject: "Physics",
    chapter: "Units and Measurements",
    explanation: "Newton (N) is the SI unit of force. 1 N = 1 kg⋅m/s².",
  },
  {
    id: "q3",
    question: "Which element has the highest electronegativity?",
    options: ["Oxygen", "Nitrogen", "Fluorine", "Chlorine"],
    correctAnswer: 2,
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    explanation: "Fluorine has the highest electronegativity (3.98 on the Pauling scale) among all elements.",
  },
  {
    id: "q4",
    question: "The number of ATP molecules produced during aerobic respiration of one glucose molecule is:",
    options: ["32", "36", "38", "40"],
    correctAnswer: 1,
    subject: "Biology",
    chapter: "Cell: The Unit of Life",
    explanation: "Aerobic respiration of one glucose molecule yields approximately 36 ATP molecules (some sources say 36-38).",
  },
  {
    id: "q5",
    question: "A body of mass 5 kg is moving with a velocity of 10 m/s. The kinetic energy is:",
    options: ["250 J", "500 J", "100 J", "50 J"],
    correctAnswer: 0,
    subject: "Physics",
    chapter: "Work, Energy and Power",
    explanation: "KE = ½mv² = ½ × 5 × 10² = 250 J",
  },
  {
    id: "q6",
    question: "The hybridization of carbon in methane (CH₄) is:",
    options: ["sp", "sp²", "sp³", "sp³d"],
    correctAnswer: 2,
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    explanation: "Carbon in methane undergoes sp³ hybridization, forming four equivalent C-H bonds at 109.5° angles.",
  },
  {
    id: "q7",
    question: "Which organelle is known as the 'powerhouse of the cell'?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"],
    correctAnswer: 2,
    subject: "Biology",
    chapter: "Cell: The Unit of Life",
    explanation: "Mitochondria are called the powerhouse of the cell because they generate most of the cell's ATP through oxidative phosphorylation.",
  },
  {
    id: "q8",
    question: "The dimensional formula of Planck's constant is:",
    options: ["[ML²T⁻¹]", "[MLT⁻²]", "[ML²T⁻²]", "[ML²T⁻³]"],
    correctAnswer: 0,
    subject: "Physics",
    chapter: "Units and Measurements",
    explanation: "Planck's constant h has dimensions of energy × time = [ML²T⁻²] × [T] = [ML²T⁻¹].",
  },
  {
    id: "q9",
    question: "pH of a neutral solution at 25°C is:",
    options: ["0", "1", "7", "14"],
    correctAnswer: 2,
    subject: "Chemistry",
    chapter: "Some Basic Concepts of Chemistry",
    explanation: "At 25°C, a neutral solution has pH = 7, where [H⁺] = [OH⁻] = 10⁻⁷ M.",
  },
  {
    id: "q10",
    question: "Which of the following is a correct match?",
    options: [
      "Ascaris - Platyhelminthes",
      "Wuchereria - Aschelminthes",
      "Ancylostoma - Annelida",
      "Nereis - Arthropoda"
    ],
    correctAnswer: 1,
    subject: "Biology",
    chapter: "Animal Kingdom",
    explanation: "Wuchereria (filarial worm) belongs to phylum Aschelminthes (Nematoda). Ascaris also belongs to Aschelminthes, not Platyhelminthes.",
  },
];
