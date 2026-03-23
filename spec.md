# NEET Navigator Pro — Project Specification

> A mobile-first NEET exam preparation web app built with React, Vite, Tailwind CSS, TypeScript, and Lovable Cloud (Supabase).

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Folder Structure](#folder-structure)
3. [Main Features](#main-features)
4. [Database Schema](#database-schema)
5. [Edge Functions](#edge-functions)
6. [Authentication & Authorization](#authentication--authorization)
7. [CI/CD](#cicd)

---

## Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| Framework    | React 18 + TypeScript                           |
| Build Tool   | Vite 5                                          |
| Styling      | Tailwind CSS 3, shadcn/ui, Framer Motion        |
| State        | React Query (TanStack), React Context           |
| Routing      | React Router DOM 6                              |
| Backend      | Lovable Cloud (Supabase) — Auth, DB, Edge Fns   |
| AI           | Google Gemini (via Lovable AI Gateway)           |
| Charts       | Recharts                                        |
| Forms        | React Hook Form + Zod                           |

---

## Folder Structure

```
├── .github/workflows/
│   └── ci.yml                    # GitHub Actions CI/CD pipeline
├── public/
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/                   # shadcn/ui primitives (button, card, dialog, etc.)
│   │   ├── progress/             # Progress tracking widgets
│   │   │   ├── DailyActivity.tsx
│   │   │   ├── MonthlyReport.tsx
│   │   │   ├── ParentView.tsx
│   │   │   ├── ProgressOverview.tsx
│   │   │   └── WeeklyReport.tsx
│   │   ├── smart-learning/       # AI-powered video learning
│   │   │   ├── BreakReminder.tsx
│   │   │   ├── MiniChapters.tsx
│   │   │   ├── QuickRevision.tsx
│   │   │   ├── SegmentList.tsx
│   │   │   ├── SmartVideoPlayer.tsx
│   │   │   └── TranscriptViewer.tsx
│   │   ├── student-corner/       # Wellness & motivation tools
│   │   │   ├── BrainBreak.tsx
│   │   │   ├── EmergencyMotivation.tsx
│   │   │   ├── MoodTracker.tsx
│   │   │   ├── MotivationBoost.tsx
│   │   │   ├── NTAUpdates.tsx
│   │   │   ├── PomodoroTimer.tsx
│   │   │   ├── PositiveWall.tsx
│   │   │   ├── RelaxationTools.tsx
│   │   │   └── StressSupport.tsx
│   │   ├── study-planner/        # Manual + AI study planning
│   │   │   ├── AssessmentCard.tsx
│   │   │   ├── ChapterPicker.tsx
│   │   │   ├── DailyPlanner.tsx
│   │   │   ├── MonthlyPlanner.tsx
│   │   │   ├── SmartPlanGenerator.tsx
│   │   │   ├── StudyPlannerSection.tsx
│   │   │   └── WeeklyPlanner.tsx
│   │   ├── test-dashboard/       # Test & quiz engine
│   │   │   ├── MockTestSection.tsx
│   │   │   ├── MonthlyTestSection.tsx
│   │   │   ├── QuizEngine.tsx
│   │   │   ├── TestDashboardHome.tsx
│   │   │   ├── TestResults.tsx
│   │   │   ├── WeeklyTestSection.tsx
│   │   │   └── WorksheetSection.tsx
│   │   ├── BottomNav.tsx         # Mobile bottom navigation
│   │   ├── MindMapViewer.tsx     # Interactive mind maps
│   │   ├── NavLink.tsx
│   │   ├── PremiumGate.tsx       # Subscription paywall
│   │   ├── ProgressRing.tsx      # Circular progress indicator
│   │   └── VideoPlayer.tsx       # YouTube video embed
│   ├── contexts/
│   │   └── AuthContext.tsx       # Auth state provider
│   ├── data/
│   │   ├── mindMapData.ts        # Mind map content
│   │   ├── studentCornerData.ts  # Student corner static data
│   │   ├── studyContent.ts       # Subject/chapter content
│   │   └── testQuestions.ts      # NEET PYQ question bank (50+ per subject)
│   ├── hooks/
│   │   ├── use-mobile.tsx        # Mobile breakpoint detection
│   │   ├── use-toast.ts          # Toast notifications
│   │   ├── usePremium.ts         # Premium subscription check
│   │   ├── useStudyPlanner.ts    # Study planner state management
│   │   └── useVideoAnalysis.ts   # AI video analysis hook
│   ├── integrations/
│   │   ├── lovable/index.ts      # Lovable platform integration
│   │   └── supabase/
│   │       ├── client.ts         # Auto-generated Supabase client
│   │       └── types.ts          # Auto-generated DB types
│   ├── lib/
│   │   └── utils.ts              # Utility functions (cn, etc.)
│   ├── pages/
│   │   ├── AdminDashboard.tsx    # Admin panel (subscription mgmt)
│   │   ├── Auth.tsx              # Login / Signup
│   │   ├── Bookmarks.tsx         # Saved content
│   │   ├── Chat.tsx              # AI chat assistant
│   │   ├── Dashboard.tsx         # Main student dashboard
│   │   ├── Index.tsx             # Landing / onboarding entry
│   │   ├── NotFound.tsx          # 404 page
│   │   ├── Onboarding.tsx        # New user onboarding flow
│   │   ├── ProgressDashboard.tsx # Detailed progress analytics
│   │   ├── SmartLearning.tsx     # AI video learning page
│   │   ├── StudentCorner.tsx     # Wellness & motivation hub
│   │   ├── Study.tsx             # Study content browser
│   │   ├── Subscription.tsx      # Premium subscription page
│   │   └── Tests.tsx             # Test dashboard
│   └── types/
│       ├── smartLearning.ts      # Smart learning types
│       ├── studyPlanner.ts       # Study planner types
│       └── testDashboard.ts      # Test dashboard types
├── supabase/
│   ├── config.toml               # Supabase project config
│   ├── migrations/               # Database migrations (read-only)
│   └── functions/
│       ├── admin-subscriptions/  # Admin subscription management
│       ├── analyze-video/        # AI video analysis (Gemini)
│       ├── chat/                 # AI chat assistant (Gemini)
│       └── nta-updates/          # NTA news scraper
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── vitest.config.ts
└── package.json
```

---

## Main Features

### 1. Authentication & Onboarding
- Email/password signup & login (email verification required)
- Multi-step onboarding flow for new students

### 2. Student Dashboard
- Subject-wise study progress overview
- Quick access to all features via bottom navigation
- Notification system

### 3. Study Content Browser
- Subject → Chapter → Video hierarchy (Physics, Chemistry, Biology)
- YouTube video playback with embedded player
- Interactive mind maps per chapter

### 4. Smart Learning (AI-Powered)
- AI video analysis using Google Gemini
- Auto-generated transcripts and mini-chapters
- Quick revision notes from video content
- Break reminders during study sessions

### 5. Study Planner
- **My Plan** — Manual daily/weekly/monthly planning with chapter picker
- **Smart Plan** — AI-generated study schedules
- Time slot assignment, completion tracking
- Persistent storage in database

### 6. Test Dashboard (Premium)
- **Mock Tests** — Full-length NEET mock exams
- **Weekly Tests** — Subject-wise weekly assessments
- **Monthly Tests** — Comprehensive monthly evaluations
- **Worksheets** — Chapter-wise practice
- 50+ unique NEET PYQ questions per subject (non-repeating)
- Quiz engine with timer, results, and explanations

### 7. AI Chat Assistant
- NEET-focused academic Q&A powered by Gemini
- Context-aware responses for Physics, Chemistry, Biology

### 8. Student Corner (Wellness)
- Mood tracker
- Pomodoro timer
- Brain break games
- Relaxation tools & stress support
- Motivation boost & positive wall
- Emergency motivation
- NTA official updates feed

### 9. Progress Dashboard
- Daily activity tracking
- Weekly & monthly reports with charts
- Parent view for progress sharing

### 10. Subscription System
- Freemium model with premium gating
- ₹79 subscription via payment reference
- Admin approval workflow

### 11. Admin Panel
- Accessible at `/neet-admin-x9k2`
- View all subscription requests (pending/active/rejected)
- Approve or reject subscriptions
- Role-based access (admin role required)

---

## Database Schema

### `subscriptions`
| Column            | Type                     | Nullable | Default              |
| ----------------- | ------------------------ | -------- | -------------------- |
| `id`              | uuid (PK)                | No       | `gen_random_uuid()`  |
| `user_id`         | uuid                     | No       | —                    |
| `status`          | text                     | No       | `'pending'`          |
| `amount`          | integer                  | No       | `79`                 |
| `payment_reference` | text                   | Yes      | —                    |
| `activated_at`    | timestamptz              | Yes      | —                    |
| `created_at`      | timestamptz              | No       | `now()`              |

**RLS:** Users can INSERT, SELECT, UPDATE own records only.

---

### `study_plans`
| Column          | Type                     | Nullable | Default              |
| --------------- | ------------------------ | -------- | -------------------- |
| `id`            | uuid (PK)                | No       | `gen_random_uuid()`  |
| `user_id`       | uuid                     | No       | —                    |
| `plan_date`     | date                     | No       | —                    |
| `plan_type`     | text                     | No       | `'manual'`           |
| `subject_id`    | text                     | No       | —                    |
| `subject_name`  | text                     | No       | —                    |
| `subject_color` | text                     | No       | —                    |
| `subject_icon`  | text                     | No       | —                    |
| `chapter_id`    | text                     | No       | —                    |
| `chapter_name`  | text                     | No       | —                    |
| `video_id`      | text                     | Yes      | —                    |
| `time_slot`     | text                     | Yes      | —                    |
| `completed`     | boolean                  | No       | `false`              |
| `created_at`    | timestamptz              | No       | `now()`              |

**RLS:** Users can full CRUD on own records only.

---

### `notifications`
| Column      | Type                     | Nullable | Default              |
| ----------- | ------------------------ | -------- | -------------------- |
| `id`        | uuid (PK)                | No       | `gen_random_uuid()`  |
| `user_id`   | uuid                     | No       | —                    |
| `title`     | text                     | No       | —                    |
| `message`   | text                     | No       | —                    |
| `type`      | text                     | No       | `'info'`             |
| `read`      | boolean                  | No       | `false`              |
| `created_at`| timestamptz              | No       | `now()`              |

**RLS:** Users can SELECT and UPDATE own records. INSERT by service_role only.

---

### `user_roles`
| Column    | Type                     | Nullable | Default              |
| --------- | ------------------------ | -------- | -------------------- |
| `id`      | uuid (PK)                | No       | `gen_random_uuid()`  |
| `user_id` | uuid                     | No       | —                    |
| `role`    | app_role enum            | No       | —                    |

**Enum `app_role`:** `admin` | `moderator` | `user`

**RLS:** Only admins can SELECT. No client INSERT/UPDATE/DELETE.

**Security function:**
```sql
has_role(_user_id uuid, _role app_role) → boolean  -- SECURITY DEFINER
```

---

## Edge Functions

| Function               | JWT | Purpose                                          |
| ---------------------- | --- | ------------------------------------------------ |
| `analyze-video`        | No  | AI video analysis via Gemini (transcripts, notes) |
| `admin-subscriptions`  | No  | Admin subscription CRUD (list, approve, reject)   |
| `chat`                 | No  | AI chat assistant for academic queries             |
| `nta-updates`          | No  | Fetches latest NTA exam updates                   |

---

## Authentication & Authorization

- **Auth provider:** Email/password (Lovable Cloud Auth)
- **Email verification:** Required before sign-in
- **Admin access:** Role-based via `user_roles` table + `has_role()` function
- **Premium gating:** `PremiumGate` component checks `subscriptions` table for active status

---

## CI/CD

- **GitHub Actions** pipeline on push/PR to `main`
- Steps: Install → Lint → Type Check → Test → Build

---

## Routes

| Path                  | Page              | Auth Required | Premium |
| --------------------- | ----------------- | ------------- | ------- |
| `/`                   | Landing           | No            | No      |
| `/onboarding`         | Onboarding        | No            | No      |
| `/auth`               | Login/Signup      | No            | No      |
| `/dashboard`          | Dashboard         | Yes           | No      |
| `/study`              | Study Browser     | Yes           | No      |
| `/smart-learning`     | Smart Learning    | Yes           | No      |
| `/tests`              | Test Dashboard    | Yes           | Yes     |
| `/chat`               | AI Chat           | Yes           | No      |
| `/student-corner`     | Student Corner    | Yes           | No      |
| `/progress`           | Progress          | Yes           | No      |
| `/subscription`       | Subscription      | Yes           | No      |
| `/neet-admin-x9k2`   | Admin Panel       | Yes (Admin)   | No      |
