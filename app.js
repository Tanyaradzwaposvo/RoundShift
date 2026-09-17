const seed = {
  agencies: [
    { id: "sunrise", name: "Sunrise Family Care" },
    { id: "harborview", name: "Harborview Home Services" }
  ],
  clients: [
    { id: 1, agencyId: "sunrise", type: "Senior Living", name: "Willow Creek Senior Living", rate: 29, renewal: "2026-10-08", address: "3100 Campbell Rd, Dallas, TX" },
    { id: 2, agencyId: "sunrise", type: "Individual", name: "Margaret Ellis", rate: 26, renewal: "2027-02-14", address: "15210 Preston Rd, Dallas, TX" },
    { id: 3, agencyId: "sunrise", type: "Hospital", name: "North Dallas Community Hospital", rate: 68, renewal: "2026-09-29", address: "7700 Main St, Frisco, TX" },
    { id: 4, agencyId: "harborview", type: "Hospice", name: "Lakewood Hospice Center", rate: 44, renewal: "2026-11-20", address: "6400 Gaston Ave, Dallas, TX" },
    { id: 5, agencyId: "harborview", type: "Pharmacy", name: "Preston Community Pharmacy", rate: 62, renewal: "2027-01-12", address: "2601 Preston Rd, Plano, TX" },
    { id: 6, agencyId: "harborview", type: "Clinic", name: "Trinity Family Clinic", rate: 34, renewal: "2027-03-05", address: "1735 Market St, Dallas, TX" }
  ],
  contractors: [
    { id: 1, name: "Maya Thompson", email: "maya@example.com", roles: ["Registered Nurse"], certs: ["RN License", "BLS"], experience: "6 years", background: "Clear", agreement: ["sunrise", "harborview"] },
    { id: 2, name: "Jordan Williams", email: "jordan@example.com", roles: ["Companion", "Caregiver"], certs: [], experience: "Companionship specialist", background: "Not on file", agreement: ["sunrise"] },
    { id: 3, name: "Chinelo Okafor", email: "chinelo@example.com", roles: ["CNA"], certs: ["CNA", "CPR"], experience: "4 years", background: "Clear", agreement: ["sunrise", "harborview"] },
    { id: 4, name: "Elena Garcia", email: "elena@example.com", roles: ["HHA"], certs: ["HHA"], experience: "2 years", background: "Pending", agreement: ["harborview"] },
    { id: 5, name: "Noah Patel", email: "noah@example.com", roles: ["Pharmacist"], certs: ["Pharmacist License"], experience: "8 years", background: "Clear", agreement: ["harborview"] },
    { id: 6, name: "Avery Johnson", email: "avery@example.com", roles: ["Medical Assistant"], certs: ["BLS"], experience: "3 years", background: "Clear", agreement: ["harborview"] }
  ],
  shifts: [
    { id: 101, agencyId: "sunrise", clientId: 1, role: "CNA", date: "2026-09-18", start: "07:00", end: "15:00", payRate: 19, billRate: 29, cert: "CNA", address: "3100 Campbell Rd, Dallas, TX", status: "open", contractorId: null, urgent: true },
    { id: 102, agencyId: "sunrise", clientId: 2, role: "Companion", date: "2026-09-18", start: "17:00", end: "21:00", payRate: 18, billRate: 26, cert: "None", address: "15210 Preston Rd, Dallas, TX", status: "claimed", contractorId: 2 },
    { id: 103, agencyId: "sunrise", clientId: 3, role: "Registered Nurse", date: "2026-09-19", start: "22:00", end: "06:00", payRate: 48, billRate: 68, cert: "RN License", address: "7700 Main St, Frisco, TX", status: "open", contractorId: null },
    { id: 104, agencyId: "sunrise", clientId: 1, role: "Caregiver", date: "2026-09-16", start: "09:00", end: "13:00", payRate: 18, billRate: 29, cert: "None", address: "3100 Campbell Rd, Dallas, TX", status: "completed", contractorId: 2 },
    { id: 105, agencyId: "harborview", clientId: 4, role: "HHA", date: "2026-09-18", start: "12:00", end: "20:00", payRate: 29, billRate: 44, cert: "HHA", address: "6400 Gaston Ave, Dallas, TX", status: "open", contractorId: null },
    { id: 106, agencyId: "harborview", clientId: 5, role: "Pharmacist", date: "2026-09-20", start: "10:00", end: "18:00", payRate: 47, billRate: 62, cert: "Pharmacist License", address: "2601 Preston Rd, Plano, TX", status: "open", contractorId: null },
    { id: 107, agencyId: "harborview", clientId: 6, role: "Medical Assistant", date: "2026-09-21", start: "08:00", end: "16:00", payRate: 23, billRate: 34, cert: "BLS", address: "1735 Market St, Dallas, TX", status: "open", contractorId: null }
  ],
  drops: [
    { contractorId: 2, agencyId: "sunrise", shiftId: 80, date: "2026-09-03" },
    { contractorId: 2, agencyId: "sunrise", shiftId: 81, date: "2026-09-05" },
    { contractorId: 2, agencyId: "sunrise", shiftId: 82, date: "2026-09-07" },
    { contractorId: 2, agencyId: "sunrise", shiftId: 83, date: "2026-09-10" },
    { contractorId: 2, agencyId: "sunrise", shiftId: 84, date: "2026-09-14" }
  ]
};

