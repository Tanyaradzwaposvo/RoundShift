const seed = {
  agencies: [
    { id: "sunrise", name: "Sunrise Family Care" },
    { id: "harborview", name: "Harborview Home Services" }
  ],
  clients: [
    { id: 1, agencyId: "sunrise", type: "Senior Living", name: "Willow Creek Senior Living", rate: 29, renewal: "2026-10-08", address: "3100 Campbell Rd, Dallas, TX", lat: 32.9756, lng: -96.7489 },
    { id: 2, agencyId: "sunrise", type: "Individual", name: "Margaret Ellis", rate: 26, renewal: "2027-02-14", address: "15210 Preston Rd, Dallas, TX", lat: 32.9578, lng: -96.8047 },
    { id: 3, agencyId: "sunrise", type: "Hospital", name: "North Dallas Community Hospital", rate: 68, renewal: "2026-09-29", address: "7700 Main St, Frisco, TX", lat: 33.1507, lng: -96.8236 },
    { id: 4, agencyId: "harborview", type: "Hospice", name: "Lakewood Hospice Center", rate: 44, renewal: "2026-11-20", address: "6400 Gaston Ave, Dallas, TX", lat: 32.8149, lng: -96.7527 },
    { id: 5, agencyId: "harborview", type: "Pharmacy", name: "Preston Community Pharmacy", rate: 62, renewal: "2027-01-12", address: "2601 Preston Rd, Plano, TX", lat: 33.0316, lng: -96.7954 },
    { id: 6, agencyId: "harborview", type: "Clinic", name: "Trinity Family Clinic", rate: 34, renewal: "2027-03-05", address: "1735 Market St, Dallas, TX", lat: 32.7806, lng: -96.8071 }
  ],
  contractors: [
    { id: 1, name: "Maya Thompson", email: "maya@example.com", roles: ["Registered Nurse"], certs: ["RN License", "BLS"], experience: "6 years", background: "Clear", agreement: ["sunrise", "harborview"], location: { label: "Richardson, TX", lat: 32.9483, lng: -96.7299 } },
    { id: 2, name: "Jordan Williams", email: "jordan@example.com", roles: ["Companion", "Caregiver"], certs: [], experience: "Companionship specialist", background: "Not on file", agreement: ["sunrise"] },
    { id: 3, name: "Chinelo Okafor", email: "chinelo@example.com", roles: ["CNA"], certs: ["CNA", "CPR"], experience: "4 years", background: "Clear", agreement: ["sunrise", "harborview"] },
    { id: 4, name: "Elena Garcia", email: "elena@example.com", roles: ["HHA"], certs: ["HHA"], experience: "2 years", background: "Pending", agreement: ["harborview"] },
    { id: 5, name: "Noah Patel", email: "noah@example.com", roles: ["Pharmacist"], certs: ["Pharmacist License"], experience: "8 years", background: "Clear", agreement: ["harborview"] },
    { id: 6, name: "Avery Johnson", email: "avery@example.com", roles: ["Medical Assistant"], certs: ["BLS"], experience: "3 years", background: "Clear", agreement: ["harborview"] }
  ],
  shifts: [
    { id: 101, agencyId: "sunrise", clientId: 1, role: "CNA", date: "2026-09-18", start: "07:00", end: "15:00", scheduleType: "ongoing", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], payRate: 19, billRate: 29, cert: "CNA", address: "3100 Campbell Rd, Dallas, TX", status: "open", contractorId: null, urgent: true },
    { id: 102, agencyId: "sunrise", clientId: 2, role: "Companion", date: "2026-09-18", start: "17:00", end: "21:00", scheduleType: "ongoing", days: ["Mon", "Wed", "Fri"], payRate: 18, billRate: 26, cert: "None", address: "15210 Preston Rd, Dallas, TX", status: "claimed", contractorId: 2 },
    { id: 103, agencyId: "sunrise", clientId: 3, role: "Registered Nurse", date: "2026-09-19", start: "22:00", end: "06:00", scheduleType: "ongoing", days: ["Tue", "Thu", "Sat"], payRate: 48, billRate: 68, cert: "RN License", address: "7700 Main St, Frisco, TX", status: "open", contractorId: null },
    { id: 104, agencyId: "sunrise", clientId: 1, role: "Caregiver", date: "2026-09-16", start: "09:00", end: "13:00", scheduleType: "one-time", days: [], payRate: 18, billRate: 29, cert: "None", address: "3100 Campbell Rd, Dallas, TX", status: "completed", contractorId: 2 },
    { id: 105, agencyId: "harborview", clientId: 4, role: "HHA", date: "2026-09-18", start: "12:00", end: "20:00", scheduleType: "ongoing", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], payRate: 29, billRate: 44, cert: "HHA", address: "6400 Gaston Ave, Dallas, TX", status: "open", contractorId: null },
    { id: 106, agencyId: "harborview", clientId: 5, role: "Pharmacist", date: "2026-09-20", start: "10:00", end: "18:00", scheduleType: "ongoing", days: ["Mon", "Wed", "Fri"], payRate: 47, billRate: 62, cert: "Pharmacist License", address: "2601 Preston Rd, Plano, TX", status: "open", contractorId: null },
    { id: 107, agencyId: "harborview", clientId: 6, role: "Medical Assistant", date: "2026-09-21", start: "08:00", end: "16:00", scheduleType: "one-time", days: [], payRate: 23, billRate: 34, cert: "BLS", address: "1735 Market St, Dallas, TX", status: "open", contractorId: null }
  ],
  drops: [
    { contractorId: 2, agencyId: "sunrise", shiftId: 80, date: "2026-09-03" },
    { contractorId: 2, agencyId: "sunrise", shiftId: 81, date: "2026-09-05" },
    { contractorId: 2, agencyId: "sunrise", shiftId: 82, date: "2026-09-07" },
    { contractorId: 2, agencyId: "sunrise", shiftId: 83, date: "2026-09-10" },
    { contractorId: 2, agencyId: "sunrise", shiftId: 84, date: "2026-09-14" }
  ]
};

