// =========================================================
// ARRAY UTILITIES
// =========================================================

function unique(arr) {
  return [...new Set(arr)];
}

function removeItem(arr, item) {
  return arr.filter((x) => x !== item);
}

function sortBy(arr, keyFn, descending = false) {
  const sorted = [...arr].sort((a, b) => {
    const ka = keyFn(a);
    const kb = keyFn(b);
    return ka - kb;
  });
  return descending ? sorted.reverse() : sorted;
}

function groupBy(arr, keyFn) {
  const groups = {};
  arr.forEach((item) => {
    const key = keyFn(item);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return groups;
}

export { unique, removeItem, sortBy, groupBy };
