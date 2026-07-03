// Mock catalog for JP MAN WORLD concept site.
// All content is fictional and illustrative.

import { pexels } from "./images";

export type Product = {
  slug: string;
  name: string;
  jp: string;
  price: number;
  collection: CollectionSlug;
  origin: string;
  maker: string;
  story: string;
  specs: { label: string; value: string }[];
  images: { alt: string; hue: number; tone: "cream" | "paper" | "stone" | "wood" | "ink"; src?: string }[];
  tags: string[];
  isNew?: boolean;
  isLimited?: boolean;
};

export type CollectionSlug =
  | "kitchen-table"
  | "snack-pantry"
  | "skin-ritual"
  | "home-living"
  | "tea-time"
  | "gifting"
  | "seasonal";

export const collections: {
  slug: CollectionSlug;
  name: string;
  jp: string;
  tagline: string;
  description: string;
  image?: string;
}[] = [
  { slug: "kitchen-table", name: "Kitchen & Table", jp: "台所", tagline: "Tools for the daily meal.", description: "Cast iron, cedar, hand-thrown porcelain. Everyday objects made to last a lifetime.", image: pexels.sushi },
  { slug: "snack-pantry", name: "Snack & Pantry", jp: "食品庫", tagline: "The Japanese pantry, delivered.", description: "Regional snacks, seasoning, and staples sourced from small Japanese producers.", image: pexels.bowls },
  { slug: "skin-ritual", name: "Skin & Ritual", jp: "肌の儀式", tagline: "The quiet practice of care.", description: "Cleansers, oils, and bath goods drawn from centuries of Japanese wellness ritual.", image: pexels.bodyBrush },
  { slug: "home-living", name: "Home & Living", jp: "住まい", tagline: "Rooms that breathe.", description: "Textiles, incense, and light — objects that make a space feel calm and considered.", image: pexels.incense },
  { slug: "tea-time", name: "Tea Time", jp: "お茶の時間", tagline: "A pause, twice a day.", description: "Sencha, matcha, hojicha and the vessels made to hold them.", image: pexels.vintageCups },
  { slug: "gifting", name: "Gifting", jp: "贈り物", tagline: "Wrapped with intention.", description: "Curated sets in furoshiki cloth. The Japanese art of giving.", image: pexels.bathEssentials },
  { slug: "seasonal", name: "Seasonal Picks", jp: "季節", tagline: "This season, from Japan.", description: "A rotating edit that follows the Japanese calendar of small seasons.", image: pexels.bowls },
];

const p = (
  slug: string,
  name: string,
  jp: string,
  price: number,
  collection: CollectionSlug,
  origin: string,
  maker: string,
  story: string,
  specs: [string, string][],
  tones: Product["images"][number]["tone"][],
  tags: string[] = [],
  flags: Partial<Pick<Product, "isNew" | "isLimited">> = {},
): Product => ({
  slug,
  name,
  jp,
  price,
  collection,
  origin,
  maker,
  story,
  specs: specs.map(([label, value]) => ({ label, value })),
  images: tones.map((tone, i) => ({ alt: `${name} — view ${i + 1}`, hue: (slug.charCodeAt(0) * 7 + i * 37) % 60, tone })),
  tags,
  ...flags,
});

