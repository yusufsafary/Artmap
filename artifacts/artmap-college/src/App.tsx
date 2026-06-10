import { useState, useEffect, useRef, useCallback } from "react";
import { WorldMap } from "./WorldMap";

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
    emoji: "🎨",
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
    emoji: "🏛️",
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
    emoji: "🌻",
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
    emoji: "🌸",
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
    emoji: "🔷",
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
    emoji: "🌊",
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
    emoji: "💛",
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
    emoji: "🎭",
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
    emoji: "🖼️",
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
    emoji: "✨",
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
    emoji: "🌌",
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
    emoji: "🌿",
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
    emoji: "⚡",
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
    emoji: "🌊",
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
    emoji: "💛",
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
    emoji: "⭐",
  },
];

const TIMELINE_ERAS = [
  {
    year: 1000,
    label: "Medieval",
    region: "Europe & Asia",
    movement: "Byzantine Art",
    artist: "Andrei Rublev",
    fact: "Gold leaf backgrounds symbolized divine light in Byzantine icons, transforming the panel into a sacred window.",
    activeCountries: ["Italy", "China", "Egypt"],
    color: "#8B6914",
  },
  {
    year: 1200,
    label: "Gothic",
    region: "Western Europe",
    movement: "Gothic Art",
    artist: "Villard de Honnecourt",
    fact: "Gothic cathedrals used stained glass as the 'poor man's Bible' — narrative art for those who couldn't read.",
    activeCountries: ["France", "Italy", "United Kingdom"],
    color: "#6B4E9B",
  },
  {
    year: 1450,
    label: "Early Renaissance",
    region: "Italy",
    movement: "Early Renaissance",
    artist: "Donatello",
    fact: "Brunelleschi's discovery of linear perspective in Florence (1413) gave artists the mathematical tools to represent 3D space on a flat surface.",
    activeCountries: ["Italy", "Netherlands"],
    color: "#C9A227",
  },
  {
    year: 1500,
    label: "High Renaissance",
    region: "Italy",
    movement: "High Renaissance",
    artist: "Leonardo da Vinci",
    fact: "The High Renaissance lasted only ~30 years but produced Leonardo, Michelangelo, Raphael, and Titian — the greatest concentration of artistic genius in history.",
    activeCountries: ["Italy", "Netherlands", "France"],
    color: "#D4AF37",
  },
  {
    year: 1700,
    label: "Baroque & Rococo",
    region: "Europe",
    movement: "Baroque",
    artist: "Johannes Vermeer",
    fact: "Baroque art was weaponized by the Catholic Church as Counter-Reformation propaganda — its drama and grandeur were designed to overwhelm and convert.",
    activeCountries: ["Netherlands", "France", "Italy", "Japan"],
    color: "#8B7355",
  },
  {
    year: 1889,
    label: "Impressionism",
    region: "France",
    movement: "Impressionism",
    artist: "Claude Monet",
    fact: "The Impressionists were initially mocked by the Paris Salon. 'Impression, Sunrise' by Monet gave the movement its name — intended as an insult by a critic.",
    activeCountries: ["France", "United Kingdom", "Japan", "United States"],
    color: "#87CEEB",
  },
  {
    year: 1950,
    label: "Modernism",
    region: "Global",
    movement: "Abstract Expressionism",
    artist: "Jackson Pollock",
    fact: "After WWII, the center of the art world shifted from Paris to New York. Abstract Expressionism was the first American art movement to achieve international influence.",
    activeCountries: ["United States", "France", "United Kingdom", "Japan"],
    color: "#FF6B35",
  },
  {
    year: 2026,
    label: "Digital Age",
    region: "Global",
    movement: "Digital & AI Art",
    artist: "Refik Anadol",
    fact: "AI-generated art sold for $432,500 at Christie's in 2018, sparking debate about authorship, creativity, and the future of human artmaking.",
    activeCountries: ["United States", "United Kingdom", "Japan", "China", "France"],
    color: "#00F5FF",
  },
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
  {
    id: "Italy",
    label: "Italy",
    x: 481,
    y: 134,
    artworks: ["mona-lisa", "sistine"],
    primaryMovement: "Renaissance",
    color: "#D4AF37",
  },
  {
    id: "France",
    label: "France",
    x: 453,
    y: 117,
    artworks: ["water-lilies", "guernica"],
    primaryMovement: "Impressionism",
    color: "#87CEEB",
  },
  {
    id: "Netherlands",
    label: "Netherlands",
    x: 462,
    y: 105,
    artworks: ["starry-night", "girl-pearl"],
    primaryMovement: "Dutch Golden Age",
    color: "#FF8C00",
  },
  {
    id: "Japan",
    label: "Japan",
    x: 800,
    y: 151,
    artworks: ["great-wave"],
    primaryMovement: "Ukiyo-e",
    color: "#E05C5C",
  },
  {
    id: "China",
    label: "China",
    x: 741,
    y: 139,
    artworks: ["great-wave"],
    primaryMovement: "Classical Chinese",
    color: "#FFD700",
  },
  {
    id: "Egypt",
    label: "Egypt",
    x: 528,
    y: 166,
    artworks: ["mona-lisa"],
    primaryMovement: "Ancient Egyptian",
    color: "#DAA520",
  },
  {
    id: "United Kingdom",
    label: "United Kingdom",
    x: 450,
    y: 107,
    artworks: ["marilyn"],
    primaryMovement: "Romanticism",
    color: "#4169E1",
  },
  {
    id: "United States",
    label: "United States",
    x: 215,
    y: 140,
    artworks: ["marilyn", "starry-night"],
    primaryMovement: "Abstract Expressionism",
    color: "#FF6B35",
  },
];

