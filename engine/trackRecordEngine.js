// =========================================================
// TRACK RECORD ENGINE
// Updates track record after each episode.
// =========================================================

function ensureTrackEntry(state, id) {
  if (!state.trackRecord[id]) {
    state.trackRecord[id] = [];
  }
}

// ---------------------------------------------------------
// Add a result code for a contestant
// ---------------------------------------------------------
function addResult(state, id, code) {
  ensureTrackEntry(state, id);
  state.trackRecord[id].push(code);
}

// ---------------------------------------------------------
// Main episode track record updater
// ---------------------------------------------------------
function updateTrackRecordForEpisode(state) {
  const { winner, loser } = state.challengeResults;

  // WINNER
  if (winner) {
    addResult(state, winner.id, "WIN");
  }

  // LOSER (only if not winner)
  if (loser && loser.id !== winner.id) {
    addResult(state, loser.id, "LOW");
  }

  // SAFE (everyone else still in game)
  state.currentCast.forEach((c) => {
    if (c.id !== winner.id && c.id !== loser.id) {
      addResult(state, c.id, "SAFE");
    }
  });

  // OUT (eliminated this episode)
  const eliminated = state.eliminated[state.eliminated.length - 1];
  if (eliminated) {
    addResult(state, eliminated.id, "OUT");
  }
}

export { updateTrackRecordForEpisode };
