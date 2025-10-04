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
  // Crypto Templates - Actualizados para 2025
  {
    id: 'btc-200k-2025',
    name: 'Bitcoin $200K Prediction',
    question: 'Will BTC reach $200K by December 31, 2025?',
    description: 'Bitcoin price milestone prediction based on ETF adoption, institutional flows, and halving cycle analysis.',
    category: 0, // Crypto
    daysUntilEnd: 90,
    resolutionSource: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    initialLiquidity: 2000_000_000, // 2000 USDC
    tags: ['bitcoin', 'crypto', 'price', 'milestone', 'etf'],
    popularity: 98
  },
  {
    id: 'eth-10k-2025',
    name: 'Ethereum $10K Prediction',
    question: 'Will ETH surpass $10K by end of 2025?',
    description: 'Ethereum price prediction based on EIP-4844 adoption, L2 growth, and DeFi TVL expansion.',
    category: 0,
    daysUntilEnd: 90,
    resolutionSource: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    initialLiquidity: 1500_000_000, // 1500 USDC
    tags: ['ethereum', 'crypto', 'price', 'defi', 'l2'],
    popularity: 92
  },
  {
    id: 'sol-1000-2025',
    name: 'Solana $1000 Prediction',
    question: 'Will SOL reach $1000 by end of 2025?',
    description: 'Solana price prediction based on ecosystem growth, validator count, and transaction volume metrics.',
    category: 0,
    daysUntilEnd: 90,
    resolutionSource: 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
    initialLiquidity: 1200_000_000, // 1200 USDC
    tags: ['solana', 'crypto', 'price', 'ecosystem', 'validators'],
    popularity: 88
  },
  {
    id: 'ai-tokens-boom',
    name: 'AI Tokens Market Cap',
    question: 'Will AI-related tokens reach $500B market cap by Q2 2025?',
    description: 'AI token market prediction including FET, RNDR, AGIX, and other AI-focused cryptocurrencies.',
    category: 0,
    daysUntilEnd: 120,
    resolutionSource: 'https://api.coingecko.com/api/v3/global',
    initialLiquidity: 800_000_000, // 800 USDC
    tags: ['ai', 'tokens', 'market-cap', 'artificial-intelligence'],
    popularity: 85
  },

  // Technology Templates - Actualizados
  {
    id: 'solana-1m-tps',
    name: 'Solana 1M TPS Milestone',
    question: 'Will Solana achieve 1M TPS sustained for 1 hour in 2025?',
    description: 'Solana network performance milestone based on validator upgrades and network optimization.',
    category: 4, // Technology
    daysUntilEnd: 180,
    resolutionSource: 'https://explorer.solana.com/metrics',
    initialLiquidity: 1000_000_000, // 1000 USDC
    tags: ['solana', 'tps', 'performance', 'blockchain', 'scalability'],
    popularity: 82
  },
  {
    id: 'gpt-5-release',
    name: 'GPT-5 Release 2025',
    question: 'Will OpenAI release GPT-5 to the public in 2025?',
    description: 'OpenAI GPT-5 release prediction based on development timeline and industry announcements.',
    category: 4,
    daysUntilEnd: 365,
    resolutionSource: 'https://openai.com/blog',
    initialLiquidity: 1500_000_000, // 1500 USDC
    tags: ['ai', 'gpt-5', 'openai', 'artificial-intelligence', 'release'],
    popularity: 95
  },
  {
    id: 'quantum-supremacy-2025',
    name: 'Quantum Supremacy 2025',
    question: 'Will a quantum computer solve a commercially useful problem in 2025?',
    description: 'Quantum computing milestone prediction based on IBM, Google, and IonQ developments.',
    category: 4,
    daysUntilEnd: 365,
    resolutionSource: 'https://quantum-computing.ibm.com/',
    initialLiquidity: 2000_000_000, // 2000 USDC
    tags: ['quantum', 'computing', 'supremacy', 'technology', 'breakthrough'],
    popularity: 78
  },
  {
    id: 'autonomous-cars-level5',
    name: 'Level 5 Autonomous Cars',
    question: 'Will any company achieve Level 5 autonomous driving in 2025?',
    description: 'Autonomous vehicle milestone prediction based on Tesla, Waymo, and Cruise developments.',
    category: 4,
    daysUntilEnd: 365,
    resolutionSource: 'https://www.nhtsa.gov/automated-vehicles',
    initialLiquidity: 1800_000_000, // 1800 USDC
    tags: ['autonomous', 'cars', 'tesla', 'waymo', 'level5'],
    popularity: 75
  },

  // Sports Templates - Actualizados
  {
    id: 'world-cup-2026-winner',
    name: 'FIFA World Cup 2026 Winner',
    question: 'Will Argentina win the 2026 FIFA World Cup?',
    description: 'FIFA World Cup 2026 winner prediction based on current team rankings and historical performance.',
    category: 1, // Sports
    daysUntilEnd: 730, // 2 years
    resolutionSource: 'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/canadamexicousa2026',
    initialLiquidity: 3000_000_000, // 3000 USDC
    tags: ['fifa', 'world-cup', 'soccer', 'argentina', 'messi'],
    popularity: 90
  },
  {
    id: 'super-bowl-2025-winner',
    name: 'Super Bowl 2025 Winner',
    question: 'Will the Kansas City Chiefs win Super Bowl 2025?',
    description: 'NFL Super Bowl 2025 winner prediction based on current season performance and odds.',
    category: 1,
    daysUntilEnd: 60,
    resolutionSource: 'https://www.nfl.com/super-bowl/',
    initialLiquidity: 2000_000_000, // 2000 USDC
    tags: ['nfl', 'super-bowl', 'chiefs', 'football', 'mahomes'],
    popularity: 85
  },
  {
    id: 'olympics-2024-medals',
    name: 'Paris Olympics 2024 Medal Count',
    question: 'Will USA win the most gold medals at Paris 2024 Olympics?',
    description: 'Olympic Games 2024 medal prediction based on athlete performance and historical data.',
    category: 1,
    daysUntilEnd: 30,
    resolutionSource: 'https://olympics.com/en/paris-2024/',
    initialLiquidity: 1500_000_000, // 1500 USDC
    tags: ['olympics', 'paris', 'medals', 'usa', 'gold'],
    popularity: 88
  },

  // Politics Templates - Actualizados
  {
    id: 'us-election-2024',
    name: 'US Election 2024 Outcome',
    question: 'Will Donald Trump win the 2024 US Presidential Election?',
    description: 'US Presidential Election 2024 outcome prediction based on polling data and campaign analysis.',
    category: 2, // Politics
    daysUntilEnd: 30,
    resolutionSource: 'https://www.realclearpolitics.com/elections/2024/',
    initialLiquidity: 5000_000_000, // 5000 USDC
    tags: ['politics', 'election', 'president', 'trump', '2024'],
    popularity: 98
  },
  {
    id: 'eu-elections-2024',
    name: 'EU Elections 2024',
    question: 'Will far-right parties gain majority in EU Parliament 2024?',
    description: 'European Parliament election outcome prediction based on current polling and political trends.',
    category: 2,
    daysUntilEnd: 60,
    resolutionSource: 'https://elections.europa.eu/',
    initialLiquidity: 2500_000_000, // 2500 USDC
    tags: ['eu', 'elections', 'parliament', 'far-right', 'politics'],
    popularity: 82
  },
  {
    id: 'uk-election-2024',
    name: 'UK General Election 2024',
    question: 'Will Labour Party win majority in UK General Election 2024?',
    description: 'UK General Election outcome prediction based on polling data and political developments.',
    category: 2,
    daysUntilEnd: 45,
    resolutionSource: 'https://www.parliament.uk/',
    initialLiquidity: 2000_000_000, // 2000 USDC
    tags: ['uk', 'election', 'labour', 'conservative', 'politics'],
    popularity: 85
  },

  // Entertainment Templates - Actualizados
  {
    id: 'oscars-2025-best-picture',
    name: 'Oscars 2025 Best Picture',
    question: 'Will a streaming service movie win Best Picture at 2025 Oscars?',
    description: 'Academy Awards 2025 Best Picture winner prediction based on industry trends and streaming dominance.',
    category: 3, // Entertainment
    daysUntilEnd: 120,
    resolutionSource: 'https://www.oscars.org/',
    initialLiquidity: 1000_000_000, // 1000 USDC
    tags: ['oscars', 'streaming', 'netflix', 'movies', 'entertainment'],
    popularity: 75
  },
  {
    id: 'taylor-swift-tour-2025',
    name: 'Taylor Swift Tour 2025',
    question: 'Will Taylor Swift announce a new world tour in 2025?',
    description: 'Taylor Swift tour announcement prediction based on artist activity and fan demand.',
    category: 3,
    daysUntilEnd: 365,
    resolutionSource: 'https://www.taylorswift.com/',
    initialLiquidity: 800_000_000, // 800 USDC
    tags: ['taylor-swift', 'tour', 'music', 'entertainment', 'concert'],
    popularity: 88
  },
  {
    id: 'netflix-subscribers-2025',
    name: 'Netflix Subscribers 2025',
    question: 'Will Netflix reach 350M global subscribers by end of 2025?',
    description: 'Netflix subscriber milestone prediction based on content strategy and market expansion.',
    category: 3,
    daysUntilEnd: 90,
    resolutionSource: 'https://ir.netflix.net/',
    initialLiquidity: 1200_000_000, // 1200 USDC
    tags: ['netflix', 'streaming', 'subscribers', 'entertainment', 'growth'],
    popularity: 72
  },

  // Climate & Environment - Actualizados
  {
    id: 'global-warming-1-5c',
    name: 'Global Warming 1.5°C',
    question: 'Will global average temperature increase by 1.5°C above pre-industrial levels in 2025?',
    description: 'Climate change milestone prediction based on IPCC data and global temperature monitoring.',
    category: 5, // Other
    daysUntilEnd: 365,
    resolutionSource: 'https://www.ipcc.ch/',
    initialLiquidity: 3000_000_000, // 3000 USDC
    tags: ['climate', 'global-warming', 'temperature', 'environment', 'ipcc'],
    popularity: 95
  },
  {
    id: 'renewable-energy-50-percent',
    name: 'Renewable Energy 50%',
    question: 'Will renewable energy account for 50% of global electricity generation in 2025?',
    description: 'Renewable energy milestone prediction based on IEA data and global energy transition.',
    category: 5,
    daysUntilEnd: 365,
    resolutionSource: 'https://www.iea.org/',
    initialLiquidity: 2000_000_000, // 2000 USDC
    tags: ['renewable', 'energy', 'solar', 'wind', 'sustainability'],
    popularity: 80
  },
  {
    id: 'electric-vehicles-50-percent',
    name: 'Electric Vehicles 50%',
    question: 'Will electric vehicles represent 50% of new car sales globally in 2025?',
    description: 'EV adoption milestone prediction based on Tesla, BYD, and traditional automaker data.',
    category: 5,
    daysUntilEnd: 365,
    resolutionSource: 'https://www.iea.org/reports/global-ev-outlook-2024',
    initialLiquidity: 1800_000_000, // 1800 USDC
    tags: ['electric', 'vehicles', 'tesla', 'byd', 'automotive'],
    popularity: 78
  },

  // Space & Technology
  {
    id: 'spacex-starship-mars',
    name: 'SpaceX Starship Mars Mission',
    question: 'Will SpaceX launch an uncrewed Starship mission to Mars in 2025?',
    description: 'SpaceX Mars mission prediction based on Starship development timeline and testing progress.',
    category: 5,
    daysUntilEnd: 365,
    resolutionSource: 'https://www.spacex.com/',
    initialLiquidity: 2500_000_000, // 2500 USDC
    tags: ['spacex', 'starship', 'mars', 'space', 'elon-musk'],
    popularity: 85
  },
  {
    id: 'quantum-computing-breakthrough',
    name: 'Quantum Computing Breakthrough',
    question: 'Will a quantum computer achieve quantum advantage for a practical problem in 2025?',
    description: 'Quantum computing milestone prediction based on IBM, Google, and IonQ research progress.',
    category: 5,
    daysUntilEnd: 365,
    resolutionSource: 'https://quantum-computing.ibm.com/',
    initialLiquidity: 2000_000_000, // 2000 USDC
    tags: ['quantum', 'computing', 'breakthrough', 'technology', 'research'],
    popularity: 82
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