const TODAY_FACT = {
  artwork: ARTWORKS[2], // Starry Night
  fact: "On June 10, 1889, Van Gogh wrote to his brother Theo from Saint-Paul-de-Mausole asylum: 'The night is more vividly coloured than the day.' He was painting The Starry Night.",
  date: "June 10",
};

// AI Explanations
const AI_EXPLANATIONS: Record<string, Record<string, string>> = {
  "mona-lisa": {
    beginner: "The Mona Lisa is the most famous painting in the world, made by Leonardo da Vinci around 1503. It shows a woman with a mysterious smile sitting in front of a beautiful landscape. People are fascinated by her expression because it seems to change depending on where you look — she might be smiling, or she might not be. Over 6 million people visit her at the Louvre in Paris every year.",
    student: "Leonardo da Vinci's Mona Lisa (c.1503-1519) is a masterwork of Renaissance portraiture employing sfumato — a technique of blurring outlines with translucent layers of glaze — to create atmospheric depth. The sitter is likely Lisa Gherardini, wife of Florentine merchant Francesco del Giocondo. The background employs aerial perspective: forms become bluer and hazier with distance. The psychological complexity stems from the asymmetrical smile and the way the figure engages the viewer's gaze while simultaneously appearing self-contained.",
    expert: "The Mona Lisa represents the apex of High Renaissance portraiture in its psychological penetration and technical virtuosity. The pyramidal composition stabilizes the figure while the contrapposto creates subtle dynamism. Da Vinci's revolutionary sfumato technique eliminates hard contours, dissolving form into atmosphere — the lips and eyes lack definitive edges, making emotional reading impossible to fix. The trompe l'oeil of her gaze follows viewers spatially (a function of binocular parallax). Recent infrared reflectography has revealed three distinct compositional states beneath the surface, suggesting years of revision. The landscape's geological improbability — different water levels left and right — may reflect da Vinci's interest in hydraulics rather than topographical accuracy.",
  },
};

const MOVEMENTS_DESC: Record<string, string> = {
  Renaissance: "A rebirth of classical learning in 14th–17th century Europe — artists mastered perspective, anatomy, and naturalism, transforming art from spiritual symbolism to human experience.",
  Baroque: "17th century art of drama, grandeur, and chiaroscuro. Caravaggio's violent contrasts, Rembrandt's psychological depth, Vermeer's quiet light — all part of one explosive movement.",
  Impressionism: "Paris, 1860s: painters abandoned studios for plein air, capturing fleeting light rather than fixed form. The Salon rejected them; history vindicated them completely.",
  "Post-Impressionism": "The generation after Monet — Van Gogh, Gauguin, Seurat, Cézanne — retained the vibrancy of Impressionism but pushed toward expression, structure, and emotion.",
  Cubism: "Picasso and Braque shattered perspective in 1907, showing objects from multiple viewpoints simultaneously. The most radical reimagining of vision since the Renaissance.",
  "Ukiyo-e": "Pictures of the Floating World — Japanese woodblock prints of the Edo period capturing kabuki, sumo, landscapes, and courtesans with impossible elegance and economy of line.",
  "Abstract Expressionism": "Post-WWII New York: Pollock, de Kooning, Rothko. Emotion without representation. The canvas as arena, not window.",
  "Pop Art": "Warhol, Lichtenstein, Hockney: high art meets mass culture. Campbell's soup, comics, celebrity — the banal elevated, the sacred commodified.",
};

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Tab = "explore" | "journeys" | "passport" | "profile";

