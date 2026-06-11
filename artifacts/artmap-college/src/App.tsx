import { useState, useEffect, useRef, useCallback } from "react";
import { useLang, LangProvider } from "./i18n/LangContext";
import { WorldMap } from "./WorldMap";

// ─── PREMIUM SVG ICONS ────────────────────────────────────────────────────────

function IconCompass({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={color} stroke="none" opacity={0.7} />
    </svg>
  );
}

function IconMap({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

function IconPassport({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="11" r="3" />
      <path d="M8 17h8" />
      <path d="M9 7h6" />
    </svg>
  );
}

function IconUser({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconSearch({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconStar({ size = 18, color = "currentColor", filled = false }: { size?: number; color?: string; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconHeart({ size = 18, color = "currentColor", filled = false }: { size?: number; color?: string; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconX({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconSparkle({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" opacity={0.9} />
      <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z" opacity={0.6} />
      <path d="M5 14l.75 2.25L8 17l-2.25.75L5 20l-.75-2.25L2 17l2.25-.75L5 14z" opacity={0.4} />
    </svg>
  );
}

function IconGlobe({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconArrow({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IconCheck({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconCalendar({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconArtwork({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill={color} stroke="none" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function IconTrophy({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
    </svg>
  );
}

function IconDice({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="8.5" cy="8.5" r="1.5" fill={color} stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.5" fill={color} stroke="none" />
      <circle cx="15.5" cy="15.5" r="1.5" fill={color} stroke="none" />
      <circle cx="8.5" cy="15.5" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

function IconBell({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconMoon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function IconPlane({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4c-2 0-2 0-3.5 1.5L11 9 2.8 6.2l-2.1 2.1 6.4 4.5-2.6 2.6-1.6-.8-1.4 1.4 3 2.4 2.4 3 1.4-1.4-.8-1.6 2.6-2.6 4.5 6.4 2.1-2.1z" />
    </svg>
  );
}

function IconFlag({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const ARTISTS = [
  {
    id: "davinci",
    name: "Leonardo da Vinci",
    born: 1452,
    died: 1519,
    country: "Italy",
    movement: "Renaissance",
    bio: "The ultimate Renaissance man — painter, scientist, inventor, anatomist. His insatiable curiosity drove him to study everything from bird flight to human musculature.",
    color: "#C9A227",
    icon: "davinci",
  },
  {
    id: "michelangelo",
    name: "Michelangelo",
    born: 1475,
    died: 1564,
    country: "Italy",
    movement: "Renaissance",
    bio: "Sculptor, painter, architect — Michelangelo shaped marble as if liberating figures trapped within. The Sistine Chapel ceiling remains the most ambitious solo artistic project in history.",
    color: "#B8860B",
    icon: "michelangelo",
  },
  {
    id: "vangogh",
    name: "Vincent van Gogh",
    born: 1853,
    died: 1890,
    country: "Netherlands",
    movement: "Post-Impressionism",
    bio: "Van Gogh sold only one painting in his lifetime. Today, his swirling, emotionally charged canvases are among the most recognized works in human history.",
    color: "#4169E1",
    icon: "vangogh",
  },
  {
    id: "monet",
    name: "Claude Monet",
    born: 1840,
    died: 1926,
    country: "France",
    movement: "Impressionism",
    bio: "Monet's obsession with capturing light led him to paint the same subjects dozens of times across different hours and seasons. His water lily garden at Giverny became his ultimate masterpiece.",
    color: "#87CEEB",
    icon: "monet",
  },
  {
    id: "picasso",
    name: "Pablo Picasso",
    born: 1881,
    died: 1973,
    country: "Spain",
    movement: "Cubism",
    bio: "Picasso co-invented Cubism and shattered the conventions of Western painting. Over 70 years, he reinvented his style so many times that his body of work spans multiple art movements.",
    color: "#DC143C",
    icon: "picasso",
  },
  {
    id: "hokusai",
    name: "Katsushika Hokusai",
    born: 1760,
    died: 1849,
    country: "Japan",
    movement: "Ukiyo-e",
    bio: "Hokusai created The Great Wave off Kanagawa at age 71 — an image so perfect it became a global symbol of Japanese aesthetics and one of the most reproduced artworks ever made.",
    color: "#1E90FF",
    icon: "hokusai",
  },
  {
    id: "vermeer",
    name: "Johannes Vermeer",
    born: 1632,
    died: 1675,
    country: "Netherlands",
    movement: "Baroque",
    bio: "Vermeer's intimate domestic scenes glow with a quiet, uncanny light. He used a camera obscura to achieve his extraordinary photographic precision.",
    color: "#FFD700",
    icon: "vermeer",
  },
  {
    id: "warhol",
    name: "Andy Warhol",
    born: 1928,
    died: 1987,
    country: "United States",
    movement: "Pop Art",
    bio: "Warhol turned mass culture into high art — Campbell's soup cans, Marilyn Monroe, celebrity, repetition. He predicted the Instagram age decades before the internet.",
    color: "#FF69B4",
    icon: "warhol",
  },
];

const ARTWORKS = [
  {
    id: "mona-lisa",
    title: "Mona Lisa",
    artistId: "davinci",
    year: 1503,
    country: "Italy",
    movement: "Renaissance",
    medium: "Oil on panel",
    location: "Louvre, Paris",
    description: "The world's most famous painting — a portrait of ambiguity. Her smile has been analyzed for 500 years without consensus. The landscape behind her uses aerial perspective Leonardo himself invented.",
    genome: [
      { trait: "Sfumato Technique", pct: 98 },
      { trait: "Portrait Mastery", pct: 95 },
      { trait: "Psychological Depth", pct: 92 },
      { trait: "Aerial Perspective", pct: 88 },
      { trait: "Anatomical Precision", pct: 85 },
    ],
    gradient: "linear-gradient(135deg, #2C1810 0%, #5C3D2E 100%)",
    accentColor: "#C9A227",
  },
  {
    id: "sistine",
    title: "The Creation of Adam",
    artistId: "michelangelo",
    year: 1512,
    country: "Italy",
    movement: "Renaissance",
    medium: "Fresco",
    location: "Sistine Chapel, Vatican",
    description: "The most reproduced religious image in history. The gap between God's and Adam's fingers is one of the most powerful uses of negative space in all of art.",
    genome: [
      { trait: "Monumental Scale", pct: 99 },
      { trait: "Anatomical Mastery", pct: 97 },
      { trait: "Divine Narrative", pct: 95 },
      { trait: "Fresco Technique", pct: 90 },
      { trait: "Classical Influence", pct: 88 },
    ],
    gradient: "linear-gradient(135deg, #1C1C2E 0%, #3D2B5A 100%)",
    accentColor: "#B8860B",
  },
  {
    id: "starry-night",
    title: "The Starry Night",
    artistId: "vangogh",
    year: 1889,
    country: "Netherlands",
    movement: "Post-Impressionism",
    medium: "Oil on canvas",
    location: "MoMA, New York",
    description: "Painted in the asylum at Saint-Paul-de-Mausole, The Starry Night transforms the night sky into a living, swirling vortex of cosmic energy. Van Gogh painted it from memory.",
    genome: [
      { trait: "Emotional Intensity", pct: 99 },
      { trait: "Dynamic Brushwork", pct: 97 },
      { trait: "Color Expressionism", pct: 94 },
      { trait: "Cosmic Symbolism", pct: 90 },
      { trait: "Impasto Texture", pct: 88 },
    ],
    gradient: "linear-gradient(135deg, #0A0E27 0%, #1A237E 100%)",
    accentColor: "#4169E1",
  },
  {
    id: "water-lilies",
    title: "Water Lilies",
    artistId: "monet",
    year: 1906,
    country: "France",
    movement: "Impressionism",
    medium: "Oil on canvas",
    location: "Art Institute of Chicago",
    description: "Part of Monet's monumental series of 250 paintings, the Water Lilies dissolve form into pure sensation. He said he wanted viewers to feel they were floating on the water itself.",
    genome: [
      { trait: "Light Dissolution", pct: 98 },
      { trait: "Atmospheric Color", pct: 96 },
      { trait: "Reflective Surface", pct: 94 },
      { trait: "Series Concept", pct: 88 },
      { trait: "Plein Air Origins", pct: 82 },
    ],
    gradient: "linear-gradient(135deg, #0A1628 0%, #1B4B7A 100%)",
    accentColor: "#87CEEB",
  },
  {
    id: "guernica",
    title: "Guernica",
    artistId: "picasso",
    year: 1937,
    country: "Spain",
    movement: "Cubism",
    medium: "Oil on canvas",
    location: "Museo Reina Sofía, Madrid",
    description: "Picasso's response to the Nazi bombing of a Basque town. In grey, black and white, it became the most powerful anti-war painting in history — a testimony that outlasted the 20th century.",
    genome: [
      { trait: "Political Power", pct: 99 },
      { trait: "Cubist Fragmentation", pct: 95 },
      { trait: "Monochrome Drama", pct: 93 },
      { trait: "Symbolic Imagery", pct: 92 },
      { trait: "Scale & Impact", pct: 90 },
    ],
    gradient: "linear-gradient(135deg, #1A1A1A 0%, #3D2B2B 100%)",
    accentColor: "#DC143C",
  },
  {
    id: "great-wave",
    title: "The Great Wave off Kanagawa",
    artistId: "hokusai",
    year: 1831,
    country: "Japan",
    movement: "Ukiyo-e",
    medium: "Woodblock print",
    location: "Metropolitan Museum of Art",
    description: "The most reproduced Japanese artwork in history — and arguably the first truly global image. Mount Fuji lurks in the background, dwarfed by the surging wave.",
    genome: [
      { trait: "Dynamic Tension", pct: 99 },
      { trait: "Woodblock Mastery", pct: 97 },
      { trait: "Natural Force", pct: 95 },
      { trait: "Compositional Genius", pct: 94 },
      { trait: "Cultural Identity", pct: 92 },
    ],
    gradient: "linear-gradient(135deg, #0A0F2E 0%, #1A3A6B 100%)",
    accentColor: "#1E90FF",
  },
  {
    id: "girl-pearl",
    title: "Girl with a Pearl Earring",
    artistId: "vermeer",
    year: 1665,
    country: "Netherlands",
    movement: "Baroque",
    medium: "Oil on canvas",
    location: "Mauritshuis, The Hague",
    description: "The 'Mona Lisa of the North' — a tronie (character study) of a girl in the act of turning toward the viewer. Her parted lips and luminous eyes create an unbearable intimacy.",
    genome: [
      { trait: "Intimate Gaze", pct: 99 },
      { trait: "Light Mastery", pct: 97 },
      { trait: "Psychological Mystery", pct: 95 },
      { trait: "Soft Focus Technique", pct: 91 },
      { trait: "Dutch Realism", pct: 88 },
    ],
    gradient: "linear-gradient(135deg, #1C1A00 0%, #4A3800 100%)",
    accentColor: "#FFD700",
  },
  {
    id: "marilyn",
    title: "Marilyn Diptych",
    artistId: "warhol",
    year: 1962,
    country: "United States",
    movement: "Pop Art",
    medium: "Silkscreen on canvas",
    location: "Tate Modern, London",
    description: "Created just after Marilyn Monroe's death. The left panel blazes in garish color; the right fades into ghost-like monochrome — a meditation on celebrity, mortality, and mechanical reproduction.",
    genome: [
      { trait: "Mass Reproduction", pct: 99 },
      { trait: "Celebrity Culture", pct: 98 },
      { trait: "Color as Artifice", pct: 94 },
      { trait: "Seriality", pct: 92 },
      { trait: "Mortality Subtext", pct: 88 },
    ],
    gradient: "linear-gradient(135deg, #2A0A1E 0%, #6B1A4A 100%)",
    accentColor: "#FF69B4",
  },
];

const TIMELINE_ERAS = [
  { year: 1000, label: "Medieval", region: "Europe & Asia", movement: "Byzantine Art", artist: "Andrei Rublev", fact: "Gold leaf backgrounds symbolized divine light in Byzantine icons, transforming the panel into a sacred window.", activeCountries: ["Italy", "China", "Egypt"], color: "#8B6914" },
  { year: 1200, label: "Gothic", region: "Western Europe", movement: "Gothic Art", artist: "Villard de Honnecourt", fact: "Gothic cathedrals used stained glass as the 'poor man's Bible' — narrative art for those who couldn't read.", activeCountries: ["France", "Italy", "United Kingdom"], color: "#6B4E9B" },
  { year: 1450, label: "Early Renaissance", region: "Italy", movement: "Early Renaissance", artist: "Donatello", fact: "Brunelleschi's discovery of linear perspective in Florence (1413) gave artists the mathematical tools to represent 3D space on a flat surface.", activeCountries: ["Italy", "Netherlands"], color: "#C9A227" },
  { year: 1500, label: "High Renaissance", region: "Italy", movement: "High Renaissance", artist: "Leonardo da Vinci", fact: "The High Renaissance lasted only ~30 years but produced Leonardo, Michelangelo, Raphael, and Titian — the greatest concentration of artistic genius in history.", activeCountries: ["Italy", "Netherlands", "France"], color: "#D4AF37" },
  { year: 1700, label: "Baroque & Rococo", region: "Europe", movement: "Baroque", artist: "Johannes Vermeer", fact: "Baroque art was weaponized by the Catholic Church as Counter-Reformation propaganda — its drama and grandeur were designed to overwhelm and convert.", activeCountries: ["Netherlands", "France", "Italy", "Japan"], color: "#8B7355" },
  { year: 1889, label: "Impressionism", region: "France", movement: "Impressionism", artist: "Claude Monet", fact: "The Impressionists were initially mocked by the Paris Salon. 'Impression, Sunrise' by Monet gave the movement its name — intended as an insult by a critic.", activeCountries: ["France", "United Kingdom", "Japan", "United States"], color: "#87CEEB" },
  { year: 1950, label: "Modernism", region: "Global", movement: "Abstract Expressionism", artist: "Jackson Pollock", fact: "After WWII, the center of the art world shifted from Paris to New York. Abstract Expressionism was the first American art movement to achieve international influence.", activeCountries: ["United States", "France", "United Kingdom", "Japan"], color: "#FF6B35" },
  { year: 2026, label: "Digital Age", region: "Global", movement: "Digital & AI Art", artist: "Refik Anadol", fact: "AI-generated art sold for $432,500 at Christie's in 2018, sparking debate about authorship, creativity, and the future of human artmaking.", activeCountries: ["United States", "United Kingdom", "Japan", "China", "France"], color: "#00F5FF" },
];

const JOURNEYS = [
  {
    id: "renaissance-italy",
    title: "Renaissance Italy",
    subtitle: "Birth of the Modern World",
    duration: "5 stops",
    progress: 60,
    stops: ["Florence", "Rome", "Venice", "Milan", "Siena"],
    artists: ["davinci", "michelangelo"],
    artworks: ["mona-lisa", "sistine"],
    gradClass: "journey-grad-1",
    accentColor: "#D4AF37",
    description: "From Brunelleschi's dome to the Sistine ceiling — trace how Florence ignited the Renaissance and changed Western art forever.",
    period: "1400 – 1600",
  },
  {
    id: "vangogh-europe",
    title: "Van Gogh's Europe",
    subtitle: "Following the Tormented Genius",
    duration: "4 stops",
    progress: 25,
    stops: ["Amsterdam", "Paris", "Arles", "Saint-Rémy"],
    artists: ["vangogh"],
    artworks: ["starry-night"],
    gradClass: "journey-grad-2",
    accentColor: "#4169E1",
    description: "Follow Van Gogh from the Dutch countryside to the asylum in Provence — tracing the places that shaped his extraordinary emotional vision.",
    period: "1853 – 1890",
  },
  {
    id: "silk-road",
    title: "Silk Road Art",
    subtitle: "Where Cultures Collided",
    duration: "6 stops",
    progress: 0,
    stops: ["Xi'an", "Samarkand", "Baghdad", "Constantinople", "Venice", "Dunhuang"],
    artists: ["hokusai"],
    artworks: ["great-wave"],
    gradClass: "journey-grad-3",
    accentColor: "#FF8C00",
    description: "Along 7,000 miles of trade routes, Buddhist art, Islamic calligraphy, and Chinese silk paintings cross-pollinated into something entirely new.",
    period: "100 – 1400 CE",
  },
  {
    id: "ukiyo-e",
    title: "Japanese Ukiyo-e",
    subtitle: "Pictures of the Floating World",
    duration: "3 stops",
    progress: 0,
    stops: ["Edo (Tokyo)", "Kyoto", "Mount Fuji"],
    artists: ["hokusai"],
    artworks: ["great-wave"],
    gradClass: "journey-grad-4",
    accentColor: "#E05C5C",
    description: "Ukiyo-e woodblock prints captured the ephemeral pleasures of Edo-period Japan — kabuki actors, sumo wrestlers, courtesans, and the sublime power of nature.",
    period: "1603 – 1868",
  },
  {
    id: "modernism-paris",
    title: "Modernism in Paris",
    subtitle: "The City That Invented Modern Art",
    duration: "5 stops",
    progress: 80,
    stops: ["Montmartre", "Montparnasse", "Louvre", "Sacré-Cœur", "Seine"],
    artists: ["picasso", "monet"],
    artworks: ["guernica", "water-lilies"],
    gradClass: "journey-grad-5",
    accentColor: "#C9A227",
    description: "Between 1880 and 1940, Paris was the center of everything — Impressionism, Cubism, Surrealism, Fauvism — and the artists who invented them all drank at the same cafés.",
    period: "1880 – 1940",
  },
];

const COUNTRIES = [
  { id: "Italy", label: "Italy", artworks: ["mona-lisa", "sistine"], primaryMovement: "Renaissance", color: "#D4AF37" },
  { id: "France", label: "France", artworks: ["water-lilies", "guernica"], primaryMovement: "Impressionism", color: "#87CEEB" },
  { id: "Netherlands", label: "Netherlands", artworks: ["starry-night", "girl-pearl"], primaryMovement: "Dutch Golden Age", color: "#FF8C00" },
  { id: "Japan", label: "Japan", artworks: ["great-wave"], primaryMovement: "Ukiyo-e", color: "#E05C5C" },
  { id: "China", label: "China", artworks: ["great-wave"], primaryMovement: "Classical Chinese", color: "#FFD700" },
  { id: "Egypt", label: "Egypt", artworks: ["mona-lisa"], primaryMovement: "Ancient Egyptian", color: "#DAA520" },
  { id: "United Kingdom", label: "United Kingdom", artworks: ["marilyn"], primaryMovement: "Romanticism", color: "#4169E1" },
  { id: "United States", label: "United States", artworks: ["marilyn", "starry-night"], primaryMovement: "Abstract Expressionism", color: "#FF6B35" },
  { id: "Spain", label: "Spain", artworks: ["guernica"], primaryMovement: "Cubism", color: "#DC143C" },
];

const TODAY_FACT = {
  artwork: ARTWORKS[2],
  fact: "On June 10, 1889, Van Gogh wrote to his brother Theo: 'The night is more vividly coloured than the day.' He was painting The Starry Night.",
  date: "June 10",
};

const AI_EXPLANATIONS: Record<string, Record<string, string>> = {
  "mona-lisa": {
    beginner: "The Mona Lisa is the most famous painting in the world, made by Leonardo da Vinci around 1503. It shows a woman with a mysterious smile sitting in front of a beautiful landscape. People are fascinated by her expression because it seems to change depending on where you look — she might be smiling, or she might not be. Over 6 million people visit her at the Louvre in Paris every year.",
    student: "Leonardo da Vinci's Mona Lisa (c.1503-1519) is a masterwork of Renaissance portraiture employing sfumato — a technique of blurring outlines with translucent layers of glaze — to create atmospheric depth. The sitter is likely Lisa Gherardini, wife of Florentine merchant Francesco del Giocondo. The background employs aerial perspective: forms become bluer and hazier with distance.",
    expert: "The Mona Lisa represents the apex of High Renaissance portraiture in its psychological penetration and technical virtuosity. The pyramidal composition stabilizes the figure while the contrapposto creates subtle dynamism. Da Vinci's revolutionary sfumato technique eliminates hard contours, dissolving form into atmosphere. Recent infrared reflectography has revealed three distinct compositional states beneath the surface, suggesting years of revision.",
  },
};

const MOVEMENTS_DESC: Record<string, string> = {
  Renaissance: "A rebirth of classical learning in 14th–17th century Europe — artists mastered perspective, anatomy, and naturalism.",
  Baroque: "17th century art of drama, grandeur, and chiaroscuro. Caravaggio, Rembrandt, Vermeer — all part of one explosive movement.",
  Impressionism: "Paris, 1860s: painters abandoned studios for plein air, capturing fleeting light rather than fixed form.",
  "Post-Impressionism": "Van Gogh, Gauguin, Seurat, Cézanne — retained Impressionism's vibrancy but pushed toward expression and structure.",
  Cubism: "Picasso and Braque shattered perspective in 1907, showing objects from multiple viewpoints simultaneously.",
  "Ukiyo-e": "Japanese woodblock prints of the Edo period capturing kabuki, sumo, landscapes with impossible elegance.",
  "Abstract Expressionism": "Post-WWII New York: Pollock, de Kooning, Rothko. Emotion without representation.",
  "Pop Art": "Warhol, Lichtenstein, Hockney: high art meets mass culture. The banal elevated, the sacred commodified.",
};

type Tab = "explore" | "journeys" | "passport" | "profile";

interface PassportEntry { countryId: string; visitedAt: number; }
interface ArtistDiscovered { artistId: string; discoveredAt: number; }

function getArtist(id: string) { return ARTISTS.find((a) => a.id === id); }
function getArtwork(id: string) { return ARTWORKS.find((a) => a.id === id); }
function getEraForYear(year: number) {
  const sorted = [...TIMELINE_ERAS].sort((a, b) => b.year - a.year);
  return sorted.find((e) => e.year <= year) || TIMELINE_ERAS[0];
}

// ─── ARTIST ICON ──────────────────────────────────────────────────────────────

function ArtistIcon({ artistId, size = 32 }: { artistId: string; size?: number }) {
  const artist = getArtist(artistId);
  const color = artist?.color || "#D4AF37";
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.28, background: `${color}22`, border: `1.5px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <IconArtwork size={size * 0.52} color={color} />
    </div>
  );
}

// ─── TOP BAR ──────────────────────────────────────────────────────────────────

function TopBar({ onSearch }: { onSearch: () => void }) {
  const { lang, setLang } = useLang();
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 30, padding: "16px 16px 0", background: "linear-gradient(to bottom, rgba(4,8,15,0.90) 0%, transparent 100%)", pointerEvents: "none" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", pointerEvents: "auto" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#D4AF37", textTransform: "uppercase", fontWeight: 700 }}>ArtMap</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.01em" }}>College</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setLang(lang === "en" ? "id" : "en")}
            title={lang === "en" ? "Switch to Bahasa Indonesia" : "Switch to English"}
            style={{ height: 36, padding: "0 12px", borderRadius: 11, background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.28)", color: "#D4AF37", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, backdropFilter: "blur(12px)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", transition: "all 0.18s" }}
          >
            <IconGlobe size={14} color="#D4AF37" />
            {lang === "en" ? "EN" : "ID"}
          </button>
          <button
            onClick={onSearch}
            title="Search"
            style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)", transition: "all 0.18s" }}
          >
            <IconSearch size={17} color="rgba(255,255,255,0.75)" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TODAY CARD ───────────────────────────────────────────────────────────────

function TodayCard({ onPress }: { onPress: () => void }) {
  const { t } = useLang();
  return (
    <div style={{ position: "absolute", top: 72, left: 16, right: 16, zIndex: 20, pointerEvents: "none" }}>
      <button
        onClick={onPress}
        style={{ width: "100%", background: "rgba(10,16,28,0.88)", backdropFilter: "blur(20px)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 16, padding: "12px 14px", cursor: "pointer", textAlign: "left", pointerEvents: "auto", display: "flex", alignItems: "center", gap: 12 }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 10, background: ARTWORKS[2].gradient, border: `1px solid ${ARTWORKS[2].accentColor}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <IconCalendar size={17} color={ARTWORKS[2].accentColor} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 9, color: "#D4AF37", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>{t("today_title")} · {TODAY_FACT.date}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{TODAY_FACT.fact}</div>
        </div>
        <div style={{ flexShrink: 0, fontSize: 10, color: "rgba(212,175,55,0.7)", fontWeight: 700 }}>{t("today_learn")} →</div>
      </button>
    </div>
  );
}

// ─── SURPRISE BUTTON ──────────────────────────────────────────────────────────

function SurpriseBtn({ onClick }: { onClick: () => void }) {
  const { t } = useLang();
  return (
    <button
      onClick={onClick}
      className="float-btn"
      title={t("surprise_tooltip")}
      style={{ position: "absolute", right: 16, bottom: 200, zIndex: 20, width: 52, height: 52, borderRadius: 16, background: "rgba(10,16,28,0.9)", backdropFilter: "blur(16px)", border: "1px solid rgba(212,175,55,0.25)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <IconDice size={22} color="#D4AF37" />
    </button>
  );
}

// ─── TIMELINE SLIDER ─────────────────────────────────────────────────────────

function TimelineSlider({ year, onChange, era }: { year: number; onChange: (y: number) => void; era: typeof TIMELINE_ERAS[0] }) {
  const MIN = 1000;
  const MAX = 2026;
  const pct = ((year - MIN) / (MAX - MIN)) * 100;

  return (
    <div style={{ position: "absolute", bottom: 100, left: 16, right: 16, zIndex: 20, background: "rgba(4,8,18,0.88)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "14px 18px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 11, color: "#D4AF37", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{era.label}</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginTop: 1, letterSpacing: "-0.01em" }}>{year < 2026 ? year : "Now"}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{era.movement}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{era.region}</div>
        </div>
      </div>
      <input
        type="range"
        min={MIN}
        max={MAX}
        value={year}
        onChange={(e) => onChange(Number(e.target.value))}
        className="timeline-slider"
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 8, lineHeight: 1.5, fontStyle: "italic" }}>{era.fact}</div>
    </div>
  );
}

// ─── BOTTOM SHEET ─────────────────────────────────────────────────────────────

function BottomSheet({
  artwork,
  country,
  onClose,
  onAIExplain,
  discovered,
}: {
  artwork: typeof ARTWORKS[0] | null;
  country: typeof COUNTRIES[0] | null;
  onClose: () => void;
  onAIExplain: (id: string) => void;
  discovered: string[];
}) {
  const [saved, setSaved] = useState(false);
  const { t } = useLang();
  const displayAW = artwork || (country?.artworks[0] ? getArtwork(country.artworks[0]) : null);
  const displayCountry = country || (artwork ? COUNTRIES.find((c) => c.id === artwork.country) : null);

  if (!displayAW && !displayCountry) return null;

  return (
    <div
      className="bottom-sheet"
      style={{ position: "absolute", bottom: 80, left: 0, right: 0, zIndex: 25, maxHeight: "55vh" }}
    >
      <div className="glass-card" style={{ borderRadius: "22px 22px 0 0", padding: "0 0 8px" }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 6px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.18)" }} />
        </div>

        <div className="scroll-y" style={{ maxHeight: "calc(55vh - 60px)", padding: "0 18px 20px" }}>
          {/* Country info */}
          {displayCountry && (
            <div style={{ marginBottom: displayAW ? 16 : 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${displayCountry.color}18`, border: `1px solid ${displayCountry.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconFlag size={17} color={displayCountry.color} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{displayCountry.label}</div>
                  <div style={{ fontSize: 11, color: displayCountry.color, fontWeight: 600, letterSpacing: "0.04em" }}>{displayCountry.primaryMovement}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {displayCountry.artworks.map((awId) => {
                  const aw = getArtwork(awId);
                  if (!aw) return null;
                  return (
                    <div key={awId} style={{ padding: "4px 10px", borderRadius: 20, background: `${displayCountry.color}18`, border: `1px solid ${displayCountry.color}30`, fontSize: 11, color: displayCountry.color, fontWeight: 600 }}>
                      {aw.title}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Artwork info */}
          {displayAW && (
            <>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: displayAW.gradient, border: `1px solid ${displayAW.accentColor}33`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IconArtwork size={24} color={displayAW.accentColor} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 3 }}>{displayAW.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <ArtistIcon artistId={displayAW.artistId} size={18} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{getArtist(displayAW.artistId)?.name}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>· {displayAW.year}</span>
                  </div>
                </div>
                {discovered.includes(displayAW.artistId) && (
                  <div style={{ padding: "4px 8px", borderRadius: 20, background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)", fontSize: 9, color: "#D4AF37", fontWeight: 700, letterSpacing: "0.06em", flexShrink: 0 }}>{t("artwork_discovered")}</div>
                )}
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {[{ label: displayAW.medium }, { label: displayAW.location }].map((tag, i) => (
                  <div key={i} style={{ padding: "4px 10px", borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{tag.label}</div>
                ))}
              </div>

              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 14 }}>{displayAW.description}</div>

              {/* Art Genome */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: "#D4AF37", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>{t("artwork_genome")}</div>
                {displayAW.genome.map((g) => (
                  <div key={g.trait} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{g.trait}</div>
                      <div style={{ fontSize: 10, color: "#D4AF37", fontWeight: 700 }}>{g.pct}%</div>
                    </div>
                    <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                      <div className="genome-bar" style={{ width: `${g.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => onAIExplain(displayAW.id)}
                  style={{ flex: 1, background: "linear-gradient(135deg, #D4AF37 0%, #92400E 100%)", border: "none", borderRadius: 14, padding: "13px 16px", color: "#0A0A0A", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}
                >
                  <IconSparkle size={16} color="#0A0A0A" /> {t("artwork_ai_explain")}
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  style={{ width: 48, height: 48, borderRadius: 14, background: saved ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${saved ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.12)"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                >
                  <IconHeart size={20} color={saved ? "#D4AF37" : "rgba(255,255,255,0.45)"} filled={saved} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── AI GUIDE MODAL ───────────────────────────────────────────────────────────

function AIGuideModal({ artworkId, onClose }: { artworkId: string | null; onClose: () => void }) {
  const [level, setLevel] = useState<"beginner" | "student" | "expert">("student");
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(false);
  const { t } = useLang();
  const artwork = artworkId ? getArtwork(artworkId) : null;

  const getText = () => {
    if (!artworkId) return "";
    const exp = AI_EXPLANATIONS[artworkId];
    if (exp) return exp[level];
    const aw = artwork!;
    const artist = getArtist(aw.artistId);
    const levelTexts = {
      beginner: `${aw.title} is a famous ${aw.movement} masterpiece created by ${artist?.name} in ${aw.year}. ${aw.description}`,
      student: `${aw.title} (${aw.year}) represents a pivotal work in ${aw.movement}. ${artist?.name} employed ${aw.genome[0].trait} and ${aw.genome[1].trait} to create this enduring work. ${aw.description}`,
      expert: `${aw.title} (${aw.year}) exemplifies ${aw.movement}'s formal vocabulary. ${artist?.name}'s deployment of ${aw.genome.map(g => g.trait).join(", ")} situates this work within the broader trajectory of art history. ${aw.description}`,
    };
    return levelTexts[level];
  };

  useEffect(() => {
    if (!artworkId) return;
    const text = getText();
    setDisplayed("");
    setTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else { clearInterval(interval); setTyping(false); }
    }, 10);
    return () => clearInterval(interval);
  }, [artworkId, level]);

  if (!artworkId || !artwork) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.78)", backdropFilter: "blur(10px)", display: "flex", alignItems: "flex-end" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ width: "100%", background: "#080f1e", borderTopLeftRadius: 24, borderTopRightRadius: 24, borderTop: "1px solid rgba(212,175,55,0.2)", padding: "20px 20px 40px", maxHeight: "75vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{t("ai_guide")}</div>
              <div style={{ fontSize: 9, background: "linear-gradient(90deg, #D4AF37, #F59E0B)", borderRadius: 20, padding: "2px 8px", color: "#0A0A0A", fontWeight: 700, letterSpacing: "0.05em" }}>DEMO</div>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>{artwork.title}</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 16, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4 }}>
          {(["beginner", "student", "expert"] as const).map((l) => (
            <button key={l} onClick={() => setLevel(l)} style={{ flex: 1, padding: "8px 4px", borderRadius: 9, border: "none", background: level === l ? "rgba(212,175,55,0.18)" : "none", color: level === l ? "#D4AF37" : "rgba(255,255,255,0.4)", fontWeight: level === l ? 700 : 500, fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}>
              {t(l === "beginner" ? "ai_beginner" : l === "student" ? "ai_student" : "ai_expert")}
            </button>
          ))}
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 16, minHeight: 120 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #D4AF37, #92400E)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <IconSparkle size={14} color="#0A0A0A" />
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", paddingTop: 6 }}>ArtMap AI</div>
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
            {displayed}
            {typing && <span className="cursor-blink" style={{ color: "#D4AF37", fontWeight: 700 }}>|</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SEARCH OVERLAY ───────────────────────────────────────────────────────────

function SearchOverlay({ open, onClose, onSelectArtwork }: { open: boolean; onClose: () => void; onSelectArtwork: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLang();

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    else setQuery("");
  }, [open]);

  const results = query.length > 0
    ? [
        ...ARTWORKS.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()) || a.movement.toLowerCase().includes(query.toLowerCase()) || a.country.toLowerCase().includes(query.toLowerCase())).map((a) => ({ type: "artwork" as const, item: a })),
        ...ARTISTS.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()) || a.movement.toLowerCase().includes(query.toLowerCase())).map((a) => ({ type: "artist" as const, item: a })),
      ]
    : [];

  if (!open) return null;

  return (
    <div className="search-overlay" style={{ position: "fixed", inset: 0, zIndex: 80, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "16px 16px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 14, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px" }}>
            <IconSearch size={16} color="rgba(255,255,255,0.4)" />
            <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("search_placeholder")} style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: 15, fontFamily: "inherit" }} />
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.55)", cursor: "pointer", fontSize: 15, fontWeight: 500, padding: "8px 4px" }}>{t("search_cancel")}</button>
        </div>
      </div>

      <div className="scroll-y" style={{ flex: 1, padding: "0 16px" }}>
        {query.length === 0 && (
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 12, marginTop: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("search_trending")}</div>
            {["Starry Night", "Impressionism", "Renaissance Italy", "Hokusai", "Baroque"].map((s) => (
              <button key={s} onClick={() => setQuery(s)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 0", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: 14, textAlign: "left" }}>
                <IconSearch size={14} color="rgba(255,255,255,0.3)" /> {s}
              </button>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <div>
            {results.map(({ type, item }) => (
              <button
                key={item.id}
                onClick={() => { if (type === "artwork") { onSelectArtwork(item.id); onClose(); } }}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 0", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", textAlign: "left" }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: type === "artwork" ? (item as typeof ARTWORKS[0]).gradient : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {type === "artwork" ? <IconArtwork size={18} color={(item as typeof ARTWORKS[0]).accentColor} /> : <IconUser size={18} color={(item as typeof ARTISTS[0]).color} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{type === "artwork" ? (item as typeof ARTWORKS[0]).title : (item as typeof ARTISTS[0]).name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>{type === "artwork" ? `${(item as typeof ARTWORKS[0]).movement} · ${(item as typeof ARTWORKS[0]).year}` : `${(item as typeof ARTISTS[0]).movement} · ${(item as typeof ARTISTS[0]).country}`}</div>
                </div>
                <div style={{ fontSize: 9, background: type === "artwork" ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${type === "artwork" ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.08)"}`, borderRadius: 20, padding: "2px 8px", color: type === "artwork" ? "#D4AF37" : "rgba(255,255,255,0.45)", fontWeight: 700, textTransform: "capitalize", flexShrink: 0 }}>{type}</div>
              </button>
            ))}
          </div>
        )}

        {query.length > 0 && results.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px" }}>
            <IconSearch size={36} color="rgba(255,255,255,0.2)" />
            <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>{t("search_no_results")} "{query}"</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>{t("search_try")}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── JOURNEY DETAIL MODAL ─────────────────────────────────────────────────────

function JourneyDetailModal({ journey, onClose, onArtworkSelect }: { journey: typeof JOURNEYS[0] | null; onClose: () => void; onArtworkSelect: (id: string) => void }) {
  const { t } = useLang();
  if (!journey) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(0,0,0,0.78)", backdropFilter: "blur(10px)", display: "flex", alignItems: "flex-end" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ width: "100%", background: "#080f1e", borderTopLeftRadius: 24, borderTopRightRadius: 24, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "20px 20px 40px", maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 9, color: journey.accentColor, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{journey.period}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>{journey.title}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontStyle: "italic", marginTop: 2 }}>{journey.subtitle}</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
        </div>

        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 20 }}>{journey.description}</div>

        {/* Progress */}
        {journey.progress > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Progress</div>
              <div style={{ fontSize: 11, color: journey.accentColor, fontWeight: 700 }}>{journey.progress}%</div>
            </div>
            <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${journey.progress}%`, height: "100%", background: `linear-gradient(90deg, ${journey.accentColor}, ${journey.accentColor}88)`, borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* Stops */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Route</div>
          {journey.stops.map((stop, i) => (
            <div key={stop} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: i < Math.ceil(journey.stops.length * journey.progress / 100) ? `${journey.accentColor}22` : "rgba(255,255,255,0.04)", border: `1px solid ${i < Math.ceil(journey.stops.length * journey.progress / 100) ? journey.accentColor + "44" : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {i < Math.ceil(journey.stops.length * journey.progress / 100) ? <IconCheck size={12} color={journey.accentColor} /> : <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />}
              </div>
              <div style={{ fontSize: 13, color: i < Math.ceil(journey.stops.length * journey.progress / 100) ? "#fff" : "rgba(255,255,255,0.45)", fontWeight: i < Math.ceil(journey.stops.length * journey.progress / 100) ? 600 : 400 }}>{stop}</div>
              {i < journey.stops.length - 1 && <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)", position: "absolute", marginLeft: 13, marginTop: 28 }} />}
            </div>
          ))}
        </div>

        {/* Featured artworks */}
        <div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>{t("journeys_featured")}</div>
          {journey.artworks.map((awId) => {
            const aw = getArtwork(awId);
            if (!aw) return null;
            return (
              <button key={awId} onClick={() => { onArtworkSelect(awId); onClose(); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", marginBottom: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: aw.gradient, border: `1px solid ${aw.accentColor}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconArtwork size={20} color={aw.accentColor} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{aw.title}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>{getArtist(aw.artistId)?.name} · {aw.year}</div>
                </div>
                <IconArrow size={14} color="rgba(255,255,255,0.3)" />
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button style={{ width: "100%", marginTop: 12, padding: "14px", background: `linear-gradient(135deg, ${journey.accentColor}22, ${journey.accentColor}11)`, border: `1px solid ${journey.accentColor}44`, borderRadius: 16, color: journey.accentColor, fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {journey.progress > 0 ? t("journeys_continue") : t("journeys_begin")} <IconArrow size={16} color={journey.accentColor} />
        </button>
      </div>
    </div>
  );
}

// ─── JOURNEYS TAB ─────────────────────────────────────────────────────────────

function JourneysTab({ onJourneyPress }: { onJourneyPress: (id: string) => void }) {
  const { t } = useLang();
  return (
    <div className="scroll-y page-enter" style={{ height: "100%", padding: "20px 16px 90px" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{t("journeys_title")}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>{t("journeys_subtitle")}</div>

      {JOURNEYS.map((journey, i) => (
        <button
          key={journey.id}
          onClick={() => onJourneyPress(journey.id)}
          style={{ width: "100%", marginBottom: 14, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", background: "none", padding: 0, textAlign: "left", display: "block", animationDelay: `${i * 60}ms` }}
          className="page-enter"
        >
          <div className={journey.gradClass} style={{ padding: "20px 18px 16px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 4 }}>{journey.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>{journey.subtitle}</div>
              </div>
              <div style={{ background: `${journey.accentColor}22`, border: `1px solid ${journey.accentColor}44`, borderRadius: 20, padding: "4px 10px", fontSize: 9, color: journey.accentColor, fontWeight: 700, flexShrink: 0, marginLeft: 10 }}>{journey.duration}</div>
            </div>

            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "10px 0", lineHeight: 1.5 }}>{journey.description}</div>

            <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
              {journey.stops.map((stop, si) => (
                <span key={stop} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{stop}</span>
                  {si < journey.stops.length - 1 && <IconArrow size={10} color="rgba(255,255,255,0.2)" />}
                </span>
              ))}
            </div>

            {journey.progress > 0 ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{t("journeys_progress")}</div>
                  <div style={{ fontSize: 10, color: journey.accentColor, fontWeight: 700 }}>{journey.progress}%</div>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${journey.progress}%`, height: "100%", background: `linear-gradient(90deg, ${journey.accentColor}, ${journey.accentColor}88)`, borderRadius: 2 }} />
                </div>
              </div>
            ) : (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: journey.accentColor, fontWeight: 700 }}>
                {t("journeys_begin")} <IconArrow size={12} color={journey.accentColor} />
              </div>
            )}
          </div>

          <div style={{ background: "rgba(0,0,0,0.35)", padding: "8px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
              <IconCalendar size={11} color="rgba(255,255,255,0.3)" /> {journey.period}
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
              {journey.artists.length} {t("journeys_artists")}{journey.artists.length > 1 ? "s" : ""} · {journey.artworks.length} {t("journeys_artworks_count")}{journey.artworks.length > 1 ? "s" : ""}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── PASSPORT TAB ─────────────────────────────────────────────────────────────

function PassportTab({ passport, discovered }: { passport: PassportEntry[]; discovered: ArtistDiscovered[] }) {
  const { t } = useLang();
  const visitedCountries = passport.length;
  const totalCountries = COUNTRIES.length;
  const discoveredArtists = discovered.length;
  const totalArtists = ARTISTS.length;
  const movements = [...new Set(discovered.map((d) => ARTISTS.find((a) => a.id === d.artistId)?.movement).filter(Boolean))];
  const totalMovements = Object.keys(MOVEMENTS_DESC).length;

  const achievements = [
    { id: "first-step", title: t("ach_first_step"), desc: t("ach_first_step_desc"), icon: <IconGlobe size={20} color="#D4AF37" />, unlocked: visitedCountries >= 1 },
    { id: "globe-trotter", title: t("ach_globe_trotter"), desc: t("ach_globe_trotter_desc"), icon: <IconPlane size={20} color="#87CEEB" />, unlocked: visitedCountries >= 4 },
    { id: "art-lover", title: t("ach_art_lover"), desc: t("ach_art_lover_desc"), icon: <IconHeart size={20} color="#FF69B4" filled />, unlocked: discoveredArtists >= 1 },
    { id: "connoisseur", title: t("ach_connoisseur"), desc: t("ach_connoisseur_desc"), icon: <IconTrophy size={20} color="#D4AF37" />, unlocked: discoveredArtists >= 5 },
    { id: "renaissance", title: t("ach_renaissance"), desc: t("ach_renaissance_desc"), icon: <IconArtwork size={20} color="#C9A227" />, unlocked: movements.includes("Renaissance") },
    { id: "impressionist", title: t("ach_impressionist"), desc: t("ach_impressionist_desc"), icon: <IconStar size={20} color="#87CEEB" filled />, unlocked: movements.includes("Impressionism") },
  ];

  return (
    <div className="scroll-y page-enter" style={{ height: "100%", padding: "20px 16px 90px" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{t("passport_title")}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>{t("passport_subtitle")}</div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
        {[
          { label: t("passport_countries"), value: visitedCountries, total: totalCountries, icon: <IconGlobe size={20} color="#D4AF37" />, color: "#D4AF37" },
          { label: t("passport_artists"), value: discoveredArtists, total: totalArtists, icon: <IconArtwork size={20} color="#87CEEB" />, color: "#87CEEB" },
          { label: t("passport_movements"), value: movements.length, total: totalMovements, icon: <IconCompass size={20} color="#E05C5C" />, color: "#E05C5C" },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "rgba(10,16,28,0.85)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "14px 10px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>{stat.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>of {stat.total} {stat.label}</div>
            <div style={{ marginTop: 8, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${(stat.value / stat.total) * 100}%`, height: "100%", background: stat.color, borderRadius: 2, transition: "width 1s ease" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Countries visited */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{t("passport_countries_explored")}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {COUNTRIES.map((country) => {
            const visited = passport.some((p) => p.countryId === country.id);
            return (
              <div key={country.id} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 20, background: visited ? `${country.color}18` : "rgba(255,255,255,0.03)", border: `1px solid ${visited ? country.color + "40" : "rgba(255,255,255,0.07)"}`, fontSize: 12, color: visited ? country.color : "rgba(255,255,255,0.3)", fontWeight: visited ? 600 : 400 }}>
                {visited && <IconCheck size={11} color={country.color} />} {country.id}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{t("passport_achievements")}</div>
        {achievements.map((ach, i) => (
          <div key={ach.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px", marginBottom: 8, background: ach.unlocked ? "rgba(212,175,55,0.05)" : "rgba(255,255,255,0.02)", border: `1px solid ${ach.unlocked ? "rgba(212,175,55,0.18)" : "rgba(255,255,255,0.05)"}`, borderRadius: 16, opacity: ach.unlocked ? 1 : 0.5, animationDelay: `${i * 50}ms` }} className={ach.unlocked ? "achievement-unlock" : ""}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: ach.unlocked ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${ach.unlocked ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.05)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {ach.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: ach.unlocked ? "#fff" : "rgba(255,255,255,0.35)" }}>{ach.title}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{ach.desc}</div>
            </div>
            {ach.unlocked && (
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconCheck size={11} color="#D4AF37" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROFILE TAB ──────────────────────────────────────────────────────────────

function ProfileTab() {
  const [notifs, setNotifs] = useState(true);
  const [daily, setDaily] = useState(true);
  const { t, lang, setLang } = useLang();

  const stats = [
    { label: t("profile_hours"), value: "12.4" },
    { label: t("profile_artworks"), value: "47" },
    { label: t("profile_notes"), value: "8" },
    { label: t("profile_journeys"), value: "2" },
  ];

  return (
    <div className="scroll-y page-enter" style={{ height: "100%", padding: "20px 16px 90px" }}>
      {/* Avatar */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(135deg, #1a2540 0%, #2d3b60 100%)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 3px rgba(212,175,55,0.18), 0 0 28px rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)" }}>
          <IconUser size={30} color="#D4AF37" />
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{t("profile_title")}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{t("profile_member")} June 2026</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.22)", borderRadius: 20, padding: "5px 14px", fontSize: 11, color: "#D4AF37", fontWeight: 700 }}>
          <IconStar size={12} color="#D4AF37" filled /> Renaissance Scholar
        </div>
      </div>

      {/* Social links */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{t("profile_community")}</div>
        <a
          href="https://x.com/arthousebase"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, textDecoration: "none", transition: "all 0.2s", cursor: "pointer" }}
        >
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <IconX size={18} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>@arthousebase</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>{t("profile_follow")}</div>
          </div>
          <IconArrow size={14} color="rgba(255,255,255,0.3)" />
        </a>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "rgba(10,16,28,0.85)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "14px" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#D4AF37", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Art Movements */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{t("profile_movements")}</div>
        {Object.entries(MOVEMENTS_DESC).slice(0, 4).map(([name, desc]) => (
          <div key={name} style={{ marginBottom: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#D4AF37", marginBottom: 4 }}>{name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Preferences */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{t("profile_preferences")}</div>
        {[
          { label: t("profile_dark_mode"), icon: <IconMoon size={18} color="rgba(255,255,255,0.6)" />, active: true, toggle: null },
          { label: t("profile_notifications"), icon: <IconBell size={18} color="rgba(255,255,255,0.6)" />, active: notifs, toggle: () => setNotifs(!notifs) },
          { label: t("profile_daily"), icon: <IconCalendar size={18} color="rgba(255,255,255,0.6)" />, active: daily, toggle: () => setDaily(!daily) },
        ].map((pref) => (
          <div key={pref.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {pref.icon}
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{pref.label}</span>
            </div>
            <button
              onClick={pref.toggle || undefined}
              style={{ width: 44, height: 25, borderRadius: 13, background: pref.active ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.08)", border: `1px solid ${pref.active ? "rgba(212,175,55,0.45)" : "rgba(255,255,255,0.1)"}`, position: "relative", cursor: pref.toggle ? "pointer" : "default", padding: 0 }}
            >
              <div style={{ position: "absolute", top: 3, left: pref.active ? 22 : 3, width: 17, height: 17, borderRadius: "50%", background: pref.active ? "#D4AF37" : "rgba(255,255,255,0.35)", transition: "left 0.2s, background 0.2s" }} />
            </button>
          </div>
        ))}
        {/* Language row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <IconGlobe size={18} color="rgba(255,255,255,0.6)" />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{t("profile_language")}</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {(["en", "id"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: "5px 12px", borderRadius: 8, border: `1px solid ${lang === l ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.1)"}`, background: lang === l ? "rgba(212,175,55,0.14)" : "rgba(255,255,255,0.04)", color: lang === l ? "#D4AF37" : "rgba(255,255,255,0.45)", fontWeight: 700, fontSize: 11, cursor: "pointer", transition: "all 0.18s" }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────

function BottomNav({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const { t } = useLang();
  const tabs = [
    { id: "explore" as Tab, icon: (active: boolean) => <IconGlobe size={22} color={active ? "#D4AF37" : "rgba(255,255,255,0.35)"} />, label: t("nav_explore") },
    { id: "journeys" as Tab, icon: (active: boolean) => <IconMap size={22} color={active ? "#D4AF37" : "rgba(255,255,255,0.35)"} />, label: t("nav_journeys") },
    { id: "passport" as Tab, icon: (active: boolean) => <IconPassport size={22} color={active ? "#D4AF37" : "rgba(255,255,255,0.35)"} />, label: t("nav_passport") },
    { id: "profile" as Tab, icon: (active: boolean) => <IconUser size={22} color={active ? "#D4AF37" : "rgba(255,255,255,0.35)"} />, label: t("nav_profile") },
  ];

  return (
    <div className="nav-glass" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 40, display: "flex", padding: "8px 0 20px" }}>
      {tabs.map((navItem) => (
        <button key={navItem.id} onClick={() => onChange(navItem.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: "6px 0", transition: "all 0.2s" }}>
          <div style={{ transform: tab === navItem.id ? "scale(1.08)" : "scale(1)", transition: "transform 0.2s", filter: tab === navItem.id ? "drop-shadow(0 0 7px rgba(212,175,55,0.55))" : "none" }}>
            {navItem.icon(tab === navItem.id)}
          </div>
          <span style={{ fontSize: 9, fontWeight: tab === navItem.id ? 700 : 500, color: tab === navItem.id ? "#D4AF37" : "rgba(255,255,255,0.3)", letterSpacing: "0.05em", textTransform: "uppercase", transition: "color 0.2s" }}>{navItem.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

function AppInner() {
  const [tab, setTab] = useState<Tab>("explore");
  const [year, setYear] = useState(1500);
  const [selectedCountry, setSelectedCountry] = useState<typeof COUNTRIES[0] | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<typeof ARTWORKS[0] | null>(null);
  const [aiArtworkId, setAiArtworkId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [passport, setPassport] = useState<PassportEntry[]>([]);
  const [discovered, setDiscovered] = useState<ArtistDiscovered[]>([]);
  const [activeJourney, setActiveJourney] = useState<typeof JOURNEYS[0] | null>(null);

  const era = getEraForYear(year);

  const handleCountryTap = useCallback((countryId: string) => {
    const country = COUNTRIES.find((c) => c.id === countryId);
    if (!country) return;
    setSelectedArtwork(null);
    setSelectedCountry(country);

    if (!passport.some((p) => p.countryId === countryId)) {
      setPassport((prev) => [...prev, { countryId, visitedAt: Date.now() }]);
    }
    country.artworks.forEach((awId) => {
      const aw = getArtwork(awId);
      if (aw && !discovered.some((d) => d.artistId === aw.artistId)) {
        setDiscovered((prev) => [...prev, { artistId: aw.artistId, discoveredAt: Date.now() }]);
      }
    });
  }, [passport, discovered]);

  const handleSurprise = useCallback(() => {
    const randomCountry = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    handleCountryTap(randomCountry.id);
    setTab("explore");
  }, [handleCountryTap]);

  const handleYearChange = useCallback((y: number) => {
    setYear(y);
    setSelectedCountry(null);
    setSelectedArtwork(null);
  }, []);

  const handleSelectArtwork = useCallback((id: string) => {
    const aw = getArtwork(id);
    if (aw) {
      setSelectedCountry(null);
      setSelectedArtwork(aw);
      if (!discovered.some((d) => d.artistId === aw.artistId)) {
        setDiscovered((prev) => [...prev, { artistId: aw.artistId, discoveredAt: Date.now() }]);
      }
    }
  }, [discovered]);

  const handleTodayArtwork = useCallback(() => {
    handleSelectArtwork(TODAY_FACT.artwork.id);
  }, [handleSelectArtwork]);

  const handleJourneyPress = useCallback((id: string) => {
    const journey = JOURNEYS.find((j) => j.id === id);
    if (journey) setActiveJourney(journey);
  }, []);

  const sheetOpen = !!selectedCountry || !!selectedArtwork;
  const showBottomSheet = tab === "explore";

  return (
    <div style={{ position: "fixed", inset: 0, background: "#04080f", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* EXPLORE TAB */}
      {tab === "explore" && (
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <WorldMap activeCountries={era.activeCountries} onCountryTap={handleCountryTap} />
          </div>
          <TopBar onSearch={() => setSearchOpen(true)} />
          <TodayCard onPress={handleTodayArtwork} />
          {!sheetOpen && <SurpriseBtn onClick={handleSurprise} />}
          {!sheetOpen && <TimelineSlider year={year} onChange={handleYearChange} era={era} />}
          {showBottomSheet && (
            <BottomSheet
              artwork={selectedArtwork}
              country={selectedCountry}
              onClose={() => { setSelectedCountry(null); setSelectedArtwork(null); }}
              onAIExplain={(id) => setAiArtworkId(id)}
              discovered={discovered.map((d) => d.artistId)}
            />
          )}
        </div>
      )}

      {/* JOURNEYS TAB */}
      {tab === "journeys" && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <JourneysTab onJourneyPress={handleJourneyPress} />
        </div>
      )}

      {/* PASSPORT TAB */}
      {tab === "passport" && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <PassportTab passport={passport} discovered={discovered} />
        </div>
      )}

      {/* PROFILE TAB */}
      {tab === "profile" && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <ProfileTab />
        </div>
      )}

      {/* BOTTOM NAV */}
      <BottomNav tab={tab} onChange={(t) => { setTab(t); setSelectedCountry(null); setSelectedArtwork(null); }} />

      {/* AI GUIDE MODAL */}
      <AIGuideModal artworkId={aiArtworkId} onClose={() => setAiArtworkId(null)} />

      {/* SEARCH OVERLAY */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onSelectArtwork={handleSelectArtwork} />

      {/* JOURNEY DETAIL MODAL */}
      <JourneyDetailModal
        journey={activeJourney}
        onClose={() => setActiveJourney(null)}
        onArtworkSelect={(id) => { handleSelectArtwork(id); setTab("explore"); }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
