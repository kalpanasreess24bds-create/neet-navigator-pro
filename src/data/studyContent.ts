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
          { id: "b11-7", name: "Structural Organisation in Animals", videoId: "0qtXzH_I1aA", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-8", name: "Cell: The Unit of Life", videoId: "URUJD5NEXC8", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-9", name: "Biomolecules", videoId: "6zRdl0z9f7M", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-10", name: "Cell Cycle and Cell Division", videoId: "MAu9CwD0_lQ", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-11", name: "Photosynthesis in Higher Plants", videoId: "d6pfq-0CwZc", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-12", name: "Respiration in Plants", videoId: "0fhit1LcdnQ", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b11-13", name: "Plant Growth and Development", videoId: "5p20tDE1eJc", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-14", name: "Breathing and Exchange of Gases", videoId: "BO8hf4-fEek", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-15", name: "Body Fluids and Circulation", videoId: "Y6BuLZ5-FDs", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-16", name: "Excretory Products and their Elimination", videoId: "FfJiaMXlRmE", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b11-17", name: "Locomotion and Movement", videoId: "7DrleEIib1c", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-18", name: "Neural Control and Coordination", videoId: "odaz7IVZV8c", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-19", name: "Chemical Coordination and Integration", videoId: "Q1YTz362D7M", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-20", name: "Digestion and Absorption", videoId: "lhI_s8RDSZA", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-21", name: "Transport in Plants", videoId: "lubIQD-KQz0", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b11-22", name: "Mineral Nutrition", videoId: "g4_7y9R0bKM", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-23", name: "Taxonomy & Systematics", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-24", name: "Viruses, Viroids & Lichens", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-25", name: "Five Kingdom Classification – Details", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b11-26", name: "Morphology of Root, Stem & Leaf", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-27", name: "Secondary Growth in Plants", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-28", name: "Cockroach Anatomy (Periplaneta)", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-29", name: "Frog Anatomy (Rana tigrina)", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-30", name: "Enzymes & Enzyme Action", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-31", name: "Krebs Cycle & ETS – Detailed", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-32", name: "C3 and C4 Pathways", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b11-33", name: "Plant Hormones – Auxin, Gibberellin, Cytokinin", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-34", name: "Cardiac Cycle & ECG", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-35", name: "Nephron Structure & Urine Formation", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-36", name: "Skeletal System & Joints", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b11-37", name: "Synapse & Reflex Arc", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b11-38", name: "Endocrine Glands & Hormones – Detailed", hasPdf: true, hasFlashcards: true, progress: 0 },
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
          { id: "c11-8", name: "Organic Chemistry: Some Basic Principles", videoId: "soIba7r34ZM", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-9", name: "Hydrocarbons", videoId: "lgPk7t0N2Rw", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-10", name: "States of Matter", videoId: "ZxmeptdtNsU", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-11", name: "Hydrogen", videoId: "RTFrv_Cz_no", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c11-12", name: "The s-Block Elements", videoId: "-TL7qJoMQWk", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-13", name: "The p-Block Elements", videoId: "OOkAfv6U1rw", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-14", name: "Environmental Chemistry", videoId: "xOaYbVC_i4c", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c11-15", name: "Mole Concept & Stoichiometry", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-16", name: "Bohr's Model & Quantum Numbers", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-17", name: "VSEPR Theory & Molecular Geometry", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-18", name: "Ionic & Covalent Bonding – Detailed", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c11-19", name: "Hess's Law & Enthalpy Changes", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-20", name: "Le Chatelier's Principle", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-21", name: "Acids, Bases & Buffer Solutions", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-22", name: "IUPAC Nomenclature of Organic Compounds", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-23", name: "Isomerism in Organic Chemistry", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-24", name: "Gas Laws & Ideal Gas Equation", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c11-25", name: "Alkali & Alkaline Earth Metals – Reactions", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c11-26", name: "Boron & Carbon Family", hasPdf: true, hasFlashcards: true, progress: 0 },
        ],
      },
      {
        id: "phy-11",
        name: "Physics",
        icon: "⚛️",
        color: "hsl(38 92% 55%)",
        chapters: [
          { id: "p11-1", name: "Physical World", videoId: "2PW7N3wp9HQ", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-2", name: "Units and Measurements", videoId: "bin4OCO-LSc", hasPdf: true, hasFlashcards: true, progress: 90 },
          { id: "p11-3", name: "Motion in a Straight Line", videoId: "ia9dkboJ69w", hasPdf: true, hasFlashcards: true, progress: 65 },
          { id: "p11-4", name: "Motion in a Plane", videoId: "L6F5RYlzOmA", hasPdf: true, hasFlashcards: false, progress: 40 },
          { id: "p11-5", name: "Laws of Motion", videoId: "0JZwiF1e0Kc", hasPdf: true, hasFlashcards: true, progress: 15 },
          { id: "p11-6", name: "Work, Energy and Power", videoId: "ke_kmMUoGnw", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-7", name: "System of Particles and Rotational Motion", videoId: "VqVZA0IE4uQ", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-8", name: "Gravitation", videoId: "eHIFpPdGuY0", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-9", name: "Mechanical Properties of Solids", videoId: "a2T84FeLIdY", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p11-10", name: "Mechanical Properties of Fluids", videoId: "Ele4sqz0cUI", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-11", name: "Thermal Properties of Matter", videoId: "7GMpJNCRxac", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-12", name: "Thermodynamics", videoId: "lAKcpCFGK8", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-13", name: "Kinetic Theory", videoId: "FJ8ST6ac6Mg", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p11-14", name: "Oscillations", videoId: "bv8qBsHK9bM", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-15", name: "Waves", videoId: "p3vMfyGjfcM", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-16", name: "Dimensional Analysis & Errors", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-17", name: "Projectile Motion", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-18", name: "Circular Motion", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-19", name: "Friction – Static & Kinetic", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p11-20", name: "Collision & Centre of Mass", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-21", name: "Moment of Inertia & Angular Momentum", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-22", name: "Kepler's Laws & Satellites", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-23", name: "Bernoulli's Theorem & Viscosity", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-24", name: "Surface Tension & Capillarity", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p11-25", name: "Calorimetry & Heat Transfer", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-26", name: "SHM – Detailed Problems", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p11-27", name: "Doppler Effect & Sound Waves", hasPdf: true, hasFlashcards: true, progress: 0 },
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
          { id: "b12-2", name: "Sexual Reproduction in Flowering Plants", videoId: "4PZWFTUzzyo", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-3", name: "Human Reproduction", videoId: "uPkbucnXafE", hasPdf: true, hasFlashcards: true, progress: 30 },
          { id: "b12-4", name: "Reproductive Health", videoId: "9bS_mLdYZKI", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-5", name: "Principles of Inheritance and Variation", videoId: "y_VhUbbwE3s", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-6", name: "Molecular Basis of Inheritance", videoId: "0S5jWfsPTQE", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b12-7", name: "Evolution", videoId: "GhHOjC4oxh8", hasPdf: true, hasFlashcards: true, progress: 20 },
          { id: "b12-8", name: "Human Health and Disease", videoId: "WLQXNKWXEgU", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-9", name: "Strategies for Enhancement in Food Production", videoId: "zCKcAQ3DliE", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b12-10", name: "Microbes in Human Welfare", videoId: "5E6qpQYyXdM", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-11", name: "Biotechnology: Principles and Processes", videoId: "ePiPYMeakW0", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-12", name: "Biotechnology and its Applications", videoId: "ZpmFPKzPSFo", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-13", name: "Organisms and Populations", videoId: "7BV9pcUaWQE", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "b12-14", name: "Ecosystem", videoId: "8IdXyQ-gDg0", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-15", name: "Biodiversity and Conservation", videoId: "lJlcRbxiVZs", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "b12-16", name: "Environmental Issues", videoId: "d46krlK-pdU", hasPdf: true, hasFlashcards: true, progress: 0 },
        ],
      },
      {
        id: "chem-12",
        name: "Chemistry",
        icon: "⚗️",
        color: "hsl(243 75% 55%)",
        chapters: [
          { id: "c12-1", name: "The Solid State", videoId: "hU4Sm0X8PWM", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-2", name: "Solutions", videoId: "9_al8Z4MbrY", hasPdf: true, hasFlashcards: true, progress: 40 },
          { id: "c12-3", name: "Electrochemistry", videoId: "XzPkOvCLV2A", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-4", name: "Chemical Kinetics", videoId: "yMPNzINbwXg", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c12-5", name: "Surface Chemistry", videoId: "51HhRwk8afs", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-6", name: "General Principles of Isolation of Elements", videoId: "OLRlIZx0AoI", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c12-7", name: "The p-Block Elements", videoId: "T6uHgDnbkz4", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-8", name: "The d- and f-Block Elements", videoId: "fv0gRU99c04", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-9", name: "Coordination Compounds", videoId: "5nNW7kJ_yzE", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-10", name: "Haloalkanes and Haloarenes", videoId: "AzgGMnxpXyY", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-11", name: "Alcohols, Phenols and Ethers", videoId: "-4b4FIvz3ow", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c12-12", name: "Aldehydes, Ketones and Carboxylic Acids", videoId: "jHtw-XYfonM", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-13", name: "Amines", videoId: "eBQ8J37A1Dw", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-14", name: "Biomolecules", videoId: "uq96pSICjs4", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "c12-15", name: "Polymers", videoId: "23TlWtysOJU", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "c12-16", name: "Chemistry in Everyday Life", videoId: "lxd3R56OZ-Q", hasPdf: true, hasFlashcards: true, progress: 0 },
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
          { id: "p12-4", name: "Moving Charges and Magnetism", videoId: "6TTzWduw0xM", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-5", name: "Magnetism and Matter", videoId: "3vCY2xemf4g", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p12-6", name: "Electromagnetic Induction", videoId: "Md4Pl5ecjZ0", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-7", name: "Alternating Current", videoId: "t_2V7-gN6Fw", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-8", name: "Electromagnetic Waves", videoId: "oaePOiv_eRw", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-9", name: "Ray Optics and Optical Instruments", videoId: "3PnRY8ZX0Hs", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-10", name: "Wave Optics", videoId: "tbPAouRJPQY", hasPdf: true, hasFlashcards: false, progress: 0 },
          { id: "p12-11", name: "Dual Nature of Radiation and Matter", videoId: "xFngXIFXZsQ", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-12", name: "Atoms", videoId: "vHhusqL17M4", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-13", name: "Nuclei", videoId: "FpNFGEdo420", hasPdf: true, hasFlashcards: true, progress: 0 },
          { id: "p12-14", name: "Semiconductor Electronics", videoId: "E9FQA5lK8T0", hasPdf: true, hasFlashcards: true, progress: 0 },
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
