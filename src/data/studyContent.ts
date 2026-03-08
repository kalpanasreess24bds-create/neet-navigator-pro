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
          { id: "b11-7", name: "Structural Organisation in Animals", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-8", name: "Cell: The Unit of Life", videoId: "URUJD5NEXC8", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-9", name: "Biomolecules", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-10", name: "Cell Cycle and Cell Division", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-11", name: "Photosynthesis in Higher Plants", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-12", name: "Respiration in Plants", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b11-13", name: "Plant Growth and Development", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-14", name: "Breathing and Exchange of Gases", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-15", name: "Body Fluids and Circulation", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-16", name: "Excretory Products and their Elimination", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b11-17", name: "Locomotion and Movement", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-18", name: "Neural Control and Coordination", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-19", name: "Chemical Coordination and Integration", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-20", name: "Digestion and Absorption", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-21", name: "Transport in Plants", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b11-22", name: "Mineral Nutrition", hasPdf: true, hasFlashcards: true, progress: 0 },
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
          { id: "c11-6", name: "Equilibrium", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-7", name: "Redox Reactions", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c11-8", name: "Organic Chemistry: Some Basic Principles", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-9", name: "Hydrocarbons", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-10", name: "States of Matter", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-11", name: "Hydrogen", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c11-12", name: "The s-Block Elements", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-13", name: "The p-Block Elements", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-14", name: "Environmental Chemistry", hasPdf: true, hasFlashcards: false, progress: 0 },
        ],
      },
      {
        id: "phy-11",
        name: "Physics",
        icon: "⚛️",
        color: "hsl(38 92% 55%)",
        chapters: [
          { id: "p11-1", name: "Physical World", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-2", name: "Units and Measurements", videoId: "bin4OCO-LSc", hasPdf: true, hasFlashcards: true, progress: 90 },
          { id: "p11-3", name: "Motion in a Straight Line", videoId: "ia9dkboJ69w", hasPdf: true, hasFlashcards: true, progress: 65 },
          { id: "p11-4", name: "Motion in a Plane", videoId: "L6F5RYlzOmA", hasPdf: true, hasFlashcards: false, progress: 40 },
          { id: "p11-5", name: "Laws of Motion", videoId: "0JZwiF1e0Kc", hasPdf: true, hasFlashcards: true, progress: 15 },
          { id: "p11-6", name: "Work, Energy and Power", videoId: "ke_kmMUoGnw", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-7", name: "System of Particles and Rotational Motion", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-8", name: "Gravitation", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-9", name: "Mechanical Properties of Solids", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p11-10", name: "Mechanical Properties of Fluids", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-11", name: "Thermal Properties of Matter", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-12", name: "Thermodynamics", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-13", name: "Kinetic Theory", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p11-14", name: "Oscillations", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-15", name: "Waves", hasPdf: true, hasFlashcards: true, progress: 0 },
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
          { id: "b12-2", name: "Sexual Reproduction in Flowering Plants", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-3", name: "Human Reproduction", videoId: "uPkbucnXafE", hasPdf: true, hasFlashcards: true, progress: 30 },
          { id: "b12-4", name: "Reproductive Health", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-5", name: "Principles of Inheritance and Variation", videoId: "y_VhUbbwE3s", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-6", name: "Molecular Basis of Inheritance", videoId: "0S5jWfsPTQE", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b12-7", name: "Evolution", videoId: "GhHOjC4oxh8", hasPdf: true, hasFlashcards: true, progress: 20 },
          { id: "b12-8", name: "Human Health and Disease", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-9", name: "Strategies for Enhancement in Food Production", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b12-10", name: "Microbes in Human Welfare", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-11", name: "Biotechnology: Principles and Processes", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-12", name: "Biotechnology and its Applications", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-13", name: "Organisms and Populations", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b12-14", name: "Ecosystem", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-15", name: "Biodiversity and Conservation", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-16", name: "Environmental Issues", hasPdf: true, hasFlashcards: true, progress: 0 },
        ],
      },
      {
        id: "chem-12",
        name: "Chemistry",
        icon: "⚗️",
        color: "hsl(243 75% 55%)",
        chapters: [
          { id: "c12-1", name: "The Solid State", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-2", name: "Solutions", videoId: "9_al8Z4MbrY", hasPdf: true, hasFlashcards: true, progress: 40 },
          { id: "c12-3", name: "Electrochemistry", videoId: "XzPkOvCLV2A", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-4", name: "Chemical Kinetics", videoId: "yMPNzINbwXg", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c12-5", name: "Surface Chemistry", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-6", name: "General Principles of Isolation of Elements", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c12-7", name: "The p-Block Elements", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-8", name: "The d- and f-Block Elements", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-9", name: "Coordination Compounds", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-10", name: "Haloalkanes and Haloarenes", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-11", name: "Alcohols, Phenols and Ethers", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c12-12", name: "Aldehydes, Ketones and Carboxylic Acids", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-13", name: "Amines", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-14", name: "Biomolecules", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-15", name: "Polymers", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c12-16", name: "Chemistry in Everyday Life", hasPdf: true, hasFlashcards: true, progress: 0 },
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
          { id: "p12-4", name: "Moving Charges and Magnetism", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-5", name: "Magnetism and Matter", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p12-6", name: "Electromagnetic Induction", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-7", name: "Alternating Current", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-8", name: "Electromagnetic Waves", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-9", name: "Ray Optics and Optical Instruments", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-10", name: "Wave Optics", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p12-11", name: "Dual Nature of Radiation and Matter", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-12", name: "Atoms", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-13", name: "Nuclei", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-14", name: "Semiconductor Electronics", hasPdf: true, hasFlashcards: true, progress: 0 },
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
