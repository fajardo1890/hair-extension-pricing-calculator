/**
 * Luxury Hair Extension & Color Consultation Catalog
 * Real-world catalog data for top brands, stylist tiers, color services, and aftercare.
 */

window.EXTENSION_METHODS = [
  {
    id: "weft",
    name: "Weft Extensions",
    subtitle: "Hand-Tied, Flex & Machine",
    badge: "Most Popular",
    description: "Ultra-flat rows sewn into a silicone bead track. Creates maximum volume and natural drape with zero heat or glue.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    unitType: "rows",
    defaultUnits: 2,
    unitOptions: [
      { value: 1, label: "1 Row (Natural Volume)" },
      { value: 2, label: "2 Rows (Standard Volume & Length)" },
      { value: 3, label: "3 Rows (Max Length & Full Density)" },
      { value: 4, label: "4 Rows (Total Transformation)" }
    ],
    serviceRates: {
      newInstall: [120, 140, 160, 185, 210, 240, 275, 315, 360, 420],
      maintenance: [75, 85, 95, 110, 125, 145, 165, 190, 220, 260]
    }
  },
  {
    id: "tape-in",
    name: "Tape-In Extensions",
    subtitle: "Seamless Medical Grade",
    badge: "Fastest Install",
    description: "Featherlight pre-taped hair wefts sandwiched together. Best for fine to medium hair and effortless root blending.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
    unitType: "pieces",
    defaultUnits: 40,
    unitOptions: [
      { value: 10, label: "10 Pieces (Fill-in Sides)" },
      { value: 20, label: "20 Pieces (Half Pack)" },
      { value: 30, label: "30 Pieces (Medium Fullness)" },
      { value: 40, label: "40 Pieces (Standard Full Head)" },
      { value: 50, label: "50 Pieces (Full Head Extra Full)" },
      { value: 60, label: "60 Pieces (Thick Hair Transformation)" },
      { value: 70, label: "70 Pieces (Maximum Density)" },
      { value: 80, label: "80 Pieces (Mega Volume)" }
    ],
    serviceRates: {
      newInstall: [110, 130, 150, 175, 197, 225, 255, 290, 335, 390],
      maintenance: [65, 75, 90, 105, 120, 140, 160, 185, 215, 250]
    }
  },
  {
    id: "fusion",
    name: "Keratin Fusion (K-Tips)",
    subtitle: "Strand-by-Strand 360° Movement",
    badge: "Ultimate Freedom",
    description: "Individual strands bonded with medical keratin matching natural hair protein. High ponytails, updos, and 360° natural movement.",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80",
    unitType: "strands",
    defaultUnits: 100,
    unitOptions: [
      { value: 50, label: "50 Strands (Accent/Sides)" },
      { value: 75, label: "75 Strands (Partial Volume)" },
      { value: 100, label: "100 Strands (Standard Full Head)" },
      { value: 150, label: "150 Strands (Full Length & Density)" },
      { value: 200, label: "200 Strands (Thick Hair Transformation)" }
    ],
    serviceRates: {
      newInstall: [180, 210, 245, 280, 320, 365, 415, 475, 540, 620],
      maintenance: [90, 105, 120, 140, 160, 185, 210, 240, 275, 320]
    }
  },
  {
    id: "topper",
    name: "Crown Topper / Enhancer",
    subtitle: "Targeted Crown & Part Density",
    badge: "Specialty Care",
    description: "Breathable silk-base top piece integrated with natural hair. Ideal for crown thinning, postpartum shedding, or instant volume.",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    unitType: "piece",
    defaultUnits: 1,
    unitOptions: [
      { value: 1, label: "1 Custom Crown Piece" },
      { value: 2, label: "2 Pieces (Crown + Perimeter)" }
    ],
    serviceRates: {
      newInstall: [150, 175, 205, 235, 270, 310, 355, 410, 470, 550],
      maintenance: [95, 110, 130, 150, 175, 200, 230, 265, 305, 360]
    }
  }
];

