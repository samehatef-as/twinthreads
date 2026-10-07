import heroJacket from "@/assets/jacket.jpg";
import heroSuit from "@/assets/suit.jpg";
import heroSweater from "@/assets/sweater.jpg";
import detail from "@/assets/detail.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

export type Size = "S" | "M" | "L" | "XL" | "XXL";

export interface ProductColor {
  id: string;
  name: string;
  /** CSS color used only for the small swatch chip */
  swatch: string;
  /** optional images specific to this color */
  images?: string[];
}

export interface ProductImage {
  src: string;
  alt: string;
  kind: "model" | "front" | "back" | "detail" | "fabric" | "label" | "lifestyle";
}

/** Variant-level inventory: key = `${colorId}/${size}` */
export type Inventory = Record<string, number>;

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  dropId: DropId;
  price: number;
  currency: "EGP";
  shortDescription: string;
  description: string;
  material: string;
  fit: string;
  details: string[];
  includes?: string[];
  colors: ProductColor[];
  sizes: Size[];
  inventory: Inventory;
  images: ProductImage[];
  featured: boolean;
  available: boolean;
}

export type DropId = "drop-01" | "drop-02" | "drop-03";

export interface Drop {
  id: DropId;
  number: string;
  title: string;
  theme: string;
  statement: string;
  image: string;
}

export const drops: Drop[] = [
  {
    id: "drop-01",
    number: "01",
    title: "Classic",
    theme: "Clean",
    statement:
      "Quiet construction. A plain front, light fabric and nothing that doesn’t need to be there.",
    image: heroJacket,
  },
  {
    id: "drop-02",
    number: "02",
    title: "Streetwear",
    theme: "Box fit",
    statement: "The other brother’s uniform. Heavy volume, matched as a set, worn like tailoring.",
    image: heroSuit,
  },
  {
    id: "drop-03",
    number: "03",
    title: "Hybrid",
    theme: "Both worlds",
    statement: "Where the two styles meet. A knit with classic restraint and a street silhouette.",
    image: heroSweater,
  },
];

export const heroSlides = [
  {
    image: hero1,
    eyebrow: "Drop 01 — Now available",
    title: ["Two styles.", "One vision."],
    copy: "Luxury streetwear designed between the classic and the street.",
    cta: { label: "Shop Drop 01", slug: "linen-jacket" },
  },
  {
    image: hero2,
    eyebrow: "Drop 02 — The Suit",
    title: ["Volume,", "worn quietly."],
    copy: "A box-fit hoodie and pant, cut as one uniform.",
    cta: { label: "Shop the Suit", slug: "the-suit" },
  },
  {
    image: hero3,
    eyebrow: "Drop 03 — Hybrid",
    title: ["Made in", "between."],
    copy: "The half-zip: classic knit, street silhouette.",
    cta: { label: "Shop Drop 03", slug: "half-zip-sweater" },
  },
] as const;

const SIZES: Size[] = ["S", "M", "L", "XL"];

function stock(colors: string[], sizes: Size[], soldOut: string[] = [], qty = 8): Inventory {
  const inv: Inventory = {};
  for (const c of colors)
    for (const s of sizes) inv[`${c}/${s}`] = soldOut.includes(`${c}/${s}`) ? 0 : qty;
  return inv;
}

