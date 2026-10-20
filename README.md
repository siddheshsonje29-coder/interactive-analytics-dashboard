Nexus — Interactive Analytics Dashboard
<p align="center">
  <strong>A modern, responsive analytics and administration dashboard for exploring business metrics, monitoring activity, and managing users.</strong>
</p>

<p align="center">
  <a href="https://interactive-analytics-dashboard-gamma.vercel.app/">Live Demo</a> ·
  <a href="https://github.com/siddheshsonje29-coder/interactive-analytics-dashboard">Source Code</a> ·
  <a href="https://github.com/siddheshsonje29-coder/interactive-analytics-dashboard/issues">Report an Issue</a>
</p>

Table of Contents
- Overview
- Live Demo
- Project Goals
- Features
- Technology Stack
- Application Modules
- Project Structure
- Getting Started
- Available Scripts
- How to Use
- Data and API Notes
- Error Handling and Resilience Demo
- Deployment
- Customization
- Accessibility and Responsive Design
- Troubleshooting
- Future Enhancements
- Contributing
- Author
- License
Overview
Nexus is a web-based interactive analytics dashboard designed to bring key business metrics, data visualizations, and administrative tools into one clean interface. It demonstrates how a modern frontend application can present complex information through concise KPI cards, interactive charts, searchable data tables, and responsive navigation.

The project is built with React and Vite, styled with Tailwind CSS, and uses Recharts for data visualization. Motion effects and reusable UI components help create a polished experience across desktop, tablet, and mobile layouts.
Project note: This repository is a frontend dashboard demonstration. Its API requests and sample data are simulated in the current implementation; do not treat the displayed figures or authentication flow as production financial or user data.

Live Demo
Explore the deployed application:

Open Nexus — Live Dashboard

Source code: GitHub Repository
Project Goals
- Present important business metrics in a clear, scannable overview.
- Turn analytics data into interactive visualizations.
- Provide common administrative workflows for managing user records.
- Demonstrate searching, sorting, filtering, pagination, and export functionality.
- Deliver a consistent experience across screen sizes and light/dark themes.
- Showcase reusable React components, state management, routing, and error handling.
Features
1. Authentication and Route Protection
- Simulated sign-in and password-recovery flows.
- Credential validation and remember-me behavior.
- Protected application routes for the dashboard experience.
Security note: The current authentication flow is a demonstration, not a substitute for a production authentication service. Do not use real passwords or sensitive information.
2. Dashboard Overview
- KPI cards for revenue, conversion, orders, and active visitors.
- Mini sparkline visualizations and percentage-change indicators.
- Analytics widgets for a quick view of business activity.
- Interactive KPI card arrangement.
- Utility widgets such as a clock, weather display, checklist, and scheduler.
3. Analytics and Data Visualization
- Interactive area, line, bar, and pie charts.
- Visitor activity and acquisition-channel visualizations.
- Device and browser distribution summaries.
- Geographic traffic summaries.
- Visual comparisons that make trends and category breakdowns easier to understand.
4. User Management
- View and search user records.
- Add, edit, and remove user entries.
- Filter and sort table data.
- Update user status through inline controls.
- Use confirmation prompts for destructive actions.
5. Data Tables and Exports
- Column-based ascending and descending sorting.
- Filtering by available user attributes, including role and status.
- Row selection through checkboxes.
- Pagination and configurable page-size controls.
- Export data to CSV.
- Generate PDF-style dashboard captures using the included export utilities.
6. Notifications and Feedback
- Toast notifications for successful actions, warnings, errors, and informational messages.
- Persistent notification logs where supported by the current application state.
- Visible feedback for common user interactions.
7. Theme Customization
- Dark, light, and system theme options.
- Theme preference persistence using browser local storage.
- System preference detection.
- Animated theme transitions.
8. Responsive Interface
- Collapsible sidebar navigation.
- Responsive dashboard grids and charts.
- Navigation and content layouts designed for desktop, tablet, and mobile screens.
- Reusable UI components, loading states, empty states, and error fallbacks.
9. Development and Reliability Features
- Lazy-loaded routes where configured.
- React error-boundary handling.
- Simulated API latency and error states.
- Loading skeletons and recovery controls to demonstrate resilient UI behavior.
Technology Stack
Technology	Purpose
React 19	Component-based user interface
Vite 8	Development server and production build tooling
JavaScript	Application logic
Tailwind CSS v4	Utility-first styling and responsive layouts
React Router DOM v7	Client-side routing
Recharts v3	Interactive charts and data visualization
React Icons (Boxicons)	Interface icons
Framer Motion	UI transitions and animations
Zustand	Shared application state
Axios	HTTP-client configuration and simulated API requests
jsPDF	PDF generation utilities
html2canvas	Rendering dashboard sections for export


