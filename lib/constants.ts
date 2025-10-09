export const NAV_ITEMS = [
    { href: '/', label: 'Dashboard' },
    { href: '/search', label: 'Search' },
    // { href: '/watchlist', label: 'Watchlist' },
];

// Sign-up form select options
export const INVESTMENT_GOALS = [
    { value: 'Growth', label: 'Growth' },
    { value: 'Income', label: 'Income' },
    { value: 'Balanced', label: 'Balanced' },
    { value: 'Conservative', label: 'Conservative' },
];

export const RISK_TOLERANCE_OPTIONS = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
];

export const PREFERRED_INDUSTRIES = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Energy', label: 'Energy' },
    { value: 'Consumer Goods', label: 'Consumer Goods' },
];

export const ALERT_TYPE_OPTIONS = [
    { value: 'upper', label: 'Upper' },
    { value: 'lower', label: 'Lower' },
];

export const CONDITION_OPTIONS = [
    { value: 'greater', label: 'Greater than (>)' },
    { value: 'less', label: 'Less than (<)' },
];

// TradingView Charts
export const MARKET_OVERVIEW_WIDGET_CONFIG = {
    colorTheme: 'dark', // dark mode
    dateRange: '12M', // last 12 months
    locale: 'en', // language
    largeChartUrl: '', // link to a large chart if needed
    isTransparent: true, // makes background transparent
    showFloatingTooltip: true, // show tooltip on hover
    plotLineColorGrowing: '#0FEDBE', // line color when price goes up
    plotLineColorFalling: '#0FEDBE', // line color when price falls
    gridLineColor: 'rgba(240, 243, 250, 0)', // grid line color
    scaleFontColor: '#DBDBDB', // font color for scale
    belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)', // fill under line when growing
    belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)', // fill under line when falling
    belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
    belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
    symbolActiveColor: 'rgba(15, 237, 190, 0.05)', // highlight color for active symbol
    tabs: [
        {
            title: 'Major Cryptocurrencies',
            symbols: [
                { s: 'CRYPTO:BTCUSD', d: 'Bitcoin' },
                { s: 'CRYPTO:ETHUSD', d: 'Ethereum' },
                { s: 'CRYPTO:BNBUSD', d: 'Binance Coin' },
                { s: 'CRYPTO:SOLUSD', d: 'Solana' },
                { s: 'CRYPTO:XRPUSD', d: 'XRP' },
                { s: 'CRYPTO:ADAUSD', d: 'Cardano' },
            ],
        },
        {
            title: 'Stablecoins',
            symbols: [
                { s: 'CRYPTO:USDTUSD', d: 'Tether' },
                { s: 'CRYPTO:USDCUSD', d: 'USD Coin' },
                { s: 'CRYPTO:BUSDUSD', d: 'Binance USD' },
                { s: 'CRYPTO:DAIUSD', d: 'Dai' },
                { s: 'CRYPTO:FRAXUSD', d: 'Frax' },
            ],
        },
        {
            title: 'DeFi Tokens',
            symbols: [
                { s: 'CRYPTO:UNIUSD', d: 'Uniswap' },
                { s: 'CRYPTO:LINKUSD', d: 'Chainlink' },
                { s: 'CRYPTO:AAVEUSD', d: 'Aave' },
                { s: 'CRYPTO:MKRUSD', d: 'Maker' },
                { s: 'CRYPTO:COMPUSD', d: 'Compound' },
                { s: 'CRYPTO:CRVUSD', d: 'Curve DAO' },
            ],
        },
    ],
    support_host: 'https://www.tradingview.com', // TradingView host
    backgroundColor: '#141414', // background color
    width: '100%', // full width
    height: 600, // height in px
    showSymbolLogo: true, // show logo next to symbols
    showChart: true, // display mini chart
};

export const HEATMAP_WIDGET_CONFIG = {
    dataSource: 'Crypto',
    blockSize: 'market_cap_basic',
    blockColor: 'change',
    grouping: 'sector',
    isTransparent: true,
    locale: 'en',
    symbolUrl: '',
    colorTheme: 'dark',
    exchanges: [],
    hasTopBar: false,
    isDataSetEnabled: false,
    isZoomEnabled: true,
    hasSymbolTooltip: true,
    isMonoSize: false,
    width: '100%',
    height: '600',
};

export const TOP_STORIES_WIDGET_CONFIG = {
    displayMode: 'regular',
    feedMode: 'crypto',
    colorTheme: 'dark',
    isTransparent: true,
    locale: 'en',
    market: 'crypto',
    width: '100%',
    height: '600',
};

export const MARKET_DATA_WIDGET_CONFIG = {
    title: 'Cryptocurrencies',
    width: '100%',
    height: 600,
    locale: 'en',
    showSymbolLogo: true,
    colorTheme: 'dark',
    isTransparent: false,
    backgroundColor: '#0F0F0F',
    symbolsGroups: [
        {
            name: 'Major Cryptocurrencies',
            symbols: [
                { name: 'CRYPTO:BTCUSD', displayName: 'Bitcoin' },
                { name: 'CRYPTO:ETHUSD', displayName: 'Ethereum' },
                { name: 'CRYPTO:BNBUSD', displayName: 'Binance Coin' },
                { name: 'CRYPTO:SOLUSD', displayName: 'Solana' },
                { name: 'CRYPTO:XRPUSD', displayName: 'XRP' },
                { name: 'CRYPTO:ADAUSD', displayName: 'Cardano' },
            ],
        },
        {
            name: 'Stablecoins',
            symbols: [
                { name: 'CRYPTO:USDTUSD', displayName: 'Tether' },
                { name: 'CRYPTO:USDCUSD', displayName: 'USD Coin' },
                { name: 'CRYPTO:BUSDUSD', displayName: 'Binance USD' },
                { name: 'CRYPTO:DAIUSD', displayName: 'Dai' },
                { name: 'CRYPTO:FRAXUSD', displayName: 'Frax' },
            ],
        },
        {
            name: 'DeFi Tokens',
            symbols: [
                { name: 'CRYPTO:UNIUSD', displayName: 'Uniswap' },
                { name: 'CRYPTO:LINKUSD', displayName: 'Chainlink' },
                { name: 'CRYPTO:AAVEUSD', displayName: 'Aave' },
                { name: 'CRYPTO:MKRUSD', displayName: 'Maker' },
                { name: 'CRYPTO:COMPUSD', displayName: 'Compound' },
                { name: 'CRYPTO:CRVUSD', displayName: 'Curve DAO' },
            ],
        },
    ],
};

