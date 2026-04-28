// =========================================================
// GAME LOOP ENGINE
// Controls episode flow and calls the other engines.
// =========================================================

import { runChallenge } from "./challengeEngine.js";
import { runEvents } from "./eventEngine.js";
import { runElimination } from "./eliminationEngine.js";
import { updateTrackRecordForEpisode } from "./trackRecordEngine.js";
import { runFinale } from "./finaleEngine.js";

function nextPhase(state) {
  const phase = state.phase;

  if (phase === "challenge") {
    runChallenge(state);
    state.phase = "events";
  }

  else if (phase === "events") {
    runEvents(state);
    state.phase = "elimination";
  }

  else if (phase === "elimination") {
    const finaleTriggered = runElimination(state);

    updateTrackRecordForEpisode(state);

    if (finaleTriggered) {
      state.phase = "finale";
    } else {
      state.phase = "challenge";
      state.episodeNumber += 1;
    }
  }

  else if (phase === "finale") {
    runFinale(state);
  }
}

function resetGameState(state) {
  state.episodeNumber = 1;
  state.phase = "challenge";
  state.trackRecord = {};
  state.eliminated = [];
  state.relationships = {};
  state.alliances = [];
  state.advantages = {};
}

export { nextPhase, resetGameState };