window.STYLIST_LEVELS = [
  { level: 1, title: "Level 1: Emerging Stylist", exp: "Foundation Certified", laborMultiplier: 0.75 },
  { level: 2, title: "Level 2: Junior Stylist", exp: "1-2 Years Experience", laborMultiplier: 0.85 },
  { level: 3, title: "Level 3: Studio Stylist", exp: "2-3 Years Experience", laborMultiplier: 0.92 },
  { level: 4, title: "Level 4: Senior Stylist", exp: "3-4 Years Experience", laborMultiplier: 1.00 },
  { level: 5, title: "Level 5: Lead Artisan", exp: "4-5 Years Experience", laborMultiplier: 1.08 },
  { level: 6, title: "Level 6: Master Stylist", exp: "5-7 Years Experience", laborMultiplier: 1.18 },
  { level: 7, title: "Level 7: Senior Master", exp: "7-9 Years Experience", laborMultiplier: 1.30 },
  { level: 8, title: "Level 8: Director Stylist", exp: "10+ Years Experience", laborMultiplier: 1.45 },
  { level: 9, title: "Level 9: Executive Artist", exp: "Master Educator", laborMultiplier: 1.62 },
  { level: 10, title: "Level 10: Creative Director", exp: "Salon Partner / Specialist", laborMultiplier: 1.85 }
];

