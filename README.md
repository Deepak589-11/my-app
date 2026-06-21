 Go Business — Referral Dashboard

A secure, responsive referral management web application built for Go Business. Users can log in, track referrals, view earnings, manage partner activity, and share referral links — all through a clean, intuitive dashboard.

---
 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Authentication](#authentication)
7. [API Reference](#api-reference)
8. [Route Structure](#route-structure)
9. [Pages & Components](#pages--components)
10. [Pagination & Search](#pagination--search)
11. [Deployment](#deployment)
12. [License](#license)

---

## Project Overview

The Referral Dashboard is a web-based productivity tool that allows Go Business users to:

- Log in securely using their email and password
- View referral overview metrics and service summary details
- Search, sort, and paginate through their referrals
- Copy and share their unique referral link and code
- View detailed information about any individual referral

The application uses JWT-based authentication. The token is stored in a browser cookie and sent with every protected API request.

---

## Features

- **Secure Authentication** — Login via email and password; JWT token stored in a cookie named `jwt_token`
- **Protected Routes** — Unauthenticated users are automatically redirected to `/login`; authenticated users visiting `/login` are redirected to `/`
- **Referral Overview Metrics** — Displays all metrics returned from the API with their labels and values
- **Service Summary** — Shows Service, Your Referrals, Active Referrals, and Total Ref. Earnings
- **Referral Link & Code Sharing** — Read-only fields with one-click Copy buttons for both the referral link and code
- **Search Referrals** — Filter the referrals table by partner name or service name in real time via API call
- **Sort by Date** — Sort referrals as Newest First (default) or Oldest First via API call
- **Client-side Pagination** — Results are paginated at 10 rows per page with Previous, Next, and numbered page buttons
- **Referral Detail View** — Click any table row to navigate to a full detail page for that referral
- **404 Not Found Page** — Clean error page with a Back to Dashboard link; not wrapped in a protected route
- **Logout** — Clears the `jwt_token` cookie and redirects the user to `/login`

---

## Tech Stack

- **React** — UI library
- **React Router v6** — Client-side routing with `BrowserRouter` in `App.jsx`
- **js-cookie** — Reading and writing the JWT cookie (`Cookies.set`, `Cookies.get`)
- **JavaScript (ES6+)** — Application logic
- **CSS / Tailwind CSS** — Styling and responsive layout
- **Vercel** — Hosting and deployment

---

## Project Structure

```
go-business-referral-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Top navigation bar with brand link and logout button
│   │   ├── Footer.jsx           # Footer with About, Privacy links and copyright
│   │   └── ProtectedRoute.jsx   # Checks jwt_token cookie; redirects to /login if missing
│   ├── pages/
│   │   ├── LoginPage.jsx        # Public login page
│   │   ├── DashboardPage.jsx    # Protected main dashboard with overview, table, sharing
│   │   ├── ReferralDetailPage.jsx  # Protected detail view for a single referral
│   │   └── NotFoundPage.jsx     # Public 404 page
│   ├── App.jsx                  # Root component; wraps Routes in BrowserRouter
│   └── main.jsx                 # Entry point; renders <App /> only
├── package.json
└── README.md
```

---

## Getting Started

Follow these steps to run the project on your local machine.

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/go-business-referral-dashboard.git
```

### Step 2 — Navigate into the Project Directory

```bash
cd go-business-referral-dashboard
```

### Step 3 — Install Dependencies

```bash
npm install
```

### Step 4 — Start the Development Server

```bash
npm run dev
```

### Step 5 — Open in Browser

Visit [http://localhost:3000](http://localhost:3000) in your browser. You will be redirected to the login page if no valid session cookie is found.

### Step 6 — Log In with Test Credentials

Use the following credentials to access the dashboard:

| Field    | Value             |
|----------|-------------------|
| Email    | admin@example.com |
| Password | admin123          |

### Step 7 — Build for Production

When ready to deploy, run:

```bash
npm run build
```

This creates an optimized production build in the `dist/` or `build/` folder.

---

## Authentication

### How It Works

1. The user enters their email and password on the `/login` page and clicks **Sign in**.
2. A POST request is sent to the login endpoint with the credentials.
3. On success, the JWT token is extracted from `responseJson.data.token` and saved using `Cookies.set('jwt_token', token)`.
4. The user is redirected to the dashboard at `/`.
5. For every subsequent API request (referrals list, referral detail), the token is read with `Cookies.get('jwt_token')` and sent as `Authorization: Bearer <jwt_token>`.
6. On logout, the cookie is cleared and the user is sent back to `/login`.

### Login Endpoint

- **Method:** POST
- **URL:** `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Success Response:**
```json
{
  "data": {
    "token": "<jwt_token_string>"
  }
}
```

**Failure Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

---

## API Reference

**Base URL:** `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com`

All referral endpoints require the following request header:

```
Authorization: Bearer <jwt_token>
```

### Endpoints

| Purpose | Method | Endpoint |
|---|---|---|
| Login | POST | `/api/auth/signin` |
| Fetch all referrals | GET | `/api/referrals` |
| Search by name or service | GET | `/api/referrals?search=<query>` |
| Sort by date ascending | GET | `/api/referrals?sort=asc` |
| Sort by date descending | GET | `/api/referrals?sort=desc` |
| Search and sort combined | GET | `/api/referrals?search=<query>&sort=asc` |
| Fetch single referral by ID | GET | `/api/referrals?id=<referralId>` |

### API Response Structure

```json
{
  "success": true,
  "data": {
    "metrics": [
      { "id": "...", "label": "...", "value": "..." }
    ],
    "serviceSummary": {
      "service": "...",
      "yourReferrals": "...",
      "activeReferrals": "...",
      "totalRefEarnings": "..."
    },
    "referral": {
      "link": "...",
      "code": "..."
    },
    "referrals": [
      {
        "id": 1,
        "name": "...",
        "serviceName": "...",
        "date": "YYYY-MM-DD",
        "profit": 12345
      }
    ]
  }
}
```

---

## Route Structure

| Route | Type | Description |
|---|---|---|
| `/login` | Public | Login page; authenticated users are redirected to `/` |
| `/` | Protected | Main referral dashboard; requires `jwt_token` cookie |
| `/referral/:id` | Protected | Detail view for a single referral |
| `/dashboard/referrals` | Optional | May redirect to `/` |
| `*` | Public | 404 Not Found page; must not be wrapped in ProtectedRoute |

---

## Pages & Components

### Login Page (`/login`)

- Displays the brand title **Go Business** and the tagline "Sign in to open your referral dashboard."
- Contains an Email input field and a Password input field, both with accessible labels.
- The **Sign in** button fires a POST request on every click regardless of field contents; validation is handled entirely by the API response.
- Displays the error message returned by the API when credentials are invalid.

### Navbar

- Displays the brand link **Go Business** linking to `/`.
- Contains a Home navigation link.
- Contains a **Log out** button that clears the `jwt_token` cookie and navigates to `/login`.

### Dashboard Page (`/`)

The dashboard is made up of four main sections:

**1. Overview Section**
Displays all metrics from the API response, each showing its label and value.

**2. Service Summary Section**
Displays four fields — Service, Your Referrals, Active Referrals, and Total Ref. Earnings — sourced from `serviceSummary` in the API response.

**3. Share Referral Section**
Shows the user's referral link and referral code in read-only fields, each with a **Copy** button.

**4. All Referrals Table**
Displays referral data in a table with four columns: Name, Service, Date (formatted as YYYY/MM/DD), and Profit (formatted as USD with no decimal digits, e.g. $1,234). Includes a search input, a sort dropdown, client-side pagination, and clickable rows that navigate to the referral detail page.

### Referral Detail Page (`/referral/:id`)

- Fetches the referral using `GET /api/referrals?id=<id>` with the Bearer token.
- Displays a **Referral Details** heading, the partner's name, and a definition list showing Referral ID, Service Name, Date, and Profit.
- Includes a **← Back to dashboard** link.
- If no matching referral is found, displays a **Referral not found** heading.

### Not Found Page (`*`)

- Displays a 404 message and a **Page not found** heading.
- Includes a **Back to dashboard** link that navigates to `/`.
- This route is public and must not be wrapped in `ProtectedRoute`.

### Footer

- Displays the brand text **Go Business**.
- Contains navigation links for **About** and **Privacy**.
- Shows the copyright line: © 2024 Go Business.

---

## Pagination & Search

- **Pagination** is handled entirely on the client side. The API always returns the full matching list for a given request.
- The app slices the returned array into pages of 10 rows each.
- **Previous** and **Next** buttons are shown; Previous is disabled on page 1 and Next is disabled on the last page.
- Numbered page buttons are shown when there are multiple pages.
- The footer of the table shows: `Showing <from>–<to> of <total> entries` using an en dash (–).
- **Search** triggers a new API call with `?search=<query>`, which returns only rows matching the name or service.
- **Sort** triggers a new API call with `?sort=asc` or `?sort=desc`. The default sort is newest first (`desc`).
- Search and sort can be combined in a single request.

---

## Deployment

This project is deployed on Vercel.

**Live URL:** [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

To deploy your own instance:

1. Push the project to a GitHub repository.
2. Go to [https://vercel.com](https://vercel.com) and import the repository.
3. Follow the Vercel setup steps and click **Deploy**.
4. Replace the Live URL above with your generated Vercel URL.

---

## License

This project was built as part of a coding assessment for Go Business.

© 2024 Go Business. All rights reserved.