export const products: Product[] = [
  p("nambu-tetsubin", "Nambu Tetsubin Kettle", "南部鉄瓶", 78500, "kitchen-table", "Iwate, Japan", "Oigen Foundry", "Cast in Iwate by fourth-generation ironworkers, this tetsubin softens water and enriches tea with a whisper of iron.", [["Material", "Cast iron"], ["Capacity", "1.2L"], ["Weight", "1.8kg"], ["Care", "Rinse, dry over low flame"]], ["ink", "wood", "cream"], ["bestseller"], { isNew: false }),
  p("hinoki-cutting-board", "Hinoki Cutting Board", "檜まな板", 24500, "kitchen-table", "Kiso Valley", "Yamacoh", "Kiso hinoki cypress — naturally antibacterial, gentle on knife edges, and quietly fragrant.", [["Material", "Kiso hinoki"], ["Size", "36 × 20 × 2cm"], ["Origin", "Nagano"]], ["cream", "wood", "paper"]),
  p("arita-tea-cup", "Arita Porcelain Cup", "有田焼", 9800, "tea-time", "Saga, Japan", "Kihara", "Four centuries of Arita porcelain, thrown thin and glazed to catch the light.", [["Material", "Porcelain"], ["Volume", "180ml"], ["Set", "Single cup"]], ["paper", "cream", "stone"], ["bestseller"]),
  p("uji-matcha-ceremonial", "Uji Ceremonial Matcha", "宇治抹茶", 14500, "tea-time", "Uji, Kyoto", "Ippodo (concept)", "Stone-milled from first-harvest tencha grown under shade in the hills above Uji.", [["Grade", "Ceremonial"], ["Weight", "30g"], ["Harvest", "First flush"]], ["wood", "cream", "paper"], ["organic"], { isLimited: true }),
  p("hojicha-loose", "Hojicha Loose Leaf", "ほうじ茶", 6500, "tea-time", "Shizuoka", "Marukyu (concept)", "Roasted stems and leaves — nutty, low in caffeine, ideal for evening.", [["Weight", "80g"], ["Steep", "80°C, 30s"]], ["wood", "ink"]),
  p("kaya-shampoo-bar", "Kaya Camellia Shampoo Bar", "椿シャンプー", 8900, "skin-ritual", "Nagasaki", "Goto Tsubaki", "Cold-pressed camellia oil from the Goto Islands, saponified slowly into a single, honest bar.", [["Weight", "110g"], ["Uses", "~60 washes"]], ["cream", "paper"]),
  p("yuzu-bath-salt", "Yuzu Bath Salt", "柚子塩湯", 5400, "skin-ritual", "Kochi", "Umi Kaze", "Winter yuzu peel and Okinawan sea salt. The onsen ritual, at home.", [["Weight", "300g"], ["Baths", "6"]], ["cream", "paper", "wood"]),
  p("indigo-noren", "Indigo Noren Curtain", "藍暖簾", 32000, "home-living", "Tokushima", "Aizumi Atelier", "Naturally dyed with sukumo indigo. A soft threshold between rooms.", [["Material", "Cotton"], ["Size", "85 × 150cm"]], ["ink", "paper"]),
  p("hinoki-incense", "Hinoki Incense", "檜香", 4800, "home-living", "Awaji Island", "Kunjudo", "The scent of a wet cedar forest, compressed into a slow, resinous smoke.", [["Sticks", "60"], ["Burn", "25 min"]], ["wood", "ink"]),
  p("shiro-shoyu", "Shiro Shoyu — White Soy", "白醤油", 3200, "snack-pantry", "Aichi", "Nitto Jozo", "Wheat-forward white soy with a pale, delicate finish. Excellent for dashi and eggs.", [["Volume", "300ml"], ["Age", "6 months"]], ["cream", "paper"]),
  p("okinawan-salt", "Okinawan Sea Salt", "沖縄の塩", 2400, "snack-pantry", "Okinawa", "Nuchima-su", "Mineral-rich flake salt from the coral waters of Miyako-jima.", [["Weight", "120g"]], ["cream", "paper"]),
  p("mochi-box", "Assorted Daifuku Mochi", "大福詰合せ", 6800, "snack-pantry", "Kyoto", "Demachi Futaba (concept)", "A dozen daifuku — matcha, kinako, sakura, kuro-goma — flown weekly.", [["Count", "12 pieces"], ["Shelf", "3 days"]], ["paper", "cream"], ["fresh"]),
  p("ochoko-set", "Sake Ochoko Set", "お猪口", 12800, "gifting", "Gifu", "Shotoku Glass", "Hand-blown Edo kiriko glasses, boxed with a pair of tokkuri.", [["Set", "2 cups + carafe"], ["Volume", "60ml each"]], ["paper", "stone"], ["gift"]),
  p("furoshiki-set", "Furoshiki Wrap Trio", "風呂敷三点", 9800, "gifting", "Kyoto", "Musubi", "Three sizes of dyed cotton — the endlessly reusable Japanese gift wrap.", [["Sizes", "50, 70, 100cm"], ["Material", "Cotton"]], ["cream", "paper", "wood"]),
  p("kadomatsu-mini", "Mini Kadomatsu", "門松", 15500, "seasonal", "Kanagawa", "Aoyama Flower", "A small New Year kadomatsu — pine, bamboo, plum. To welcome the year.", [["Height", "22cm"], ["Season", "December–January"]], ["wood", "cream"], ["seasonal"], { isLimited: true }),
  p("sakura-tea", "Sakura Blossom Tea", "桜茶", 3800, "seasonal", "Nara", "Yamamotoyama", "Salt-pickled cherry blossoms that bloom again in the cup. A spring ritual.", [["Weight", "40g"]], ["paper", "cream"], ["seasonal"]),
];

