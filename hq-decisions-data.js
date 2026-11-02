
async function loadHQDecisions() {
  const records = document.getElementById("records");
  const count = document.getElementById("count");
  const search = document.getElementById("search");
  const filter = document.getElementById("filter");

  records.textContent = "Loading Headquarters decisions...";

  const { data, error } = await supabaseClient
    .from("hq_decisions_managed")
    .select("*")
    .eq("status", "Published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to load HQ decisions:", error);
    records.textContent = "Unable to load decisions.";
    return;
  }

  const decisions = data || [];

  function render() {
    const query = search.value.trim().toLowerCase();
    const type = filter.value;

    const visible = decisions.filter(item => {
      const content = [
        item.reference,
        item.subject,
        item.summary
      ].join(" ").toLowerCase();

      return content.includes(query) &&
        (type === "all" || type === item.decision_type);
    });

    count.textContent =
      `Showing ${visible.length} of ${decisions.length} decisions`;

    records.replaceChildren();

    for (const item of visible) {
      const card = document.createElement("article");
      card.className = "decision";

      const heading = document.createElement("h3");
      heading.textContent =
        `${item.reference} — ${item.subject}`;

      const typeLabel = document.createElement("p");
      typeLabel.textContent = item.decision_type;

      const summary = document.createElement("p");
      summary.textContent = item.summary || "";

      const details = document.createElement("small");
      details.textContent =
        `Issued by: ${item.issued_by || "Headquarters"} · ` +
        `Published: ${item.published_at || "N/A"}`;

      card.append(heading, typeLabel, summary, details);
      records.appendChild(card);
    }

    if (!visible.length) {
      records.textContent = "No published decisions found.";
    }
  }

  search.addEventListener("input", render);
  filter.addEventListener("change", render);

  render();
}

loadHQDecisions();
