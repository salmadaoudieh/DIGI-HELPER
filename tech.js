// Digi Helper — Technology Hub (subject: tech)
// Convention used throughout: 1 byte = 8 bits, 1 KB = 1024 bytes, 1 MB = 1024 KB, 1 GB = 1024 MB.

export default {
  subject: "tech",
  layers: [
    { en: "Foundations", ar: "الأساسيات", fr: "Les bases" },
    { en: "Building blocks", ar: "اللبنات الأساسية", fr: "Les briques" },
    { en: "Putting it to use", ar: "التطبيق العملي", fr: "Mise en pratique" },
  ],

  concepts: [
    {
      id: "binary",
      hue: "#6366f1",
      x: 140, y: 330, layer: 0,
      name: { en: "Binary Numbers", ar: "النظام الثنائي", fr: "Nombres binaires" },
      short: { en: "Binary", ar: "الثنائي", fr: "Binaire" },
      desc: {
        en: "Computers store every number using only the digits 0 and 1, where each place is worth double the place to its right.",
        ar: "يخزّن الحاسوب كل الأعداد باستخدام الرقمين 0 و1 فقط، وكل خانة تساوي ضعف الخانة التي على يمينها.",
        fr: "L'ordinateur enregistre tous les nombres avec seulement 0 et 1, chaque position valant le double de celle à sa droite.",
      },
      keyIdeas: [
        { icon: "🔢", text: {
          en: "Binary uses only two digits: 0 and 1.",
          ar: "يستخدم النظام الثنائي رقمين فقط: 0 و1.",
          fr: "Le binaire n'utilise que deux chiffres : 0 et 1.",
        } },
        { icon: "➡️", text: {
          en: "Place values start at 1 on the RIGHT and double going left: 1, 2, 4, 8, 16…",
          ar: "تبدأ القيم المنزلية بـ 1 من جهة اليمين وتتضاعف كلما اتجهنا يسارًا: 1، 2، 4، 8، 16…",
          fr: "Les valeurs de position commencent à 1 à DROITE et doublent vers la gauche : 1, 2, 4, 8, 16…",
        } },
        { icon: "➕", text: {
          en: "To convert to decimal, add the place values wherever there is a 1.",
          ar: "للتحويل إلى النظام العشري، اجمع القيم المنزلية للخانات التي فيها 1.",
          fr: "Pour convertir en décimal, additionne les valeurs des positions où il y a un 1.",
        } },
      ],
      explain: {
        basic: {
          en: "In decimal each place is worth 10 times more; in binary each place is worth 2 times more. So 1011₂ means 8 + 0 + 2 + 1 = 11.",
          ar: "في النظام العشري تزيد قيمة كل خانة 10 أضعاف، أما في الثنائي فتزيد ضعفين فقط. لذلك 1011₂ تعني 8 + 0 + 2 + 1 = 11.",
          fr: "En décimal, chaque position vaut 10 fois plus ; en binaire, elle vaut 2 fois plus. Ainsi 1011₂ signifie 8 + 0 + 2 + 1 = 11.",
        },
        visual: {
          en: "Picture a row of light switches labelled 8, 4, 2, 1 from left to right. A switch that is ON (1) adds its label to the total.",
          ar: "تخيّل صفًّا من مفاتيح الإضاءة مكتوبًا عليها 8، 4، 2، 1 من اليسار إلى اليمين. كل مفتاح مُشغَّل (1) يضيف الرقم المكتوب عليه إلى المجموع.",
          fr: "Imagine une rangée d'interrupteurs étiquetés 8, 4, 2, 1 de gauche à droite. Chaque interrupteur allumé (1) ajoute son étiquette au total.",
        },
        check: {
          en: "What is the place value of the leftmost digit in a 4-digit binary number?",
          ar: "ما القيمة المنزلية للخانة الموجودة في أقصى اليسار في عدد ثنائي من 4 خانات؟",
          fr: "Quelle est la valeur de position du chiffre le plus à gauche dans un nombre binaire à 4 chiffres ?",
        },
      },
      keys: ["binary", "base 2", "bit", "binaire", "base deux", "ثنائي", "النظام الثنائي", "اثنين"],
    },
    {
      id: "datau",
      hue: "#06b6d4",
      x: 520, y: 220, layer: 1,
      name: { en: "Data Units", ar: "وحدات البيانات", fr: "Unités de données" },
      short: { en: "Data Units", ar: "وحدات البيانات", fr: "Unités" },
      desc: {
        en: "Data is measured in bits and bytes, and bigger units like KB, MB and GB are built from them.",
        ar: "تُقاس البيانات بالبت والبايت، وتُبنى منها وحدات أكبر مثل الكيلوبايت والميغابايت والغيغابايت.",
        fr: "Les données se mesurent en bits et en octets, et les unités plus grandes comme Ko, Mo et Go en sont formées.",
      },
      keyIdeas: [
        { icon: "💡", text: {
          en: "A bit is a single 0 or 1; a byte is a group of 8 bits.",
          ar: "البت هو رقم واحد 0 أو 1، والبايت مجموعة من 8 بتات.",
          fr: "Un bit est un seul 0 ou 1 ; un octet est un groupe de 8 bits.",
        } },
        { icon: "📦", text: {
          en: "In this app, 1 KB = 1024 bytes, 1 MB = 1024 KB and 1 GB = 1024 MB.",
          ar: "في هذا التطبيق نعتمد: 1 كيلوبايت = 1024 بايت، و1 ميغابايت = 1024 كيلوبايت، و1 غيغابايت = 1024 ميغابايت.",
          fr: "Dans cette appli, 1 Ko = 1024 octets, 1 Mo = 1024 Ko et 1 Go = 1024 Mo.",
        } },
        { icon: "🐢", text: {
          en: "Internet speed is usually given in bits per second (Mb/s), file size in bytes (MB) — watch the ×8!",
          ar: "تُعطى سرعة الإنترنت عادةً بالبت في الثانية (Mb/s)، وحجم الملف بالبايت (MB)، فانتبه إلى الضرب في 8!",
          fr: "Le débit Internet est souvent en bits par seconde (Mb/s), la taille d'un fichier en octets (Mo) : attention au ×8 !",
        } },
      ],
      explain: {
        basic: {
          en: "To go from a bigger unit to a smaller one you multiply: bytes × 8 = bits, KB × 1024 = bytes. To go the other way you divide.",
          ar: "للانتقال من وحدة أكبر إلى وحدة أصغر نضرب: البايت × 8 = بت، والكيلوبايت × 1024 = بايت. وللعكس نقسم.",
          fr: "Pour passer d'une grande unité à une plus petite, on multiplie : octets × 8 = bits, Ko × 1024 = octets. Dans l'autre sens, on divise.",
        },
        visual: {
          en: "Think of bits as single eggs and a byte as a carton of 8 eggs. A KB is a big crate holding 1024 cartons.",
          ar: "تخيّل البت بيضة واحدة، والبايت كرتونة فيها 8 بيضات، والكيلوبايت صندوقًا كبيرًا يحوي 1024 كرتونة.",
          fr: "Imagine un bit comme un œuf et un octet comme une boîte de 8 œufs. Un Ko est une grande caisse de 1024 boîtes.",
        },
        check: {
          en: "How many bits are in 2 bytes?",
          ar: "كم بتًّا في 2 بايت؟",
          fr: "Combien de bits y a-t-il dans 2 octets ?",
        },
      },
      keys: ["byte", "bytes", "kb", "mb", "gb", "kilobyte", "megabyte", "octet", "ko", "mo", "go", "بايت", "بت", "كيلوبايت", "ميغابايت", "وحدة"],
    },
    {
      id: "logic",
      hue: "#f59e0b",
      x: 520, y: 440, layer: 1,
      name: { en: "Logic Gates", ar: "البوابات المنطقية", fr: "Portes logiques" },
      short: { en: "Logic Gates", ar: "البوابات", fr: "Portes" },
      desc: {
        en: "Logic gates take true/false inputs (1/0) and give one output using rules like AND, OR and NOT.",
        ar: "تأخذ البوابات المنطقية مُدخلات صحيحة أو خاطئة (1 أو 0) وتعطي مُخرجًا واحدًا وفق قواعد مثل AND وOR وNOT.",
        fr: "Les portes logiques reçoivent des entrées vrai/faux (1/0) et donnent une sortie selon des règles comme AND, OR et NOT.",
      },
      keyIdeas: [
        { icon: "🤝", text: {
          en: "AND gives 1 only when ALL inputs are 1.",
          ar: "تعطي AND القيمة 1 فقط عندما تكون جميع المُدخلات 1.",
          fr: "AND donne 1 seulement quand TOUTES les entrées valent 1.",
        } },
        { icon: "🙋", text: {
          en: "OR gives 1 when AT LEAST ONE input is 1 (including both).",
          ar: "تعطي OR القيمة 1 عندما يكون مُدخل واحد على الأقل يساوي 1 (بما في ذلك كلاهما).",
          fr: "OR donne 1 dès qu'AU MOINS UNE entrée vaut 1 (y compris les deux).",
        } },
        { icon: "🔄", text: {
          en: "NOT flips its input: 1 becomes 0 and 0 becomes 1.",
          ar: "تقلب NOT مُدخلها: يصبح 1 صفرًا ويصبح 0 واحدًا.",
          fr: "NOT inverse son entrée : 1 devient 0 et 0 devient 1.",
        } },
      ],
      explain: {
        basic: {
          en: "Treat 1 as true and 0 as false. 'A AND B' is true only if both are true; 'A OR B' is true if either is true; 'NOT A' is the opposite of A.",
          ar: "اعتبر 1 صحيحًا و0 خاطئًا. العبارة A AND B صحيحة فقط إذا كان الاثنان صحيحين، وA OR B صحيحة إذا كان أحدهما صحيحًا، وNOT A عكس A.",
          fr: "Considère 1 comme vrai et 0 comme faux. « A AND B » est vrai seulement si les deux sont vrais ; « A OR B » est vrai si l'un des deux l'est ; « NOT A » est le contraire de A.",
        },
        visual: {
          en: "AND is like a door with two locks: you need both keys. OR is like a room with two doors: either one lets you in.",
          ar: "بوابة AND مثل باب بقفلين: تحتاج إلى المفتاحين معًا. وبوابة OR مثل غرفة لها بابان: أيّ باب منهما يُدخلك.",
          fr: "AND, c'est une porte à deux serrures : il faut les deux clés. OR, c'est une pièce à deux portes : l'une ou l'autre suffit.",
        },
        check: {
          en: "What is the output of 1 OR 1?",
          ar: "ما ناتج 1 OR 1؟",
          fr: "Quelle est la sortie de 1 OR 1 ?",
        },
      },
      keys: ["logic", "gate", "and", "or", "not", "truth table", "logique", "porte", "table de vérité", "منطق", "بوابة", "جدول الحقيقة", "صواب", "خطأ"],
    },
    {
      id: "algo",
      hue: "#22c55e",
      x: 900, y: 220, layer: 2,
      name: { en: "Algorithms", ar: "الخوارزميات", fr: "Algorithmes" },
      short: { en: "Algorithms", ar: "الخوارزميات", fr: "Algorithmes" },
      desc: {
        en: "An algorithm is a clear list of steps that uses sequence, loops and conditions to solve a problem.",
        ar: "الخوارزمية قائمة واضحة من الخطوات تستخدم التسلسل والتكرار والشروط لحل مشكلة.",
        fr: "Un algorithme est une suite d'étapes claires qui utilise la séquence, les boucles et les conditions pour résoudre un problème.",
      },
      keyIdeas: [
        { icon: "📋", text: {
          en: "Sequence: steps run one after another, from top to bottom.",
          ar: "التسلسل: تُنفَّذ الخطوات واحدة تلو الأخرى من الأعلى إلى الأسفل.",
          fr: "Séquence : les étapes s'exécutent l'une après l'autre, de haut en bas.",
        } },
        { icon: "🔁", text: {
          en: "Loops repeat steps; 'for i ← 2 to 6' runs for 2, 3, 4, 5 and 6 — five times.",
          ar: "التكرار يعيد الخطوات؛ فالحلقة for i ← 2 to 6 تعمل للقيم 2 و3 و4 و5 و6، أي 5 مرات.",
          fr: "Les boucles répètent des étapes ; « for i ← 2 to 6 » tourne pour 2, 3, 4, 5 et 6, soit cinq fois.",
        } },
        { icon: "🔀", text: {
          en: "Conditions (if) decide whether a step runs or is skipped.",
          ar: "الشروط (if) تحدد هل تُنفَّذ الخطوة أم تُتخطّى.",
          fr: "Les conditions (if) décident si une étape s'exécute ou est sautée.",
        } },
      ],
      explain: {
        basic: {
          en: "To trace pseudocode, keep a small table of each variable and update it line by line, exactly as the computer would.",
          ar: "لتتبّع الشيفرة الزائفة، احتفظ بجدول صغير لكل متغير وحدّث قيمته سطرًا بسطر كما يفعل الحاسوب تمامًا.",
          fr: "Pour suivre un pseudo-code, tiens un petit tableau de chaque variable et mets-le à jour ligne par ligne, comme le ferait l'ordinateur.",
        },
        visual: {
          en: "An algorithm is like a recipe: do the steps in order, 'stir 5 times' is a loop, and 'if it is too thick, add water' is a condition.",
          ar: "الخوارزمية مثل وصفة الطبخ: تنفّذ الخطوات بالترتيب، و«حرّك 5 مرات» تكرار، و«إذا كان الخليط سميكًا فأضف الماء» شرط.",
          fr: "Un algorithme, c'est comme une recette : on suit les étapes dans l'ordre, « remuer 5 fois » est une boucle et « si c'est trop épais, ajouter de l'eau » est une condition.",
        },
        check: {
          en: "How many times does 'for i ← 1 to 3' repeat?",
          ar: "كم مرة تتكرر الحلقة for i ← 1 to 3؟",
          fr: "Combien de fois la boucle « for i ← 1 to 3 » se répète-t-elle ?",
        },
      },
      keys: ["algorithm", "loop", "if", "pseudocode", "sequence", "algorithme", "boucle", "condition", "pseudo-code", "خوارزمية", "تكرار", "حلقة", "شرط", "تسلسل"],
    },
    {
      id: "safety",
      hue: "#ef4444",
      x: 900, y: 440, layer: 2,
      name: { en: "Internet & Online Safety", ar: "الأمان على الإنترنت", fr: "Sécurité en ligne" },
      short: { en: "Online Safety", ar: "الأمان الرقمي", fr: "Sécurité" },
      desc: {
        en: "Staying safe online means strong unique passwords, spotting phishing, and protecting your personal information.",
        ar: "يعني الأمان على الإنترنت استخدام كلمات مرور قوية ومختلفة، وكشف رسائل التصيّد، وحماية معلوماتك الشخصية.",
        fr: "Être en sécurité en ligne, c'est utiliser des mots de passe forts et uniques, repérer l'hameçonnage et protéger ses données personnelles.",
      },
      keyIdeas: [
        { icon: "🔑", text: {
          en: "Use a long, different password for every account and turn on two-step verification.",
          ar: "استخدم كلمة مرور طويلة ومختلفة لكل حساب، وفعّل التحقق بخطوتين.",
          fr: "Utilise un mot de passe long et différent pour chaque compte, et active la validation en deux étapes.",
        } },
        { icon: "🎣", text: {
          en: "Phishing messages rush you and ask you to click a link or share a password — don't.",
          ar: "رسائل التصيّد تستعجلك وتطلب منك الضغط على رابط أو مشاركة كلمة المرور، فلا تفعل.",
          fr: "Les messages d'hameçonnage te pressent et te demandent de cliquer ou de donner ton mot de passe : ne le fais pas.",
        } },
        { icon: "🔒", text: {
          en: "A padlock (HTTPS) means the connection is encrypted, not that the site is honest.",
          ar: "رمز القفل (HTTPS) يعني أن الاتصال مُشفَّر، ولا يعني أن الموقع موثوق.",
          fr: "Le cadenas (HTTPS) signifie que la connexion est chiffrée, pas que le site est honnête.",
        } },
      ],
      explain: {
        basic: {
          en: "Attackers often trick people rather than break computers. Check who really sent a message, never share passwords, and keep each account's password unique.",
          ar: "غالبًا ما يخدع المهاجمون الناس بدل اختراق الأجهزة. تأكد من المُرسِل الحقيقي لأي رسالة، ولا تشارك كلمات المرور أبدًا، واجعل لكل حساب كلمة مرور خاصة به.",
          fr: "Les pirates trompent souvent les gens plutôt que de casser les ordinateurs. Vérifie qui a vraiment envoyé un message, ne partage jamais tes mots de passe et garde un mot de passe unique par compte.",
        },
        visual: {
          en: "Reusing one password is like using one key for your house, school locker and bike: lose it once and everything is open.",
          ar: "استخدام كلمة مرور واحدة لكل الحسابات يشبه استخدام مفتاح واحد للبيت وخزانة المدرسة والدراجة: إن ضاع مرة واحدة انفتح كل شيء.",
          fr: "Réutiliser un mot de passe, c'est comme avoir une seule clé pour ta maison, ton casier et ton vélo : si tu la perds, tout est ouvert.",
        },
        check: {
          en: "Does a padlock icon prove a website is not a scam?",
          ar: "هل يُثبت رمز القفل أن الموقع ليس احتياليًّا؟",
          fr: "Le cadenas prouve-t-il qu'un site n'est pas une arnaque ?",
        },
      },
      keys: ["safety", "password", "phishing", "privacy", "https", "scam", "sécurité", "mot de passe", "hameçonnage", "vie privée", "أمان", "كلمة المرور", "تصيد", "خصوصية", "احتيال"],
    },
  ],

  edges: [
    ["binary", "datau"],
    ["binary", "logic"],
    ["logic", "algo"],
    ["datau", "algo"],
    ["datau", "safety"],
  ],

  questions: [
    // ---------- binary ----------
    {
      concept: "binary",
      difficulty: 1,
      type: "numeric",
      prompt: { en: "Convert this binary number to decimal:", ar: "حوّل العدد الثنائي التالي إلى النظام العشري:", fr: "Convertis ce nombre binaire en décimal :" },
      display: { en: "1011₂", ar: "1011₂", fr: "1011₂" },
      answer: 11,
      hint: {
        en: "Write 8, 4, 2, 1 above the digits, starting from the right with 1.",
        ar: "اكتب 8، 4، 2، 1 فوق الخانات، مبتدئًا بـ 1 من جهة اليمين.",
        fr: "Écris 8, 4, 2, 1 au-dessus des chiffres, en commençant par 1 à droite.",
      },
      steps: [
        { text: { en: "Place values from right to left: 1, 2, 4, 8.", ar: "القيم المنزلية من اليمين إلى اليسار: 1، 2، 4، 8.", fr: "Valeurs de position de droite à gauche : 1, 2, 4, 8." } },
        { text: { en: "The 1s sit under 8, 2 and 1.", ar: "الخانات التي فيها 1 تقع تحت 8 و2 و1.", fr: "Les 1 sont sous 8, 2 et 1." } },
        { text: { en: "8 + 2 + 1 = 11.", ar: "8 + 2 + 1 = 11.", fr: "8 + 2 + 1 = 11." } },
      ],
      misconceptions: [
        {
          value: 13,
          id: "binary-left-to-right",
          label: { en: "Read place values left-to-right", ar: "قرأ القيم من اليسار", fr: "Positions lues de gauche à droite" },
          found: {
            en: "You got 13, so you probably gave the leftmost digit the value 1 (1 + 4 + 8).",
            ar: "حصلت على 13، فربما أعطيت الخانة اليسرى القيمة 1 (1 + 4 + 8).",
            fr: "Tu as obtenu 13 : tu as sans doute donné la valeur 1 au chiffre le plus à gauche (1 + 4 + 8).",
          },
          why: {
            en: "The place worth 1 is always on the right, just like the ones place in decimal.",
            ar: "الخانة التي قيمتها 1 تكون دائمًا في اليمين، تمامًا مثل خانة الآحاد في النظام العشري.",
            fr: "La position qui vaut 1 est toujours à droite, comme les unités en décimal.",
          },
          tags: ["place-value", "binary"],
        },
        {
          value: 3,
          id: "binary-count-ones",
          label: { en: "Counted the 1s", ar: "عدّ الآحاد فقط", fr: "A compté les 1" },
          found: {
            en: "You chose 3, which is just how many 1s there are.",
            ar: "اخترت 3، وهو عدد الخانات التي فيها 1 فقط.",
            fr: "Tu as choisi 3, c'est seulement le nombre de 1.",
          },
          why: {
            en: "Each 1 is worth its place value (8, 4, 2 or 1), not just 1.",
            ar: "كل 1 يساوي قيمته المنزلية (8 أو 4 أو 2 أو 1)، وليس 1 فقط.",
            fr: "Chaque 1 vaut sa valeur de position (8, 4, 2 ou 1), pas simplement 1.",
          },
          tags: ["place-value", "binary"],
        },
      ],
    },
    {
      concept: "binary",
      difficulty: 2,
      type: "numeric",
      prompt: { en: "Convert this binary number to decimal:", ar: "حوّل العدد الثنائي التالي إلى النظام العشري:", fr: "Convertis ce nombre binaire en décimal :" },
      display: { en: "11001₂", ar: "11001₂", fr: "11001₂" },
      answer: 25,
      hint: {
        en: "Five digits: the place values are 16, 8, 4, 2, 1.",
        ar: "العدد من خمس خانات، فالقيم المنزلية هي 16، 8، 4، 2، 1.",
        fr: "Cinq chiffres : les valeurs de position sont 16, 8, 4, 2, 1.",
      },
      steps: [
        { text: { en: "Label the digits 16, 8, 4, 2, 1 from left to right.", ar: "ضع فوق الخانات 16، 8، 4، 2، 1 من اليسار إلى اليمين.", fr: "Étiquette les chiffres 16, 8, 4, 2, 1 de gauche à droite." } },
        { text: { en: "The 1s are under 16, 8 and 1.", ar: "الخانات التي فيها 1 تقع تحت 16 و8 و1.", fr: "Les 1 sont sous 16, 8 et 1." } },
        { text: { en: "16 + 8 + 1 = 25.", ar: "16 + 8 + 1 = 25.", fr: "16 + 8 + 1 = 25." } },
      ],
      misconceptions: [
        {
          value: 19,
          id: "binary-left-to-right",
          label: { en: "Read place values left-to-right", ar: "قرأ القيم من اليسار", fr: "Positions lues de gauche à droite" },
          found: {
            en: "You got 19, so you probably counted 1, 2, 4, 8, 16 starting from the left (1 + 2 + 16).",
            ar: "حصلت على 19، فربما عددت 1، 2، 4، 8، 16 بدءًا من اليسار (1 + 2 + 16).",
            fr: "Tu as obtenu 19 : tu as sans doute compté 1, 2, 4, 8, 16 en partant de la gauche (1 + 2 + 16).",
          },
          why: {
            en: "Start at the right with 1 and double as you move left.",
            ar: "ابدأ من اليمين بالقيمة 1 وضاعفها كلما تحركت يسارًا.",
            fr: "Commence à droite par 1 et double en allant vers la gauche.",
          },
          tags: ["place-value", "binary"],
        },
        {
          value: 3,
          id: "binary-count-ones",
          label: { en: "Counted the 1s", ar: "عدّ الآحاد فقط", fr: "A compté les 1" },
          found: {
            en: "You chose 3, which is how many 1s appear in the number.",
            ar: "اخترت 3، وهو عدد مرات ظهور 1 في العدد.",
            fr: "Tu as choisi 3, c'est le nombre de 1 dans le nombre.",
          },
          why: {
            en: "A 1 in a binary place is worth that place's value, so add 16 + 8 + 1.",
            ar: "الرقم 1 في أي خانة يساوي قيمة تلك الخانة، لذا اجمع 16 + 8 + 1.",
            fr: "Un 1 vaut la valeur de sa position : additionne 16 + 8 + 1.",
          },
          tags: ["place-value", "binary"],
        },
      ],
    },
    {
      concept: "binary",
      difficulty: 3,
      type: "mc",
      prompt: { en: "Which binary number equals this decimal number?", ar: "أيّ عدد ثنائي يساوي هذا العدد العشري؟", fr: "Quel nombre binaire est égal à ce nombre décimal ?" },
      display: { en: "13", ar: "13", fr: "13" },
      options: [
        { id: "a", text: { en: "1011₂", ar: "1011₂", fr: "1011₂" } },
        { id: "b", text: { en: "1101₂", ar: "1101₂", fr: "1101₂" } },
        { id: "c", text: { en: "1110₂", ar: "1110₂", fr: "1110₂" } },
        { id: "d", text: { en: "111₂", ar: "111₂", fr: "111₂" } },
      ],
      answer: "b",
      hint: {
        en: "Which of 8, 4, 2, 1 add up to 13?",
        ar: "أيّ القيم من 8، 4، 2، 1 مجموعها 13؟",
        fr: "Lesquels parmi 8, 4, 2, 1 font 13 au total ?",
      },
      steps: [
        { text: { en: "13 = 8 + 4 + 1.", ar: "13 = 8 + 4 + 1.", fr: "13 = 8 + 4 + 1." } },
        { text: { en: "Put 1 under 8, 4 and 1, and 0 under 2: 1101₂.", ar: "ضع 1 تحت 8 و4 و1، وضع 0 تحت 2: 1101₂.", fr: "Mets 1 sous 8, 4 et 1, et 0 sous 2 : 1101₂." } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "binary-remainders-not-reversed",
          label: { en: "Remainders not reversed", ar: "لم يعكس ترتيب البواقي", fr: "Restes non inversés" },
          found: {
            en: "You chose 1011₂: you divided by 2 correctly but wrote the remainders in the order you found them.",
            ar: "اخترت 1011₂: قسمت على 2 بشكل صحيح لكنك كتبت البواقي بترتيب ظهورها.",
            fr: "Tu as choisi 1011₂ : tu as bien divisé par 2, mais tu as écrit les restes dans l'ordre où tu les as trouvés.",
          },
          why: {
            en: "The first remainder is the 1s place (rightmost), so read the remainders from last to first.",
            ar: "الباقي الأول هو خانة الآحاد (أقصى اليمين)، لذا اقرأ البواقي من الأخير إلى الأول.",
            fr: "Le premier reste correspond aux unités (tout à droite) : lis les restes du dernier au premier.",
          },
          tags: ["conversion", "binary"],
        },
        {
          value: "d",
          id: "binary-digit-by-digit",
          label: { en: "Converted each digit separately", ar: "حوّل كل رقم وحده", fr: "Chiffre par chiffre" },
          found: {
            en: "You chose 111₂: it looks like you turned 1 into 1 and 3 into 11, then joined them.",
            ar: "اخترت 111₂: يبدو أنك حوّلت 1 إلى 1 و3 إلى 11 ثم ألصقتهما معًا.",
            fr: "Tu as choisi 111₂ : tu as sans doute converti 1 en 1 et 3 en 11, puis tu les as collés.",
          },
          why: {
            en: "Convert the whole number 13 at once; 111₂ is only 4 + 2 + 1 = 7.",
            ar: "حوّل العدد 13 كاملًا مرة واحدة، فالعدد 111₂ يساوي 4 + 2 + 1 = 7 فقط.",
            fr: "Convertis 13 en entier d'un coup ; 111₂ ne vaut que 4 + 2 + 1 = 7.",
          },
          tags: ["conversion", "binary"],
        },
      ],
    },

    // ---------- datau ----------
    {
      concept: "datau",
      difficulty: 1,
      type: "numeric",
      prompt: { en: "How many bits are in this amount of data?", ar: "كم بتًّا في هذه الكمية من البيانات؟", fr: "Combien de bits y a-t-il dans cette quantité de données ?" },
      display: { en: "6 bytes = ? bits", ar: "6 بايت = ? بت", fr: "6 octets = ? bits" },
      answer: 48,
      hint: {
        en: "One byte is 8 bits.",
        ar: "البايت الواحد يساوي 8 بتات.",
        fr: "Un octet vaut 8 bits.",
      },
      steps: [
        { text: { en: "Bytes → bits: multiply by 8.", ar: "من البايت إلى البت: نضرب في 8.", fr: "Octets → bits : on multiplie par 8." } },
        { text: { en: "6 × 8 = 48 bits.", ar: "6 × 8 = 48 بت.", fr: "6 × 8 = 48 bits." } },
      ],
      misconceptions: [
        {
          value: 0.75,
          id: "bits-bytes-divided",
          label: { en: "Divided instead of multiplied", ar: "قسم بدل أن يضرب", fr: "Division au lieu de multiplication" },
          found: {
            en: "You got 0.75, so you divided 6 by 8.",
            ar: "حصلت على 0.75، أي أنك قسمت 6 على 8.",
            fr: "Tu as obtenu 0.75 : tu as divisé 6 par 8.",
          },
          why: {
            en: "A bit is smaller than a byte, so there are MORE bits: multiply by 8.",
            ar: "البت أصغر من البايت، لذلك يكون عدد البتات أكبر: اضرب في 8.",
            fr: "Le bit est plus petit que l'octet, il y a donc PLUS de bits : multiplie par 8.",
          },
          tags: ["bits-bytes", "units"],
        },
        {
          value: 6,
          id: "bits-equal-bytes",
          label: { en: "Treated bits as bytes", ar: "عامل البت كالبايت", fr: "Bits confondus avec octets" },
          found: {
            en: "You chose 6, as if a bit and a byte were the same size.",
            ar: "اخترت 6، وكأن البت والبايت بالحجم نفسه.",
            fr: "Tu as choisi 6, comme si un bit et un octet avaient la même taille.",
          },
          why: {
            en: "A byte is a group of 8 bits, so every byte holds 8 of them.",
            ar: "البايت مجموعة من 8 بتات، فكل بايت يحتوي على 8 منها.",
            fr: "Un octet est un groupe de 8 bits : chaque octet en contient 8.",
          },
          tags: ["bits-bytes", "units"],
        },
      ],
    },
    {
      concept: "datau",
      difficulty: 2,
      type: "numeric",
      prompt: {
        en: "Convert to bytes (use 1 KB = 1024 bytes):",
        ar: "حوّل إلى بايت (استخدم 1 KB = 1024 بايت):",
        fr: "Convertis en octets (utilise 1 Ko = 1024 octets) :",
      },
      display: { en: "3 KB = ? bytes", ar: "3 KB = ? بايت", fr: "3 Ko = ? octets" },
      answer: 3072,
      hint: {
        en: "Multiply the number of KB by 1024.",
        ar: "اضرب عدد الكيلوبايتات في 1024.",
        fr: "Multiplie le nombre de Ko par 1024.",
      },
      steps: [
        { text: { en: "1 KB = 1024 bytes.", ar: "1 KB = 1024 بايت.", fr: "1 Ko = 1024 octets." } },
        { text: { en: "3 × 1024 = 3072 bytes.", ar: "3 × 1024 = 3072 بايت.", fr: "3 × 1024 = 3072 octets." } },
      ],
      misconceptions: [
        {
          value: 3000,
          id: "kb-1000",
          label: { en: "Used 1000 instead of 1024", ar: "استخدم 1000 بدل 1024", fr: "1000 au lieu de 1024" },
          found: {
            en: "You got 3000, so you used 1 KB = 1000 bytes.",
            ar: "حصلت على 3000، أي أنك اعتبرت 1 KB = 1000 بايت.",
            fr: "Tu as obtenu 3000 : tu as pris 1 Ko = 1000 octets.",
          },
          why: {
            en: "Computers count in powers of 2, so here 1 KB = 2¹⁰ = 1024 bytes.",
            ar: "يعدّ الحاسوب بقوى العدد 2، لذا نعتمد هنا 1 KB = 2¹⁰ = 1024 بايت.",
            fr: "L'ordinateur compte en puissances de 2 : ici 1 Ko = 2¹⁰ = 1024 octets.",
          },
          tags: ["kb-convention", "units"],
        },
        {
          value: 24576,
          id: "bytes-to-bits-extra",
          label: { en: "Converted to bits too", ar: "حوّل إلى بتات أيضًا", fr: "Converti aussi en bits" },
          found: {
            en: "You got 24576, which is 3 × 1024 × 8 — that is the number of bits, not bytes.",
            ar: "حصلت على 24576، أي 3 × 1024 × 8، وهذا عدد البتات وليس البايتات.",
            fr: "Tu as obtenu 24576, soit 3 × 1024 × 8 : c'est le nombre de bits, pas d'octets.",
          },
          why: {
            en: "The question asks for bytes, so stop after multiplying by 1024.",
            ar: "السؤال يطلب البايت، فتوقف بعد الضرب في 1024.",
            fr: "On demande des octets : arrête-toi après avoir multiplié par 1024.",
          },
          tags: ["bits-bytes", "units"],
        },
      ],
    },
    {
      concept: "datau",
      difficulty: 3,
      type: "numeric",
      prompt: {
        en: "How many seconds does this download take? (Mb = megabits, MB = megabytes)",
        ar: "كم ثانية يستغرق هذا التنزيل؟ (Mb = ميغابت، MB = ميغابايت)",
        fr: "Combien de secondes dure ce téléchargement ? (Mb = mégabits, MB = mégaoctets)",
      },
      display: { en: "File: 2 MB\nSpeed: 8 Mb/s", ar: "الملف: 2 MB\nالسرعة: 8 Mb/s", fr: "Fichier : 2 MB\nDébit : 8 Mb/s" },
      answer: 2,
      hint: {
        en: "First turn the file size into megabits: 1 byte = 8 bits.",
        ar: "حوّل حجم الملف أولًا إلى ميغابت: 1 بايت = 8 بت.",
        fr: "Convertis d'abord la taille du fichier en mégabits : 1 octet = 8 bits.",
      },
      steps: [
        { text: { en: "2 MB × 8 = 16 Mb.", ar: "2 MB × 8 = 16 Mb.", fr: "2 MB × 8 = 16 Mb." } },
        { text: { en: "Time = size ÷ speed = 16 ÷ 8 = 2 seconds.", ar: "الزمن = الحجم ÷ السرعة = 16 ÷ 8 = 2 ثانية.", fr: "Temps = taille ÷ débit = 16 ÷ 8 = 2 secondes." } },
      ],
      misconceptions: [
        {
          value: 0.25,
          id: "mb-vs-mbit",
          label: { en: "Mixed up MB and Mb", ar: "خلط بين MB وMb", fr: "Confusion MB et Mb" },
          found: {
            en: "You got 0.25, so you divided 2 by 8 without changing megabytes into megabits.",
            ar: "حصلت على 0.25، أي أنك قسمت 2 على 8 دون تحويل الميغابايت إلى ميغابت.",
            fr: "Tu as obtenu 0.25 : tu as divisé 2 par 8 sans convertir les mégaoctets en mégabits.",
          },
          why: {
            en: "Speed is in bits but the file is in bytes; multiply by 8 first so both use the same unit.",
            ar: "السرعة بالبت والملف بالبايت، فاضرب في 8 أولًا لتصبح الوحدتان متماثلتين.",
            fr: "Le débit est en bits mais le fichier en octets : multiplie d'abord par 8 pour avoir la même unité.",
          },
          tags: ["bits-bytes", "units"],
        },
      ],
    },

    // ---------- logic ----------
    {
      concept: "logic",
      difficulty: 1,
      type: "mc",
      prompt: { en: "What is the output?", ar: "ما المُخرج؟", fr: "Quelle est la sortie ?" },
      display: { en: "1 AND 0", ar: "1 AND 0", fr: "1 AND 0" },
      options: [
        { id: "a", text: { en: "0", ar: "0", fr: "0" } },
        { id: "b", text: { en: "1", ar: "1", fr: "1" } },
        { id: "c", text: { en: "10", ar: "10", fr: "10" } },
        { id: "d", text: { en: "2", ar: "2", fr: "2" } },
      ],
      answer: "a",
      hint: {
        en: "AND needs every input to be 1.",
        ar: "تحتاج AND أن تكون جميع المُدخلات 1.",
        fr: "AND a besoin que toutes les entrées valent 1.",
      },
      steps: [
        { text: { en: "One input is 0.", ar: "أحد المُدخلات يساوي 0.", fr: "Une des entrées vaut 0." } },
        { text: { en: "So AND gives 0.", ar: "إذن تعطي AND القيمة 0.", fr: "Donc AND donne 0." } },
      ],
      misconceptions: [
        {
          value: "b",
          id: "and-or-mixup",
          label: { en: "Mixed up AND with OR", ar: "خلط بين AND وOR", fr: "Confusion AND et OR" },
          found: {
            en: "You chose 1, which is the answer for 1 OR 0.",
            ar: "اخترت 1، وهو ناتج 1 OR 0.",
            fr: "Tu as choisi 1, c'est la réponse de 1 OR 0.",
          },
          why: {
            en: "AND is strict: one 0 is enough to make the output 0.",
            ar: "بوابة AND صارمة: يكفي وجود 0 واحد ليصبح المُخرج 0.",
            fr: "AND est strict : un seul 0 suffit pour que la sortie soit 0.",
          },
          tags: ["and-or", "logic"],
        },
        {
          value: "c",
          id: "logic-joined-digits",
          label: { en: "Joined the inputs", ar: "ألصق المُدخلات معًا", fr: "A collé les entrées" },
          found: {
            en: "You chose 10, as if AND puts the two digits side by side.",
            ar: "اخترت 10، وكأن AND تضع الرقمين بجانب بعضهما.",
            fr: "Tu as choisi 10, comme si AND mettait les deux chiffres côte à côte.",
          },
          why: {
            en: "A logic gate always gives a single output: 0 or 1.",
            ar: "تعطي البوابة المنطقية دائمًا مُخرجًا واحدًا: 0 أو 1.",
            fr: "Une porte logique donne toujours une seule sortie : 0 ou 1.",
          },
          tags: ["logic"],
        },
      ],
    },
    {
      concept: "logic",
      difficulty: 2,
      type: "mc",
      prompt: {
        en: "Which expression gives 1 (true)?",
        ar: "أيّ عبارة تعطي 1 (صحيح)؟",
        fr: "Quelle expression donne 1 (vrai) ?",
      },
      display: { en: "A = 1, B = 0", ar: "A = 1, B = 0", fr: "A = 1, B = 0" },
      options: [
        { id: "a", text: { en: "A AND B", ar: "A AND B", fr: "A AND B" } },
        { id: "b", text: { en: "A OR B", ar: "A OR B", fr: "A OR B" } },
        { id: "c", text: { en: "NOT A", ar: "NOT A", fr: "NOT A" } },
        { id: "d", text: { en: "NOT (A OR B)", ar: "NOT (A OR B)", fr: "NOT (A OR B)" } },
      ],
      answer: "b",
      hint: {
        en: "Work out each expression one by one with A = 1 and B = 0.",
        ar: "احسب كل عبارة على حدة باستخدام A = 1 وB = 0.",
        fr: "Calcule chaque expression une par une avec A = 1 et B = 0.",
      },
      steps: [
        { text: { en: "A AND B = 0; A OR B = 1.", ar: "A AND B = 0؛ A OR B = 1.", fr: "A AND B = 0 ; A OR B = 1." } },
        { text: { en: "NOT A = 0; NOT (A OR B) = NOT 1 = 0.", ar: "NOT A = 0؛ NOT (A OR B) = NOT 1 = 0.", fr: "NOT A = 0 ; NOT (A OR B) = NOT 1 = 0." } },
        { text: { en: "Only A OR B is 1.", ar: "العبارة الوحيدة التي تساوي 1 هي A OR B.", fr: "Seule A OR B vaut 1." } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "and-or-mixup",
          label: { en: "Mixed up AND with OR", ar: "خلط بين AND وOR", fr: "Confusion AND et OR" },
          found: {
            en: "You chose A AND B, as if AND only needs one input to be 1.",
            ar: "اخترت A AND B، وكأن AND تكتفي بأن يكون أحد المُدخلين 1.",
            fr: "Tu as choisi A AND B, comme si AND n'avait besoin que d'une entrée à 1.",
          },
          why: {
            en: "AND needs both inputs to be 1; 'at least one' is the rule for OR.",
            ar: "تحتاج AND أن يكون المُدخلان كلاهما 1، أما قاعدة «واحد على الأقل» فهي لـ OR.",
            fr: "AND exige que les deux entrées valent 1 ; « au moins une », c'est la règle de OR.",
          },
          tags: ["and-or", "logic"],
        },
        {
          value: "d",
          id: "ignored-not",
          label: { en: "Ignored the NOT", ar: "تجاهل NOT", fr: "A ignoré le NOT" },
          found: {
            en: "You chose NOT (A OR B): you found A OR B = 1 but forgot to flip it.",
            ar: "اخترت NOT (A OR B): وجدت أن A OR B = 1 لكنك نسيت أن تقلبها.",
            fr: "Tu as choisi NOT (A OR B) : tu as trouvé A OR B = 1 mais tu as oublié de l'inverser.",
          },
          why: {
            en: "Work out the brackets first, then NOT turns the 1 into 0.",
            ar: "احسب ما بين القوسين أولًا، ثم تقلب NOT القيمة 1 إلى 0.",
            fr: "Calcule d'abord la parenthèse, puis NOT transforme le 1 en 0.",
          },
          tags: ["not", "logic"],
        },
      ],
    },
    {
      concept: "logic",
      difficulty: 3,
      type: "numeric",
      prompt: {
        en: "In the truth table of this gate, how many of the 4 rows give output 1?",
        ar: "في جدول الحقيقة لهذه البوابة، كم صفًّا من الصفوف الأربعة يكون مُخرجه 1؟",
        fr: "Dans la table de vérité de cette porte, combien des 4 lignes donnent la sortie 1 ?",
      },
      display: {
        en: "A OR B\n(A, B) = 00, 01, 10, 11",
        ar: "A OR B\n(A, B) = 00, 01, 10, 11",
        fr: "A OR B\n(A, B) = 00, 01, 10, 11",
      },
      answer: 3,
      hint: {
        en: "OR gives 1 whenever at least one input is 1 — check the row 11 too.",
        ar: "تعطي OR القيمة 1 كلما كان أحد المُدخلات على الأقل 1، وتحقق من الصف 11 أيضًا.",
        fr: "OR donne 1 dès qu'au moins une entrée vaut 1 ; vérifie aussi la ligne 11.",
      },
      steps: [
        { text: { en: "00 → 0, 01 → 1, 10 → 1, 11 → 1.", ar: "00 يعطي 0، و01 يعطي 1، و10 يعطي 1، و11 يعطي 1.", fr: "00 → 0, 01 → 1, 10 → 1, 11 → 1." } },
        { text: { en: "Three rows give 1.", ar: "ثلاثة صفوف تعطي 1.", fr: "Trois lignes donnent 1." } },
      ],
      misconceptions: [
        {
          value: 1,
          id: "and-or-mixup",
          label: { en: "Used the AND rule", ar: "طبّق قاعدة AND", fr: "A appliqué la règle AND" },
          found: {
            en: "You got 1, which is the count for AND (only the row 11).",
            ar: "حصلت على 1، وهو العدد الخاص بـ AND (الصف 11 فقط).",
            fr: "Tu as obtenu 1, c'est le résultat pour AND (seulement la ligne 11).",
          },
          why: {
            en: "OR is generous: any row containing a 1 gives output 1.",
            ar: "بوابة OR متساهلة: أي صف فيه 1 يعطي المُخرج 1.",
            fr: "OR est généreux : toute ligne contenant un 1 donne 1.",
          },
          tags: ["and-or", "logic"],
        },
        {
          value: 2,
          id: "or-as-exclusive",
          label: { en: "Treated OR as 'only one'", ar: "فهم OR «واحد فقط»", fr: "OR compris comme « un seul »" },
          found: {
            en: "You got 2, so you left out the row where both inputs are 1.",
            ar: "حصلت على 2، أي أنك استبعدت الصف الذي يكون فيه المُدخلان كلاهما 1.",
            fr: "Tu as obtenu 2 : tu as exclu la ligne où les deux entrées valent 1.",
          },
          why: {
            en: "In logic, OR includes the case where both are 1 (unlike 'either… or' in everyday speech).",
            ar: "في المنطق تشمل OR الحالة التي يكون فيها الاثنان 1، على عكس «إمّا… أو» في الكلام اليومي.",
            fr: "En logique, OR inclut le cas où les deux valent 1 (contrairement au « ou bien » du langage courant).",
          },
          tags: ["or", "logic"],
        },
      ],
    },

    // ---------- algo ----------
    {
      concept: "algo",
      difficulty: 1,
      type: "mc",
      prompt: { en: "What does this algorithm print?", ar: "ماذا تطبع هذه الخوارزمية؟", fr: "Qu'affiche cet algorithme ?" },
      display: {
        en: "x ← 5\nx ← x + 3\nprint x",
        ar: "x ← 5\nx ← x + 3\nprint x",
        fr: "x ← 5\nx ← x + 3\nprint x",
      },
      options: [
        { id: "a", text: { en: "5", ar: "5", fr: "5" } },
        { id: "b", text: { en: "8", ar: "8", fr: "8" } },
        { id: "c", text: { en: "53", ar: "53", fr: "53" } },
        { id: "d", text: { en: "3", ar: "3", fr: "3" } },
      ],
      answer: "b",
      hint: {
        en: "Run the lines in order and keep track of x.",
        ar: "نفّذ الأسطر بالترتيب وتابع قيمة x.",
        fr: "Exécute les lignes dans l'ordre et suis la valeur de x.",
      },
      steps: [
        { text: { en: "Line 1: x = 5.", ar: "السطر 1: x = 5.", fr: "Ligne 1 : x = 5." } },
        { text: { en: "Line 2: x = 5 + 3 = 8, replacing the old value.", ar: "السطر 2: x = 5 + 3 = 8، وتحلّ محل القيمة القديمة.", fr: "Ligne 2 : x = 5 + 3 = 8, qui remplace l'ancienne valeur." } },
        { text: { en: "Line 3 prints 8.", ar: "السطر 3 يطبع 8.", fr: "La ligne 3 affiche 8." } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "assignment-no-change",
          label: { en: "Thought x never changes", ar: "ظن أن x لا تتغير", fr: "A cru que x ne change pas" },
          found: {
            en: "You chose 5, as if x keeps its first value.",
            ar: "اخترت 5، وكأن x تحتفظ بقيمتها الأولى.",
            fr: "Tu as choisi 5, comme si x gardait sa première valeur.",
          },
          why: {
            en: "x ← x + 3 takes the current x, adds 3, and stores the result back in x.",
            ar: "السطر x ← x + 3 يأخذ قيمة x الحالية ويضيف إليها 3 ثم يخزّن الناتج في x من جديد.",
            fr: "x ← x + 3 prend la valeur actuelle de x, ajoute 3 et range le résultat dans x.",
          },
          tags: ["variables", "sequence"],
        },
        {
          value: "c",
          id: "joined-as-text",
          label: { en: "Joined numbers as text", ar: "ألصق الأرقام كنص", fr: "Nombres collés comme du texte" },
          found: {
            en: "You chose 53, as if + glues the digits together.",
            ar: "اخترت 53، وكأن علامة + تلصق الرقمين معًا.",
            fr: "Tu as choisi 53, comme si + collait les chiffres ensemble.",
          },
          why: {
            en: "x holds a number, so + means ordinary addition: 5 + 3 = 8.",
            ar: "تحمل x عددًا، لذا تعني + الجمع العادي: 5 + 3 = 8.",
            fr: "x contient un nombre, donc + est une addition normale : 5 + 3 = 8.",
          },
          tags: ["variables"],
        },
      ],
    },
    {
      concept: "algo",
      difficulty: 2,
      type: "numeric",
      prompt: { en: "How many numbers does this loop print?", ar: "كم عددًا تطبع هذه الحلقة؟", fr: "Combien de nombres cette boucle affiche-t-elle ?" },
      display: {
        en: "for i ← 2 to 6\n  print i\nend for",
        ar: "for i ← 2 to 6\n  print i\nend for",
        fr: "for i ← 2 to 6\n  print i\nend for",
      },
      answer: 5,
      hint: {
        en: "Write out every value of i, including both 2 and 6.",
        ar: "اكتب كل قيم i، بما فيها 2 و6.",
        fr: "Écris toutes les valeurs de i, y compris 2 et 6.",
      },
      steps: [
        { text: { en: "i takes the values 2, 3, 4, 5, 6.", ar: "تأخذ i القيم 2، 3، 4، 5، 6.", fr: "i prend les valeurs 2, 3, 4, 5, 6." } },
        { text: { en: "That is 6 − 2 + 1 = 5 numbers.", ar: "أي 6 − 2 + 1 = 5 أعداد.", fr: "Cela fait 6 − 2 + 1 = 5 nombres." } },
      ],
      misconceptions: [
        {
          value: 4,
          id: "loop-off-by-one",
          label: { en: "Off-by-one loop count", ar: "خطأ بفارق واحد", fr: "Erreur d'une unité" },
          found: {
            en: "You got 4, so you probably calculated 6 − 2.",
            ar: "حصلت على 4، فربما حسبت 6 − 2.",
            fr: "Tu as obtenu 4 : tu as sans doute calculé 6 − 2.",
          },
          why: {
            en: "Both ends are included, so the count is end − start + 1.",
            ar: "البداية والنهاية كلتاهما مشمولتان، لذا يكون العدد = النهاية − البداية + 1.",
            fr: "Les deux bornes sont incluses : le nombre de tours est fin − début + 1.",
          },
          tags: ["loops", "off-by-one"],
        },
      ],
    },
    {
      concept: "algo",
      difficulty: 3,
      type: "numeric",
      prompt: { en: "Trace the algorithm. What is printed?", ar: "تتبّع الخوارزمية. ما الذي يُطبع؟", fr: "Suis l'algorithme. Qu'est-ce qui est affiché ?" },
      display: {
        en: "total ← 0\nfor i ← 1 to 4\n  if i mod 2 = 0 then\n    total ← total + i\n  end if\nend for\nprint total",
        ar: "total ← 0\nfor i ← 1 to 4\n  if i mod 2 = 0 then\n    total ← total + i\n  end if\nend for\nprint total",
        fr: "total ← 0\nfor i ← 1 to 4\n  if i mod 2 = 0 then\n    total ← total + i\n  end if\nend for\nprint total",
      },
      answer: 6,
      hint: {
        en: "i mod 2 = 0 is true only when i is even.",
        ar: "الشرط i mod 2 = 0 يتحقق فقط عندما يكون i عددًا زوجيًّا.",
        fr: "i mod 2 = 0 est vrai seulement quand i est pair.",
      },
      steps: [
        { text: { en: "i = 1, 2, 3, 4; only 2 and 4 are even.", ar: "i = 1، 2، 3، 4؛ والزوجي منها 2 و4 فقط.", fr: "i = 1, 2, 3, 4 ; seuls 2 et 4 sont pairs." } },
        { text: { en: "total = 0 + 2 + 4 = 6.", ar: "total = 0 + 2 + 4 = 6.", fr: "total = 0 + 2 + 4 = 6." } },
      ],
      misconceptions: [
        {
          value: 10,
          id: "ignored-condition",
          label: { en: "Ignored the if", ar: "تجاهل الشرط", fr: "A ignoré le if" },
          found: {
            en: "You got 10, which is 1 + 2 + 3 + 4 — you added every i.",
            ar: "حصلت على 10، أي 1 + 2 + 3 + 4، فقد جمعت كل قيم i.",
            fr: "Tu as obtenu 10, soit 1 + 2 + 3 + 4 : tu as additionné toutes les valeurs de i.",
          },
          why: {
            en: "The line inside the if runs only when the condition is true, so odd values are skipped.",
            ar: "السطر داخل if يُنفَّذ فقط عندما يتحقق الشرط، لذا تُتخطّى القيم الفردية.",
            fr: "La ligne dans le if ne s'exécute que si la condition est vraie : les valeurs impaires sont sautées.",
          },
          tags: ["conditionals", "tracing"],
        },
        {
          value: 4,
          id: "even-odd-mixup",
          label: { en: "Mixed up even and odd", ar: "خلط بين الزوجي والفردي", fr: "Confusion pair et impair" },
          found: {
            en: "You got 4, which is 1 + 3 — the odd numbers.",
            ar: "حصلت على 4، أي 1 + 3، وهي الأعداد الفردية.",
            fr: "Tu as obtenu 4, soit 1 + 3 : les nombres impairs.",
          },
          why: {
            en: "i mod 2 is the remainder after dividing by 2; it is 0 for even numbers like 2 and 4.",
            ar: "i mod 2 هو باقي القسمة على 2، ويساوي 0 للأعداد الزوجية مثل 2 و4.",
            fr: "i mod 2 est le reste de la division par 2 ; il vaut 0 pour les nombres pairs comme 2 et 4.",
          },
          tags: ["conditionals", "tracing"],
        },
      ],
    },

    // ---------- safety ----------
    {
      concept: "safety",
      difficulty: 1,
      type: "mc",
      prompt: { en: "You get this message. What should you do?", ar: "وصلتك هذه الرسالة. ماذا يجب أن تفعل؟", fr: "Tu reçois ce message. Que dois-tu faire ?" },
      display: {
        en: "From: support@instagrarn-help.com\n\"Your account will be closed in 24 hours! Click here and enter your password.\"",
        ar: "من: support@instagrarn-help.com\n«سيُغلَق حسابك خلال 24 ساعة! اضغط هنا وأدخل كلمة المرور.»",
        fr: "De : support@instagrarn-help.com\n« Ton compte sera fermé dans 24 heures ! Clique ici et saisis ton mot de passe. »",
      },
      options: [
        { id: "a", text: {
          en: "Click the link just to check if it's real",
          ar: "أضغط على الرابط فقط لأتأكد إن كان حقيقيًّا",
          fr: "Cliquer sur le lien juste pour vérifier",
        } },
        { id: "b", text: {
          en: "Reply and ask if the message is real",
          ar: "أردّ على الرسالة وأسأل إن كانت حقيقية",
          fr: "Répondre pour demander si c'est vrai",
        } },
        { id: "c", text: {
          en: "Don't click; open the official app yourself and report the message",
          ar: "لا أضغط؛ أفتح التطبيق الرسمي بنفسي وأبلّغ عن الرسالة",
          fr: "Ne pas cliquer ; ouvrir soi-même l'appli officielle et signaler le message",
        } },
        { id: "d", text: {
          en: "Forward it to friends to warn them",
          ar: "أعيد إرسالها إلى أصدقائي لأحذّرهم",
          fr: "La transférer à des amis pour les prévenir",
        } },
      ],
      answer: "c",
      hint: {
        en: "Look closely at the sender's address and at what it asks you to do.",
        ar: "انظر جيدًا إلى عنوان المُرسِل وإلى ما يطلبه منك.",
        fr: "Regarde bien l'adresse de l'expéditeur et ce qu'on te demande.",
      },
      steps: [
        { text: {
          en: "Warning signs: a fake-looking address ('rn' instead of 'm'), urgency, and a request for your password.",
          ar: "علامات التحذير: عنوان مزيّف (rn بدل m)، واستعجال، وطلب كلمة المرور.",
          fr: "Signes d'alerte : une adresse truquée (« rn » au lieu de « m »), l'urgence et la demande du mot de passe.",
        } },
        { text: {
          en: "Never use the link; go to the real app or site yourself and report it.",
          ar: "لا تستخدم الرابط أبدًا؛ اذهب إلى التطبيق أو الموقع الحقيقي بنفسك وأبلّغ عنها.",
          fr: "N'utilise jamais le lien ; va toi-même sur la vraie appli ou le vrai site et signale-le.",
        } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "click-to-check",
          label: { en: "Clicking 'just to look' is safe", ar: "الضغط «للتأكد» آمن", fr: "Cliquer « pour voir »" },
          found: {
            en: "You chose to click just to check — that is exactly what the scammer wants.",
            ar: "اخترت الضغط على الرابط للتأكد، وهذا بالضبط ما يريده المحتال.",
            fr: "Tu as choisi de cliquer pour vérifier : c'est exactement ce que veut l'arnaqueur.",
          },
          why: {
            en: "Fake pages can look identical to the real ones and steal what you type.",
            ar: "قد تبدو الصفحات المزيّفة مطابقة للحقيقية تمامًا وتسرق ما تكتبه.",
            fr: "Les fausses pages peuvent ressembler parfaitement aux vraies et voler ce que tu tapes.",
          },
          tags: ["phishing", "safety"],
        },
        {
          value: "b",
          id: "reply-to-scammer",
          label: { en: "Asked the scammer directly", ar: "سأل المحتال مباشرة", fr: "A demandé à l'arnaqueur" },
          found: {
            en: "You chose to reply — but the scammer will simply say it's real.",
            ar: "اخترت الرد، لكن المحتال سيقول ببساطة إنها حقيقية.",
            fr: "Tu as choisi de répondre, mais l'arnaqueur dira simplement que c'est vrai.",
          },
          why: {
            en: "Replying also confirms your address is active; check through the official app instead.",
            ar: "الرد يؤكد له أيضًا أن عنوانك مُستخدَم؛ تحقق بدلًا من ذلك عبر التطبيق الرسمي.",
            fr: "Répondre confirme aussi que ton adresse est active ; vérifie plutôt via l'appli officielle.",
          },
          tags: ["phishing", "safety"],
        },
      ],
    },
    {
      concept: "safety",
      difficulty: 2,
      type: "mc",
      prompt: {
        en: "A website shows a padlock and starts with https. What does this tell you?",
        ar: "يظهر رمز القفل في موقع ويبدأ عنوانه بـ https. ماذا يعني ذلك؟",
        fr: "Un site affiche un cadenas et commence par https. Qu'est-ce que cela t'apprend ?",
      },
      display: { en: "🔒 https://", ar: "🔒 https://", fr: "🔒 https://" },
      options: [
        { id: "a", text: {
          en: "The website is safe and trustworthy",
          ar: "الموقع آمن وموثوق",
          fr: "Le site est sûr et digne de confiance",
        } },
        { id: "b", text: {
          en: "Data between you and the site is encrypted, but the site itself could still be fake",
          ar: "البيانات بينك وبين الموقع مُشفَّرة، لكن الموقع نفسه قد يكون مزيّفًا",
          fr: "Les données entre toi et le site sont chiffrées, mais le site lui-même peut être faux",
        } },
        { id: "c", text: {
          en: "The website has been checked for viruses",
          ar: "تم فحص الموقع من الفيروسات",
          fr: "Le site a été vérifié contre les virus",
        } },
        { id: "d", text: {
          en: "The website is approved by the government",
          ar: "الموقع معتمد من الحكومة",
          fr: "Le site est approuvé par l'État",
        } },
      ],
      answer: "b",
      hint: {
        en: "The 's' in https stands for 'secure connection', not 'honest owner'.",
        ar: "الحرف s في https يعني «اتصال آمن»، ولا يعني «مالك أمين».",
        fr: "Le « s » de https signifie « connexion sécurisée », pas « propriétaire honnête ».",
      },
      steps: [
        { text: {
          en: "HTTPS encrypts the data so others on the network can't read it.",
          ar: "يشفّر HTTPS البيانات حتى لا يقرأها الآخرون على الشبكة.",
          fr: "HTTPS chiffre les données pour que personne sur le réseau ne puisse les lire.",
        } },
        { text: {
          en: "Anyone, including scammers, can get a padlock for their site.",
          ar: "يستطيع أي شخص، حتى المحتالون، الحصول على رمز القفل لموقعه.",
          fr: "N'importe qui, même un arnaqueur, peut obtenir un cadenas pour son site.",
        } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "padlock-means-safe",
          label: { en: "Padlock means trustworthy", ar: "القفل يعني الثقة", fr: "Cadenas = site fiable" },
          found: {
            en: "You chose 'safe and trustworthy' — a very common belief, but not true.",
            ar: "اخترت «آمن وموثوق»، وهذا اعتقاد شائع جدًا لكنه غير صحيح.",
            fr: "Tu as choisi « sûr et digne de confiance » : c'est une idée très répandue, mais fausse.",
          },
          why: {
            en: "Many phishing sites use HTTPS; the padlock only protects the connection.",
            ar: "كثير من مواقع التصيّد تستخدم HTTPS، فالقفل يحمي الاتصال فقط.",
            fr: "Beaucoup de sites d'hameçonnage utilisent HTTPS ; le cadenas protège seulement la connexion.",
          },
          tags: ["https", "safety"],
        },
        {
          value: "c",
          id: "padlock-antivirus",
          label: { en: "Padlock means virus-free", ar: "القفل يعني خلوه من الفيروسات", fr: "Cadenas = sans virus" },
          found: {
            en: "You chose 'checked for viruses', but the padlock says nothing about the files on the site.",
            ar: "اخترت «تم فحصه من الفيروسات»، لكن القفل لا يدل على شيء بخصوص ملفات الموقع.",
            fr: "Tu as choisi « vérifié contre les virus », mais le cadenas ne dit rien des fichiers du site.",
          },
          why: {
            en: "Encryption hides data in transit; it does not scan downloads for malware.",
            ar: "التشفير يُخفي البيانات أثناء انتقالها، ولا يفحص الملفات المُنزَّلة من البرمجيات الخبيثة.",
            fr: "Le chiffrement protège les données en transit ; il n'analyse pas les téléchargements.",
          },
          tags: ["https", "safety"],
        },
      ],
    },
    {
      concept: "safety",
      difficulty: 3,
      type: "mc",
      prompt: { en: "What is the best thing to do?", ar: "ما أفضل تصرّف؟", fr: "Quelle est la meilleure chose à faire ?" },
      display: {
        en: "Your game account's password was leaked online.\nYou use the same password for your email and school portal.",
        ar: "تسرّبت كلمة مرور حسابك في إحدى الألعاب على الإنترنت.\nوأنت تستخدم كلمة المرور نفسها لبريدك الإلكتروني ومنصة المدرسة.",
        fr: "Le mot de passe de ton compte de jeu a fuité en ligne.\nTu utilises le même mot de passe pour ta messagerie et l'espace numérique du collège.",
      },
      options: [
        { id: "a", text: {
          en: "Change only the game password",
          ar: "أغيّر كلمة مرور اللعبة فقط",
          fr: "Changer seulement le mot de passe du jeu",
        } },
        { id: "b", text: {
          en: "Do nothing — a game account isn't important",
          ar: "لا أفعل شيئًا، فحساب اللعبة ليس مهمًّا",
          fr: "Ne rien faire : un compte de jeu n'est pas important",
        } },
        { id: "c", text: {
          en: "Delete the game app",
          ar: "أحذف تطبيق اللعبة",
          fr: "Supprimer l'application du jeu",
        } },
        { id: "d", text: {
          en: "Change it on every account that uses it, give each a unique password, and turn on two-step verification",
          ar: "أغيّرها في كل حساب يستخدمها، وأجعل لكل حساب كلمة مرور مختلفة، وأفعّل التحقق بخطوتين",
          fr: "La changer sur tous les comptes qui l'utilisent, mettre un mot de passe unique à chacun et activer la validation en deux étapes",
        } },
      ],
      answer: "d",
      hint: {
        en: "Attackers try a leaked password on many other websites.",
        ar: "يجرّب المهاجمون كلمة المرور المسرّبة على مواقع كثيرة أخرى.",
        fr: "Les pirates essaient un mot de passe volé sur beaucoup d'autres sites.",
      },
      steps: [
        { text: {
          en: "A leaked password is dangerous everywhere it is reused.",
          ar: "كلمة المرور المسرّبة خطيرة في كل مكان أُعيد استخدامها فيه.",
          fr: "Un mot de passe volé est dangereux partout où il est réutilisé.",
        } },
        { text: {
          en: "Unique passwords plus two-step verification stop one leak from opening every account.",
          ar: "كلمات المرور المختلفة مع التحقق بخطوتين تمنع تسريبًا واحدًا من فتح كل الحسابات.",
          fr: "Des mots de passe uniques et la validation en deux étapes empêchent une fuite d'ouvrir tous tes comptes.",
        } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "password-reuse",
          label: { en: "Forgot about reused passwords", ar: "نسي كلمات المرور المكرّرة", fr: "Oubli de la réutilisation" },
          found: {
            en: "You chose to change only the game password, but your email and school portal still use the leaked one.",
            ar: "اخترت تغيير كلمة مرور اللعبة فقط، لكن بريدك ومنصة المدرسة ما زالا يستخدمان الكلمة المسرّبة.",
            fr: "Tu as choisi de changer seulement le mot de passe du jeu, mais ta messagerie et l'espace du collège utilisent toujours celui qui a fuité.",
          },
          why: {
            en: "Attackers test leaked passwords on other sites, so every account sharing it is at risk.",
            ar: "يختبر المهاجمون كلمات المرور المسرّبة على مواقع أخرى، فكل حساب يشاركها في خطر.",
            fr: "Les pirates testent les mots de passe volés sur d'autres sites : chaque compte qui le partage est en danger.",
          },
          tags: ["passwords", "safety"],
        },
        {
          value: "b",
          id: "unimportant-account",
          label: { en: "'Unimportant' accounts don't matter", ar: "الحسابات «غير المهمة» لا تهم", fr: "Compte « sans importance »" },
          found: {
            en: "You chose to do nothing because it's only a game.",
            ar: "اخترت ألّا تفعل شيئًا لأنه مجرد حساب لعبة.",
            fr: "Tu as choisi de ne rien faire parce que ce n'est qu'un jeu.",
          },
          why: {
            en: "The same password unlocks your email, and your email can reset all your other accounts.",
            ar: "كلمة المرور نفسها تفتح بريدك الإلكتروني، والبريد يمكنه إعادة تعيين كل حساباتك الأخرى.",
            fr: "Le même mot de passe ouvre ta messagerie, et ta messagerie permet de réinitialiser tous tes autres comptes.",
          },
          tags: ["passwords", "safety"],
        },
      ],
    },
  ],

  demo: {
    before: { binary: 60, datau: 50, logic: 55, algo: 40, safety: 65 },
    after: { binary: 82, datau: 76, logic: 80, algo: 72, safety: 88 },
    confidence: { binary: 70, datau: 60, logic: 65, algo: 70, safety: 90 },
  },
};
