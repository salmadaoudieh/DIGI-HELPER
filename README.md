# Digi Helper

**Learn smarter. Discover your potential.**

Digi Helper is an intelligent personalized learning environment built around one loop:
**Detect → Understand → Adapt → Teach → Challenge → Measure.**
It analyses a student's answers, mistakes, confidence and progress to find learning gaps, then builds a personal path and measures the improvement.

## Signature features

| Feature | What it does | Where |
|---|---|---|
| **DigiWorld** | Subjects as zones. Math City's skyline lights up with mastery; districts unlock (Graph Heights, Functions Tower) with an unlock animation. | `pages/DigiWorld.jsx` |
| **DigiMind** | Knowledge map of connected concepts with status (✓ mastered · ◐ developing · ! needs attention). Click a node for mastery, confidence, recent performance, common mistakes, improvement and a recommended activity. | `pages/DigiMind.jsx`, `components/DigiMindMap.jsx` |
| **AI Learning Diagnosis** | Goes beyond the score: missed concepts, repeated patterns, difficulty, time and confidence → a written diagnosis + path. | `lib/engine.js → diagnose()` |
| **Mistake Detective** | Matches a wrong answer to the misconception that produces it (e.g. `3x + 5 = 20 → x = 3`: “You correctly subtracted 5, but the final division step was incorrect.”), then **Why? / Fix it / Try again**. | `components/Detective.jsx`, `lib/questions.js` |
| **DigiScan** | Photo of handwritten work → AI transcribes each line → a deterministic algebra checker finds the first step that breaks the balance (“Step 3: You changed −6 to +6”). Works offline with typed steps. | `pages/DigiScan.jsx`, `shared/linear.js` |
| **Digi Helper tutor** | Socratic tutor that teaches instead of answering, using the student's learning data. OpenAI on the server; a built-in step-by-step tutor offline. | `components/Tutor.jsx`, `lib/tutor.js`, `server/src/ai.js` |
| **Confidence vs Knowledge** | 1–5 confidence before selected questions, compared with performance → “Learning Confidence Gap”. Aggregated for teachers. | Diagnostic, Dashboard, Analytics, Classroom Pulse |
| **Before → After Journey** | Day-by-day mastery chart and concept-by-concept comparison. | `pages/Journey.jsx` |
| **Classroom Pulse** | “78% feel confident but 46% demonstrated mastery → Confidence Gap Detected”, plus hardest concept, common misconception and a private support list. | `pages/Teacher.jsx` |

Languages: **English, Arabic (full right-to-left layout) and French** — switch from the globe button. Every screen, question, Mistake Detective explanation, diagnosis and the tutor follow the chosen language, and the AI tutor replies in it. Dictionaries live in `client/src/i18n/`; run `node scripts/i18n-check.mjs all $(find src -name '*.js*')` to find untranslated strings.

Diagnostics cover **every subject**: Math, Science, Language (English), Social Studies and Technology (10 questions each), or a mixed 15-question **All subjects** test with results per subject. Subject question banks live in `client/src/lib/banks/` (format in `SCHEMA.md`), each written directly in all three languages.

Interface: four colour palettes (Ocean, Aurora, Sunset, Galaxy) in light and dark, a living aurora background, cursor-spotlight and 3D-tilt cards, confetti on wins and level-ups, count-up numbers, page transitions, a Ctrl/⌘ K command palette, an interactive constellation hero, a zoomable DigiMind map that lights up each concept's learning chain, and a daily mood check-in.

Also: **Digi Coach** encouragement (growth-mindset messages built from each student's real wins), student/teacher auth, learning modes (Visual · Interactive · Practice · Explain), adaptive practice, Daily Digi Challenge, XP/levels/streaks/achievements (no leaderboards), teacher dashboard, Lesson Creator with assignments, analytics (Chart.js), light/dark mode, text size control, keyboard navigation.

## Competition Demo Mode

Open **Competition demo** from the landing page. A guided bar walks through 10 steps with a one-line script for each:

1. Diagnostic test (▶ *Auto-play Demo Student* answers for you) → 2. Incorrect answers → 3. Mistake Detective → 4. DigiMind detects Negative Numbers → 5. Personalized path → 6. Balance game → 7. Daily challenge → 8. Reassessment → 9. Mastery 38% → 81% → 10. Teacher dashboard shows the improvement.

All Demo Student and class figures are **simulated demo data** and are labelled as such in the UI. Digi Helper has not been scientifically validated.

## Run it

Requires **Node.js 22.5+** (uses the built-in `node:sqlite`).

```bash
npm run install:all
cp server/.env.example server/.env     # add AUTH_SECRET and (optionally) OPENAI_API_KEY

# development: two terminals
npm run dev:server                     # API on http://localhost:8787
npm run dev:client                     # app on http://localhost:5173 (proxies /api)

# production
npm run build && npm start             # server serves client/dist on :8787
```

Without `OPENAI_API_KEY` everything still works: the tutor, mistake explanations and DigiScan's typed-steps checker run locally; only photo reading and AI-written explanations are disabled.

`npm run build:demo` produces `client/dist-single/index.html`, a single offline file (no server; accounts and progress stay in that browser).

## Architecture

```
client/   React 18 + Vite + Tailwind CSS 4 + Chart.js
  src/lib/data.js        curriculum graph, zones, achievements, demo data
  src/lib/questions.js   question generators with misconception models
  src/lib/engine.js      mastery model, diagnosis, path, unlocks, achievements
  src/lib/tutor.js       AI tutor client + offline Socratic tutor
  src/lib/store.jsx      app state, hash routing, demo controller, sync
server/   Express 5 + node:sqlite + OpenAI
  src/auth.js            scrypt password hashing, HMAC-signed session tokens
  src/db.js              users, progress, assignments
  src/ai.js              tutor, explanations, recommendations, vision transcription
shared/linear.js         equation parser + step checker used by client and server
```

## Security & privacy

- API key lives only in `server/.env`; the browser never sees it.
- Passwords hashed with scrypt; sessions are signed, expiring tokens; protected routes check role.
- Rate limits on auth and AI routes; JSON body size limits; input is trimmed, length-capped and stripped of control characters and angle brackets.
- Uploads: PNG/JPG/WEBP only, 5 MB max, MIME **and** magic-byte checks, processed in memory and never stored.
- Helmet security headers with a strict Content Security Policy.
- Minimal data: username, display name, grade, subjects, learning preference, avatar emoji. No email, birthday, phone or location.
- DigiScan shows a clear disclaimer that AI analysis can make mistakes.
