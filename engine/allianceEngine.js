// =========================================================
// ALLIANCE ENGINE
// Handles alliance creation, strengthening, weakening,
// merging, and breaking.
// =========================================================

import { getRelationship } from "./relationshipEngine.js";

// ---------------------------------------------------------
// Find alliance containing a contestant
// ---------------------------------------------------------
function findAlliance(state, contestantId) {
  return state.alliances.find((a) => a.members.includes(contestantId)) || null;
}

// ---------------------------------------------------------
// Create a new alliance between two contestants
// ---------------------------------------------------------
function createAlliance(state, idA, idB) {
  const alliance = {
    members: [idA, idB],
    strength: 1,
  };

  state.alliances.push(alliance);
  return alliance;
}

// ---------------------------------------------------------
// Strengthen alliance between two contestants
// ---------------------------------------------------------
function strengthenAlliance(alliance, amount = 1) {
  alliance.strength += amount;
}

// ---------------------------------------------------------
// Weaken alliance
// ---------------------------------------------------------
function weakenAlliance(alliance, amount = 1) {
  alliance.strength -= amount;
  if (alliance.strength < 0) alliance.strength = 0;
}

// ---------------------------------------------------------
// Add a contestant to an existing alliance
// ---------------------------------------------------------
function addToAlliance(alliance, contestantId) {
  if (!alliance.members.includes(contestantId)) {
    alliance.members.push(contestantId);
  }
}

// ---------------------------------------------------------
// Remove a contestant from an alliance
// ---------------------------------------------------------
function removeFromAlliance(alliance, contestantId) {
  alliance.members = alliance.members.filter((id) => id !== contestantId);
}

// ---------------------------------------------------------
// Merge two alliances into one
// ---------------------------------------------------------
function mergeAlliances(state, a1, a2) {
  const merged = {
    members: [...new Set([...a1.members, ...a2.members])],
    strength: Math.floor((a1.strength + a2.strength) / 2),
  };

  state.alliances = state.alliances.filter((a) => a !== a1 && a !== a2);
  state.alliances.push(merged);

  return merged;
}

// ---------------------------------------------------------
// Apply alliance effect from an event
// ---------------------------------------------------------
function applyAllianceChange(state, idA, idB, amount) {
  let allianceA = findAlliance(state, idA);
  let allianceB = findAlliance(state, idB);

  // If neither is in an alliance → create one
  if (!allianceA && !allianceB) {
    const newAlliance = createAlliance(state, idA, idB);
    strengthenAlliance(newAlliance, amount);
    return;
  }

  // If both are in different alliances → merge
  if (allianceA && allianceB && allianceA !== allianceB) {
    const merged = mergeAlliances(state, allianceA, allianceB);
    strengthenAlliance(merged, amount);
    return;
  }

  // If only one is in an alliance → add the other
  const alliance = allianceA || allianceB;
  addToAlliance(alliance, idA);
  addToAlliance(alliance, idB);
  strengthenAlliance(alliance, amount);
}

// ---------------------------------------------------------
// Check if two contestants are allies
// ---------------------------------------------------------
function areAllies(state, idA, idB) {
  const alliance = findAlliance(state, idA);
  return alliance ? alliance.members.includes(idB) : false;
}

export {
  findAlliance,
  createAlliance,
  strengthenAlliance,
  weakenAlliance,
  addToAlliance,
  removeFromAlliance,
  mergeAlliances,
  applyAllianceChange,
  areAllies,
};