window.HAIR_BRANDS = [
  {
    id: "bellami",
    name: "Bellami Professional",
    origin: "100% Remy Human Hair • Cuticle Intact",
    types: [
      {
        id: "bellami-flex-weft",
        name: "Flex Weft",
        method: "weft",
        lengths: [
          { length: "20 inch", price: 810, wholesale: 405, grams: 160, packUnit: "160g pack" },
          { length: "24 inch", price: 1375, wholesale: 685, grams: 160, packUnit: "160g pack" }
        ]
      },
      {
        id: "bellami-hand-tied",
        name: "Hand-Tied Weft",
        method: "weft",
        lengths: [
          { length: "14 inch", price: 250, wholesale: 125, grams: 65, packUnit: "65g pack" },
          { length: "16 inch", price: 370, wholesale: 185, grams: 65, packUnit: "65g pack" },
          { length: "18 inch", price: 495, wholesale: 245, grams: 65, packUnit: "65g pack" },
          { length: "20 inch", price: 615, wholesale: 305, grams: 65, packUnit: "65g pack" },
          { length: "22 inch", price: 735, wholesale: 365, grams: 65, packUnit: "65g pack" },
          { length: "24 inch", price: 865, wholesale: 430, grams: 65, packUnit: "65g pack" }
        ]
      },
      {
        id: "bellami-volume-weft",
        name: "Volume Weft",
        method: "weft",
        lengths: [
          { length: "16 inch", price: 550, wholesale: 275, grams: 145, packUnit: "145g pack" },
          { length: "20 inch", price: 800, wholesale: 400, grams: 145, packUnit: "145g pack" },
          { length: "22 inch", price: 1045, wholesale: 520, grams: 145, packUnit: "145g pack" },
          { length: "24 inch", price: 1370, wholesale: 680, grams: 145, packUnit: "145g pack" }
        ]
      },
      {
        id: "bellami-tape-in",
        name: "Tape-In Pro",
        method: "tape-in",
        lengths: [
          { length: "16 inch", price: 145, wholesale: 72, grams: 45, packUnit: "10 tabs/pack" },
          { length: "18 inch", price: 185, wholesale: 92, grams: 50, packUnit: "10 tabs/pack" },
          { length: "20 inch", price: 225, wholesale: 112, grams: 55, packUnit: "10 tabs/pack" },
          { length: "22 inch", price: 275, wholesale: 135, grams: 60, packUnit: "10 tabs/pack" },
          { length: "24 inch", price: 320, wholesale: 160, grams: 65, packUnit: "10 tabs/pack" }
        ]
      },
      {
        id: "bellami-fusion",
        name: "Keratin Fusion Bond",
        method: "fusion",
        lengths: [
          { length: "16 inch", price: 180, wholesale: 90, grams: 25, packUnit: "25 strands/pack" },
          { length: "18 inch", price: 220, wholesale: 110, grams: 25, packUnit: "25 strands/pack" },
          { length: "20 inch", price: 260, wholesale: 130, grams: 25, packUnit: "25 strands/pack" },
          { length: "22 inch", price: 310, wholesale: 155, grams: 25, packUnit: "25 strands/pack" }
        ]
      },
      {
        id: "bellami-topper",
        name: "Silk Crown Topper",
        method: "topper",
        lengths: [
          { length: "14 inch", price: 650, wholesale: 325, grams: 85, packUnit: "1 piece" },
          { length: "18 inch", price: 850, wholesale: 425, grams: 110, packUnit: "1 piece" }
        ]
      }
    ]
  },
  {
    id: "aqua",
    name: "Aqua Hair Extensions",
    origin: "Ethically Sourced • Two-Step Conditioning Treatment",
    types: [
      {
        id: "aqua-hand-tied",
        name: "Hand Tied Weft",
        method: "weft",
        lengths: [
          { length: "18 inch", price: 265, wholesale: 130, grams: 60, packUnit: "60g pack" },
          { length: "22 inch", price: 315, wholesale: 155, grams: 60, packUnit: "60g pack" }
        ]
      },
      {
        id: "aqua-machine-weft",
        name: "Machine Weft",
        method: "weft",
        lengths: [
          { length: "18 inch", price: 395, wholesale: 195, grams: 155, packUnit: "155g pack" },
          { length: "22 inch", price: 515, wholesale: 255, grams: 155, packUnit: "155g pack" },
          { length: "24 inch", price: 685, wholesale: 340, grams: 155, packUnit: "155g pack" }
        ]
      },
      {
        id: "aqua-q-weft",
        name: "Q-Weft (Cut Anywhere)",
        method: "weft",
        lengths: [
          { length: "18 inch", price: 275, wholesale: 135, grams: 63, packUnit: "63g pack" },
          { length: "22 inch", price: 325, wholesale: 160, grams: 63, packUnit: "63g pack" },
          { length: "24 inch", price: 355, wholesale: 175, grams: 63, packUnit: "63g pack" }
        ]
      },
      {
        id: "aqua-tape-in",
        name: "Tape In Classic",
        method: "tape-in",
        lengths: [
          { length: "14 inch", price: 72, wholesale: 36, grams: 25, packUnit: "10 tabs/pack" },
          { length: "18 inch", price: 95, wholesale: 47, grams: 25, packUnit: "10 tabs/pack" },
          { length: "22 inch", price: 125, wholesale: 62, grams: 25, packUnit: "10 tabs/pack" }
        ]
      },
      {
        id: "aqua-keratin",
        name: "Keratin Fusion Bond",
        method: "fusion",
        lengths: [
          { length: "18 inch", price: 110, wholesale: 55, grams: 25, packUnit: "25 strands/pack" },
          { length: "22 inch", price: 140, wholesale: 70, grams: 25, packUnit: "25 strands/pack" }
        ]
      }
    ]
  },
  {
    id: "bombshell",
    name: "Bombshell Extensions",
    origin: "Slavic Double-Drawn Virgin Remy Hair",
    types: [
      {
        id: "bombshell-hand-tied",
        name: "Hand Tied Weft",
        method: "weft",
        lengths: [
          { length: "18 inch", price: 302.50, wholesale: 150, grams: 90, packUnit: "90g pack" },
          { length: "20 inch", price: 625, wholesale: 310, grams: 90, packUnit: "90g pack" },
          { length: "22 inch", price: 650, wholesale: 325, grams: 90, packUnit: "90g pack" },
          { length: "24 inch", price: 725, wholesale: 360, grams: 90, packUnit: "90g pack" }
        ]
      },
      {
        id: "bombshell-hybrid",
        name: "Hybrid Weft",
        method: "weft",
        lengths: [
          { length: "16 inch", price: 450, wholesale: 225, grams: 90, packUnit: "90g pack" },
          { length: "18 inch", price: 550, wholesale: 275, grams: 90, packUnit: "90g pack" },
          { length: "20 inch", price: 625, wholesale: 310, grams: 90, packUnit: "90g pack" },
          { length: "22 inch", price: 650, wholesale: 325, grams: 90, packUnit: "90g pack" }
        ]
      },
      {
        id: "bombshell-tape-in",
        name: "Invisible Tape-In",
        method: "tape-in",
        lengths: [
          { length: "18 inch", price: 165, wholesale: 82, grams: 50, packUnit: "10 tabs/pack" },
          { length: "22 inch", price: 215, wholesale: 107, grams: 50, packUnit: "10 tabs/pack" }
        ]
      }
    ]
  }
];

