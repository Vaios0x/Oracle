export interface MarketTemplate {
  id: string;
  name: string;
  question: string;
  description: string;
  category: number;
  daysUntilEnd: number;
  resolutionSource: string;
  initialLiquidity: number;
  tags: string[];
  popularity: number;
}

export const MARKET_TEMPLATES: MarketTemplate[] = [
  // Crypto Templates
  {
    id: 'btc-100k-2025',
    name: 'Bitcoin $100K Prediction',
    question: 'Will BTC hit $100K by end of 2025?',
    description: 'Bitcoin price milestone prediction based on major exchange data and market sentiment analysis.',
    category: 0, // Crypto
    daysUntilEnd: 60,
    resolutionSource: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    initialLiquidity: 500_000_000, // 500 USDC
    tags: ['bitcoin', 'crypto', 'price', 'milestone'],
    popularity: 95
  },
  {
    id: 'eth-5k-q1-2026',
    name: 'Ethereum $5K Q1 2026',
    question: 'Will ETH surpass $5K in Q1 2026?',
    description: 'Ethereum price milestone prediction for the first quarter of 2026.',
    category: 0,
    daysUntilEnd: 90,
    resolutionSource: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    initialLiquidity: 300_000_000, // 300 USDC
    tags: ['ethereum', 'crypto', 'price', 'q1-2026'],
    popularity: 88
  },
  {
    id: 'sol-500-2025',
    name: 'Solana $500 Prediction',
    question: 'Will SOL reach $500 by end of 2025?',
    description: 'Solana token price prediction based on ecosystem growth and adoption metrics.',
    category: 0,
    daysUntilEnd: 120,
    resolutionSource: 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
    initialLiquidity: 400_000_000, // 400 USDC
    tags: ['solana', 'crypto', 'price', 'ecosystem'],
    popularity: 82
  },

  // Technology Templates
  {
    id: 'solana-100k-tps',
    name: 'Solana 100K TPS',
    question: 'Will Solana process 100K TPS this year?',
    description: 'Network performance milestone for Solana blockchain based on actual TPS metrics.',
    category: 4, // Technology
    daysUntilEnd: 120,
    resolutionSource: 'https://explorer.solana.com/metrics',
    initialLiquidity: 200_000_000, // 200 USDC
    tags: ['solana', 'tps', 'performance', 'blockchain'],
    popularity: 75
  },
  {
    id: 'ai-agi-2026',
    name: 'AGI Achievement',
    question: 'Will AGI be achieved by end of 2026?',
    description: 'Artificial General Intelligence milestone prediction based on AI research progress.',
    category: 4,
    daysUntilEnd: 365,
    resolutionSource: 'https://api.example.com/ai-progress',
    initialLiquidity: 1000_000_000, // 1000 USDC
    tags: ['ai', 'agi', 'technology', 'future'],
    popularity: 90
  },

  // Sports Templates
  {
    id: 'world-cup-2026',
    name: 'World Cup 2026 Winner',
    question: 'Will Brazil win the 2026 FIFA World Cup?',
    description: 'FIFA World Cup 2026 winner prediction based on team performance and historical data.',
    category: 1, // Sports
    daysUntilEnd: 365,
    resolutionSource: 'https://api.fifa.com/worldcup/2026',
    initialLiquidity: 600_000_000, // 600 USDC
    tags: ['fifa', 'world-cup', 'soccer', 'brazil'],
    popularity: 85
  },
  {
    id: 'super-bowl-2026',
    name: 'Super Bowl 2026 Winner',
    question: 'Will the Kansas City Chiefs win Super Bowl 2026?',
    description: 'NFL Super Bowl 2026 winner prediction based on team performance and odds.',
    category: 1,
    daysUntilEnd: 180,
    resolutionSource: 'https://api.nfl.com/superbowl/2026',
    initialLiquidity: 400_000_000, // 400 USDC
    tags: ['nfl', 'super-bowl', 'chiefs', 'football'],
    popularity: 78
  },

  // Politics Templates
  {
    id: 'us-election-2028',
    name: 'US Election 2028',
    question: 'Will a Republican win the 2028 US Presidential Election?',
    description: 'US Presidential Election 2028 outcome prediction based on polling data and political trends.',
    category: 2, // Politics
    daysUntilEnd: 1095, // 3 years
    resolutionSource: 'https://api.realclearpolitics.com/elections/2028',
    initialLiquidity: 2000_000_000, // 2000 USDC
    tags: ['politics', 'election', 'president', 'republican'],
    popularity: 92
  },
  {
    id: 'brexit-rejoin',
    name: 'UK Rejoin EU',
    question: 'Will the UK rejoin the EU by 2030?',
    description: 'UK-EU relationship prediction based on political developments and public opinion.',
    category: 2,
    daysUntilEnd: 1825, // 5 years
    resolutionSource: 'https://api.parliament.uk/eu-relations',
    initialLiquidity: 1500_000_000, // 1500 USDC
    tags: ['brexit', 'eu', 'uk', 'politics'],
    popularity: 70
  },

  // Entertainment Templates
  {
    id: 'oscars-2026',
    name: 'Oscars 2026 Best Picture',
    question: 'Will a Marvel movie win Best Picture at the 2026 Oscars?',
    description: 'Academy Awards 2026 Best Picture winner prediction based on industry trends.',
    category: 3, // Entertainment
    daysUntilEnd: 180,
    resolutionSource: 'https://api.oscars.org/2026/best-picture',
    initialLiquidity: 300_000_000, // 300 USDC
    tags: ['oscars', 'marvel', 'movies', 'entertainment'],
    popularity: 65
  },
  {
    id: 'netflix-subscribers',
    name: 'Netflix Subscribers 2025',
    question: 'Will Netflix reach 300M subscribers by end of 2025?',
    description: 'Netflix subscriber milestone prediction based on growth trends and market analysis.',
    category: 3,
    daysUntilEnd: 90,
    resolutionSource: 'https://api.netflix.com/subscribers/2025',
    initialLiquidity: 500_000_000, // 500 USDC
    tags: ['netflix', 'streaming', 'subscribers', 'entertainment'],
    popularity: 72
  },

  // Other Templates
  {
    id: 'climate-goals',
    name: 'Climate Goals 2030',
    question: 'Will global CO2 emissions decrease by 50% by 2030?',
    description: 'Climate change mitigation prediction based on international agreements and progress.',
    category: 5, // Other
    daysUntilEnd: 1825, // 5 years
    resolutionSource: 'https://api.un.org/climate/emissions/2030',
    initialLiquidity: 1000_000_000, // 1000 USDC
    tags: ['climate', 'environment', 'co2', 'sustainability'],
    popularity: 80
  },
  {
    id: 'space-tourism',
    name: 'Space Tourism 2026',
    question: 'Will commercial space tourism reach 1000 passengers in 2026?',
    description: 'Space tourism milestone prediction based on industry development and bookings.',
    category: 5,
    daysUntilEnd: 365,
    resolutionSource: 'https://api.space-tourism.com/passengers/2026',
    initialLiquidity: 800_000_000, // 800 USDC
    tags: ['space', 'tourism', 'commercial', 'future'],
    popularity: 68
  }
];

export const getTemplatesByCategory = (category: number) => {
  return MARKET_TEMPLATES.filter(template => template.category === category);
};

export const getPopularTemplates = (limit: number = 6) => {
  return MARKET_TEMPLATES
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getTemplateById = (id: string) => {
  return MARKET_TEMPLATES.find(template => template.id === id);
};

export const searchTemplates = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return MARKET_TEMPLATES.filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.question.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
