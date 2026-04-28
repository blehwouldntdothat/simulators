// =========================================================
// CAST SELECTION UI
// Handles searching premades, adding cast, and rendering cast list.
// =========================================================

// ---------------------------------------------------------
// Render premade search results (optional auto-add)
// ---------------------------------------------------------
function renderPremadeSearchResults(state, query, autoAdd = false) {
  const q = query.trim().toLowerCase();
  if (!q) return;

  const found = state.premadeCast.find((c) =>
    c.name.toLowerCase().includes(q)
  );

  if (!found) {
    alert("No premade character found.");
    return;
  }

  if (autoAdd) {
    if (state.currentCast.some((c) => c.id === found.id)) {
      alert("Already in cast.");
      return;
    }
    state.currentCast.push(structuredClone(found));
    renderCurrentCast(state);
  }
}

// ---------------------------------------------------------
// Render current cast list
// ---------------------------------------------------------
function renderCurrentCast(state) {
  const list = document.querySelector("#current-cast-list");
  list.innerHTML = "";

  state.currentCast.forEach((c) => {
    const li = document.createElement("li");

    const name = document.createElement("span");
    name.textContent = c.name;

    const pill = document.createElement("span");
    pill.className = "cast-pill";
    pill.textContent = "In cast";

    li.appendChild(name);
    li.appendChild(pill);
    list.appendChild(li);
  });
}

export { renderPremadeSearchResults, renderCurrentCast };
