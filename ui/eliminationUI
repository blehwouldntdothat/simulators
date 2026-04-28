// =========================================================
// ELIMINATION UI
// Displays elimination ceremony results.
// =========================================================

function renderEliminationUI(state) {
  const box = document.querySelector("#elimination-log");

  const text = state.lastEliminationText || "No elimination occurred.";
  box.textContent = text;
}

// ---------------------------------------------------------
// Render vote summary (optional helper)
// ---------------------------------------------------------
function renderVoteSummary(voteSummary) {
  const box = document.querySelector("#elimination-log");

  box.textContent =
    "Voting Results:\n" +
    voteSummary +
    "\n(See above for elimination outcome)";
}

// ---------------------------------------------------------
// Render sudden death elimination
// ---------------------------------------------------------
function renderSuddenDeathUI(state) {
  const box = document.querySelector("#elimination-log");

  const loser = state.challengeResults?.loser;
  if (!loser) {
    box.textContent = "Sudden death elimination occurred, but no loser found.";
    return;
  }

  box.textContent =
    `${loser.name} performed the worst and is instantly eliminated.\n\n` +
    `Exit: ${state.lastEliminationText}`;
}

export { renderEliminationUI, renderVoteSummary, renderSuddenDeathUI };