const stored = localStorage.getItem("roundshift-healthcare-demo-v2");
const state = stored ? JSON.parse(stored) : structuredClone(seed);
state.mode = "admin";
state.agencyId = state.agencyId || "sunrise";
state.contractorId = 1;
state.view = "dashboard";
state.shiftFilter = "all";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const agency = (id) => state.agencies.find((item) => item.id === id);
const client = (id) => state.clients.find((item) => item.id === id);
const contractor = (id) => state.contractors.find((item) => item.id === id);
const save = () => localStorage.setItem("roundshift-healthcare-demo-v2", JSON.stringify({
  agencies: state.agencies, clients: state.clients, contractors: state.contractors,
  shifts: state.shifts, drops: state.drops, agencyId: state.agencyId
}));

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}

function formatTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  return new Date(2000, 0, 1, hour, minute).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function timeColor(time) {
  const hour = Number(time.split(":")[0]);
  if (hour < 9) return "#d7a344";
  if (hour < 15) return "#3a9b8c";
  if (hour < 20) return "#c66b50";
  return "#35496c";
}

function initials(name) { return name.split(" ").map((part) => part[0]).join("").slice(0, 2); }
function dropCount(contractorId, agencyId) { return state.drops.filter((d) => d.contractorId === contractorId && d.agencyId === agencyId).length; }
function completedCount(contractorId, agencyId) { return state.shifts.filter((s) => s.contractorId === contractorId && s.agencyId === agencyId && s.status === "completed").length; }
function isEligible(shift, professional) {
  const roleMatch = (professional.roles || []).includes(shift.role);
  const credentialMatch = shift.cert === "None" || professional.certs.includes(shift.cert);
  return roleMatch && credentialMatch;
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => element.classList.remove("show"), 2600);
}

