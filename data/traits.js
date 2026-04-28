// =========================================================
// TRAITS REGISTRY
// =========================================================
// Each trait:
// {
//   id: "great_singer",
//   name: "Great Singer",
//   description: "Excels in musical or performance-based challenges.",
//   modifiers: {
//     musical: +3,
//     performance: +2,
//   }
// }

const TRAITS = [
  {
    id: "great_singer",
    name: "Great Singer",
    description: "Excels in musical or performance-based challenges.",
    modifiers: {
      musical: +4,
      performance: +2,
    },
  },
  {
    id: "asthmatic",
    name: "Asthmatic",
    description: "Struggles in endurance-heavy challenges.",
    modifiers: {
      marathon: -4,
      endurance: -2,
    },
  },
  {
    id: "strategist",
    name: "Strategist",
    description: "Strong in puzzles, planning, and strategic challenges.",
    modifiers: {
      puzzle: +3,
      strategy: +3,
    },
  },
  {
    id: "clumsy",
    name: "Clumsy",
    description: "Performs poorly in balance or precision challenges.",
    modifiers: {
      balance: -3,
      precision: -2,
    },
  },
  {
    id: "team_player",
    name: "Team Player",
    description: "Boosts team performance and synergy.",
    modifiers: {
      team: +3,
    },
  },
  {
    id: "saboteur",
    name: "Saboteur",
    description: "May cause chaos events; unpredictable performance.",
    modifiers: {
      chaos: +3,
      teamwork: -2,
    },
  },
];

// Export
export { TRAITS };
