# Translating Digi Helper (English → Arabic + French)

Digi Helper is a React learning app for Grade 9–10 students (competition audience in Jordan).
The i18n layer is `src/lib/i18n.js`:

- `t('English text', { vars })` — English source string is the key. `{name}` placeholders are filled from vars.
- `L({ en, ar, fr })` — picks the current language from a trilingual object (already used for curriculum content; do not change those).
- `tp(n, 'one form', 'many form', vars)` — picks a singular/plural English key, `{n}` is available.
- Dictionaries are fragment files `src/i18n/<name>.js` that `export default { ar: { 'English key': 'عربي' }, fr: { 'English key': 'Français' } }`.

## Your job
1. In the files assigned to you, wrap **every learner/teacher-visible English string** with `t()`:
   JSX text, `aria-label`, `placeholder`, `title`, `alt`, strings passed as props (title, desc, eyebrow, label, hint…),
   toast messages, error messages, button labels, chart labels/series names, array literals of UI labels.
   - Import: `import { t } from '<relative path>/lib/i18n.js';` (add `tp`, `L`, `dayLabel` only if you use them).
   - Dynamic parts go in placeholders: `t('Level {n} · {xp} XP', { n, xp })`. Never build a sentence by concatenating
     several translated fragments, never translate a template literal with `${}` inside — convert it to a placeholder key.
   - Plurals: use two keys (`'1 day'` / `'{n} days'`), or `tp(n, '{n} day', '{n} days')`.
   - Keys must be plain string literals in single or double quotes (no backticks) so the checker can find them.
   - If a file already has a **local variable or parameter named `t`** in a scope where you need `t()`, rename that
     local (e.g. `tab`, `tm`, `id`, `th`) — never rename the imported function.
   - Do not translate: CSS classes, ids, route names, object keys, stored data, `console` messages, numbers, maths
     expressions, code, emoji.
   - Keep product names in Latin script: **Digi Helper, DigiWorld, DigiMind, DigiScan**. Translate the other feature
     names: Mistake Detective → «المحقق في الأخطاء» / « Détective des erreurs », Classroom Pulse → «نبض الصف» / « Pouls de la classe »,
     Daily Digi Challenge → «تحدي Digi اليومي» / « Défi Digi du jour », Digi Coach → «مدرّب Digi» / « Coach Digi »,
     Confidence vs Knowledge → «الثقة مقابل المعرفة» / « Confiance vs connaissances », Before → After Learning Journey →
     «رحلة التعلّم: قبل ← بعد» / « Parcours d’apprentissage : avant → après ».
2. While editing those files, make layout direction-safe for Arabic (RTL): replace physical Tailwind classes with
   logical ones — `ml-`→`ms-`, `mr-`→`me-`, `pl-`→`ps-`, `pr-`→`pe-`, `left-`→`start-`, `right-`→`end-`
   (including negatives like `-left-8`→`-start-8`), `text-left`→`text-start`, `text-right`→`text-end`,
   `border-l`→`border-s`, `border-r`→`border-e`, `rounded-l`→`rounded-s`, `rounded-r`→`rounded-e`, `space-x-` stays.
   Leave inline `style` positioning (left/right in px) alone.
3. Create your dictionary fragment file (name given in your task) with **every** key you used AND every key listed
   as "dictionary only" in your task, in both `ar` and `fr`.
   - Arabic: natural Modern Standard Arabic in a friendly school register, addressed to the student in the masculine
     singular by default (as Jordanian school materials do). Western digits (0-9). Keep `{placeholders}` exactly.
   - French: natural, warm, uses « tu » with students and « vous » nowhere; teacher-facing screens may use neutral wording.
   - Keep emoji and punctuation style; keep → arrows as they are (they are handled elsewhere).
   - Escape quotes correctly; the file must be a valid ES module.
4. Verify:
   - `cd /home/claude/digi-helper/client && node scripts/i18n-check.mjs src/i18n/<your-fragment>.js <your files...>` must print OK.
   - `node --input-type=module -e "import('/home/claude/digi-helper/client/src/i18n/<your-fragment>.js').then(m=>console.log(Object.keys(m.default.ar).length))"`
   - Do NOT run the Vite build and do not edit files outside your assignment (other people are editing them in parallel),
     except creating your own fragment file. Do not edit `src/i18n/index.js` — it will be wired up for you.
5. Reply with one short paragraph: files changed, number of keys, anything you could not translate cleanly.