function shiftCard(shift, contractorView = false) {
  const clientData = client(shift.clientId);
  const agencyData = agency(shift.agencyId);
  const roleBadge = `<span class="badge neutral">${shift.role || "Care professional"}</span>`;
  const certBadge = shift.cert !== "None" ? `<span class="badge cert">Requires ${shift.cert}</span>` : "";
  const urgentBadge = shift.urgent && shift.status === "open" ? `<span class="badge urgent">Urgent</span>` : "";
  const agencyBadge = contractorView ? `<span class="badge agency">${agencyData.name}</span>` : "";
  const rate = contractorView ? `$${shift.payRate.toFixed(2)}/hr` : `$${shift.payRate.toFixed(2)} pay`;
  const margin = contractorView ? "Contractor rate" : `$${(shift.billRate - shift.payRate).toFixed(2)}/hr margin`;
  let action = "";
  if (contractorView && shift.status === "open") {
    action = isEligible(shift, contractor(state.contractorId))
      ? `<button class="button primary small" data-claim="${shift.id}">Claim shift</button>`
      : `<button class="button secondary small" disabled>Role or credential required</button>`;
  }
  if (contractorView && shift.status === "claimed" && shift.contractorId === state.contractorId) action = `<button class="button danger small" data-drop="${shift.id}">Drop shift</button>`;

  return `<article class="shift-card">
    <div class="time-strip" style="--time-color:${timeColor(shift.start)}"></div>
    <div class="shift-main">
      <div class="shift-topline">
        <h3>${clientData.name}</h3>
        <span class="status ${shift.status}">${shift.status}</span>${roleBadge}${certBadge}${urgentBadge}${agencyBadge}
      </div>
      <div class="shift-meta">
        <span>◷ ${formatDate(shift.date)} · ${formatTime(shift.start)}–${formatTime(shift.end)}</span>
        <span>⌖ ${shift.address}</span>
        <span>${clientData.type}</span>
      </div>
      ${action ? `<div class="shift-actions">${action}</div>` : ""}
    </div>
    <div class="shift-rate"><strong>${rate}</strong><small>${margin}</small></div>
  </article>`;
}