const STORAGE_KEY = "roundshift-scheduling-demo-v3";
const stored = localStorage.getItem(STORAGE_KEY);
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
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify({
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
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function shiftDays(shift) {
  if (shift.scheduleType === "ongoing") return shift.days || [];
  return [WEEKDAYS[new Date(`${shift.date}T12:00:00`).getDay()]];
}

function scheduleLabel(shift) {
  const hours = `${formatTime(shift.start)}–${formatTime(shift.end)}`;
  if (shift.scheduleType !== "ongoing") return `${formatDate(shift.date)} · ${hours}`;
  const days = shiftDays(shift);
  const pattern = days.length === 7 ? "7 days/week" : `${days.join(", ")} · ${days.length} days/week`;
  return `Ongoing · ${pattern} · ${hours}`;
}

function distanceMiles(shift, professional) {
  const worksite = client(shift.clientId);
  if (!professional?.location || !worksite?.lat || !worksite?.lng) return null;
  const toRadians = (degrees) => degrees * Math.PI / 180;
  const latDelta = toRadians(worksite.lat - professional.location.lat);
  const lngDelta = toRadians(worksite.lng - professional.location.lng);
  const a = Math.sin(latDelta / 2) ** 2 + Math.cos(toRadians(professional.location.lat)) * Math.cos(toRadians(worksite.lat)) * Math.sin(lngDelta / 2) ** 2;
  return 3958.8 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function appliesOnDate(shift, date) {
  if (shift.scheduleType !== "ongoing") return shift.date === date;
  if (shift.date > date) return false;
  return shiftDays(shift).includes(WEEKDAYS[new Date(`${date}T12:00:00`).getDay()]);
}

function claimLimitReason(shift, professionalId) {
  const claimed = state.shifts.filter((item) => item.status === "claimed" && item.contractorId === professionalId && item.id !== shift.id);
  if (shift.scheduleType !== "ongoing") {
    if (claimed.filter((item) => appliesOnDate(item, shift.date)).length >= 2) return "Two-shift daily limit reached";
    return "";
  }
  const overloadedDay = shiftDays(shift).find((day) => claimed.filter((item) => item.scheduleType === "ongoing" && shiftDays(item).includes(day)).length >= 2);
  return overloadedDay ? `Two-shift limit reached on ${overloadedDay}` : "";
}

function dropAllowance(professionalId) {
  const today = new Date().toISOString().slice(0, 10);
  const current = new Date(`${today}T12:00:00`);
  const weekStart = new Date(current);
  weekStart.setDate(current.getDate() - current.getDay());
  const weekStartText = weekStart.toISOString().slice(0, 10);
  const drops = state.drops.filter((item) => item.contractorId === professionalId);
  const todayCount = drops.filter((item) => item.date === today).length;
  const weekCount = drops.filter((item) => item.date >= weekStartText && item.date <= today).length;
  return { allowed: todayCount < 1 && weekCount < 3, todayCount, weekCount };
}

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
  const distance = contractorView ? distanceMiles(shift, contractor(state.contractorId)) : null;
  const distanceBadge = distance === null ? "" : `<div class="distance-badge"><strong>${distance.toFixed(1)} mi</strong><span>from you</span></div>`;
  const rate = contractorView ? `$${shift.payRate.toFixed(2)}/hr` : `$${shift.payRate.toFixed(2)} pay`;
  const margin = contractorView ? "Contractor rate" : `$${(shift.billRate - shift.payRate).toFixed(2)}/hr margin`;
  let action = "";
  if (contractorView && shift.status === "open") {
    const limitReason = claimLimitReason(shift, state.contractorId);
    action = isEligible(shift, contractor(state.contractorId)) && !limitReason
      ? `<button class="button primary small" data-claim="${shift.id}">Claim shift</button>`
      : `<button class="button secondary small" disabled>${limitReason || "Role or credential required"}</button>`;
  }
  if (contractorView && shift.status === "claimed" && shift.contractorId === state.contractorId) {
    const allowance = dropAllowance(state.contractorId);
    action = allowance.allowed
      ? `<button class="button danger small" data-drop="${shift.id}">Release shift</button>`
      : `<button class="button secondary small" disabled>Release limit reached</button>`;
  }
  if (!contractorView && ["open", "claimed"].includes(shift.status)) action = `<button class="button danger small" data-cancel-shift="${shift.id}">Cancel coverage</button>`;

  return `<article class="shift-card">
    <div class="time-strip" style="--time-color:${timeColor(shift.start)}"></div>
    <div class="shift-main">
      <div class="shift-topline">
        <h3>${clientData.name}</h3>
        <span class="status ${shift.status}">${shift.status}</span>${roleBadge}${certBadge}${urgentBadge}${agencyBadge}
      </div>
      <div class="shift-meta">
        <span>◷ ${scheduleLabel(shift)}</span>
        ${shift.scheduleType === "ongoing" ? `<span>Starts ${formatDate(shift.date)}</span>` : ""}
        <span>⌖ ${shift.address}</span>
        <span>${clientData.type}</span>
      </div>
      ${action ? `<div class="shift-actions">${action}</div>` : ""}
    </div>
    <div class="shift-rate">${distanceBadge}<strong>${rate}</strong><small>${margin}</small></div>
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
    <div class="view-header"><div><p class="eyebrow">AGENCY OPERATING NETWORK</p><h2>Healthcare coverage, coordinated</h2><p>Coordinate recurring and urgent coverage across every care setting while protecting continuity of care.</p></div><button class="button primary" data-post-shift>＋ Post coverage</button></div>
    ${flagged.length ? `<div class="alert"><div><strong>Release history review</strong>${flagged.map((c) => c.name).join(", ")} has prior releases with this agency. Current policy allows one release per day and three per week.</div><span class="badge flag">Agency-only</span></div>` : ""}
    <div class="metric-grid">
      <div class="metric-card"><span class="metric-label">Open coverage</span><strong>${open.length}</strong><span class="trend">Ready to claim</span></div>
      <div class="metric-card"><span class="metric-label">Claimed coverage</span><strong>${claimed.length}</strong><span class="trend">Commitments confirmed</span></div>
      <div class="metric-card"><span class="metric-label">Active worksites</span><strong>${state.clients.filter((c) => c.agencyId === state.agencyId).length}</strong><span class="trend">Healthcare + private</span></div>
      <div class="metric-card"><span class="metric-label">Demo margin</span><strong>$${revenue}</strong><span class="trend">Completed shifts</span></div>
    </div>
    <div class="dashboard-grid">
      <div class="panel"><div class="panel-header"><h3>Upcoming coverage</h3><button class="text-link" data-go="shifts">View board →</button></div><div class="shift-list">${shifts.filter((s) => ["open", "claimed"].includes(s.status)).slice(0, 3).map((s) => shiftCard(s)).join("") || '<div class="empty-state">No upcoming coverage</div>'}</div></div>
      <div class="panel"><div class="panel-header"><h3>Contract renewals</h3><button class="text-link" data-go="clients">View worksites →</button></div><div class="renewal-list">${renewals.map((c) => `<div class="list-row"><div><strong>${c.name}</strong><small>${c.type} · $${c.rate}/hr</small></div><span class="mono">${formatDate(c.renewal)}</span></div>`).join("")}</div></div>
    </div>`;
}

function renderShifts() {
  const all = state.shifts.filter((s) => s.agencyId === state.agencyId);
  const shifts = state.shiftFilter === "all" ? all : all.filter((s) => s.status === state.shiftFilter);
  $("#shifts-view").innerHTML = `
    <div class="view-header"><div><p class="eyebrow">COVERAGE PIPELINE</p><h2>Coverage board</h2><p>Coordinate one-time, recurring, and urgent commitments. Only the agency cancels services that are no longer needed.</p></div><button class="button primary" data-post-shift>＋ Post coverage</button></div>
    <div class="toolbar"><div class="filter-group">${["all", "open", "claimed", "completed", "cancelled"].map((f) => `<button class="filter-button ${state.shiftFilter === f ? "active" : ""}" data-filter="${f}">${f[0].toUpperCase() + f.slice(1)} · ${f === "all" ? all.length : all.filter((s) => s.status === f).length}</button>`).join("")}</div></div>
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
  const me = contractor(state.contractorId);
  const open = state.shifts.filter((s) => s.status === "open").sort((a, b) => (distanceMiles(a, me) ?? Infinity) - (distanceMiles(b, me) ?? Infinity));
  const allowance = dropAllowance(me.id);
  $("#open-feed-view").innerHTML = `
    <div class="view-header"><div><p class="eyebrow">DISTANCE-AWARE MATCHING</p><h2>Open coverage near you</h2><p>Compare qualified opportunities by distance before committing. You may hold up to two assignments per day.</p></div></div>
    <div class="feed-layout"><div class="shift-list">${open.map((s) => shiftCard(s, true)).join("") || '<div class="empty-state"><strong>No open shifts</strong>Check back soon for new opportunities.</div>'}</div>
    <aside class="feed-sidebar profile-card"><div class="profile-hero"><div class="avatar">${initials(me.name)}</div><div><h3>${me.name}</h3><p>Independent healthcare professional</p></div></div><div class="profile-stat"><span>Distance from</span><strong>${me.location?.label || "Location needed"}</strong></div><div class="profile-stat"><span>Daily assignment limit</span><strong>2 shifts</strong></div><div class="profile-stat"><span>Releases today</span><strong>${allowance.todayCount} / 1</strong></div><div class="profile-stat"><span>Releases this week</span><strong>${allowance.weekCount} / 3</strong></div><div class="policy-note">Agencies cancel coverage when services are no longer needed. Contractor releases are limited to protect continuity of care.</div></aside></div>`;
}

function renderMyShifts() {
  const shifts = state.shifts.filter((s) => s.contractorId === state.contractorId && ["claimed", "cancelled"].includes(s.status));
  const allowance = dropAllowance(state.contractorId);
  $("#my-shifts-view").innerHTML = `<div class="view-header"><div><p class="eyebrow">CONTROLLED COMMITMENTS</p><h2>My coverage commitments</h2><p>Up to two assignments per day. Releases are limited to one per day and three per week to protect continuity.</p></div><div class="limit-summary"><strong>${allowance.todayCount}/1</strong><span>released today</span><strong>${allowance.weekCount}/3</strong><span>this week</span></div></div><div class="shift-list">${shifts.map((s) => shiftCard(s, true)).join("") || '<div class="empty-state"><strong>Your schedule is clear</strong>Browse open coverage when you are ready.</div>'}</div>`;
}

function renderProfile() {
  const me = contractor(state.contractorId);
  $("#profile-view").innerHTML = `<div class="view-header"><div><p class="eyebrow">SHARED PLATFORM PROFILE</p><h2>Professional profile</h2><p>One profile with role-specific credentials and a separate agreement for each agency.</p></div></div><div class="panel" style="max-width:760px"><div class="profile-hero"><div class="avatar">${initials(me.name)}</div><div><h3>${me.name}</h3><p>${me.email}</p></div></div><div class="profile-stat"><span>Home base for distance</span><strong>${me.location?.label || "Not provided"}</strong></div><div class="profile-stat"><span>Professional roles</span><strong>${(me.roles || []).join(", ") || "Care professional"}</strong></div><div class="profile-stat"><span>Credentials</span><strong>${me.certs.join(", ") || "No credentials required"}</strong></div><div class="profile-stat"><span>Experience</span><strong>${me.experience || "Not provided"}</strong></div><div class="profile-stat"><span>Background check</span><strong>${me.background}</strong></div><div class="profile-stat"><span>Agency agreements</span><strong>${me.agreement.map((id) => agency(id).name).join(", ")}</strong></div></div>`;
}

function render() {
  renderDashboard(); renderShifts(); renderContractors(); renderClients(); renderOpenFeed(); renderMyShifts(); renderProfile();
  $$(".view").forEach((view) => view.classList.add("hidden"));
  $(`#${state.view}-view`).classList.remove("hidden");
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === state.view));
  const titles = { dashboard: "Agency coverage network", shifts: "Coverage operations", contractors: "Professional roster", clients: "Worksite accounts", "open-feed": "Find nearby coverage", "my-shifts": "Your commitments", profile: "Your profile" };
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
  $("#workspace-label").textContent = mode === "admin" ? "AGENCY OPERATING NETWORK" : "PROFESSIONAL COVERAGE NETWORK";
  render();
}

