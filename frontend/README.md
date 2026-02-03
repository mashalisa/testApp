# React + TypeScript + Vite

React-based frontend for the exam application. Built with **React 19**, **TypeScript**, and **Vite**, with role-based routing for teachers, students, and admins.


| Technology | Purpose |
|------------|--------|
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Vite 7** | Build tool, dev server, HMR |
| **React Router DOM 7** | Client-side routing |
| **Bootstrap 5** | Layout and styling |
| **Bootstrap Icons** / **React Icons** | Icons |

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- Backend API running (see root `README.md`)

### Install & run

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` (or the port Vite reports).

### Build for production

```bash
npm run build
npm run preview   # optional: preview production build locally
```

### Other scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve the production build locally |

---

## Environment

Create a `.env` in the frontend root (see `.env.example` if present). Required:

| Variable | Description |
|----------|-------------|
| `VITE_BASE_URL` | Base URL of the backend API (e.g. `http://localhost:3000`) |

All client env vars must be prefixed with `VITE_` to be exposed in the app.

---

## Project Structure

```
frontend/
├── public/                 # Static assets (images, etc.)
├── src/
│   ├── api/                # API modules (auth, profile, tests, students, statistics)
│   ├── components/         # React components
│   │   ├── authorisation/  # Login, Signup, AuthLayout
│   │   ├── basic/          # Reusable UI (Card, Modal, Select, Title, etc.)
│   │   ├── form/           # Form primitives (Input, Submit, IconCheckbox)
│   │   ├── layout/         # Student & Teacher layouts
│   │   ├── profile/        # Profile steps (Grades, Subjects, CoreSubjects, Students)
│   │   ├── sideBar/        # SideBarStudent, SideBarTeacher
│   │   ├── students/      # Student dashboard, test in progress, score
│   │   ├── teachers/      # Teacher dashboard, statistics, test cards
│   │   └── test/           # Test creation (steps, questions, answers)
│   ├── constains/          # Constants (e.g. API_ENDPOINTS)
│   ├── context/            # React Context (AuthContext)
│   ├── hooks/              # Custom hooks (useAuth, useApi, useForm, test/student hooks)
│   ├── routes/             # Route config & guards (Protected, Teacher, Student)
│   ├── types/              # TypeScript types and API response types
│   ├── utils/              # Helpers (ApiRequest, CalculateTestDuration)
│   ├── App.tsx             # Root component, wraps app with AppRoute
│   ├── main.tsx            # Entry: StrictMode, BrowserRouter, AuthProvider
│   └── index.css           # Global styles
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Architecture Overview

### Entry and providers (`main.tsx`)

- **StrictMode** — React development checks
- **BrowserRouter** — React Router DOM
- **AuthProvider** — Global auth state (user, token, login/logout)

```tsx
<StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
</StrictMode>
```

### Authentication

- **Context:** `src/context/AuthContex.tsx`  
  - Holds: `user`, `token`, `loading`, and methods `loginToken`, `logoutToken`, `fetchUser`.
  - On load, restores token from `localStorage` and fetches user from backend.
- **Hook:** `useAuth()` from `src/hooks/useAuth.tsx` — used across the app to read auth state and actions.

### Routing (`src/routes/AppRoute.tsx`)

- **Public:** `/login`, `/signup`
- **Protected:** `/dashboard` — redirects by role:
  - `teacher` → `/teacher/dashboard`
  - `student` → `/student/dashboard`
  - `admin` → `/admin/dashboard`
- **Role-specific routes:** `TeacherRoute`, `StudentRoute` (and admin if present)
- **Fallbacks:** `/` → `/dashboard`; unknown paths → `/`

Route guards use `ProtectedRoute`, `TeacherRoute`, and `StudentRoute` to enforce roles.

### API layer

- **Base URL:** `import.meta.env.VITE_BASE_URL`
- **Endpoints:** Centralized in `src/constains/ApiEndPoints.tsx` (e.g. auth, grades, tests, questions, answers, student tests, scores, statistics).
- **Request helper:** `src/utils/ApiRequest.ts` — `apiRequest<T>(endpoint, token, options)` for authenticated `fetch` with JSON and Bearer token.
- **API modules in `src/api/`:**  
  `manageAuth`, `manageProfile`, `manageTest`, `manageStudents`, `manageStatistics` — wrap endpoints and use `apiRequest` where auth is needed.

### Data and UI patterns

- **Types:** `src/types/index.ts` — user, auth, forms, API responses (tests, questions, answers, scores, statistics).
- **Custom hooks:**  
  - Auth: `useAuth`  
  - Data: `useApi`, `useTeacherData`, `useDashboardStudents`, `useStudentTests`, `useStudentMakeTest`, `useTestDashboard`, `useTestValidation`  
  - Forms/links: `useForm`, `useLink`, `useAnswerCreate`
- **UI:** Bootstrap 5 for layout and components; app-specific components in `components/` (basic, form, layout, profile, students, teachers, test).

---

## Main user flows

1. **Login / Signup** — Auth forms call backend; on success, token and user are stored via `AuthContext` and user is redirected to `/dashboard`.
2. **Teacher** — Dashboard, profile (grades, subjects, core subjects, students), create/edit tests (steps → questions → answers), share test link, view statistics.
3. **Student** — Dashboard, start test via link, answer questions, submit, view score.



For backend and full setup, see the root **README.md**.
