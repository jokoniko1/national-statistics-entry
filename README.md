# Pakistan in Numbers — Make the best national statistics site

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/jokoniko1/national-statistics-entry/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/jokoniko1/national-statistics-entry/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

An offline national statistics site for Pakistan: population, economy, education and health, and a province-by-province comparison — every figure with its year and source, so a census count is never confused with a later estimate.

## What it is

- **Overview** — headline figures, population by province, and cards into every section.
- **Population** — 2023 Census counts for 2017 vs 2023, growth rates, urban share, and the count-vs-estimate explainer.
- **Economy** — World Bank 2024 figures alongside Pakistan's latest national accounts (FY2025–26), with the difference explained.
- **Education & Health** — literacy by province (2023 Census) and life expectancy (2024, World Bank), including the gender and provincial gaps.
- **Provinces** — a sortable comparison table for all five units.
- **All Indicators** — every figure in one searchable table.
- **Sources & Method** — the full source list and the rules used before quoting a figure.

The site is static files under `app/` with no build step and no network request: open `app/index.html` in a browser, or run `node serve.ts` and visit http://localhost:8080.

## Figures used

- Population 241,499,431 — PBS, 7th Population and Housing Census 2023
- GDP $371.6 billion, GDP per capita $1,479 — World Bank, 2024
- Literacy 60.65% (age 10+) — PBS, 2023 Census
- Life expectancy 67.8 years — World Bank, 2024

## Entry

`main.ts` copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`, as the kit's starter does. Outside the grader, `MAKEFUN_OUTPUT_DIR` stands in for `/output`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Screenshots are in `screenshots/`: the overview (cover), population, economy, and a phone-size population view.
