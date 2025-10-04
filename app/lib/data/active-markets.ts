export interface ActiveMarket {
  id: string;
  name: string;
  question: string;
  description: string;
  category: number;
  status: 'active' | 'resolved' | 'closed';
  endDate: string;
  resolutionSource: string;
  liquidity: number;
  volume: number;
  participants: number;
  yesPrice: number;
  noPrice: number;
  tags: string[];
  creator: string;
  createdAt: string;
  lastActivity: string;
}

export const ACTIVE_MARKETS: ActiveMarket[] = [
  // Crypto Markets - Actualizados
  {
    id: 'btc-200k-2025-active',
    name: 'Bitcoin $200K Prediction',
    question: 'Will BTC reach $200K by December 31, 2025?',
    description: 'Bitcoin price milestone prediction based on ETF adoption, institutional flows, and halving cycle analysis.',
    category: 0,
    status: 'active',
    endDate: '2025-12-31T23:59:59Z',
    resolutionSource: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    liquidity: 2000_000_000, // 2000 USDC
    volume: 8500_000_000, // 8500 USDC
    participants: 1247,
    yesPrice: 0.68,
    noPrice: 0.32,
    tags: ['bitcoin', 'crypto', 'price', 'milestone', 'etf'],
    creator: '0x1234...5678',
    createdAt: '2025-01-15T10:30:00Z',
    lastActivity: '2025-01-20T14:22:00Z'
  },
  {
    id: 'eth-10k-2025-active',
    name: 'Ethereum $10K Prediction',
    question: 'Will ETH surpass $10K by end of 2025?',
    description: 'Ethereum price prediction based on EIP-4844 adoption, L2 growth, and DeFi TVL expansion.',
    category: 0,
    status: 'active',
    endDate: '2025-12-31T23:59:59Z',
    resolutionSource: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    liquidity: 1500_000_000, // 1500 USDC
    volume: 4200_000_000, // 4200 USDC
    participants: 892,
    yesPrice: 0.72,
    noPrice: 0.28,
    tags: ['ethereum', 'crypto', 'price', 'defi', 'l2'],
    creator: '0x2345...6789',
    createdAt: '2025-01-10T08:15:00Z',
    lastActivity: '2025-01-20T16:45:00Z'
  },
  {
    id: 'sol-1000-2025-active',
    name: 'Solana $1000 Prediction',
    question: 'Will SOL reach $1000 by end of 2025?',
    description: 'Solana price prediction based on ecosystem growth, validator count, and transaction volume metrics.',
    category: 0,
    status: 'active',
    endDate: '2025-12-31T23:59:59Z',
    resolutionSource: 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
    liquidity: 1200_000_000, // 1200 USDC
    volume: 3100_000_000, // 3100 USDC
    participants: 654,
    yesPrice: 0.45,
    noPrice: 0.55,
    tags: ['solana', 'crypto', 'price', 'ecosystem', 'validators'],
    creator: '0x3456...7890',
    createdAt: '2025-01-08T12:20:00Z',
    lastActivity: '2025-01-20T11:30:00Z'
  },
  {
    id: 'ai-tokens-boom-active',
    name: 'AI Tokens Market Cap',
    question: 'Will AI-related tokens reach $500B market cap by Q2 2025?',
    description: 'AI token market prediction including FET, RNDR, AGIX, and other AI-focused cryptocurrencies.',
    category: 0,
    status: 'active',
    endDate: '2025-06-30T23:59:59Z',
    resolutionSource: 'https://api.coingecko.com/api/v3/global',
    liquidity: 800_000_000, // 800 USDC
    volume: 1800_000_000, // 1800 USDC
    participants: 423,
    yesPrice: 0.38,
    noPrice: 0.62,
    tags: ['ai', 'tokens', 'market-cap', 'artificial-intelligence'],
    creator: '0x4567...8901',
    createdAt: '2025-01-12T09:45:00Z',
    lastActivity: '2025-01-20T13:15:00Z'
  },

  // Technology Markets
  {
    id: 'gpt-5-release-active',
    name: 'GPT-5 Release 2025',
    question: 'Will OpenAI release GPT-5 to the public in 2025?',
    description: 'OpenAI GPT-5 release prediction based on development timeline and industry announcements.',
    category: 4,
    status: 'active',
    endDate: '2025-12-31T23:59:59Z',
    resolutionSource: 'https://openai.com/blog',
    liquidity: 1500_000_000, // 1500 USDC
    volume: 5200_000_000, // 5200 USDC
    participants: 1156,
    yesPrice: 0.82,
    noPrice: 0.18,
    tags: ['ai', 'gpt-5', 'openai', 'artificial-intelligence', 'release'],
    creator: '0x5678...9012',
    createdAt: '2025-01-05T14:30:00Z',
    lastActivity: '2025-01-20T15:20:00Z'
  },
  {
    id: 'solana-1m-tps-active',
    name: 'Solana 1M TPS Milestone',
    question: 'Will Solana achieve 1M TPS sustained for 1 hour in 2025?',
    description: 'Solana network performance milestone based on validator upgrades and network optimization.',
    category: 4,
    status: 'active',
    endDate: '2025-12-31T23:59:59Z',
    resolutionSource: 'https://explorer.solana.com/metrics',
    liquidity: 1000_000_000, // 1000 USDC
    volume: 2800_000_000, // 2800 USDC
    participants: 567,
    yesPrice: 0.25,
    noPrice: 0.75,
    tags: ['solana', 'tps', 'performance', 'blockchain', 'scalability'],
    creator: '0x6789...0123',
    createdAt: '2025-01-18T11:00:00Z',
    lastActivity: '2025-01-20T09:45:00Z'
  },

  // Sports Markets
  {
    id: 'super-bowl-2025-active',
    name: 'Super Bowl 2025 Winner',
    question: 'Will the Kansas City Chiefs win Super Bowl 2025?',
    description: 'NFL Super Bowl 2025 winner prediction based on current season performance and odds.',
    category: 1,
    status: 'active',
    endDate: '2025-02-09T23:59:59Z',
    resolutionSource: 'https://www.nfl.com/super-bowl/',
    liquidity: 2000_000_000, // 2000 USDC
    volume: 12000_000_000, // 12000 USDC
    participants: 2341,
    yesPrice: 0.35,
    noPrice: 0.65,
    tags: ['nfl', 'super-bowl', 'chiefs', 'football', 'mahomes'],
    creator: '0x7890...1234',
    createdAt: '2025-01-01T00:00:00Z',
    lastActivity: '2025-01-20T18:30:00Z'
  },
  {
    id: 'world-cup-2026-active',
    name: 'FIFA World Cup 2026 Winner',
    question: 'Will Argentina win the 2026 FIFA World Cup?',
    description: 'FIFA World Cup 2026 winner prediction based on current team rankings and historical performance.',
    category: 1,
    status: 'active',
    endDate: '2026-07-19T23:59:59Z',
    resolutionSource: 'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/canadamexicousa2026',
    liquidity: 3000_000_000, // 3000 USDC
    volume: 8500_000_000, // 8500 USDC
    participants: 1876,
    yesPrice: 0.28,
    noPrice: 0.72,
    tags: ['fifa', 'world-cup', 'soccer', 'argentina', 'messi'],
    creator: '0x8901...2345',
    createdAt: '2025-01-03T16:20:00Z',
    lastActivity: '2025-01-20T12:10:00Z'
  },

  // Politics Markets
  {
    id: 'us-election-2024-active',
    name: 'US Election 2024 Outcome',
    question: 'Will Donald Trump win the 2024 US Presidential Election?',
    description: 'US Presidential Election 2024 outcome prediction based on polling data and campaign analysis.',
    category: 2,
    status: 'active',
    endDate: '2024-11-05T23:59:59Z',
    resolutionSource: 'https://www.realclearpolitics.com/elections/2024/',
    liquidity: 5000_000_000, // 5000 USDC
    volume: 25000_000_000, // 25000 USDC
    participants: 4567,
    yesPrice: 0.52,
    noPrice: 0.48,
    tags: ['politics', 'election', 'president', 'trump', '2024'],
    creator: '0x9012...3456',
    createdAt: '2024-12-01T00:00:00Z',
    lastActivity: '2025-01-20T20:15:00Z'
  },
  {
    id: 'uk-election-2024-active',
    name: 'UK General Election 2024',
    question: 'Will Labour Party win majority in UK General Election 2024?',
    description: 'UK General Election outcome prediction based on polling data and political developments.',
    category: 2,
    status: 'active',
    endDate: '2024-12-31T23:59:59Z',
    resolutionSource: 'https://www.parliament.uk/',
    liquidity: 2000_000_000, // 2000 USDC
    volume: 6800_000_000, // 6800 USDC
    participants: 1234,
    yesPrice: 0.78,
    noPrice: 0.22,
    tags: ['uk', 'election', 'labour', 'conservative', 'politics'],
    creator: '0x0123...4567',
    createdAt: '2024-11-15T10:00:00Z',
    lastActivity: '2025-01-20T17:45:00Z'
  },

  // Entertainment Markets
  {
    id: 'taylor-swift-tour-2025-active',
    name: 'Taylor Swift Tour 2025',
    question: 'Will Taylor Swift announce a new world tour in 2025?',
    description: 'Taylor Swift tour announcement prediction based on artist activity and fan demand.',
    category: 3,
    status: 'active',
    endDate: '2025-12-31T23:59:59Z',
    resolutionSource: 'https://www.taylorswift.com/',
    liquidity: 800_000_000, // 800 USDC
    volume: 2100_000_000, // 2100 USDC
    participants: 789,
    yesPrice: 0.85,
    noPrice: 0.15,
    tags: ['taylor-swift', 'tour', 'music', 'entertainment', 'concert'],
    creator: '0x1234...5678',
    createdAt: '2025-01-10T13:30:00Z',
    lastActivity: '2025-01-20T14:20:00Z'
  },
  {
    id: 'netflix-subscribers-2025-active',
    name: 'Netflix Subscribers 2025',
    question: 'Will Netflix reach 350M global subscribers by end of 2025?',
    description: 'Netflix subscriber milestone prediction based on content strategy and market expansion.',
    category: 3,
    status: 'active',
    endDate: '2025-12-31T23:59:59Z',
    resolutionSource: 'https://ir.netflix.net/',
    liquidity: 1200_000_000, // 1200 USDC
    volume: 3200_000_000, // 3200 USDC
    participants: 456,
    yesPrice: 0.42,
    noPrice: 0.58,
    tags: ['netflix', 'streaming', 'subscribers', 'entertainment', 'growth'],
    creator: '0x2345...6789',
    createdAt: '2025-01-14T09:15:00Z',
    lastActivity: '2025-01-20T11:30:00Z'
  },

  // Climate & Environment Markets
  {
    id: 'global-warming-1-5c-active',
    name: 'Global Warming 1.5°C',
    question: 'Will global average temperature increase by 1.5°C above pre-industrial levels in 2025?',
    description: 'Climate change milestone prediction based on IPCC data and global temperature monitoring.',
    category: 5,
    status: 'active',
    endDate: '2025-12-31T23:59:59Z',
    resolutionSource: 'https://www.ipcc.ch/',
    liquidity: 3000_000_000, // 3000 USDC
    volume: 12000_000_000, // 12000 USDC
    participants: 2134,
    yesPrice: 0.15,
    noPrice: 0.85,
    tags: ['climate', 'global-warming', 'temperature', 'environment', 'ipcc'],
    creator: '0x3456...7890',
    createdAt: '2025-01-01T00:00:00Z',
    lastActivity: '2025-01-20T16:00:00Z'
  },
  {
    id: 'renewable-energy-50-percent-active',
    name: 'Renewable Energy 50%',
    question: 'Will renewable energy account for 50% of global electricity generation in 2025?',
    description: 'Renewable energy milestone prediction based on IEA data and global energy transition.',
    category: 5,
    status: 'active',
    endDate: '2025-12-31T23:59:59Z',
    resolutionSource: 'https://www.iea.org/',
    liquidity: 2000_000_000, // 2000 USDC
    volume: 5600_000_000, // 5600 USDC
    participants: 987,
    yesPrice: 0.32,
    noPrice: 0.68,
    tags: ['renewable', 'energy', 'solar', 'wind', 'sustainability'],
    creator: '0x4567...8901',
    createdAt: '2025-01-06T08:45:00Z',
    lastActivity: '2025-01-20T13:25:00Z'
  },

  // Space & Technology Markets
  {
    id: 'spacex-starship-mars-active',
    name: 'SpaceX Starship Mars Mission',
    question: 'Will SpaceX launch an uncrewed Starship mission to Mars in 2025?',
    description: 'SpaceX Mars mission prediction based on Starship development timeline and testing progress.',
    category: 5,
    status: 'active',
    endDate: '2025-12-31T23:59:59Z',
    resolutionSource: 'https://www.spacex.com/',
    liquidity: 2500_000_000, // 2500 USDC
    volume: 7200_000_000, // 7200 USDC
    participants: 1456,
    yesPrice: 0.18,
    noPrice: 0.82,
    tags: ['spacex', 'starship', 'mars', 'space', 'elon-musk'],
    creator: '0x5678...9012',
    createdAt: '2025-01-02T12:00:00Z',
    lastActivity: '2025-01-20T19:10:00Z'
  },
  {
    id: 'quantum-computing-breakthrough-active',
    name: 'Quantum Computing Breakthrough',
    question: 'Will a quantum computer achieve quantum advantage for a practical problem in 2025?',
    description: 'Quantum computing milestone prediction based on IBM, Google, and IonQ research progress.',
    category: 5,
    status: 'active',
    endDate: '2025-12-31T23:59:59Z',
    resolutionSource: 'https://quantum-computing.ibm.com/',
    liquidity: 2000_000_000, // 2000 USDC
    volume: 4800_000_000, // 4800 USDC
    participants: 678,
    yesPrice: 0.22,
    noPrice: 0.78,
    tags: ['quantum', 'computing', 'breakthrough', 'technology', 'research'],
    creator: '0x6789...0123',
    createdAt: '2025-01-07T15:30:00Z',
    lastActivity: '2025-01-20T10:45:00Z'
  }
];

export const getActiveMarkets = () => {
  return ACTIVE_MARKETS.filter(market => market.status === 'active');
};

export const getMarketsByCategory = (category: number) => {
  return ACTIVE_MARKETS.filter(market => market.category === category && market.status === 'active');
};

export const getPopularMarkets = (limit: number = 6) => {
  return ACTIVE_MARKETS
    .filter(market => market.status === 'active')
    .sort((a, b) => b.volume - a.volume)
    .slice(0, limit);
};

export const getMarketById = (id: string) => {
  return ACTIVE_MARKETS.find(market => market.id === id);
};

export const searchMarkets = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return ACTIVE_MARKETS.filter(market => 
    market.name.toLowerCase().includes(lowercaseQuery) ||
    market.question.toLowerCase().includes(lowercaseQuery) ||
    market.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