window.COLOR_SERVICES = [
  {
    id: "balayage",
    name: "Custom Balayage & French Gloss",
    description: "Hand-painted sun-kissed dimension with seamless shadow blend.",
    basePrices: [184, 212, 221, 226, 229, 233, 239, 242, 245, 248],
    billBowlsAs: "addtl-batch-lightner"
  },
  {
    id: "platinum",
    name: "Platinum Card / Global Lightening",
    description: "Back-to-back precision foils or global on-scalp lift.",
    basePrices: [175, 204, 210, 216, 221, 223, 226, 229, 231, 236],
    billBowlsAs: "addtl-batch-lightner"
  },
  {
    id: "highlights",
    name: "Full Dimensional Highlights",
    description: "Precision micro-weaves and slice foils root to end.",
    basePrices: [171, 199, 208, 213, 216, 218, 221, 222, 224, 225],
    billBowlsAs: "addtl-batch-lightner"
  },
  {
    id: "all-over-color",
    name: "All-Over Gloss / Demi-Permanent",
    description: "Rich monochromatic depth, high-shine, and cuticle sealing.",
    basePrices: [110, 125, 135, 142, 148, 155, 162, 170, 178, 185],
    billBowlsAs: "addtl-loreal-color"
  }
];

window.COLOR_ADDONS = [
  { id: "root-smudge", name: "Extension Root Smudge / Melt", price: 79, description: "Blends natural root depth seamlessly into extension bonds" },
  { id: "shadow-root", name: "Shadow Root", price: 79, description: "Deeper root melt for high-contrast lived-in blonde" },
  { id: "custom-root-extensions", name: "Custom Root Extensions", price: 79, description: "Specialized root blending and color matching for extensions" },
  { id: "custom-tone", name: "Toner - L'Oréal Gloss", price: 68,
    basePrices: [68, 71, 73, 76, 78, 81, 83, 86, 88, 91],
    description: "Matches tone and neutralizes brass between natural hair & extensions" },
  { id: "toner-shades", name: "Toner - Shades EQ", price: 58,
    basePrices: [58, 60, 63, 66, 68, 71, 74, 76, 79, 81],
    description: "Acidic demi-permanent gloss for translucent tone" },
  { id: "toner-xl-loreal", name: "Toner XL - L'Oréal", price: 116,
    basePrices: [116, 120, 124, 129, 133, 137, 141, 146, 150, 154],
    description: "Extended high-capacity glossing formulation for thick/long hair" },
  { id: "toner-xl-shades", name: "Toner XL - Shades EQ", price: 94,
    basePrices: [94, 99, 103, 107, 111, 116, 120, 124, 129, 133],
    description: "Extended high-capacity acidic demi-permanent gloss" },
  { id: "money-piece", name: "Money Piece / Bright Face Frame", price: 79, description: "Pops brightness framing cheekbones and hairline" },
  { id: "brow-tint", name: "Custom Brow Tint", price: 21, description: "Harmonizes eyebrows with new hair shade" },
  { id: "lowlights", name: "Dimensional Lowlights", price: 110,
    basePrices: [110, 113, 126, 134, 137, 140, 144, 147, 150, 153],
    description: "Creates depth and visual thickness throughout mid-lengths" },
  { id: "gray-coverage", name: "Opaque Gray Coverage Boost", price: 95,
    basePrices: [95, 97, 108, 115, 118, 120, 124, 126, 128, 131],
    description: "100% targeted coverage for resistant grays" },
  { id: "color-remover", name: "Color Remover", price: 94,
    basePrices: [94, 99, 103, 107, 111, 116, 120, 124, 129, 133],
    description: "Gentle extraction of previous artificial pigment without bleaching" }
];

