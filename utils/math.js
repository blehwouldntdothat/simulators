// =========================================================
// MATH UTILITIES
// =========================================================

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function average(arr) {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

// Normalize array of numbers to 0–1 range
function normalize(arr) {
  if (arr.length === 0) return [];
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  if (min === max) return arr.map(() => 0.5);
  return arr.map((v) => (v - min) / (max - min));
}

export { clamp, sum, average, normalize };
