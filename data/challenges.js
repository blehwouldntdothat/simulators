// =========================================================
// CHALLENGE REGISTRY
// =========================================================
// Each challenge:
// {
//   id: "musical_showdown",
//   name: "Musical Showdown",
//   category: "special",
//   phase: "both", // "team" | "merge" | "both"
//   stats: { creativity: 2, social: 1 },
//   traits: ["musical", "performance"],
//   suddenDeath: false,
// }

const CHALLENGES = [
  {
    id: "regular_competition",
    name: "Regular Competition",
    category: "regular",
    phase: "both",
    stats: { strength: 1, intelligence: 1, creativity: 1 },
    traits: [],
    suddenDeath: false,
  },

  {
    id: "reward_challenge",
    name: "Reward Challenge",
    category: "reward",
    phase: "both",
    stats: { endurance: 2, luck: 1 },
    traits: [],
    suddenDeath: false,
  },

  {
    id: "team_musical",
    name: "Team Musical",
    category: "special",
    phase: "team",
    stats: { creativity: 2, social: 2 },
    traits: ["musical", "performance"],
    suddenDeath: false,
  },

  {
    id: "marathon_endurance",
    name: "Marathon Endurance",
    category: "regular",
    phase: "both",
    stats: { endurance: 3 },
    traits: ["marathon"],
    suddenDeath: false,
  },

  {
    id: "sudden_death_showdown",
    name: "Sudden Death Showdown",
    category: "special",
    phase: "merge",
    stats: { strength: 2, endurance: 2 },
    traits: [],
    suddenDeath: true,
  },

  {
    id: "finale_gauntlet",
    name: "Finale Gauntlet",
    category: "finale",
    phase: "merge",
    stats: { intelligence: 2, creativity: 2, endurance: 2 },
    traits: ["performance", "strategy"],
    suddenDeath: false,
  },
];

export { CHALLENGES };
