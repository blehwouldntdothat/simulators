// =========================================================
// EPISODE UI
// Handles episode header, logs, cast sidebar, and advantages.
// =========================================================

// ---------------------------------------------------------
// Update episode header + phase label
// ---------------------------------------------------------
function updateEpisodeHeader(state) {
  document.querySelector("#episode-title").textContent =
    `Episode ${state.episodeNumber}`;

  document.querySelector("#episode-phase").textContent = state.phase;
}

// ---------------------------------------------------------
// Update challenge log
// ---------------------------------------------------------
function updateChallengeLog(state) {
  const box = document.querySelector("#challenge-description");

  if (!state.challengeResults) {
    box.textContent = "";
    return;
  }

  const { challenge, winner, loser } = state.challengeResults;

  let text = `${challenge.name}\n`;
  text += `${winner.name} wins the challenge.\n`;
  text += `${loser.name} performs the worst.\n`;

  if (challenge.suddenDeath) {
    text += `\nThis is a SUDDEN DEATH challenge.`;
  }

  box.textContent = text;
}

// ---------------------------------------------------------
// Update events log
// ---------------------------------------------------------
function updateEventsLog(state) {
  const box = document.querySelector("#events-log");
  box.textContent = state.lastEventText || "";
}

// ---------------------------------------------------------
// Update elimination log
// ---------------------------------------------------------
function updateEliminationLog(state) {
  const box = document.querySelector("#elimination-log");
  box.textContent = state.lastEliminationText || "";
}

// ---------------------------------------------------------
// Render cast sidebar
// ---------------------------------------------------------
function renderEpisodeCast(state) {
  const list = document.querySelector("#game-cast-list");
  list.innerHTML = "";

  state.currentCast.forEach((c) => {
    const li = document.createElement("li");

    const name = document.createElement("span");
    name.textContent = c.name;

    const status = document.createElement("span");
    status.className = "muted";
    status.textContent = "In";

    li.appendChild(name);
    li.appendChild(status);
    list.appendChild(li);
  });
}

// ---------------------------------------------------------
// Render advantage summary
// ---------------------------------------------------------
function renderAdvantageSummary(state) {
  const box = document.querySelector("#advantages-summary");
  box.innerHTML = "";

  const entries = Object.entries(state.advantages);

  if (entries.length === 0) {
    box.textContent = "No advantages in play.";
    return;
  }

  entries.forEach(([id, list]) => {
    const contestant = state.currentCast.find((c) => c.id === id);
    if (!contestant) return;

    const line = document.createElement("div");
    line.textContent = `${contestant.name}: ${list.join(", ")}`;
    box.appendChild(line);
  });
}

// ---------------------------------------------------------
// Update all episode UI elements
// ---------------------------------------------------------
function updateEpisodeUI(state) {
  updateEpisodeHeader(state);
  updateChallengeLog(state);
  updateEventsLog(state);
  updateEliminationLog(state);
  renderEpisodeCast(state);
  renderAdvantageSummary(state);
}

export {
  updateEpisodeUI,
  updateEpisodeHeader,
  updateChallengeLog,
  updateEventsLog,
  updateEliminationLog,
  renderEpisodeCast,
  renderAdvantageSummary,
};