Versions above describe the stack documented by the repository. Check package.json and the lockfile for the exact installed versions in your checkout.
Application Modules
Module	Purpose
Overview	KPI summary, activity charts, and utility widgets
Analytics	Traffic, acquisition, device, browser, and geographic summaries
Users	User records, search, filters, sorting, and management actions
Notifications	Application feedback and notification history
Settings	Preferences and theme controls
Authentication	Demonstration sign-in and password-recovery flows


The available screens and actions depend on the current implementation in the repository.
Project Structure
The following is a conceptual guide to the repository's main source areas. Refer to the actual src/ directory for the exact filenames and modules in your checkout.
interactive-analytics-dashboard/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Images, logos, and other shared assets
│   ├── components/
│   │   ├── charts/         # Reusable chart components
│   │   ├── layout/         # Sidebar, navbar, and layout components
│   │   └── ui/              # Cards, overlays, skeletons, and UI utilities
│   ├── pages/              # Dashboard and feature pages
│   ├── routes/             # Route configuration and lazy imports
│   ├── hooks/              # Reusable React hooks
│   ├── store/              # Zustand state stores
│   ├── services/           # Axios setup and simulated API services
│   ├── utils/              # Export and data utility functions
│   ├── App.jsx             # Application root
│   ├── index.css           # Global styles
│   └── main.jsx            # Application entry point
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
Getting Started
Prerequisites
Install the following before starting:
- Node.js — use a version compatible with the project's Vite requirements.
- npm, which is included with Node.js.
- Git, if you plan to clone the repository.
Check your installations:
node --version
npm --version
git --version
1. Clone the repository
git clone https://github.com/siddheshsonje29-coder/interactive-analytics-dashboard.git
2. Open the project directory
cd interactive-analytics-dashboard
3. Install dependencies
npm install
4. Start the development server
npm run dev
Vite will print the local URL in your terminal, typically:
http://localhost:5173
Open that URL in your browser. If Vite selects a different port, use the URL printed in the terminal.
5. Create a production build
npm run build
The optimized output is generated in the dist/ directory.
6. Preview the production build locally
npm run preview
Use the local URL printed by Vite to inspect the production build.
Available Scripts
Command	Description
npm run dev	Starts the local development server
npm run build	Creates the production build
npm run preview	Serves the production build locally
npm run lint	Runs linting, if the script is defined in package.json


The exact scripts are determined by package.json. If a command is unavailable, check the scripts section before running it.
How to Use
1. Open the live demo or run the application locally.
2. Explore the overview page and KPI cards.
3. Navigate to analytics views to inspect the visualizations.
4. Open user management to try the available search, sorting, filtering, and record-management interactions.
5. Test the theme options and responsive layout.
6. Try the export controls where available.
7. If you want to inspect resilience behavior, follow the error handling demo.
Because the project uses simulated data and API behavior, actions are intended to demonstrate the interface rather than persist real business records to a production backend.
Data and API Notes
- The current implementation documents simulated backend requests through Axios.
- Dashboard metrics and user records should be treated as demonstration data unless a real data source has been configured.
- A simulated API failure mode is available for testing error handling.
- No production database, live business analytics pipeline, or secure authentication backend is implied by this frontend repository.
- Before connecting a real service, configure the API base URL, authentication strategy, validation, and error handling in the appropriate service layer.
- Never commit API keys, credentials, access tokens, or other secrets to Git.
Error Handling and Resilience Demo
The dashboard includes a development-oriented flow for demonstrating error boundaries and fallback UI.
1. Open the dashboard overview.
2. Locate the Simulate API Failures control, if available in the current build.
3. Switch the control on and trigger Refetch data.
4. Observe the error or fallback interface when the simulated request fails.
5. Use the available reset or reload control to recover.
6. Turn failure simulation off and refetch the data again.
The purpose of this flow is to demonstrate how a frontend can communicate failures and recover without leaving the entire interface unusable. Exact control labels may vary with the current implementation.

Contributions, suggestions, and bug reports are welcome.
1. Fork the repository.
2. Create a feature branch:
   git checkout -b feature/your-feature-name
3. Make your changes and test them locally.
4. Commit with a clear message:
   git add .
   git commit -m "Add: describe your change"
5. Push your branch:
   git push origin feature/your-feature-name
6. Open a pull request describing the change and any relevant testing.
For bugs or feature suggestions, use the GitHub Issues page.
Author
Siddhesh Sonje
- GitHub: @siddheshsonje29-coder
- LinkedIn: Siddhesh Sonje
- Project Repository: interactive-analytics-dashboard
- Live Demo: interactive-analytics-dashboard-gamma.vercel.app
License
No license is specified here. If you intend to allow others to use, modify, or distribute this project, add a LICENSE file to the repository and update this section to reflect the selected license.
