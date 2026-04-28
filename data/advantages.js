// =========================================================
// ADVANTAGES REGISTRY
// =========================================================
// Each advantage:
// {
//   id: "idol",
//   name: "Hidden Immunity Idol",
//   description: "...",
//   usePhase: "elimination",
//   effects: { blockVotes: true },
//   consumed: true,
// }

const ADVANTAGES = [
  {
    id: "idol",
    name: "Hidden Immunity Idol",
    description: "Blocks all votes cast against the holder.",
    usePhase: "elimination",
    effects: {
      blockVotes: true,
    },
    consumed: true,
  },

  {
    id: "vote_steal",
    name: "Vote Steal",
    description: "Steal another player's vote and use it as your own.",
    usePhase: "elimination",
    effects: {
      stealVote: true,
    },
    consumed: true,
  },

  {
    id: "extra_vote",
    name: "Extra Vote",
    description: "Gives the holder one additional vote.",
    usePhase: "elimination",
    effects: {
      extraVote: true,
    },
    consumed: true,
  },

  {
    id: "vote_block",
    name: "Vote Block",
    description: "Prevents a chosen player from voting.",
    usePhase: "elimination",
    effects: {
      blockOtherVote: true,
    },
    consumed: true,
  },

  {
    id: "challenge_boost",
    name: "Challenge Boost",
    description: "Temporarily increases challenge performance.",
    usePhase: "challenge",
    effects: {
      challengeBoost: +3,
    },
    consumed: true,
  },

  {
    id: "safety_without_power",
    name: "Safety Without Power",
    description: "You cannot be voted out, but you cannot vote.",
    usePhase: "elimination",
    effects: {
      immune: true,
      cannotVote: true,
    },
    consumed: true,
  },
];

export { ADVANTAGES };
