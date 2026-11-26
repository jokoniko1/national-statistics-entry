// Pakistan in Numbers — figures, each with its year and source.
// Census figures: Pakistan Bureau of Statistics (PBS), 7th Population and
// Housing Census 2023, covering the four provinces and Islamabad Capital
// Territory (241,499,431 people). International figures: World Bank (2024).
// National accounts: National Accounts Committee, October 2026 revision.

export const PROVINCES = [
  { name: "Punjab", capital: "Lahore", pop2023: 127688922, pop2017: 109989655, area: 205344, literacy: 66.3, urban: 40.7, growth: 2.53 },
  { name: "Sindh", capital: "Karachi", pop2023: 55696147, pop2017: 47854510, area: 140914, literacy: 57.5, urban: 53.7, growth: 2.57 },
  { name: "Khyber Pakhtunkhwa", capital: "Peshawar", pop2023: 40856097, pop2017: 35501964, area: 101741, literacy: 51.1, urban: 15.0, growth: 2.38 },
  { name: "Balochistan", capital: "Quetta", pop2023: 14894402, pop2017: 12335129, area: 347190, literacy: 42.0, urban: 31.0, growth: 3.20 },
  { name: "Islamabad Capital Territory", capital: "Islamabad", pop2023: 2363863, pop2017: 2072116, area: 906, literacy: 84.0, urban: null, growth: 2.21 },
];

export const HEADLINE = [
  { value: "241.5 million", label: "Population counted, 2023 Census (PBS)" },
  { value: "2.55% a year", label: "Population growth, 2017–2023 (PBS)" },
  { value: "$371.6 billion", label: "GDP, 2024 (World Bank)" },
  { value: "67.8 years", label: "Life expectancy at birth, 2024 (World Bank)" },
  { value: "60.7%", label: "Literacy, age 10+, 2023 Census (PBS)" },
  { value: "796,096 km²", label: "Land area (PBS)" },
];

export const INDICATORS = [
  { indicator: "Population (counted)", value: "241,499,431", year: "2023 Census", source: "PBS" },
  { indicator: "Population (World Bank estimate)", value: "251,269,164", year: "2024", source: "World Bank" },
  { indicator: "Population growth, 2017–2023", value: "2.55% per year", year: "2023 Census", source: "PBS" },
  { indicator: "Largest city — Karachi", value: "14.9 million", year: "2023 Census", source: "PBS" },
  { indicator: "Urban share of population", value: "About 39%", year: "2023 Census", source: "PBS" },
  { indicator: "Literacy, age 10+", value: "60.65% (men 68.0%, women 52.8%)", year: "2023 Census", source: "PBS" },
  { indicator: "Life expectancy at birth", value: "67.8 years", year: "2024", source: "World Bank" },
  { indicator: "GDP, current US$", value: "$371.6 billion", year: "2024", source: "World Bank" },
  { indicator: "GDP per capita, current US$", value: "$1,479", year: "2024", source: "World Bank" },
  { indicator: "GDP, latest national accounts", value: "Rs 126.4 trillion (≈ $450.4 billion)", year: "FY2025–26", source: "National Accounts Committee" },
  { indicator: "Real GDP growth, latest national accounts", value: "3.65%", year: "FY2025–26", source: "National Accounts Committee" },
  { indicator: "Land area", value: "796,096 km²", year: "2023 Census", source: "PBS" },
];

export const ECONOMY = [
  { item: "GDP, current US$ (World Bank)", value: "$371.6 billion", year: "2024" },
  { item: "GDP per capita, current US$ (World Bank)", value: "$1,479", year: "2024" },
  { item: "GDP, national accounts", value: "Rs 126.4 trillion (≈ $450.4 billion)", year: "FY2025–26" },
  { item: "Real GDP growth, national accounts", value: "3.65% (revised from 3.70% provisional)", year: "FY2025–26" },
  { item: "Per capita income, national accounts", value: "$1,896", year: "FY2025–26" },
];

export const SOURCES = [
  { n: 1, text: "Pakistan Bureau of Statistics — 7th Population and Housing Census 2023, Key Findings Report and National Census Report." },
  { n: 2, text: "World Bank — World Development Indicators, Pakistan country data, 2024 values (population, GDP, GDP per capita, life expectancy)." },
  { n: 3, text: "National Accounts Committee / Pakistan Bureau of Statistics — GDP, FY2025–26, revised October 2026." },
  { n: 4, text: "Pakistan Economic Survey 2025–26 — population estimate of 252.09 million for FY2025–26 (a projection from the 2023 count, not a new count)." },
];

export const fmt = (n) => n.toLocaleString("en-US");
export const millions = (n) => (n / 1000000).toFixed(2) + "m";
