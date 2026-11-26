// HTML for each page, built from the figures in data.js. Every value is escaped
// before it goes into the page. Charts are hand-drawn SVG bars — no library,
// no network — so they render identically offline on desktop and phone.

import { PROVINCES, HEADLINE, INDICATORS, ECONOMY, SOURCES, fmt, millions } from "./data.js";

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function kpis() {
  return `<div class="kpis">${HEADLINE.map((k) => `<div class="kpi"><b>${escape(k.value)}</b><span>${escape(k.label)}</span></div>`).join("")}</div>`;
}

function barChart(rows, getValue, max, suffix) {
  return rows.map((r) => {
    const v = getValue(r);
    // Clamp to 100 so a value above the row maximum can never overflow the track.
    const pct = Math.min(100, Math.max(2, Math.round((v / max) * 100)));
    return `<div class="bar-row"><span>${escape(r.name)}</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div><span class="num">${escape(suffix(v))}</span></div>`;
  }).join("");
}

export function overview() {
  const maxPop = Math.max(...PROVINCES.map((p) => p.pop2023));
  return `<h1>Pakistan in Numbers</h1>
<p class="lede">The figures people look up most about Pakistan — how many people live here, how the economy is doing, how long people live and how many can read — each with its year and its source, so you can tell a count from an estimate.</p>
${kpis()}
<h2>Where Pakistanis live</h2>
<p>Population by province and territory, 2023 Census (PBS). Punjab alone holds just over half the country.</p>
${barChart(PROVINCES, (p) => p.pop2023, maxPop, millions)}
<p class="src">Source: PBS, 7th Population and Housing Census 2023. Totals cover the four provinces and Islamabad Capital Territory.</p>
<h2>At a glance</h2>
<div class="cards">
<div class="card"><h3><a href="#/population">Population</a></h3><p>241.5 million counted in 2023, growing 2.55% a year since 2017. Karachi, the largest city, counted 14.9 million.</p></div>
<div class="card"><h3><a href="#/economy">Economy</a></h3><p>GDP of $371.6 billion in 2024 (World Bank); latest national accounts put FY2025–26 GDP at about $450.4 billion, growing 3.65%.</p></div>
<div class="card"><h3><a href="#/education">Education &amp; Health</a></h3><p>Literacy (age 10+) is 60.65% — 68.0% for men, 52.8% for women. Life expectancy is 67.8 years (2024, World Bank).</p></div>
<div class="card"><h3><a href="#/provinces">Provinces</a></h3><p>Compare all five units side by side: population, area, literacy, urban share and growth, 2017 vs 2023.</p></div>
</div>
<p class="note"><strong>Count vs estimate:</strong> the 2023 Census counted 241,499,431 people. Later figures near 251–252 million are projections built on that count, not new counts. This site never mixes the two without saying so.</p>`;
}

export function population(state) {
  const rows = [...PROVINCES].sort((a, b) => b.pop2023 - a.pop2023);
  const maxPop = Math.max(...PROVINCES.map((p) => p.pop2023));
  return `<h1>Population</h1>
<p class="lede">Pakistan counted 241,499,431 people in its 7th Population and Housing Census, March–May 2023 — its first digital census — up from 207,684,626 in 2017.</p>
${barChart(rows, (p) => p.pop2023, maxPop, millions)}
<h2>Census counts, 2017 vs 2023</h2>
<table>
<thead><tr><th>Unit</th><th class="num">2017</th><th class="num">2023</th><th class="num">Growth / year</th><th class="num">Share 2023</th></tr></thead>
<tbody>${rows.map((p) => `<tr><td>${escape(p.name)}</td><td class="num">${fmt(p.pop2017)}</td><td class="num">${fmt(p.pop2023)}</td><td class="num">${p.growth.toFixed(2)}%</td><td class="num">${(p.pop2023 / 241499431 * 100).toFixed(1)}%</td></tr>`).join("")}</tbody>
</table>
<p class="src">Source: PBS, 7th Population and Housing Census 2023. Shares are of the 241,499,431 counted in the four provinces and Islamabad Capital Territory.</p>
<h2>Reading the numbers</h2>
<ul class="tight">
<li><strong>Fastest growth:</strong> Balochistan, 3.20% a year — the smallest province is growing fastest.</li>
<li><strong>Urban Pakistan:</strong> about 39% of people live in urban areas; Sindh is the most urban province at 53.7%, Khyber Pakhtunkhwa the least at 15.0%.</li>
<li><strong>Karachi:</strong> 14.9 million people in the 2023 Census — Pakistan's largest city, in Sindh.</li>
<li><strong>Estimates after 2023:</strong> the World Bank put 2024 population at 251,269,164 and the Pakistan Economic Survey estimated 252.09 million for FY2025–26. Both are projections, not counts.</li>
</ul>
<p class="note">Azad Jammu &amp; Kashmir (about 4.33 million, 2023) and Gilgit-Baltistan (about 1.71 million, 2023) are counted separately from the 241.49 million total; together they bring the wider total to about 247.5 million.</p>`;
}

