// =========================================================
// STATS PAGE UI
// Renders premade cast stats and handles search.
// =========================================================

import { STAT_CATEGORIES } from "../data/stats.js";

// ---------------------------------------------------------
// Render a single premade card
// ---------------------------------------------------------
function renderStatsCard(container, contestant) {
  const card = document.createElement("div");
  card.className = "stats-card";

  const avatar = document.createElement("div");
  avatar.className = "stats-avatar";
  avatar.textContent = contestant.name[0] ?? "?";

  const meta = document.createElement("div");
  meta.className = "stats-meta";

  const nameEl = document.createElement("h4");
  nameEl.textContent = contestant.name;

  const statsLine = document.createElement("p");
  statsLine.textContent = STAT_CATEGORIES
    .map((s) => `${s.toUpperCase()} ${contestant.stats[s]}`)
    .join(" · ");

  const tags = document.createElement("div");
  tags.className = "stats-tags";

  contestant.traits.forEach((t) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = t.replace(/_/g, " ");
    tags.appendChild(tag);
  });

  meta.appendChild(nameEl);
  meta.appendChild(statsLine);

  card.appendChild(avatar);
  card.appendChild(meta);
  card.appendChild(tags);

  container.appendChild(card);
}

// ---------------------------------------------------------
// Render full stats list
// ---------------------------------------------------------
function renderStatsPage(state, filter = "") {
  const container = document.querySelector("#stats-list");
  container.innerHTML = "";

  const q = filter.trim().toLowerCase();

  const filtered = state.premadeCast.filter((c) =>
    c.name.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "muted";
    empty.style.padding = "10px 12px";
    empty.textContent = "No premade characters match that search.";
    container.appendChild(empty);
    return;
  }

  filtered.forEach((c) => renderStatsCard(container, c));
}

// ---------------------------------------------------------
// Initialize stats page UI
// ---------------------------------------------------------
function initStatsPageUI(state) {
  const search = document.querySelector("#stats-search");

  search.addEventListener("input", (e) => {
    renderStatsPage(state, e.target.value);
  });
}

export { initStatsPageUI, renderStatsPage };
