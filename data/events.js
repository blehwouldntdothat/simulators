// =========================================================
// EVENT REGISTRY
// =========================================================
// Each event:
// {
//   id: "bonding_moment",
//   category: "bonding" | "rivalry" | "chaos" | "alliance" | "betrayal" | "advantage",
//   relationshipEffect: +3,
//   allianceEffect: 0,
//   requires: { trait: "team_player" } (optional),
//   text: "{a} and {b} bond over shared experiences."
// }

const EVENTS = [
  // ===== Bonding =====
  {
    id: "bonding_general",
    category: "bonding",
    relationshipEffect: +3,
    allianceEffect: 0,
    text: "{a} and {b} bond over shared experiences at camp.",
  },
  {
    id: "bonding_teamwork",
    category: "bonding",
    relationshipEffect: +4,
    requires: { trait: "team_player" },
    text: "{a} and {b} work together flawlessly, strengthening their connection.",
  },

  // ===== Rivalry =====
  {
    id: "rivalry_argument",
    category: "rivalry",
    relationshipEffect: -3,
    text: "{a} and {b} get into a heated argument, creating tension.",
  },
  {
    id: "rivalry_competition",
    category: "rivalry",
    relationshipEffect: -4,
    text: "{a} feels threatened by {b}'s performance, sparking a rivalry.",
  },

  // ===== Alliance =====
  {
    id: "alliance_form",
    category: "alliance",
    relationshipEffect: +2,
    allianceEffect: +1,
    text: "{a} and {b} agree to watch each other's backs.",
  },

  // ===== Betrayal =====
  {
    id: "betrayal_vote",
    category: "betrayal",
    relationshipEffect: -5,
    allianceEffect: -2,
    text: "{a} secretly plots against {b}, damaging their trust.",
  },

  // ===== Chaos =====
  {
    id: "chaos_sabotage",
    category: "chaos",
    relationshipEffect: -2,
    requires: { trait: "saboteur" },
    text: "{a} causes chaos around camp, frustrating {b}.",
  },

  // ===== Advantage Discovery =====
  {
    id: "find_idol",
    category: "advantage",
    relationshipEffect: 0,
    text: "{a} discovers a hidden immunity idol while exploring.",
  },
  {
    id: "find_vote_steal",
    category: "advantage",
    relationshipEffect: 0,
    text: "{a} finds a mysterious parchment… it's a Vote Steal!",
  },
];

export { EVENTS };
