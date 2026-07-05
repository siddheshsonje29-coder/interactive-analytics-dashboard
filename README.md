# Nexus | Interactive Analytics Admin Dashboard

Nexus is a state-of-the-art, high-fidelity administrative panel built using **React.js (Vite)**, **Tailwind CSS v4**, and **Framer Motion**. Styled with a premium dark-mode aesthetic inspired by Stripe, Notion Analytics, and Linear, Nexus provides a unified, responsive console for managing SaaS growth trends, client profiles, and ledger analysis.

---

## 🚀 Key Features

1. **Authentication Gateways**:
   - Simulated login and password recovery forms.
   - Credentials validation, remember me caching, and protected routing.
2. **Dynamic Overview Dashboard**:
   - KPI metrics cards displaying total revenues, conversion rates, order counts, and active visitor counts.
   - Custom in-card mini sparkline charts tracking week-on-week growth.
   - Integrated widgets: real-time terminal clock, city weather tracker (with dynamic conditions), checklists, and quick scheduler.
   - Interactive reordering of KPI metrics directly on the overview grid.
3. **Advanced Data Analytics**:
   - Visitor timeline area charts and acquisition channels pie distributions.
   - Segmented progress trackers for device divisions (Desktop vs Mobile vs Tablet) and browser shares.
   - Geographic traffic logs detailing country distributions and percentage metrics.
4. **Administrative User Management (CRUD)**:
   - Full search filters, adding users, updating profiles, and removal dialog prompts.
   - Instant inline toggles to disable or activate system user statuses.
5. **Interactive Ledgers & Export Engine**:
   - Sorting by columns (ascending/descending) and filter criteria (by role, by status).
   - Checkbox row selections, pagination limits, and exports (raw CSV spreadsheets and visual PDF screen capture downloads).
6. **Unified Notifications & Alerts**:
   - Persistent global logs.
   - Push toast alerts for info, warnings, errors, and success updates.
7. **Complete Dark, Light, & System Theme Support**:
   - Smooth transition animations between themes.
   - Local storage caching, automatically matching local client computer preferences.

---

## 🛠️ Tech Stack & Packages

- **Core**: React 19, Vite 8, JavaScript
- **Styling**: Tailwind CSS v4, PostCSS, Autoprefixer (loaded via `@tailwindcss/vite` compiler plugin)
- **Routing**: React Router DOM (v7)
- **Charts**: Recharts (v3)
- **Icons**: React Icons (Boxicons)
- **Animations**: Framer Motion
- **State Management**: Zustand
- **API Handler**: Axios (fully simulated backend requests with togglable server error boundaries)
- **Exporting**: jsPDF, html2canvas

---

## 📂 Folder Architecture

```bash
src/
├── assets/          # Shared visual vectors, logos, and images
├── components/      # Reusable presentation and layout modules
│   ├── charts/      # Recharts visualizations (Sparklines, Area, Line, Bar, Pie charts)
│   ├── layout/      # Sidebar drawers, Navbar profiles, layouts, and route guards
│   └── ui/          # Error boundaries, Metric cards, loading skeletons, and overlays
├── pages/           # High-level route pages (Dashboard, Analytics, Users, Settings)
├── routes/          # Navigation paths configuration and dynamic lazy imports
├── hooks/           # Debouncing and state localStorage hooks
├── store/           # Zustand state containers (Auth, Theme, Notifications, Dashboard)
├── services/        # Axios configurations and error simulation layers
├── utils/           # CSV formats parser and PDF screenshot generators
├── App.jsx          # Root router wrapper and global toast containers
├── index.css        # Core style imports, glassmorphism templates, and custom scrollbars
└── main.jsx         # App mounting entry and React strict boundaries
```

---

## ⚙️ Running Locally

Follow these steps to initialize and boot the local server on your system:

### 1. Install Dependencies
Run the installation command:
```bash
npm install
```

### 2. Launch Local Dev Server
Start the dev node environment:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser to explore the dashboard.

### 3. Production Build Compilation
Compile static bundles for Vercel, Netlify, or GitHub Pages deployment:
```bash
npm run build
```
Verify the build outputs in the `/dist` directory.

---

## 🛡️ Error Boundary & Loading Skeletons Testing

To demonstrate **React Error Boundaries** and graceful API error fallbacks, a debug toggle is placed in the top right corner of the **Dashboard Overview**:
1. Click **Simulate API Failures: OFF** to flip it to **ON**.
2. Press **Refetch data**.
3. The mock Axios request will resolve with an internal 500 rejection, and the local page component will crash.
4. The page's **ErrorBoundary** catches this crash instantly and displays a clean fallback UI with options to **Reset Component State** or **Reload Browser** without disrupting the rest of the application navbar or sidebar.
5. Click **Refetch data** after toggling it back to **OFF** to restore standard operations.
