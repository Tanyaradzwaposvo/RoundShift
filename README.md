# RoundShift

RoundShift is a responsive product prototype for senior-care staffing agencies and independent contractors. It replaces disconnected spreadsheets and phone calls with a shared shift marketplace while preserving tenant isolation and agency-specific contractor relationships.

## Live prototype features

- Agency dashboard with tenant switching
- Shift board with open, claimed, and completed states
- Post-a-shift workflow with live margin calculation
- Cross-agency contractor marketplace
- Claim and drop flows with automatic reposting
- Agency-scoped reliability flags after five drops
- Contractor roster with optional certifications and experience
- Facility and individual-client contract tracking
- Responsive desktop and mobile layouts
- Browser persistence through `localStorage`

## Product principles

- Agencies are isolated tenants.
- Contractors have one platform-wide profile and can browse shifts from multiple agencies.
- Bill rates and margins remain agency-only.
- Certification and experience are optional.
- Reliability history is calculated per agency, never as a global contractor score.
- The prototype does not process payments, tax forms, or W-9 information.

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

This first portfolio release is an interactive front-end prototype built with semantic HTML, modern CSS, and vanilla JavaScript. It deliberately has no production authentication or backend. Demo mutations persist only in the current browser.

### Planned production architecture

- TypeScript web application
- PostgreSQL database with tenant-aware row-level security
- Agency-admin and contractor authentication
- Server-side claim transactions to prevent double-booking
- Address geocoding and distance estimates
- Notification service for urgent drops and contract renewals
- Automated testing and audit logging

## Compliance note

RoundShift is a product-design prototype, not legal advice. Independent-contractor classification and senior-care staffing rules vary by jurisdiction. The business and legal structure should be reviewed by qualified counsel before real agencies or contractors are onboarded.

## Author

**Tanyaradzwa Amanda Posvo**  
MS Business Analytics & Artificial Intelligence, The University of Texas at Dallas

## License

This repository is available under the MIT License.
