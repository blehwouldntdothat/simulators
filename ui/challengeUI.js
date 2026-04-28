// =========================================================
// CHALLENGE UI
// Displays challenge results in the episode panel.
// =========================================================

function renderChallengeUI(state) {
  const box = document.querySelector("#challenge-description");

  const results = state.challengeResults;
  if (!results) {
    box.textContent = "";
    return;
  }

  const { challenge, winner, loser, suddenDeath } = results;

  let text = `${challenge.name}\n`;
  text += `${winner.name} wins the challenge.\n`;
  text += `${loser.name} performs the worst.\n`;

  if (suddenDeath) {
    text += `\n⚠ Sudden Death: The lowest performer will be instantly eliminated.`;
  }

  box.textContent = text;
}

export { renderChallengeUI };