window.KERATIN_SERVICES = [
  { id: "", name: "None", price: 0, wholesale: 0, chairHours: 0, basePrices: [0,0,0,0,0,0,0,0,0,0] },
  { id: "keratin-express", name: "Keratin Express Smoothing", price: 175, wholesale: 45, chairHours: 1.0,
    basePrices: [131, 161, 193, 193, 203, 214, 223, 233, 246, 255] },
  { id: "keratin-full", name: "Full Keratin Complex Smoothing", price: 350, wholesale: 85, chairHours: 2.0,
    basePrices: [378, 408, 440, 471, 482, 493, 503, 503, 503, 503] },
  { id: "brazilian-blowout", name: "Brazilian Blowout Professional", price: 325, wholesale: 80, chairHours: 2.0,
    basePrices: [756, 816, 880, 942, 964, 985, 1007, 1007, 1007, 1007] }
];

window.HAIRCUT_SERVICES = [
  { id: "", name: "None", price: 0, wholesale: 0, chairHours: 0, basePrices: [0,0,0,0,0,0,0,0,0,0] },
  { id: "haircut-blending", name: "Haircut with Extensions (no blowout)", price: 53, wholesale: 5, chairHours: 0.75,
    basePrices: [44, 46, 48, 51, 53, 54, 55, 57, 59, 62] },
  { id: "haircut-designer", name: "Precision Haircut (no blowout)", price: 82, wholesale: 5, chairHours: 1.0,
    basePrices: [64, 69, 75, 81, 82, 85, 87, 89, 91, 93] },
  { id: "haircut-restyle", name: "Haircut + Blowout & Style", price: 106, wholesale: 5, chairHours: 1.25,
    basePrices: [84, 90, 98, 105, 106, 110, 113, 115, 118, 121] }
];

window.BLOWOUT_SERVICES = [
  { id: "", name: "None", price: 0, wholesale: 0, chairHours: 0, basePrices: [0,0,0,0,0,0,0,0,0,0] },
  { id: "blowout-signature", name: "Luxury Blowout & Style", price: 65, wholesale: 5, chairHours: 0.75,
    basePrices: [65,65,65,65,65,65,65,65,65,65] },
  { id: "blowout-silk", name: "Blowout & Style with Extensions", price: 76, wholesale: 8, chairHours: 1.0,
    basePrices: [76,76,76,76,76,76,76,76,76,76] },
  { id: "blowout-luxury", name: "Blowout & Style XX Extensions", price: 86, wholesale: 15, chairHours: 1.0,
    basePrices: [86,86,86,86,86,86,86,86,86,86] }
];

window.LUXURY_TREATMENTS = [
  { id: "k18", name: "K18 Peptide Molecular Repair", price: 40, description: "Reverses chemical and heat damage in 4 minutes" },
  { id: "fusio-dose", name: "Kérastase Fusio-Dose Concentrate", price: 40, description: "Custom dual-action cocktail for instant fiber transformation" },
  { id: "metal-detox", name: "L'Oréal Metal Detox Protocol", price: 35, description: "Neutralizes copper deposits inside hair before lifting" },
  { id: "oribe-masque", name: "Oribe Gold Lust Power Drops & Masque", price: 35, description: "Restores elasticity and high-lacquer shine" },
  { id: "b3-bonder", name: "b3 Brazilian Bond Builder Treatment", price: 45, description: "Reattaches hair bonds during and after chemical lifting" }
];

window.AFTERCARE_PRODUCTS = [
  { id: "kit-complete", name: "Atelier Signature Care Kit", price: 120, wholesale: 60, popular: true, active: true, description: "Loop brush, silk pillowcase, sulfate-free wash & leave-in moisture spray." },
  { id: "brush", name: "Vegan Boar & Loop Brush", price: 32, wholesale: 16, active: true, description: "Gentle on attachment points, detangles without pulling beads." },
  { id: "silk-pillowcase", name: "100% Mulberry Silk Pillowcase", price: 48, wholesale: 24, active: true, description: "Prevents friction tangling and preserves extension lifespan." },
  { id: "serum", name: "Cuticle Sealing Bond Oil (50ml)", price: 38, wholesale: 19, active: true, description: "Weightless nutrition that keeps extension ends silky." }
];

