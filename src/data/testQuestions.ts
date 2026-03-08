import { TestQuestion } from "@/types/testDashboard";

// Comprehensive NEET question bank organized by subject and chapter
const questionBank: TestQuestion[] = [
  // ===== BOTANY =====
  // The Living World
  { id: "bot-1", question: "Taxonomy is the study of:", options: ["Classification of organisms", "History of organisms", "Structure of organisms", "Function of organisms"], correctAnswer: 0, subject: "Botany", chapter: "The Living World", explanation: "Taxonomy deals with identification, nomenclature and classification of organisms.", difficulty: "easy" },
  { id: "bot-2", question: "Binomial nomenclature was introduced by:", options: ["Aristotle", "Linnaeus", "Theophrastus", "Darwin"], correctAnswer: 1, subject: "Botany", chapter: "The Living World", explanation: "Carl Linnaeus introduced the system of binomial nomenclature for naming species.", difficulty: "easy" },
  { id: "bot-3", question: "Which is the basic unit of classification?", options: ["Genus", "Species", "Family", "Order"], correctAnswer: 1, subject: "Botany", chapter: "The Living World", explanation: "Species is the basic unit of classification and is defined as a group of organisms that can interbreed.", difficulty: "easy" },
  { id: "bot-4", question: "ICBN stands for:", options: ["International Code of Botanical Nomenclature", "International Congress of Biological Names", "Indian Code of Botanical Nomenclature", "International Council of Biological Nomenclature"], correctAnswer: 0, subject: "Botany", chapter: "The Living World", explanation: "ICBN is the International Code of Botanical Nomenclature used for naming plants.", difficulty: "medium" },
  { id: "bot-5", question: "Which of the following is a defining property of living organisms?", options: ["Growth", "Reproduction", "Cellular organization", "All of these"], correctAnswer: 3, subject: "Botany", chapter: "The Living World", explanation: "Growth, reproduction, and cellular organization are all defining properties of living organisms.", difficulty: "easy" },

  // Biological Classification
  { id: "bot-6", question: "Five kingdom classification was proposed by:", options: ["Linnaeus", "Whittaker", "Haeckel", "Copeland"], correctAnswer: 1, subject: "Botany", chapter: "Biological Classification", explanation: "R.H. Whittaker proposed the Five Kingdom classification in 1969.", difficulty: "easy" },
  { id: "bot-7", question: "Which kingdom includes prokaryotic organisms?", options: ["Protista", "Monera", "Fungi", "Plantae"], correctAnswer: 1, subject: "Botany", chapter: "Biological Classification", explanation: "Kingdom Monera includes all prokaryotic organisms like bacteria and cyanobacteria.", difficulty: "easy" },
  { id: "bot-8", question: "Mycoplasma differs from other bacteria in:", options: ["Lack of cell wall", "Presence of DNA", "Presence of ribosomes", "Ability to reproduce"], correctAnswer: 0, subject: "Botany", chapter: "Biological Classification", explanation: "Mycoplasma are the smallest known cells that lack a cell wall.", difficulty: "medium" },
  { id: "bot-9", question: "Lichens are an example of:", options: ["Parasitism", "Mutualism", "Commensalism", "Amensalism"], correctAnswer: 1, subject: "Botany", chapter: "Biological Classification", explanation: "Lichens represent mutualism between algae/cyanobacteria and fungi.", difficulty: "easy" },
  { id: "bot-10", question: "Chrysophytes include:", options: ["Diatoms and golden algae", "Dinoflagellates", "Euglenoids", "Slime moulds"], correctAnswer: 0, subject: "Botany", chapter: "Biological Classification", explanation: "Chrysophytes include diatoms and golden algae (desmids).", difficulty: "medium" },

  // Plant Kingdom
  { id: "bot-11", question: "Alternation of generations is shown by:", options: ["Bacteria", "Virus", "Bryophytes", "Monera"], correctAnswer: 2, subject: "Botany", chapter: "Plant Kingdom", explanation: "Bryophytes show alternation of generations between gametophyte and sporophyte.", difficulty: "easy" },
  { id: "bot-12", question: "Which of the following is a gymnosperm?", options: ["Fern", "Cycas", "Marchantia", "Funaria"], correctAnswer: 1, subject: "Botany", chapter: "Plant Kingdom", explanation: "Cycas is a gymnosperm with naked seeds not enclosed in fruits.", difficulty: "easy" },
  { id: "bot-13", question: "The dominant phase in bryophytes is:", options: ["Sporophyte", "Gametophyte", "Both equal", "Neither"], correctAnswer: 1, subject: "Botany", chapter: "Plant Kingdom", explanation: "In bryophytes, the gametophyte (haploid) is the dominant, independent phase.", difficulty: "medium" },
  { id: "bot-14", question: "Double fertilization is characteristic of:", options: ["Gymnosperms", "Angiosperms", "Pteridophytes", "Bryophytes"], correctAnswer: 1, subject: "Botany", chapter: "Plant Kingdom", explanation: "Double fertilization (syngamy + triple fusion) is unique to angiosperms.", difficulty: "easy" },
  { id: "bot-15", question: "Heterospory is first observed in:", options: ["Bryophytes", "Pteridophytes", "Gymnosperms", "Angiosperms"], correctAnswer: 1, subject: "Botany", chapter: "Plant Kingdom", explanation: "Heterospory (production of two types of spores) first evolved in pteridophytes like Selaginella.", difficulty: "hard" },

  // Morphology of Flowering Plants
  { id: "bot-16", question: "The modification of root for storage is seen in:", options: ["Carrot", "Mango", "Wheat", "Maize"], correctAnswer: 0, subject: "Botany", chapter: "Morphology of Flowering Plants", explanation: "Carrot has a conical taproot modified for food storage.", difficulty: "easy" },
  { id: "bot-17", question: "Pneumatophores are found in:", options: ["Rhizophora", "Cuscuta", "Rose", "Banyan"], correctAnswer: 0, subject: "Botany", chapter: "Morphology of Flowering Plants", explanation: "Pneumatophores (breathing roots) are found in mangrove plants like Rhizophora.", difficulty: "medium" },
  { id: "bot-18", question: "Phyllotaxy refers to:", options: ["Arrangement of flowers", "Arrangement of leaves on stem", "Arrangement of roots", "Type of inflorescence"], correctAnswer: 1, subject: "Botany", chapter: "Morphology of Flowering Plants", explanation: "Phyllotaxy is the pattern of arrangement of leaves on the stem or branch.", difficulty: "easy" },
  { id: "bot-19", question: "Placentation in which ovules develop on the central axis is:", options: ["Marginal", "Axile", "Parietal", "Free central"], correctAnswer: 1, subject: "Botany", chapter: "Morphology of Flowering Plants", explanation: "In axile placentation, ovules are attached to the central axis of a multilocular ovary.", difficulty: "medium" },
  { id: "bot-20", question: "The family Solanaceae is also known as:", options: ["Rose family", "Potato family", "Grass family", "Lily family"], correctAnswer: 1, subject: "Botany", chapter: "Morphology of Flowering Plants", explanation: "Solanaceae is commonly known as the potato family or nightshade family.", difficulty: "easy" },

  // Anatomy of Flowering Plants
  { id: "bot-21", question: "Collenchyma tissue provides:", options: ["Mechanical support with flexibility", "Food storage", "Water conduction", "Gas exchange"], correctAnswer: 0, subject: "Botany", chapter: "Anatomy of Flowering Plants", explanation: "Collenchyma provides mechanical support with flexibility due to pectin and cellulose thickening at corners.", difficulty: "easy" },
  { id: "bot-22", question: "Casparian strips are found in:", options: ["Cortex", "Endodermis", "Pericycle", "Epidermis"], correctAnswer: 1, subject: "Botany", chapter: "Anatomy of Flowering Plants", explanation: "Casparian strips are waxy bands of suberin found in the endodermis of roots.", difficulty: "medium" },
  { id: "bot-23", question: "Vascular bundles in monocot stem are:", options: ["Open", "Closed", "Radial", "Bicollateral"], correctAnswer: 1, subject: "Botany", chapter: "Anatomy of Flowering Plants", explanation: "Monocot stems have closed vascular bundles (no cambium), so secondary growth is absent.", difficulty: "medium" },
  { id: "bot-24", question: "Annual rings are formed due to activity of:", options: ["Apical meristem", "Lateral meristem", "Intercalary meristem", "Cork cambium"], correctAnswer: 1, subject: "Botany", chapter: "Anatomy of Flowering Plants", explanation: "Annual rings form due to differential activity of vascular cambium (lateral meristem) in different seasons.", difficulty: "medium" },
  { id: "bot-25", question: "Companion cells are associated with:", options: ["Tracheids", "Vessels", "Sieve tubes", "Fibres"], correctAnswer: 2, subject: "Botany", chapter: "Anatomy of Flowering Plants", explanation: "Companion cells are specialized parenchyma cells associated with sieve tube elements in phloem.", difficulty: "easy" },

  // Cell Biology
  { id: "bot-26", question: "The cell theory was proposed by:", options: ["Robert Hooke", "Schleiden and Schwann", "Virchow", "Leeuwenhoek"], correctAnswer: 1, subject: "Botany", chapter: "Cell: The Unit of Life", explanation: "Schleiden (1838) and Schwann (1839) together formulated the cell theory.", difficulty: "easy" },
  { id: "bot-27", question: "Rough endoplasmic reticulum has:", options: ["Lysosomes", "Ribosomes", "Golgi bodies", "Peroxisomes"], correctAnswer: 1, subject: "Botany", chapter: "Cell: The Unit of Life", explanation: "RER has ribosomes attached to its surface, giving it a rough appearance.", difficulty: "easy" },
  { id: "bot-28", question: "The 9+2 arrangement of microtubules is found in:", options: ["Centrioles", "Cilia and flagella", "Spindle fibres", "Basal bodies"], correctAnswer: 1, subject: "Botany", chapter: "Cell: The Unit of Life", explanation: "Cilia and flagella have a 9+2 axonemal arrangement of microtubules.", difficulty: "medium" },
  { id: "bot-29", question: "Mitochondria are called powerhouse because they:", options: ["Store energy", "Produce ATP", "Break down food", "Contain DNA"], correctAnswer: 1, subject: "Botany", chapter: "Cell: The Unit of Life", explanation: "Mitochondria produce ATP through oxidative phosphorylation.", difficulty: "easy" },
  { id: "bot-30", question: "Which organelle is involved in formation of lysosomes?", options: ["ER", "Golgi apparatus", "Ribosome", "Nucleus"], correctAnswer: 1, subject: "Botany", chapter: "Cell: The Unit of Life", explanation: "Golgi apparatus packages hydrolytic enzymes into vesicles to form lysosomes.", difficulty: "medium" },

  // Biomolecules
  { id: "bot-31", question: "Which is the most abundant biomolecule on earth?", options: ["Proteins", "Lipids", "Carbohydrates", "Nucleic acids"], correctAnswer: 2, subject: "Botany", chapter: "Biomolecules", explanation: "Carbohydrates (especially cellulose) are the most abundant biomolecules on earth.", difficulty: "easy" },
  { id: "bot-32", question: "Enzymes are chemically:", options: ["Carbohydrates", "Lipids", "Proteins", "Nucleic acids"], correctAnswer: 2, subject: "Botany", chapter: "Biomolecules", explanation: "Almost all enzymes are proteins that act as biological catalysts.", difficulty: "easy" },
  { id: "bot-33", question: "The bond linking two amino acids is:", options: ["Glycosidic bond", "Peptide bond", "Ester bond", "Hydrogen bond"], correctAnswer: 1, subject: "Botany", chapter: "Biomolecules", explanation: "A peptide bond is formed between the carboxyl group of one amino acid and the amino group of another.", difficulty: "easy" },

  // Cell Division
  { id: "bot-34", question: "During which phase of mitosis do chromosomes align at the equator?", options: ["Prophase", "Metaphase", "Anaphase", "Telophase"], correctAnswer: 1, subject: "Botany", chapter: "Cell Cycle and Cell Division", explanation: "During metaphase, chromosomes align at the metaphase plate (cell equator).", difficulty: "easy" },
  { id: "bot-35", question: "Crossing over occurs during:", options: ["Leptotene", "Zygotene", "Pachytene", "Diplotene"], correctAnswer: 2, subject: "Botany", chapter: "Cell Cycle and Cell Division", explanation: "Crossing over (exchange of genetic material between homologous chromosomes) occurs during pachytene of meiosis I.", difficulty: "medium" },

  // Photosynthesis
  { id: "bot-36", question: "The site of light reaction in photosynthesis is:", options: ["Stroma", "Thylakoid membrane", "Outer membrane", "Matrix"], correctAnswer: 1, subject: "Botany", chapter: "Photosynthesis in Higher Plants", explanation: "Light reactions occur on the thylakoid membranes where photosystems are located.", difficulty: "easy" },
  { id: "bot-37", question: "C4 plants fix CO₂ first into:", options: ["3-PGA", "OAA", "RuBP", "G3P"], correctAnswer: 1, subject: "Botany", chapter: "Photosynthesis in Higher Plants", explanation: "In C4 plants, CO₂ is first fixed into oxaloacetate (OAA), a 4-carbon compound, by PEP carboxylase.", difficulty: "medium" },
  { id: "bot-38", question: "Photorespiration is also called:", options: ["C2 cycle", "C3 cycle", "C4 cycle", "Calvin cycle"], correctAnswer: 0, subject: "Botany", chapter: "Photosynthesis in Higher Plants", explanation: "Photorespiration is called C2 cycle as the first product is a 2-carbon compound (phosphoglycolate).", difficulty: "hard" },

  // Plant Physiology
  { id: "bot-39", question: "Auxin was first isolated from:", options: ["Root tips", "Shoot tips", "Human urine", "Coconut milk"], correctAnswer: 2, subject: "Botany", chapter: "Plant Growth and Development", explanation: "Auxin (IAA) was first isolated from human urine by Kogl et al.", difficulty: "medium" },
  { id: "bot-40", question: "Which hormone is known as stress hormone in plants?", options: ["Auxin", "Gibberellin", "Abscisic acid", "Cytokinin"], correctAnswer: 2, subject: "Botany", chapter: "Plant Growth and Development", explanation: "Abscisic acid (ABA) is called stress hormone as it helps plants cope with adverse conditions.", difficulty: "easy" },

  // Respiration
  { id: "bot-41", question: "Glycolysis occurs in:", options: ["Mitochondria", "Cytoplasm", "Chloroplast", "Nucleus"], correctAnswer: 1, subject: "Botany", chapter: "Respiration in Plants", explanation: "Glycolysis takes place in the cytoplasm and doesn't require oxygen.", difficulty: "easy" },
  { id: "bot-42", question: "The net gain of ATP in glycolysis is:", options: ["2", "4", "8", "36"], correctAnswer: 0, subject: "Botany", chapter: "Respiration in Plants", explanation: "Glycolysis produces 4 ATP but uses 2 ATP, so net gain is 2 ATP per glucose molecule.", difficulty: "easy" },
  { id: "bot-43", question: "Krebs cycle occurs in:", options: ["Cytoplasm", "Mitochondrial matrix", "Thylakoid", "ER"], correctAnswer: 1, subject: "Botany", chapter: "Respiration in Plants", explanation: "The Krebs cycle (citric acid cycle) occurs in the mitochondrial matrix.", difficulty: "easy" },

  // Ecology
  { id: "bot-44", question: "The pyramid of energy is always:", options: ["Upright", "Inverted", "Spindle shaped", "Variable"], correctAnswer: 0, subject: "Botany", chapter: "Ecosystem", explanation: "The pyramid of energy is always upright as energy decreases at each successive trophic level.", difficulty: "easy" },
  { id: "bot-45", question: "Which biogeochemical cycle does not have a gaseous phase?", options: ["Carbon cycle", "Nitrogen cycle", "Phosphorus cycle", "Water cycle"], correctAnswer: 2, subject: "Botany", chapter: "Ecosystem", explanation: "The phosphorus cycle is a sedimentary cycle and does not have a significant gaseous phase.", difficulty: "medium" },

  // ===== ZOOLOGY =====
  { id: "zoo-1", question: "Which phylum shows the presence of a notochord?", options: ["Arthropoda", "Mollusca", "Chordata", "Echinodermata"], correctAnswer: 2, subject: "Zoology", chapter: "Animal Kingdom", explanation: "Chordata is characterized by the presence of notochord, dorsal nerve cord, and pharyngeal gill slits.", difficulty: "easy" },
  { id: "zoo-2", question: "Flame cells are excretory structures in:", options: ["Annelida", "Platyhelminthes", "Arthropoda", "Mollusca"], correctAnswer: 1, subject: "Zoology", chapter: "Animal Kingdom", explanation: "Flame cells (protonephridia) are the excretory structures in Platyhelminthes (flatworms).", difficulty: "medium" },
  { id: "zoo-3", question: "Water vascular system is characteristic of:", options: ["Cnidaria", "Echinodermata", "Arthropoda", "Mollusca"], correctAnswer: 1, subject: "Zoology", chapter: "Animal Kingdom", explanation: "The water vascular system is unique to echinoderms and helps in locomotion, feeding, and respiration.", difficulty: "easy" },
  { id: "zoo-4", question: "Haemocoel is found in:", options: ["Annelida", "Arthropoda", "Echinodermata", "Chordata"], correctAnswer: 1, subject: "Zoology", chapter: "Animal Kingdom", explanation: "Arthropods have an open circulatory system with haemocoel (blood-filled body cavity).", difficulty: "medium" },
  { id: "zoo-5", question: "Metameric segmentation is a feature of:", options: ["Mollusca", "Annelida", "Platyhelminthes", "Cnidaria"], correctAnswer: 1, subject: "Zoology", chapter: "Animal Kingdom", explanation: "Annelids show true metameric segmentation where body is divided into similar segments.", difficulty: "easy" },

  // Human Physiology - Digestion
  { id: "zoo-6", question: "Pepsin converts proteins into:", options: ["Amino acids", "Peptones", "Fatty acids", "Glucose"], correctAnswer: 1, subject: "Zoology", chapter: "Digestion and Absorption", explanation: "Pepsin is a protease that converts proteins into peptones and proteoses in the stomach.", difficulty: "easy" },
  { id: "zoo-7", question: "Bile is produced by:", options: ["Gall bladder", "Liver", "Pancreas", "Stomach"], correctAnswer: 1, subject: "Zoology", chapter: "Digestion and Absorption", explanation: "Bile is produced by the liver and stored in the gall bladder.", difficulty: "easy" },
  { id: "zoo-8", question: "Maximum absorption of nutrients occurs in:", options: ["Stomach", "Small intestine", "Large intestine", "Esophagus"], correctAnswer: 1, subject: "Zoology", chapter: "Digestion and Absorption", explanation: "The small intestine (especially jejunum and ileum) is the primary site of nutrient absorption.", difficulty: "easy" },

  // Breathing
  { id: "zoo-9", question: "The respiratory pigment in humans is:", options: ["Haemocyanin", "Haemoglobin", "Myoglobin", "Chlorocruorin"], correctAnswer: 1, subject: "Zoology", chapter: "Breathing and Exchange of Gases", explanation: "Haemoglobin is the oxygen-carrying pigment present in red blood cells.", difficulty: "easy" },
  { id: "zoo-10", question: "The oxygen dissociation curve is:", options: ["Linear", "Sigmoid", "Hyperbolic", "Exponential"], correctAnswer: 1, subject: "Zoology", chapter: "Breathing and Exchange of Gases", explanation: "The oxygen-haemoglobin dissociation curve is sigmoid (S-shaped) due to cooperative binding.", difficulty: "medium" },
  { id: "zoo-11", question: "Residual volume of lungs is approximately:", options: ["500 mL", "1100 mL", "1200 mL", "2500 mL"], correctAnswer: 2, subject: "Zoology", chapter: "Breathing and Exchange of Gases", explanation: "Residual volume is about 1200 mL - the air remaining in lungs after forceful expiration.", difficulty: "medium" },

  // Circulation
  { id: "zoo-12", question: "SA node is located in:", options: ["Left atrium", "Right atrium", "Left ventricle", "Right ventricle"], correctAnswer: 1, subject: "Zoology", chapter: "Body Fluids and Circulation", explanation: "The SA node (pacemaker) is located in the upper right corner of the right atrium.", difficulty: "easy" },
  { id: "zoo-13", question: "The normal blood pressure in humans is:", options: ["80/120 mmHg", "120/80 mmHg", "140/90 mmHg", "100/70 mmHg"], correctAnswer: 1, subject: "Zoology", chapter: "Body Fluids and Circulation", explanation: "Normal blood pressure is 120/80 mmHg (systolic/diastolic).", difficulty: "easy" },
  { id: "zoo-14", question: "Which blood group is called universal donor?", options: ["A", "B", "AB", "O"], correctAnswer: 3, subject: "Zoology", chapter: "Body Fluids and Circulation", explanation: "Blood group O is the universal donor as it has no antigens on RBCs.", difficulty: "easy" },

  // Excretion
  { id: "zoo-15", question: "The functional unit of kidney is:", options: ["Neuron", "Nephron", "Alveolus", "Glomerulus"], correctAnswer: 1, subject: "Zoology", chapter: "Excretory Products", explanation: "Nephron is the structural and functional unit of the kidney.", difficulty: "easy" },
  { id: "zoo-16", question: "Juxtaglomerular apparatus secretes:", options: ["ADH", "Renin", "Aldosterone", "ANF"], correctAnswer: 1, subject: "Zoology", chapter: "Excretory Products", explanation: "JGA secretes renin which plays a key role in regulating blood pressure through the RAAS.", difficulty: "medium" },
  { id: "zoo-17", question: "The loop of Henle is important for:", options: ["Filtration", "Concentration of urine", "Secretion", "Reabsorption only"], correctAnswer: 1, subject: "Zoology", chapter: "Excretory Products", explanation: "The loop of Henle creates a concentration gradient essential for producing concentrated urine.", difficulty: "medium" },

  // Neural Control
  { id: "zoo-18", question: "The gap between two neurons is called:", options: ["Synapse", "Junction", "Node", "Axon hillock"], correctAnswer: 0, subject: "Zoology", chapter: "Neural Control and Coordination", explanation: "A synapse is the junction/gap between the axon terminal of one neuron and dendrite of the next.", difficulty: "easy" },
  { id: "zoo-19", question: "Cerebellum controls:", options: ["Intelligence", "Balance and coordination", "Emotions", "Body temperature"], correctAnswer: 1, subject: "Zoology", chapter: "Neural Control and Coordination", explanation: "The cerebellum coordinates muscular movements, maintains posture and equilibrium.", difficulty: "easy" },
  { id: "zoo-20", question: "The resting potential of a nerve fibre is:", options: ["+70 mV", "-70 mV", "+40 mV", "-40 mV"], correctAnswer: 1, subject: "Zoology", chapter: "Neural Control and Coordination", explanation: "The resting membrane potential of a typical neuron is about -70 mV (inside negative).", difficulty: "medium" },

  // Locomotion
  { id: "zoo-21", question: "The smallest bone in the human body is:", options: ["Malleus", "Incus", "Stapes", "Hyoid"], correctAnswer: 2, subject: "Zoology", chapter: "Locomotion and Movement", explanation: "Stapes (stirrup bone) in the middle ear is the smallest bone in the human body.", difficulty: "easy" },
  { id: "zoo-22", question: "The total number of bones in an adult human body is:", options: ["206", "213", "300", "270"], correctAnswer: 0, subject: "Zoology", chapter: "Locomotion and Movement", explanation: "An adult human has 206 bones. Infants have about 270-300 which fuse during growth.", difficulty: "easy" },
  { id: "zoo-23", question: "Actin and myosin are:", options: ["Carbohydrates", "Lipids", "Contractile proteins", "Structural proteins"], correctAnswer: 2, subject: "Zoology", chapter: "Locomotion and Movement", explanation: "Actin (thin) and myosin (thick) are contractile proteins responsible for muscle contraction.", difficulty: "easy" },

  // Endocrine
  { id: "zoo-24", question: "Insulin is secreted by:", options: ["Alpha cells", "Beta cells", "Delta cells", "Gamma cells"], correctAnswer: 1, subject: "Zoology", chapter: "Chemical Coordination", explanation: "Insulin is secreted by beta cells of Islets of Langerhans in the pancreas.", difficulty: "easy" },
  { id: "zoo-25", question: "Which hormone is known as emergency hormone?", options: ["Insulin", "Thyroxine", "Adrenaline", "Growth hormone"], correctAnswer: 2, subject: "Zoology", chapter: "Chemical Coordination", explanation: "Adrenaline (epinephrine) is called the emergency/fight-or-flight hormone.", difficulty: "easy" },
  { id: "zoo-26", question: "Grave's disease is caused by:", options: ["Hypothyroidism", "Hyperthyroidism", "Hypoparathyroidism", "Hyperparathyroidism"], correctAnswer: 1, subject: "Zoology", chapter: "Chemical Coordination", explanation: "Grave's disease is an autoimmune disorder causing hyperthyroidism.", difficulty: "medium" },

  // Reproduction
  { id: "zoo-27", question: "The process of sperm formation is called:", options: ["Oogenesis", "Spermatogenesis", "Fertilization", "Gametogenesis"], correctAnswer: 1, subject: "Zoology", chapter: "Human Reproduction", explanation: "Spermatogenesis is the process of formation of spermatozoa from spermatogonia.", difficulty: "easy" },
  { id: "zoo-28", question: "Implantation of embryo occurs in:", options: ["Fallopian tube", "Uterus", "Cervix", "Vagina"], correctAnswer: 1, subject: "Zoology", chapter: "Human Reproduction", explanation: "The blastocyst implants in the endometrium (inner lining) of the uterus.", difficulty: "easy" },
  { id: "zoo-29", question: "HCG is produced by:", options: ["Ovary", "Placenta", "Pituitary", "Hypothalamus"], correctAnswer: 1, subject: "Zoology", chapter: "Human Reproduction", explanation: "Human chorionic gonadotropin (HCG) is produced by the trophoblast/placenta during pregnancy.", difficulty: "easy" },

  // Genetics
  { id: "zoo-30", question: "The chromosomal basis of sex determination in humans is:", options: ["XX-XO", "XX-XY", "ZZ-ZW", "Haplodiploidy"], correctAnswer: 1, subject: "Zoology", chapter: "Principles of Inheritance", explanation: "Humans follow XX-XY sex determination: XX = female, XY = male.", difficulty: "easy" },
  { id: "zoo-31", question: "A cross between homozygous tall (TT) and dwarf (tt) gives F1 ratio:", options: ["All tall", "All dwarf", "1:1", "3:1"], correctAnswer: 0, subject: "Zoology", chapter: "Principles of Inheritance", explanation: "F1 generation from TT × tt cross produces all Tt (tall) due to dominance.", difficulty: "easy" },
  { id: "zoo-32", question: "Colour blindness is:", options: ["Autosomal dominant", "Autosomal recessive", "X-linked recessive", "Y-linked"], correctAnswer: 2, subject: "Zoology", chapter: "Principles of Inheritance", explanation: "Colour blindness is an X-linked recessive trait, more common in males.", difficulty: "easy" },

  // Evolution
  { id: "zoo-33", question: "Darwin's theory of evolution is based on:", options: ["Use and disuse", "Natural selection", "Mutation", "Genetic drift"], correctAnswer: 1, subject: "Zoology", chapter: "Evolution", explanation: "Darwin's theory centers on natural selection - survival of the fittest.", difficulty: "easy" },
  { id: "zoo-34", question: "Analogous organs have:", options: ["Same origin, different function", "Different origin, same function", "Same origin, same function", "Different origin, different function"], correctAnswer: 1, subject: "Zoology", chapter: "Evolution", explanation: "Analogous organs have different origin (not homologous) but similar function (convergent evolution).", difficulty: "easy" },

  // Molecular Biology
  { id: "zoo-35", question: "DNA replication is:", options: ["Conservative", "Semi-conservative", "Dispersive", "Non-conservative"], correctAnswer: 1, subject: "Zoology", chapter: "Molecular Basis of Inheritance", explanation: "DNA replication is semi-conservative as proved by Meselson and Stahl experiment.", difficulty: "easy" },
  { id: "zoo-36", question: "The central dogma of molecular biology is:", options: ["DNA → RNA → Protein", "RNA → DNA → Protein", "Protein → RNA → DNA", "DNA → Protein → RNA"], correctAnswer: 0, subject: "Zoology", chapter: "Molecular Basis of Inheritance", explanation: "The central dogma: DNA → (transcription) → RNA → (translation) → Protein.", difficulty: "easy" },
  { id: "zoo-37", question: "Start codon is:", options: ["UAA", "UAG", "AUG", "UGA"], correctAnswer: 2, subject: "Zoology", chapter: "Molecular Basis of Inheritance", explanation: "AUG is the start codon that codes for methionine and initiates translation.", difficulty: "easy" },

  // Health & Disease
  { id: "zoo-38", question: "Malaria is caused by:", options: ["Virus", "Bacteria", "Plasmodium", "Fungus"], correctAnswer: 2, subject: "Zoology", chapter: "Human Health and Disease", explanation: "Malaria is caused by Plasmodium species (P. vivax, P. falciparum, etc.), transmitted by Anopheles mosquito.", difficulty: "easy" },
  { id: "zoo-39", question: "Which type of immunity is provided by vaccination?", options: ["Natural active", "Artificial active", "Natural passive", "Artificial passive"], correctAnswer: 1, subject: "Zoology", chapter: "Human Health and Disease", explanation: "Vaccination provides artificial active immunity by introducing antigens to stimulate immune response.", difficulty: "medium" },

  // Biotechnology
  { id: "zoo-40", question: "The enzyme used to cut DNA at specific sites is:", options: ["Ligase", "Restriction endonuclease", "Polymerase", "Helicase"], correctAnswer: 1, subject: "Zoology", chapter: "Biotechnology", explanation: "Restriction endonucleases (molecular scissors) cut DNA at specific palindromic sequences.", difficulty: "easy" },
  { id: "zoo-41", question: "PCR stands for:", options: ["Protein Chain Reaction", "Polymerase Chain Reaction", "Peptide Chain Reaction", "Polymer Chain Reaction"], correctAnswer: 1, subject: "Zoology", chapter: "Biotechnology", explanation: "PCR (Polymerase Chain Reaction) amplifies specific DNA sequences in vitro.", difficulty: "easy" },
  { id: "zoo-42", question: "Bt cotton is resistant to:", options: ["Fungal infection", "Bollworm", "Drought", "Salinity"], correctAnswer: 1, subject: "Zoology", chapter: "Biotechnology", explanation: "Bt cotton contains Cry gene from Bacillus thuringiensis making it resistant to bollworm.", difficulty: "easy" },
  { id: "zoo-43", question: "The first transgenic animal was:", options: ["Dolly sheep", "Transgenic mouse", "Transgenic cow", "Transgenic pig"], correctAnswer: 1, subject: "Zoology", chapter: "Biotechnology", explanation: "The first transgenic animal was a mouse created in 1982.", difficulty: "medium" },
  { id: "zoo-44", question: "Golden rice is rich in:", options: ["Iron", "Vitamin A", "Vitamin C", "Protein"], correctAnswer: 1, subject: "Zoology", chapter: "Biotechnology", explanation: "Golden rice is genetically engineered to produce beta-carotene (provitamin A).", difficulty: "easy" },
  { id: "zoo-45", question: "Gene therapy involves:", options: ["Cloning genes", "Correcting defective genes", "Mutating genes", "Sequencing genes"], correctAnswer: 1, subject: "Zoology", chapter: "Biotechnology", explanation: "Gene therapy is the correction of a genetic defect by delivering a normal gene into the patient.", difficulty: "easy" },

  // ===== PHYSICS =====
  { id: "phy-1", question: "The dimensional formula of force is:", options: ["[MLT⁻²]", "[ML²T⁻²]", "[MLT⁻¹]", "[ML²T⁻¹]"], correctAnswer: 0, subject: "Physics", chapter: "Units and Measurements", explanation: "Force = mass × acceleration = [M][LT⁻²] = [MLT⁻²]", difficulty: "easy" },
  { id: "phy-2", question: "A body thrown vertically upward reaches maximum height. At maximum height:", options: ["Velocity and acceleration both zero", "Velocity zero, acceleration = g", "Velocity = g, acceleration zero", "Both are non-zero"], correctAnswer: 1, subject: "Physics", chapter: "Motion in a Straight Line", explanation: "At maximum height, velocity becomes zero but acceleration due to gravity (g) still acts downward.", difficulty: "easy" },
  { id: "phy-3", question: "Newton's first law defines:", options: ["Force", "Inertia", "Momentum", "Acceleration"], correctAnswer: 1, subject: "Physics", chapter: "Laws of Motion", explanation: "Newton's first law (law of inertia) defines the concept of inertia.", difficulty: "easy" },
  { id: "phy-4", question: "The unit of work is:", options: ["Newton", "Watt", "Joule", "Pascal"], correctAnswer: 2, subject: "Physics", chapter: "Work, Energy and Power", explanation: "Work is measured in Joules (J). 1 J = 1 N⋅m.", difficulty: "easy" },
  { id: "phy-5", question: "The escape velocity from earth is approximately:", options: ["7.9 km/s", "11.2 km/s", "15.5 km/s", "3.2 km/s"], correctAnswer: 1, subject: "Physics", chapter: "Gravitation", explanation: "Escape velocity from Earth is approximately 11.2 km/s.", difficulty: "easy" },
  { id: "phy-6", question: "Young's modulus is the ratio of:", options: ["Shear stress to shear strain", "Normal stress to longitudinal strain", "Volume stress to volume strain", "Force to area"], correctAnswer: 1, subject: "Physics", chapter: "Mechanical Properties of Solids", explanation: "Young's modulus (Y) = longitudinal stress / longitudinal strain.", difficulty: "easy" },
  { id: "phy-7", question: "Bernoulli's principle is based on conservation of:", options: ["Mass", "Energy", "Momentum", "Angular momentum"], correctAnswer: 1, subject: "Physics", chapter: "Mechanical Properties of Fluids", explanation: "Bernoulli's theorem is essentially conservation of energy applied to fluid flow.", difficulty: "medium" },
  { id: "phy-8", question: "The coefficient of linear expansion has unit:", options: ["K", "K⁻¹", "K²", "No unit"], correctAnswer: 1, subject: "Physics", chapter: "Thermal Properties of Matter", explanation: "Coefficient of linear expansion α = ΔL/(L₀ΔT), so its unit is per Kelvin (K⁻¹).", difficulty: "easy" },
  { id: "phy-9", question: "In an isothermal process:", options: ["Temperature changes", "Pressure is constant", "Temperature is constant", "Volume is constant"], correctAnswer: 2, subject: "Physics", chapter: "Thermodynamics", explanation: "In an isothermal process, temperature remains constant (ΔT = 0).", difficulty: "easy" },
  { id: "phy-10", question: "The speed of sound in air at 0°C is approximately:", options: ["232 m/s", "332 m/s", "432 m/s", "532 m/s"], correctAnswer: 1, subject: "Physics", chapter: "Waves", explanation: "The speed of sound in air at 0°C (STP) is approximately 332 m/s.", difficulty: "easy" },
  { id: "phy-11", question: "Time period of a simple pendulum depends on:", options: ["Mass", "Length and g", "Amplitude", "Material"], correctAnswer: 1, subject: "Physics", chapter: "Oscillations", explanation: "T = 2π√(L/g). Time period depends only on length and acceleration due to gravity.", difficulty: "easy" },
  { id: "phy-12", question: "According to kinetic theory, temperature of a gas is proportional to:", options: ["Average speed", "Average KE of molecules", "Pressure", "Volume"], correctAnswer: 1, subject: "Physics", chapter: "Kinetic Theory", explanation: "Temperature is directly proportional to average kinetic energy: (3/2)kT = (1/2)mv².", difficulty: "easy" },
  { id: "phy-13", question: "Moment of inertia depends on:", options: ["Mass only", "Shape only", "Mass distribution about axis", "Velocity"], correctAnswer: 2, subject: "Physics", chapter: "System of Particles and Rotational Motion", explanation: "Moment of inertia depends on mass and its distribution relative to the axis of rotation.", difficulty: "medium" },
  { id: "phy-14", question: "A projectile is fired at 45°. The range is:", options: ["Maximum", "Minimum", "Zero", "Half of maximum"], correctAnswer: 0, subject: "Physics", chapter: "Motion in a Plane", explanation: "Range R = u²sin2θ/g is maximum when θ = 45° (sin90° = 1).", difficulty: "easy" },
  { id: "phy-15", question: "Coulomb's law gives force between:", options: ["Masses", "Charges", "Magnets", "Current-carrying wires"], correctAnswer: 1, subject: "Physics", chapter: "Electric Charges and Fields", explanation: "Coulomb's law gives the electrostatic force between two point charges.", difficulty: "easy" },
  { id: "phy-16", question: "The unit of electric potential is:", options: ["Ampere", "Ohm", "Volt", "Coulomb"], correctAnswer: 2, subject: "Physics", chapter: "Electrostatic Potential and Capacitance", explanation: "Electric potential is measured in Volts (V). 1 V = 1 J/C.", difficulty: "easy" },
  { id: "phy-17", question: "Ohm's law states that V is proportional to:", options: ["R", "I", "P", "E"], correctAnswer: 1, subject: "Physics", chapter: "Current Electricity", explanation: "Ohm's law: V = IR. Voltage is directly proportional to current at constant resistance.", difficulty: "easy" },
  { id: "phy-18", question: "The force on a moving charge in a magnetic field is given by:", options: ["F = qE", "F = qvB sinθ", "F = ma", "F = kq₁q₂/r²"], correctAnswer: 1, subject: "Physics", chapter: "Moving Charges and Magnetism", explanation: "The Lorentz force on a moving charge in magnetic field: F = qvB sinθ.", difficulty: "easy" },
  { id: "phy-19", question: "Faraday's law relates to:", options: ["Electric force", "Electromagnetic induction", "Magnetism", "Electrostatics"], correctAnswer: 1, subject: "Physics", chapter: "Electromagnetic Induction", explanation: "Faraday's law states that changing magnetic flux through a circuit induces an EMF.", difficulty: "easy" },
  { id: "phy-20", question: "In an AC circuit, power factor is:", options: ["sinφ", "cosφ", "tanφ", "secφ"], correctAnswer: 1, subject: "Physics", chapter: "Alternating Current", explanation: "Power factor = cosφ, where φ is the phase angle between voltage and current.", difficulty: "easy" },
  { id: "phy-21", question: "Electromagnetic waves travel at the speed of:", options: ["Sound", "Light", "Electron", "Proton"], correctAnswer: 1, subject: "Physics", chapter: "Electromagnetic Waves", explanation: "All electromagnetic waves travel at the speed of light (c = 3×10⁸ m/s) in vacuum.", difficulty: "easy" },
  { id: "phy-22", question: "Total internal reflection occurs when light travels from:", options: ["Rarer to denser medium", "Denser to rarer medium", "Same medium", "Vacuum to glass"], correctAnswer: 1, subject: "Physics", chapter: "Ray Optics", explanation: "TIR occurs when light travels from denser to rarer medium at angle > critical angle.", difficulty: "easy" },
  { id: "phy-23", question: "In Young's double slit experiment, fringe width is:", options: ["λD/d", "λd/D", "Dd/λ", "λ/Dd"], correctAnswer: 0, subject: "Physics", chapter: "Wave Optics", explanation: "Fringe width β = λD/d, where λ = wavelength, D = screen distance, d = slit separation.", difficulty: "medium" },
  { id: "phy-24", question: "Photoelectric effect proves:", options: ["Wave nature of light", "Particle nature of light", "Dual nature of matter", "Diffraction"], correctAnswer: 1, subject: "Physics", chapter: "Dual Nature of Radiation and Matter", explanation: "Photoelectric effect demonstrates the particle (quantum) nature of light.", difficulty: "easy" },
  { id: "phy-25", question: "Bohr's model is applicable to:", options: ["Multi-electron atoms", "Hydrogen-like atoms", "Molecules", "All atoms"], correctAnswer: 1, subject: "Physics", chapter: "Atoms", explanation: "Bohr's model accurately describes hydrogen-like atoms (single electron systems).", difficulty: "easy" },
  { id: "phy-26", question: "The binding energy per nucleon is maximum for:", options: ["Hydrogen", "Iron", "Uranium", "Helium"], correctAnswer: 1, subject: "Physics", chapter: "Nuclei", explanation: "Iron-56 has the highest binding energy per nucleon (~8.8 MeV), making it the most stable nucleus.", difficulty: "medium" },
  { id: "phy-27", question: "A p-n junction diode allows current in:", options: ["Both directions", "Forward bias only", "Reverse bias only", "Neither direction"], correctAnswer: 1, subject: "Physics", chapter: "Semiconductor Electronics", explanation: "A p-n junction diode conducts significantly only in forward bias.", difficulty: "easy" },
  { id: "phy-28", question: "The truth table of AND gate shows output 1 only when:", options: ["Any input is 1", "All inputs are 1", "All inputs are 0", "Any input is 0"], correctAnswer: 1, subject: "Physics", chapter: "Semiconductor Electronics", explanation: "AND gate gives output 1 only when all inputs are 1.", difficulty: "easy" },
  { id: "phy-29", question: "de Broglie wavelength is given by:", options: ["λ = h/p", "λ = p/h", "λ = hν", "λ = mc²"], correctAnswer: 0, subject: "Physics", chapter: "Dual Nature of Radiation and Matter", explanation: "de Broglie wavelength λ = h/p = h/mv, relating wave and particle properties.", difficulty: "easy" },
  { id: "phy-30", question: "The energy of a photon is:", options: ["E = mc²", "E = hν", "E = ½mv²", "E = kT"], correctAnswer: 1, subject: "Physics", chapter: "Dual Nature of Radiation and Matter", explanation: "Energy of a photon E = hν, where h is Planck's constant and ν is frequency.", difficulty: "easy" },

  // More physics for larger tests
  { id: "phy-31", question: "The SI unit of magnetic flux is:", options: ["Tesla", "Weber", "Gauss", "Henry"], correctAnswer: 1, subject: "Physics", chapter: "Electromagnetic Induction", explanation: "Magnetic flux is measured in Weber (Wb). 1 Wb = 1 T⋅m².", difficulty: "easy" },
  { id: "phy-32", question: "A transformer works on the principle of:", options: ["Self induction", "Mutual induction", "Eddy currents", "Hysteresis"], correctAnswer: 1, subject: "Physics", chapter: "Alternating Current", explanation: "A transformer works on the principle of mutual induction between two coils.", difficulty: "easy" },
  { id: "phy-33", question: "The angle of dip at the equator is:", options: ["0°", "45°", "90°", "180°"], correctAnswer: 0, subject: "Physics", chapter: "Magnetism and Matter", explanation: "At the magnetic equator, the angle of dip is 0° as the Earth's field is horizontal.", difficulty: "easy" },
  { id: "phy-34", question: "The focal length of a convex lens is:", options: ["Positive", "Negative", "Zero", "Infinity"], correctAnswer: 0, subject: "Physics", chapter: "Ray Optics", explanation: "By convention, the focal length of a convex (converging) lens is positive.", difficulty: "easy" },
  { id: "phy-35", question: "Which quantity is conserved in elastic collision?", options: ["Only momentum", "Only KE", "Both momentum and KE", "Neither"], correctAnswer: 2, subject: "Physics", chapter: "Work, Energy and Power", explanation: "In elastic collisions, both linear momentum and kinetic energy are conserved.", difficulty: "easy" },
  { id: "phy-36", question: "Angular momentum is conserved when:", options: ["Force is zero", "Torque is zero", "Velocity is constant", "Mass is constant"], correctAnswer: 1, subject: "Physics", chapter: "System of Particles and Rotational Motion", explanation: "Angular momentum is conserved when net external torque on the system is zero.", difficulty: "medium" },
  { id: "phy-37", question: "The dimension of Planck's constant is:", options: ["[ML²T⁻¹]", "[MLT⁻²]", "[ML²T⁻²]", "[ML²T⁻³]"], correctAnswer: 0, subject: "Physics", chapter: "Units and Measurements", explanation: "h has dimensions of energy × time = [ML²T⁻²][T] = [ML²T⁻¹].", difficulty: "medium" },
  { id: "phy-38", question: "Capillarity is due to:", options: ["Viscosity", "Surface tension", "Pressure", "Gravity"], correctAnswer: 1, subject: "Physics", chapter: "Mechanical Properties of Fluids", explanation: "Capillary action is due to surface tension and adhesion between liquid and tube walls.", difficulty: "easy" },
  { id: "phy-39", question: "Carnot engine has maximum efficiency when:", options: ["T₂ = 0 K", "T₁ = ∞", "T₂ = T₁", "Both A and B"], correctAnswer: 3, subject: "Physics", chapter: "Thermodynamics", explanation: "Carnot efficiency η = 1 - T₂/T₁ is maximum (100%) when T₂ → 0 or T₁ → ∞.", difficulty: "hard" },
  { id: "phy-40", question: "Doppler effect is applicable to:", options: ["Sound only", "Light only", "Both sound and light", "Neither"], correctAnswer: 2, subject: "Physics", chapter: "Waves", explanation: "Doppler effect applies to all waves including sound and light.", difficulty: "easy" },
  { id: "phy-41", question: "Capacitance of a parallel plate capacitor is:", options: ["C = εA/d", "C = ε₀A/d", "C = εd/A", "C = A/εd"], correctAnswer: 1, subject: "Physics", chapter: "Electrostatic Potential and Capacitance", explanation: "For parallel plate capacitor in vacuum: C = ε₀A/d.", difficulty: "easy" },
  { id: "phy-42", question: "Kirchhoff's junction rule is based on conservation of:", options: ["Energy", "Charge", "Momentum", "Mass"], correctAnswer: 1, subject: "Physics", chapter: "Current Electricity", explanation: "Kirchhoff's junction rule (KCL) is based on conservation of charge.", difficulty: "easy" },
  { id: "phy-43", question: "Moving coil galvanometer works on the principle of:", options: ["Electromagnetic induction", "Current-carrying coil in magnetic field experiences torque", "Eddy currents", "Self-induction"], correctAnswer: 1, subject: "Physics", chapter: "Moving Charges and Magnetism", explanation: "MCG works because a current-carrying coil in a magnetic field experiences a torque.", difficulty: "medium" },
  { id: "phy-44", question: "In nuclear fission:", options: ["Light nuclei combine", "Heavy nucleus splits", "Neutrons are absorbed", "Protons are emitted"], correctAnswer: 1, subject: "Physics", chapter: "Nuclei", explanation: "Nuclear fission is the splitting of a heavy nucleus into lighter fragments with release of energy.", difficulty: "easy" },
  { id: "phy-45", question: "LED is based on:", options: ["Photoelectric effect", "Electroluminescence", "Thermionic emission", "Photovoltaic effect"], correctAnswer: 1, subject: "Physics", chapter: "Semiconductor Electronics", explanation: "LED works on electroluminescence — emission of light when current passes through a p-n junction.", difficulty: "medium" },

  // ===== CHEMISTRY =====
  { id: "chem-1", question: "The number of moles in 36 g of water is:", options: ["1", "2", "3", "4"], correctAnswer: 1, subject: "Chemistry", chapter: "Some Basic Concepts of Chemistry", explanation: "Moles = mass/molar mass = 36/18 = 2 moles.", difficulty: "easy" },
  { id: "chem-2", question: "The atomic number of an element determines:", options: ["Mass number", "Number of protons", "Number of neutrons", "Atomic mass"], correctAnswer: 1, subject: "Chemistry", chapter: "Structure of Atom", explanation: "Atomic number (Z) equals the number of protons in the nucleus.", difficulty: "easy" },
  { id: "chem-3", question: "Heisenberg's uncertainty principle states:", options: ["Energy is quantized", "Position and momentum cannot be simultaneously determined", "Electrons have wave nature", "Atoms are indivisible"], correctAnswer: 1, subject: "Chemistry", chapter: "Structure of Atom", explanation: "Heisenberg's principle: Δx⋅Δp ≥ h/4π — position and momentum can't be precisely known simultaneously.", difficulty: "medium" },
  { id: "chem-4", question: "The element with highest electronegativity is:", options: ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"], correctAnswer: 2, subject: "Chemistry", chapter: "Classification of Elements", explanation: "Fluorine has the highest electronegativity (3.98 on Pauling scale).", difficulty: "easy" },
  { id: "chem-5", question: "Ionic bond is formed by:", options: ["Sharing of electrons", "Transfer of electrons", "Overlap of orbitals", "Metallic bonding"], correctAnswer: 1, subject: "Chemistry", chapter: "Chemical Bonding", explanation: "Ionic bonds form by transfer of electrons from metal to non-metal atoms.", difficulty: "easy" },
  { id: "chem-6", question: "The shape of methane molecule is:", options: ["Linear", "Trigonal planar", "Tetrahedral", "Octahedral"], correctAnswer: 2, subject: "Chemistry", chapter: "Chemical Bonding", explanation: "CH₄ has sp³ hybridization giving a tetrahedral shape with 109.5° bond angles.", difficulty: "easy" },
  { id: "chem-7", question: "Enthalpy change at constant pressure is:", options: ["ΔU", "ΔH", "ΔG", "ΔS"], correctAnswer: 1, subject: "Chemistry", chapter: "Thermodynamics", explanation: "Enthalpy change (ΔH) = heat absorbed/released at constant pressure.", difficulty: "easy" },
  { id: "chem-8", question: "Le Chatelier's principle is about:", options: ["Chemical equilibrium response to stress", "Reaction rates", "Bond energy", "Molecular structure"], correctAnswer: 0, subject: "Chemistry", chapter: "Equilibrium", explanation: "Le Chatelier's principle states that a system at equilibrium shifts to counteract any applied stress.", difficulty: "easy" },
  { id: "chem-9", question: "pH of pure water at 25°C is:", options: ["0", "1", "7", "14"], correctAnswer: 2, subject: "Chemistry", chapter: "Equilibrium", explanation: "Pure water is neutral with pH = 7 at 25°C, where [H⁺] = [OH⁻] = 10⁻⁷ M.", difficulty: "easy" },
  { id: "chem-10", question: "In a redox reaction, the substance that gets oxidized is called:", options: ["Oxidizing agent", "Reducing agent", "Catalyst", "Inhibitor"], correctAnswer: 1, subject: "Chemistry", chapter: "Redox Reactions", explanation: "The substance that gets oxidized (loses electrons) acts as the reducing agent.", difficulty: "easy" },
  { id: "chem-11", question: "IUPAC name of CH₃CHO is:", options: ["Methanal", "Ethanal", "Propanal", "Butanal"], correctAnswer: 1, subject: "Chemistry", chapter: "Organic Chemistry: Basic Principles", explanation: "CH₃CHO is ethanal (acetaldehyde) — a 2-carbon aldehyde.", difficulty: "easy" },
  { id: "chem-12", question: "Markovnikov's rule applies to addition of:", options: ["HX to symmetrical alkenes", "HX to unsymmetrical alkenes", "H₂ to alkenes", "X₂ to alkenes"], correctAnswer: 1, subject: "Chemistry", chapter: "Hydrocarbons", explanation: "Markovnikov's rule: H adds to the carbon with more H atoms in unsymmetrical alkene + HX.", difficulty: "medium" },
  { id: "chem-13", question: "Ideal gas equation is:", options: ["PV = nRT", "PV = RT", "P = nRT/V²", "PV = nR/T"], correctAnswer: 0, subject: "Chemistry", chapter: "States of Matter", explanation: "The ideal gas equation PV = nRT relates pressure, volume, moles, and temperature.", difficulty: "easy" },
  { id: "chem-14", question: "The lightest element is:", options: ["Helium", "Hydrogen", "Lithium", "Carbon"], correctAnswer: 1, subject: "Chemistry", chapter: "Hydrogen", explanation: "Hydrogen (atomic mass ~1 u) is the lightest element in the periodic table.", difficulty: "easy" },
  { id: "chem-15", question: "Alkali metals belong to which group?", options: ["Group 1", "Group 2", "Group 17", "Group 18"], correctAnswer: 0, subject: "Chemistry", chapter: "The s-Block Elements", explanation: "Alkali metals (Li, Na, K, Rb, Cs, Fr) are Group 1 elements.", difficulty: "easy" },

  // More Chemistry
  { id: "chem-16", question: "The coordination number of Na⁺ in NaCl crystal is:", options: ["4", "6", "8", "12"], correctAnswer: 1, subject: "Chemistry", chapter: "The Solid State", explanation: "In NaCl, each Na⁺ is surrounded by 6 Cl⁻ ions (octahedral arrangement).", difficulty: "easy" },
  { id: "chem-17", question: "Raoult's law is applicable to:", options: ["Ideal solutions", "Non-ideal solutions", "All solutions", "Colloidal solutions"], correctAnswer: 0, subject: "Chemistry", chapter: "Solutions", explanation: "Raoult's law states that vapor pressure of a component is proportional to its mole fraction in ideal solutions.", difficulty: "easy" },
  { id: "chem-18", question: "The unit of rate constant for first order reaction is:", options: ["mol L⁻¹ s⁻¹", "L mol⁻¹ s⁻¹", "s⁻¹", "mol⁻² L² s⁻¹"], correctAnswer: 2, subject: "Chemistry", chapter: "Chemical Kinetics", explanation: "First order rate constant has units of s⁻¹ (inverse of time).", difficulty: "medium" },
  { id: "chem-19", question: "EMF of a standard hydrogen electrode is:", options: ["1.0 V", "0.0 V", "-1.0 V", "0.5 V"], correctAnswer: 1, subject: "Chemistry", chapter: "Electrochemistry", explanation: "The standard hydrogen electrode (SHE) has an EMF of 0.0 V by definition.", difficulty: "easy" },
  { id: "chem-20", question: "Adsorption on solid surface is:", options: ["Endothermic", "Exothermic", "Neither", "Both"], correctAnswer: 1, subject: "Chemistry", chapter: "Surface Chemistry", explanation: "Adsorption is always exothermic as surface energy decreases when molecules adsorb.", difficulty: "easy" },
  { id: "chem-21", question: "The geometry of [Ni(CN)₄]²⁻ is:", options: ["Tetrahedral", "Square planar", "Octahedral", "Linear"], correctAnswer: 1, subject: "Chemistry", chapter: "Coordination Compounds", explanation: "[Ni(CN)₄]²⁻ has dsp² hybridization giving square planar geometry.", difficulty: "hard" },
  { id: "chem-22", question: "SN2 reaction occurs with:", options: ["Retention", "Inversion", "Racemization", "No change"], correctAnswer: 1, subject: "Chemistry", chapter: "Haloalkanes and Haloarenes", explanation: "SN2 reaction proceeds with Walden inversion (backside attack).", difficulty: "medium" },
  { id: "chem-23", question: "Phenol is more acidic than ethanol because:", options: ["It has OH group", "Phenoxide ion is resonance stabilized", "It has benzene ring", "It is aromatic"], correctAnswer: 1, subject: "Chemistry", chapter: "Alcohols, Phenols and Ethers", explanation: "Phenoxide ion is stabilized by resonance with the benzene ring, making phenol more acidic.", difficulty: "medium" },
  { id: "chem-24", question: "Cannizzaro reaction is given by:", options: ["Aldehydes with α-hydrogen", "Aldehydes without α-hydrogen", "Ketones", "Carboxylic acids"], correctAnswer: 1, subject: "Chemistry", chapter: "Aldehydes, Ketones and Carboxylic Acids", explanation: "Cannizzaro reaction occurs in aldehydes without α-hydrogen (e.g., HCHO, C₆H₅CHO).", difficulty: "hard" },
  { id: "chem-25", question: "The basic character of amines follows the order:", options: ["1° > 2° > 3°", "3° > 2° > 1°", "2° > 1° > 3°", "2° > 3° > 1°"], correctAnswer: 2, subject: "Chemistry", chapter: "Amines", explanation: "In aqueous solution: 2° > 1° > 3° due to combined effects of induction and solvation.", difficulty: "hard" },
  { id: "chem-26", question: "Sucrose is a:", options: ["Monosaccharide", "Disaccharide", "Polysaccharide", "Amino acid"], correctAnswer: 1, subject: "Chemistry", chapter: "Biomolecules", explanation: "Sucrose is a disaccharide composed of glucose and fructose units.", difficulty: "easy" },
  { id: "chem-27", question: "Nylon-6,6 is a:", options: ["Polyester", "Polyamide", "Polyether", "Addition polymer"], correctAnswer: 1, subject: "Chemistry", chapter: "Polymers", explanation: "Nylon-6,6 is a polyamide formed by condensation of hexamethylenediamine and adipic acid.", difficulty: "easy" },
  { id: "chem-28", question: "Which is an analgesic drug?", options: ["Chloramphenicol", "Aspirin", "Chloroquine", "Bithionol"], correctAnswer: 1, subject: "Chemistry", chapter: "Chemistry in Everyday Life", explanation: "Aspirin (acetylsalicylic acid) is a well-known analgesic (pain reliever) and antipyretic.", difficulty: "easy" },
  { id: "chem-29", question: "Colligative properties depend on:", options: ["Nature of solute", "Number of solute particles", "Nature of solvent", "Temperature only"], correctAnswer: 1, subject: "Chemistry", chapter: "Solutions", explanation: "Colligative properties depend on the number (not nature) of solute particles.", difficulty: "easy" },
  { id: "chem-30", question: "The lanthanide contraction is due to:", options: ["Poor shielding by 4f electrons", "Good shielding by 4f electrons", "d-orbital filling", "Nuclear charge"], correctAnswer: 0, subject: "Chemistry", chapter: "The d- and f-Block Elements", explanation: "Lanthanide contraction is caused by poor shielding effect of 4f electrons.", difficulty: "medium" },
  { id: "chem-31", question: "Which catalyst is used in Contact process?", options: ["Fe", "V₂O₅", "Pt", "Ni"], correctAnswer: 1, subject: "Chemistry", chapter: "The p-Block Elements", explanation: "V₂O₅ (vanadium pentoxide) is used as catalyst in Contact process for H₂SO₄ manufacture.", difficulty: "medium" },
  { id: "chem-32", question: "Boron shows diagonal relationship with:", options: ["Carbon", "Aluminium", "Silicon", "Nitrogen"], correctAnswer: 2, subject: "Chemistry", chapter: "The p-Block Elements", explanation: "Boron shows diagonal relationship with silicon due to similar charge/radius ratio.", difficulty: "medium" },
  { id: "chem-33", question: "Inert pair effect is shown by:", options: ["s-block elements", "p-block elements", "d-block elements", "f-block elements"], correctAnswer: 1, subject: "Chemistry", chapter: "The p-Block Elements", explanation: "Inert pair effect is characteristic of heavier p-block elements (Tl, Pb, Bi).", difficulty: "medium" },
  { id: "chem-34", question: "Wurtz reaction produces:", options: ["Alkene", "Higher alkane", "Alcohol", "Aldehyde"], correctAnswer: 1, subject: "Chemistry", chapter: "Hydrocarbons", explanation: "Wurtz reaction: 2R-X + 2Na → R-R + 2NaX (produces higher alkane).", difficulty: "medium" },
  { id: "chem-35", question: "The hybridization of carbon in ethylene is:", options: ["sp", "sp²", "sp³", "sp³d"], correctAnswer: 1, subject: "Chemistry", chapter: "Chemical Bonding", explanation: "Each carbon in ethylene (C₂H₄) is sp² hybridized with one unhybridized p orbital for π bond.", difficulty: "easy" },

  // Extra questions for padding larger tests
  { id: "chem-36", question: "Hess's law is related to:", options: ["Conservation of mass", "Conservation of energy", "Equilibrium", "Rate of reaction"], correctAnswer: 1, subject: "Chemistry", chapter: "Thermodynamics", explanation: "Hess's law states that total enthalpy change is independent of the path — conservation of energy.", difficulty: "easy" },
  { id: "chem-37", question: "Buffer solution resists change in:", options: ["Volume", "Temperature", "pH", "Concentration"], correctAnswer: 2, subject: "Chemistry", chapter: "Equilibrium", explanation: "Buffer solutions resist changes in pH upon addition of small amounts of acid or base.", difficulty: "easy" },
  { id: "chem-38", question: "Oxidation number of Cr in K₂Cr₂O₇ is:", options: ["+3", "+6", "+7", "+2"], correctAnswer: 1, subject: "Chemistry", chapter: "Redox Reactions", explanation: "In K₂Cr₂O₇: 2(+1) + 2(x) + 7(-2) = 0, solving x = +6.", difficulty: "medium" },
  { id: "chem-39", question: "Grignard reagent has the formula:", options: ["RMgX", "R₂Mg", "RX", "RMg"], correctAnswer: 0, subject: "Chemistry", chapter: "Organic Chemistry: Basic Principles", explanation: "Grignard reagent is RMgX (organomagnesium halide), an important organometallic compound.", difficulty: "easy" },
  { id: "chem-40", question: "Crystal field theory explains:", options: ["Color of coordination compounds", "Covalent bonding", "Ionic bonding", "Metallic bonding"], correctAnswer: 0, subject: "Chemistry", chapter: "Coordination Compounds", explanation: "CFT explains the color, magnetic properties of coordination compounds through d-orbital splitting.", difficulty: "medium" },
  { id: "chem-41", question: "Friedel-Crafts reaction requires catalyst:", options: ["FeCl₃", "AlCl₃", "ZnCl₂", "NaCl"], correctAnswer: 1, subject: "Chemistry", chapter: "Hydrocarbons", explanation: "Friedel-Crafts alkylation/acylation uses anhydrous AlCl₃ as Lewis acid catalyst.", difficulty: "medium" },
  { id: "chem-42", question: "Tollen's reagent is:", options: ["Ammoniacal AgNO₃", "Fehling solution", "Benedict's solution", "Baeyer's reagent"], correctAnswer: 0, subject: "Chemistry", chapter: "Aldehydes, Ketones and Carboxylic Acids", explanation: "Tollen's reagent is ammoniacal silver nitrate [Ag(NH₃)₂]⁺, used to test for aldehydes.", difficulty: "easy" },
  { id: "chem-43", question: "Molarity is defined as:", options: ["Moles of solute per kg solvent", "Moles of solute per litre solution", "Grams per litre", "Equivalents per litre"], correctAnswer: 1, subject: "Chemistry", chapter: "Some Basic Concepts of Chemistry", explanation: "Molarity (M) = moles of solute / volume of solution in litres.", difficulty: "easy" },
  { id: "chem-44", question: "The maximum number of electrons in a shell with n=3:", options: ["8", "18", "32", "2"], correctAnswer: 1, subject: "Chemistry", chapter: "Structure of Atom", explanation: "Maximum electrons in shell n = 2n² = 2(3²) = 18.", difficulty: "easy" },
  { id: "chem-45", question: "Which gas is used in Haber process?", options: ["O₂ and H₂", "N₂ and H₂", "CO and H₂", "N₂ and O₂"], correctAnswer: 1, subject: "Chemistry", chapter: "The p-Block Elements", explanation: "Haber process: N₂ + 3H₂ → 2NH₃ (synthesis of ammonia from nitrogen and hydrogen).", difficulty: "easy" },
];

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get questions filtered by subject
export function getQuestionsBySubject(subject: string, count?: number): TestQuestion[] {
  const filtered = questionBank.filter(q => q.subject === subject);
  const shuffled = shuffleArray(filtered);
  return count ? shuffled.slice(0, count) : shuffled;
}

// Get questions by chapter
export function getQuestionsByChapter(chapter: string, count?: number): TestQuestion[] {
  const filtered = questionBank.filter(q => q.chapter === chapter);
  const shuffled = shuffleArray(filtered);
  return count ? shuffled.slice(0, count) : shuffled;
}

// Get chapter list with question counts
export function getChaptersWithQuestions(subject: string): { chapter: string; count: number }[] {
  const chapters: Record<string, number> = {};
  questionBank.filter(q => q.subject === subject).forEach(q => {
    chapters[q.chapter] = (chapters[q.chapter] || 0) + 1;
  });
  return Object.entries(chapters).map(([chapter, count]) => ({ chapter, count }));
}

// Generate mock test for a chapter (reuses available questions, cycling if needed)
export function getMockTestQuestions(chapter: string, count: number = 50): TestQuestion[] {
  const available = questionBank.filter(q => q.chapter === chapter);
  if (available.length === 0) return [];
  const result: TestQuestion[] = [];
  while (result.length < count) {
    const shuffled = shuffleArray(available);
    result.push(...shuffled.slice(0, Math.min(count - result.length, shuffled.length)));
  }
  // Re-id to avoid duplicates
  return result.map((q, i) => ({ ...q, id: `${q.id}-mock-${i}` }));
}

// Generate worksheet for a chapter
export function getWorksheetQuestions(chapter: string, count: number = 25): TestQuestion[] {
  const available = questionBank.filter(q => q.chapter === chapter);
  if (available.length === 0) return [];
  const shuffled = shuffleArray(available);
  const result: TestQuestion[] = [];
  while (result.length < count) {
    result.push(...shuffleArray(available).slice(0, Math.min(count - result.length, available.length)));
  }
  return result.map((q, i) => ({ ...q, id: `${q.id}-ws-${i}` }));
}

// Generate weekly/monthly test (45 questions per subject)
export function getFullTestQuestions(questionsPerSubject: number = 45): TestQuestion[] {
  const subjects = ["Botany", "Zoology", "Physics", "Chemistry"];
  const allQuestions: TestQuestion[] = [];
  subjects.forEach(subject => {
    const available = questionBank.filter(q => q.subject === subject);
    const result: TestQuestion[] = [];
    while (result.length < questionsPerSubject) {
      result.push(...shuffleArray(available).slice(0, Math.min(questionsPerSubject - result.length, available.length)));
    }
    allQuestions.push(...result);
  });
  return allQuestions.map((q, i) => ({ ...q, id: `${q.id}-ft-${i}` }));
}

export { questionBank };