function renderDashboard() {
  const shifts = state.shifts.filter((s) => s.agencyId === state.agencyId);
  const open = shifts.filter((s) => s.status === "open");
  const claimed = shifts.filter((s) => s.status === "claimed");
  const revenue = shifts.filter((s) => s.status === "completed").reduce((sum, s) => sum + (s.billRate - s.payRate) * 4, 0);
  const flagged = state.contractors.filter((c) => dropCount(c.id, state.agencyId) >= 5);
  const renewals = state.clients.filter((c) => c.agencyId === state.agencyId).sort((a, b) => a.renewal.localeCompare(b.renewal)).slice(0, 3);

  $("#dashboard-view").innerHTML = `
    <div class="view-header"><div><p class="eyebrow">TODAY AT A GLANCE</p><h2>Operations overview</h2><p>Coverage, contractors, and upcoming contract renewals.</p></div><button class="button primary" data-post-shift>＋ Post a shift</button></div>
    ${flagged.length ? `<div class="alert"><div><strong>Reliability review needed</strong>${flagged.map((c) => c.name).join(", ")} reached 5 drops against this agency's shifts in the rolling demo window.</div><span class="badge flag">Agency-only</span></div>` : ""}
    <div class="metric-grid">
      <div class="metric-card"><span class="metric-label">Open shifts</span><strong>${open.length}</strong><span class="trend">Ready to claim</span></div>
      <div class="metric-card"><span class="metric-label">Claimed shifts</span><strong>${claimed.length}</strong><span class="trend">Coverage confirmed</span></div>
      <div class="metric-card"><span class="metric-label">Active worksites</span><strong>${state.clients.filter((c) => c.agencyId === state.agencyId).length}</strong><span class="trend">Healthcare + private</span></div>
      <div class="metric-card"><span class="metric-label">Demo margin</span><strong>$${revenue}</strong><span class="trend">Completed shifts</span></div>
    </div>
    <div class="dashboard-grid">
      <div class="panel"><div class="panel-header"><h3>Upcoming shifts</h3><button class="text-link" data-go="shifts">View board →</button></div><div class="shift-list">${shifts.filter((s) => s.status !== "completed").slice(0, 3).map((s) => shiftCard(s)).join("") || '<div class="empty-state">No upcoming shifts</div>'}</div></div>
      <div class="panel"><div class="panel-header"><h3>Contract renewals</h3><button class="text-link" data-go="clients">View worksites →</button></div><div class="renewal-list">${renewals.map((c) => `<div class="list-row"><div><strong>${c.name}</strong><small>${c.type} · $${c.rate}/hr</small></div><span class="mono">${formatDate(c.renewal)}</span></div>`).join("")}</div></div>
    </div>`;
}

function renderShifts() {
  const all = state.shifts.filter((s) => s.agencyId === state.agencyId);
  const shifts = state.shiftFilter === "all" ? all : all.filter((s) => s.status === state.shiftFilter);
  $("#shifts-view").innerHTML = `
    <div class="view-header"><div><p class="eyebrow">COVERAGE PIPELINE</p><h2>Shift board</h2><p>Manage this agency's open, claimed, and completed shifts.</p></div><button class="button primary" data-post-shift>＋ Post a shift</button></div>
    <div class="toolbar"><div class="filter-group">${["all", "open", "claimed", "completed"].map((f) => `<button class="filter-button ${state.shiftFilter === f ? "active" : ""}" data-filter="${f}">${f[0].toUpperCase() + f.slice(1)} · ${f === "all" ? all.length : all.filter((s) => s.status === f).length}</button>`).join("")}</div></div>
    <div class="shift-list">${shifts.map((s) => shiftCard(s)).join("") || '<div class="empty-state"><strong>No shifts here</strong>Try another filter or post a new shift.</div>'}</div>`;
}

function renderContractors() {
  const ids = new Set(state.shifts.filter((s) => s.agencyId === state.agencyId && s.contractorId).map((s) => s.contractorId));
  state.contractors.forEach((c) => { if (c.agreement.includes(state.agencyId)) ids.add(c.id); });
  const rows = state.contractors.filter((c) => ids.has(c.id));
  $("#contractors-view").innerHTML = `
    <div class="view-header"><div><p class="eyebrow">AGENCY-SCOPED ROSTER</p><h2>Healthcare professionals</h2><p>Licensed and nonclinical professionals with a relationship to this agency.</p></div></div>
    <div class="data-table-wrap"><table class="data-table"><thead><tr><th>Professional</th><th>Roles</th><th>Credentials</th><th>Experience</th><th>Background</th><th>Agreement</th><th>Completed</th><th>Reliability</th></tr></thead><tbody>
    ${rows.map((c) => { const drops = dropCount(c.id, state.agencyId); return `<tr><td><div class="person"><span class="mini-avatar">${initials(c.name)}</span><div><strong>${c.name}</strong><small>${c.email}</small></div></div></td><td>${(c.roles || ["Care professional"]).map((role) => `<span class="badge neutral">${role}</span>`).join(" ")}</td><td>${c.certs.length ? c.certs.map((cert) => `<span class="badge cert">${cert}</span>`).join(" ") : '<span class="badge neutral">No credential required</span>'}</td><td>${c.experience || "—"}</td><td>${c.background}</td><td>${c.agreement.includes(state.agencyId) ? "Signed" : "Not signed"}</td><td class="mono">${completedCount(c.id, state.agencyId)}</td><td>${drops >= 5 ? `<span class="badge flag">Review · ${drops} drops</span>` : `<span class="badge neutral">Good standing</span>`}</td></tr>`; }).join("")}
    </tbody></table></div>`;
}

function renderClients() {
  const clients = state.clients.filter((c) => c.agencyId === state.agencyId);
  $("#clients-view").innerHTML = `
    <div class="view-header"><div><p class="eyebrow">ACCOUNTS & AGREEMENTS</p><h2>Worksites & contracts</h2><p>Hospital, hospice, pharmacy, clinic, senior-care, and private-client agreements.</p></div><button class="button secondary">＋ Add worksite</button></div>
    <div class="data-table-wrap"><table class="data-table"><thead><tr><th>Worksite or client</th><th>Type</th><th>Contract rate</th><th>Renewal date</th><th>Coverage address</th><th>Status</th></tr></thead><tbody>
    ${clients.map((c) => { const days = Math.ceil((new Date(c.renewal) - new Date("2026-09-17")) / 86400000); return `<tr><td><strong>${c.name}</strong></td><td><span class="badge neutral">${c.type}</span></td><td class="mono">$${c.rate.toFixed(2)}/hr</td><td class="mono">${formatDate(c.renewal)}</td><td>${c.address}</td><td>${days <= 30 ? `<span class="badge flag">Renews in ${days} days</span>` : '<span class="badge neutral">Active</span>'}</td></tr>`; }).join("")}
    </tbody></table></div>`;
}

function renderOpenFeed() {
  const open = state.shifts.filter((s) => s.status === "open");
  const me = contractor(state.contractorId);
  $("#open-feed-view").innerHTML = `
    <div class="view-header"><div><p class="eyebrow">ACROSS ALL AGENCIES</p><h2>Open shifts near you</h2><p>Choose work that fits your schedule. No recurring availability required.</p></div></div>
    <div class="feed-layout"><div class="shift-list">${open.map((s) => shiftCard(s, true)).join("") || '<div class="empty-state"><strong>No open shifts</strong>Check back soon for new opportunities.</div>'}</div>
    <aside class="feed-sidebar profile-card"><div class="profile-hero"><div class="avatar">${initials(me.name)}</div><div><h3>${me.name}</h3><p>Independent healthcare professional</p></div></div><div class="profile-stat"><span>Roles</span><strong>${(me.roles || []).join(", ") || "Care professional"}</strong></div><div class="profile-stat"><span>Credentials</span><strong>${me.certs.join(", ") || "None required"}</strong></div><div class="profile-stat"><span>Completed shifts</span><strong>${state.shifts.filter((s) => s.contractorId === me.id && s.status === "completed").length}</strong></div><div class="profile-stat"><span>Agencies served</span><strong>${me.agreement.length}</strong></div></aside></div>`;
}

function renderMyShifts() {
  const shifts = state.shifts.filter((s) => s.contractorId === state.contractorId && s.status === "claimed");
  $("#my-shifts-view").innerHTML = `<div class="view-header"><div><p class="eyebrow">YOUR SCHEDULE</p><h2>My claimed shifts</h2><p>Addresses and pay rates are visible here. Client bill rates are never shown.</p></div></div><div class="shift-list">${shifts.map((s) => shiftCard(s, true)).join("") || '<div class="empty-state"><strong>Your schedule is clear</strong>Browse open shifts when you are ready.</div>'}</div>`;
}

function renderProfile() {
  const me = contractor(state.contractorId);
  $("#profile-view").innerHTML = `<div class="view-header"><div><p class="eyebrow">SHARED PLATFORM PROFILE</p><h2>Professional profile</h2><p>One profile with role-specific credentials and a separate agreement for each agency.</p></div></div><div class="panel" style="max-width:760px"><div class="profile-hero"><div class="avatar">${initials(me.name)}</div><div><h3>${me.name}</h3><p>${me.email}</p></div></div><div class="profile-stat"><span>Professional roles</span><strong>${(me.roles || []).join(", ") || "Care professional"}</strong></div><div class="profile-stat"><span>Credentials</span><strong>${me.certs.join(", ") || "No credentials required"}</strong></div><div class="profile-stat"><span>Experience</span><strong>${me.experience || "Not provided"}</strong></div><div class="profile-stat"><span>Background check</span><strong>${me.background}</strong></div><div class="profile-stat"><span>Agency agreements</span><strong>${me.agreement.map((id) => agency(id).name).join(", ")}</strong></div></div>`;
}

function render() {
  renderDashboard(); renderShifts(); renderContractors(); renderClients(); renderOpenFeed(); renderMyShifts(); renderProfile();
  $$(".view").forEach((view) => view.classList.add("hidden"));
  $(`#${state.view}-view`).classList.remove("hidden");
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === state.view));
  const titles = { dashboard: "Good evening, Amanda", shifts: "Shift operations", contractors: "Professional roster", clients: "Worksite accounts", "open-feed": "Find your next shift", "my-shifts": "Your schedule", profile: "Your profile" };
  $("#page-title").textContent = titles[state.view];
  bindDynamicEvents();
}

