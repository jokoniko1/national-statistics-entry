// Pakistan in Numbers — hash router, table sorting and indicator search.
// Routes: #/ overview, #/population, #/economy, #/education, #/provinces,
// #/indicators (searchable table), #/sources. window.__shotReady is false
// while a page renders and true once it is on screen, so a screenshot
// script knows when to capture.

import { overview, population, economy, education, provinces, indicators, sources, missing } from "./views.js";

const app = document.getElementById("app");
const state = { sortKey: "pop2023", dir: -1, filter: "" };

const TITLES = {
  "/": "Pakistan in Numbers — National Statistics",
  "/population": "Population | Pakistan in Numbers",
  "/economy": "Economy | Pakistan in Numbers",
  "/education": "Education & Health | Pakistan in Numbers",
  "/provinces": "Provinces | Pakistan in Numbers",
  "/indicators": "All Indicators | Pakistan in Numbers",
  "/sources": "Sources & Method | Pakistan in Numbers",
};

function render() {
  window.__shotReady = false;
  const route = location.hash.replace(/^#/, "") || "/";
  let html;
  if (route === "/" || route === "") { html = overview(); }
  else if (route === "/population") { html = population(state); }
  else if (route === "/economy") { html = economy(); }
  else if (route === "/education") { html = education(); }
  else if (route === "/provinces") { html = provinces(state); }
  else if (route === "/indicators") { html = indicators(state); }
  else if (route === "/sources") { html = sources(); }
  else { html = missing(); }
  document.title = TITLES[route] || "Pakistan in Numbers";
  app.innerHTML = html;
  const q = document.getElementById("q");
  if (q) {
    q.addEventListener("input", () => { state.filter = q.value; render(); const again = document.getElementById("q"); if (again) { again.focus(); again.setSelectionRange(again.value.length, again.value.length); } });
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

app.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-sort]");
  if (!button) return;
  const key = button.getAttribute("data-sort");
  if (state.sortKey === key) { state.dir = -state.dir; }
  else { state.sortKey = key; state.dir = key === "name" ? 1 : -1; }
  render();
});

window.addEventListener("hashchange", render);
render();
