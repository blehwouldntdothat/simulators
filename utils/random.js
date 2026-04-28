// =========================================================
// RANDOM UTILITIES
// =========================================================

// Random integer between min and max (inclusive)
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick a random item from an array
function choice(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[randInt(0, arr.length - 1)];
}

// Fisher–Yates shuffle
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Weighted random choice: [{ item, weight }]
function weightedChoice(weightedList) {
  const total = weightedList.reduce((sum, w) => sum + w.weight, 0);
  let r = Math.random() * total;

  for (const w of weightedList) {
    if (r < w.weight) return w.item;
    r -= w.weight;
  }
  return weightedList[weightedList.length - 1].item;
}

export { randInt, choice, shuffle, weightedChoice };
