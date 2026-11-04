/** Авторские SVG-иллюстрации в палитре сайта. Это рисунки, а не фотографии. */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const svg = (viewBox: string, props: P) => ({
  viewBox,
  "aria-hidden": true,
  focusable: false,
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
});

const C = {
  milk: "#FFFDF7",
  mint: "#A8DCC8",
  mintSoft: "#E6F5EE",
  mintDeep: "#6FBFA3",
  sun: "#FFD978",
  sunDeep: "#F7BE4F",
  peach: "#FFBDA7",
  peachDeep: "#F2947A",
  pine: "#244A40",
  leaf: "#3F7F6B",
};

export const Sun = (p: P) => (
  <svg {...svg("0 0 100 100", p)}>
    <g stroke={C.sunDeep} strokeWidth="6" strokeLinecap="round">
      <path d="M50 6v11M50 83v11M6 50h11M83 50h11M19 19l8 8M73 73l8 8M19 81l8-8M73 27l8-8" />
    </g>
    <circle cx="50" cy="50" r="24" fill={C.sun} />
    <path d="M41 54c3 5 15 5 18 0" stroke={C.pine} strokeWidth="3" strokeLinecap="round" />
    <circle cx="42" cy="45" r="2.6" fill={C.pine} />
    <circle cx="58" cy="45" r="2.6" fill={C.pine} />
  </svg>
);

export const Cloud = (p: P) => (
  <svg {...svg("0 0 120 70", p)}>
    <path
      d="M28 62a22 22 0 0 1-3-43.8A28 28 0 0 1 77 14a20 20 0 0 1 22 18 16 16 0 0 1-4 30H28Z"
      fill={C.milk}
      stroke={C.mint}
      strokeWidth="4"
    />
  </svg>
);

export const Star = ({ color = C.sun, ...p }: P & { color?: string }) => (
  <svg {...svg("0 0 60 60", p)}>
    <path
      d="M30 5c3 13 8 19 25 25-17 6-22 12-25 25-3-13-8-19-25-25 17-6 22-12 25-25Z"
      fill={color}
    />
  </svg>
);

export const Flower = ({ color = C.peach, ...p }: P & { color?: string }) => (
  <svg {...svg("0 0 80 80", p)}>
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse key={r} cx="40" cy="20" rx="13" ry="17" fill={color} transform={`rotate(${r} 40 40)`} />
    ))}
    <circle cx="40" cy="40" r="11" fill={C.sun} />
  </svg>
);