function bindDynamicEvents() {
  $$('[data-post-shift]').forEach((button) => button.onclick = openShiftModal);
  $$('[data-go]').forEach((button) => button.onclick = () => { state.view = button.dataset.go; render(); });
  $$('[data-filter]').forEach((button) => button.onclick = () => { state.shiftFilter = button.dataset.filter; render(); });
  $$('[data-claim]').forEach((button) => button.onclick = () => claimShift(Number(button.dataset.claim)));
  $$('[data-drop]').forEach((button) => button.onclick = () => dropShift(Number(button.dataset.drop)));
  $$('[data-cancel-shift]').forEach((button) => button.onclick = () => cancelShift(Number(button.dataset.cancelShift)));
}

function claimShift(id) {
  const shift = state.shifts.find((s) => s.id === id);
  const limitReason = shift ? claimLimitReason(shift, state.contractorId) : "";
  if (!shift || shift.status !== "open" || !isEligible(shift, contractor(state.contractorId)) || limitReason) {
    if (limitReason) toast(limitReason);
    return;
  }
  shift.status = "claimed";
  shift.contractorId = state.contractorId;
  shift.urgent = false;
  save(); render(); toast(`Shift at ${client(shift.clientId).name} claimed`);
}

function dropShift(id) {
  const shift = state.shifts.find((s) => s.id === id);
  if (!shift || shift.contractorId !== state.contractorId) return;
  const allowance = dropAllowance(state.contractorId);
  if (!allowance.allowed) {
    toast(allowance.todayCount >= 1 ? "Daily release limit reached" : "Weekly release limit reached");
    return;
  }
  state.drops.push({ contractorId: state.contractorId, agencyId: shift.agencyId, shiftId: shift.id, date: new Date().toISOString().slice(0, 10) });
  shift.status = "open";
  shift.contractorId = null;
  shift.urgent = true;
  save(); render(); toast("Assignment released; agency notified");
}

