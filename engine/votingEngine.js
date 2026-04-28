// =========================================================
// VOTING ENGINE
// Determines who gets voted out.
// =========================================================

import { getRelationship } from "./relationshipEngine.js";
import { areAllies } from "./allianceEngine.js";
import {
  hasAdvantage,
  consumeAdvantage,
  getUsableAdvantages,
} from "./advantageEngine.js";

// ---------------------------------------------------------
// Determine who a contestant wants to vote for
// ---------------------------------------------------------
function pickVoteTarget(state, voter) {
  const cast = state.currentCast.filter((c) => c.id !== voter.id);

  // Score each potential target
  const scored = cast.map((target) => {
    let score = 0;

    // Lower relationship = more likely to vote against
    score -= getRelationship(state, voter.id, target.id);

    // Allies are protected
    if (areAllies(state, voter.id, target.id)) {
      score -= 50;
    }

    // Random noise to avoid ties
    score += Math.random() * 5;

    return { target, score };
  });

  // Highest score = most likely target
  scored.sort((a, b) => b.score - a.score);
  return scored[0].target;
}

// ---------------------------------------------------------
// Apply advantages BEFORE vote tally
// ---------------------------------------------------------
function applyPreVoteAdvantages(state, votes) {
  const cast = state.currentCast;

  cast.forEach((voter) => {
    const usable = getUsableAdvantages(state, voter.id, "elimination");

    usable.forEach((adv) => {
      // Extra vote
      if (adv.effects.extraVote) {
        votes.push({ voter: voter.id, target: pickVoteTarget(state, voter).id });
        consumeAdvantage(state, voter.id, adv.id);
      }

      // Vote steal
      if (adv.effects.stealVote) {
        const victim = pickVoteTarget(state, voter);
        votes.push({ voter: voter.id, target: pickVoteTarget(state, voter).id });
        consumeAdvantage(state, voter.id, adv.id);
      }

      // Vote block
      if (adv.effects.blockOtherVote) {
        const victim = pickVoteTarget(state, voter);
        votes = votes.filter((v) => v.voter !== victim.id);
        consumeAdvantage(state, voter.id, adv.id);
      }
    });
  });

  return votes;
}

// ---------------------------------------------------------
// Apply idols AFTER vote tally but BEFORE elimination
// ---------------------------------------------------------
function applyIdols(state, tally) {
  const cast = state.currentCast;

  cast.forEach((c) => {
    const usable = getUsableAdvantages(state, c.id, "elimination");

    usable.forEach((adv) => {
      if (adv.effects.blockVotes) {
        // Remove all votes against this contestant
        tally[c.id] = 0;
        consumeAdvantage(state, c.id, adv.id);
      }
    });
  });

  return tally;
}

// ---------------------------------------------------------
// Main voting runner
// ---------------------------------------------------------
function runVoting(state) {
  const cast = state.currentCast;

  let votes = [];

  // Step 1: Everyone casts a vote
  cast.forEach((voter) => {
    const target = pickVoteTarget(state, voter);
    votes.push({ voter: voter.id, target: target.id });
  });

  // Step 2: Apply pre-vote advantages
  votes = applyPreVoteAdvantages(state, votes);

  // Step 3: Tally votes
  const tally = {};
  cast.forEach((c) => (tally[c.id] = 0));
  votes.forEach((v) => {
    tally[v.target] += 1;
  });

  // Step 4: Apply idols
  applyIdols(state, tally);

  // Step 5: Determine elimination
  const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const [eliminatedId, highestVotes] = sorted[0];

  const eliminated = cast.find((c) => c.id === eliminatedId);

  // Step 6: Build vote summary text
  let voteSummary = "";
  sorted.forEach(([id, count]) => {
    const name = cast.find((c) => c.id === id)?.name || "Unknown";
    voteSummary += `${name}: ${count} votes\n`;
  });

  return {
    eliminated,
    voteSummary,
  };
}

export { runVoting };
