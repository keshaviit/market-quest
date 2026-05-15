// ─── Company Data ────────────────────────────────────────────────────────────
export const INITIAL_COMPANIES = [
  {
    id: 'chocoblast',
    name: 'ChocoBlast',
    emoji: '🍫',
    tagline: 'Sweetest treats in town!',
    color: 'from-amber-400 to-orange-500',
    lightBg: 'bg-amber-50',
    border: 'border-amber-300',
    price: 100,
  },
  {
    id: 'playforge',
    name: 'PlayForge',
    emoji: '🎮',
    tagline: 'Games you can never put down!',
    color: 'from-violet-500 to-purple-600',
    lightBg: 'bg-violet-50',
    border: 'border-violet-300',
    price: 200,
  },
  {
    id: 'robospark',
    name: 'RoboSpark',
    emoji: '🤖',
    tagline: 'Building the future, one bot at a time!',
    color: 'from-cyan-400 to-blue-500',
    lightBg: 'bg-cyan-50',
    border: 'border-cyan-300',
    price: 300,
  },
];

// ─── News Events ─────────────────────────────────────────────────────────────
// Each event targets one company and has a priceChange (% as a decimal)
export const EVENTS = [
  // ChocoBlast events
  {
    id: 'e1',
    companyId: 'chocoblast',
    headline: '🍫 ChocoBlast launches a new Mega Chocolate Bar!',
    detail: 'Kids everywhere are going crazy for it. Sales are through the roof!',
    priceChange: 0.20,
    direction: 'up',
  },
  {
    id: 'e2',
    companyId: 'chocoblast',
    headline: '🍫 ChocoBlast factory had a big accident!',
    detail: 'Chocolate production is temporarily stopped. Bad news for sweet lovers!',
    priceChange: -0.15,
    direction: 'down',
  },
  {
    id: 'e3',
    companyId: 'chocoblast',
    headline: '🌟 ChocoBlast wins Best Snack of the Year award!',
    detail: 'Everyone loves ChocoBlast even more now!',
    priceChange: 0.12,
    direction: 'up',
  },
  {
    id: 'e4',
    companyId: 'chocoblast',
    headline: '😬 Sugar prices have gone up a lot!',
    detail: 'Making chocolate is now more expensive for ChocoBlast.',
    priceChange: -0.10,
    direction: 'down',
  },

  // PlayForge events
  {
    id: 'e5',
    companyId: 'playforge',
    headline: '🎮 PlayForge releases the most popular game ever!',
    detail: 'Everyone is playing "SuperStar Quest" — it sold millions in one day!',
    priceChange: 0.25,
    direction: 'up',
  },
  {
    id: 'e6',
    companyId: 'playforge',
    headline: '😟 PlayForge\'s biggest game has a huge bug!',
    detail: 'Players are angry and want refunds. Not a good day for PlayForge.',
    priceChange: -0.18,
    direction: 'down',
  },
  {
    id: 'e7',
    companyId: 'playforge',
    headline: '🏆 PlayForge wins Game Company of the Year!',
    detail: 'Great recognition for PlayForge — investors are excited!',
    priceChange: 0.15,
    direction: 'up',
  },
  {
    id: 'e8',
    companyId: 'playforge',
    headline: '💻 A new rival game company just started!',
    detail: 'Competition just got tougher for PlayForge.',
    priceChange: -0.12,
    direction: 'down',
  },

  // RoboSpark events
  {
    id: 'e9',
    companyId: 'robospark',
    headline: '🤖 RoboSpark\'s robot helper just went viral!',
    detail: 'A video of their robot cleaning a house got 10 million views!',
    priceChange: 0.22,
    direction: 'up',
  },
  {
    id: 'e10',
    companyId: 'robospark',
    headline: '⚡ RoboSpark robot recalled due to safety issues!',
    detail: 'Some robots behaved unexpectedly. RoboSpark must fix them all.',
    priceChange: -0.20,
    direction: 'down',
  },
  {
    id: 'e11',
    companyId: 'robospark',
    headline: '🚀 Government chooses RoboSpark for a big project!',
    detail: 'A huge government contract means big money for RoboSpark!',
    priceChange: 0.30,
    direction: 'up',
  },
  {
    id: 'e12',
    companyId: 'robospark',
    headline: '🌧️ RoboSpark\'s key engineer just resigned!',
    detail: 'Losing their best engineer is a big blow to RoboSpark.',
    priceChange: -0.14,
    direction: 'down',
  },
];

// ─── Game Constants ───────────────────────────────────────────────────────────
export const STARTING_CASH = 5000;
export const TOTAL_ROUNDS = 5;
export const CORRECT_PREDICTION_BONUS = 150;

// ─── Badge Rules ─────────────────────────────────────────────────────────────
export const getBadge = (finalWealth, startingWealth) => {
  const gain = finalWealth - startingWealth;
  if (gain >= 1500) {
    return { label: 'Smart Investor', emoji: '🧠', colorA: '#10b981', colorB: '#0d9488', desc: 'Amazing! You made great decisions and grew your money a lot!' };
  } else if (gain >= 500) {
    return { label: 'Risk Hero', emoji: '🚀', colorA: '#8b5cf6', colorB: '#7c3aed', desc: 'Great job! You took smart risks and came out ahead!' };
  } else if (gain >= 0) {
    return { label: 'Money Hero', emoji: '⭐', colorA: '#f59e0b', colorB: '#f97316', desc: 'Good effort! You kept your money safe and learned a lot!' };
  } else {
    return { label: 'Market Explorer', emoji: '🌍', colorA: '#0ea5e9', colorB: '#2563eb', desc: "Don't worry! Every expert started by learning from mistakes. Try again!" };
  }
};
