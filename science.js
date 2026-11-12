// Science bank — DigiWorld zone "Science Lab". Format: see SCHEMA.md.

const MC = {
  en: "Choose the correct answer:",
  ar: "اختر الإجابة الصحيحة:",
  fr: "Choisis la bonne réponse :",
};
const NUM = {
  en: "Type your answer as a number:",
  ar: "اكتب إجابتك على شكل عدد:",
  fr: "Écris ta réponse sous forme de nombre :",
};

export default {
  subject: "science",
  layers: [
    { en: "Foundations", ar: "الأساسيات", fr: "Les bases" },
    { en: "Core ideas", ar: "المفاهيم الرئيسة", fr: "Notions clés" },
    { en: "Big ideas", ar: "الأفكار الكبرى", fr: "Grandes idées" },
  ],
  concepts: [
    {
      id: "measure",
      hue: "#0ea5e9",
      x: 140, y: 330, layer: 0,
      name: { en: "Measurement & Units", ar: "القياس والوحدات", fr: "Mesures et unités" },
      short: { en: "Measurement", ar: "القياس", fr: "Mesures" },
      desc: {
        en: "Scientists describe the world with numbers and standard SI units such as the metre, kilogram and second.",
        ar: "يصف العلماء العالم بالأعداد وبوحدات النظام الدولي مثل المتر والكيلوغرام والثانية.",
        fr: "Les scientifiques décrivent le monde avec des nombres et des unités SI comme le mètre, le kilogramme et la seconde.",
      },
      keyIdeas: [
        { icon: "📏", text: {
          en: "Every measurement needs a number and a unit, like 3 m or 5 kg.",
          ar: "كل قياس يحتاج إلى عدد ووحدة، مثل 3 م أو 5 كغ.",
          fr: "Toute mesure a besoin d'un nombre et d'une unité, comme 3 m ou 5 kg.",
        } },
        { icon: "🔁", text: {
          en: "Prefixes change the size of a unit: kilo means 1000 and centi means one hundredth.",
          ar: "البادئات تغيّر حجم الوحدة: «كيلو» تعني 1000 و«سنتي» تعني جزءًا من مئة.",
          fr: "Les préfixes changent la taille d'une unité : kilo veut dire 1000 et centi un centième.",
        } },
        { icon: "⚖️", text: {
          en: "Mass (kg) is the amount of matter; weight (N) is the pull of gravity on it.",
          ar: "الكتلة (كغ) هي مقدار المادة، أما الوزن (نيوتن) فهو قوة جذب الأرض لها.",
          fr: "La masse (kg) est la quantité de matière ; le poids (N) est l'attraction de la gravité sur elle.",
        } },
      ],
      explain: {
        basic: {
          en: "To measure something, we compare it with a standard unit. The SI system uses metres for length, kilograms for mass and seconds for time. To convert from a big unit to a smaller one, you multiply; from small to big, you divide.",
          ar: "عندما نقيس شيئًا فإننا نقارنه بوحدة معيارية. يستخدم النظام الدولي المتر للطول والكيلوغرام للكتلة والثانية للزمن. للتحويل من وحدة كبيرة إلى وحدة أصغر نضرب، ومن الصغيرة إلى الكبيرة نقسم.",
          fr: "Mesurer, c'est comparer avec une unité de référence. Le système SI utilise le mètre pour la longueur, le kilogramme pour la masse et la seconde pour le temps. Pour passer d'une grande unité à une plus petite, on multiplie ; dans l'autre sens, on divise.",
        },
        visual: {
          en: "Think of units like coins: 1 dinar equals 1000 fils, just as 1 km equals 1000 m. Changing to the smaller coin gives you more of them.",
          ar: "فكّر في الوحدات كأنها نقود: الدينار الواحد يساوي 1000 فلس، تمامًا كما يساوي الكيلومتر 1000 متر. عندما تحوّل إلى القطعة الأصغر يزداد عددها.",
          fr: "Pense aux unités comme à de la monnaie : 1 dinar vaut 1000 fils, comme 1 km vaut 1000 m. En passant à la plus petite pièce, tu en obtiens davantage.",
        },
        check: {
          en: "How many grams are in 3 kg?",
          ar: "كم غرامًا في 3 كغ؟",
          fr: "Combien de grammes y a-t-il dans 3 kg ?",
        },
      },
      keys: ["measure", "measurement", "unit", "units", "si", "convert", "mesure", "unité", "conversion", "قياس", "وحدة", "وحدات", "تحويل"],
    },
    {
      id: "matter",
      hue: "#8b5cf6",
      x: 520, y: 220, layer: 1,
      name: { en: "States of Matter", ar: "حالات المادة", fr: "États de la matière" },
      short: { en: "Matter", ar: "المادة", fr: "Matière" },
      desc: {
        en: "All matter is made of tiny moving particles, and how they are arranged decides whether it is a solid, liquid or gas.",
        ar: "تتكوّن المادة كلها من جسيمات صغيرة متحركة، وطريقة ترتيبها تحدد إن كانت صلبة أو سائلة أو غازية.",
        fr: "Toute la matière est faite de minuscules particules en mouvement, et leur arrangement décide si elle est solide, liquide ou gazeuse.",
      },
      keyIdeas: [
        { icon: "🧊", text: {
          en: "In a solid, particles are packed closely and vibrate in fixed positions.",
          ar: "في المادة الصلبة تكون الجسيمات متقاربة جدًا وتهتز في أماكن ثابتة.",
          fr: "Dans un solide, les particules sont serrées et vibrent sur place.",
        } },
        { icon: "💧", text: {
          en: "Heating gives particles more energy, so they move faster and spread apart.",
          ar: "التسخين يمنح الجسيمات طاقة أكبر، فتتحرك أسرع وتتباعد.",
          fr: "Chauffer donne plus d'énergie aux particules : elles bougent plus vite et s'écartent.",
        } },
        { icon: "🧱", text: {
          en: "Density tells how much mass is packed into each unit of volume: density = mass ÷ volume.",
          ar: "الكثافة تبيّن مقدار الكتلة في كل وحدة حجم: الكثافة = الكتلة ÷ الحجم.",
          fr: "La masse volumique indique la masse contenue dans chaque unité de volume : masse ÷ volume.",
        } },
      ],
      explain: {
        basic: {
          en: "Solids keep their shape because their particles are held tightly. Liquids flow because particles can slide past each other. Gases spread out to fill any container because particles move freely and are far apart. Changing state does not change the particles themselves, only how they move and how far apart they are.",
          ar: "تحافظ المواد الصلبة على شكلها لأن جسيماتها مترابطة بقوة. وتنساب السوائل لأن جسيماتها تنزلق بعضها فوق بعض. أما الغازات فتنتشر لتملأ أي وعاء لأن جسيماتها حرة الحركة ومتباعدة. تغيّر الحالة لا يغيّر الجسيمات نفسها، بل يغيّر حركتها والمسافات بينها.",
          fr: "Les solides gardent leur forme car leurs particules sont fortement liées. Les liquides coulent car les particules glissent les unes sur les autres. Les gaz occupent tout le récipient car leurs particules bougent librement et sont éloignées. Un changement d'état ne modifie pas les particules elles-mêmes, seulement leur mouvement et leur écartement.",
        },
        visual: {
          en: "Picture a classroom: in a solid, students sit still at their desks and fidget; in a liquid, they walk around the room; in a gas, they run out into the whole school.",
          ar: "تخيّل صفًا دراسيًا: في الحالة الصلبة يجلس الطلاب على مقاعدهم ويتململون فقط، وفي الحالة السائلة يتجولون داخل الصف، وفي الحالة الغازية ينطلقون إلى المدرسة كلها.",
          fr: "Imagine une classe : dans un solide, les élèves restent assis et gigotent ; dans un liquide, ils circulent dans la salle ; dans un gaz, ils courent dans toute l'école.",
        },
        check: {
          en: "Why can a gas be squashed into a smaller space but a solid cannot?",
          ar: "لماذا يمكن ضغط الغاز في حيّز أصغر بينما لا يمكن ذلك مع المادة الصلبة؟",
          fr: "Pourquoi peut-on comprimer un gaz mais pas un solide ?",
        },
      },
      keys: ["matter", "solid", "liquid", "gas", "particle", "density", "state", "matière", "solide", "liquide", "particule", "masse volumique", "état", "مادة", "صلب", "سائل", "غاز", "جسيمات", "كثافة"],
    },
    {
      id: "forces",
      hue: "#f97316",
      x: 520, y: 440, layer: 1,
      name: { en: "Forces & Motion", ar: "القوى والحركة", fr: "Forces et mouvement" },
      short: { en: "Forces", ar: "القوى", fr: "Forces" },
      desc: {
        en: "Forces are pushes and pulls that change how objects move, as described by Newton's laws.",
        ar: "القوى دفع أو سحب يغيّر حركة الأجسام، كما تصفها قوانين نيوتن.",
        fr: "Les forces sont des poussées et des tractions qui modifient le mouvement des objets, comme le décrivent les lois de Newton.",
      },
      keyIdeas: [
        { icon: "🏒", text: {
          en: "An object keeps moving at the same speed in a straight line unless a force acts on it (Newton's first law).",
          ar: "يبقى الجسم متحركًا بالسرعة نفسها وفي خط مستقيم ما لم تؤثر فيه قوة (قانون نيوتن الأول).",
          fr: "Un objet continue en ligne droite à vitesse constante tant qu'aucune force n'agit sur lui (première loi de Newton).",
        } },
        { icon: "🚗", text: {
          en: "Speed = distance ÷ time, for example 100 m in 20 s is 5 m/s.",
          ar: "السرعة = المسافة ÷ الزمن، فمثلًا 100 م في 20 ث تساوي 5 م/ث.",
          fr: "Vitesse = distance ÷ temps : par exemple 100 m en 20 s donnent 5 m/s.",
        } },
        { icon: "🍎", text: {
          en: "Without air resistance, all objects fall with the same acceleration, whatever their mass.",
          ar: "في غياب مقاومة الهواء تسقط الأجسام كلها بالتسارع نفسه مهما كانت كتلتها.",
          fr: "Sans frottement de l'air, tous les objets tombent avec la même accélération, quelle que soit leur masse.",
        } },
      ],
      explain: {
        basic: {
          en: "A force is needed to start, stop, speed up, slow down or turn an object, not to keep it moving. Things on Earth slow down because friction and air resistance are forces acting against the motion. A bigger net force gives a bigger acceleration, and a heavier object needs more force to get the same acceleration.",
          ar: "نحتاج إلى قوة لبدء حركة الجسم أو إيقافه أو تسريعه أو إبطائه أو تغيير اتجاهه، لا لإبقائه متحركًا. تتباطأ الأجسام على الأرض لأن الاحتكاك ومقاومة الهواء قوى تعاكس الحركة. كلما زادت القوة المحصلة زاد التسارع، والجسم الأثقل يحتاج إلى قوة أكبر ليكتسب التسارع نفسه.",
          fr: "Il faut une force pour démarrer, arrêter, accélérer, ralentir ou tourner un objet, pas pour le maintenir en mouvement. Sur Terre, les objets ralentissent parce que les frottements s'opposent au mouvement. Plus la force totale est grande, plus l'accélération est grande, et un objet plus lourd demande plus de force pour la même accélération.",
        },
        visual: {
          en: "Slide a cup across a rough table and it stops quickly; slide it on ice and it glides far. The ice did not push it — there was simply less friction to stop it.",
          ar: "إذا دفعت كوبًا على طاولة خشنة توقف بسرعة، أما على الجليد فينزلق مسافة طويلة. الجليد لم يدفعه، بل كان الاحتكاك الذي يوقفه أقل فقط.",
          fr: "Fais glisser une tasse sur une table rugueuse : elle s'arrête vite ; sur la glace, elle glisse loin. La glace ne l'a pas poussée : il y avait juste moins de frottement pour l'arrêter.",
        },
        check: {
          en: "A runner covers 400 m in 80 s. What is her average speed?",
          ar: "قطعت عدّاءة مسافة 400 م في 80 ث. ما سرعتها المتوسطة؟",
          fr: "Une coureuse parcourt 400 m en 80 s. Quelle est sa vitesse moyenne ?",
        },
      },
      keys: ["force", "forces", "motion", "newton", "speed", "friction", "gravity", "mouvement", "vitesse", "frottement", "gravité", "قوة", "قوى", "حركة", "سرعة", "احتكاك", "نيوتن", "جاذبية"],
    },
    {
      id: "energy",
      hue: "#eab308",
      x: 900, y: 220, layer: 2,
      name: { en: "Energy & Work", ar: "الطاقة والشغل", fr: "Énergie et travail" },
      short: { en: "Energy", ar: "الطاقة", fr: "Énergie" },
      desc: {
        en: "Energy is never created or destroyed, only transferred, and work is done when a force moves an object.",
        ar: "الطاقة لا تفنى ولا تُستحدث بل تتحول من شكل إلى آخر، ويُبذل الشغل عندما تحرّك قوةٌ جسمًا.",
        fr: "L'énergie ne se crée ni ne se perd, elle se transforme, et un travail est effectué quand une force déplace un objet.",
      },
      keyIdeas: [
        { icon: "🔋", text: {
          en: "Energy changes form (for example from chemical to kinetic) but the total stays the same.",
          ar: "تتحول الطاقة من شكل إلى آخر (مثل الكيميائية إلى حركية) لكن مجموعها يبقى ثابتًا.",
          fr: "L'énergie change de forme (par exemple chimique en cinétique) mais le total reste le même.",
        } },
        { icon: "📦", text: {
          en: "Work = force × distance moved in the direction of the force, measured in joules (J).",
          ar: "الشغل = القوة × المسافة المقطوعة في اتجاه القوة، ويقاس بالجول (J).",
          fr: "Travail = force × distance parcourue dans le sens de la force, mesuré en joules (J).",
        } },
        { icon: "🎢", text: {
          en: "As an object rises it gains potential energy; as it falls that energy turns into kinetic energy.",
          ar: "عندما يرتفع الجسم يكتسب طاقة وضع، وعندما يسقط تتحول هذه الطاقة إلى طاقة حركية.",
          fr: "Quand un objet monte, il gagne de l'énergie potentielle ; quand il tombe, elle devient énergie cinétique.",
        } },
      ],
      explain: {
        basic: {
          en: "Work is the way a force transfers energy. If you push a box with 10 N for 3 m, you do 30 J of work. If nothing moves, no work is done on the object, even if you feel tired. Energy that seems 'lost' usually becomes heat or sound in the surroundings.",
          ar: "الشغل هو الطريقة التي تنقل بها القوة الطاقة. فإذا دفعت صندوقًا بقوة 10 نيوتن مسافة 3 م، تكون قد بذلت شغلًا مقداره 30 جول. وإذا لم يتحرك الجسم فلا يُبذل عليه شغل حتى لو شعرت بالتعب. والطاقة التي تبدو «مفقودة» تتحول عادة إلى حرارة أو صوت في المحيط.",
          fr: "Le travail est la façon dont une force transfère de l'énergie. Si tu pousses une caisse avec 10 N sur 3 m, tu effectues un travail de 30 J. Si rien ne bouge, aucun travail n'est fait sur l'objet, même si tu es fatigué. L'énergie qui semble « perdue » devient en général chaleur ou son.",
        },
        visual: {
          en: "Energy is like money moving between bank accounts: it moves from 'chemical' to 'kinetic' to 'heat', but the total amount of money never changes.",
          ar: "الطاقة تشبه المال الذي ينتقل بين الحسابات البنكية: ينتقل من حساب «كيميائي» إلى «حركي» ثم إلى «حراري»، لكن المبلغ الكلي لا يتغير أبدًا.",
          fr: "L'énergie, c'est comme de l'argent qui passe d'un compte à l'autre : du compte « chimique » au compte « cinétique » puis « chaleur », mais la somme totale ne change jamais.",
        },
        check: {
          en: "How much work is done lifting a 50 N bag up 2 m?",
          ar: "ما مقدار الشغل المبذول لرفع حقيبة وزنها 50 نيوتن مسافة 2 م إلى أعلى؟",
          fr: "Quel travail faut-il pour soulever un sac de 50 N de 2 m ?",
        },
      },
      keys: ["energy", "work", "joule", "kinetic", "potential", "power", "énergie", "travail", "cinétique", "potentielle", "طاقة", "شغل", "جول", "حركية", "وضع"],
    },
    {
      id: "cells",
      hue: "#22c55e",
      x: 900, y: 440, layer: 2,
      name: { en: "Cells & Living Things", ar: "الخلايا والكائنات الحية", fr: "Cellules et êtres vivants" },
      short: { en: "Cells", ar: "الخلايا", fr: "Cellules" },
      desc: {
        en: "All living things are made of cells, which use matter and energy to grow, respire and reproduce.",
        ar: "تتكوّن الكائنات الحية كلها من خلايا تستخدم المادة والطاقة لتنمو وتتنفس وتتكاثر.",
        fr: "Tous les êtres vivants sont faits de cellules, qui utilisent matière et énergie pour grandir, respirer et se reproduire.",
      },
      keyIdeas: [
        { icon: "🔬", text: {
          en: "The cell is the basic unit of life; most cells can only be seen with a microscope.",
          ar: "الخلية هي الوحدة الأساسية للحياة، ومعظم الخلايا لا تُرى إلا بالمجهر.",
          fr: "La cellule est l'unité de base du vivant ; la plupart ne se voient qu'au microscope.",
        } },
        { icon: "🌿", text: {
          en: "Plant cells have a cell wall and chloroplasts, where photosynthesis turns CO₂ and water into glucose.",
          ar: "للخلايا النباتية جدار خلوي وبلاستيدات خضراء يحدث فيها البناء الضوئي الذي يحوّل CO₂ والماء إلى غلوكوز.",
          fr: "Les cellules végétales ont une paroi et des chloroplastes, où la photosynthèse transforme le CO₂ et l'eau en glucose.",
        } },
        { icon: "⚡", text: {
          en: "Both plant and animal cells release energy from glucose by respiration in their mitochondria.",
          ar: "تحرر الخلايا النباتية والحيوانية كلتاهما الطاقة من الغلوكوز بالتنفس الخلوي في الميتوكندريا.",
          fr: "Les cellules végétales comme animales libèrent l'énergie du glucose par la respiration dans leurs mitochondries.",
        } },
      ],
      explain: {
        basic: {
          en: "Every living thing, from bacteria to people, is built from cells. Each cell has a membrane, cytoplasm and usually a nucleus that holds DNA. Plants build their bodies mostly from carbon dioxide taken from the air during photosynthesis, and all cells respire all the time to release energy.",
          ar: "كل كائن حي، من البكتيريا إلى الإنسان، مبني من خلايا. لكل خلية غشاء وسيتوبلازم، وغالبًا نواة تحمل المادة الوراثية DNA. وتبني النباتات أجسامها في معظمها من ثاني أكسيد الكربون الذي تأخذه من الهواء في أثناء البناء الضوئي، وتتنفس الخلايا كلها باستمرار لتحرر الطاقة.",
          fr: "Tous les êtres vivants, des bactéries aux humains, sont formés de cellules. Chaque cellule a une membrane, un cytoplasme et le plus souvent un noyau qui contient l'ADN. Les plantes construisent leur corps surtout à partir du dioxyde de carbone de l'air grâce à la photosynthèse, et toutes les cellules respirent en permanence pour libérer de l'énergie.",
        },
        visual: {
          en: "A cell is like a small factory: the nucleus is the manager's office, the mitochondria are the power station, and the membrane is the gate that controls what goes in and out.",
          ar: "الخلية تشبه مصنعًا صغيرًا: النواة مكتب المدير، والميتوكندريا محطة توليد الطاقة، والغشاء هو البوابة التي تتحكم فيما يدخل ويخرج.",
          fr: "Une cellule ressemble à une petite usine : le noyau est le bureau du directeur, les mitochondries la centrale électrique, et la membrane la porte qui contrôle les entrées et sorties.",
        },
        check: {
          en: "Name one structure found in plant cells but not in animal cells.",
          ar: "اذكر تركيبًا واحدًا يوجد في الخلية النباتية ولا يوجد في الخلية الحيوانية.",
          fr: "Cite une structure présente dans les cellules végétales mais pas dans les cellules animales.",
        },
      },
      keys: ["cell", "cells", "plant", "animal", "nucleus", "photosynthesis", "respiration", "microscope", "cellule", "noyau", "photosynthèse", "خلية", "خلايا", "نواة", "بناء ضوئي", "تنفس", "مجهر"],
    },
  ],
  edges: [
    ["measure", "matter"],
    ["measure", "forces"],
    ["forces", "energy"],
    ["matter", "energy"],
    ["matter", "cells"],
  ],
  questions: [
    // ---------- measure ----------
    {
      concept: "measure",
      difficulty: 1,
      type: "numeric",
      prompt: NUM,
      display: { en: "2.5 km = ? m", ar: "2.5 كم = ? م", fr: "2.5 km = ? m" },
      answer: 2500,
      hint: {
        en: "One kilometre is 1000 metres. Are metres bigger or smaller than kilometres?",
        ar: "الكيلومتر الواحد يساوي 1000 متر. هل المتر أكبر من الكيلومتر أم أصغر؟",
        fr: "Un kilomètre vaut 1000 mètres. Le mètre est-il plus grand ou plus petit que le kilomètre ?",
      },
      steps: [
        { text: { en: "1 km = 1000 m, and we go from a big unit to a smaller one, so we multiply.", ar: "1 كم = 1000 م، وننتقل من وحدة كبيرة إلى وحدة أصغر، لذا نضرب.", fr: "1 km = 1000 m, et on passe d'une grande unité à une plus petite : on multiplie." } },
        { text: { en: "2.5 × 1000 = 2500 m.", ar: "2.5 × 1000 = 2500 م.", fr: "2.5 × 1000 = 2500 m." } },
      ],
      misconceptions: [
        {
          value: 0.0025, id: "divide-instead-multiply",
          label: { en: "Divided instead of multiplied", ar: "القسمة بدل الضرب", fr: "Division au lieu de multiplication" },
          found: { en: "You divided 2.5 by 1000 and got 0.0025.", ar: "لقد قسمت 2.5 على 1000 فحصلت على 0.0025.", fr: "Tu as divisé 2.5 par 1000 et obtenu 0.0025." },
          why: { en: "A metre is smaller than a kilometre, so there must be more of them. Going to a smaller unit means multiplying.", ar: "المتر أصغر من الكيلومتر، لذا يجب أن يكون عدد الأمتار أكبر. التحويل إلى وحدة أصغر يعني الضرب.", fr: "Le mètre est plus petit que le kilomètre, il en faut donc davantage. Vers une unité plus petite, on multiplie." },
          tags: ["unit-conversion"],
        },
        {
          value: 250, id: "wrong-prefix-factor",
          label: { en: "Used 100 instead of 1000", ar: "استخدام 100 بدل 1000", fr: "100 au lieu de 1000" },
          found: { en: "You multiplied by 100 and got 250, as if km were like cm.", ar: "لقد ضربت في 100 فحصلت على 250، وكأن الكيلومتر مثل السنتيمتر.", fr: "Tu as multiplié par 100 et obtenu 250, comme si le km était le cm." },
          why: { en: "'Kilo' always means 1000, while 'centi' means one hundredth. So 1 km = 1000 m.", ar: "«كيلو» تعني دائمًا 1000، أما «سنتي» فتعني جزءًا من مئة. لذلك 1 كم = 1000 م.", fr: "« Kilo » veut toujours dire 1000, alors que « centi » veut dire un centième. Donc 1 km = 1000 m." },
          tags: ["unit-conversion", "prefixes"],
        },
      ],
    },
    {
      concept: "measure",
      difficulty: 1,
      type: "mc",
      prompt: MC,
      display: { en: "What is the SI unit of mass?", ar: "ما وحدة قياس الكتلة في النظام الدولي؟", fr: "Quelle est l'unité SI de la masse ?" },
      options: [
        { id: "a", text: { en: "Kilogram (kg)", ar: "الكيلوغرام (كغ)", fr: "Le kilogramme (kg)" } },
        { id: "b", text: { en: "Newton (N)", ar: "النيوتن (N)", fr: "Le newton (N)" } },
        { id: "c", text: { en: "Litre (L)", ar: "اللتر (L)", fr: "Le litre (L)" } },
        { id: "d", text: { en: "Metre (m)", ar: "المتر (م)", fr: "Le mètre (m)" } },
      ],
      answer: "a",
      hint: {
        en: "Mass is the amount of matter in an object. Which unit do you see on a bag of rice?",
        ar: "الكتلة هي مقدار المادة في الجسم. ما الوحدة المكتوبة على كيس الأرز؟",
        fr: "La masse est la quantité de matière d'un objet. Quelle unité lis-tu sur un sac de riz ?",
      },
      steps: [
        { text: { en: "Mass measures how much matter something contains.", ar: "الكتلة تقيس مقدار المادة التي يحتويها الجسم.", fr: "La masse mesure la quantité de matière d'un objet." } },
        { text: { en: "Its SI unit is the kilogram; the newton is for forces such as weight.", ar: "وحدتها في النظام الدولي هي الكيلوغرام، أما النيوتن فهو وحدة القوى مثل الوزن.", fr: "Son unité SI est le kilogramme ; le newton sert aux forces comme le poids." } },
      ],
      misconceptions: [
        {
          value: "b", id: "mass-weight",
          label: { en: "Mixed up mass and weight", ar: "الخلط بين الكتلة والوزن", fr: "Confusion masse et poids" },
          found: { en: "You chose the newton, which is the unit of weight and other forces.", ar: "اخترت النيوتن، وهو وحدة الوزن والقوى الأخرى.", fr: "Tu as choisi le newton, qui est l'unité du poids et des autres forces." },
          why: { en: "Weight is the pull of gravity and changes on the Moon; mass is the amount of matter and stays the same, measured in kg.", ar: "الوزن قوة جذب تتغير على القمر، أما الكتلة فهي مقدار المادة ولا تتغير، وتقاس بالكيلوغرام.", fr: "Le poids est l'attraction de la gravité et change sur la Lune ; la masse est la quantité de matière, constante, en kg." },
          tags: ["measurement", "mass-weight"],
        },
        {
          value: "c", id: "mass-volume",
          label: { en: "Mixed up mass and volume", ar: "الخلط بين الكتلة والحجم", fr: "Confusion masse et volume" },
          found: { en: "You chose the litre, which measures volume (space taken up).", ar: "اخترت اللتر، وهو يقيس الحجم أي الحيّز الذي يشغله الجسم.", fr: "Tu as choisi le litre, qui mesure le volume (la place occupée)." },
          why: { en: "Volume is how much space something fills; mass is how much matter it has. A litre of oil and a litre of honey have different masses.", ar: "الحجم هو الحيّز الذي يشغله الجسم، والكتلة هي مقدار المادة فيه. فلتر الزيت ولتر العسل كتلتاهما مختلفتان.", fr: "Le volume est la place occupée ; la masse, la quantité de matière. Un litre d'huile et un litre de miel n'ont pas la même masse." },
          tags: ["measurement"],
        },
      ],
    },
    {
      concept: "measure",
      difficulty: 2,
      type: "mc",
      prompt: MC,
      display: {
        en: "Which has the greater mass: 1 kg of iron or 1 kg of feathers?",
        ar: "أيهما كتلته أكبر: 1 كغ من الحديد أم 1 كغ من الريش؟",
        fr: "Qu'est-ce qui a la plus grande masse : 1 kg de fer ou 1 kg de plumes ?",
      },
      options: [
        { id: "a", text: { en: "The iron", ar: "الحديد", fr: "Le fer" } },
        { id: "b", text: { en: "The feathers", ar: "الريش", fr: "Les plumes" } },
        { id: "c", text: { en: "They have the same mass", ar: "لهما الكتلة نفسها", fr: "Ils ont la même masse" } },
        { id: "d", text: { en: "It depends on their size", ar: "يعتمد ذلك على حجمهما", fr: "Cela dépend de leur taille" } },
      ],
      answer: "c",
      hint: {
        en: "Read the numbers carefully. What does '1 kg' tell you about each one?",
        ar: "اقرأ الأعداد بعناية. ماذا يخبرك «1 كغ» عن كل منهما؟",
        fr: "Lis bien les nombres. Que t'apprend « 1 kg » sur chacun ?",
      },
      steps: [
        { text: { en: "Both are measured as 1 kg, so both have the same mass.", ar: "كلاهما مقداره 1 كغ، إذن لهما الكتلة نفسها.", fr: "Les deux font 1 kg : ils ont donc la même masse." } },
        { text: { en: "Iron is denser, so 1 kg of iron takes up much less space than 1 kg of feathers.", ar: "الحديد أكثر كثافة، لذا يشغل 1 كغ منه حيّزًا أصغر بكثير من 1 كغ من الريش.", fr: "Le fer est plus dense : 1 kg de fer occupe beaucoup moins de place que 1 kg de plumes." } },
      ],
      misconceptions: [
        {
          value: "a", id: "dense-means-heavier",
          label: { en: "Confused density with mass", ar: "الخلط بين الكثافة والكتلة", fr: "Confusion densité et masse" },
          found: { en: "You chose iron, probably because iron feels like a 'heavy' material.", ar: "اخترت الحديد، ربما لأنه يبدو مادة «ثقيلة».", fr: "Tu as choisi le fer, sans doute parce qu'il semble être un matériau « lourd »." },
          why: { en: "Iron is denser — more mass in the same space — but 1 kg is 1 kg whatever it is made of.", ar: "الحديد أكثر كثافة، أي كتلة أكبر في الحيّز نفسه، لكن 1 كغ يبقى 1 كغ مهما كانت مادته.", fr: "Le fer est plus dense — plus de masse dans le même volume —, mais 1 kg reste 1 kg, quelle que soit la matière." },
          tags: ["measurement", "density"],
        },
        {
          value: "d", id: "size-means-mass",
          label: { en: "Thought size decides mass", ar: "الظن أن الحجم يحدد الكتلة", fr: "La taille décide la masse" },
          found: { en: "You chose 'it depends on their size', thinking a bigger pile must have more mass.", ar: "اخترت «يعتمد على حجمهما»، ظنًا أن الكومة الأكبر كتلتها أكبر.", fr: "Tu as choisi « cela dépend de leur taille », en pensant qu'un plus gros tas a plus de masse." },
          why: { en: "The feathers take up more space, but their mass is already given: both are exactly 1 kg.", ar: "يشغل الريش حيّزًا أكبر، لكن كتلته معطاة في السؤال: كلاهما 1 كغ تمامًا.", fr: "Les plumes prennent plus de place, mais leur masse est donnée : les deux font exactement 1 kg." },
          tags: ["measurement", "density"],
        },
      ],
    },

    // ---------- matter ----------
    {
      concept: "matter",
      difficulty: 1,
      type: "mc",
      prompt: MC,
      display: {
        en: "When water boils in a pot, what are the bubbles made of?",
        ar: "عندما يغلي الماء في الوعاء، مِمّ تتكوّن الفقاعات؟",
        fr: "Quand l'eau bout dans une casserole, de quoi sont faites les bulles ?",
      },
      options: [
        { id: "a", text: { en: "Air", ar: "هواء", fr: "D'air" } },
        { id: "b", text: { en: "Water vapour", ar: "بخار ماء", fr: "De vapeur d'eau" } },
        { id: "c", text: { en: "Hydrogen and oxygen gas", ar: "غازا الهيدروجين والأكسجين", fr: "D'hydrogène et d'oxygène" } },
        { id: "d", text: { en: "Heat", ar: "حرارة", fr: "De chaleur" } },
      ],
      answer: "b",
      hint: {
        en: "Boiling is a change of state. What does liquid water turn into?",
        ar: "الغليان تغيّر في حالة المادة. إلى ماذا يتحول الماء السائل؟",
        fr: "L'ébullition est un changement d'état. En quoi l'eau liquide se transforme-t-elle ?",
      },
      steps: [
        { text: { en: "At 100 °C, water particles gain enough energy to escape as a gas.", ar: "عند 100 °س تكتسب جسيمات الماء طاقة كافية لتتحرر على شكل غاز.", fr: "À 100 °C, les particules d'eau ont assez d'énergie pour s'échapper sous forme de gaz." } },
        { text: { en: "The bubbles are pockets of this gas: water vapour. The water molecules themselves do not break apart.", ar: "الفقاعات جيوب من هذا الغاز، أي بخار الماء. وجزيئات الماء نفسها لا تتفكك.", fr: "Les bulles sont des poches de ce gaz : de la vapeur d'eau. Les molécules d'eau ne se cassent pas." } },
      ],
      misconceptions: [
        {
          value: "a", id: "bubbles-are-air",
          label: { en: "Thought bubbles are air", ar: "الظن أن الفقاعات هواء", fr: "Les bulles seraient de l'air" },
          found: { en: "You chose air, maybe because most bubbles you see in daily life contain air.", ar: "اخترت الهواء، ربما لأن معظم الفقاعات التي تراها في حياتك تحتوي على هواء.", fr: "Tu as choisi l'air, peut-être parce que la plupart des bulles du quotidien en contiennent." },
          why: { en: "A few tiny air bubbles appear early, but the big boiling bubbles are water that has turned into gas.", ar: "تظهر في البداية فقاعات هواء صغيرة قليلة، لكن فقاعات الغليان الكبيرة هي ماء تحوّل إلى غاز.", fr: "Quelques petites bulles d'air apparaissent au début, mais les grosses bulles d'ébullition sont de l'eau devenue gaz." },
          tags: ["states-of-matter", "change-of-state"],
        },
        {
          value: "c", id: "boiling-breaks-molecules",
          label: { en: "Thought boiling splits molecules", ar: "الظن أن الغليان يفكك الجزيئات", fr: "L'ébullition casserait les molécules" },
          found: { en: "You chose hydrogen and oxygen, as if boiling breaks water into its elements.", ar: "اخترت الهيدروجين والأكسجين، وكأن الغليان يفكك الماء إلى عناصره.", fr: "Tu as choisi hydrogène et oxygène, comme si l'ébullition décomposait l'eau en ses éléments." },
          why: { en: "Boiling is a physical change: H₂O molecules just move apart. Splitting water needs a chemical reaction such as electrolysis.", ar: "الغليان تغيّر فيزيائي، فجزيئات H₂O تتباعد فقط. أما تفكيك الماء فيحتاج إلى تفاعل كيميائي مثل التحليل الكهربائي.", fr: "L'ébullition est une transformation physique : les molécules H₂O s'écartent seulement. Décomposer l'eau demande une réaction chimique comme l'électrolyse." },
          tags: ["states-of-matter", "physical-chemical-change"],
        },
      ],
    },
    {
      concept: "matter",
      difficulty: 2,
      type: "mc",
      prompt: MC,
      display: {
        en: "A metal rod gets longer when it is heated. Why?",
        ar: "يزداد طول قضيب فلزي عند تسخينه. لماذا؟",
        fr: "Une tige de métal s'allonge quand on la chauffe. Pourquoi ?",
      },
      options: [
        { id: "a", text: { en: "Each particle gets bigger", ar: "يكبر حجم كل جسيم", fr: "Chaque particule grossit" } },
        { id: "b", text: { en: "Particles vibrate more and move further apart", ar: "تهتز الجسيمات أكثر وتتباعد", fr: "Les particules vibrent plus et s'écartent" } },
        { id: "c", text: { en: "New particles are made by the heat", ar: "تُنتج الحرارة جسيمات جديدة", fr: "La chaleur crée de nouvelles particules" } },
        { id: "d", text: { en: "The metal starts turning into a gas", ar: "يبدأ الفلز بالتحول إلى غاز", fr: "Le métal commence à devenir un gaz" } },
      ],
      answer: "b",
      hint: {
        en: "Think about what heating does to the movement of particles, not to their size.",
        ar: "فكّر في أثر التسخين على حركة الجسيمات، لا على حجمها.",
        fr: "Pense à l'effet de la chaleur sur le mouvement des particules, pas sur leur taille.",
      },
      steps: [
        { text: { en: "Heating gives the particles more kinetic energy, so they vibrate more strongly.", ar: "التسخين يمنح الجسيمات طاقة حركية أكبر، فتهتز بقوة أكبر.", fr: "La chaleur donne plus d'énergie cinétique aux particules : elles vibrent plus fort." } },
        { text: { en: "Stronger vibrations push them slightly further apart, so the whole rod expands.", ar: "الاهتزاز الأقوى يباعد بينها قليلًا، فيتمدد القضيب كله.", fr: "Ces vibrations plus fortes les écartent un peu, donc toute la tige se dilate." } },
      ],
      misconceptions: [
        {
          value: "a", id: "particles-expand",
          label: { en: "Thought particles themselves grow", ar: "الظن أن الجسيمات نفسها تكبر", fr: "Les particules grossiraient" },
          found: { en: "You chose 'each particle gets bigger', a very common idea about expansion.", ar: "اخترت «يكبر حجم كل جسيم»، وهي فكرة شائعة جدًا عن التمدد.", fr: "Tu as choisi « chaque particule grossit », une idée très répandue sur la dilatation." },
          why: { en: "Particles keep the same size; it is the spaces between them that grow when they move more.", ar: "تحافظ الجسيمات على حجمها، والذي يزداد هو المسافات بينها عندما تتحرك أكثر.", fr: "Les particules gardent leur taille ; ce sont les espaces entre elles qui augmentent quand elles bougent plus." },
          tags: ["particle-model", "expansion"],
        },
        {
          value: "c", id: "heat-makes-particles",
          label: { en: "Thought heat adds particles", ar: "الظن أن الحرارة تضيف جسيمات", fr: "La chaleur ajouterait des particules" },
          found: { en: "You chose 'new particles are made', as if heat were a substance added to the metal.", ar: "اخترت «تُنتج جسيمات جديدة»، وكأن الحرارة مادة تُضاف إلى الفلز.", fr: "Tu as choisi « de nouvelles particules », comme si la chaleur était une substance ajoutée au métal." },
          why: { en: "Heat is energy, not matter. The number of particles stays the same, so the mass does not change either.", ar: "الحرارة طاقة وليست مادة. يبقى عدد الجسيمات ثابتًا، ولذلك لا تتغير الكتلة أيضًا.", fr: "La chaleur est de l'énergie, pas de la matière. Le nombre de particules ne change pas, la masse non plus." },
          tags: ["particle-model", "heat-energy"],
        },
      ],
    },
    {
      concept: "matter",
      difficulty: 2,
      type: "numeric",
      prompt: NUM,
      display: {
        en: "A stone has a mass of 80 g and a volume of 20 cm³. What is its density in g/cm³?",
        ar: "حجر كتلته 80 غ وحجمه 20 سم³. ما كثافته بوحدة غ/سم³؟",
        fr: "Une pierre a une masse de 80 g et un volume de 20 cm³. Quelle est sa masse volumique en g/cm³ ?",
      },
      answer: 4,
      hint: {
        en: "Density = mass ÷ volume. Look at the unit g/cm³: grams on top, cm³ underneath.",
        ar: "الكثافة = الكتلة ÷ الحجم. انظر إلى الوحدة غ/سم³: الغرام في البسط والسنتيمتر المكعب في المقام.",
        fr: "Masse volumique = masse ÷ volume. Regarde l'unité g/cm³ : les grammes en haut, les cm³ en bas.",
      },
      steps: [
        { text: { en: "Density = mass ÷ volume.", ar: "الكثافة = الكتلة ÷ الحجم.", fr: "Masse volumique = masse ÷ volume." } },
        { text: { en: "80 ÷ 20 = 4 g/cm³.", ar: "80 ÷ 20 = 4 غ/سم³.", fr: "80 ÷ 20 = 4 g/cm³." } },
      ],
      misconceptions: [
        {
          value: 0.25, id: "density-inverted",
          label: { en: "Divided volume by mass", ar: "قسمة الحجم على الكتلة", fr: "Volume divisé par la masse" },
          found: { en: "You divided 20 by 80 and got 0.25.", ar: "لقد قسمت 20 على 80 فحصلت على 0.25.", fr: "Tu as divisé 20 par 80 et obtenu 0.25." },
          why: { en: "Density is mass per unit volume, so mass goes on top. The unit g/cm³ reminds you of the order.", ar: "الكثافة هي الكتلة لكل وحدة حجم، لذا تكون الكتلة في البسط. والوحدة غ/سم³ تذكّرك بالترتيب.", fr: "La masse volumique est la masse par unité de volume : la masse va en haut. L'unité g/cm³ te rappelle l'ordre." },
          tags: ["density", "formula"],
        },
        {
          value: 1600, id: "density-multiplied",
          label: { en: "Multiplied instead of divided", ar: "الضرب بدل القسمة", fr: "Multiplication au lieu de division" },
          found: { en: "You multiplied 80 by 20 and got 1600.", ar: "لقد ضربت 80 في 20 فحصلت على 1600.", fr: "Tu as multiplié 80 par 20 et obtenu 1600." },
          why: { en: "'Per' in 'grams per cm³' means divide. A stone with a density of 1600 g/cm³ would be far heavier than any real material.", ar: "كلمة «لكل» في «غرام لكل سم³» تعني القسمة. وحجر كثافته 1600 غ/سم³ أثقل بكثير من أي مادة حقيقية.", fr: "« Par » dans « grammes par cm³ » veut dire diviser. Une pierre de 1600 g/cm³ serait bien plus lourde que toute matière réelle." },
          tags: ["density", "formula"],
        },
      ],
    },

    // ---------- forces ----------
    {
      concept: "forces",
      difficulty: 1,
      type: "mc",
      prompt: MC,
      display: {
        en: "A heavy steel ball and a light steel ball are dropped from the same height at the same time. Ignoring air resistance, which lands first?",
        ar: "أُسقطت كرة فولاذية ثقيلة وأخرى خفيفة من الارتفاع نفسه وفي اللحظة نفسها. بإهمال مقاومة الهواء، أيهما تصل إلى الأرض أولًا؟",
        fr: "On lâche en même temps, de la même hauteur, une boule d'acier lourde et une légère. Sans frottement de l'air, laquelle arrive en premier ?",
      },
      options: [
        { id: "a", text: { en: "The heavy ball", ar: "الكرة الثقيلة", fr: "La boule lourde" } },
        { id: "b", text: { en: "The light ball", ar: "الكرة الخفيفة", fr: "La boule légère" } },
        { id: "c", text: { en: "They land at the same time", ar: "تصلان في اللحظة نفسها", fr: "Elles arrivent en même temps" } },
        { id: "d", text: { en: "Neither falls without air", ar: "لا تسقط أي منهما من دون هواء", fr: "Aucune ne tombe sans air" } },
      ],
      answer: "c",
      hint: {
        en: "Gravity pulls harder on the heavy ball, but the heavy ball is also harder to speed up.",
        ar: "الجاذبية تشد الكرة الثقيلة بقوة أكبر، لكن تسريع الكرة الثقيلة أصعب أيضًا.",
        fr: "La gravité tire plus fort sur la boule lourde, mais celle-ci est aussi plus difficile à accélérer.",
      },
      steps: [
        { text: { en: "The heavier ball has a bigger weight, but also a bigger mass to accelerate.", ar: "للكرة الأثقل وزن أكبر، لكن لها أيضًا كتلة أكبر تحتاج إلى تسريع.", fr: "La boule lourde a un poids plus grand, mais aussi une masse plus grande à accélérer." } },
        { text: { en: "These cancel out: all objects fall with the same acceleration (about 10 m/s²), so they land together.", ar: "يلغي الأثران أحدهما الآخر، فتسقط الأجسام كلها بالتسارع نفسه (نحو 10 م/ث²) وتصلان معًا.", fr: "Les deux effets se compensent : tout tombe avec la même accélération (environ 10 m/s²), elles arrivent ensemble." } },
      ],
      misconceptions: [
        {
          value: "a", id: "heavier-falls-faster",
          label: { en: "Heavier objects fall faster", ar: "الأثقل يسقط أسرع", fr: "Le plus lourd tombe plus vite" },
          found: { en: "You chose the heavy ball — the same idea people believed for 2000 years, until Galileo tested it.", ar: "اخترت الكرة الثقيلة، وهي الفكرة نفسها التي صدّقها الناس 2000 عام حتى اختبرها غاليليو.", fr: "Tu as choisi la boule lourde — l'idée que l'on a crue pendant 2000 ans, jusqu'à ce que Galilée la teste." },
          why: { en: "Without air resistance, mass does not change how fast things fall. A feather and a hammer dropped on the Moon land together.", ar: "في غياب مقاومة الهواء لا تؤثر الكتلة في سرعة السقوط. فقد سقطت ريشة ومطرقة معًا على سطح القمر.", fr: "Sans air, la masse ne change pas la vitesse de chute. Sur la Lune, une plume et un marteau lâchés tombent ensemble." },
          tags: ["gravity", "free-fall"],
        },
        {
          value: "d", id: "gravity-needs-air",
          label: { en: "Thought gravity needs air", ar: "الظن أن الجاذبية تحتاج إلى هواء", fr: "La gravité aurait besoin d'air" },
          found: { en: "You chose 'neither falls', as if gravity only works when there is air.", ar: "اخترت «لا تسقط أي منهما»، وكأن الجاذبية لا تعمل إلا بوجود الهواء.", fr: "Tu as choisi « aucune ne tombe », comme si la gravité n'agissait qu'avec de l'air." },
          why: { en: "Gravity is a pull between masses and works in a vacuum too; that is why astronauts' tools fall on the Moon.", ar: "الجاذبية قوة تجاذب بين الكتل وتعمل في الفراغ أيضًا، ولهذا تسقط أدوات روّاد الفضاء على سطح القمر.", fr: "La gravité est une attraction entre masses et agit aussi dans le vide ; c'est pourquoi les outils des astronautes tombent sur la Lune." },
          tags: ["gravity"],
        },
      ],
    },
    {
      concept: "forces",
      difficulty: 2,
      type: "mc",
      prompt: MC,
      display: {
        en: "A hockey puck slides across perfectly smooth ice with no friction. What is needed to keep it moving at a constant speed?",
        ar: "ينزلق قرص هوكي على جليد أملس تمامًا بلا احتكاك. ما الذي يلزم لإبقائه متحركًا بسرعة ثابتة؟",
        fr: "Un palet de hockey glisse sur une glace parfaitement lisse, sans frottement. Que faut-il pour qu'il garde une vitesse constante ?",
      },
      options: [
        { id: "a", text: { en: "A constant forward push", ar: "دفع ثابت إلى الأمام", fr: "Une poussée constante vers l'avant" } },
        { id: "b", text: { en: "No force at all", ar: "لا يلزم أي قوة", fr: "Aucune force" } },
        { id: "c", text: { en: "A forward force that keeps increasing", ar: "قوة إلى الأمام تزداد باستمرار", fr: "Une force vers l'avant de plus en plus grande" } },
        { id: "d", text: { en: "The force from the stick, stored inside the puck", ar: "قوة العصا المخزنة داخل القرص", fr: "La force du bâton, stockée dans le palet" } },
      ],
      answer: "b",
      hint: {
        en: "Newton's first law: what happens to a moving object when no forces act on it?",
        ar: "قانون نيوتن الأول: ماذا يحدث لجسم متحرك عندما لا تؤثر فيه أي قوة؟",
        fr: "Première loi de Newton : que devient un objet en mouvement si aucune force n'agit sur lui ?",
      },
      steps: [
        { text: { en: "With no friction, there is no force trying to slow the puck down.", ar: "في غياب الاحتكاك لا توجد قوة تحاول إبطاء القرص.", fr: "Sans frottement, aucune force ne cherche à ralentir le palet." } },
        { text: { en: "By Newton's first law, it keeps moving at the same speed in a straight line by itself.", ar: "وفق قانون نيوتن الأول، يستمر في الحركة بالسرعة نفسها وفي خط مستقيم من تلقاء نفسه.", fr: "D'après la première loi de Newton, il continue tout seul en ligne droite à la même vitesse." } },
      ],
      misconceptions: [
        {
          value: "a", id: "motion-needs-force",
          label: { en: "Motion needs a constant force", ar: "الحركة تحتاج إلى قوة دائمة", fr: "Le mouvement exige une force" },
          found: { en: "You chose a constant push, because on Earth things usually stop when we stop pushing.", ar: "اخترت الدفع الثابت، لأن الأشياء على الأرض تتوقف عادة عندما نتوقف عن دفعها.", fr: "Tu as choisi une poussée constante, car sur Terre les objets s'arrêtent souvent quand on arrête de pousser." },
          why: { en: "Things stop because friction pushes against them. Remove friction and no force is needed to keep moving.", ar: "تتوقف الأشياء لأن الاحتكاك يعاكسها. أزل الاحتكاك ولن تحتاج إلى أي قوة لتستمر الحركة.", fr: "Les objets s'arrêtent à cause des frottements. Sans eux, aucune force n'est nécessaire pour continuer." },
          tags: ["newton-1", "inertia"],
        },
        {
          value: "d", id: "impetus",
          label: { en: "Thought force is stored inside", ar: "الظن أن القوة تُخزَّن داخل الجسم", fr: "Une force stockée dans l'objet" },
          found: { en: "You chose 'force stored in the puck', as if the hit gave it a supply of force that runs out.", ar: "اخترت «قوة مخزنة داخل القرص»، وكأن الضربة أعطته مخزونًا من القوة ينفد مع الوقت.", fr: "Tu as choisi « la force stockée dans le palet », comme si le coup lui donnait une réserve de force qui s'épuise." },
          why: { en: "A force only acts while there is contact or a field. After the stick leaves, the puck moves on because of inertia, not a stored force.", ar: "القوة لا تؤثر إلا في أثناء التلامس أو بوجود مجال. بعد أن تبتعد العصا يستمر القرص بسبب القصور الذاتي، لا بسبب قوة مخزنة.", fr: "Une force n'agit que pendant le contact ou dans un champ. Une fois le bâton parti, le palet avance par inertie, pas grâce à une force stockée." },
          tags: ["newton-1", "inertia"],
        },
      ],
    },
    {
      concept: "forces",
      difficulty: 1,
      type: "numeric",
      prompt: NUM,
      display: {
        en: "A bus travels 150 km in 3 hours. What is its average speed in km/h?",
        ar: "قطعت حافلة 150 كم في 3 ساعات. ما سرعتها المتوسطة بوحدة كم/ساعة؟",
        fr: "Un bus parcourt 150 km en 3 heures. Quelle est sa vitesse moyenne en km/h ?",
      },
      answer: 50,
      hint: {
        en: "Speed = distance ÷ time. The unit km/h tells you: kilometres divided by hours.",
        ar: "السرعة = المسافة ÷ الزمن. والوحدة كم/ساعة تخبرك: كيلومترات مقسومة على ساعات.",
        fr: "Vitesse = distance ÷ temps. L'unité km/h te le dit : des kilomètres divisés par des heures.",
      },
      steps: [
        { text: { en: "Speed = distance ÷ time.", ar: "السرعة = المسافة ÷ الزمن.", fr: "Vitesse = distance ÷ temps." } },
        { text: { en: "150 ÷ 3 = 50 km/h.", ar: "150 ÷ 3 = 50 كم/ساعة.", fr: "150 ÷ 3 = 50 km/h." } },
      ],
      misconceptions: [
        {
          value: 450, id: "speed-multiplied",
          label: { en: "Multiplied distance by time", ar: "ضرب المسافة في الزمن", fr: "Distance multipliée par le temps" },
          found: { en: "You multiplied 150 by 3 and got 450.", ar: "لقد ضربت 150 في 3 فحصلت على 450.", fr: "Tu as multiplié 150 par 3 et obtenu 450." },
          why: { en: "Speed is distance covered in each hour, so we share the distance over the hours: divide.", ar: "السرعة هي المسافة المقطوعة في كل ساعة، لذا نوزّع المسافة على الساعات أي نقسم.", fr: "La vitesse est la distance parcourue en une heure : on répartit la distance sur les heures, donc on divise." },
          tags: ["speed", "formula"],
        },
        {
          value: 0.02, id: "speed-inverted",
          label: { en: "Divided time by distance", ar: "قسمة الزمن على المسافة", fr: "Temps divisé par la distance" },
          found: { en: "You divided 3 by 150 and got 0.02.", ar: "لقد قسمت 3 على 150 فحصلت على 0.02.", fr: "Tu as divisé 3 par 150 et obtenu 0.02." },
          why: { en: "That gives hours per kilometre, not kilometres per hour. Put distance on top.", ar: "هذا يعطي ساعات لكل كيلومتر، لا كيلومترات لكل ساعة. ضع المسافة في البسط.", fr: "Cela donne des heures par kilomètre, pas des kilomètres par heure. Mets la distance en haut." },
          tags: ["speed", "formula"],
        },
      ],
    },

    // ---------- energy ----------
    {
      concept: "energy",
      difficulty: 2,
      type: "numeric",
      prompt: NUM,
      display: {
        en: "You push a box with a force of 20 N for a distance of 5 m. How much work do you do, in joules?",
        ar: "دفعت صندوقًا بقوة 20 نيوتن مسافة 5 م. ما مقدار الشغل الذي بذلته بالجول؟",
        fr: "Tu pousses une caisse avec une force de 20 N sur 5 m. Quel travail effectues-tu, en joules ?",
      },
      answer: 100,
      hint: {
        en: "Work = force × distance moved in the direction of the force.",
        ar: "الشغل = القوة × المسافة المقطوعة في اتجاه القوة.",
        fr: "Travail = force × distance parcourue dans le sens de la force.",
      },
      steps: [
        { text: { en: "Work = force × distance.", ar: "الشغل = القوة × المسافة.", fr: "Travail = force × distance." } },
        { text: { en: "20 N × 5 m = 100 J.", ar: "20 نيوتن × 5 م = 100 جول.", fr: "20 N × 5 m = 100 J." } },
      ],
      misconceptions: [
        {
          value: 4, id: "work-divided",
          label: { en: "Divided force by distance", ar: "قسمة القوة على المسافة", fr: "Force divisée par la distance" },
          found: { en: "You divided 20 by 5 and got 4.", ar: "لقد قسمت 20 على 5 فحصلت على 4.", fr: "Tu as divisé 20 par 5 et obtenu 4." },
          why: { en: "Pushing further takes more energy, so the work must grow with distance: multiply, don't divide.", ar: "الدفع لمسافة أطول يحتاج إلى طاقة أكبر، لذا يزداد الشغل مع المسافة: اضرب ولا تقسم.", fr: "Pousser plus loin demande plus d'énergie, donc le travail augmente avec la distance : on multiplie." },
          tags: ["work", "formula"],
        },
        {
          value: 25, id: "work-added",
          label: { en: "Added force and distance", ar: "جمع القوة والمسافة", fr: "Force et distance additionnées" },
          found: { en: "You added 20 and 5 and got 25.", ar: "لقد جمعت 20 و5 فحصلت على 25.", fr: "Tu as additionné 20 et 5 et obtenu 25." },
          why: { en: "Newtons and metres are different quantities, so they cannot be added. Work is their product: N × m = J.", ar: "النيوتن والمتر كميتان مختلفتان فلا يمكن جمعهما. الشغل هو حاصل ضربهما: نيوتن × م = جول.", fr: "Newtons et mètres sont des grandeurs différentes : on ne peut pas les additionner. Le travail est leur produit : N × m = J." },
          tags: ["work", "formula", "units"],
        },
      ],
    },
    {
      concept: "energy",
      difficulty: 2,
      type: "mc",
      prompt: MC,
      display: {
        en: "Sami holds a heavy bag perfectly still for 10 minutes. How much work does he do on the bag?",
        ar: "يحمل سامي حقيبة ثقيلة دون أن يحرّكها مدة 10 دقائق. ما مقدار الشغل الذي يبذله على الحقيبة؟",
        fr: "Sami tient un sac lourd parfaitement immobile pendant 10 minutes. Quel travail effectue-t-il sur le sac ?",
      },
      options: [
        { id: "a", text: { en: "A lot, because he gets tired", ar: "شغلًا كبيرًا، لأنه يتعب", fr: "Beaucoup, car il se fatigue" } },
        { id: "b", text: { en: "Zero, because the bag does not move", ar: "صفرًا، لأن الحقيبة لا تتحرك", fr: "Zéro, car le sac ne bouge pas" } },
        { id: "c", text: { en: "Weight × time", ar: "الوزن × الزمن", fr: "Poids × temps" } },
        { id: "d", text: { en: "It depends on how strong Sami is", ar: "يعتمد على مدى قوة سامي", fr: "Cela dépend de la force de Sami" } },
      ],
      answer: "b",
      hint: {
        en: "Work = force × distance. What is the distance here?",
        ar: "الشغل = القوة × المسافة. كم المسافة هنا؟",
        fr: "Travail = force × distance. Quelle est la distance ici ?",
      },
      steps: [
        { text: { en: "Sami applies an upward force, but the bag moves 0 m.", ar: "يؤثر سامي بقوة إلى أعلى، لكن الحقيبة تتحرك 0 م.", fr: "Sami exerce une force vers le haut, mais le sac se déplace de 0 m." } },
        { text: { en: "Work = force × 0 = 0 J. His muscles use energy, but none is transferred to the bag.", ar: "الشغل = القوة × 0 = 0 جول. عضلاته تستهلك طاقة، لكن لا تنتقل أي طاقة إلى الحقيبة.", fr: "Travail = force × 0 = 0 J. Ses muscles consomment de l'énergie, mais aucune n'est transférée au sac." } },
      ],
      misconceptions: [
        {
          value: "a", id: "effort-equals-work",
          label: { en: "Thought effort means work", ar: "الظن أن الجهد يعني شغلًا", fr: "L'effort serait du travail" },
          found: { en: "You chose 'a lot', linking work to how tired Sami feels.", ar: "اخترت «شغلًا كبيرًا»، فربطت الشغل بمدى شعور سامي بالتعب.", fr: "Tu as choisi « beaucoup », en reliant le travail à la fatigue de Sami." },
          why: { en: "In physics, work is done only when a force moves something. Tired muscles turn energy into heat, not into work on the bag.", ar: "في الفيزياء لا يُبذل شغل إلا عندما تحرّك قوةٌ جسمًا. العضلات المتعبة تحوّل الطاقة إلى حرارة، لا إلى شغل على الحقيبة.", fr: "En physique, il n'y a travail que si une force déplace quelque chose. Les muscles fatigués transforment l'énergie en chaleur, pas en travail sur le sac." },
          tags: ["work", "everyday-meaning"],
        },
        {
          value: "c", id: "work-uses-time",
          label: { en: "Used time instead of distance", ar: "استخدام الزمن بدل المسافة", fr: "Le temps au lieu de la distance" },
          found: { en: "You chose weight × time, mixing up the work formula with how long he holds it.", ar: "اخترت الوزن × الزمن، فخلطت بين قانون الشغل ومدة الحمل.", fr: "Tu as choisi poids × temps, en confondant la formule du travail avec la durée." },
          why: { en: "Work uses distance, not time: W = F × d. Time matters for power, which is work ÷ time.", ar: "يعتمد الشغل على المسافة لا على الزمن: ش = ق × ف. أما الزمن فيهم في القدرة، وهي الشغل ÷ الزمن.", fr: "Le travail utilise la distance, pas le temps : W = F × d. Le temps intervient dans la puissance, travail ÷ temps." },
          tags: ["work", "power"],
        },
      ],
    },
    {
      concept: "energy",
      difficulty: 3,
      type: "mc",
      prompt: MC,
      display: {
        en: "A ball is thrown straight up. Ignoring air resistance, what has happened to its kinetic energy at the highest point?",
        ar: "قُذفت كرة رأسيًا إلى أعلى. بإهمال مقاومة الهواء، ماذا حدث لطاقتها الحركية عند أعلى نقطة؟",
        fr: "On lance une balle verticalement vers le haut. Sans frottement de l'air, qu'est devenue son énergie cinétique au point le plus haut ?",
      },
      options: [
        { id: "a", text: { en: "It has been used up and is gone", ar: "استُهلكت واختفت", fr: "Elle a été consommée et a disparu" } },
        { id: "b", text: { en: "It has changed into gravitational potential energy", ar: "تحولت إلى طاقة وضع جاذبية", fr: "Elle s'est transformée en énergie potentielle de pesanteur" } },
        { id: "c", text: { en: "It is at its maximum", ar: "تكون في أقصى قيمة لها", fr: "Elle est à son maximum" } },
        { id: "d", text: { en: "It has turned into a force that pulls it down", ar: "تحولت إلى قوة تشدها إلى أسفل", fr: "Elle est devenue une force qui la tire vers le bas" } },
      ],
      answer: "b",
      hint: {
        en: "Energy is never destroyed. The ball has stopped for a moment, but it is now high up.",
        ar: "الطاقة لا تفنى. الكرة توقفت لحظة، لكنها الآن في موضع مرتفع.",
        fr: "L'énergie ne disparaît jamais. La balle s'arrête un instant, mais elle est maintenant en hauteur.",
      },
      steps: [
        { text: { en: "As the ball rises it slows down, so its kinetic energy decreases to zero at the top.", ar: "عندما ترتفع الكرة تتباطأ، فتتناقص طاقتها الحركية حتى تصبح صفرًا عند القمة.", fr: "En montant, la balle ralentit : son énergie cinétique diminue jusqu'à zéro en haut." } },
        { text: { en: "At the same time it gains height, so that energy is now stored as gravitational potential energy.", ar: "وفي الوقت نفسه يزداد ارتفاعها، فتُخزَّن تلك الطاقة على شكل طاقة وضع جاذبية.", fr: "En même temps, elle gagne de la hauteur : cette énergie est stockée sous forme d'énergie potentielle." } },
        { text: { en: "On the way down, the potential energy changes back into kinetic energy.", ar: "وفي أثناء النزول تتحول طاقة الوضع مجددًا إلى طاقة حركية.", fr: "En redescendant, l'énergie potentielle redevient énergie cinétique." } },
      ],
      misconceptions: [
        {
          value: "a", id: "energy-used-up",
          label: { en: "Thought energy gets used up", ar: "الظن أن الطاقة تُستهلك وتفنى", fr: "L'énergie s'épuiserait" },
          found: { en: "You chose 'used up', as if the energy simply disappears when the ball stops.", ar: "اخترت «استُهلكت»، وكأن الطاقة تختفي ببساطة عندما تتوقف الكرة.", fr: "Tu as choisi « consommée », comme si l'énergie disparaissait quand la balle s'arrête." },
          why: { en: "Energy is conserved: it only changes form. Here kinetic energy becomes potential energy, which is why the ball can fall back.", ar: "الطاقة محفوظة وتتحول من شكل إلى آخر فقط. هنا تتحول الطاقة الحركية إلى طاقة وضع، ولهذا تستطيع الكرة السقوط مجددًا.", fr: "L'énergie se conserve : elle change seulement de forme. Ici, l'énergie cinétique devient potentielle, d'où la chute de la balle." },
          tags: ["energy-conservation"],
        },
        {
          value: "d", id: "energy-force-confusion",
          label: { en: "Mixed up energy and force", ar: "الخلط بين الطاقة والقوة", fr: "Confusion énergie et force" },
          found: { en: "You chose 'turned into a force', treating energy and force as the same thing.", ar: "اخترت «تحولت إلى قوة»، فعاملت الطاقة والقوة كأنهما الشيء نفسه.", fr: "Tu as choisi « devenue une force », en traitant énergie et force comme la même chose." },
          why: { en: "Gravity pulls the ball down the whole time; it does not come from the ball's energy. Energy (J) and force (N) are different quantities.", ar: "الجاذبية تشد الكرة إلى أسفل طوال الوقت، ولا تنشأ من طاقة الكرة. فالطاقة (جول) والقوة (نيوتن) كميتان مختلفتان.", fr: "La gravité tire la balle vers le bas tout le temps ; elle ne vient pas de son énergie. L'énergie (J) et la force (N) sont des grandeurs différentes." },
          tags: ["energy-conservation", "force"],
        },
      ],
    },

    // ---------- cells ----------
    {
      concept: "cells",
      difficulty: 1,
      type: "numeric",
      prompt: NUM,
      display: {
        en: "A microscope has a ×10 eyepiece lens and a ×40 objective lens. What is the total magnification?",
        ar: "مجهر قوة تكبير عدسته العينية ×10 وقوة تكبير عدسته الشيئية ×40. ما قوة التكبير الكلية؟",
        fr: "Un microscope a un oculaire ×10 et un objectif ×40. Quel est le grossissement total ?",
      },
      answer: 400,
      hint: {
        en: "The objective magnifies the cell, then the eyepiece magnifies that image again.",
        ar: "العدسة الشيئية تكبّر الخلية، ثم تكبّر العدسة العينية تلك الصورة مرة أخرى.",
        fr: "L'objectif grossit la cellule, puis l'oculaire grossit encore cette image.",
      },
      steps: [
        { text: { en: "Total magnification = eyepiece × objective.", ar: "قوة التكبير الكلية = تكبير العدسة العينية × تكبير العدسة الشيئية.", fr: "Grossissement total = oculaire × objectif." } },
        { text: { en: "10 × 40 = 400, so the cell looks 400 times bigger.", ar: "10 × 40 = 400، أي تبدو الخلية أكبر بـ 400 مرة.", fr: "10 × 40 = 400 : la cellule paraît 400 fois plus grande." } },
      ],
      misconceptions: [
        {
          value: 50, id: "magnification-added",
          label: { en: "Added the two lenses", ar: "جمع تكبير العدستين", fr: "Grossissements additionnés" },
          found: { en: "You added 10 and 40 and got 50.", ar: "لقد جمعت 10 و40 فحصلت على 50.", fr: "Tu as additionné 10 et 40 et obtenu 50." },
          why: { en: "The eyepiece enlarges an image that is already 40 times bigger, so the effects multiply.", ar: "العدسة العينية تكبّر صورة مكبّرة أصلًا 40 مرة، لذا يُضرب التكبيران.", fr: "L'oculaire agrandit une image déjà 40 fois plus grande : les effets se multiplient." },
          tags: ["microscope", "magnification"],
        },
        {
          value: 4, id: "magnification-divided",
          label: { en: "Divided the two lenses", ar: "قسمة تكبير العدستين", fr: "Grossissements divisés" },
          found: { en: "You divided 40 by 10 and got 4.", ar: "لقد قسمت 40 على 10 فحصلت على 4.", fr: "Tu as divisé 40 par 10 et obtenu 4." },
          why: { en: "Each lens makes the image bigger, so the total must be larger than either lens alone.", ar: "كل عدسة تكبّر الصورة، لذا يجب أن يكون التكبير الكلي أكبر من تكبير كل عدسة وحدها.", fr: "Chaque lentille agrandit l'image : le total doit dépasser le grossissement de chaque lentille seule." },
          tags: ["microscope", "magnification"],
        },
      ],
    },
    {
      concept: "cells",
      difficulty: 2,
      type: "mc",
      prompt: MC,
      display: {
        en: "A small seed grows into a tree weighing hundreds of kilograms. Where does most of the tree's dry mass come from?",
        ar: "تنمو بذرة صغيرة لتصبح شجرة كتلتها مئات الكيلوغرامات. من أين تأتي معظم الكتلة الجافة للشجرة؟",
        fr: "Une petite graine devient un arbre de plusieurs centaines de kilos. D'où vient la plus grande partie de la masse sèche de l'arbre ?",
      },
      options: [
        { id: "a", text: { en: "Minerals and nutrients from the soil", ar: "الأملاح المعدنية والمغذيات من التربة", fr: "Des minéraux et nutriments du sol" } },
        { id: "b", text: { en: "Water absorbed by the roots", ar: "الماء الذي تمتصه الجذور", fr: "De l'eau absorbée par les racines" } },
        { id: "c", text: { en: "Carbon dioxide from the air", ar: "ثاني أكسيد الكربون من الهواء", fr: "Du dioxyde de carbone de l'air" } },
        { id: "d", text: { en: "Sunlight", ar: "ضوء الشمس", fr: "De la lumière du soleil" } },
      ],
      answer: "c",
      hint: {
        en: "Dry wood is mostly made of carbon compounds. Where does a plant get its carbon?",
        ar: "يتكوّن الخشب الجاف في معظمه من مركبات الكربون. من أين يحصل النبات على الكربون؟",
        fr: "Le bois sec est surtout fait de composés du carbone. Où la plante trouve-t-elle son carbone ?",
      },
      steps: [
        { text: { en: "In photosynthesis, leaves take in CO₂ from the air and combine it with water to make glucose.", ar: "في البناء الضوئي تأخذ الأوراق CO₂ من الهواء وتجمعه مع الماء لتصنع الغلوكوز.", fr: "Par la photosynthèse, les feuilles captent le CO₂ de l'air et le combinent avec l'eau pour faire du glucose." } },
        { text: { en: "Glucose is used to build cellulose and wood, so most of the dry mass is carbon that came from the air.", ar: "يُستخدم الغلوكوز في بناء السليلوز والخشب، لذا فإن معظم الكتلة الجافة كربون مصدره الهواء.", fr: "Le glucose sert à fabriquer la cellulose et le bois : la majeure partie de la masse sèche est du carbone venu de l'air." } },
      ],
      misconceptions: [
        {
          value: "a", id: "plant-mass-from-soil",
          label: { en: "Thought plant mass comes from soil", ar: "الظن أن كتلة النبات من التربة", fr: "La masse viendrait du sol" },
          found: { en: "You chose the soil — many people think so, because roots are in the ground.", ar: "اخترت التربة، وكثيرون يظنون ذلك لأن الجذور مغروسة فيها.", fr: "Tu as choisi le sol — beaucoup le pensent, car les racines y sont plantées." },
          why: { en: "Soil gives only small amounts of minerals. A famous experiment showed a willow gained 74 kg while the soil lost only a few grams.", ar: "تمنح التربة كميات قليلة فقط من الأملاح المعدنية. وقد أظهرت تجربة شهيرة أن شجرة صفصاف زادت 74 كغ بينما نقصت التربة بضعة غرامات فقط.", fr: "Le sol ne fournit que de petites quantités de minéraux. Une expérience célèbre a montré qu'un saule a pris 74 kg alors que le sol n'a perdu que quelques grammes." },
          tags: ["photosynthesis", "plant-nutrition"],
        },
        {
          value: "d", id: "light-is-matter",
          label: { en: "Thought sunlight becomes mass", ar: "الظن أن الضوء يتحول إلى كتلة", fr: "La lumière deviendrait masse" },
          found: { en: "You chose sunlight. Light is essential for photosynthesis, so this is an easy mix-up.", ar: "اخترت ضوء الشمس. الضوء ضروري للبناء الضوئي، لذا من السهل الوقوع في هذا الخلط.", fr: "Tu as choisi la lumière. Elle est indispensable à la photosynthèse, la confusion est donc facile." },
          why: { en: "Sunlight provides the energy, not the matter. The atoms in wood come from CO₂ and water.", ar: "ضوء الشمس يوفّر الطاقة لا المادة. أما ذرات الخشب فمصدرها CO₂ والماء.", fr: "La lumière apporte l'énergie, pas la matière. Les atomes du bois viennent du CO₂ et de l'eau." },
          tags: ["photosynthesis", "matter-energy"],
        },
      ],
    },
    {
      concept: "cells",
      difficulty: 3,
      type: "mc",
      prompt: MC,
      display: {
        en: "Plant cells make glucose by photosynthesis. How do plant cells release the energy stored in that glucose?",
        ar: "تصنع الخلايا النباتية الغلوكوز بالبناء الضوئي. كيف تحرر الخلايا النباتية الطاقة المخزنة في هذا الغلوكوز؟",
        fr: "Les cellules végétales fabriquent du glucose par photosynthèse. Comment libèrent-elles l'énergie stockée dans ce glucose ?",
      },
      options: [
        { id: "a", text: { en: "They don't need to — plants get all their energy straight from sunlight", ar: "لا تحتاج إلى ذلك، فالنباتات تأخذ طاقتها كلها من ضوء الشمس مباشرة", fr: "Elles n'en ont pas besoin : les plantes tirent toute leur énergie du soleil" } },
        { id: "b", text: { en: "By respiration in their mitochondria, day and night", ar: "بالتنفس الخلوي في الميتوكندريا ليلًا ونهارًا", fr: "Par la respiration dans leurs mitochondries, jour et nuit" } },
        { id: "c", text: { en: "By respiration, but only at night when there is no light", ar: "بالتنفس الخلوي، لكن ليلًا فقط عند غياب الضوء", fr: "Par la respiration, mais seulement la nuit, sans lumière" } },
        { id: "d", text: { en: "By absorbing energy from the soil through the roots", ar: "بامتصاص الطاقة من التربة عن طريق الجذور", fr: "En absorbant l'énergie du sol par les racines" } },
      ],
      answer: "b",
      hint: {
        en: "Root cells are underground in the dark, yet they are alive and working. Where does their energy come from?",
        ar: "خلايا الجذور تحت الأرض في الظلام، ومع ذلك فهي حية وتعمل. من أين تأتي طاقتها؟",
        fr: "Les cellules des racines sont sous terre, dans le noir, et pourtant elles vivent et travaillent. D'où vient leur énergie ?",
      },
      steps: [
        { text: { en: "Like animal cells, plant cells contain mitochondria, where glucose is broken down by respiration.", ar: "تحتوي الخلايا النباتية، مثل الحيوانية، على ميتوكندريا يتحلل فيها الغلوكوز بالتنفس الخلوي.", fr: "Comme les cellules animales, les cellules végétales ont des mitochondries où le glucose est dégradé par la respiration." } },
        { text: { en: "Cells need energy all the time, so plants respire day and night; in daylight photosynthesis is simply faster.", ar: "تحتاج الخلايا إلى الطاقة طوال الوقت، لذا تتنفس النباتات ليلًا ونهارًا، لكن البناء الضوئي يكون أسرع في النهار.", fr: "Les cellules ont toujours besoin d'énergie : les plantes respirent jour et nuit ; le jour, la photosynthèse est simplement plus rapide." } },
      ],
      misconceptions: [
        {
          value: "a", id: "plants-dont-respire",
          label: { en: "Thought plants don't respire", ar: "الظن أن النباتات لا تتنفس", fr: "Les plantes ne respireraient pas" },
          found: { en: "You chose 'they don't need to', thinking photosynthesis replaces respiration in plants.", ar: "اخترت «لا تحتاج إلى ذلك»، ظنًا أن البناء الضوئي يحلّ محل التنفس في النباتات.", fr: "Tu as choisi « elles n'en ont pas besoin », en pensant que la photosynthèse remplace la respiration." },
          why: { en: "Photosynthesis stores energy in glucose; respiration releases it for the cell to use. Plants do both.", ar: "البناء الضوئي يخزّن الطاقة في الغلوكوز، والتنفس يحررها لتستخدمها الخلية. والنباتات تقوم بالعمليتين معًا.", fr: "La photosynthèse stocke l'énergie dans le glucose ; la respiration la libère pour la cellule. Les plantes font les deux." },
          tags: ["respiration", "photosynthesis"],
        },
        {
          value: "c", id: "plants-respire-at-night",
          label: { en: "Thought respiration is night-only", ar: "الظن أن التنفس ليلي فقط", fr: "Respiration seulement la nuit" },
          found: { en: "You chose 'only at night', maybe because plants give out CO₂ only in the dark.", ar: "اخترت «ليلًا فقط»، ربما لأن النباتات لا تطلق CO₂ إلا في الظلام.", fr: "Tu as choisi « seulement la nuit », peut-être parce que les plantes ne rejettent du CO₂ que dans le noir." },
          why: { en: "Plants respire all the time. In daylight, photosynthesis uses the CO₂ faster than respiration makes it, so we don't notice it.", ar: "تتنفس النباتات طوال الوقت. وفي النهار يستهلك البناء الضوئي CO₂ أسرع مما ينتجه التنفس، فلا نلاحظه.", fr: "Les plantes respirent en permanence. Le jour, la photosynthèse consomme le CO₂ plus vite que la respiration n'en produit, alors on ne le remarque pas." },
          tags: ["respiration", "photosynthesis"],
        },
      ],
    },
  ],
  demo: {
    before: { measure: 66, matter: 58, forces: 40, energy: 50, cells: 62 },
    after: { measure: 86, matter: 80, forces: 74, energy: 72, cells: 83 },
    confidence: { measure: 72, matter: 60, forces: 70, energy: 55, cells: 68 },
  },
};