export const Kite = (p: P) => (
  <svg {...svg("0 0 100 140", p)}>
    <path d="M50 4 88 46 50 92 12 46 50 4Z" fill={C.peach} />
    <path d="M50 4v88L12 46 50 4Z" fill={C.peachDeep} />
    <path d="M50 92c-12 10 12 16 0 26s6 14 2 18" stroke={C.pine} strokeWidth="3" strokeLinecap="round" />
    <path d="M36 108l14 4 12-8" stroke={C.mintDeep} strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const PaperPlane = (p: P) => (
  <svg {...svg("0 0 100 80", p)}>
    <path d="M4 34 96 4 66 74 44 50 4 34Z" fill={C.milk} stroke={C.pine} strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M44 50 96 4 52 64l-8-14Z" fill={C.mint} stroke={C.pine} strokeWidth="3.5" strokeLinejoin="round" />
  </svg>
);

export const Squiggle = (p: P) => (
  <svg {...svg("0 0 220 16", { preserveAspectRatio: "none", ...p })}>
    <path d="M3 10c24-9 34-9 54 0s30 8 54 0 34-8 54 0 34 7 52-1" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

/** Волна-переход между разделами */
export const Wave = ({ fill, variant = 0, className }: { fill: string; variant?: 0 | 1 | 2; className?: string }) => {
  const paths = [
    "M0 64V30c180 34 340 34 560 8s420-38 880 2v24H0Z",
    "M0 64V42c260-46 500-34 760-8s460 26 680-12v42H0Z",
    "M0 64V22c220 30 420 42 660 14s520-22 780 18v10H0Z",
  ];
  return (
    <svg
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      aria-hidden
      focusable={false}
      className={`block h-8 w-full lg:h-14 ${className ?? ""}`}
    >
      <path d={paths[variant]} fill={fill} />
    </svg>
  );
};

/** Заглушка главной фотографии: Алатау, холмы и дом. Показывается, пока нет main-page.png */
export const HeroScene = (p: P) => (
  <svg {...svg("0 0 640 640", { preserveAspectRatio: "xMidYMid slice", ...p })}>
    <rect width="640" height="640" fill={C.mintSoft} />
    <path d="M0 360 130 190l80 90 90-140 120 150 70-70 150 160v260H0V360Z" fill={C.mint} />
    <path d="m130 190-36 47 26-8 18 20 16-18 22 12-46-53ZM300 140l-46 72 28-12 20 22 22-20 30 12-54-74Z" fill={C.milk} />
    <path d="M0 420c130-60 280-70 400-30s170 30 240-6v256H0V420Z" fill={C.mintDeep} opacity=".7" />
    <path d="M0 480c170-50 340-40 640 10v150H0V480Z" fill={C.leaf} opacity=".85" />
    {/* дом */}
    <rect x="190" y="340" width="240" height="170" rx="16" fill={C.milk} />
    <path d="M170 350 310 250l140 100a10 10 0 0 1-6 18H176a10 10 0 0 1-6-18Z" fill={C.peachDeep} />
    <rect x="288" y="420" width="50" height="90" rx="25" fill={C.sun} />
    <circle cx="326" cy="468" r="4" fill={C.pine} />
    <rect x="218" y="396" width="46" height="46" rx="14" fill={C.mint} />
    <rect x="360" y="396" width="46" height="46" rx="14" fill={C.mint} />
    <circle cx="310" cy="316" r="20" fill={C.sun} />
    {/* дерево */}
    <rect x="490" y="420" width="18" height="96" rx="9" fill={C.pine} />
    <circle cx="499" cy="390" r="56" fill={C.mintDeep} />
    <circle cx="470" cy="420" r="34" fill={C.mint} />
    <circle cx="482" cy="378" r="7" fill={C.peach} />
    <circle cx="520" cy="410" r="7" fill={C.peach} />
    {/* передний план */}
    <path d="M0 540c150-30 330-34 640 4v96H0V540Z" fill={C.pine} />
    {[70, 130, 540, 590].map((x, i) => (
      <g key={x} transform={`translate(${x} ${i % 2 ? 556 : 566})`}>
        <path d="M0 0v30" stroke={C.mint} strokeWidth="4" strokeLinecap="round" />
        <circle r="12" fill={i % 2 ? C.sun : C.peach} />
        <circle r="4" fill={C.milk} />
      </g>
    ))}
    <path d="M110 150c20-14 34-14 50 0M180 110c14-10 24-10 36 0" stroke={C.pine} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

/** Заглушка для main-page2 в разделе «О нас» */
export const AboutScene = (p: P) => (
  <svg {...svg("0 0 800 600", { preserveAspectRatio: "xMidYMid slice", ...p })}>
    <rect width="800" height="600" fill={C.sun} opacity=".55" />
    <circle cx="640" cy="130" r="170" fill={C.peach} opacity=".55" />
    <path d="M0 440c170-60 340-60 800 0v160H0V440Z" fill={C.mint} />
    {/* кубики */}
    <rect x="150" y="360" width="110" height="110" rx="22" fill={C.peachDeep} />
    <rect x="270" y="360" width="110" height="110" rx="22" fill={C.milk} />
    <rect x="210" y="240" width="110" height="110" rx="22" fill={C.mintDeep} />
    <path d="M186 415h38M205 396v38" stroke={C.milk} strokeWidth="9" strokeLinecap="round" />
    <circle cx="325" cy="415" r="22" fill={C.sunDeep} />
    <path d="m265 268 14 28 18 2-20 20" stroke={C.milk} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    {/* книга */}
    <path d="M450 330c50-26 90-26 130 0 40-26 80-26 130 0v150c-50-26-90-26-130 0-40-26-80-26-130 0V330Z" fill={C.milk} stroke={C.pine} strokeWidth="6" strokeLinejoin="round" />
    <path d="M580 330v150" stroke={C.pine} strokeWidth="6" />
    <path d="M480 370c25-10 45-10 70 0M480 410c25-10 45-10 70 0M610 370c25-10 45-10 70 0M610 410c25-10 45-10 70 0" stroke={C.mintDeep} strokeWidth="8" strokeLinecap="round" />
    <circle cx="120" cy="120" r="34" fill={C.milk} />
    <circle cx="440" cy="110" r="20" fill={C.milk} />
  </svg>
);

/* —— Группы: один образ роста — росток, деревце, большое дерево —— */

export const SproutArt = (p: P) => (
  <svg {...svg("0 0 200 200", p)}>
    <path d="M100 120V76" stroke={C.leaf} strokeWidth="8" strokeLinecap="round" />
    <path d="M100 88C74 88 58 72 56 46c28 0 44 16 44 42Z" fill={C.mintDeep} />
    <path d="M100 76c2-22 18-36 44-36 0 26-16 40-44 36Z" fill={C.leaf} />
    <path d="M58 120h84l-9 54a12 12 0 0 1-12 10H79a12 12 0 0 1-12-10l-9-54Z" fill={C.peachDeep} />
    <rect x="50" y="110" width="100" height="22" rx="11" fill={C.peach} />
    <circle cx="86" cy="152" r="3.5" fill={C.pine} />
    <circle cx="114" cy="152" r="3.5" fill={C.pine} />
    <path d="M92 162c4 5 12 5 16 0" stroke={C.pine} strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export const SaplingArt = (p: P) => (
  <svg {...svg("0 0 200 200", p)}>
    <path d="M28 176c40-14 104-14 144 0v8H28v-8Z" fill={C.mintDeep} />
    <path d="M100 172V96M100 132l-24-20M100 118l26-22" stroke={C.pine} strokeWidth="8" strokeLinecap="round" />
    <circle cx="100" cy="66" r="42" fill={C.leaf} />
    <circle cx="66" cy="96" r="26" fill={C.mintDeep} />
    <circle cx="134" cy="86" r="28" fill={C.mintDeep} />
    <circle cx="88" cy="58" r="6" fill={C.sun} />
    <circle cx="118" cy="74" r="6" fill={C.sun} />
    <path d="M150 42c10-8 18-8 24 0-6 10-16 12-24 8l-6 2 6-10Z" fill={C.peachDeep} />
    <circle cx="165" cy="42" r="2.5" fill={C.pine} />
  </svg>
);

export const TreeArt = (p: P) => (
  <svg {...svg("0 0 200 200", p)}>
    <path d="M14 178c50-16 122-16 172 0v8H14v-8Z" fill={C.leaf} />
    <path d="M90 176c6-24 6-44 2-68h20c-4 24-4 44 2 68H90Z" fill={C.pine} />
    <circle cx="100" cy="68" r="52" fill={C.leaf} />
    <circle cx="52" cy="92" r="34" fill={C.mintDeep} />
    <circle cx="148" cy="92" r="34" fill={C.mintDeep} />
    <circle cx="100" cy="106" r="30" fill={C.leaf} />
    {[
      [78, 50],
      [122, 42],
      [50, 88],
      [150, 84],
      [104, 90],
    ].map(([x, y]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill={C.peach} />
    ))}
    <path d="m168 14 18 18-18 22-18-22 18-22Z" fill={C.sun} />
    <path d="M168 54c-6 10 6 12 0 22" stroke={C.pine} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const groupArt = { sprout: SproutArt, sapling: SaplingArt, tree: TreeArt } as const;

/** Тарелка: пять ягод по краю — пять приёмов пищи */
export const MealArt = (p: P) => (
  <svg {...svg("0 0 220 220", p)}>
    <circle cx="110" cy="110" r="96" fill={C.milk} />
    <circle cx="110" cy="110" r="66" fill={C.mintSoft} stroke={C.mint} strokeWidth="5" />
    {[0, 72, 144, 216, 288].map((r) => (
      <circle key={r} cx="110" cy="31" r="10" fill={C.peachDeep} transform={`rotate(${r} 110 110)`} />
    ))}
    <path d="M110 150c-26 0-38-20-34-40 4-16 22-20 34-10 12-10 30-6 34 10 4 20-8 40-34 40Z" fill={C.peach} />
    <path d="M110 100c0-12 6-18 18-22" stroke={C.leaf} strokeWidth="6" strokeLinecap="round" />
    <path d="M122 84c10-6 22-4 28 6-10 6-22 4-28-6Z" fill={C.mintDeep} />
  </svg>
);

/* —— Заглушки галереи: явно рисунки, а не выдуманные фотографии —— */

const Blocks = (p: P) => (
  <svg {...svg("0 0 200 200", p)}>
    <rect x="30" y="104" width="66" height="66" rx="14" fill={C.peachDeep} />
    <rect x="104" y="104" width="66" height="66" rx="14" fill={C.milk} />
    <rect x="66" y="32" width="66" height="66" rx="14" fill={C.mintDeep} />
  </svg>
);
const Crayons = (p: P) => (
  <svg {...svg("0 0 200 200", p)}>
    <g transform="rotate(-18 100 100)">
      <rect x="52" y="58" width="24" height="96" rx="6" fill={C.peachDeep} />
      <path d="m52 58 12-24 12 24H52Z" fill={C.pine} />
    </g>
    <rect x="88" y="58" width="24" height="100" rx="6" fill={C.leaf} />
    <path d="m88 58 12-26 12 26H88Z" fill={C.pine} />
    <g transform="rotate(18 100 100)">
      <rect x="124" y="58" width="24" height="96" rx="6" fill={C.sunDeep} />
      <path d="m124 58 12-24 12 24h-24Z" fill={C.pine} />
    </g>
  </svg>
);
const Ball = (p: P) => (
  <svg {...svg("0 0 200 200", p)}>
    <circle cx="100" cy="100" r="66" fill={C.milk} />
    <path d="M100 34a66 66 0 0 1 0 132c-30-40-30-92 0-132Z" fill={C.peach} />
    <path d="M42 72c36 18 80 18 116 0" stroke={C.pine} strokeWidth="5" strokeLinecap="round" />
  </svg>
);
const House = (p: P) => (
  <svg {...svg("0 0 200 200", p)}>
    <rect x="50" y="90" width="100" height="78" rx="10" fill={C.milk} />
    <path d="M36 96 100 40l64 56a6 6 0 0 1-4 10H40a6 6 0 0 1-4-10Z" fill={C.peachDeep} />
    <rect x="86" y="118" width="28" height="50" rx="14" fill={C.sun} />
  </svg>
);

export const galleryPlaceholders = [
  { Art: House, tone: "bg-mint", ratio: "aspect-[4/5]", shape: "leaf-a" },
  { Art: Crayons, tone: "bg-sun", ratio: "aspect-square", shape: "leaf-b" },
  { Art: Sun, tone: "bg-peach", ratio: "aspect-[5/4]", shape: "pebble" },
  { Art: Blocks, tone: "bg-sun-soft", ratio: "aspect-[5/4]", shape: "leaf-b" },
  { Art: Ball, tone: "bg-mint-soft", ratio: "aspect-[4/5]", shape: "pebble" },
  { Art: SproutArt, tone: "bg-peach-soft", ratio: "aspect-square", shape: "leaf-a" },
];
