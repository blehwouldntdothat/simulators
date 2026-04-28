// =========================================================
// REALITY SHOW SIMULATOR — CLEAN FOUNDATION SCRIPT
// No temporary logic. No placeholder data.
// All systems are structured and ready for real engines.
// =========================================================

// ===== Global State =====

const state = {
  options: {
    advantagesEnabled: true,
    specialChallengesEnabled: true,
    finaleFormat: "top3",
  },

  premadeCast: [],        // Loaded from data files later
  currentCast: [],        // User-selected cast
  eliminated: [],         // Eliminated contestants

  episodeNumber: 1,
  phase: "challenge",     // "challenge" | "events" | "elimination"

  trackRecord: {},        // { contestantId: [ "WIN", "SAFE", ... ] }

  // Relationship, alliances, advantages, etc.
  relationships: {},      // { idA: { idB: score } }
  alliances: [],          // Array of alliance objects
  advantages: {},         // { contestantId: [ advantageObjects ] }
};

// ===== Utility Helpers =====

function $(selector) {
  return document.querySelector(selector);
}

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

// ===== Panel Switching =====

function showPanel(id) {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === id);
  });
}

// =========================================================
// CAST MANAGEMENT
// =========================================================

function renderCurrentCast() {
  const list = $("#current-cast-list");
  list.innerHTML = "";

  state.currentCast.forEach((c) => {
    const li = createEl("li");
    li.appendChild(createEl("span", null, c.name));
    li.appendChild(createEl("span", "cast-pill", "In cast"));
    list.appendChild(li);
  });
}

function addPremadeFromSearch() {
  const query = $("#premade-search").value.trim().toLowerCase();
  if (!query) return;

  const found = state.premadeCast.find((c) =>
    c.name.toLowerCase().includes(query)
  );

  if (!found) {
    alert("No premade character found.");
    return;
  }

  if (state.currentCast.some((c) => c.id === found.id)) {
    alert("Already in cast.");
    return;
  }

  state.currentCast.push(structuredClone(found));
  renderCurrentCast();
}

function addRandomPremade() {
  const available = state.premadeCast.filter(
    (c) => !state.currentCast.some((cc) => cc.id === c.id)
  );

  if (available.length === 0) {
    alert("No premade characters left to add.");
    return;
  }

  const chosen = available[Math.floor(Math.random() * available.length)];
  state.currentCast.push(structuredClone(chosen));
  renderCurrentCast();
}

function addCustomCharacter() {
  const name = prompt("Enter custom character name:");
  if (!name || !name.trim()) return;

  const id = `custom_${Date.now()}`;

  const custom = {
    id,
    name: name.trim(),
    image: null,
    stats: {},     // Filled later
    traits: [],    // Filled later
  };

  state.currentCast.push(custom);
  renderCurrentCast();
}

// =========================================================
// STATS PAGE
// =========================================================

function renderStatsList(filter = "") {
  const container = $("#stats-list");
  container.innerHTML = "";

  const q = filter.trim().toLowerCase();

  const filtered = state.premadeCast.filter((c) =>
    c.name.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    const empty = createEl("div", "muted", "No characters match that search.");
    empty.style.padding = "10px 12px";
    container.appendChild(empty);
    return;
  }

  filtered.forEach((c) => {
    const card = createEl("div", "stats-card");

    const avatar = createEl("div", "stats-avatar", c.name[0] ?? "?");
    const meta = createEl("div", "stats-meta");
    const tags = createEl("div", "stats-tags");

    meta.appendChild(createEl("h4", null, c.name));

    // Stats summary (real stats will be added later)
    const statsLine = createEl("p", null, "Stats: (to be implemented)");
    meta.appendChild(statsLine);

    // Traits
    c.traits?.forEach((t) => {
      tags.appendChild(createEl("span", "tag", t.replace(/_/g, " ")));
    });

    card.appendChild(avatar);
    card.appendChild(meta);
    card.appendChild(tags);

    container.appendChild(card);
  });
}

// =========================================================
// TRACK RECORD
// =========================================================

function ensureTrackRecordEntry(id) {
  if (!state.trackRecord[id]) {
    state.trackRecord[id] = [];
  }
}

function addTrackResult(id, code) {
  ensureTrackRecordEntry(id);
  state.trackRecord[id].push(code);
}