interface PassportEntry {
  countryId: string;
  visitedAt: number;
}
interface ArtistDiscovered {
  artistId: string;
  discoveredAt: number;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getArtist(id: string) {
  return ARTISTS.find((a) => a.id === id);
}

function getArtwork(id: string) {
  return ARTWORKS.find((a) => a.id === id);
}

function getEraForYear(year: number) {
  const sorted = [...TIMELINE_ERAS].sort((a, b) => b.year - a.year);
  return sorted.find((e) => e.year <= year) || TIMELINE_ERAS[0];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function TopBar({ onSearch }: { onSearch: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        padding: "16px 16px 0",
        background:
          "linear-gradient(to bottom, rgba(9,9,11,0.8) 0%, transparent 100%)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pointerEvents: "auto",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "#D4AF37",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            ArtMap
          </div>
          <div
            style={{ fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}
          >
            College
          </div>
        </div>
        <button
          onClick={onSearch}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(17,24,39,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(212,175,55,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#D4AF37",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// SVG World Map (simplified stylized)


function TimelineSlider({
  year,
  onChange,
  era,
}: {
  year: number;
  onChange: (y: number) => void;
  era: typeof TIMELINE_ERAS[0];
}) {
  const MIN = 1000;
  const MAX = 2026;
  const pct = ((year - MIN) / (MAX - MIN)) * 100;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 16,
        right: 16,
        zIndex: 25,
      }}
    >
      {/* Era card */}
      <div
        className="glass-card"
        style={{
          borderRadius: 16,
          padding: "12px 16px",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: era.color,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {year}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 500, marginTop: 1 }}>
              {era.label} · {era.region}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(255,255,255,0.8)",
                background: `${era.color}22`,
                border: `1px solid ${era.color}44`,
                borderRadius: 20,
                padding: "3px 10px",
                display: "inline-block",
              }}
            >
              {era.movement}
            </div>
          </div>
        </div>
        <input
          type="range"
          className="timeline-slider"
          min={MIN}
          max={MAX}
          value={year}
          style={{ "--pct": `${pct}%` } as React.CSSProperties}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          {TIMELINE_ERAS.map((era) => (
            <button
              key={era.year}
              onClick={() => onChange(era.year)}
              style={{
                fontSize: 9,
                color: year === era.year ? "#D4AF37" : "rgba(255,255,255,0.3)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px 0",
                fontWeight: year === era.year ? 700 : 400,
                transition: "color 0.2s",
              }}
            >
              {era.year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TodayCard({ onPress }: { onPress: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 75,
        left: 16,
        right: 16,
        zIndex: 25,
        cursor: "pointer",
      }}
      onClick={onPress}
    >
      <div
        className="glass-card"
        style={{ borderRadius: 14, padding: "10px 14px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #1a1a4e 0%, #2d1b69 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            🌌
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, color: "#D4AF37", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Today in Art History · {TODAY_FACT.date}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", lineHeight: 1.35, marginTop: 1 }} className="line-clamp-2">
              {TODAY_FACT.artwork.title} — {TODAY_FACT.artwork.artistId}
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" style={{ flexShrink: 0 }}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SurpriseBtn({ onClick }: { onClick: () => void }) {
  return (
    <div style={{ position: "absolute", bottom: 165, right: 16, zIndex: 25 }}>
      <button
        onClick={onClick}
        className="float-btn"
        style={{
          background: "linear-gradient(135deg, #D4AF37 0%, #92400E 100%)",
          border: "none",
          borderRadius: 28,
          padding: "10px 16px",
          color: "#0A0A0A",
          fontWeight: 700,
          fontSize: 12,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          letterSpacing: "0.02em",
        }}
      >
        <span style={{ fontSize: 15 }}>✨</span>
        Surprise Me
      </button>
    </div>
  );
}

// ── Bottom Sheet ──
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
  onAIExplain: (artworkId: string) => void;
  discovered: string[];
}) {
  const [saved, setSaved] = useState(false);
  const [activeAW, setActiveAW] = useState<string | null>(null);

  useEffect(() => {
    if (country) {
      setActiveAW(country.artworks[0]);
    }
  }, [country]);

  const displayAW = artwork || (activeAW ? getArtwork(activeAW) : null);
  const displayArtist = displayAW ? getArtist(displayAW.artistId) : null;

  const isOpen = !!artwork || !!country;

  return (
    <div
      className="bottom-sheet"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transform: isOpen ? "translateY(0)" : "translateY(100%)",
        maxHeight: "72vh",
        background: "#0E1420",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderTop: "1px solid rgba(212,175,55,0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Handle */}
      <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0" }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
      </div>

      <div className="scroll-y" style={{ flex: 1, overflowY: "auto" }}>
        {country && !artwork && (
          <div style={{ padding: "12px 20px 0" }}>
            {/* Country header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{country.label}</div>
                <div style={{ fontSize: 12, color: "#D4AF37", fontWeight: 600, marginTop: 2 }}>{country.primaryMovement}</div>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  color: "rgba(255,255,255,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                ×
              </button>
            </div>

            {/* Artworks of this country */}
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Featured Artworks
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {country.artworks.map((awId) => {
                const aw = getArtwork(awId);
                if (!aw) return null;
                const artist = getArtist(aw.artistId);
                const isSelected = activeAW === awId;
                return (
                  <button
                    key={awId}
                    onClick={() => setActiveAW(awId)}
                    style={{
                      flex: 1,
                      background: isSelected ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isSelected ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.08)"}`,
                      borderRadius: 14,
                      padding: "10px 12px",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{aw.emoji}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{aw.title}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{artist?.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {displayAW && (
          <div style={{ padding: "12px 20px 24px" }}>
            {/* Artwork hero */}
            <div style={{
              borderRadius: 20,
              overflow: "hidden",
              marginBottom: 16,
              position: "relative",
              height: 180,
              background: displayAW.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{ fontSize: 72, filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }}>
                {displayAW.emoji}
              </div>
              {/* Close btn (for direct artwork open) */}
              {artwork && (
                <button
                  onClick={onClose}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.5)",
                    border: "none",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  ×
                </button>
              )}
              {/* Year badge */}
              <div style={{
                position: "absolute",
                bottom: 12,
                left: 12,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                borderRadius: 20,
                padding: "4px 10px",
                fontSize: 11,
                color: "#D4AF37",
                fontWeight: 600,
              }}>
                {displayAW.year} · {displayAW.medium}
              </div>
            </div>

            {/* Title block */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", lineHeight: 1.15 }}>
                {displayAW.title}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <div style={{ fontSize: 13, color: displayAW.accentColor, fontWeight: 600 }}>
                  {displayArtist?.name}
                </div>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{displayAW.movement}</div>
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                📍 {displayAW.location}
              </div>
            </div>

            {/* Description */}
            <div style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.65,
              marginBottom: 18,
            }}>
              {displayAW.description}
            </div>

            {/* Art Genome */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#D4AF37", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                Art Genome
              </div>
              {displayAW.genome.map((g) => (
                <div key={g.trait} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{g.trait}</div>
                    <div style={{ fontSize: 10, color: "#D4AF37", fontWeight: 600 }}>{g.pct}%</div>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
                    <div
                      className="genome-bar"
                      style={{ width: `${g.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => onAIExplain(displayAW.id)}
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #D4AF37 0%, #92400E 100%)",
                  border: "none",
                  borderRadius: 14,
                  padding: "13px 16px",
                  color: "#0A0A0A",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <span>✨</span> AI Explain
              </button>
              <button
                onClick={() => setSaved(!saved)}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: saved ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${saved ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.12)"}`,
                  color: saved ? "#D4AF37" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  transition: "all 0.2s",
                }}
              >
                {saved ? "♥" : "♡"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── AI Guide Modal ──
function AIGuideModal({
  artworkId,
  onClose,
}: {
  artworkId: string | null;
  onClose: () => void;
}) {
  const [level, setLevel] = useState<"beginner" | "student" | "expert">("student");
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(false);

  const artwork = artworkId ? getArtwork(artworkId) : null;

  const getText = () => {
    if (!artworkId) return "";
    const exp = AI_EXPLANATIONS[artworkId];
    if (exp) return exp[level];
    const aw = artwork!;
    const artist = getArtist(aw.artistId);
    const levelTexts = {
      beginner: `${aw.title} is a famous ${aw.movement} masterpiece created by ${artist?.name} in ${aw.year}. ${aw.description}`,
      student: `${aw.title} (${aw.year}) represents a pivotal work in ${aw.movement}. ${artist?.name} employed ${aw.genome[0].trait} and ${aw.genome[1].trait} to create this enduring work. ${aw.description} The piece is now housed at ${aw.location}.`,
      expert: `${aw.title} (${aw.year}) stands as a exemplary specimen of ${aw.movement}'s formal vocabulary. ${artist?.name}'s deployment of ${aw.genome.map(g => g.trait).join(", ")} situates this work within the broader trajectory of Western art history. ${aw.description} The present location — ${aw.location} — reflects the work's canonical status.`,
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
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTyping(false);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [artworkId, level]);

  if (!artworkId || !artwork) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-end",
        padding: "0",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: "100%",
          background: "#0D1320",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderTop: "1px solid rgba(212,175,55,0.25)",
          padding: "20px 20px 40px",
          maxHeight: "75vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>AI Guide</div>
              <div style={{ fontSize: 10, background: "linear-gradient(90deg, #D4AF37, #F59E0B)", borderRadius: 20, padding: "2px 8px", color: "#0A0A0A", fontWeight: 700, letterSpacing: "0.04em" }}>
                DEMO
              </div>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>{artwork.title}</div>
          </div>
          <button
            onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            ×
          </button>
        </div>

        {/* Level selector */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4 }}>
          {(["beginner", "student", "expert"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              style={{
                flex: 1,
                padding: "8px 4px",
                borderRadius: 9,
                border: "none",
                background: level === l ? "rgba(212,175,55,0.2)" : "none",
                color: level === l ? "#D4AF37" : "rgba(255,255,255,0.4)",
                fontWeight: level === l ? 700 : 500,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.2s",
                textTransform: "capitalize",
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* AI response */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: "16px",
            minHeight: 120,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #D4AF37, #92400E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
              ✨
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

// ── Search Overlay ──
function SearchOverlay({
  open,
  onClose,
  onSelectArtwork,
}: {
  open: boolean;
  onClose: () => void;
  onSelectArtwork: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  const results = query.length > 0
    ? [
        ...ARTWORKS.filter(
          (a) =>
            a.title.toLowerCase().includes(query.toLowerCase()) ||
            a.movement.toLowerCase().includes(query.toLowerCase()) ||
            a.country.toLowerCase().includes(query.toLowerCase())
        ).map((a) => ({ type: "artwork" as const, item: a })),
        ...ARTISTS.filter(
          (a) =>
            a.name.toLowerCase().includes(query.toLowerCase()) ||
            a.movement.toLowerCase().includes(query.toLowerCase())
        ).map((a) => ({ type: "artist" as const, item: a })),
      ]
    : [];

  if (!open) return null;

  return (
    <div
      className="search-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "16px 16px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Artists, artworks, movements..."
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: 15,
              }}
            />
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 500,
              padding: "8px 4px",
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="scroll-y" style={{ flex: 1, padding: "0 16px" }}>
        {query.length === 0 && (
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 12, marginTop: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Trending Searches
            </div>
            {["Starry Night", "Impressionism", "Renaissance Italy", "Hokusai", "Baroque"].map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 14,
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 16 }}>🔍</span> {s}
              </button>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <div>
            {results.map(({ type, item }) => (
              <button
                key={item.id}
                onClick={() => {
                  if (type === "artwork") {
                    onSelectArtwork(item.id);
                    onClose();
                  }
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: type === "artwork" ? (item as typeof ARTWORKS[0]).gradient : "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {type === "artwork" ? (item as typeof ARTWORKS[0]).emoji : (item as typeof ARTISTS[0]).emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
                    {type === "artwork" ? (item as typeof ARTWORKS[0]).title : (item as typeof ARTISTS[0]).name}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>
                    {type === "artwork"
                      ? `${(item as typeof ARTWORKS[0]).movement} · ${(item as typeof ARTWORKS[0]).year}`
                      : `${(item as typeof ARTISTS[0]).movement} · ${(item as typeof ARTISTS[0]).country}`}
                  </div>
                </div>
                <div style={{ fontSize: 10, background: type === "artwork" ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.06)", border: `1px solid ${type === "artwork" ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.08)"}`, borderRadius: 20, padding: "2px 8px", color: type === "artwork" ? "#D4AF37" : "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "capitalize", flexShrink: 0 }}>
                  {type}
                </div>
              </button>
            ))}
          </div>
        )}

        {query.length > 0 && results.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>No results for "{query}"</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>Try searching for an artist or movement</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Journeys Tab ──
function JourneysTab({ onJourneyPress }: { onJourneyPress: (id: string) => void }) {
  return (
    <div className="scroll-y page-enter" style={{ height: "100%", padding: "20px 16px 90px" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Guided Journeys</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
        Follow curated paths through art history
      </div>

      {JOURNEYS.map((journey, i) => (
        <button
          key={journey.id}
          onClick={() => onJourneyPress(journey.id)}
          style={{
            width: "100%",
            marginBottom: 14,
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer",
            background: "none",
            padding: 0,
            textAlign: "left",
            display: "block",
            animationDelay: `${i * 60}ms`,
          }}
          className="page-enter"
        >
          <div className={journey.gradClass} style={{ padding: "20px 18px 16px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 4 }}>
                  {journey.title}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}>
                  {journey.subtitle}
                </div>
              </div>
              <div
                style={{
                  background: `${journey.accentColor}22`,
                  border: `1px solid ${journey.accentColor}44`,
                  borderRadius: 20,
                  padding: "4px 10px",
                  fontSize: 10,
                  color: journey.accentColor,
                  fontWeight: 700,
                  flexShrink: 0,
                  marginLeft: 10,
                }}
              >
                {journey.duration}
              </div>
            </div>

            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "12px 0", lineHeight: 1.5 }}>
              {journey.description}
            </div>

            {/* Stops */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              {journey.stops.map((stop, si) => (
                <span key={stop} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{stop}</span>
                  {si < journey.stops.length - 1 && (
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>→</span>
                  )}
                </span>
              ))}
            </div>

            {/* Progress */}
            {journey.progress > 0 && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>Progress</div>
                  <div style={{ fontSize: 10, color: journey.accentColor, fontWeight: 600 }}>{journey.progress}%</div>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
                  <div
                    className="progress-bar"
                    style={{ width: `${journey.progress}%`, height: "100%", background: `linear-gradient(90deg, ${journey.accentColor}, ${journey.accentColor}88)` }}
                  />
                </div>
              </div>
            )}
            {journey.progress === 0 && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  color: journey.accentColor,
                  fontWeight: 600,
                }}
              >
                Begin Journey →
              </div>
            )}
          </div>

          {/* Period */}
          <div style={{ background: "rgba(0,0,0,0.3)", padding: "8px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>📅 {journey.period}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
              {journey.artists.length} artist{journey.artists.length > 1 ? "s" : ""} · {journey.artworks.length} artwork{journey.artworks.length > 1 ? "s" : ""}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ── Passport Tab ──
function PassportTab({
  passport,
  discovered,
}: {
  passport: PassportEntry[];
  discovered: ArtistDiscovered[];
}) {
  const visitedCountries = passport.length;
  const totalCountries = COUNTRIES.length;
  const discoveredArtists = discovered.length;
  const totalArtists = ARTISTS.length;
  const movements = [...new Set(discovered.map((d) => ARTISTS.find((a) => a.id === d.artistId)?.movement).filter(Boolean))];
  const totalMovements = Object.keys(MOVEMENTS_DESC).length;

  const achievements = [
    {
      id: "first-step",
      title: "First Step",
      desc: "Visited your first country",
      icon: "🗺️",
      unlocked: visitedCountries >= 1,
    },
    {
      id: "globe-trotter",
      title: "Globe Trotter",
      desc: "Visited 4 countries",
      icon: "✈️",
      unlocked: visitedCountries >= 4,
    },
    {
      id: "art-lover",
      title: "Art Lover",
      desc: "Discovered your first artist",
      icon: "💛",
      unlocked: discoveredArtists >= 1,
    },
    {
      id: "connoisseur",
      title: "Connoisseur",
      desc: "Discovered 5 artists",
      icon: "🎖️",
      unlocked: discoveredArtists >= 5,
    },
    {
      id: "renaissance",
      title: "Renaissance Soul",
      desc: "Explored the Renaissance movement",
      icon: "🏛️",
      unlocked: movements.includes("Renaissance"),
    },
    {
      id: "impressionist",
      title: "Impressionist",
      desc: "Explored Impressionism",
      icon: "🌸",
      unlocked: movements.includes("Impressionism"),
    },
  ];

  return (
    <div className="scroll-y page-enter" style={{ height: "100%", padding: "20px 16px 90px" }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Art Passport</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
        Your journey through art history
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
        {[
          { label: "Countries", value: visitedCountries, total: totalCountries, icon: "🌍", color: "#D4AF37" },
          { label: "Artists", value: discoveredArtists, total: totalArtists, icon: "🎨", color: "#87CEEB" },
          { label: "Movements", value: movements.length, total: totalMovements, icon: "🎭", color: "#E05C5C" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "rgba(17,24,39,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "14px 10px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: stat.color, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
              of {stat.total} {stat.label}
            </div>
            <div style={{ marginTop: 8, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${(stat.value / stat.total) * 100}%`, height: "100%", background: stat.color, borderRadius: 2, transition: "width 1s ease" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Countries visited */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Countries Explored</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {COUNTRIES.map((country) => {
            const visited = passport.some((p) => p.countryId === country.id);
            return (
              <div
                key={country.id}
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  background: visited ? `${country.color}22` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${visited ? country.color + "44" : "rgba(255,255,255,0.08)"}`,
                  fontSize: 12,
                  color: visited ? country.color : "rgba(255,255,255,0.3)",
                  fontWeight: visited ? 600 : 400,
                }}
              >
                {visited ? "✓ " : ""}{country.id}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Achievements</div>
        {achievements.map((ach, i) => (
          <div
            key={ach.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 14px",
              marginBottom: 8,
              background: ach.unlocked ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${ach.unlocked ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: 16,
              opacity: ach.unlocked ? 1 : 0.5,
              animationDelay: `${i * 50}ms`,
            }}
            className={ach.unlocked ? "achievement-unlock" : ""}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: ach.unlocked ? "linear-gradient(135deg, #D4AF3722, #92400E22)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${ach.unlocked ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.06)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {ach.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: ach.unlocked ? "#fff" : "rgba(255,255,255,0.4)" }}>
                {ach.title}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{ach.desc}</div>
            </div>
            {ach.unlocked && (
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(212,175,55,0.2)", border: "1px solid rgba(212,175,55,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#D4AF37" }}>
                ✓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Profile Tab ──
function ProfileTab() {
  const [darkMode] = useState(true);

  const stats = [
    { label: "Hours Exploring", value: "12.4" },
    { label: "Artworks Viewed", value: "47" },
    { label: "Notes Taken", value: "8" },
    { label: "Journeys Started", value: "2" },
  ];

  return (
    <div className="scroll-y page-enter" style={{ height: "100%", padding: "20px 16px 90px" }}>
      {/* Avatar */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #D4AF37 0%, #92400E 100%)",
            margin: "0 auto 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            boxShadow: "0 0 0 3px rgba(212,175,55,0.2), 0 0 24px rgba(212,175,55,0.2)",
          }}
        >
          🎨
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Art Explorer</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
          Member since June 2026
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 10,
            background: "linear-gradient(90deg, rgba(212,175,55,0.15), rgba(146,64,14,0.15))",
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: 20,
            padding: "4px 14px",
            fontSize: 11,
            color: "#D4AF37",
            fontWeight: 700,
          }}
        >
          ✦ Renaissance Scholar
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "rgba(17,24,39,0.85)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: "14px",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#D4AF37", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Favorite Movement */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>About Art Movements</div>
        {Object.entries(MOVEMENTS_DESC).slice(0, 4).map(([name, desc]) => (
          <div
            key={name}
            style={{
              marginBottom: 10,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: "12px 14px",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#D4AF37", marginBottom: 4 }}>{name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Preferences</div>
        {[
          { label: "Dark Mode", icon: "🌙", active: darkMode },
          { label: "Push Notifications", icon: "🔔", active: true },
          { label: "Daily Art History", icon: "📅", active: true },
        ].map((pref) => (
          <div
            key={pref.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>{pref.icon}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{pref.label}</span>
            </div>
            <div
              style={{
                width: 42,
                height: 24,
                borderRadius: 12,
                background: pref.active ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.1)",
                border: `1px solid ${pref.active ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.1)"}`,
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  left: pref.active ? 21 : 3,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: pref.active ? "#D4AF37" : "rgba(255,255,255,0.4)",
                  transition: "left 0.2s",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Bottom Nav ──
function BottomNav({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const tabs = [
    { id: "explore" as Tab, icon: "🌍", label: "Explore" },
    { id: "journeys" as Tab, icon: "🧭", label: "Journeys" },
    { id: "passport" as Tab, icon: "🛂", label: "Passport" },
    { id: "profile" as Tab, icon: "👤", label: "Profile" },
  ];

  return (
    <div
      className="nav-glass"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: "flex",
        padding: "8px 0 20px",
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px 0",
            transition: "all 0.2s",
          }}
        >
          <span
            style={{
              fontSize: 20,
              filter: tab === t.id ? "drop-shadow(0 0 6px rgba(212,175,55,0.6))" : "none",
              transform: tab === t.id ? "scale(1.1)" : "scale(1)",
              display: "block",
              transition: "all 0.2s",
            }}
          >
            {t.icon}
          </span>
          <span
            style={{
              fontSize: 9,
              fontWeight: tab === t.id ? 700 : 500,
              color: tab === t.id ? "#D4AF37" : "rgba(255,255,255,0.35)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
          >
            {t.label}
          </span>
          {tab === t.id && (
            <div
              style={{
                position: "absolute",
                bottom: 20,
                width: 32,
                height: 2,
                background: "#D4AF37",
                borderRadius: 1,
                boxShadow: "0 0 8px rgba(212,175,55,0.5)",
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState<Tab>("explore");
  const [year, setYear] = useState(1500);
  const [selectedCountry, setSelectedCountry] = useState<typeof COUNTRIES[0] | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<typeof ARTWORKS[0] | null>(null);
  const [aiArtworkId, setAiArtworkId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [passport, setPassport] = useState<PassportEntry[]>([]);
  const [discovered, setDiscovered] = useState<ArtistDiscovered[]>([]);
  const [todayOpen, setTodayOpen] = useState(false);

  const era = getEraForYear(year);

  const handleCountryTap = useCallback(
    (countryId: string) => {
      const country = COUNTRIES.find((c) => c.id === countryId);
      if (!country) return;
      setSelectedArtwork(null);
      setSelectedCountry(country);

      // Passport stamp
      if (!passport.some((p) => p.countryId === countryId)) {
        setPassport((prev) => [...prev, { countryId, visitedAt: Date.now() }]);
      }

      // Discover artists from country artworks
      country.artworks.forEach((awId) => {
        const aw = getArtwork(awId);
        if (aw && !discovered.some((d) => d.artistId === aw.artistId)) {
          setDiscovered((prev) => [...prev, { artistId: aw.artistId, discoveredAt: Date.now() }]);
        }
      });
    },
    [passport, discovered]
  );

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

  const sheetOpen = !!selectedCountry || !!selectedArtwork;
  const showBottomSheet = tab === "explore";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#09090B",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── EXPLORE TAB ── */}
      {tab === "explore" && (
        <div style={{ position: "absolute", inset: 0 }}>
          {/* Map */}
          <div style={{ position: "absolute", inset: 0 }}>
            <WorldMap
              activeCountries={era.activeCountries}
              onCountryTap={handleCountryTap}
            />
          </div>

          {/* Top overlay */}
          <TopBar onSearch={() => setSearchOpen(true)} />

          {/* Today in Art History */}
          <TodayCard onPress={handleTodayArtwork} />

          {/* Surprise Me */}
          {!sheetOpen && <SurpriseBtn onClick={handleSurprise} />}

          {/* Timeline */}
          {!sheetOpen && (
            <TimelineSlider year={year} onChange={handleYearChange} era={era} />
          )}

          {/* Bottom Sheet */}
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

      {/* ── JOURNEYS TAB ── */}
      {tab === "journeys" && (
        <div style={{ position: "absolute", inset: 0, paddingBottom: 0 }}>
          <div style={{ height: "100%", paddingTop: 0, overflow: "hidden" }}>
            <JourneysTab onJourneyPress={(id) => console.log("journey:", id)} />
          </div>
        </div>
      )}

      {/* ── PASSPORT TAB ── */}
      {tab === "passport" && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <PassportTab passport={passport} discovered={discovered} />
        </div>
      )}

      {/* ── PROFILE TAB ── */}
      {tab === "profile" && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <ProfileTab />
        </div>
      )}

      {/* ── BOTTOM NAV (always visible) ── */}
      <BottomNav tab={tab} onChange={(t) => { setTab(t); setSelectedCountry(null); setSelectedArtwork(null); }} />

      {/* ── AI Guide Modal ── */}
      <AIGuideModal
        artworkId={aiArtworkId}
        onClose={() => setAiArtworkId(null)}
      />

      {/* ── Search Overlay ── */}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectArtwork={handleSelectArtwork}
      />
    </div>
  );
}