function cancelShift(id) {
  const shift = state.shifts.find((item) => item.id === id && item.agencyId === state.agencyId);
  if (!shift || !["open", "claimed"].includes(shift.status)) return;
  shift.status = "cancelled";
  shift.agencyCancelledAt = new Date().toISOString();
  save(); render(); toast("Coverage cancelled by agency");
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
  updateScheduleFields();
  $("#shift-dialog").showModal();
}

function updateScheduleFields() {
  const scheduleType = $('#shift-form select[name="scheduleType"]').value;
  $("#weekday-fields").classList.toggle("hidden", scheduleType !== "ongoing-custom");
  $("#date-label-text").textContent = scheduleType === "one-time" ? "Shift date" : "Service start date";
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
$('#shift-form select[name="scheduleType"]').addEventListener("change", updateScheduleFields);

$("#shift-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const selectedSchedule = data.get("scheduleType");
  const days = selectedSchedule === "ongoing-daily" ? WEEKDAYS : data.getAll("days");
  if (selectedSchedule === "ongoing-custom" && !days.length) {
    toast("Choose at least one service day");
    return;
  }
  state.shifts.push({
    id: Date.now(), agencyId: state.agencyId, clientId: Number(data.get("clientName")),
    date: data.get("date"), start: data.get("start"), end: data.get("end"),
    scheduleType: selectedSchedule === "one-time" ? "one-time" : "ongoing", days,
    payRate: Number(data.get("payRate")), billRate: Number(data.get("billRate")),
    role: data.get("role"), cert: data.get("cert"), address: data.get("address"), notes: data.get("notes"),
    status: "open", contractorId: null, urgent: false
  });
  save(); $("#shift-dialog").close(); state.view = "shifts"; render(); toast("Coverage posted successfully");
});

render();