function switchMode(mode) {
  state.mode = mode;
  state.view = mode === "admin" ? "dashboard" : "open-feed";
  $$(".mode-button").forEach((button) => button.classList.toggle("active", button.dataset.mode === mode));
  $("#admin-nav").classList.toggle("hidden", mode !== "admin");
  $("#contractor-nav").classList.toggle("hidden", mode !== "contractor");
  $("#agency-picker-wrap").classList.toggle("hidden", mode !== "admin");
  $("#workspace-label").textContent = mode === "admin" ? "AGENCY WORKSPACE" : "CONTRACTOR MARKETPLACE";
  render();
}

function bindDynamicEvents() {
  $$('[data-post-shift]').forEach((button) => button.onclick = openShiftModal);
  $$('[data-go]').forEach((button) => button.onclick = () => { state.view = button.dataset.go; render(); });
  $$('[data-filter]').forEach((button) => button.onclick = () => { state.shiftFilter = button.dataset.filter; render(); });
  $$('[data-claim]').forEach((button) => button.onclick = () => claimShift(Number(button.dataset.claim)));
  $$('[data-drop]').forEach((button) => button.onclick = () => dropShift(Number(button.dataset.drop)));
}

function claimShift(id) {
  const shift = state.shifts.find((s) => s.id === id);
  if (!shift || shift.status !== "open" || !isEligible(shift, contractor(state.contractorId))) return;
  shift.status = "claimed";
  shift.contractorId = state.contractorId;
  shift.urgent = false;
  save(); render(); toast(`Shift at ${client(shift.clientId).name} claimed`);
}

