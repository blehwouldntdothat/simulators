// =========================================================
// MAIN MENU UI
// Handles menu navigation, option toggles, and starting the game.
// =========================================================

import { renderPremadeSearchResults } from "./castSelect.js";
import { renderCurrentCast } from "./castSelect.js";
import { resetGameState } from "../engine/gameLoop.js";

// ---------------------------------------------------------
// Sync UI options → state
// ---------------------------------------------------------
function syncOptions(state) {
  state.options.advantagesEnabled = document.querySelector("#toggle-advantages").checked;
  state.options.specialChallengesEnabled = document.querySelector("#toggle-special-challenges").checked;
  state.options.finaleFormat = document.querySelector("#finale-format").value;
}

// ---------------------------------------------------------
// Start simulation
// ---------------------------------------------------------
function startSimulation(state) {
  if (state.currentCast.length < 2) {
    alert("Add at least 2 contestants to start the simulation.");
    return;
  }

  syncOptions(state);
  resetGameState(state);

  // UI updates
  document.querySelector("#challenge-description").textContent = "";
  document.querySelector("#events-log").textContent = "";
  document.querySelector("#elimination-log").textContent = "";

  document.querySelector("#episode-title").textContent = "Episode 1";
  document.querySelector("#episode-phase").textContent = "challenge";

  document.querySelector("#main-menu").classList.remove("active");
  document.querySelector("#game-panel").classList.add("active");
}

// ---------------------------------------------------------
// Navigation
// ---------------------------------------------------------
function showStatsPage() {
  document.querySelector("#main-menu").classList.remove("active");
  document.querySelector("#stats-page").classList.add("active");
}

function backToMenu() {
  document.querySelector("#stats-page").classList.remove("active");
  document.querySelector("#main-menu").classList.add("active");
}

// ---------------------------------------------------------
// Initialize main menu UI
// ---------------------------------------------------------
function initMainMenuUI(state) {
  // Search premades
  document.querySelector("#premade-search").addEventListener("input", (e) => {
    renderPremadeSearchResults(state, e.target.value);
  });

  // Add premade
  document.querySelector("#add-premade-btn").addEventListener("click", () => {
    renderPremadeSearchResults(state, document.querySelector("#premade-search").value, true);
  });

  // Add random premade
  document.querySelector("#add-random-premade-btn").addEventListener("click", () => {
    const available = state.premadeCast.filter(
      (c) => !state.currentCast.some((cc) => cc.id === c.id)
    );
    if (available.length === 0) {
      alert("All premade characters are already added.");
      return;
    }
    const chosen = available[Math.floor(Math.random() * available.length)];
    state.currentCast.push(structuredClone(chosen));
    renderCurrentCast(state);
  });

  // Add custom
  document.querySelector("#add-custom-btn").addEventListener("click", () => {
    const name = prompt("Enter custom character name:");
    if (!name || !name.trim()) return;

    const id = `custom_${Date.now()}`;
    state.currentCast.push({
      id,
      name: name.trim(),
      image: null,
      stats: {},
      traits: [],
    });

    renderCurrentCast(state);
  });

  // Stats page
  document.querySelector("#view-stats-btn").addEventListener("click", showStatsPage);
  document.querySelector("#back-from-stats-btn").addEventListener("click", backToMenu);

  // Start game
  document.querySelector("#start-game-btn").addEventListener("click", () => {
    startSimulation(state);
  });
}

export { initMainMenuUI };