/**
 * Additional bowl types — named product with flat price used when
 * "Extra bowls" is triggered. Each COLOR_SERVICE references one via billBowlsAs.
 */
window.ADDITIONAL_BOWLS = [
  { id: "addtl-batch-lightner",    name: "Addtl Batch Lightner",         price: 41 },
  { id: "addtl-batch-lightner-xl", name: "Addtl Batch Lightner XL",      price: 81 },
  { id: "addtl-loreal-color",      name: "Additional L'Oréal Color",      price: 54 },
  { id: "addtl-loreal-color-xl",   name: "Additional L'Oréal Color XL",   price: 89 },
  { id: "addtl-pulpriot-color",    name: "Additional Pulpriot Color",     price: 43 },
  { id: "addtl-pulpriot-color-xl", name: "Additional Pulpriot Color XL",  price: 86 },
  { id: "addtl-shades-color",      name: "Additional Shades Color",       price: 43 }
];

/**
 * Full 10-tier service pricing defaults (mirrors admin screenshots).
 * Calculator reads from localStorage first, falls back to these.
 * Structure: categories → array of service objects with id, name, prices[10].
 */
window.SERVICE_PRICING_DEFAULTS = {
  lightening: [
    { id: "balayage",             name: "Balayage",                 prices: [184,212,221,226,229,233,239,242,245,248], billAs: "addtl-batch-lightner",    extraBowls: true },
    { id: "platinum",             name: "Platinum",                 prices: [175,204,210,216,221,223,226,229,231,236], billAs: "addtl-batch-lightner",    extraBowls: true },
    { id: "highlights",           name: "Highlights",               prices: [171,199,208,213,216,218,221,222,224,225], billAs: "addtl-batch-lightner",    extraBowls: true },
    { id: "highlights-lowlights", name: "Highlights & Lowlights",   prices: [225,252,260,265,268,270,273,274,275,277], billAs: "addtl-batch-lightner",    extraBowls: true }
  ],
  color: [
    { id: "all-over-color",  name: "All Over Color",   prices: [148,151,167,177,180,184,188,193,195,200], billAs: "addtl-loreal-color", extraBowls: true },
    { id: "gray-coverage",   name: "Gray Coverage",    prices: [95,97,108,115,118,120,124,126,128,131],   billAs: "addtl-loreal-color", extraBowls: true },
    { id: "color-lowlights", name: "Lowlights",        prices: [110,113,126,134,137,140,144,147,150,153], billAs: "addtl-loreal-color", extraBowls: true },
    { id: "mens-color",      name: "Men's Color",      prices: [95,97,108,115,118,120,124,126,128,131],   billAs: "addtl-loreal-color", extraBowls: true },
    { id: "root-touch-up",   name: "Root Touch Up",    prices: [95,97,108,115,118,120,124,126,128,131],   billAs: "addtl-loreal-color", extraBowls: true },
    { id: "single-process",  name: "Single Process",   prices: [95,97,108,115,118,120,124,126,128,131],   billAs: "addtl-loreal-color", extraBowls: true }
  ],
  addon: [
    { id: "brow-tint",             name: "Brow Tint",                 prices: [21,21,21,21,21,21,21,21,21,21],            billAs: null, extraBowls: false },
    { id: "custom-root-extensions",name: "Custom Root Extensions",    prices: [79,79,79,79,79,79,79,79,79,79],            billAs: null, extraBowls: false },
    { id: "money-piece",           name: "Money Piece / Faceframe",   prices: [79,79,79,79,79,79,79,79,79,79],            billAs: null, extraBowls: false },
    { id: "root-smudge",           name: "Root Smudge",               prices: [79,79,79,79,79,79,79,79,79,79],            billAs: null, extraBowls: false },
    { id: "shadow-root",           name: "Shadow Root",               prices: [79,79,79,79,79,79,79,79,79,79],            billAs: null, extraBowls: false },
    { id: "custom-tone",           name: "Toner - L'Oréal",           prices: [68,71,73,76,78,81,83,86,88,91],            billAs: null, extraBowls: false },
    { id: "toner-shades",          name: "Toner - Shades EQ",         prices: [58,60,63,66,68,71,74,76,79,81],            billAs: null, extraBowls: false },
    { id: "toner-xl-loreal",       name: "Toner XL - L'Oréal",        prices: [116,120,124,129,133,137,141,146,150,154],  billAs: null, extraBowls: false },
    { id: "toner-xl-shades",       name: "Toner XL - Shades EQ",      prices: [94,99,103,107,111,116,120,124,129,133],    billAs: null, extraBowls: false },
    { id: "lowlights",             name: "Lowlights",                 prices: [110,113,126,134,137,140,144,147,150,153],  billAs: "addtl-loreal-color", extraBowls: true },
    { id: "gray-coverage",         name: "Gray Coverage",             prices: [95,97,108,115,118,120,124,126,128,131],    billAs: "addtl-loreal-color", extraBowls: true },
    { id: "color-remover",         name: "Color Remover",             prices: [94,99,103,107,111,116,120,124,129,133],    billAs: null, extraBowls: false }
  ],
  bowls: [
    { id: "addtl-batch-lightner",    name: "Addtl Batch Lightner",        prices: [41,41,41,41,41,41,41,41,41,41] },
    { id: "addtl-batch-lightner-xl", name: "Addtl Batch Lightner XL",     prices: [81,81,81,81,81,81,81,81,81,81] },
    { id: "addtl-loreal-color",      name: "Additional L'Oréal Color",     prices: [54,54,54,54,54,54,54,54,54,54] },
    { id: "addtl-loreal-color-xl",   name: "Additional L'Oréal Color XL",  prices: [89,89,89,89,89,89,89,89,89,89] },
    { id: "addtl-pulpriot-color",    name: "Additional Pulpriot Color",    prices: [43,43,43,43,43,43,43,43,43,43] },
    { id: "addtl-pulpriot-color-xl", name: "Additional Pulpriot Color XL", prices: [86,86,86,86,86,86,86,86,86,86] },
    { id: "addtl-shades-color",      name: "Additional Shades Color",      prices: [43,43,43,43,43,43,43,43,43,43] }
  ],
  keratin: [
    { id: "keratin-express", name: "Keratin Express Smoothing",      prices: [131,161,193,193,203,214,223,233,246,255] },
    { id: "keratin-full",    name: "Full Keratin Complex Smoothing", prices: [378,408,440,471,482,493,503,503,503,503] },
    { id: "brazilian-blowout", name: "Brazilian Blowout Professional", prices: [756,816,880,942,964,985,1007,1007,1007,1007] }
  ],
  treatments: [
    { id: "k18",        name: "K18 Treatment",            prices: [40,40,40,40,40,40,40,40,40,40] },
    { id: "fusio-dose", name: "Fusiodose Treatment",       prices: [40,40,40,40,40,40,40,40,40,40] },
    { id: "metal-detox",name: "Metal Detox Treatment",     prices: [35,35,35,35,35,35,35,35,35,35] },
    { id: "oribe-masque",name: "Oribe Masque Treatment",  prices: [30,30,30,30,30,30,30,30,30,30] },
    { id: "b3-bonder",  name: "b3 Bond Builder Treatment", prices: [45,45,45,45,45,45,45,45,45,45] }
  ],
  haircuts: [
    { id: "haircut-blending", name: "Haircut with Extensions (no blowout)", prices: [44,46,48,51,53,54,55,57,59,62] },
    { id: "haircut-designer", name: "Precision Haircut (no blowout)",       prices: [64,69,75,81,82,85,87,89,91,93] },
    { id: "haircut-restyle",  name: "Haircut + Blowout & Style",            prices: [84,90,98,105,106,110,113,115,118,121] }
  ],
  blowouts: [
    { id: "blowout-signature", name: "Luxury Blowout & Style",          prices: [65,65,65,65,65,65,65,65,65,65] },
    { id: "blowout-silk",      name: "Blowout & Style with Extensions", prices: [76,76,76,76,76,76,76,76,76,76] },
    { id: "blowout-luxury",    name: "Blowout & Style XX Extensions",   prices: [86,86,86,86,86,86,86,86,86,86] }
  ]
};