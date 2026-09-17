# RoundShift

RoundShift helps healthcare staffing agencies coordinate recurring and urgent coverage across multiple care settings—while protecting continuity of care through distance-aware matching and controlled shift commitments.

It is positioned as an **agency operating and coverage network**, not simply another shift marketplace. Agencies coordinate client coverage, professional relationships, assignment rules, and contract visibility across hospitals, hospice, pharmacies, clinics, senior care, and home care from one workspace.

## Product focus

- **Coordinate coverage:** Manage one-time, recurring, and urgent staffing needs across every agency client.
- **Protect continuity:** Limit over-commitment and repeated releases after a professional accepts an assignment.
- **Match intelligently:** Surface qualified professionals and show travel distance before they commit.
- **Keep agencies in control:** Preserve agency-specific contracts, margins, cancellations, and professional relationships.

## Live prototype features

- Agency dashboard with tenant switching
- Coverage board with open, claimed, completed, and cancelled states
- One-time and ongoing coverage workflows, including seven-day schedules and selected weekdays
- Start-time and end-time display for every shift pattern
- Distance shown at a glance and open shifts sorted nearest-first for contractors
- Cross-agency healthcare-professional coverage network
- Hospital, hospice, pharmacy, clinic, senior-living, and private-client worksites
- Role-specific shifts for nurses, CNAs, HHAs, pharmacists, pharmacy technicians, medical assistants, caregivers, and companions
- Credential-aware eligibility checks before a professional can claim a shift
- Two-shift-per-day assignment limit
- Contractor release limits of one per day and three per week
- Agency-controlled cancellation when services are no longer needed
- Claim and controlled-release flows with automatic reposting
- Contractor roster with optional certifications and experience
- Worksite and individual-client contract tracking
- Responsive desktop and mobile layouts
- Browser persistence through `localStorage`

## Product principles

- RoundShift is an agency operating and coverage network; talent discovery is one capability within it.
- Agencies are isolated tenants.
- Professionals have one platform-wide profile and can browse shifts from multiple agencies.
- Bill rates and margins remain agency-only.
- Nonclinical roles may require no certification; clinical roles can require role-specific licenses and credentials.
- Reliability history is calculated per agency, never as a global contractor score.
- Agencies cancel coverage that is no longer needed; contractors release accepted work only within the platform limits.
- Distances are calculated from a professional's saved home base to each worksite.
- The prototype does not process payments, tax forms, or W-9 information.
- The MVP stores no patient health information.

## Run locally

No packages or build step are required.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Demo guide

1. Use the **Agency / Contractor** switch in the sidebar.
2. Switch between Sunrise Family Care and Harborview Home Services.
3. Post one-time coverage, a seven-day ongoing schedule, or an ongoing schedule with selected days.
4. Enter Contractor mode to compare nearby opportunities by distance.
5. Claim an eligible shift and review the two-shifts-per-day rule.
6. Open **My commitments** to see the one-per-day and three-per-week release policy.
7. Return to Agency mode to cancel coverage that is no longer needed.

## Technical approach

This first portfolio release is an interactive front-end prototype built with semantic HTML, modern CSS, and vanilla JavaScript. It deliberately has no production authentication, credential verification integration, or backend. Demo mutations persist only in the current browser.

### Planned production architecture

- TypeScript web application
- PostgreSQL database with tenant-aware row-level security
- Agency-admin and healthcare-professional authentication
- State-board license verification and expiration monitoring
- Server-side claim transactions to prevent double-booking
- Production geocoding, traffic-aware travel estimates, and contractor-controlled location privacy
- Notification service for urgent drops and contract renewals
- Automated testing and audit logging

## Compliance note

RoundShift is a product-design prototype, not legal advice or a credentialing system. Healthcare staffing, professional licensing, patient privacy, and worker-classification rules vary by jurisdiction. The business and legal structure should be reviewed by qualified counsel before real organizations or professionals are onboarded.

## Author

**Tanyaradzwa Amanda Posvo**  
MS Business Analytics & Artificial Intelligence, The University of Texas at Dallas
