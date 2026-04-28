// =========================================================
// RELATIONSHIP ENGINE
// Handles relationship scores between contestants.
// =========================================================

// ---------------------------------------------------------
// Ensure relationship entries exist for both directions
// ---------------------------------------------------------
function ensureRelationship(state, idA, idB) {
  if (!state.relationships[idA]) state.relationships[idA] = {};
  if (!state.relationships[idA][idB]) state.relationships[idA][idB] = 0;

  if (!state.relationships[idB]) state.relationships[idB] = {};
  if (!state.relationships[idB][idA]) state.relationships[idB][idA] = 0;
}

// ---------------------------------------------------------
// Apply a relationship change (+ or -)
// ---------------------------------------------------------
function applyRelationshipChange(state, idA, idB, amount) {
  ensureRelationship(state, idA, idB);

  state.relationships[idA][idB] += amount;
  state.relationships[idB][idA] += amount;
}

// ---------------------------------------------------------
// Get relationship score between two contestants
// ---------------------------------------------------------
function getRelationship(state, idA, idB) {
  ensureRelationship(state, idA, idB);
  return state.relationships[idA][idB];
}

// ---------------------------------------------------------
// Get strongest positive relationships for a contestant
// (Useful for alliance formation)
// ---------------------------------------------------------
function getTopRelationships(state, id, limit = 3) {
  ensureRelationship(state, id, id);

  const entries = Object.entries(state.relationships[id])
    .filter(([otherId]) => otherId !== id)
    .sort((a, b) => b[1] - a[1]) // highest → lowest
    .slice(0, limit);

  return entries.map(([otherId, score]) => ({ id: otherId, score }));
}

export {
  applyRelationshipChange,
  getRelationship,
  getTopRelationships,
  ensureRelationship,
};
