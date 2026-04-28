// =========================================================
// TEXT UTILITIES
// =========================================================

// Replace {placeholders} with values
function format(template, data) {
  return template.replace(/\{(\w+)\}/g, (_, key) => data[key] ?? "");
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sentence(str) {
  if (!str) return "";
  return /[.!?]$/.test(str) ? str : str + ".";
}

function pluralize(word, count) {
  return count === 1 ? word : word + "s";
}

export { format, capitalize, sentence, pluralize };