export function economy() {
  return `<h1>Economy</h1>
<p class="lede">Two lenses on the same economy: the World Bank's internationally comparable figures for 2024, and Pakistan's own latest national accounts for FY2025–26.</p>
<h2>Key figures</h2>
<table>
<thead><tr><th>Measure</th><th>Value</th><th>Year</th></tr></thead>
<tbody>${ECONOMY.map((e) => `<tr><td>${escape(e.item)}</td><td>${escape(e.value)}</td><td>${escape(e.year)}</td></tr>`).join("")}</tbody>
</table>
<h2>What the numbers mean</h2>
<ul class="tight">
<li><strong>$371.6 billion (2024, World Bank)</strong> is the figure to use when comparing Pakistan with other countries — every country in that dataset is measured the same way.</li>
<li><strong>About $450.4 billion (FY2025–26, National Accounts Committee)</strong> is Pakistan's own latest estimate in current prices, revised in October 2026. The two differ because they cover different years and use different price bases — not because one is wrong.</li>
<li><strong>$1,479 per person (2024, World Bank)</strong> against $1,896 in the latest national accounts: income per head rises as the economy grows and as the population estimate used changes.</li>
<li><strong>Real growth of 3.65% (FY2025–26)</strong> is growth after removing price rises — the number that says whether the economy actually produced more.</li>
</ul>
<p class="note">Figures here are in current prices unless marked "real". A rupee figure and a dollar figure for the same year differ by the exchange rate used — check the year and the source before quoting either.</p>`;
}

export function education() {
  const maxLit = 100;
  return `<h1>Education &amp; Health</h1>
<p class="lede">How many Pakistanis can read, and how long they live — the two headline measures of people's lives behind the population and economy figures.</p>
<h2>Literacy by province, age 10+, 2023 Census</h2>
${barChart([...PROVINCES].sort((a, b) => b.literacy - a.literacy), (p) => p.literacy, maxLit, (v) => v.toFixed(1) + "%")}
<p class="src">Source: PBS, 7th Population and Housing Census 2023. National literacy is 60.65%.</p>
<h2>The national picture</h2>
<table>
<thead><tr><th>Measure</th><th>Value</th><th>Year / source</th></tr></thead>
<tbody>
<tr><td>Literacy, age 10+</td><td>60.65%</td><td>2023 Census, PBS</td></tr>
<tr><td>Literacy, men</td><td>68.00%</td><td>2023 Census, PBS</td></tr>
<tr><td>Literacy, women</td><td>52.84%</td><td>2023 Census, PBS</td></tr>
<tr><td>Life expectancy at birth</td><td>67.8 years</td><td>2024, World Bank</td></tr>
</tbody>
</table>
<h2>What stands out</h2>
<ul class="tight">
<li><strong>A 15-point gender gap:</strong> 68.0% of men can read, against 52.8% of women — the gap is the story, not just the average.</li>
<li><strong>A 42-point provincial gap:</strong> literacy runs from 42.0% in Balochistan to 84.0% in Islamabad Capital Territory.</li>
<li><strong>Slow progress:</strong> literacy was 58.9% in the 2017 Census and 60.7% in 2023 — up, but by under two points in six years.</li>
<li><strong>Life expectancy 67.8 years (2024)</strong> is the World Bank's estimate for a newborn today, if today's death rates held for their whole life.</li>
</ul>`;
}

