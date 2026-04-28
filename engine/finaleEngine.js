// =========================================================
// FINALE ENGINE
// Determines the winner based on stats, traits, and social game.
// =========================================================

import { TRAITS } from "../data/traits.js";

// ---------------------------------------------------------
// Helper: get trait object
// ---------------------------------------------------------
function getTrait(id) {
  return TRAITS.find((t) => t.id === id);
}

// ---------------------------------------------------------
// Finale scoring system
// ---------------------------------------------------------
function calculateFinaleScore(state, contestant) {
  let score = 0;

  // ===== Stats contribution =====
  for (const stat in contestant.stats) {
    score += contestant.stats[stat] * 1.5; // Finale weighting
  }

  // ===== Trait contribution =====
  contestant.traits.forEach((traitId) => {
    const trait = getTrait(traitId);
    if (!trait) return;

    for (const tag in trait.modifiers) {
      score += trait.modifiers[tag] * 0.5; // Traits matter, but less than stats
    }
  });

  // ===== Social contribution =====
  const relationships = state.relationships[contestant.id] || {};
  const avgRelationship =
    Object.values(relationships).reduce((a, b) => a + b, 0) /
    Math.max(1, Object.values(relationships).length);

  score += avgRelationship * 1.2;

  // ===== Alliance contribution =====
  const alliance = state.alliances.find((a) =>
    a.members.includes(contestant.id)
  );
  if (alliance) {
    score += alliance.strength * 2;
  }

  return score;
}

// ---------------------------------------------------------
// Main finale runner
// ---------------------------------------------------------
function runFinale(state) {
  const finalists = [...state.currentCast];

  if (finalists.length === 0) {
    state.finaleResults = null;
    state.winner = null;
    return;
  }

  // Score each finalist
  const scored = finalists.map((c) => ({
    contestant: c,
    score: calculateFinaleScore(state, c),
  }));

  // Sort highest → lowest
  scored.sort((a, b) => b.score - a.score);

  // Winner is highest score
  const winner = scored[0].contestant;

  state.finaleResults = scored;
  state.winner = winner;

  state.lastFinaleText =
    `Finale Results:\n` +
    scored
      .map((s) => `${s.contestant.name}: ${s.score.toFixed(1)} pts`)
      .join("\n") +
    `\n\nWinner: ${winner.name}`;
}

export { runFinale };