export const SYMBOL_INFO_WIDGET_CONFIG = (symbol: string) => ({
    symbol: symbol.toUpperCase().startsWith('CRYPTO:') ? symbol.toUpperCase() : `CRYPTO:${symbol.toUpperCase()}`,
    colorTheme: 'dark',
    isTransparent: true,
    locale: 'en',
    width: '100%',
    height: 170,
});

export const CANDLE_CHART_WIDGET_CONFIG = (symbol: string) => ({
    allow_symbol_change: false,
    calendar: false,
    details: true,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    hide_legend: false,
    hide_volume: false,
    hotlist: false,
    interval: 'D',
    locale: 'en',
    save_image: false,
    style: 1,
    symbol: symbol.toUpperCase().startsWith('CRYPTO:') ? symbol.toUpperCase() : `CRYPTO:${symbol.toUpperCase()}`,
    theme: 'dark',
    timezone: 'Etc/UTC',
    backgroundColor: '#141414',
    gridColor: '#141414',
    watchlist: [],
    withdateranges: false,
    compareSymbols: [],
    studies: [],
    width: '100%',
    height: 600,
});

export const BASELINE_WIDGET_CONFIG = (symbol: string) => ({
    allow_symbol_change: false,
    calendar: false,
    details: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    hide_legend: false,
    hide_volume: false,
    hotlist: false,
    interval: 'D',
    locale: 'en',
    save_image: false,
    style: 10,
    symbol: symbol.toUpperCase().startsWith('CRYPTO:') ? symbol.toUpperCase() : `CRYPTO:${symbol.toUpperCase()}`,
    theme: 'dark',
    timezone: 'Etc/UTC',
    backgroundColor: '#141414',
    gridColor: '#141414',
    watchlist: [],
    withdateranges: false,
    compareSymbols: [],
    studies: [],
    width: '100%',
    height: 600,
});

export const TECHNICAL_ANALYSIS_WIDGET_CONFIG = (symbol: string) => ({
    symbol: symbol.toUpperCase().startsWith('CRYPTO:') ? symbol.toUpperCase() : `CRYPTO:${symbol.toUpperCase()}`,
    colorTheme: 'dark',
    isTransparent: 'true',
    locale: 'en',
    width: '100%',
    height: 400,
    interval: '1h',
    largeChartUrl: '',
});

export const COMPANY_PROFILE_WIDGET_CONFIG = (symbol: string) => ({
    symbol: symbol.toUpperCase().startsWith('CRYPTO:') ? symbol.toUpperCase() : `CRYPTO:${symbol.toUpperCase()}`,
    colorTheme: 'dark',
    isTransparent: 'true',
    locale: 'en',
    width: '100%',
    height: 440,
});

export const COMPANY_FINANCIALS_WIDGET_CONFIG = (symbol: string) => ({
    symbol: symbol.toUpperCase().startsWith('CRYPTO:') ? symbol.toUpperCase() : `CRYPTO:${symbol.toUpperCase()}`,
    colorTheme: 'dark',
    isTransparent: 'true',
    locale: 'en',
    width: '100%',
    height: 464,
    displayMode: 'regular',
    largeChartUrl: '',
});

export const POPULAR_CRYPTO_SYMBOLS = [
    // Major Cryptocurrencies
    'BTCUSD',
    'ETHUSD',
    'BNBUSD',
    'SOLUSD',
    'XRPUSD',
    'ADAUSD',
    'DOGEUSD',
    'SHIBUSD',
    'AVAXUSD',
    'DOTUSD',
    
    // Stablecoins
    'USDTUSD',
    'USDCUSD',
    'BUSDUSD',
    'DAIUSD',
    'FRAXUSD',
    
    // DeFi Tokens
    'UNIUSD',
    'LINKUSD',
    'AAVEUSD',
    'MKRUSD',
    'COMPUSD',
    'CRVUSD',
    'YFIUSD',
    'SNXUSD',
    'BALUSD',
    'RENUSD',
    
    // Layer 1 & 2
    'MATICUSD',
    'ATOMUSD',
    'NEARUSD',
    'ALGOUSD',
    'FTMUSD',
    'APTUSD',
    'INJUSD',
    'EGLDUSD',
    'FETUSD',
    'ICPUSD',
    
    // NFT & Gaming Tokens
    'MANAUSD',
    'SANDUSD',
    'AXSUSD',
    'ENJUSD',
    'GALAUSD',
    'ILVUSD',
    'WAXPUSD',
    'THETAUSD',
    'FLOWUSD',
    'RONUSD',
];

export const NO_MARKET_NEWS =
    '<p class="mobile-text" style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#4b5563;">No market news available today. Please check back tomorrow.</p>';

export const WATCHLIST_TABLE_HEADER = [
    'Cryptocurrency',
    'Symbol',
    'Price',
    'Change',
    'Market Cap',
    'Volume',
    'Alert',
    'Action',
];