export function provinces(state) {
  const key = state.sortKey || "pop2023";
  const dir = state.dir || -1;
  const rows = [...PROVINCES].sort((a, b) => {
    const av = a[key] ?? -Infinity, bv = b[key] ?? -Infinity;
    return (av - bv) * dir;
  });
  const head = (label, k) => `<th><button data-sort="${k}">${label} ${key === k ? (dir === 1 ? "▲" : "▼") : ""}</button></th>`;
  return `<h1>Provinces &amp; Territories</h1>
<p class="lede">All five units side by side. Tap a column heading to sort by it. Figures are from the 2023 Census (PBS) unless noted.</p>
<table>
<thead><tr>${head("Unit", "name")}${head("Population 2023", "pop2023")}${head("Area km²", "area")}${head("Literacy %", "literacy")}${head("Urban %", "urban")}${head("Growth %/yr", "growth")}</tr></thead>
<tbody>${rows.map((p) => `<tr><td>${escape(p.name)}<br><span class="src">Capital: ${escape(p.capital)}</span></td><td class="num">${fmt(p.pop2023)}</td><td class="num">${fmt(p.area)}</td><td class="num">${p.literacy.toFixed(1)}</td><td class="num">${p.urban === null ? "—" : p.urban.toFixed(1)}</td><td class="num">${p.growth.toFixed(2)}</td></tr>`).join("")}</tbody>
</table>
<p class="src">Population and area: PBS, 7th Population and Housing Census 2023. Literacy (age 10+) and urban share: same census. Growth: annualised, 2017–2023. Islamabad's urban share is not published on the same basis, so it is shown as — rather than guessed.</p>
<h2>One line each</h2>
<ul class="tight">
<li><strong>Punjab</strong> — home to 52.9% of Pakistanis; the most populous, with the second-highest literacy (66.3%).</li>
<li><strong>Sindh</strong> — 55.7 million people, the most urban province (53.7%), home to Karachi (14.9 million).</li>
<li><strong>Khyber Pakhtunkhwa</strong> — 40.9 million people, the least urban province (15.0%).</li>
<li><strong>Balochistan</strong> — the largest province by area (347,190 km²) and the smallest by people (14.9 million); fastest growth, lowest literacy (42.0%).</li>
<li><strong>Islamabad Capital Territory</strong> — 2.36 million people, the highest literacy (84.0%).</li>
</ul>`;
}

export function indicators(state) {
  const q = (state.filter || "").toLowerCase();
  const rows = INDICATORS.filter((r) => !q || (r.indicator + " " + r.value + " " + r.source + " " + r.year).toLowerCase().includes(q));
  return `<h1>All Indicators</h1>
<p class="lede">Every headline figure on this site in one searchable table. Type to filter — try “GDP”, “literacy” or “2023”.</p>
<div class="toolbar"><label for="q">Search</label><input id="q" type="search" value="${escape(state.filter || "")}" placeholder="Filter indicators…"></div>
<table>
<thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead>
<tbody>${rows.length ? rows.map((r) => `<tr><td>${escape(r.indicator)}</td><td>${escape(r.value)}</td><td>${escape(r.year)}</td><td>${escape(r.source)}</td></tr>`).join("") : `<tr><td colspan="4">No indicator matches “${escape(state.filter)}”. Try another word.</td></tr>`}</tbody>
</table>
<p><a href="#/sources">See the full source list →</a></p>`;
}

export function sources() {
  return `<h1>Sources &amp; Method</h1>
<p class="lede">Every figure on this site names its year and its source on the page where it appears. This page lists them together and explains the choices behind them.</p>
<h2>Sources</h2>
<ol>${SOURCES.map((s) => `<li><strong>[${s.n}]</strong> ${escape(s.text)}</li>`).join("")}</ol>
<h2>Method — read this before quoting a figure</h2>
<ul class="tight">
<li><strong>Census scope:</strong> the headline total of 241,499,431 covers the four provinces and Islamabad Capital Territory. Azad Jammu &amp; Kashmir and Gilgit-Baltistan are reported separately (about 4.33m and 1.71m in 2023).</li>
<li><strong>Counts vs estimates:</strong> a census counts people; later figures project that count forward. This site labels each one, and never presents a projection as a count.</li>
<li><strong>Different years, different answers:</strong> GDP is $371.6bn for 2024 (World Bank) and about $450.4bn for FY2025–26 (National Accounts Committee). Both are shown, with their years, because each is right for its own year and method.</li>
<li><strong>Where a figure is not published</strong> on the same basis — for example Islamabad's urban share — the site shows “—” instead of guessing.</li>
<li><strong>Checked November 2026.</strong> Figures are as published by their sources; the site adds no new estimates of its own.</li>
</ul>
<p><a href="#/">← Back to the overview</a></p>`;
}

export function missing() {
  return `<h1>Not found</h1><p>There is no page at this address. <a href="#/">See the overview</a>, or try <a href="#/population">Population</a>, <a href="#/economy">Economy</a>, <a href="#/education">Education &amp; Health</a> or <a href="#/provinces">Provinces</a>.</p>`;
}
