// =========================================================
// EVENT ENGINE
// Handles bonding, rivalry, alliances, chaos, and advantages.
// =========================================================

import { EVENTS } from "../data/events.js";
import { applyRelationshipChange } from "./relationshipEngine.js";
import { applyAllianceChange } from "./allianceEngine.js";
import { giveAdvantage } from "./advantageEngine.js";

// ---------------------------------------------------------
// Helper: check if contestant meets event requirements
// ---------------------------------------------------------
function meetsRequirements(contestant, event) {
  if (!event.requires) return true;

  if (event.requires.trait) {
    return contestant.traits.includes(event.requires.trait);
  }

  return true;
}

// ---------------------------------------------------------
// Pick a valid event for two contestants
// ---------------------------------------------------------
function pickEvent(a, b) {
  const valid = EVENTS.filter((ev) => {
    return meetsRequirements(a, ev) || meetsRequirements(b, ev);
  });

  if (valid.length === 0) return null;

  return valid[Math.floor(Math.random() * valid.length)];
}

// ---------------------------------------------------------
// Apply event effects
// ---------------------------------------------------------
function applyEventEffects(event, a, b, state) {
  // Relationship changes
  if (event.relationshipEffect) {
    applyRelationshipChange(state, a.id, b.id, event.relationshipEffect);
  }

  // Alliance changes
  if (event.allianceEffect) {
    applyAllianceChange(state, a.id, b.id, event.allianceEffect);
  }

  // Advantage discovery
  if (event.category === "advantage") {
    giveAdvantage(state, a.id);
  }
}

// ---------------------------------------------------------
// Main event runner
// ---------------------------------------------------------
function runEvents(state) {
  const cast = state.currentCast;
  if (cast.length < 2) return;

  // Pick two different contestants
  let a = cast[Math.floor(Math.random() * cast.length)];
  let b = cast[Math.floor(Math.random() * cast.length)];

  while (b.id === a.id) {
    b = cast[Math.floor(Math.random() * cast.length)];
  }

  const event = pickEvent(a, b);
  if (!event) {
    state.lastEventText = "No valid event occurred.";
    return;
  }

  applyEventEffects(event, a, b, state);

  // Format text
  state.lastEventText = event.text
    .replace("{a}", a.name)
    .replace("{b}", b.name);
}

export { runEvents };