function renderTrackRecord() {
  const wrapper = $("#track-record-table-wrapper");
  wrapper.innerHTML = "";

  const all = [...state.currentCast, ...state.eliminated];
  if (all.length === 0) {
    wrapper.appendChild(
      createEl("div", "muted", "Track record will appear once the game starts.")
    );
    return;
  }

  const maxEpisodes = Math.max(
    0,
    ...all.map((c) => (state.trackRecord[c.id] || []).length)
  );

  const table = createEl("table", "track-record-table");
  const thead = createEl("thead");
  const headerRow = createEl("tr");

  headerRow.appendChild(createEl("th", null, "Contestant"));
  for (let ep = 1; ep <= maxEpisodes; ep++) {
    headerRow.appendChild(createEl("th", null, `Ep ${ep}`));
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = createEl("tbody");

  all.forEach((c) => {
    const row = createEl("tr");
    row.appendChild(createEl("td", null, c.name));

    const results = state.trackRecord[c.id] || [];
    for (let ep = 0; ep < maxEpisodes; ep++) {
      const code = results[ep] || "";
      const cell = createEl("td", null, code);
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);
}

// =========================================================
// GAME FLOW (NO TEMPORARY LOGIC)
// =========================================================

function resetGameStateForNewSimulation() {
  state.episodeNumber = 1;
  state.phase = "challenge";
  state.trackRecord = {};
  state.eliminated = [];
}

function updateEpisodeHeader() {
  $("#episode-title").textContent = `Episode ${state.episodeNumber}`;
  $("#episode-phase").textContent = state.phase;
}

function nextPhase() {
  // Placeholder: real engines will be added later
  // challengeEngine.run()
  // eventEngine.run()
  // eliminationEngine.run()

  if (state.phase === "challenge") {
    state.phase = "events";
  } else if (state.phase === "events") {
    state.phase = "elimination";
  } else if (state.phase === "elimination") {
    state.phase = "challenge";
    state.episodeNumber += 1;
  }

  updateEpisodeHeader();
}

// =========================================================
// CAST SIDEBAR
// =========================================================

function renderGameCastList() {
  const list = $("#game-cast-list");
  list.innerHTML = "";

  state.currentCast.forEach((c) => {
    const li = createEl("li");
    li.appendChild(createEl("span", null, c.name));
    li.appendChild(createEl("span", "muted", "In"));
    list.appendChild(li);
  });
}

// =========================================================
// OPTIONS
// =========================================================

function syncOptionsFromUI() {
  state.options.advantagesEnabled = $("#toggle-advantages").checked;
  state.options.specialChallengesEnabled = $("#toggle-special-challenges").checked;
  state.options.finaleFormat = $("#finale-format").value;
}

// =========================================================
// EVENT LISTENERS
// =========================================================

function setupEventListeners() {
  $("#add-premade-btn").addEventListener("click", addPremadeFromSearch);
  $("#add-random-premade-btn").addEventListener("click", addRandomPremade);
  $("#add-custom-btn").addEventListener("click", addCustomCharacter);

  $("#view-stats-btn").addEventListener("click", () => {
    renderStatsList($("#stats-search").value);
    showPanel("stats-page");
  });

  $("#back-from-stats-btn").addEventListener("click", () => {
    showPanel("main-menu");
  });

  $("#stats-search").addEventListener("input", (e) => {
    renderStatsList(e.target.value);
  });

  $("#start-game-btn").addEventListener("click", () => {
    if (state.currentCast.length < 2) {
      alert("Add at least 2 contestants.");
      return;
    }

    syncOptionsFromUI();
    resetGameStateForNewSimulation();
    renderGameCastList();
    renderTrackRecord();
    updateEpisodeHeader();
    showPanel("game-panel");
  });

  $("#back-to-menu-btn").addEventListener("click", () => {
    if (!confirm("End simulation and return to menu")) return;
    showPanel("main-menu");
  });

  $("#next-phase-btn").addEventListener("click", nextPhase);
}

// =========================================================
// INIT
// =========================================================

function init() {
  renderCurrentCast();
  renderStatsList("");
  renderTrackRecord();
  setupEventListeners();
  showPanel("main-menu");
}

document.addEventListener("DOMContentLoaded", init);
