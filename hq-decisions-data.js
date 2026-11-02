async function loadHQDecisions() {
  const { data, error } = await supabaseClient
    .from("hq_decisions")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to load HQ decisions:", error);
    return;
  }

  // Update the existing list used by the page.
  decisions.length = 0;

  for (const item of data) {
    decisions.push({
      reference: item.reference,
      type: item.decision_type,
      subject: item.subject,
      summary: item.description,
      issuedBy: item.issued_by,
      date: item.published_at
    });
  }

  render();
}

loadHQDecisions();
