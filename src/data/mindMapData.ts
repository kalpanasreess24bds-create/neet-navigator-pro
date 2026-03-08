export interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
}

export interface MindMapData {
  chapterId: string;
  root: MindMapNode;
}

export const mindMapData: Record<string, MindMapNode> = {
  "b11-1": {
    id: "root",
    label: "The Living World",
    children: [
      {
        id: "diversity",
        label: "Biodiversity",
        children: [
          { id: "d1", label: "Number of species" },
          { id: "d2", label: "Nomenclature" },
          { id: "d3", label: "ICBN / ICZN rules" },
        ],
      },
      {
        id: "taxonomy",
        label: "Taxonomy",
        children: [
          { id: "t1", label: "Classification" },
          { id: "t2", label: "Identification" },
          { id: "t3", label: "Systematics" },
        ],
      },
      {
        id: "taxon-hierarchy",
        label: "Taxonomic Hierarchy",
        children: [
          { id: "th1", label: "Kingdom" },
          { id: "th2", label: "Phylum / Division" },
          { id: "th3", label: "Class > Order > Family" },
          { id: "th4", label: "Genus > Species" },
        ],
      },
      {
        id: "tools",
        label: "Taxonomic Aids",
        children: [
          { id: "to1", label: "Herbarium" },
          { id: "to2", label: "Botanical Garden" },
          { id: "to3", label: "Museum & Zoo" },
          { id: "to4", label: "Taxonomic Keys" },
        ],
      },
    ],
  },
  "b11-2": {
    id: "root",
    label: "Biological Classification",
    children: [
      {
        id: "kingdoms",
        label: "Five Kingdoms",
        children: [
          { id: "k1", label: "Monera" },
          { id: "k2", label: "Protista" },
          { id: "k3", label: "Fungi" },
          { id: "k4", label: "Plantae" },
          { id: "k5", label: "Animalia" },
        ],
      },
      {
        id: "monera",
        label: "Monera Details",
        children: [
          { id: "m1", label: "Bacteria types" },
          { id: "m2", label: "Archaebacteria" },
          { id: "m3", label: "Cyanobacteria" },
        ],
      },
      {
        id: "viruses",
        label: "Viruses & Viroids",
        children: [
          { id: "v1", label: "TMV, Bacteriophage" },
          { id: "v2", label: "Prions" },
        ],
      },
    ],
  },
  "b11-7": {
    id: "root",
    label: "Cell: Unit of Life",
    children: [
      {
        id: "cell-theory",
        label: "Cell Theory",
        children: [
          { id: "ct1", label: "Schleiden & Schwann" },
          { id: "ct2", label: "Virchow's contribution" },
        ],
      },
      {
        id: "cell-types",
        label: "Cell Types",
        children: [
          { id: "cy1", label: "Prokaryotic" },
          { id: "cy2", label: "Eukaryotic" },
        ],
      },
      {
        id: "organelles",
        label: "Cell Organelles",
        children: [
          { id: "o1", label: "Nucleus" },
          { id: "o2", label: "Mitochondria" },
          { id: "o3", label: "ER & Golgi" },
          { id: "o4", label: "Lysosomes" },
          { id: "o5", label: "Ribosomes" },
        ],
      },
      {
        id: "membrane",
        label: "Cell Membrane",
        children: [
          { id: "cm1", label: "Fluid Mosaic Model" },
          { id: "cm2", label: "Transport mechanisms" },
        ],
      },
    ],
  },
  "c11-1": {
    id: "root",
    label: "Basic Concepts of Chemistry",
    children: [
      {
        id: "matter",
        label: "Matter",
        children: [
          { id: "ma1", label: "States of Matter" },
          { id: "ma2", label: "Mixtures & Compounds" },
        ],
      },
      {
        id: "laws",
        label: "Laws of Chemistry",
        children: [
          { id: "l1", label: "Law of Conservation" },
          { id: "l2", label: "Law of Definite Proportions" },
          { id: "l3", label: "Law of Multiple Proportions" },
        ],
      },
      {
        id: "mole",
        label: "Mole Concept",
        children: [
          { id: "mc1", label: "Avogadro's Number" },
          { id: "mc2", label: "Molar Mass" },
          { id: "mc3", label: "Molarity & Molality" },
        ],
      },
      {
        id: "stoich",
        label: "Stoichiometry",
        children: [
          { id: "s1", label: "Limiting Reagent" },
          { id: "s2", label: "Percentage Yield" },
        ],
      },
    ],
  },
  "c11-4": {
    id: "root",
    label: "Chemical Bonding",
    children: [
      {
        id: "ionic",
        label: "Ionic Bond",
        children: [
          { id: "i1", label: "Lattice Energy" },
          { id: "i2", label: "Born-Haber Cycle" },
        ],
      },
      {
        id: "covalent",
        label: "Covalent Bond",
        children: [
          { id: "co1", label: "Sigma & Pi bonds" },
          { id: "co2", label: "Bond Order" },
          { id: "co3", label: "Resonance" },
        ],
      },
      {
        id: "hybrid",
        label: "Hybridization",
        children: [
          { id: "h1", label: "sp, sp2, sp3" },
          { id: "h2", label: "sp3d, sp3d2" },
        ],
      },
      {
        id: "vsepr",
        label: "VSEPR Theory",
        children: [
          { id: "vs1", label: "Molecular Geometry" },
          { id: "vs2", label: "Lone Pair Effects" },
        ],
      },
    ],
  },
  "p11-1": {
    id: "root",
    label: "Units & Measurements",
    children: [
      {
        id: "si",
        label: "SI Units",
        children: [
          { id: "si1", label: "7 Base Units" },
          { id: "si2", label: "Derived Units" },
        ],
      },
      {
        id: "dim",
        label: "Dimensional Analysis",
        children: [
          { id: "da1", label: "Dimensional Formula" },
          { id: "da2", label: "Applications" },
          { id: "da3", label: "Limitations" },
        ],
      },
      {
        id: "errors",
        label: "Errors in Measurement",
        children: [
          { id: "e1", label: "Systematic Errors" },
          { id: "e2", label: "Random Errors" },
          { id: "e3", label: "Significant Figures" },
        ],
      },
    ],
  },
  "p11-4": {
    id: "root",
    label: "Laws of Motion",
    children: [
      {
        id: "newton",
        label: "Newton's Laws",
        children: [
          { id: "n1", label: "First Law - Inertia" },
          { id: "n2", label: "Second Law - F=ma" },
          { id: "n3", label: "Third Law - Action-Reaction" },
        ],
      },
      {
        id: "friction",
        label: "Friction",
        children: [
          { id: "f1", label: "Static Friction" },
          { id: "f2", label: "Kinetic Friction" },
          { id: "f3", label: "Rolling Friction" },
        ],
      },
      {
        id: "circular",
        label: "Circular Motion",
        children: [
          { id: "cm1", label: "Centripetal Force" },
          { id: "cm2", label: "Banking of Roads" },
        ],
      },
    ],
  },
};
