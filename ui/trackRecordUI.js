// =========================================================
// TRACK RECORD UI
// Renders the Drag Race–style track record table.
// =========================================================

function renderTrackRecordUI(state) {
  const wrapper = document.querySelector("#track-record-table-wrapper");
  wrapper.innerHTML = "";

  const allContestants = [...state.currentCast, ...state.eliminated];

  if (allContestants.length === 0) {
    wrapper.textContent = "Track record will appear once the game starts.";
    return;
  }

  // Determine number of episodes
  const maxEpisodes = Math.max(
    0,
    ...allContestants.map((c) => (state.trackRecord[c.id] || []).length)
  );

  const table = document.createElement("table");
  table.className = "track-record-table";

  // ===== HEADER =====
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const nameHeader = document.createElement("th");
  nameHeader.textContent = "Contestant";
  headerRow.appendChild(nameHeader);

  for (let ep = 1; ep <= maxEpisodes; ep++) {
    const th = document.createElement("th");
    th.textContent = `Ep ${ep}`;
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // ===== BODY =====
  const tbody = document.createElement("tbody");

  allContestants.forEach((c) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = c.name;
    row.appendChild(nameCell);

    const results = state.trackRecord[c.id] || [];

    for (let ep = 0; ep < maxEpisodes; ep++) {
      const code = results[ep] || "";
      const cell = document.createElement("td");
      cell.textContent = code;

      // Color coding
      if (code === "WIN") cell.classList.add("tr-win");
      if (code === "HIGH") cell.classList.add("tr-high");
      if (code === "SAFE") cell.classList.add("tr-safe");
      if (code === "LOW") cell.classList.add("tr-low");
      if (code === "OUT") cell.classList.add("tr-out");

      row.appendChild(cell);
    }

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);
}

export { renderTrackRecordUI };