// Real photography assigned to specific products, keyed by slug.
// Only the primary (first) image per product is swapped — additional
// angles stay as generated placeholders until more photos are supplied.
const productPhotoBySlug: Partial<Record<string, string>> = {
  "nambu-tetsubin": pexels.teapot,
  "hinoki-cutting-board": pexels.knifeAsparagus,
  "arita-tea-cup": pexels.vintageCups,
  "uji-matcha-ceremonial": pexels.matchaScoop,
  "hojicha-loose": pexels.teaLeaves,
  "kaya-shampoo-bar": pexels.bodyBrush,
  "yuzu-bath-salt": pexels.bathEssentials,
  "hinoki-incense": pexels.incense,
  "shiro-shoyu": pexels.sauces,
  "okinawan-salt": pexels.rockSalt,
  "mochi-box": pexels.mochi,
  // Approximate matches — no exact photo supplied for these, closest
  // available substitute used. Flag these for real product photography
  // first, since the visual match here is loose.
  "ochoko-set": pexels.vintageCups, // sake cups — reusing the cup-shelf photo
  "furoshiki-set": pexels.bathEssentials, // cloth wrap — reusing folded-fabric photo
  "sakura-tea": pexels.teaCeremony, // seasonal tea — reusing ceremony photo
  // No reasonable stock substitute exists for these — stays as generated
  // placeholder until real photography is available:
  // "indigo-noren" (dyed textile), "kadomatsu-mini" (New Year arrangement)
};

for (const product of products) {
  const src = productPhotoBySlug[product.slug];
  if (src && product.images[0]) product.images[0].src = src;
}

export const journal: {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  minutes: number;
  date: string;
  tone: "cream" | "paper" | "stone" | "wood" | "ink";
  image?: string;
}[] = [
  { slug: "the-quiet-ritual-of-morning-tea", category: "Ritual", title: "The Quiet Ritual of Morning Tea", excerpt: "Why the first pour of the day matters more than the last.", author: "JP MAN Editorial", minutes: 6, date: "March 2026", tone: "cream", image: pexels.teaCeremony },
  { slug: "hinoki-a-scent-of-place", category: "Home", title: "Hinoki: A Scent of Place", excerpt: "The Kiso cypress and the four-hundred-year-old bath it built.", author: "Kenji Adeyemi", minutes: 8, date: "February 2026", tone: "wood", image: pexels.knifeAsparagus },
  { slug: "wagashi-in-lagos", category: "Food", title: "Wagashi in Lagos", excerpt: "How our pastry chef translates the seasons of Kyoto to the seasons of Lagos.", author: "Aiko Balogun", minutes: 5, date: "February 2026", tone: "paper", image: pexels.mochi },
  { slug: "the-art-of-furoshiki", category: "Guide", title: "The Art of Furoshiki", excerpt: "Four folds to wrap any object as a gift.", author: "JP MAN Editorial", minutes: 4, date: "January 2026", tone: "ink", image: pexels.bathEssentials },
  { slug: "small-seasons", category: "Culture", title: "Seventy-Two Small Seasons", excerpt: "The Japanese calendar of five-day seasons, and what to notice this week.", author: "JP MAN Editorial", minutes: 7, date: "January 2026", tone: "stone", image: pexels.torii },
  { slug: "the-onsen-at-home", category: "Ritual", title: "The Onsen at Home", excerpt: "A small guide to the winter bath — yuzu, salt, silence.", author: "Aiko Balogun", minutes: 5, date: "December 2025", tone: "cream", image: pexels.bodyBrush },
];

export const events: {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  seats: string;
  tone: "cream" | "paper" | "stone" | "wood" | "ink";
  description: string;
  image?: string;
}[] = [
  { slug: "matcha-tasting-april", title: "Uji Matcha Tasting", date: "Sat, 18 April 2026", time: "3:00 – 4:30 PM", location: "JP MAN Store, Ikoyi", seats: "12 seats", tone: "wood", description: "A guided tasting of four first-flush matcha grades, poured by our tea sommelier.", image: pexels.matchaScoop },
  { slug: "ramen-night", title: "Ramen Night: Sapporo Miso", date: "Fri, 24 April 2026", time: "7:00 PM", location: "JP MAN Store, Ikoyi", seats: "20 seats", tone: "ink", description: "Chef Aiko cooks a Hokkaido miso ramen, one bowl at a time. Sake pairing included.", image: pexels.ramen },
  { slug: "furoshiki-workshop", title: "Furoshiki Wrapping Workshop", date: "Sun, 3 May 2026", time: "11:00 AM", location: "JP MAN Store, Ikoyi", seats: "15 seats", tone: "paper", description: "Learn eight folds. Wrap a bottle, a box, a book. Cloth included.", image: pexels.bathEssentials },
  { slug: "hanami-lagos", title: "Hanami in Lagos", date: "Sat, 16 May 2026", time: "5:00 PM", location: "Freedom Park", seats: "Open", tone: "cream", description: "A picnic under the flame trees. Bento, sakura tea, and a small koto performance.", image: pexels.bowls },
];
