// =========================================================
// ELIMINATION ENGINE
// Executes elimination based on votes, idols, and advantages.
// =========================================================

import { runVoting } from "./votingEngine.js";
import { removeAdvantage } from "./advantageEngine.js";
import { INTRO_LINES } from "../data/introLines.js";
import { EXIT_LINES } from "../data/exitLines.js";

// ---------------------------------------------------------
// Helper: format intro/exit lines
// ---------------------------------------------------------
function randomLine(list, name) {
  const line = list[Math.floor(Math.random() * list.length)];
  return line.replace("{name}", name);
}

// ---------------------------------------------------------
// Handle sudden death elimination
// ---------------------------------------------------------
function suddenDeathElimination(state) {
  const loser = state.challengeResults.loser;

  state.currentCast = state.currentCast.filter((c) => c.id !== loser.id);
  state.eliminated.push(loser);

  state.lastEliminationText =
    `${loser.name} performed the worst and is instantly eliminated.\n\n` +
    `Exit: ${randomLine(EXIT_LINES, loser.name)}`;

  return loser;
}

// ---------------------------------------------------------
// Main elimination runner
// ---------------------------------------------------------
function runElimination(state) {
  const challenge = state.challengeResults;

  // Sudden death challenge
  if (challenge.suddenDeath) {
    suddenDeathElimination(state);
    return checkFinaleTrigger(state);
  }

  // Normal elimination
  const votingResult = runVoting(state);

  const eliminated = votingResult.eliminated;
  if (!eliminated) {
    state.lastEliminationText = "No one was eliminated.";
    return checkFinaleTrigger(state);
  }

  // Remove eliminated contestant
  state.currentCast = state.currentCast.filter((c) => c.id !== eliminated.id);
  state.eliminated.push(eliminated);

  // Remove their advantages
  removeAdvantage(state, eliminated.id);

  // Format elimination text
  state.lastEliminationText =
    `Voting results:\n${votingResult.voteSummary}\n\n` +
    `${eliminated.name} is eliminated.\n\n` +
    `Exit: ${randomLine(EXIT_LINES, eliminated.name)}`;

  return checkFinaleTrigger(state);
}

// ---------------------------------------------------------
// Finale trigger
// ---------------------------------------------------------
function checkFinaleTrigger(state) {
  const remaining = state.currentCast.length;

  if (state.options.finaleFormat === "top2" && remaining <= 2) {
    return true;
  }

  if (state.options.finaleFormat === "top3" && remaining <= 3) {
    return true;
  }

  return false;
}

export { runElimination };
