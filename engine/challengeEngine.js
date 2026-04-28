// =========================================================
// CHALLENGE ENGINE
// Calculates performance using stats, traits, and challenge data.
// =========================================================

import { CHALLENGES } from "../data/challenges.js";
import { TRAITS } from "../data/traits.js";
import { ADVANTAGES } from "../data/advantages.js";

// ---------------------------------------------------------
// Helper: get trait object by ID
// ---------------------------------------------------------
function getTrait(id) {
  return TRAITS.find((t) => t.id === id);
}

// ---------------------------------------------------------
// Helper: get advantage object by ID
// ---------------------------------------------------------
function getAdvantage(id) {
  return ADVANTAGES.find((a) => a.id === id);
}

// ---------------------------------------------------------
// Calculate performance score for a contestant
// ---------------------------------------------------------
function calculatePerformance(contestant, challenge, state) {
  let score = 0;

  // ===== Base stats =====
  for (const stat in challenge.stats) {
    const weight = challenge.stats[stat];
    const value = contestant.stats[stat] ?? 0;
    score += value * weight;
  }

  // ===== Trait modifiers =====
  contestant.traits.forEach((traitId) => {
    const trait = getTrait(traitId);
    if (!trait) return;

    for (const tag in trait.modifiers) {
      if (challenge.traits.includes(tag)) {
        score += trait.modifiers[tag];
      }
    }
  });

  // ===== Advantage boosts =====
  const advList = state.advantages[contestant.id] || [];
  advList.forEach((advId) => {
    const adv = getAdvantage(advId);
    if (!adv) return;

    if (adv.effects.challengeBoost && challenge.category !== "finale") {
      score += adv.effects.challengeBoost;
    }
  });

  return score;
}

// ---------------------------------------------------------
// Select a challenge appropriate for the phase
// ---------------------------------------------------------
function pickChallenge(state) {
  const isMerge = state.currentCast.length <= 10; // You can adjust this later

  return CHALLENGES.find((c) => {
    if (c.phase === "both") return true;
    if (c.phase === "team" && !isMerge) return true;
    if (c.phase === "merge" && isMerge) return true;
    return false;
  });
}

// ---------------------------------------------------------
// Main challenge runner
// ---------------------------------------------------------
function runChallenge(state) {
  const challenge = pickChallenge(state);
  state.currentChallenge = challenge;

  const results = [];

  state.currentCast.forEach((contestant) => {
    const score = calculatePerformance(contestant, challenge, state);
    results.push({ contestant, score });
  });

  // Sort highest → lowest
  results.sort((a, b) => b.score - a.score);

  const winner = results[0].contestant;
  const loser = results[results.length - 1].contestant;

  state.challengeResults = {
    challenge,
    results,
    winner,
    loser,
    suddenDeath: challenge.suddenDeath === true,
  };

  // Sudden death elimination is handled in eliminationEngine
}

export { runChallenge };
