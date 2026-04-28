// =========================================================
// STATS SYSTEM
// =========================================================
// Stats influence general challenge performance.
// Traits influence specific challenge types.

const STAT_CATEGORIES = [
  "strength",
  "intelligence",
  "creativity",
  "social",
  "endurance",
  "luck",
];

// Default stats generator
function DEFAULT_STATS() {
  return {
    strength: 5,
    intelligence: 5,
    creativity: 5,
    social: 5,
    endurance: 5,
    luck: 5,
  };
}

// Validate a stats object
function validateStats(stats) {
  return STAT_CATEGORIES.every((key) => typeof stats[key] === "number");
}

export { STAT_CATEGORIES, DEFAULT_STATS, validateStats };
