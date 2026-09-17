# RoundShift

RoundShift is a responsive, multi-tenant healthcare staffing marketplace connecting agencies with qualified professionals across hospitals, hospice, pharmacies, clinics, senior care, and home care. It replaces disconnected spreadsheets and phone calls with a shared shift marketplace while preserving tenant isolation and agency-specific professional relationships.

## Live prototype features

- Agency dashboard with tenant switching
- Shift board with open, claimed, and completed states
- Post-a-shift workflow with live margin calculation
- Cross-agency healthcare-professional marketplace
- Hospital, hospice, pharmacy, clinic, senior-living, and private-client worksites
- Role-specific shifts for nurses, CNAs, HHAs, pharmacists, pharmacy technicians, medical assistants, caregivers, and companions
- Credential-aware eligibility checks before a professional can claim a shift
- Claim and drop flows with automatic reposting
- Agency-scoped reliability flags after five drops
- Contractor roster with optional certifications and experience
- Worksite and individual-client contract tracking
- Responsive desktop and mobile layouts
- Browser persistence through `localStorage`

## Product principles

- Agencies are isolated tenants.
- Professionals have one platform-wide profile and can browse shifts from multiple agencies.
- Bill rates and margins remain agency-only.
- Nonclinical roles may require no certification; clinical roles can require role-specific licenses and credentials.
- Reliability history is calculated per agency, never as a global contractor score.
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
3. Post a new shift and observe the live margin calculation.
4. Enter Contractor mode and claim an open shift.
5. Open **My shifts**, then drop it to see it return to the shared feed.
6. Review the agency contractor roster to see agency-scoped reliability.

## Technical approach

This first portfolio release is an interactive front-end prototype built with semantic HTML, modern CSS, and vanilla JavaScript. It deliberately has no production authentication, credential verification integration, or backend. Demo mutations persist only in the current browser.

### Planned production architecture

- TypeScript web application
- PostgreSQL database with tenant-aware row-level security
- Agency-admin and healthcare-professional authentication
- State-board license verification and expiration monitoring
- Server-side claim transactions to prevent double-booking
- Address geocoding and distance estimates
- Notification service for urgent drops and contract renewals
- Automated testing and audit logging

## Compliance note

RoundShift is a product-design prototype, not legal advice or a credentialing system. Healthcare staffing, professional licensing, patient privacy, and worker-classification rules vary by jurisdiction. The business and legal structure should be reviewed by qualified counsel before real organizations or professionals are onboarded.

## Author

**Tanyaradzwa Amanda Posvo**  
MS Business Analytics & Artificial Intelligence, The University of Texas at Dallas
