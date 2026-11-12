# Subject bank format

Each subject lives in `lib/banks/<subject>.js` and `export default` one object. Every
learner-facing string is trilingual: `{ en: '…', ar: '…', fr: '…' }` (call this an `L`).
Arabic is Modern Standard Arabic suitable for Grade 9–10 students in Jordan; French is
standard school French. Keep math/code/English-sentence content (e.g. `1011₂`, `She ___ to school`)
identical across languages where it IS the thing being tested.

```js
export default {
  subject: 'science',                    // 'science' | 'language' | 'social' | 'tech'
  layers: [L, L, L],                     // 3 column labels for the DigiMind map, left → right
  concepts: [                            // exactly 5
    {
      id: 'units',                       // short slug, unique across ALL subjects (see reserved list)
      hue: '#0ea5e9',                    // distinct vivid colour
      x: 140, y: 200, layer: 0,          // position on a 1040×640 canvas. Columns at x = 140, 520, 900.
                                         // y between 140 and 520. Keep ≥ 150px between nodes in a column.
      name: L, short: L,                 // short ≤ 14 chars in English
      desc: L,                           // one sentence
      keyIdeas: [ { icon: '📏', text: L }, … ],          // exactly 3, one sentence each (Visual mode)
      explain: { basic: L, visual: L, check: L },         // tutor: plain explanation, analogy, a check question
      keys: ['unit', 'measure', 'mesure', 'وحدة'],        // lowercase words in all 3 languages a student might type
    },
  ],
  edges: [['units', 'forces'], …],       // prerequisite → dependent, 4–6 edges, no cycles
  questions: [                           // exactly 3 per concept (15 total)
    {
      concept: 'units',
      difficulty: 1,                     // 1 easy, 2 medium, 3 hard
      type: 'mc',                        // 'mc' (4 options) or 'numeric' (typed number answer)
      prompt: L,                         // short instruction, e.g. "Choose the correct answer:"
      display: L,                        // the question itself (shown large)
      options: [ { id: 'a', text: L }, { id: 'b', text: L }, { id: 'c', text: L }, { id: 'd', text: L } ],  // mc only
      answer: 'b',                       // mc: correct option id; numeric: a number
      hint: L,
      steps: [ { text: L }, { text: L } ],   // 2–3 short reasoning steps that lead to the answer
      misconceptions: [                  // 1–3, each a REAL, common student misconception
        { value: 'a',                    // mc: the wrong option id it explains; numeric: the wrong number it produces
          id: 'mass-weight',             // slug
          label: L,                      // ≤ 5 words, e.g. "Mixed up mass and weight"
          found: L,                      // what the student likely did, addressed to them ("You chose …")
          why: L,                        // kind, short explanation of the correct idea
          tags: ['measurement'] },
      ],
    },
  ],
  demo: {                                // simulated Demo Student mastery per concept (0–100)
    before: { units: 55, … },            // a believable mix: one concept < 45, others 45–70
    after:  { units: 80, … },            // clearly higher (most ≥ 70)
    confidence: { units: 70, … },        // self-rated confidence; at least one concept 25+ points above `before`
  },
};
```

Reserved ids already used by Math: order, neg, frac, vars, onestep, linear, distrib, ineq, graph, functions.
At least 4 of the 15 questions should be `numeric` where the subject allows it (e.g. unit conversion,
binary to decimal, years between dates, speed = distance ÷ time) so Mistake Detective can match wrong numbers.
Every wrong number listed in a numeric question's misconceptions must be what that mistake really produces.
