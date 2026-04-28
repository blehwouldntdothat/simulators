// =========================================================
// PREMADE CAST DATA
// =========================================================

import { DEFAULT_STATS } from "./stats.js";

const PREMADE_CAST = [
  {
    id: "nova",
    name: "Nova Blaze",
    image: null,
    stats: {
      strength: 7,
      intelligence: 6,
      creativity: 8,
      social: 5,
      endurance: 6,
      luck: 5,
    },
    traits: ["great_singer", "strategist"],
    introLines: [
      "Nova struts in with a fiery grin.",
      "Nova says: 'I don’t compete. I conquer.'",
    ],
    exitLines: [
      "Nova sighs: 'Guess the flame burned out… for now.'",
      "Nova smirks: 'I’ll rise again. Count on it.'",
    ],
  },

  {
    id: "jax",
    name: "Jax Timber",
    image: null,
    stats: {
      strength: 8,
      intelligence: 4,
      creativity: 5,
      social: 6,
      endurance: 7,
      luck: 4,
    },
    traits: ["clumsy", "team_player"],
    introLines: [
      "Jax jogs in, nearly tripping but laughing it off.",
      "Jax says: 'I may fall, but I always get back up.'",
    ],
    exitLines: [
      "Jax shrugs: 'Hey, at least I had fun.'",
      "Jax laughs: 'I’ll train harder and come back swinging.'",
    ],
  },

  {
    id: "seraphine",
    name: "Seraphine Vale",
    image: null,
    stats: {
      strength: 4,
      intelligence: 9,
      creativity: 7,
      social: 8,
      endurance: 5,
      luck: 6,
    },
    traits: ["strategist"],
    introLines: [
      "Seraphine enters with a calm, calculating smile.",
      "Seraphine says: 'Every move I make is intentional.'",
    ],
    exitLines: [
      "Seraphine sighs: 'A miscalculation… but a lesson learned.'",
      "Seraphine says: 'Next time, I’ll play even smarter.'",
    ],
  },

  {
    id: "milo",
    name: "Milo Drift",
    image: null,
    stats: {
      strength: 5,
      intelligence: 5,
      creativity: 6,
      social: 9,
      endurance: 4,
      luck: 8,
    },
    traits: ["team_player"],
    introLines: [
      "Milo waves enthusiastically to everyone on arrival.",
      "Milo says: 'Let’s make this season unforgettable!'",
    ],
    exitLines: [
      "Milo smiles: 'No hard feelings — this was amazing.'",
      "Milo says: 'I’ll cheer for the rest from the sidelines.'",
    ],
  },

  {
    id: "onyx",
    name: "Onyx Shade",
    image: null,
    stats: {
      strength: 6,
      intelligence: 7,
      creativity: 4,
      social: 3,
      endurance: 8,
      luck: 5,
    },
    traits: ["asthmatic", "saboteur"],
    introLines: [
      "Onyx steps in silently, observing everyone.",
      "Onyx says: 'I’m not here to talk. I’m here to win.'",
    ],
    exitLines: [
      "Onyx mutters: 'They’ll regret this.'",
      "Onyx says: 'I played my game. That’s enough.'",
    ],
  },
];

export { PREMADE_CAST };