export const products: Product[] = [
  {
    id: "p-001",
    sku: "TT-D01-LJ",
    slug: "linen-jacket",
    name: "Linen Jacket",
    dropId: "drop-01",
    price: 600,
    currency: "EGP",
    shortDescription: "A lightweight cotton-linen jacket with a clean, plain front.",
    description:
      "The first piece. Lightweight with a linen-like hand, cut with an adjustable side so it wears regular or boxy — your choice. No chest pleats, no extra hardware. Just the line.",
    material: "Cotton-linen blend",
    fit: "Regular or box fit, set by the side adjustment",
    details: [
      "Side elastic / drawstring adjustment",
      "Elastic cuffs",
      "Clean, plain front",
      "No chest pleats",
      "Minimal construction",
    ],
    colors: [
      { id: "white", name: "White", swatch: "oklch(0.97 0.01 90)" },
      { id: "black", name: "Black", swatch: "oklch(0.22 0 0)" },
      { id: "mint", name: "Mint", swatch: "oklch(0.86 0.06 165)" },
    ],
    sizes: SIZES,
    inventory: stock(["white", "black", "mint"], SIZES, ["mint/L", "black/XL"]),
    images: [
      { src: heroJacket, alt: "Linen Jacket worn against concrete", kind: "model" },
      { src: detail, alt: "Cotton-linen fabric with drawstring detail", kind: "fabric" },
      { src: hero1, alt: "Linen Jacket in the Twin Threads campaign", kind: "lifestyle" },
    ],
    featured: true,
    available: true,
  },
  {
    id: "p-002",
    sku: "TT-D02-ST",
    slug: "the-suit",
    name: "The Suit",
    dropId: "drop-02",
    price: 1400,
    currency: "EGP",
    shortDescription: "Hoodie and pant, cut as one box-fit set.",
    description:
      "Streetwear treated like tailoring. A heavyweight hoodie and matching pant, sold together, both cut box fit for volume that still holds its shape.",
    material: "Heavyweight cotton fleece",
    fit: "Box fit",
    includes: ["Hoodie", "Pants"],
    details: [
      "Sold as a complete set",
      "Dropped shoulder",
      "Kangaroo pocket",
      "Relaxed straight leg",
    ],
    colors: [
      {
        id: "gray-black",
        name: "Gray + Black",
        swatch: "linear-gradient(135deg, oklch(0.55 0 0) 50%, oklch(0.22 0 0) 50%)",
      },
      { id: "black-black", name: "Black + Black", swatch: "oklch(0.22 0 0)" },
      {
        id: "navy-black",
        name: "Navy + Black",
        swatch: "linear-gradient(135deg, oklch(0.3 0.06 260) 50%, oklch(0.22 0 0) 50%)",
      },
    ],
    sizes: SIZES,
    inventory: stock(["gray-black", "black-black", "navy-black"], SIZES, ["navy-black/S"]),
    images: [
      { src: heroSuit, alt: "The Suit worn on concrete stairs", kind: "model" },
      { src: hero2, alt: "The Suit in a concrete colonnade", kind: "lifestyle" },
    ],
    featured: true,
    available: true,
  },
  {
    id: "p-003",
    sku: "TT-D03-HZ",
    slug: "half-zip-sweater",
    name: "Half-Zip Sweater",
    dropId: "drop-03",
    price: 800,
    currency: "EGP",
    shortDescription: "A classic knit half-zip with a street silhouette.",
    description:
      "The hybrid. A soft knit with a short zip and a ribbed hem, cut regular with a lean toward boxy. Dressed up or down, it belongs to both brothers.",
    material: "Soft knit",
    fit: "Regular, leaning toward box fit",
    details: ["Short metal zip", "Ribbed collar, cuffs and hem", "Dropped shoulder"],
    colors: [
      { id: "light-gray", name: "Light Gray", swatch: "oklch(0.82 0 0)" },
      { id: "beige", name: "Beige", swatch: "oklch(0.86 0.04 80)" },
      { id: "black", name: "Black", swatch: "oklch(0.22 0 0)" },
      { id: "off-white", name: "Off White", swatch: "oklch(0.95 0.015 90)" },
      { id: "olive", name: "Olive", swatch: "oklch(0.45 0.05 125)", images: [hero3] },
    ],
    sizes: SIZES,
    inventory: stock(["light-gray", "beige", "black", "off-white", "olive"], SIZES, ["olive/XL"]),
    images: [
      { src: heroSweater, alt: "Half-Zip Sweater in beige, Cairo", kind: "model" },
      { src: hero3, alt: "Half-Zip Sweater in olive on a Cairo rooftop", kind: "lifestyle" },
    ],
    featured: true,
    available: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getDrop = (id: string) => drops.find((d) => d.id === id);
export const productsInDrop = (id: DropId) => products.filter((p) => p.dropId === id);
export const stockFor = (p: Product, colorId: string, size: Size) =>
  p.inventory[`${colorId}/${size}`] ?? 0;
export const formatEGP = (n: number) => `EGP ${n.toLocaleString("en-US")}`;
