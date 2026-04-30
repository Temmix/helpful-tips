# 📋 Implementation Plan — Note Taking Web App

> A phased roadmap from empty scaffold to fully functional app.

---

## 🗄️ Phase 1: Database & Auth Setup

- [x] Set up SQLite database initialization (`lib/db.ts`) with helper functions (`query`, `get`, `run`)
- [x] Create all tables (better-auth tables + `notes` table) and indexes
- [x] Configure better-auth with email/password provider
- [x] Add auth API route handler (`app/api/auth/[...all]/route.ts`)
- [x] Create `getCurrentUser()` server helper

---

## 🔧 Phase 2: Notes Backend (API + Repository)

- [x] Build note repository (`lib/notes.ts`) — all CRUD + sharing functions
- [x] Implement API route handlers:
  - [x] `GET` / `POST` → `/api/notes`
  - [x] `GET` / `PUT` / `DELETE` → `/api/notes/[id]`
  - [x] `POST` → `/api/notes/[id]/share`
  - [x] `GET` → `/api/public-notes/[slug]`
- [x] Auth middleware on all protected routes

---

## 🔐 Phase 3: Auth UI

- [x] Login page (`app/(auth)/login/page.tsx`)
- [x] Register page (`app/(auth)/register/page.tsx`)
- [x] Update root layout with header (app name, login/logout)
- [x] Redirect logic for unauthenticated users

---

## 📄 Phase 4: Dashboard & Note List

- [x] Dashboard page (`app/dashboard/page.tsx`)
- [x] `NoteList` component — titles, timestamps, public status
- [x] "Create note" button wired to `POST /api/notes`
- [x] Protected route (redirect to login if unauthenticated)

---

## ✏️ Phase 5: TipTap Editor & Note Page

- [x] `NoteEditor` component with TipTap + toolbar (bold, italic, headings, code, lists, hr)
- [x] Note editor page (`app/notes/[id]/page.tsx`)
- [x] Title editing
- [x] Auto-save or manual save to `PUT /api/notes/[id]`
- [x] `DeleteNoteButton` component
- [x] `ShareToggle` component with public URL display

---

## 🌐 Phase 6: Public Notes

- [x] Public note page (`app/p/[slug]/page.tsx`)
- [x] `PublicNoteViewer` component (read-only TipTap render)
- [x] 404 handling for invalid/disabled slugs

---

## ✨ Phase 7: Polish

- [x] Landing page redesign with login/signup CTA
- [x] Loading states, error handling, toast messages
- [x] Styling pass (card layouts, prose styling for public notes)
- [x] Final lint + typecheck

---

> 💡 **Tip:** Check off tasks as you complete them. Work through phases sequentially — each builds on the last.
