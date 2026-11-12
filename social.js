// Social Studies World — subject bank (see SCHEMA.md)
export default {
  subject: "social",
  layers: [
    { en: "Foundations", ar: "الأساسيات", fr: "Bases" },
    { en: "Earth & Society", ar: "الأرض والمجتمع", fr: "Terre et société" },
    { en: "Decisions", ar: "القرارات", fr: "Décisions" },
  ],
  concepts: [
    {
      id: "maps",
      hue: "#14b8a6",
      x: 140, y: 200, layer: 0,
      name: { en: "Maps & Coordinates", ar: "الخرائط والإحداثيات", fr: "Cartes et coordonnées" },
      short: { en: "Maps", ar: "الخرائط", fr: "Cartes" },
      desc: {
        en: "Use latitude, longitude and map scale to locate places and measure real distances.",
        ar: "استخدام دوائر العرض وخطوط الطول ومقياس الرسم لتحديد المواقع وقياس المسافات الحقيقية.",
        fr: "Utiliser la latitude, la longitude et l'échelle pour situer des lieux et mesurer des distances réelles.",
      },
      keyIdeas: [
        { icon: "🌐", text: {
          en: "Latitude measures how far north or south of the Equator a place is.",
          ar: "تقيس دائرة العرض بُعد المكان شمال خط الاستواء أو جنوبه.",
          fr: "La latitude mesure la distance d'un lieu au nord ou au sud de l'équateur.",
        } },
        { icon: "🧭", text: {
          en: "Longitude measures how far east or west of the Prime Meridian a place is.",
          ar: "يقيس خط الطول بُعد المكان شرق خط غرينتش أو غربه.",
          fr: "La longitude mesure la distance d'un lieu à l'est ou à l'ouest du méridien de Greenwich.",
        } },
        { icon: "📏", text: {
          en: "A scale such as 1 : 100,000 means 1 cm on the map equals 100,000 cm (1 km) in reality.",
          ar: "مقياس الرسم 1 : 100,000 يعني أن 1 سم على الخريطة يساوي 100,000 سم (1 كم) في الواقع.",
          fr: "Une échelle de 1 : 100 000 signifie que 1 cm sur la carte vaut 100 000 cm (1 km) en réalité.",
        } },
      ],
      explain: {
        basic: {
          en: "Every place on Earth has an address made of two numbers: latitude (north–south) and longitude (east–west). A map scale tells you how to turn map centimetres into real distance.",
          ar: "لكل مكان على الأرض عنوان من رقمين: دائرة العرض (شمال–جنوب) وخط الطول (شرق–غرب). ويخبرك مقياس الرسم كيف تحوّل السنتيمترات على الخريطة إلى مسافة حقيقية.",
          fr: "Chaque lieu sur Terre a une adresse faite de deux nombres : la latitude (nord–sud) et la longitude (est–ouest). L'échelle indique comment transformer les centimètres de la carte en distance réelle.",
        },
        visual: {
          en: "Think of a ladder lying on the globe: latitude lines are the flat rungs (you climb north or south), longitude lines are the long poles running from pole to pole.",
          ar: "تخيّل سُلّمًا ممدودًا على الكرة الأرضية: دوائر العرض هي الدرجات الأفقية (تصعد بها شمالًا أو جنوبًا)، وخطوط الطول هي الأعمدة الطويلة الممتدة من قطب إلى قطب.",
          fr: "Imagine une échelle posée sur le globe : les parallèles (latitude) sont les barreaux horizontaux, les méridiens (longitude) sont les longs montants qui vont d'un pôle à l'autre.",
        },
        check: {
          en: "If two cities have the same latitude but different longitudes, are they side by side east–west or north–south?",
          ar: "إذا كان لمدينتين دائرة العرض نفسها وخطا طول مختلفان، فهل تقعان متجاورتين شرقًا–غربًا أم شمالًا–جنوبًا؟",
          fr: "Si deux villes ont la même latitude mais des longitudes différentes, sont-elles alignées est–ouest ou nord–sud ?",
        },
      },
      keys: ["map", "maps", "latitude", "longitude", "scale", "coordinate", "carte", "échelle", "coordonnées", "خريطة", "خرائط", "دائرة العرض", "خط الطول", "مقياس الرسم", "إحداثيات"],
    },
    {
      id: "timeline",
      hue: "#f59e0b",
      x: 140, y: 440, layer: 0,
      name: { en: "Timelines & Chronology", ar: "الخطوط الزمنية والتسلسل الزمني", fr: "Frises et chronologie" },
      short: { en: "Timelines", ar: "الخط الزمني", fr: "Chronologie" },
      desc: {
        en: "Place events in order, count years across BCE and CE, and name the century of any year.",
        ar: "ترتيب الأحداث، وحساب السنوات بين ما قبل الميلاد وما بعده، وتحديد القرن الذي تقع فيه أي سنة.",
        fr: "Ordonner des événements, compter les années entre av. J.-C. et apr. J.-C., et trouver le siècle d'une année.",
      },
      keyIdeas: [
        { icon: "⏳", text: {
          en: "BCE years count down toward year 1 CE, so 300 BCE is earlier than 100 BCE.",
          ar: "سنوات ما قبل الميلاد تتناقص باتجاه سنة 1 م، لذلك فإن 300 ق.م أقدم من 100 ق.م.",
          fr: "Les années av. J.-C. diminuent vers l'an 1 apr. J.-C. : 300 av. J.-C. est donc plus ancien que 100 av. J.-C.",
        } },
        { icon: "➕", text: {
          en: "To find the gap between a BCE year and a CE year, add the two numbers.",
          ar: "لإيجاد المدة بين سنة قبل الميلاد وسنة بعد الميلاد، نجمع العددين.",
          fr: "Pour trouver l'écart entre une année av. J.-C. et une année apr. J.-C., on additionne les deux nombres.",
        } },
        { icon: "💯", text: {
          en: "The 15th century covers the years 1401–1500, so most of its years start with 14.",
          ar: "يمتد القرن الخامس عشر من سنة 1401 إلى سنة 1500، لذلك تبدأ معظم سنواته بالرقمين 14.",
          fr: "Le XVe siècle couvre les années 1401 à 1500 : la plupart de ses années commencent donc par 14.",
        } },
      ],
      explain: {
        basic: {
          en: "A timeline is a number line for history. CE years go up to the right; BCE years go up to the left, away from year 1. A century is a block of 100 years, and its number is one more than the first digits of most of its years.",
          ar: "الخط الزمني هو خط أعداد للتاريخ. سنوات الميلاد تزداد نحو اليمين، وسنوات ما قبل الميلاد تزداد نحو اليسار مبتعدة عن سنة 1. والقرن مدة مئة سنة، ورقمه يزيد واحدًا على الرقمين الأولين لمعظم سنواته.",
          fr: "Une frise chronologique est une droite graduée pour l'histoire. Les années apr. J.-C. augmentent vers la droite ; les années av. J.-C. augmentent vers la gauche, en s'éloignant de l'an 1. Un siècle dure 100 ans, et son numéro dépasse d'un les premiers chiffres de la plupart de ses années.",
        },
        visual: {
          en: "Picture a thermometer: CE years are like temperatures above zero and BCE years like temperatures below zero. Going from −500 to +300 means climbing 500 and then 300 more.",
          ar: "تخيّل ميزان حرارة: سنوات الميلاد كالدرجات فوق الصفر، وسنوات ما قبل الميلاد كالدرجات تحت الصفر. الانتقال من −500 إلى +300 يعني أن ترتفع 500 ثم 300 أخرى.",
          fr: "Imagine un thermomètre : les années apr. J.-C. sont comme des températures positives et les années av. J.-C. comme des températures négatives. Passer de −500 à +300, c'est monter de 500 puis encore de 300.",
        },
        check: {
          en: "Which happened first: an event in 200 BCE or an event in 150 BCE?",
          ar: "أيهما حدث أولًا: حدث في سنة 200 ق.م أم حدث في سنة 150 ق.م؟",
          fr: "Lequel a eu lieu en premier : un événement en 200 av. J.-C. ou un événement en 150 av. J.-C. ?",
        },
      },
      keys: ["timeline", "century", "bce", "ce", "chronology", "date", "siècle", "frise", "chronologie", "av. j.-c.", "خط زمني", "قرن", "ق.م", "تسلسل", "تاريخ"],
    },
    {
      id: "climate",
      hue: "#3b82f6",
      x: 520, y: 200, layer: 1,
      name: { en: "Geography & Climate", ar: "الجغرافيا والمناخ", fr: "Géographie et climat" },
      short: { en: "Climate", ar: "المناخ", fr: "Climat" },
      desc: {
        en: "Tell weather from climate and explain why climate zones differ across the Earth.",
        ar: "التمييز بين الطقس والمناخ وتفسير اختلاف الأقاليم المناخية على سطح الأرض.",
        fr: "Distinguer la météo du climat et expliquer pourquoi les zones climatiques diffèrent sur la Terre.",
      },
      keyIdeas: [
        { icon: "🌦️", text: {
          en: "Weather is the condition of the air today; climate is the usual pattern over about 30 years.",
          ar: "الطقس هو حالة الجو اليوم، أما المناخ فهو النمط المعتاد على مدى نحو 30 سنة.",
          fr: "La météo, c'est l'état de l'air aujourd'hui ; le climat, c'est la tendance habituelle sur environ 30 ans.",
        } },
        { icon: "☀️", text: {
          en: "Near the Equator sunlight hits more directly, so these regions are generally hotter.",
          ar: "قرب خط الاستواء تسقط أشعة الشمس بشكل أكثر عمودية، لذلك تكون هذه المناطق أشد حرارة عمومًا.",
          fr: "Près de l'équateur, les rayons du Soleil arrivent plus directement : ces régions sont donc en général plus chaudes.",
        } },
        { icon: "⛰️", text: {
          en: "Air gets cooler with height, roughly 6 °C for every 1,000 m you climb.",
          ar: "يبرد الهواء كلما ارتفعنا، بنحو 6 °س لكل 1,000 م.",
          fr: "L'air se refroidit avec l'altitude, d'environ 6 °C tous les 1 000 m.",
        } },
      ],
      explain: {
        basic: {
          en: "Weather changes from hour to hour; climate is what you expect in a place year after year. Climate depends mainly on latitude, height above sea level, and distance from the sea.",
          ar: "يتغير الطقس من ساعة إلى أخرى، أما المناخ فهو ما تتوقعه في مكان ما سنة بعد سنة. ويعتمد المناخ أساسًا على دائرة العرض، والارتفاع عن سطح البحر، والبعد عن البحر.",
          fr: "La météo change d'heure en heure ; le climat est ce qu'on attend dans un lieu d'année en année. Il dépend surtout de la latitude, de l'altitude et de la distance à la mer.",
        },
        visual: {
          en: "Weather is your mood today; climate is your personality. One rainy day in a desert does not change the desert's climate.",
          ar: "الطقس مثل مزاجك اليوم، والمناخ مثل شخصيتك. يوم ماطر واحد في الصحراء لا يغيّر مناخ الصحراء.",
          fr: "La météo, c'est ton humeur du jour ; le climat, c'est ton caractère. Un jour de pluie dans le désert ne change pas le climat du désert.",
        },
        check: {
          en: "Is “It snowed in Amman last week” a statement about weather or climate?",
          ar: "هل عبارة «تساقط الثلج في عمّان الأسبوع الماضي» تتحدث عن الطقس أم عن المناخ؟",
          fr: "La phrase « Il a neigé à Amman la semaine dernière » parle-t-elle de météo ou de climat ?",
        },
      },
      keys: ["climate", "weather", "zone", "temperature", "rain", "climat", "météo", "température", "pluie", "مناخ", "طقس", "حرارة", "أمطار", "إقليم"],
    },
    {
      id: "civics",
      hue: "#8b5cf6",
      x: 520, y: 440, layer: 1,
      name: { en: "Government & Citizenship", ar: "الحكومة والمواطنة", fr: "Gouvernement et citoyenneté" },
      short: { en: "Civics", ar: "التربية الوطنية", fr: "Citoyenneté" },
      desc: {
        en: "Know the three branches of government and the difference between rights and responsibilities.",
        ar: "معرفة السلطات الثلاث في الدولة والفرق بين الحقوق والواجبات.",
        fr: "Connaître les trois pouvoirs de l'État et la différence entre droits et devoirs.",
      },
      keyIdeas: [
        { icon: "📜", text: {
          en: "The legislative branch makes laws, the executive carries them out, and the judicial interprets them.",
          ar: "السلطة التشريعية تسنّ القوانين، والتنفيذية تطبّقها، والقضائية تفسّرها وتفصل في النزاعات.",
          fr: "Le pouvoir législatif fait les lois, l'exécutif les applique et le judiciaire les interprète.",
        } },
        { icon: "⚖️", text: {
          en: "Separating powers lets each branch check the others so no one holds all the power.",
          ar: "الفصل بين السلطات يسمح لكل سلطة بمراقبة الأخريين حتى لا تنفرد جهة واحدة بكل السلطة.",
          fr: "La séparation des pouvoirs permet à chacun de contrôler les autres, pour qu'aucun ne détienne tout le pouvoir.",
        } },
        { icon: "🤝", text: {
          en: "Citizens have rights, such as education and a fair trial, and responsibilities, such as obeying laws.",
          ar: "للمواطنين حقوق مثل التعليم والمحاكمة العادلة، وعليهم واجبات مثل احترام القوانين.",
          fr: "Les citoyens ont des droits, comme l'éducation et un procès équitable, et des devoirs, comme respecter les lois.",
        } },
      ],
      explain: {
        basic: {
          en: "Most states split public power into three branches so that the people who write the laws are not the same people who apply them or judge them. Citizens receive rights from the state and owe duties in return.",
          ar: "تقسّم معظم الدول السلطة العامة إلى ثلاث سلطات حتى لا يكون من يضع القوانين هو نفسه من يطبّقها أو يحكم بها. ويحصل المواطنون على حقوق من الدولة، وعليهم في المقابل واجبات.",
          fr: "La plupart des États divisent le pouvoir public en trois, afin que ceux qui écrivent les lois ne soient pas ceux qui les appliquent ou qui jugent. Les citoyens reçoivent des droits et ont, en retour, des devoirs.",
        },
        visual: {
          en: "Think of a football match: the rule-makers write the rules, the teams play by them, and the referee decides when a rule was broken. No single group does all three jobs.",
          ar: "تخيّل مباراة كرة قدم: جهة تضع القواعد، والفرق تلعب وفقها، والحَكَم يقرّر متى خُرقت قاعدة. ولا تقوم جهة واحدة بالمهام الثلاث كلها.",
          fr: "Pense à un match de football : certains écrivent les règles, les équipes jouent en les respectant, et l'arbitre décide quand une règle est enfreinte. Aucun groupe ne fait les trois rôles.",
        },
        check: {
          en: "A court decides whether a law was broken. Which branch is that?",
          ar: "محكمة تقرّر ما إذا كان قانون قد خُرق. إلى أي سلطة تنتمي؟",
          fr: "Un tribunal décide si une loi a été enfreinte. De quel pouvoir s'agit-il ?",
        },
      },
      keys: ["government", "citizen", "rights", "law", "branch", "legislative", "gouvernement", "citoyen", "droits", "loi", "pouvoir", "حكومة", "مواطن", "حقوق", "واجبات", "قانون", "سلطة"],
    },
    {
      id: "econ",
      hue: "#ef4444",
      x: 900, y: 320, layer: 2,
      name: { en: "Basic Economics", ar: "مبادئ الاقتصاد", fr: "Notions d'économie" },
      short: { en: "Economics", ar: "الاقتصاد", fr: "Économie" },
      desc: {
        en: "Separate needs from wants, and use scarcity, supply and demand to explain prices.",
        ar: "التمييز بين الحاجات والرغبات، واستخدام الندرة والعرض والطلب لتفسير الأسعار.",
        fr: "Distinguer besoins et envies, et utiliser la rareté, l'offre et la demande pour expliquer les prix.",
      },
      keyIdeas: [
        { icon: "💧", text: {
          en: "Needs are things we must have to survive, like water and shelter; wants are things we would like to have.",
          ar: "الحاجات أشياء لا بد منها للعيش مثل الماء والمأوى، أما الرغبات فهي أشياء نحب أن نمتلكها.",
          fr: "Les besoins sont ce qu'il faut pour vivre, comme l'eau et un abri ; les envies sont ce qu'on aimerait avoir.",
        } },
        { icon: "⚖️", text: {
          en: "Scarcity means resources are limited, so every choice gives something else up.",
          ar: "الندرة تعني أن الموارد محدودة، لذلك فإن كل اختيار يعني التخلي عن شيء آخر.",
          fr: "La rareté signifie que les ressources sont limitées : chaque choix oblige à renoncer à autre chose.",
        } },
        { icon: "📉", text: {
          en: "When a price rises, people usually buy less of that good: the quantity demanded falls.",
          ar: "عندما يرتفع السعر يشتري الناس عادةً كمية أقل من السلعة، أي تنخفض الكمية المطلوبة.",
          fr: "Quand un prix augmente, les gens achètent en général moins de ce bien : la quantité demandée baisse.",
        } },
      ],
      explain: {
        basic: {
          en: "Because resources are scarce, people and countries must choose. Prices help: when something is scarce its price tends to rise, buyers want less of it, and sellers want to offer more.",
          ar: "بما أن الموارد نادرة، يجب على الأفراد والدول أن يختاروا. والأسعار تساعد في ذلك: عندما يندر شيء يميل سعره إلى الارتفاع، فيقلّ ما يطلبه المشترون ويزداد ما يعرضه البائعون.",
          fr: "Comme les ressources sont rares, les personnes et les pays doivent choisir. Les prix aident : quand un bien est rare, son prix a tendance à monter, les acheteurs en veulent moins et les vendeurs veulent en proposer plus.",
        },
        visual: {
          en: "Picture a see-saw: on the buyers' side, a higher price pushes the amount they want down; on the sellers' side, a higher price lifts the amount they offer up.",
          ar: "تخيّل أرجوحة توازن: في جهة المشترين يدفع السعر المرتفع الكمية المطلوبة إلى الأسفل، وفي جهة البائعين يرفع السعر المرتفع الكمية المعروضة إلى الأعلى.",
          fr: "Imagine une balançoire : du côté des acheteurs, un prix plus élevé fait baisser la quantité voulue ; du côté des vendeurs, il fait monter la quantité proposée.",
        },
        check: {
          en: "If the price of oranges doubles, would you expect shoppers to buy more or fewer oranges?",
          ar: "إذا تضاعف سعر البرتقال، هل تتوقع أن يشتري الناس كمية أكبر أم أقل منه؟",
          fr: "Si le prix des oranges double, les clients en achèteront-ils plus ou moins ?",
        },
      },
      keys: ["economics", "economy", "needs", "wants", "supply", "demand", "scarcity", "price", "économie", "besoin", "offre", "demande", "rareté", "prix", "اقتصاد", "حاجات", "رغبات", "عرض", "طلب", "ندرة", "سعر"],
    },
  ],
  edges: [
    ["maps", "climate"],
    ["timeline", "civics"],
    ["civics", "econ"],
    ["climate", "econ"],
  ],
  questions: [
    // ---------- maps ----------
    {
      concept: "maps",
      difficulty: 1,
      type: "mc",
      prompt: { en: "Choose the correct answer:", ar: "اختر الإجابة الصحيحة:", fr: "Choisis la bonne réponse :" },
      display: {
        en: "Which lines measure distance north or south of the Equator?",
        ar: "ما الخطوط التي تقيس البُعد شمال خط الاستواء أو جنوبه؟",
        fr: "Quelles lignes mesurent la distance au nord ou au sud de l'équateur ?",
      },
      options: [
        { id: "a", text: { en: "Lines of longitude", ar: "خطوط الطول", fr: "Les méridiens (longitude)" } },
        { id: "b", text: { en: "Lines of latitude", ar: "دوائر العرض", fr: "Les parallèles (latitude)" } },
        { id: "c", text: { en: "Contour lines", ar: "خطوط الكنتور", fr: "Les courbes de niveau" } },
        { id: "d", text: { en: "Time-zone borders", ar: "حدود المناطق الزمنية", fr: "Les limites des fuseaux horaires" } },
      ],
      answer: "b",
      hint: {
        en: "The Equator itself is one of these lines: it runs east–west around the middle of the Earth.",
        ar: "خط الاستواء نفسه واحد من هذه الخطوط، وهو يمتد من الشرق إلى الغرب حول منتصف الأرض.",
        fr: "L'équateur est lui-même l'une de ces lignes : il fait le tour de la Terre d'est en ouest.",
      },
      steps: [
        { text: {
          en: "Lines that run east–west, parallel to the Equator, tell you how far north or south you are.",
          ar: "الخطوط الممتدة من الشرق إلى الغرب، موازيةً لخط الاستواء، تحدد مدى بُعدك شمالًا أو جنوبًا.",
          fr: "Les lignes orientées est–ouest, parallèles à l'équateur, indiquent à quelle distance au nord ou au sud on se trouve.",
        } },
        { text: {
          en: "These are lines of latitude, measured from 0° at the Equator to 90° at the poles.",
          ar: "هذه هي دوائر العرض، وتُقاس من 0° عند خط الاستواء إلى 90° عند القطبين.",
          fr: "Ce sont les parallèles (latitude), mesurés de 0° à l'équateur à 90° aux pôles.",
        } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "lat-long-swap",
          label: { en: "Swapped latitude and longitude", ar: "خلط بين العرض والطول", fr: "Latitude et longitude inversées" },
          found: {
            en: "You chose longitude — a very common mix-up between the two kinds of lines.",
            ar: "اخترتَ خطوط الطول، وهذا خلط شائع جدًا بين نوعَي الخطوط.",
            fr: "Tu as choisi la longitude : c'est une confusion très fréquente entre les deux types de lignes.",
          },
          why: {
            en: "Longitude lines run from pole to pole and measure east–west. Latitude lines run parallel to the Equator and measure north–south.",
            ar: "خطوط الطول تمتد من قطب إلى قطب وتقيس الشرق والغرب، أما دوائر العرض فتوازي خط الاستواء وتقيس الشمال والجنوب.",
            fr: "Les méridiens vont d'un pôle à l'autre et mesurent l'est–ouest. Les parallèles suivent l'équateur et mesurent le nord–sud.",
          },
          tags: ["coordinates"],
        },
      ],
    },
    {
      concept: "maps",
      difficulty: 2,
      type: "numeric",
      prompt: { en: "Type the distance in kilometres:", ar: "اكتب المسافة بالكيلومترات:", fr: "Écris la distance en kilomètres :" },
      display: {
        en: "A map has a scale of 1 : 100,000. Two villages are 6 cm apart on the map. How many km apart are they in reality?",
        ar: "مقياس رسم خريطة 1 : 100,000. المسافة بين قريتين على الخريطة 6 سم. كم كيلومترًا تبعدان في الواقع؟",
        fr: "Une carte est à l'échelle 1 : 100 000. Deux villages sont à 6 cm l'un de l'autre sur la carte. Quelle est leur distance réelle en km ?",
      },
      answer: 6,
      hint: {
        en: "Multiply by 100,000 to get centimetres, then remember that 1 km = 100,000 cm.",
        ar: "اضرب في 100,000 لتحصل على السنتيمترات، ثم تذكّر أن 1 كم = 100,000 سم.",
        fr: "Multiplie par 100 000 pour obtenir des centimètres, puis rappelle-toi que 1 km = 100 000 cm.",
      },
      steps: [
        { text: {
          en: "Real distance = 6 cm × 100,000 = 600,000 cm.",
          ar: "المسافة الحقيقية = 6 سم × 100,000 = 600,000 سم.",
          fr: "Distance réelle = 6 cm × 100 000 = 600 000 cm.",
        } },
        { text: {
          en: "600,000 cm = 6,000 m, and 6,000 m = 6 km.",
          ar: "600,000 سم = 6,000 م، و6,000 م = 6 كم.",
          fr: "600 000 cm = 6 000 m, et 6 000 m = 6 km.",
        } },
      ],
      misconceptions: [
        {
          value: 600000,
          id: "scale-no-conversion",
          label: { en: "Forgot to convert units", ar: "نسيان تحويل الوحدات", fr: "Oubli de conversion" },
          found: {
            en: "You wrote 600,000 — that is the distance in centimetres, not kilometres.",
            ar: "كتبتَ 600,000، وهذه هي المسافة بالسنتيمترات وليست بالكيلومترات.",
            fr: "Tu as écrit 600 000 : c'est la distance en centimètres, pas en kilomètres.",
          },
          why: {
            en: "The scale gives the answer in the same unit as the map (cm). Divide by 100,000 to change cm into km.",
            ar: "يعطي المقياس الناتج بوحدة الخريطة نفسها (سم)، لذا اقسم على 100,000 لتحويل السنتيمترات إلى كيلومترات.",
            fr: "L'échelle donne le résultat dans l'unité de la carte (cm). Divise par 100 000 pour passer des cm aux km.",
          },
          tags: ["map-scale", "units"],
        },
        {
          value: 6000,
          id: "scale-stopped-at-metres",
          label: { en: "Stopped at metres", ar: "التوقف عند الأمتار", fr: "Arrêté aux mètres" },
          found: {
            en: "You wrote 6,000 — you converted to metres but not on to kilometres.",
            ar: "كتبتَ 6,000، أي أنك حوّلت إلى الأمتار ولم تكمل التحويل إلى الكيلومترات.",
            fr: "Tu as écrit 6 000 : tu as converti en mètres, mais pas encore en kilomètres.",
          },
          why: {
            en: "You were nearly there! One more step: 1 km = 1,000 m, so 6,000 m = 6 km.",
            ar: "كنتَ قريبًا جدًا! بقيت خطوة واحدة: 1 كم = 1,000 م، إذن 6,000 م = 6 كم.",
            fr: "Tu y étais presque ! Encore une étape : 1 km = 1 000 m, donc 6 000 m = 6 km.",
          },
          tags: ["map-scale", "units"],
        },
      ],
    },
    {
      concept: "maps",
      difficulty: 3,
      type: "mc",
      prompt: { en: "Choose the correct statement:", ar: "اختر العبارة الصحيحة:", fr: "Choisis l'affirmation correcte :" },
      display: {
        en: "Place A is at 30°N, 35°E. Place B is at 30°N, 45°E. Which statement is true?",
        ar: "يقع المكان A عند 30° شمالًا و35° شرقًا، ويقع المكان B عند 30° شمالًا و45° شرقًا. أي العبارات صحيحة؟",
        fr: "Le lieu A est à 30°N, 35°E. Le lieu B est à 30°N, 45°E. Quelle affirmation est vraie ?",
      },
      options: [
        { id: "a", text: {
          en: "They have the same latitude, and B is east of A.",
          ar: "لهما دائرة العرض نفسها، ويقع B شرق A.",
          fr: "Ils ont la même latitude, et B est à l'est de A.",
        } },
        { id: "b", text: {
          en: "They have the same longitude, and B is north of A.",
          ar: "لهما خط الطول نفسه، ويقع B شمال A.",
          fr: "Ils ont la même longitude, et B est au nord de A.",
        } },
        { id: "c", text: {
          en: "They have the same latitude, and B is west of A.",
          ar: "لهما دائرة العرض نفسها، ويقع B غرب A.",
          fr: "Ils ont la même latitude, et B est à l'ouest de A.",
        } },
        { id: "d", text: {
          en: "B is 10° north of A.",
          ar: "يقع B على بُعد 10° شمال A.",
          fr: "B est 10° au nord de A.",
        } },
      ],
      answer: "a",
      hint: {
        en: "The first number (with N or S) is latitude; the second (with E or W) is longitude.",
        ar: "الرقم الأول (مع شمال أو جنوب) هو دائرة العرض، والرقم الثاني (مع شرق أو غرب) هو خط الطول.",
        fr: "Le premier nombre (avec N ou S) est la latitude ; le second (avec E ou O) est la longitude.",
      },
      steps: [
        { text: {
          en: "Both places are at 30°N, so they share the same latitude.",
          ar: "المكانان كلاهما عند 30° شمالًا، إذن لهما دائرة العرض نفسها.",
          fr: "Les deux lieux sont à 30°N : ils ont donc la même latitude.",
        } },
        { text: {
          en: "B's longitude (45°E) is bigger than A's (35°E), so B is 10° further east.",
          ar: "خط طول B ‏(45° شرقًا) أكبر من خط طول A ‏(35° شرقًا)، إذن يقع B أبعد شرقًا بمقدار 10°.",
          fr: "La longitude de B (45°E) est plus grande que celle de A (35°E) : B est donc 10° plus à l'est.",
        } },
      ],
      misconceptions: [
        {
          value: "b",
          id: "lat-long-swap",
          label: { en: "Swapped latitude and longitude", ar: "خلط بين العرض والطول", fr: "Latitude et longitude inversées" },
          found: {
            en: "You chose “same longitude, B is north” — you read the two coordinates the wrong way round.",
            ar: "اخترتَ «خط الطول نفسه، وB شمالًا»، أي أنك قرأت الإحداثيين بالعكس.",
            fr: "Tu as choisi « même longitude, B au nord » : tu as lu les deux coordonnées à l'envers.",
          },
          why: {
            en: "The shared value 30°N is latitude. The values that differ, 35°E and 45°E, are longitude, which means east–west.",
            ar: "القيمة المشتركة 30° شمالًا هي دائرة العرض، أما القيمتان المختلفتان 35° و45° شرقًا فهما خطا طول، أي اتجاه شرق–غرب.",
            fr: "La valeur commune 30°N est la latitude. Les valeurs différentes, 35°E et 45°E, sont des longitudes, donc l'est–ouest.",
          },
          tags: ["coordinates"],
        },
        {
          value: "d",
          id: "longitude-as-north",
          label: { en: "Read east difference as north", ar: "قراءة الفرق شرقًا كأنه شمال", fr: "Écart est lu comme nord" },
          found: {
            en: "You chose “B is 10° north” — you spotted the 10° gap but gave it the wrong direction.",
            ar: "اخترتَ «B على بُعد 10° شمالًا»، فقد لاحظت فرق 10° لكنك أعطيته اتجاهًا خاطئًا.",
            fr: "Tu as choisi « B est 10° au nord » : tu as bien vu l'écart de 10°, mais pas la bonne direction.",
          },
          why: {
            en: "The 10° difference is in longitude (E), so it is an east–west gap, not north–south.",
            ar: "فرق 10° هو في خط الطول (شرقًا)، إذن هو فرق شرق–غرب وليس شمال–جنوب.",
            fr: "L'écart de 10° porte sur la longitude (E) : c'est un écart est–ouest, pas nord–sud.",
          },
          tags: ["coordinates"],
        },
      ],
    },

    // ---------- timeline ----------
    {
      concept: "timeline",
      difficulty: 1,
      type: "numeric",
      prompt: { en: "Type the century number:", ar: "اكتب رقم القرن:", fr: "Écris le numéro du siècle :" },
      display: {
        en: "In which century is the year 1450 CE?",
        ar: "في أي قرن تقع سنة 1450 م؟",
        fr: "En quel siècle se situe l'année 1450 apr. J.-C. ?",
      },
      answer: 15,
      hint: {
        en: "The 1st century was years 1–100. So the century number is one more than the first two digits.",
        ar: "القرن الأول هو السنوات من 1 إلى 100، لذا فرقم القرن يزيد واحدًا على الرقمين الأولين.",
        fr: "Le Ier siècle va de l'an 1 à l'an 100. Le numéro du siècle vaut donc les deux premiers chiffres plus un.",
      },
      steps: [
        { text: {
          en: "The 15th century runs from 1401 to 1500.",
          ar: "يمتد القرن الخامس عشر من 1401 إلى 1500.",
          fr: "Le XVe siècle va de 1401 à 1500.",
        } },
        { text: {
          en: "1450 is in that range, so it is in the 15th century (14 + 1 = 15).",
          ar: "سنة 1450 تقع ضمن هذا المدى، إذن هي في القرن الخامس عشر (14 + 1 = 15).",
          fr: "1450 est dans cet intervalle : c'est donc le XVe siècle (14 + 1 = 15).",
        } },
      ],
      misconceptions: [
        {
          value: 14,
          id: "century-first-digits",
          label: { en: "Used the first two digits", ar: "أخذ الرقمين الأولين", fr: "Pris les deux premiers chiffres" },
          found: {
            en: "You wrote 14 — you took the first two digits of 1450 as the century.",
            ar: "كتبتَ 14، أي أنك اعتبرت الرقمين الأولين من 1450 هما رقم القرن.",
            fr: "Tu as écrit 14 : tu as pris les deux premiers chiffres de 1450 comme siècle.",
          },
          why: {
            en: "Counting starts at the 1st century (years 1–100), so the 1400s are the 15th century, just as the 2000s are the 21st.",
            ar: "العدّ يبدأ من القرن الأول (السنوات 1–100)، لذا فإن سنوات الـ1400 هي القرن الخامس عشر، تمامًا كما أن سنوات الـ2000 هي القرن الحادي والعشرون.",
            fr: "On commence au Ier siècle (années 1 à 100) : les années 1400 sont donc le XVe siècle, comme les années 2000 sont le XXIe.",
          },
          tags: ["centuries"],
        },
      ],
    },
    {
      concept: "timeline",
      difficulty: 2,
      type: "numeric",
      prompt: { en: "Type the number of years:", ar: "اكتب عدد السنوات:", fr: "Écris le nombre d'années :" },
      display: {
        en: "On a timeline, how many years are there from 500 BCE to 300 CE?",
        ar: "على الخط الزمني، كم سنة بين سنة 500 ق.م وسنة 300 م؟",
        fr: "Sur une frise, combien d'années y a-t-il de 500 av. J.-C. à 300 apr. J.-C. ?",
      },
      answer: 800,
      hint: {
        en: "Count from 500 BCE up to year 1, then keep going to 300 CE.",
        ar: "احسب من 500 ق.م حتى سنة 1، ثم تابع حتى 300 م.",
        fr: "Compte de 500 av. J.-C. jusqu'à l'an 1, puis continue jusqu'à 300 apr. J.-C.",
      },
      steps: [
        { text: {
          en: "The two dates are on opposite sides of year 1, so add them: 500 + 300.",
          ar: "التاريخان على جانبين متقابلين من سنة 1، لذا نجمعهما: 500 + 300.",
          fr: "Les deux dates sont de part et d'autre de l'an 1 : on les additionne, 500 + 300.",
        } },
        { text: {
          en: "500 + 300 = 800 years. (Strictly there is no year 0, but on a school timeline we simply add.)",
          ar: "500 + 300 = 800 سنة. (لا توجد سنة صفر فعليًا، لكننا في الخط الزمني المدرسي نجمع ببساطة.)",
          fr: "500 + 300 = 800 ans. (Il n'existe pas d'an 0, mais sur une frise scolaire on additionne simplement.)",
        } },
      ],
      misconceptions: [
        {
          value: 200,
          id: "bce-ce-subtract",
          label: { en: "Subtracted across BCE/CE", ar: "طرح بدل الجمع عبر الميلاد", fr: "Soustrait au lieu d'additionner" },
          found: {
            en: "You wrote 200 — you subtracted 300 from 500 as if both dates were on the same side.",
            ar: "كتبتَ 200، أي أنك طرحت 300 من 500 كأن التاريخين في الجهة نفسها.",
            fr: "Tu as écrit 200 : tu as soustrait 300 de 500 comme si les deux dates étaient du même côté.",
          },
          why: {
            en: "Subtract only when both dates are BCE or both are CE. When one is BCE and the other CE, add them.",
            ar: "نطرح فقط عندما يكون التاريخان كلاهما قبل الميلاد أو كلاهما بعده. أما إذا كان أحدهما قبل الميلاد والآخر بعده فنجمعهما.",
            fr: "On soustrait seulement si les deux dates sont av. J.-C. ou toutes deux apr. J.-C. Si l'une est avant et l'autre après, on additionne.",
          },
          tags: ["bce-ce", "counting-years"],
        },
      ],
    },
    {
      concept: "timeline",
      difficulty: 3,
      type: "mc",
      prompt: { en: "Choose the list in chronological order (oldest first):", ar: "اختر القائمة المرتبة زمنيًا (من الأقدم إلى الأحدث):", fr: "Choisis la liste dans l'ordre chronologique (du plus ancien au plus récent) :" },
      display: {
        en: "Order these dates: 100 BCE, 300 BCE, 200 CE, 50 CE",
        ar: "رتّب هذه التواريخ: 100 ق.م، 300 ق.م، 200 م، 50 م",
        fr: "Range ces dates : 100 av. J.-C., 300 av. J.-C., 200 apr. J.-C., 50 apr. J.-C.",
      },
      options: [
        { id: "a", text: {
          en: "100 BCE, 300 BCE, 50 CE, 200 CE",
          ar: "100 ق.م، 300 ق.م، 50 م، 200 م",
          fr: "100 av. J.-C., 300 av. J.-C., 50 apr. J.-C., 200 apr. J.-C.",
        } },
        { id: "b", text: {
          en: "300 BCE, 100 BCE, 50 CE, 200 CE",
          ar: "300 ق.م، 100 ق.م، 50 م، 200 م",
          fr: "300 av. J.-C., 100 av. J.-C., 50 apr. J.-C., 200 apr. J.-C.",
        } },
        { id: "c", text: {
          en: "200 CE, 50 CE, 100 BCE, 300 BCE",
          ar: "200 م، 50 م، 100 ق.م، 300 ق.م",
          fr: "200 apr. J.-C., 50 apr. J.-C., 100 av. J.-C., 300 av. J.-C.",
        } },
        { id: "d", text: {
          en: "50 CE, 100 BCE, 200 CE, 300 BCE",
          ar: "50 م، 100 ق.م، 200 م، 300 ق.م",
          fr: "50 apr. J.-C., 100 av. J.-C., 200 apr. J.-C., 300 av. J.-C.",
        } },
      ],
      answer: "b",
      hint: {
        en: "All BCE dates come before all CE dates. Among BCE dates, the bigger number is older.",
        ar: "كل التواريخ قبل الميلاد تسبق كل التواريخ بعده، وبين تواريخ ما قبل الميلاد يكون العدد الأكبر هو الأقدم.",
        fr: "Toutes les dates av. J.-C. viennent avant les dates apr. J.-C. Parmi les dates av. J.-C., le plus grand nombre est le plus ancien.",
      },
      steps: [
        { text: {
          en: "BCE first: 300 BCE is further back than 100 BCE, so 300 BCE, then 100 BCE.",
          ar: "نبدأ بما قبل الميلاد: 300 ق.م أبعد في الماضي من 100 ق.م، إذن 300 ق.م ثم 100 ق.م.",
          fr: "D'abord av. J.-C. : 300 av. J.-C. est plus lointain que 100 av. J.-C., donc 300 puis 100 av. J.-C.",
        } },
        { text: {
          en: "Then CE in normal order: 50 CE, then 200 CE.",
          ar: "ثم ما بعد الميلاد بالترتيب العادي: 50 م ثم 200 م.",
          fr: "Puis apr. J.-C. dans l'ordre habituel : 50 puis 200 apr. J.-C.",
        } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "bce-count-up",
          label: { en: "Treated BCE like CE", ar: "عامل ق.م مثل م", fr: "Traité av. comme apr. J.-C." },
          found: {
            en: "You chose 100 BCE before 300 BCE — you ordered BCE years as if they counted upward like CE years.",
            ar: "اخترتَ 100 ق.م قبل 300 ق.م، أي أنك رتّبت سنوات ما قبل الميلاد كأنها تتزايد مثل سنوات الميلاد.",
            fr: "Tu as mis 100 av. J.-C. avant 300 av. J.-C. : tu as rangé les années av. J.-C. comme si elles augmentaient comme les années apr. J.-C.",
          },
          why: {
            en: "BCE years count down toward year 1, so a bigger BCE number is further in the past.",
            ar: "سنوات ما قبل الميلاد تتناقص باتجاه سنة 1، لذا فإن العدد الأكبر قبل الميلاد أبعد في الماضي.",
            fr: "Les années av. J.-C. diminuent vers l'an 1 : un nombre av. J.-C. plus grand est plus ancien.",
          },
          tags: ["bce-ce", "ordering"],
        },
        {
          value: "d",
          id: "ignore-era-labels",
          label: { en: "Ignored BCE/CE labels", ar: "تجاهل رمزَي ق.م و م", fr: "Ignoré av./apr. J.-C." },
          found: {
            en: "You chose 50, 100, 200, 300 — you sorted the numbers by size and ignored BCE and CE.",
            ar: "اخترتَ 50، 100، 200، 300، أي أنك رتّبت الأعداد حسب حجمها وتجاهلت ق.م و م.",
            fr: "Tu as choisi 50, 100, 200, 300 : tu as trié les nombres par taille sans regarder av. ou apr. J.-C.",
          },
          why: {
            en: "The label matters most: every BCE date is earlier than every CE date.",
            ar: "الرمز هو الأهم: كل تاريخ قبل الميلاد أقدم من أي تاريخ بعد الميلاد.",
            fr: "C'est la mention qui compte d'abord : toute date av. J.-C. est antérieure à toute date apr. J.-C.",
          },
          tags: ["bce-ce", "ordering"],
        },
      ],
    },

    // ---------- climate ----------
    {
      concept: "climate",
      difficulty: 1,
      type: "mc",
      prompt: { en: "Choose the correct answer:", ar: "اختر الإجابة الصحيحة:", fr: "Choisis la bonne réponse :" },
      display: {
        en: "Which statement describes climate, not weather?",
        ar: "أي العبارات التالية تصف المناخ وليس الطقس؟",
        fr: "Quelle phrase décrit le climat, et non la météo ?",
      },
      options: [
        { id: "a", text: {
          en: "It is raining in Amman this afternoon.",
          ar: "إنها تمطر في عمّان بعد ظهر اليوم.",
          fr: "Il pleut à Amman cet après-midi.",
        } },
        { id: "b", text: {
          en: "Amman usually has hot, dry summers and cool, wetter winters.",
          ar: "تتميز عمّان عادةً بصيف حار جاف وشتاء بارد أكثر مطرًا.",
          fr: "Amman a généralement des étés chauds et secs et des hivers frais et plus humides.",
        } },
        { id: "c", text: {
          en: "Tomorrow will be windy at the Dead Sea.",
          ar: "ستكون الرياح قوية غدًا عند البحر الميت.",
          fr: "Demain, il y aura du vent à la mer Morte.",
        } },
        { id: "d", text: {
          en: "The temperature dropped by 5 °C last night.",
          ar: "انخفضت درجة الحرارة 5 °س الليلة الماضية.",
          fr: "La température a baissé de 5 °C la nuit dernière.",
        } },
      ],
      answer: "b",
      hint: {
        en: "Look for words that describe what is usual over many years, not one moment.",
        ar: "ابحث عن كلمات تصف ما هو معتاد على مدى سنوات طويلة، لا عن لحظة واحدة.",
        fr: "Cherche des mots qui décrivent ce qui est habituel sur de nombreuses années, pas un seul moment.",
      },
      steps: [
        { text: {
          en: "“This afternoon”, “tomorrow” and “last night” describe short moments: that is weather.",
          ar: "عبارات «بعد ظهر اليوم» و«غدًا» و«الليلة الماضية» تصف فترات قصيرة، وهذا هو الطقس.",
          fr: "« Cet après-midi », « demain » et « la nuit dernière » décrivent des moments courts : c'est la météo.",
        } },
        { text: {
          en: "“Usually has hot, dry summers” describes a long-term pattern: that is climate.",
          ar: "عبارة «عادةً صيف حار جاف» تصف نمطًا طويل الأمد، وهذا هو المناخ.",
          fr: "« A généralement des étés chauds et secs » décrit une tendance à long terme : c'est le climat.",
        } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "weather-is-climate",
          label: { en: "Weather mixed up with climate", ar: "خلط الطقس بالمناخ", fr: "Météo confondue avec climat" },
          found: {
            en: "You chose today's rain — that tells us the weather right now, not the climate.",
            ar: "اخترتَ مطر اليوم، وهذا يخبرنا عن الطقس الآن وليس عن المناخ.",
            fr: "Tu as choisi la pluie d'aujourd'hui : cela décrit la météo du moment, pas le climat.",
          },
          why: {
            en: "Weather is the short-term state of the air. Climate is the average pattern over about 30 years.",
            ar: "الطقس هو حالة الجو على المدى القصير، أما المناخ فهو النمط المتوسط على مدى نحو 30 سنة.",
            fr: "La météo est l'état de l'air à court terme. Le climat est la tendance moyenne sur environ 30 ans.",
          },
          tags: ["weather-vs-climate"],
        },
        {
          value: "c",
          id: "weather-is-climate",
          label: { en: "Weather mixed up with climate", ar: "خلط الطقس بالمناخ", fr: "Météo confondue avec climat" },
          found: {
            en: "You chose tomorrow's forecast — a forecast is about weather, even when it is for a famous place.",
            ar: "اخترتَ توقعات الغد، والتوقعات تتعلق بالطقس حتى لو كانت عن مكان مشهور.",
            fr: "Tu as choisi la prévision de demain : une prévision concerne la météo, même pour un lieu célèbre.",
          },
          why: {
            en: "One day's wind does not describe a place's climate. Climate is what happens there year after year.",
            ar: "رياح يوم واحد لا تصف مناخ المكان؛ فالمناخ هو ما يحدث فيه سنة بعد سنة.",
            fr: "Le vent d'une journée ne décrit pas le climat d'un lieu. Le climat, c'est ce qui s'y passe année après année.",
          },
          tags: ["weather-vs-climate"],
        },
      ],
    },
    {
      concept: "climate",
      difficulty: 2,
      type: "numeric",
      prompt: { en: "Type the temperature in °C:", ar: "اكتب درجة الحرارة بالدرجات المئوية:", fr: "Écris la température en °C :" },
      display: {
        en: "A coastal town at sea level is 30 °C. Air cools by about 6 °C for every 1,000 m of height. About how warm is a mountain top 2,000 m higher?",
        ar: "درجة الحرارة في بلدة ساحلية عند مستوى سطح البحر 30 °س. ينخفض الهواء نحو 6 °س لكل 1,000 م ارتفاع. كم تقريبًا درجة الحرارة على قمة جبل أعلى منها بـ 2,000 م؟",
        fr: "Une ville côtière au niveau de la mer est à 30 °C. L'air se refroidit d'environ 6 °C tous les 1 000 m. Quelle est à peu près la température au sommet d'une montagne 2 000 m plus haut ?",
      },
      answer: 18,
      hint: {
        en: "Work out how many 1,000 m steps there are, then take that many 6 °C drops away from 30.",
        ar: "احسب عدد خطوات الـ 1,000 م، ثم اطرح من 30 انخفاضًا قدره 6 °س عن كل خطوة.",
        fr: "Compte combien de tranches de 1 000 m il y a, puis retire autant de fois 6 °C à 30.",
      },
      steps: [
        { text: {
          en: "2,000 m is 2 steps of 1,000 m, so the drop is 2 × 6 = 12 °C.",
          ar: "2,000 م تساوي خطوتين من 1,000 م، إذن الانخفاض = 2 × 6 = 12 °س.",
          fr: "2 000 m, ce sont 2 tranches de 1 000 m : la baisse est de 2 × 6 = 12 °C.",
        } },
        { text: {
          en: "Going up makes it colder: 30 − 12 = 18 °C.",
          ar: "الصعود يجعل الجو أبرد: 30 − 12 = 18 °س.",
          fr: "Monter rend l'air plus froid : 30 − 12 = 18 °C.",
        } },
      ],
      misconceptions: [
        {
          value: 42,
          id: "altitude-warmer",
          label: { en: "Thought height makes it warmer", ar: "ظنّ أن الارتفاع يزيد الحرارة", fr: "Cru que l'altitude réchauffe" },
          found: {
            en: "You wrote 42 — you added the 12 °C instead of taking it away.",
            ar: "كتبتَ 42، أي أنك أضفت 12 °س بدل أن تطرحها.",
            fr: "Tu as écrit 42 : tu as ajouté 12 °C au lieu de les retirer.",
          },
          why: {
            en: "Being higher is not “closer to the Sun” in any useful way. Air is thinner up high and holds less heat, so mountains are colder.",
            ar: "الارتفاع لا يعني الاقتراب من الشمس بشكل مؤثر؛ فالهواء في الأعلى أقل كثافة ويحتفظ بحرارة أقل، لذلك تكون الجبال أبرد.",
            fr: "Être plus haut ne rapproche pas vraiment du Soleil. En altitude, l'air est moins dense et garde moins la chaleur : les montagnes sont plus froides.",
          },
          tags: ["altitude"],
        },
        {
          value: 24,
          id: "altitude-one-step",
          label: { en: "Applied the drop only once", ar: "طبّق الانخفاض مرة واحدة", fr: "Baisse appliquée une seule fois" },
          found: {
            en: "You wrote 24 — you took away 6 °C once, but the climb is 2,000 m, not 1,000 m.",
            ar: "كتبتَ 24، أي أنك طرحت 6 °س مرة واحدة، لكن الارتفاع 2,000 م وليس 1,000 م.",
            fr: "Tu as écrit 24 : tu as retiré 6 °C une seule fois, mais la montée est de 2 000 m, pas 1 000 m.",
          },
          why: {
            en: "The rate is per 1,000 m, so multiply it by the number of 1,000 m steps: 2 × 6 = 12 °C.",
            ar: "المعدل لكل 1,000 م، لذا اضربه في عدد خطوات الـ 1,000 م: 2 × 6 = 12 °س.",
            fr: "Le taux est donné pour 1 000 m : multiplie-le par le nombre de tranches, 2 × 6 = 12 °C.",
          },
          tags: ["altitude", "rates"],
        },
      ],
    },
    {
      concept: "climate",
      difficulty: 3,
      type: "mc",
      prompt: { en: "Choose the best explanation:", ar: "اختر أفضل تفسير:", fr: "Choisis la meilleure explication :" },
      display: {
        en: "Why are places near the Equator generally hotter than places near the poles?",
        ar: "لماذا تكون المناطق القريبة من خط الاستواء أشد حرارة عمومًا من المناطق القريبة من القطبين؟",
        fr: "Pourquoi les régions proches de l'équateur sont-elles en général plus chaudes que celles proches des pôles ?",
      },
      options: [
        { id: "a", text: {
          en: "They are much closer to the Sun.",
          ar: "لأنها أقرب كثيرًا إلى الشمس.",
          fr: "Elles sont beaucoup plus proches du Soleil.",
        } },
        { id: "b", text: {
          en: "Sunlight hits them more directly, so the same energy falls on a smaller area.",
          ar: "لأن أشعة الشمس تسقط عليها بشكل أكثر عمودية، فتتركز الطاقة نفسها على مساحة أصغر.",
          fr: "Les rayons du Soleil y arrivent plus directement : la même énergie se concentre sur une surface plus petite.",
        } },
        { id: "c", text: {
          en: "They have more hours of daylight every single day of the year.",
          ar: "لأن ساعات النهار فيها أطول في كل يوم من أيام السنة.",
          fr: "Elles ont plus d'heures de jour chaque jour de l'année.",
        } },
        { id: "d", text: {
          en: "They have no oceans to cool them down.",
          ar: "لأنه لا توجد فيها محيطات تبرّدها.",
          fr: "Il n'y a pas d'océans pour les rafraîchir.",
        } },
      ],
      answer: "b",
      hint: {
        en: "Shine a torch straight down on paper, then at a slant. Which spot is brighter?",
        ar: "سلّط مصباحًا يدويًا على ورقة بشكل عمودي ثم بشكل مائل. أي البقعتين أشد إضاءة؟",
        fr: "Éclaire une feuille avec une lampe de poche bien droite, puis en biais. Quelle tache est la plus lumineuse ?",
      },
      steps: [
        { text: {
          en: "Because the Earth is curved, sunlight strikes the Equator almost straight on and the poles at a low slant.",
          ar: "بسبب تكوّر الأرض، تسقط أشعة الشمس على خط الاستواء بشكل شبه عمودي، وعلى القطبين بزاوية مائلة كثيرًا.",
          fr: "Comme la Terre est courbe, le Soleil frappe l'équateur presque à la verticale et les pôles de façon très oblique.",
        } },
        { text: {
          en: "Slanted rays spread the same energy over a bigger area, so each square metre is heated less.",
          ar: "الأشعة المائلة توزّع الطاقة نفسها على مساحة أكبر، فيسخن كل متر مربع بدرجة أقل.",
          fr: "Des rayons obliques répartissent la même énergie sur une plus grande surface : chaque mètre carré chauffe moins.",
        } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "distance-to-sun",
          label: { en: "Thought distance to Sun matters", ar: "ظنّ أن البعد عن الشمس هو السبب", fr: "Cru que la distance au Soleil compte" },
          found: {
            en: "You chose “closer to the Sun” — a very common idea, but the difference in distance is tiny.",
            ar: "اخترتَ «أقرب إلى الشمس»، وهي فكرة شائعة جدًا، لكن الفرق في المسافة ضئيل جدًا.",
            fr: "Tu as choisi « plus proches du Soleil » : c'est une idée très répandue, mais la différence de distance est minuscule.",
          },
          why: {
            en: "The Sun is about 150 million km away, so a few thousand km makes no real difference. What matters is the angle of the sunlight.",
            ar: "تبعد الشمس نحو 150 مليون كم، لذا فإن بضعة آلاف من الكيلومترات لا تُحدث فرقًا حقيقيًا. المهم هو زاوية سقوط أشعة الشمس.",
            fr: "Le Soleil est à environ 150 millions de km : quelques milliers de km ne changent rien. Ce qui compte, c'est l'angle des rayons.",
          },
          tags: ["climate-zones", "sun-angle"],
        },
      ],
    },

    // ---------- civics ----------
    {
      concept: "civics",
      difficulty: 1,
      type: "mc",
      prompt: { en: "Choose the correct answer:", ar: "اختر الإجابة الصحيحة:", fr: "Choisis la bonne réponse :" },
      display: {
        en: "Which branch of government is mainly responsible for making laws?",
        ar: "ما السلطة المسؤولة أساسًا عن سنّ القوانين؟",
        fr: "Quel pouvoir est principalement chargé de faire les lois ?",
      },
      options: [
        { id: "a", text: { en: "The executive branch", ar: "السلطة التنفيذية", fr: "Le pouvoir exécutif" } },
        { id: "b", text: { en: "The judicial branch", ar: "السلطة القضائية", fr: "Le pouvoir judiciaire" } },
        { id: "c", text: { en: "The legislative branch", ar: "السلطة التشريعية", fr: "Le pouvoir législatif" } },
        { id: "d", text: { en: "The police", ar: "الشرطة", fr: "La police" } },
      ],
      answer: "c",
      hint: {
        en: "The word “legislate” means to make laws.",
        ar: "كلمة «التشريع» تعني وضع القوانين.",
        fr: "Le mot « légiférer » veut dire faire des lois.",
      },
      steps: [
        { text: {
          en: "Legislative = makes laws; executive = carries them out; judicial = interprets them in courts.",
          ar: "التشريعية تسنّ القوانين، والتنفيذية تطبّقها، والقضائية تفسّرها في المحاكم.",
          fr: "Législatif = fait les lois ; exécutif = les applique ; judiciaire = les interprète dans les tribunaux.",
        } },
        { text: {
          en: "So the branch that makes laws is the legislative branch, often called a parliament.",
          ar: "إذن السلطة التي تسنّ القوانين هي السلطة التشريعية، وتُسمّى غالبًا البرلمان أو مجلس الأمة.",
          fr: "Le pouvoir qui fait les lois est donc le législatif, souvent appelé parlement.",
        } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "executive-makes-laws",
          label: { en: "Thought executive makes laws", ar: "ظنّ أن التنفيذية تشرّع", fr: "Cru que l'exécutif légifère" },
          found: {
            en: "You chose the executive — many people think the government's leaders write the laws.",
            ar: "اخترتَ السلطة التنفيذية، فكثيرون يظنون أن قادة الحكومة هم من يكتبون القوانين.",
            fr: "Tu as choisi l'exécutif : beaucoup pensent que les dirigeants du gouvernement écrivent les lois.",
          },
          why: {
            en: "The executive puts laws into action. Making and passing laws is the main job of the legislature.",
            ar: "السلطة التنفيذية تضع القوانين موضع التنفيذ، أما إعداد القوانين وإقرارها فهو المهمة الأساسية للسلطة التشريعية.",
            fr: "L'exécutif met les lois en œuvre. Écrire et voter les lois est la mission principale du législatif.",
          },
          tags: ["branches"],
        },
        {
          value: "b",
          id: "courts-make-laws",
          label: { en: "Thought courts make laws", ar: "ظنّ أن المحاكم تشرّع", fr: "Cru que les juges légifèrent" },
          found: {
            en: "You chose the judicial branch — courts work closely with laws, so this is an easy mix-up.",
            ar: "اخترتَ السلطة القضائية، والمحاكم تتعامل مع القوانين كثيرًا، لذا فهذا خلط مفهوم.",
            fr: "Tu as choisi le judiciaire : les tribunaux travaillent avec les lois, donc la confusion est compréhensible.",
          },
          why: {
            en: "Courts apply and interpret existing laws to settle cases; they do not write new ones.",
            ar: "المحاكم تطبّق القوانين الموجودة وتفسّرها للفصل في القضايا، ولا تكتب قوانين جديدة.",
            fr: "Les tribunaux appliquent et interprètent les lois existantes pour juger ; ils n'en écrivent pas de nouvelles.",
          },
          tags: ["branches"],
        },
      ],
    },
    {
      concept: "civics",
      difficulty: 2,
      type: "mc",
      prompt: { en: "Choose the correct answer:", ar: "اختر الإجابة الصحيحة:", fr: "Choisis la bonne réponse :" },
      display: {
        en: "Which of these is a responsibility (duty) of a citizen rather than a right?",
        ar: "أيٌّ مما يلي واجب على المواطن وليس حقًا له؟",
        fr: "Lequel de ces éléments est un devoir du citoyen plutôt qu'un droit ?",
      },
      options: [
        { id: "a", text: { en: "Freedom of expression", ar: "حرية التعبير", fr: "La liberté d'expression" } },
        { id: "b", text: { en: "Access to education", ar: "الحصول على التعليم", fr: "L'accès à l'éducation" } },
        { id: "c", text: { en: "A fair trial", ar: "المحاكمة العادلة", fr: "Un procès équitable" } },
        { id: "d", text: { en: "Obeying the law and paying taxes", ar: "احترام القانون ودفع الضرائب", fr: "Respecter la loi et payer ses impôts" } },
      ],
      answer: "d",
      hint: {
        en: "A right is something you receive or are free to do; a responsibility is something you are expected to do for society.",
        ar: "الحق شيء تحصل عليه أو تكون حرًا في فعله، أما الواجب فهو ما يُنتظر منك أن تقوم به تجاه المجتمع.",
        fr: "Un droit, c'est ce que tu reçois ou que tu es libre de faire ; un devoir, c'est ce qu'on attend de toi envers la société.",
      },
      steps: [
        { text: {
          en: "Expression, education and a fair trial are protections the state gives to citizens: they are rights.",
          ar: "حرية التعبير والتعليم والمحاكمة العادلة ضمانات تقدّمها الدولة للمواطنين، أي أنها حقوق.",
          fr: "L'expression, l'éducation et un procès équitable sont des garanties que l'État offre aux citoyens : ce sont des droits.",
        } },
        { text: {
          en: "Obeying the law and paying taxes are what citizens give back, so they are responsibilities.",
          ar: "احترام القانون ودفع الضرائب هو ما يقدّمه المواطنون في المقابل، لذا فهما من الواجبات.",
          fr: "Respecter la loi et payer ses impôts, c'est ce que les citoyens donnent en retour : ce sont des devoirs.",
        } },
      ],
      misconceptions: [
        {
          value: "b",
          id: "rights-vs-duties",
          label: { en: "Mixed up rights and duties", ar: "خلط بين الحقوق والواجبات", fr: "Droits et devoirs confondus" },
          found: {
            en: "You chose education — going to school can feel like a duty, but having access to education is a right.",
            ar: "اخترتَ التعليم، فقد يبدو الذهاب إلى المدرسة واجبًا، لكن الحصول على التعليم حق.",
            fr: "Tu as choisi l'éducation : aller à l'école peut ressembler à une obligation, mais l'accès à l'éducation est un droit.",
          },
          why: {
            en: "Rights protect what you are entitled to. Responsibilities are what you owe others, like following laws.",
            ar: "الحقوق تحمي ما تستحقه، أما الواجبات فهي ما تدين به للآخرين، مثل الالتزام بالقوانين.",
            fr: "Les droits protègent ce à quoi tu as droit. Les devoirs, c'est ce que tu dois aux autres, comme respecter les lois.",
          },
          tags: ["rights-responsibilities"],
        },
      ],
    },
    {
      concept: "civics",
      difficulty: 3,
      type: "mc",
      prompt: { en: "Choose the best reason:", ar: "اختر السبب الأنسب:", fr: "Choisis la meilleure raison :" },
      display: {
        en: "Why do many constitutions divide power between legislative, executive and judicial branches?",
        ar: "لماذا تقسّم دساتير كثيرة السلطة بين السلطات التشريعية والتنفيذية والقضائية؟",
        fr: "Pourquoi de nombreuses constitutions répartissent-elles le pouvoir entre législatif, exécutif et judiciaire ?",
      },
      options: [
        { id: "a", text: {
          en: "To make decisions as fast as possible.",
          ar: "لاتخاذ القرارات بأسرع ما يمكن.",
          fr: "Pour prendre les décisions le plus vite possible.",
        } },
        { id: "b", text: {
          en: "So that each branch can check the others and no one holds all the power.",
          ar: "حتى تراقب كل سلطة الأخريين ولا تنفرد جهة واحدة بكل السلطة.",
          fr: "Pour que chaque pouvoir contrôle les autres et que personne ne détienne tout le pouvoir.",
        } },
        { id: "c", text: {
          en: "So that each branch can ignore what the others decide.",
          ar: "حتى تتمكن كل سلطة من تجاهل ما تقرره الأخريان.",
          fr: "Pour que chaque pouvoir puisse ignorer les décisions des autres.",
        } },
        { id: "d", text: {
          en: "To create more jobs in government.",
          ar: "لتوفير مزيد من الوظائف الحكومية.",
          fr: "Pour créer plus d'emplois dans l'administration.",
        } },
      ],
      answer: "b",
      hint: {
        en: "Think about what could go wrong if one person or group wrote the laws, enforced them and judged them.",
        ar: "فكّر فيما قد يحدث لو أن شخصًا أو جهة واحدة كتبت القوانين وطبّقتها وحكمت بها.",
        fr: "Pense à ce qui pourrait mal tourner si une seule personne ou un seul groupe écrivait, appliquait et jugeait les lois.",
      },
      steps: [
        { text: {
          en: "If one group did all three jobs, nobody could stop it from misusing power.",
          ar: "لو قامت جهة واحدة بالمهام الثلاث، لما استطاع أحد منعها من إساءة استخدام السلطة.",
          fr: "Si un seul groupe faisait les trois, personne ne pourrait l'empêcher d'abuser du pouvoir.",
        } },
        { text: {
          en: "Separating the branches creates checks and balances that protect citizens' rights.",
          ar: "الفصل بين السلطات يخلق رقابة متبادلة وتوازنًا يحميان حقوق المواطنين.",
          fr: "Séparer les pouvoirs crée des contre-pouvoirs qui protègent les droits des citoyens.",
        } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "separation-for-speed",
          label: { en: "Thought it was for speed", ar: "ظنّ أن الهدف هو السرعة", fr: "Cru que c'était pour la vitesse" },
          found: {
            en: "You chose speed — but sharing power usually makes decisions slower, not faster.",
            ar: "اخترتَ السرعة، لكن توزيع السلطة يجعل القرارات عادةً أبطأ لا أسرع.",
            fr: "Tu as choisi la rapidité : pourtant, partager le pouvoir rend en général les décisions plus lentes, pas plus rapides.",
          },
          why: {
            en: "The aim is not speed but safety: each branch can review and limit the others.",
            ar: "الهدف ليس السرعة بل الحماية: فكل سلطة تستطيع مراجعة الأخريين والحدّ منهما.",
            fr: "Le but n'est pas la vitesse mais la sécurité : chaque pouvoir peut examiner et limiter les autres.",
          },
          tags: ["separation-of-powers"],
        },
        {
          value: "c",
          id: "separation-as-independence-only",
          label: { en: "Thought branches act alone", ar: "ظنّ أن السلطات تعمل منفصلة تمامًا", fr: "Cru que chaque pouvoir agit seul" },
          found: {
            en: "You chose “ignore the others” — the branches are separate, but they are meant to watch each other.",
            ar: "اخترتَ «تجاهل الأخريين»، والسلطات منفصلة فعلًا، لكن المقصود أن تراقب بعضها بعضًا.",
            fr: "Tu as choisi « ignorer les autres » : les pouvoirs sont séparés, mais ils doivent justement se surveiller.",
          },
          why: {
            en: "Separation is not isolation. Each branch has ways to limit the others: that is what “checks and balances” means.",
            ar: "الفصل لا يعني العزلة؛ فلكل سلطة وسائل للحدّ من الأخريين، وهذا معنى الرقابة والتوازن.",
            fr: "Séparer ne veut pas dire isoler. Chaque pouvoir peut limiter les autres : c'est l'équilibre des pouvoirs.",
          },
          tags: ["separation-of-powers"],
        },
      ],
    },

    // ---------- econ ----------
    {
      concept: "econ",
      difficulty: 1,
      type: "mc",
      prompt: { en: "Choose the correct answer:", ar: "اختر الإجابة الصحيحة:", fr: "Choisis la bonne réponse :" },
      display: {
        en: "Which of these is a need rather than a want?",
        ar: "أيٌّ مما يلي حاجة وليس رغبة؟",
        fr: "Lequel de ces éléments est un besoin plutôt qu'une envie ?",
      },
      options: [
        { id: "a", text: { en: "The newest smartphone", ar: "أحدث هاتف ذكي", fr: "Le smartphone le plus récent" } },
        { id: "b", text: { en: "Clean drinking water", ar: "مياه شرب نظيفة", fr: "De l'eau potable" } },
        { id: "c", text: { en: "Brand-name trainers", ar: "حذاء رياضي من ماركة مشهورة", fr: "Des baskets de marque" } },
        { id: "d", text: { en: "A video game console", ar: "جهاز ألعاب فيديو", fr: "Une console de jeux vidéo" } },
      ],
      answer: "b",
      hint: {
        en: "Ask yourself: could a person survive without it?",
        ar: "اسأل نفسك: هل يستطيع الإنسان العيش من دونه؟",
        fr: "Demande-toi : une personne pourrait-elle survivre sans cela ?",
      },
      steps: [
        { text: {
          en: "Needs are things required to survive and stay healthy: water, food, shelter, basic clothing.",
          ar: "الحاجات هي ما يلزم للبقاء على قيد الحياة والمحافظة على الصحة: الماء والغذاء والمأوى والملبس الأساسي.",
          fr: "Les besoins sont ce qu'il faut pour survivre et rester en bonne santé : eau, nourriture, abri, vêtements de base.",
        } },
        { text: {
          en: "Phones, branded shoes and consoles are nice to have, so they are wants. Clean water is a need.",
          ar: "الهواتف والأحذية ذات الماركات وأجهزة الألعاب أشياء جميلة لكنها رغبات، أما الماء النظيف فهو حاجة.",
          fr: "Téléphone, baskets de marque et console sont agréables : ce sont des envies. L'eau potable est un besoin.",
        } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "common-want-as-need",
          label: { en: "Common item seen as need", ar: "اعتبار الشيء الشائع حاجة", fr: "Objet courant vu comme besoin" },
          found: {
            en: "You chose the newest smartphone — because almost everyone has one, it can feel like a need.",
            ar: "اخترتَ أحدث هاتف ذكي، فلأن معظم الناس يملكون هاتفًا قد يبدو كأنه حاجة.",
            fr: "Tu as choisi le dernier smartphone : comme presque tout le monde en a un, il peut sembler indispensable.",
          },
          why: {
            en: "Being common or useful does not make something a need. A need is something you cannot live without — and the newest model is certainly a want.",
            ar: "كون الشيء شائعًا أو مفيدًا لا يجعله حاجة؛ فالحاجة ما لا يمكن العيش من دونه، وأحدث طراز هو بالتأكيد رغبة.",
            fr: "Être courant ou utile ne fait pas d'un objet un besoin. Un besoin, c'est ce sans quoi on ne peut pas vivre — et le dernier modèle est clairement une envie.",
          },
          tags: ["needs-wants"],
        },
      ],
    },
    {
      concept: "econ",
      difficulty: 2,
      type: "mc",
      prompt: { en: "Choose the correct answer:", ar: "اختر الإجابة الصحيحة:", fr: "Choisis la bonne réponse :" },
      display: {
        en: "If the price of a snack rises and nothing else changes, what usually happens to the quantity people want to buy?",
        ar: "إذا ارتفع سعر وجبة خفيفة ولم يتغير أي شيء آخر، فماذا يحدث عادةً للكمية التي يرغب الناس في شرائها؟",
        fr: "Si le prix d'un en-cas augmente et que rien d'autre ne change, qu'arrive-t-il en général à la quantité que les gens veulent acheter ?",
      },
      options: [
        { id: "a", text: { en: "It increases", ar: "تزداد", fr: "Elle augmente" } },
        { id: "b", text: { en: "It decreases", ar: "تنخفض", fr: "Elle diminue" } },
        { id: "c", text: { en: "It stays exactly the same", ar: "تبقى كما هي تمامًا", fr: "Elle reste exactement la même" } },
        { id: "d", text: { en: "It always drops to zero", ar: "تهبط دائمًا إلى الصفر", fr: "Elle tombe toujours à zéro" } },
      ],
      answer: "b",
      hint: {
        en: "Imagine your pocket money stays the same and your favourite snack costs more. Would you buy more of it?",
        ar: "تخيّل أن مصروفك بقي كما هو وأصبحت وجبتك المفضلة أغلى. هل ستشتري منها أكثر؟",
        fr: "Imagine que ton argent de poche ne change pas et que ton en-cas préféré coûte plus cher. En achèterais-tu davantage ?",
      },
      steps: [
        { text: {
          en: "A higher price means each unit costs buyers more of their limited money.",
          ar: "السعر الأعلى يعني أن كل وحدة تكلّف المشتري جزءًا أكبر من ماله المحدود.",
          fr: "Un prix plus élevé signifie que chaque unité coûte une plus grande part d'un budget limité.",
        } },
        { text: {
          en: "So most buyers buy less or switch to something else: quantity demanded falls (the law of demand).",
          ar: "لذلك يشتري معظم المشترين كمية أقل أو يتحولون إلى بديل، فتنخفض الكمية المطلوبة (قانون الطلب).",
          fr: "La plupart des acheteurs en prennent donc moins ou changent de produit : la quantité demandée baisse (loi de la demande).",
        } },
      ],
      misconceptions: [
        {
          value: "a",
          id: "price-up-demand-up",
          label: { en: "Higher price means more demand", ar: "السعر الأعلى يعني طلبًا أكبر", fr: "Prix plus haut, demande plus forte" },
          found: {
            en: "You chose “it increases” — perhaps thinking that if something is expensive, people must want it more.",
            ar: "اخترتَ «تزداد»، وربما ظننت أن الشيء الغالي يعني أن الناس يريدونه أكثر.",
            fr: "Tu as choisi « elle augmente » : peut-être as-tu pensé que si c'est cher, c'est que les gens le veulent davantage.",
          },
          why: {
            en: "Cause and effect run the other way: strong demand can push a price up, but a price rise on its own makes people buy less.",
            ar: "العلاقة تسير في الاتجاه المعاكس: الطلب القوي قد يرفع السعر، لكن ارتفاع السعر وحده يجعل الناس يشترون أقل.",
            fr: "La cause et l'effet vont dans l'autre sens : une forte demande peut faire monter le prix, mais une hausse de prix seule fait acheter moins.",
          },
          tags: ["supply-demand"],
        },
        {
          value: "d",
          id: "demand-all-or-nothing",
          label: { en: "Thought demand vanishes", ar: "ظنّ أن الطلب يختفي", fr: "Cru que la demande disparaît" },
          found: {
            en: "You chose “drops to zero” — you saw that people buy less, but went too far.",
            ar: "اخترتَ «تهبط إلى الصفر»، فقد أدركت أن الناس يشترون أقل لكنك بالغت في ذلك.",
            fr: "Tu as choisi « tombe à zéro » : tu as bien vu qu'on achète moins, mais tu es allé trop loin.",
          },
          why: {
            en: "Demand usually falls gradually. Some people still buy, just fewer of them or less often.",
            ar: "ينخفض الطلب عادةً تدريجيًا؛ فبعض الناس يظلون يشترون، لكن بعدد أقل أو بمرات أقل.",
            fr: "La demande baisse en général progressivement : certains achètent encore, mais moins nombreux ou moins souvent.",
          },
          tags: ["supply-demand"],
        },
      ],
    },
    {
      concept: "econ",
      difficulty: 3,
      type: "numeric",
      prompt: { en: "Type the number of bottles:", ar: "اكتب عدد الزجاجات:", fr: "Écris le nombre de bouteilles :" },
      display: {
        en: "A shop sells 120 bottles of juice a day. After the price goes up, daily sales fall by 25%. How many bottles does it sell per day now?",
        ar: "يبيع متجر 120 زجاجة عصير يوميًا. بعد ارتفاع السعر انخفضت المبيعات اليومية بنسبة 25%. كم زجاجة يبيع يوميًا الآن؟",
        fr: "Un magasin vend 120 bouteilles de jus par jour. Après une hausse du prix, les ventes quotidiennes baissent de 25 %. Combien de bouteilles vend-il maintenant par jour ?",
      },
      answer: 90,
      hint: {
        en: "Find 25% of 120 first, then remember the sales fell.",
        ar: "احسب 25% من 120 أولًا، ثم تذكّر أن المبيعات انخفضت.",
        fr: "Calcule d'abord 25 % de 120, puis souviens-toi que les ventes ont baissé.",
      },
      steps: [
        { text: {
          en: "25% of 120 = 120 ÷ 4 = 30 bottles.",
          ar: "25% من 120 = 120 ÷ 4 = 30 زجاجة.",
          fr: "25 % de 120 = 120 ÷ 4 = 30 bouteilles.",
        } },
        { text: {
          en: "Sales fell, so subtract: 120 − 30 = 90 bottles per day.",
          ar: "المبيعات انخفضت، لذا نطرح: 120 − 30 = 90 زجاجة يوميًا.",
          fr: "Les ventes ont baissé, donc on soustrait : 120 − 30 = 90 bouteilles par jour.",
        } },
      ],
      misconceptions: [
        {
          value: 150,
          id: "price-up-demand-up",
          label: { en: "Higher price means more demand", ar: "السعر الأعلى يعني طلبًا أكبر", fr: "Prix plus haut, demande plus forte" },
          found: {
            en: "You wrote 150 — you added the 30 bottles, as if a higher price made people buy more.",
            ar: "كتبتَ 150، أي أنك أضفت 30 زجاجة كأن ارتفاع السعر يجعل الناس يشترون أكثر.",
            fr: "Tu as écrit 150 : tu as ajouté 30 bouteilles, comme si un prix plus élevé faisait acheter davantage.",
          },
          why: {
            en: "The question says sales fell. A higher price usually lowers the quantity bought, so subtract.",
            ar: "السؤال يقول إن المبيعات انخفضت؛ فارتفاع السعر يقلّل عادةً الكمية المشتراة، لذا نطرح.",
            fr: "L'énoncé dit que les ventes baissent. Un prix plus élevé réduit en général la quantité achetée : on soustrait.",
          },
          tags: ["supply-demand", "percentages"],
        },
        {
          value: 95,
          id: "percent-as-units",
          label: { en: "Treated 25% as 25 bottles", ar: "اعتبر 25% تساوي 25 زجاجة", fr: "Pris 25 % pour 25 bouteilles" },
          found: {
            en: "You wrote 95 — you took away 25 bottles instead of 25% of 120.",
            ar: "كتبتَ 95، أي أنك طرحت 25 زجاجة بدل 25% من 120.",
            fr: "Tu as écrit 95 : tu as retiré 25 bouteilles au lieu de 25 % de 120.",
          },
          why: {
            en: "A percentage is a part of the whole: 25% of 120 is 30, so the new total is 90.",
            ar: "النسبة المئوية جزء من الكل: 25% من 120 تساوي 30، إذن المجموع الجديد 90.",
            fr: "Un pourcentage est une part du total : 25 % de 120 font 30, donc le nouveau total est 90.",
          },
          tags: ["percentages"],
        },
      ],
    },
  ],
  demo: {
    before: { maps: 60, timeline: 40, climate: 55, civics: 65, econ: 50 },
    after: { maps: 85, timeline: 76, climate: 80, civics: 88, econ: 72 },
    confidence: { maps: 70, timeline: 72, climate: 60, civics: 75, econ: 55 },
  },
};
