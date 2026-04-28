// =========================================================
// FINALE UI
// Displays finale results and winner reveal.
// =========================================================

function renderFinaleUI(state) {
  const box = document.querySelector("#elimination-log"); 
  const header = document.querySelector("#episode-title");
  const phase = document.querySelector("#episode-phase");

  if (!state.finaleResults || !state.winner) {
    box.textContent = "Finale results unavailable.";
    return;
  }

  header.textContent = "Finale Results";
  phase.textContent = "finale";

  let text = "Finale Performance Scores:\n\n";

  state.finaleResults.forEach((entry) => {
    text += `${entry.contestant.name}: ${entry.score.toFixed(1)} pts\n`;
  });

  text += `\n🏆 Winner: ${state.winner.name}`;

  box.textContent = text;
}

export { renderFinaleUI };
