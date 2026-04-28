// =========================================================
// REALITY SHOW SIMULATOR — MASTER CONTROLLER
// Integrates data, engines, UI, and global state.
// =========================================================

// ----------------------
// IMPORT DATA
// ----------------------
import { PREMADE_CAST } from "./data/premadeCast.js";
import { TRAITS } from "./data/traits.js";
import { STAT_CATEGORIES, DEFAULT_STATS } from "./data/stats.js";
import { CHALLENGES } from "./data/challenges.js";
import { EVENTS } from "./data/events.js";
import { ADVANTAGES } from "./data/advantages.js";
import { INTRO_LINES } from "./data/introLines.js";
import { EXIT_LINES } from "./data/exitLines.js";

// ----------------------
// IMPORT ENGINES
// ----------------------
import { nextPhase, resetGameState } from "./engine/gameLoop.js";
import { runChallenge } from "./engine/challengeEngine.js";
import { runEvents } from "./engine/eventEngine.js";
import { runElimination } from "./engine/eliminationEngine.js";
import { updateTrackRecordForEpisode } from "./engine/trackRecordEngine.js";
import { runFinale } from "./engine/finaleEngine.js";

// ----------------------
// IMPORT UI MODULES
// ----------------------
import { initMainMenuUI } from "./ui/mainMenu.js";
import { renderCurrentCast } from "./ui/castSelect.js";
import { initStatsPageUI, renderStatsPage } from "./ui/statsPage.js";
import { updateEpisodeUI } from "./ui/episodeUI.js";
import { renderChallengeUI } from "./ui/challengeUI.js";
import { renderEliminationUI } from "./ui/eliminationUI.js";
import { renderTrackRecordUI } from "./ui/trackRecordUI.js";
import { renderFinaleUI } from "./ui/finaleUI.js";

// ----------------------
// IMPORT UTILS
// ----------------------
import { choice } from "./utils/random.js";
import { format } from "./utils/text.js";

// =========================================================
// GLOBAL STATE
// =========================================================

const state = {
  options: {
    advantagesEnabled: true,
    specialChallengesEnabled: true,
    finaleFormat: "top3",
  },

  premadeCast: PREMADE_CAST,
  currentCast: [],
  eliminated: [],

  episodeNumber: 1,
  phase: "challenge",

  trackRecord: {},
  relationships: {},
  alliances: [],
  advantages: {},

  // Engine outputs
  challengeResults: null,
  lastEventText: "",
  lastEliminationText: "",
  finaleResults: null,
  winner: null,
};

// =========================================================
// EPISODE FLOW CONTROLLER
// =========================================================

function advanceEpisode() {
  // Run engine logic for the current phase
  if (state.phase === "challenge") {
    runChallenge(state);
  } else if (state.phase === "events") {
    runEvents(state);
  } else if (state.phase === "elimination") {
    const finaleTriggered = runElimination(state);
    updateTrackRecordForEpisode(state);

    if (finaleTriggered) {
      state.phase = "finale";
      updateEpisodeUI(state);
      renderFinaleUI(state);
      renderTrackRecordUI(state);
      return;
    }
  } else if (state.phase === "finale") {
    runFinale(state);
    renderFinaleUI(state);
    return;
  }

  // Update UI for the phase that just ran
  updateEpisodeUI(state);
  renderChallengeUI(state);
  renderEliminationUI(state);
  renderTrackRecordUI(state);

  // Move to next phase
  nextPhase(state);

  // Update UI for new phase
  updateEpisodeUI(state);
}

// =========================================================
// NAVIGATION
// =========================================================

function showPanel(id) {
  document.querySelectorAll(".panel").forEach((p) => {
    p.classList.toggle("active", p.id === id);
  });
}

// =========================================================
// GAME START
// =========================================================

function startGame() {
  if (state.currentCast.length < 2) {
    alert("Add at least 2 contestants to start the simulation.");
    return;
  }

  resetGameState(state);

  // Reset UI
  document.querySelector("#challenge-description").textContent = "";
  document.querySelector("#events-log").textContent = "";
  document.querySelector("#elimination-log").textContent = "";

  // Render initial UI
  updateEpisodeUI(state);
  renderTrackRecordUI(state);
  renderCurrentCast(state);

  showPanel("game-panel");
}

// =========================================================
// BUTTON HOOKS
// =========================================================

function initButtons() {
  document.querySelector("#next-phase-btn").addEventListener("click", () => {
    advanceEpisode();
  });

  document.querySelector("#back-to-menu-btn").addEventListener("click", () => {
    if (!confirm("End the current simulation and return to the main menu")) return;
    showPanel("main-menu");
  });

  document.querySelector("#start-game-btn").addEventListener("click", startGame);
}

// =========================================================
// INITIALIZATION
// =========================================================

function init() {
  // Render initial UI
  renderCurrentCast(state);
  renderStatsPage(state, "");
  renderTrackRecordUI(state);

  // Initialize UI modules
  initMainMenuUI(state);
  initStatsPageUI(state);
  initButtons();

  // Show main menu
  showPanel("main-menu");
}

document.addEventListener("DOMContentLoaded", init);