function dropShift(id) {
  const shift = state.shifts.find((s) => s.id === id);
  if (!shift || shift.contractorId !== state.contractorId) return;
  state.drops.push({ contractorId: state.contractorId, agencyId: shift.agencyId, shiftId: shift.id, date: new Date().toISOString().slice(0, 10) });
  shift.status = "open";
  shift.contractorId = null;
  shift.urgent = true;
  save(); render(); toast("Shift returned to the open feed; agency notified");
}

function refreshClientOptions() {
  let type = $("#client-type").value;
  let options = state.clients.filter((c) => c.agencyId === state.agencyId && c.type === type);
  if (!options.length) {
    const firstWorksite = state.clients.find((c) => c.agencyId === state.agencyId);
    if (firstWorksite) {
      type = firstWorksite.type;
      $("#client-type").value = type;
      options = state.clients.filter((c) => c.agencyId === state.agencyId && c.type === type);
    }
  }
  $("#client-name").innerHTML = options.map((c) => `<option value="${c.id}">${c.name}</option>`).join("");
}

function openShiftModal() {
  refreshClientOptions();
  const dateInput = $('#shift-form input[name="date"]');
  if (!dateInput.value) dateInput.value = "2026-09-21";
  $("#shift-dialog").showModal();
}

function updateMargin() {
  const margin = Number($("#bill-rate").value) - Number($("#pay-rate").value);
  $("#margin-value").textContent = `$${margin.toFixed(2)}/hr`;
}

$("#agency-picker").innerHTML = state.agencies.map((a) => `<option value="${a.id}">${a.name}</option>`).join("");
$("#agency-picker").value = state.agencyId;
$("#agency-picker").addEventListener("change", (event) => { state.agencyId = event.target.value; save(); render(); });
$$('.mode-button').forEach((button) => button.addEventListener("click", () => switchMode(button.dataset.mode)));
$$('.nav-item').forEach((button) => button.addEventListener("click", () => { state.view = button.dataset.view; render(); $(".sidebar").classList.remove("open"); }));
$("#mobile-menu").addEventListener("click", () => $(".sidebar").classList.toggle("open"));
$$('[data-close-modal]').forEach((button) => button.addEventListener("click", () => $("#shift-dialog").close()));
$("#client-type").addEventListener("change", refreshClientOptions);
$("#pay-rate").addEventListener("input", updateMargin);
$("#bill-rate").addEventListener("input", updateMargin);

$("#shift-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  state.shifts.push({
    id: Date.now(), agencyId: state.agencyId, clientId: Number(data.get("clientName")),
    date: data.get("date"), start: data.get("start"), end: data.get("end"),
    payRate: Number(data.get("payRate")), billRate: Number(data.get("billRate")),
    role: data.get("role"), cert: data.get("cert"), address: data.get("address"), notes: data.get("notes"),
    status: "open", contractorId: null, urgent: false
  });
  save(); $("#shift-dialog").close(); state.view = "shifts"; render(); toast("Open shift posted successfully");
});

render();
