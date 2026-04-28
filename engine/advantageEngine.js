// =========================================================
// ADVANTAGE ENGINE
// Handles giving, removing, and applying advantages.
// =========================================================

import { ADVANTAGES } from "../data/advantages.js";

// ---------------------------------------------------------
// Helper: get advantage object by ID
// ---------------------------------------------------------
function getAdvantage(id) {
  return ADVANTAGES.find((a) => a.id === id);
}

// ---------------------------------------------------------
// Give a contestant a random advantage
// ---------------------------------------------------------
function giveAdvantage(state, contestantId) {
  const adv = ADVANTAGES[Math.floor(Math.random() * ADVANTAGES.length)];
  if (!adv) return;

  if (!state.advantages[contestantId]) {
    state.advantages[contestantId] = [];
  }

  state.advantages[contestantId].push(adv.id);
  state.lastAdvantageFound = { contestantId, advantage: adv };
}

// ---------------------------------------------------------
// Remove all advantages from a contestant
// ---------------------------------------------------------
function removeAdvantage(state, contestantId) {
  state.advantages[contestantId] = [];
}

// ---------------------------------------------------------
// Check if contestant has a specific advantage
// ---------------------------------------------------------
function hasAdvantage(state, contestantId, advantageId) {
  return (
    state.advantages[contestantId] &&
    state.advantages[contestantId].includes(advantageId)
  );
}

// ---------------------------------------------------------
// Consume an advantage (remove it after use)
// ---------------------------------------------------------
function consumeAdvantage(state, contestantId, advantageId) {
  if (!state.advantages[contestantId]) return;

  state.advantages[contestantId] = state.advantages[contestantId].filter(
    (id) => id !== advantageId
  );
}

// ---------------------------------------------------------
// Get all advantages a contestant can use this phase
// ---------------------------------------------------------
function getUsableAdvantages(state, contestantId, phase) {
  const list = state.advantages[contestantId] || [];
  return list
    .map((id) => getAdvantage(id))
    .filter((adv) => adv.usePhase === phase);
}

export {
  giveAdvantage,
  removeAdvantage,
  hasAdvantage,
  consumeAdvantage,
  getUsableAdvantages,
};
