// Language Library — English as a school subject (Grade 9–10).
// English sentences being tested stay in English in every language version.
export default {
  subject: "language",
  layers: [
    { en: "Building blocks", ar: "الأساسيات", fr: "Les bases" },
    { en: "Correct sentences", ar: "جمل صحيحة", fr: "Phrases correctes" },
    { en: "Reading & writing", ar: "القراءة والكتابة", fr: "Lire et écrire" },
  ],
  concepts: [
    {
      id: "tenses",
      hue: "#f97316",
      x: 140, y: 220, layer: 0,
      name: { en: "Verb Tenses", ar: "أزمنة الفعل", fr: "Les temps verbaux" },
      short: { en: "Tenses", ar: "الأزمنة", fr: "Temps" },
      desc: {
        en: "Choosing the verb form that shows when an action happens: past, present or future.",
        ar: "اختيار صيغة الفعل التي تبيّن وقت حدوث الفعل: في الماضي أو الحاضر أو المستقبل.",
        fr: "Choisir la forme du verbe qui indique quand l'action se passe : passé, présent ou futur.",
      },
      keyIdeas: [
        { icon: "🔁", text: {
          en: "The present simple describes habits and facts: \"She walks to school every day.\"",
          ar: "يُستخدم المضارع البسيط للعادات والحقائق: \"She walks to school every day.\"",
          fr: "Le présent simple décrit les habitudes et les faits : \"She walks to school every day.\"",
        } },
        { icon: "⏪", text: {
          en: "The past simple is for finished actions at a finished time, such as yesterday or last year.",
          ar: "يُستخدم الماضي البسيط لأفعال انتهت في وقت منتهٍ، مثل yesterday أو last year.",
          fr: "Le prétérit s'emploie pour des actions terminées à un moment terminé, comme yesterday ou last year.",
        } },
        { icon: "🧩", text: {
          en: "Many common verbs are irregular: go → went, eat → ate, see → saw.",
          ar: "كثير من الأفعال الشائعة شاذة: go → went وeat → ate وsee → saw.",
          fr: "Beaucoup de verbes courants sont irréguliers : go → went, eat → ate, see → saw.",
        } },
      ],
      explain: {
        basic: {
          en: "A tense tells the reader when something happens. Look for time words (every day, yesterday, now, tomorrow) and pick the verb form that matches them. Remember that not every past verb ends in -ed.",
          ar: "الزمن يخبر القارئ متى يحدث الفعل. ابحث عن كلمات الوقت (every day وyesterday وnow وtomorrow) واختر صيغة الفعل التي تناسبها. وتذكّر أنّ ليس كل فعل ماضٍ ينتهي بـ -ed.",
          fr: "Le temps indique au lecteur quand l'action a lieu. Repère les mots de temps (every day, yesterday, now, tomorrow) et choisis la forme du verbe qui leur correspond. N'oublie pas que tous les verbes au passé ne finissent pas en -ed.",
        },
        visual: {
          en: "Think of a timeline: time words are signposts on the road, and the verb must stop at the same signpost. \"Yesterday\" points left to the past, \"every day\" covers the whole road.",
          ar: "تخيّل خطًا زمنيًا: كلمات الوقت لافتات على الطريق، ويجب أن يقف الفعل عند اللافتة نفسها. كلمة \"Yesterday\" تشير إلى اليسار نحو الماضي، و\"every day\" تغطي الطريق كله.",
          fr: "Imagine une ligne du temps : les mots de temps sont des panneaux sur la route, et le verbe doit s'arrêter au même panneau. \"Yesterday\" pointe vers le passé, \"every day\" couvre toute la route.",
        },
        check: {
          en: "What is the past simple of \"buy\": buyed or bought?",
          ar: "ما صيغة الماضي البسيط للفعل \"buy\": هل هي buyed أم bought؟",
          fr: "Quel est le prétérit de \"buy\" : buyed ou bought ?",
        },
      },
      keys: ["tense", "tenses", "past", "present", "irregular", "verb", "temps", "passé", "présent", "irrégulier", "زمن", "أزمنة", "ماضي", "مضارع", "فعل"],
    },
    {
      id: "vocab",
      hue: "#22c55e",
      x: 140, y: 440, layer: 0,
      name: { en: "Vocabulary in Context", ar: "المفردات في السياق", fr: "Le vocabulaire en contexte" },
      short: { en: "Vocabulary", ar: "المفردات", fr: "Vocabulaire" },
      desc: {
        en: "Working out what a word means from the sentence around it and choosing the word that fits.",
        ar: "استنتاج معنى الكلمة من الجملة المحيطة بها واختيار الكلمة المناسبة.",
        fr: "Trouver le sens d'un mot grâce à la phrase qui l'entoure et choisir le mot qui convient.",
      },
      keyIdeas: [
        { icon: "🔍", text: {
          en: "Clue words around an unknown word often explain or contrast its meaning.",
          ar: "الكلمات المحيطة بالكلمة المجهولة غالبًا ما تشرح معناها أو تذكر عكسه.",
          fr: "Les mots autour d'un mot inconnu expliquent souvent son sens ou en donnent le contraire.",
        } },
        { icon: "⚠️", text: {
          en: "False friends look familiar but mean something else: \"actually\" means \"in fact\", not \"now\".",
          ar: "الأصدقاء المزيّفون كلمات تبدو مألوفة لكن معناها مختلف: \"actually\" تعني \"في الحقيقة\" وليس \"الآن\".",
          fr: "Les faux amis ressemblent à des mots connus mais veulent dire autre chose : \"actually\" signifie « en fait », pas « actuellement ».",
        } },
        { icon: "🔗", text: {
          en: "English has fixed word partners (collocations): we \"turn off\" a light and \"take\" a photo.",
          ar: "في الإنجليزية كلمات تأتي معًا دائمًا (المتلازمات): نقول \"turn off\" للضوء و\"take\" للصورة.",
          fr: "L'anglais a des associations de mots fixes (collocations) : on dit \"turn off\" la lumière et \"take\" une photo.",
        } },
      ],
      explain: {
        basic: {
          en: "Do not translate word by word from Arabic or French. Read the whole sentence, find the clues, and ask which word an English speaker would naturally use there.",
          ar: "لا تترجم كلمة بكلمة من العربية أو الفرنسية. اقرأ الجملة كاملة، وابحث عن القرائن، ثم اسأل نفسك: أي كلمة يستخدمها متحدث الإنجليزية بشكل طبيعي هنا؟",
          fr: "Ne traduis pas mot à mot depuis l'arabe ou le français. Lis toute la phrase, repère les indices et demande-toi quel mot un anglophone utiliserait naturellement à cet endroit.",
        },
        visual: {
          en: "An unknown word is like a missing puzzle piece: the pieces around it show its shape. You do not need the box picture, just the edges.",
          ar: "الكلمة المجهولة مثل قطعة ناقصة من أحجية: القطع المحيطة بها تكشف شكلها. لا تحتاج إلى صورة العلبة، تكفيك الحواف.",
          fr: "Un mot inconnu est comme une pièce de puzzle manquante : les pièces autour montrent sa forme. Pas besoin de l'image de la boîte, les bords suffisent.",
        },
        check: {
          en: "In \"The soup was so bland that I added salt and pepper\", does \"bland\" mean tasty or without much taste?",
          ar: "في الجملة \"The soup was so bland that I added salt and pepper\"، هل تعني \"bland\" لذيذًا أم قليل الطعم؟",
          fr: "Dans \"The soup was so bland that I added salt and pepper\", \"bland\" veut-il dire savoureux ou sans goût ?",
        },
      },
      keys: ["vocabulary", "word", "meaning", "context", "false friend", "collocation", "vocabulaire", "mot", "sens", "contexte", "faux ami", "مفردات", "كلمة", "معنى", "سياق"],
    },
    {
      id: "agree",
      hue: "#3b82f6",
      x: 520, y: 330, layer: 1,
      name: { en: "Subject–Verb Agreement", ar: "توافق الفاعل والفعل", fr: "L'accord sujet–verbe" },
      short: { en: "Agreement", ar: "التوافق", fr: "Accord" },
      desc: {
        en: "Making the verb match its subject, especially adding -s for he, she and it in the present simple.",
        ar: "جعل الفعل يتوافق مع فاعله، وخاصة إضافة -s مع he وshe وit في المضارع البسيط.",
        fr: "Accorder le verbe avec son sujet, surtout ajouter -s avec he, she et it au présent simple.",
      },
      keyIdeas: [
        { icon: "➕", text: {
          en: "With he, she, it or one person or thing, the present simple verb takes -s: \"He plays\".",
          ar: "مع he أو she أو it أو شخص أو شيء واحد، يأخذ فعل المضارع البسيط -s: \"He plays\".",
          fr: "Avec he, she, it ou une seule personne ou chose, le verbe au présent simple prend -s : \"He plays\".",
        } },
        { icon: "👥", text: {
          en: "Plural subjects take the verb without -s: \"My friends take the bus.\"",
          ar: "الفاعل الجمع يأخذ الفعل دون -s: \"My friends take the bus.\"",
          fr: "Un sujet pluriel prend le verbe sans -s : \"My friends take the bus.\"",
        } },
        { icon: "🎯", text: {
          en: "Find the real subject: in \"The list of students is\", the subject is \"list\", not \"students\".",
          ar: "ابحث عن الفاعل الحقيقي: في \"The list of students is\" الفاعل هو \"list\" وليس \"students\".",
          fr: "Trouve le vrai sujet : dans \"The list of students is\", le sujet est \"list\", pas \"students\".",
        } },
      ],
      explain: {
        basic: {
          en: "Ask \"who or what is doing the action?\" If it is one person or thing (he, she, it, my brother), add -s to the present verb. If it is more than one, or I/you/we/they, use the base verb.",
          ar: "اسأل: \"من الذي يقوم بالفعل؟\" إذا كان شخصًا أو شيئًا واحدًا (he أو she أو it أو my brother) فأضف -s إلى فعل المضارع. وإذا كان أكثر من واحد أو كان I/you/we/they فاستخدم الفعل في صيغته الأصلية.",
          fr: "Demande-toi « qui fait l'action ? ». Si c'est une seule personne ou chose (he, she, it, my brother), ajoute -s au verbe au présent. Si c'est plusieurs, ou I/you/we/they, garde la forme de base.",
        },
        visual: {
          en: "Imagine a see-saw: an -s on a singular subject's verb balances it. Plural nouns already carry their -s, so the verb does not need one.",
          ar: "تخيّل أرجوحة توازن: حرف -s على فعل الفاعل المفرد يوازنه. أما الأسماء الجمع فتحمل -s بنفسها، فلا يحتاج الفعل إليه.",
          fr: "Imagine une balançoire : le -s sur le verbe d'un sujet singulier l'équilibre. Les noms pluriels portent déjà leur -s, donc le verbe n'en a pas besoin.",
        },
        check: {
          en: "Which is correct: \"My mother cook dinner\" or \"My mother cooks dinner\"?",
          ar: "أيّهما صحيح: \"My mother cook dinner\" أم \"My mother cooks dinner\"؟",
          fr: "Laquelle est correcte : \"My mother cook dinner\" ou \"My mother cooks dinner\" ?",
        },
      },
      keys: ["agreement", "subject", "third person", "singular", "plural", "accord", "sujet", "pluriel", "singulier", "توافق", "فاعل", "مفرد", "جمع", "الغائب"],
    },
    {
      id: "reading",
      hue: "#a855f7",
      x: 900, y: 220, layer: 2,
      name: { en: "Reading Comprehension", ar: "الفهم القرائي", fr: "La compréhension écrite" },
      short: { en: "Reading", ar: "القراءة", fr: "Lecture" },
      desc: {
        en: "Finding the main idea of a short text and inferring what it means without saying it directly.",
        ar: "تحديد الفكرة الرئيسة لنص قصير واستنتاج ما يقصده دون أن يقوله صراحةً.",
        fr: "Trouver l'idée principale d'un texte court et déduire ce qu'il veut dire sans le dire directement.",
      },
      keyIdeas: [
        { icon: "🎯", text: {
          en: "The main idea covers the whole text, not just one detail or the first sentence.",
          ar: "الفكرة الرئيسة تشمل النص كله، وليست مجرد تفصيل واحد أو الجملة الأولى.",
          fr: "L'idée principale couvre tout le texte, pas seulement un détail ou la première phrase.",
        } },
        { icon: "🕵️", text: {
          en: "An inference joins clues in the text with common sense to reach an unstated conclusion.",
          ar: "الاستنتاج يربط القرائن في النص بالمنطق العام للوصول إلى نتيجة غير مذكورة.",
          fr: "Une inférence relie les indices du texte au bon sens pour arriver à une conclusion non écrite.",
        } },
        { icon: "🚫", text: {
          en: "A good answer is supported by the text; seeing the same word in an option is not proof.",
          ar: "الإجابة الصحيحة يدعمها النص؛ ووجود الكلمة نفسها في أحد الخيارات ليس دليلًا كافيًا.",
          fr: "Une bonne réponse s'appuie sur le texte ; retrouver le même mot dans une option n'est pas une preuve.",
        } },
      ],
      explain: {
        basic: {
          en: "Read the whole passage first. For the main idea, ask \"what is every sentence about?\" For an inference, list the clues and ask what they show together.",
          ar: "اقرأ النص كاملًا أولًا. لتحديد الفكرة الرئيسة اسأل: \"عمّ تتحدث كل الجمل؟\" وللاستنتاج، اجمع القرائن واسأل: ماذا تُظهر معًا؟",
          fr: "Lis d'abord tout le passage. Pour l'idée principale, demande-toi « de quoi parlent toutes les phrases ? ». Pour une inférence, relève les indices et demande-toi ce qu'ils montrent ensemble.",
        },
        visual: {
          en: "The main idea is the umbrella; every detail must fit under it. An inference is detective work: footprints and a wet coat mean someone came in from the rain.",
          ar: "الفكرة الرئيسة مظلّة يجب أن تقع تحتها كل التفاصيل. والاستنتاج عمل المحقق: آثار أقدام ومعطف مبلّل تعني أنّ أحدهم دخل من المطر.",
          fr: "L'idée principale est un parapluie : chaque détail doit tenir dessous. L'inférence, c'est un travail de détective : des traces de pas et un manteau mouillé signifient que quelqu'un vient de la pluie.",
        },
        check: {
          en: "\"Sara yawned, closed her book and turned off the lamp.\" What is Sara probably going to do?",
          ar: "\"Sara yawned, closed her book and turned off the lamp.\" ماذا ستفعل سارة على الأرجح؟",
          fr: "\"Sara yawned, closed her book and turned off the lamp.\" Que va probablement faire Sara ?",
        },
      },
      keys: ["reading", "comprehension", "main idea", "inference", "passage", "text", "lecture", "compréhension", "idée principale", "inférence", "texte", "قراءة", "فهم", "فكرة رئيسة", "استنتاج", "نص"],
    },
    {
      id: "punct",
      hue: "#ec4899",
      x: 900, y: 440, layer: 2,
      name: { en: "Punctuation & Capitalization", ar: "علامات الترقيم والأحرف الكبيرة", fr: "Ponctuation et majuscules" },
      short: { en: "Punctuation", ar: "الترقيم", fr: "Ponctuation" },
      desc: {
        en: "Using commas, full stops, apostrophes and capital letters correctly so writing is clear.",
        ar: "استخدام الفواصل والنقاط والفاصلة العليا والأحرف الكبيرة بشكل صحيح لتكون الكتابة واضحة.",
        fr: "Utiliser correctement les virgules, les points, les apostrophes et les majuscules pour écrire clairement.",
      },
      keyIdeas: [
        { icon: "🔠", text: {
          en: "Capitalize sentence starts, names, places, days, months and the pronoun \"I\".",
          ar: "اكتب بحرف كبير بداية الجملة والأسماء والأماكن والأيام والشهور والضمير \"I\".",
          fr: "Mets une majuscule au début de la phrase, aux noms, aux lieux, aux jours, aux mois et au pronom \"I\".",
        } },
        { icon: "✂️", text: {
          en: "A comma alone cannot join two full sentences; use a full stop or a comma plus and, but or so.",
          ar: "لا تكفي الفاصلة وحدها لربط جملتين كاملتين؛ استخدم نقطة أو فاصلة مع and أو but أو so.",
          fr: "Une virgule seule ne peut pas relier deux phrases complètes ; utilise un point ou une virgule suivie de and, but ou so.",
        } },
        { icon: "❗", text: {
          en: "\"it's\" means \"it is\"; \"its\" shows possession and has no apostrophe.",
          ar: "\"it's\" تعني \"it is\"؛ أما \"its\" فتدل على الملكية وليس فيها فاصلة عليا.",
          fr: "\"it's\" veut dire \"it is\" ; \"its\" exprime la possession et n'a pas d'apostrophe.",
        } },
      ],
      explain: {
        basic: {
          en: "Punctuation shows the reader where ideas stop and start. English capitalizes more words than Arabic (which has no capitals) or French (which writes days and \"je\" in lowercase).",
          ar: "علامات الترقيم تُري القارئ أين تبدأ الأفكار وأين تنتهي. والإنجليزية تستخدم الحرف الكبير في كلمات أكثر من العربية (التي لا تعرف الأحرف الكبيرة) ومن الفرنسية (التي تكتب الأيام و\"je\" بحرف صغير).",
          fr: "La ponctuation montre au lecteur où les idées commencent et s'arrêtent. L'anglais met plus de majuscules que l'arabe (qui n'en a pas) ou le français (qui écrit les jours et « je » en minuscules).",
        },
        visual: {
          en: "Punctuation marks are traffic signs: a full stop is a red light, a comma is a short yellow pause. Two cars cannot share one yellow light without a joining word.",
          ar: "علامات الترقيم إشارات مرور: النقطة ضوء أحمر، والفاصلة توقف قصير أصفر. ولا تمرّ سيارتان من ضوء أصفر واحد دون كلمة ربط.",
          fr: "La ponctuation, ce sont des feux de circulation : le point est un feu rouge, la virgule une courte pause orange. Deux voitures ne passent pas au même feu orange sans mot de liaison.",
        },
        check: {
          en: "Which needs a capital letter in English: \"monday\", \"school\" or \"breakfast\"?",
          ar: "أيّ كلمة تحتاج إلى حرف كبير في الإنجليزية: \"monday\" أم \"school\" أم \"breakfast\"؟",
          fr: "Quel mot prend une majuscule en anglais : \"monday\", \"school\" ou \"breakfast\" ?",
        },
      },
      keys: ["punctuation", "comma", "capital", "apostrophe", "full stop", "its", "ponctuation", "virgule", "majuscule", "point", "ترقيم", "فاصلة", "حرف كبير", "نقطة"],
    },
  ],
  edges: [
    ["tenses", "agree"],
    ["vocab", "agree"],
    ["vocab", "reading"],
    ["agree", "reading"],
    ["agree", "punct"],
  ],
  questions: [
    // ---------- tenses ----------
    {
      concept: "tenses",
      difficulty: 1,
      type: "mc",
      prompt: { en: "Choose the correct verb:", ar: "اختر الفعل الصحيح:", fr: "Choisis le bon verbe :" },
      display: {
        en: "She ___ to school every day.",
        ar: "She ___ to school every day.",
        fr: "She ___ to school every day.",
      },
      options: [
        { id: "a", text: { en: "go", ar: "go", fr: "go" } },
        { id: "b", text: { en: "goes", ar: "goes", fr: "goes" } },
        { id: "c", text: { en: "going", ar: "going", fr: "going" } },
        { id: "d", text: { en: "is go", ar: "is go", fr: "is go" } },
      ],
      answer: "b",
      hint: {
        en: "\"Every day\" shows a habit. Which tense do we use for habits?",
        ar: "عبارة \"every day\" تدل على عادة. أي زمن نستخدمه للعادات؟",
        fr: "\"Every day\" indique une habitude. Quel temps utilise-t-on pour les habitudes ?",
      },
      steps: [
        { text: {
          en: "\"Every day\" means a habit, so we need the present simple.",
          ar: "\"every day\" تعني عادة، لذلك نحتاج إلى المضارع البسيط.",
          fr: "\"Every day\" exprime une habitude, donc il faut le présent simple.",
        } },
        { text: {
          en: "The subject is \"she\", so the verb takes -s: go → goes.",
          ar: "الفاعل \"she\"، لذلك يأخذ الفعل -s: go → goes.",
          fr: "Le sujet est \"she\", donc le verbe prend -s : go → goes.",
        } },
      ],
      misconceptions: [
        { value: "a", id: "missing-third-s",
          label: { en: "Forgot the -s for she", ar: "نسيت -s مع she", fr: "Oublié le -s avec she" },
          found: {
            en: "You chose \"go\", so you used the base verb after \"she\".",
            ar: "اخترت \"go\"، أي استخدمت الفعل في صيغته الأصلية بعد \"she\".",
            fr: "Tu as choisi \"go\" : tu as gardé la forme de base après \"she\".",
          },
          why: {
            en: "In the present simple, he, she and it always add -s to the verb: she goes, he plays.",
            ar: "في المضارع البسيط تُضاف -s دائمًا إلى الفعل مع he وshe وit: she goes وhe plays.",
            fr: "Au présent simple, he, she et it ajoutent toujours -s au verbe : she goes, he plays.",
          },
          tags: ["present-simple", "third-person"] },
        { value: "c", id: "missing-auxiliary",
          label: { en: "Left out the helping verb", ar: "حذفت الفعل المساعد", fr: "Oublié l'auxiliaire" },
          found: {
            en: "You chose \"going\", which needs a helping verb such as \"is\" and does not show a habit.",
            ar: "اخترت \"going\"، وهي تحتاج إلى فعل مساعد مثل \"is\" ولا تدل على عادة.",
            fr: "Tu as choisi \"going\" : cette forme a besoin d'un auxiliaire comme \"is\" et n'exprime pas une habitude.",
          },
          why: {
            en: "An -ing verb cannot stand alone after the subject, and habits use the present simple.",
            ar: "الفعل المنتهي بـ -ing لا يأتي وحده بعد الفاعل، والعادات تُعبَّر عنها بالمضارع البسيط.",
            fr: "Un verbe en -ing ne peut pas suivre seul le sujet, et les habitudes s'expriment au présent simple.",
          },
          tags: ["auxiliary", "present-continuous"] },
      ],
    },
    {
      concept: "tenses",
      difficulty: 2,
      type: "mc",
      prompt: { en: "Choose the correct verb:", ar: "اختر الفعل الصحيح:", fr: "Choisis le bon verbe :" },
      display: {
        en: "Yesterday we ___ to the museum.",
        ar: "Yesterday we ___ to the museum.",
        fr: "Yesterday we ___ to the museum.",
      },
      options: [
        { id: "a", text: { en: "goed", ar: "goed", fr: "goed" } },
        { id: "b", text: { en: "go", ar: "go", fr: "go" } },
        { id: "c", text: { en: "went", ar: "went", fr: "went" } },
        { id: "d", text: { en: "have gone", ar: "have gone", fr: "have gone" } },
      ],
      answer: "c",
      hint: {
        en: "\"Yesterday\" is a finished time. Is \"go\" a regular verb?",
        ar: "\"Yesterday\" وقت منتهٍ. هل الفعل \"go\" فعل قياسي؟",
        fr: "\"Yesterday\" est un moment terminé. Le verbe \"go\" est-il régulier ?",
      },
      steps: [
        { text: {
          en: "\"Yesterday\" is a finished time, so we use the past simple.",
          ar: "\"Yesterday\" وقت منتهٍ، لذلك نستخدم الماضي البسيط.",
          fr: "\"Yesterday\" est un moment terminé, donc on utilise le prétérit.",
        } },
        { text: {
          en: "\"Go\" is irregular: its past simple is \"went\".",
          ar: "الفعل \"go\" شاذ، وماضيه البسيط \"went\".",
          fr: "\"Go\" est irrégulier : son prétérit est \"went\".",
        } },
      ],
      misconceptions: [
        { value: "a", id: "overregular-past",
          label: { en: "Added -ed to irregular verb", ar: "أضفت -ed لفعل شاذ", fr: "Ajouté -ed à un irrégulier" },
          found: {
            en: "You chose \"goed\", so you added -ed as if \"go\" were a regular verb.",
            ar: "اخترت \"goed\"، أي أضفت -ed كأنّ \"go\" فعل قياسي.",
            fr: "Tu as choisi \"goed\" : tu as ajouté -ed comme si \"go\" était régulier.",
          },
          why: {
            en: "Some common verbs have special past forms that must be learned: go → went, eat → ate.",
            ar: "لبعض الأفعال الشائعة صيغ ماضٍ خاصة يجب حفظها: go → went وeat → ate.",
            fr: "Certains verbes courants ont un prétérit particulier qu'il faut apprendre : go → went, eat → ate.",
          },
          tags: ["irregular-verbs", "past-simple"] },
        { value: "d", id: "perfect-finished-time",
          label: { en: "Present perfect with yesterday", ar: "المضارع التام مع yesterday", fr: "Present perfect avec yesterday" },
          found: {
            en: "You chose \"have gone\", maybe because it looks like \"nous sommes allés\" or feels like a completed action.",
            ar: "اخترت \"have gone\"، ربما لأنها تبدو فعلًا مكتملًا أو تشبه الصيغة الفرنسية \"nous sommes allés\".",
            fr: "Tu as choisi \"have gone\", sans doute parce que cela ressemble au passé composé « nous sommes allés ».",
          },
          why: {
            en: "In English, a finished time word like \"yesterday\" needs the past simple, not \"have + past participle\".",
            ar: "في الإنجليزية، كلمة وقت منتهٍ مثل \"yesterday\" تحتاج إلى الماضي البسيط، لا إلى \"have + التصريف الثالث\".",
            fr: "En anglais, un repère de temps terminé comme \"yesterday\" exige le prétérit, pas \"have + participe passé\".",
          },
          tags: ["present-perfect", "past-simple", "french-transfer"] },
      ],
    },
    {
      concept: "tenses",
      difficulty: 3,
      type: "numeric",
      prompt: {
        en: "How many verbs in this text are in the past simple?",
        ar: "كم فعلًا في هذا النص جاء في زمن الماضي البسيط؟",
        fr: "Combien de verbes de ce texte sont au prétérit ?",
      },
      display: {
        en: "I live in Amman. Last year I visited Petra and saw the Treasury.",
        ar: "I live in Amman. Last year I visited Petra and saw the Treasury.",
        fr: "I live in Amman. Last year I visited Petra and saw the Treasury.",
      },
      answer: 2,
      hint: {
        en: "Find every verb first, then check which ones talk about \"last year\". Not all past verbs end in -ed.",
        ar: "حدّد كل الأفعال أولًا، ثم انظر أيّها يتحدث عن \"last year\". ليست كل أفعال الماضي منتهية بـ -ed.",
        fr: "Repère d'abord tous les verbes, puis regarde lesquels parlent de \"last year\". Tous les verbes au passé ne finissent pas en -ed.",
      },
      steps: [
        { text: {
          en: "The verbs are: live, visited, saw.",
          ar: "الأفعال هي: live وvisited وsaw.",
          fr: "Les verbes sont : live, visited, saw.",
        } },
        { text: {
          en: "\"Live\" is present (it is still true). \"Visited\" is regular past and \"saw\" is the irregular past of \"see\".",
          ar: "\"live\" مضارع (ما زال صحيحًا). و\"visited\" ماضٍ قياسي، و\"saw\" هو الماضي الشاذ للفعل \"see\".",
          fr: "\"Live\" est au présent (c'est toujours vrai). \"Visited\" est un prétérit régulier et \"saw\" le prétérit irrégulier de \"see\".",
        } },
        { text: {
          en: "So there are 2 past simple verbs.",
          ar: "إذن يوجد فعلان في الماضي البسيط.",
          fr: "Il y a donc 2 verbes au prétérit.",
        } },
      ],
      misconceptions: [
        { value: 1, id: "past-only-ed",
          label: { en: "Counted only -ed verbs", ar: "عددت أفعال -ed فقط", fr: "Compté seulement les -ed" },
          found: {
            en: "You answered 1, so you probably counted only \"visited\" because it ends in -ed.",
            ar: "أجبت 1، وربما عددت \"visited\" فقط لأنها تنتهي بـ -ed.",
            fr: "Tu as répondu 1 : tu as sans doute compté seulement \"visited\" parce qu'il finit en -ed.",
          },
          why: {
            en: "Irregular verbs are past too, even without -ed: \"saw\" is the past of \"see\".",
            ar: "الأفعال الشاذة أفعال ماضية أيضًا ولو لم تنتهِ بـ -ed: فـ\"saw\" ماضي \"see\".",
            fr: "Les verbes irréguliers sont aussi au passé, même sans -ed : \"saw\" est le prétérit de \"see\".",
          },
          tags: ["irregular-verbs", "past-simple"] },
        { value: 3, id: "counted-all-verbs",
          label: { en: "Counted the present verb", ar: "عددت فعل المضارع", fr: "Compté le verbe au présent" },
          found: {
            en: "You answered 3, so you also counted \"live\", which is in the present.",
            ar: "أجبت 3، أي عددت أيضًا \"live\" وهو فعل مضارع.",
            fr: "Tu as répondu 3 : tu as aussi compté \"live\", qui est au présent.",
          },
          why: {
            en: "\"I live in Amman\" is still true now, so it stays in the present simple.",
            ar: "\"I live in Amman\" ما زالت صحيحة الآن، لذلك تبقى في المضارع البسيط.",
            fr: "\"I live in Amman\" est toujours vrai aujourd'hui, donc la phrase reste au présent simple.",
          },
          tags: ["present-simple", "tense-identification"] },
      ],
    },
    // ---------- agree ----------
    {
      concept: "agree",
      difficulty: 1,
      type: "mc",
      prompt: { en: "Choose the correct verb:", ar: "اختر الفعل الصحيح:", fr: "Choisis le bon verbe :" },
      display: {
        en: "My brother ___ football on Fridays.",
        ar: "My brother ___ football on Fridays.",
        fr: "My brother ___ football on Fridays.",
      },
      options: [
        { id: "a", text: { en: "play", ar: "play", fr: "play" } },
        { id: "b", text: { en: "plays", ar: "plays", fr: "plays" } },
        { id: "c", text: { en: "playing", ar: "playing", fr: "playing" } },
        { id: "d", text: { en: "are play", ar: "are play", fr: "are play" } },
      ],
      answer: "b",
      hint: {
        en: "\"My brother\" is one person. Which pronoun could replace it?",
        ar: "\"My brother\" شخص واحد. أي ضمير يمكن أن يحلّ محله؟",
        fr: "\"My brother\" est une seule personne. Quel pronom peut le remplacer ?",
      },
      steps: [
        { text: {
          en: "\"My brother\" = \"he\", a singular subject.",
          ar: "\"My brother\" = \"he\"، أي فاعل مفرد.",
          fr: "\"My brother\" = \"he\", un sujet singulier.",
        } },
        { text: {
          en: "With he/she/it, the present simple verb takes -s: plays.",
          ar: "مع he/she/it يأخذ فعل المضارع البسيط -s: plays.",
          fr: "Avec he/she/it, le verbe au présent simple prend -s : plays.",
        } },
      ],
      misconceptions: [
        { value: "a", id: "missing-third-s",
          label: { en: "Forgot the third-person -s", ar: "نسيت -s الغائب المفرد", fr: "Oublié le -s de la 3e personne" },
          found: {
            en: "You chose \"play\", like saying \"he play\".",
            ar: "اخترت \"play\"، وهذا مثل قول \"he play\".",
            fr: "Tu as choisi \"play\", comme si on disait \"he play\".",
          },
          why: {
            en: "A singular noun like \"my brother\" works like \"he\", so the verb needs -s.",
            ar: "الاسم المفرد مثل \"my brother\" يعامَل مثل \"he\"، لذلك يحتاج الفعل إلى -s.",
            fr: "Un nom singulier comme \"my brother\" fonctionne comme \"he\", donc le verbe prend -s.",
          },
          tags: ["third-person", "present-simple"] },
        { value: "d", id: "be-plus-base",
          label: { en: "Mixed \"are\" with a verb", ar: "خلطت \"are\" مع فعل", fr: "Mélangé \"are\" et un verbe" },
          found: {
            en: "You chose \"are play\", which puts a form of \"be\" before a base verb.",
            ar: "اخترت \"are play\"، وفيها وضعت صيغة من \"be\" قبل فعل في صيغته الأصلية.",
            fr: "Tu as choisi \"are play\" : tu as mis une forme de \"be\" devant un verbe de base.",
          },
          why: {
            en: "The present simple does not use \"be\" with another verb, and \"are\" is plural anyway.",
            ar: "المضارع البسيط لا يستخدم \"be\" مع فعل آخر، كما أنّ \"are\" للجمع أصلًا.",
            fr: "Le présent simple n'utilise pas \"be\" avec un autre verbe, et \"are\" est de toute façon pluriel.",
          },
          tags: ["auxiliary", "present-simple"] },
      ],
    },
    {
      concept: "agree",
      difficulty: 2,
      type: "mc",
      prompt: { en: "Choose the correct verb:", ar: "اختر الفعل الصحيح:", fr: "Choisis le bon verbe :" },
      display: {
        en: "The list of students ___ on the wall.",
        ar: "The list of students ___ on the wall.",
        fr: "The list of students ___ on the wall.",
      },
      options: [
        { id: "a", text: { en: "are", ar: "are", fr: "are" } },
        { id: "b", text: { en: "is", ar: "is", fr: "is" } },
        { id: "c", text: { en: "be", ar: "be", fr: "be" } },
        { id: "d", text: { en: "were", ar: "were", fr: "were" } },
      ],
      answer: "b",
      hint: {
        en: "What is on the wall: the students or the list?",
        ar: "ما الموجود على الحائط: الطلاب أم القائمة؟",
        fr: "Qu'est-ce qui est sur le mur : les élèves ou la liste ?",
      },
      steps: [
        { text: {
          en: "The real subject is \"the list\"; \"of students\" only describes it.",
          ar: "الفاعل الحقيقي هو \"the list\"، و\"of students\" تصفه فقط.",
          fr: "Le vrai sujet est \"the list\" ; \"of students\" ne fait que la décrire.",
        } },
        { text: {
          en: "\"List\" is singular, so the verb is \"is\".",
          ar: "\"list\" مفرد، لذلك الفعل هو \"is\".",
          fr: "\"List\" est singulier, donc le verbe est \"is\".",
        } },
      ],
      misconceptions: [
        { value: "a", id: "nearest-noun",
          label: { en: "Agreed with the nearest noun", ar: "طابقت أقرب اسم", fr: "Accordé avec le nom le plus proche" },
          found: {
            en: "You chose \"are\", so you matched the verb with \"students\", the word right before it.",
            ar: "اخترت \"are\"، أي جعلت الفعل يطابق \"students\"، وهي الكلمة التي تسبقه مباشرة.",
            fr: "Tu as choisi \"are\" : tu as accordé le verbe avec \"students\", le mot juste avant.",
          },
          why: {
            en: "The verb agrees with the main subject, \"list\", not with the noun after \"of\".",
            ar: "يتوافق الفعل مع الفاعل الأساسي \"list\"، لا مع الاسم الذي يأتي بعد \"of\".",
            fr: "Le verbe s'accorde avec le sujet principal, \"list\", et non avec le nom après \"of\".",
          },
          tags: ["subject-identification", "agreement"] },
        { value: "c", id: "base-be",
          label: { en: "Used \"be\" without changing it", ar: "استخدمت \"be\" دون تصريف", fr: "Gardé \"be\" sans le conjuguer" },
          found: {
            en: "You chose \"be\", the base form, which is not used after a subject in a normal sentence.",
            ar: "اخترت \"be\"، وهي الصيغة الأصلية التي لا تأتي بعد الفاعل في جملة عادية.",
            fr: "Tu as choisi \"be\", la forme de base, qu'on n'emploie pas après un sujet dans une phrase normale.",
          },
          why: {
            en: "\"Be\" must change to am, is or are in the present: one list → is.",
            ar: "يجب تصريف \"be\" إلى am أو is أو are في المضارع: قائمة واحدة → is.",
            fr: "\"Be\" doit devenir am, is ou are au présent : une liste → is.",
          },
          tags: ["verb-be", "agreement"] },
      ],
    },
    {
      concept: "agree",
      difficulty: 3,
      type: "numeric",
      prompt: {
        en: "How many verbs in this text have an agreement mistake?",
        ar: "كم فعلًا في هذا النص فيه خطأ في التوافق مع الفاعل؟",
        fr: "Combien de verbes de ce texte ont une erreur d'accord ?",
      },
      display: {
        en: "My sister work in a bank. She drive to work, but her friends takes the bus.",
        ar: "My sister work in a bank. She drive to work, but her friends takes the bus.",
        fr: "My sister work in a bank. She drive to work, but her friends takes the bus.",
      },
      answer: 3,
      hint: {
        en: "Check every verb with its subject. A plural subject can be wrong too.",
        ar: "افحص كل فعل مع فاعله. الفاعل الجمع قد يكون فيه خطأ أيضًا.",
        fr: "Vérifie chaque verbe avec son sujet. Un sujet pluriel peut aussi poser problème.",
      },
      steps: [
        { text: {
          en: "\"My sister work\" → \"works\" and \"She drive\" → \"drives\": singular subjects need -s.",
          ar: "\"My sister work\" ← \"works\" و\"She drive\" ← \"drives\": الفاعل المفرد يحتاج إلى -s.",
          fr: "\"My sister work\" → \"works\" et \"She drive\" → \"drives\" : un sujet singulier exige -s.",
        } },
        { text: {
          en: "\"Her friends takes\" → \"take\": a plural subject has no -s on the verb.",
          ar: "\"Her friends takes\" ← \"take\": الفاعل الجمع لا يأخذ فعله -s.",
          fr: "\"Her friends takes\" → \"take\" : un sujet pluriel n'a pas de -s sur le verbe.",
        } },
        { text: {
          en: "That makes 3 mistakes.",
          ar: "إذن هناك 3 أخطاء.",
          fr: "Cela fait 3 erreurs.",
        } },
      ],
      misconceptions: [
        { value: 2, id: "s-means-correct",
          label: { en: "Thought -s is always right", ar: "ظننت -s صحيحة دائمًا", fr: "Cru que -s est toujours juste" },
          found: {
            en: "You answered 2, so you found the missing -s but accepted \"her friends takes\".",
            ar: "أجبت 2، أي وجدت مواضع غياب -s لكنك قبلت \"her friends takes\".",
            fr: "Tu as répondu 2 : tu as trouvé les -s manquants mais accepté \"her friends takes\".",
          },
          why: {
            en: "The -s goes only with a singular subject; \"friends\" is plural, so it is \"take\".",
            ar: "تأتي -s مع الفاعل المفرد فقط؛ و\"friends\" جمع، لذلك نقول \"take\".",
            fr: "Le -s ne va qu'avec un sujet singulier ; \"friends\" est pluriel, donc on écrit \"take\".",
          },
          tags: ["plural-subject", "agreement"] },
      ],
    },
    // ---------- vocab ----------
    {
      concept: "vocab",
      difficulty: 1,
      type: "mc",
      prompt: {
        en: "What does the word \"narrow\" mean here?",
        ar: "ما معنى كلمة \"narrow\" في هذه الجملة؟",
        fr: "Que signifie le mot \"narrow\" ici ?",
      },
      display: {
        en: "The road was so narrow that two cars could not pass each other.",
        ar: "The road was so narrow that two cars could not pass each other.",
        fr: "The road was so narrow that two cars could not pass each other.",
      },
      options: [
        { id: "a", text: { en: "not wide", ar: "not wide", fr: "not wide" } },
        { id: "b", text: { en: "very long", ar: "very long", fr: "very long" } },
        { id: "c", text: { en: "dangerous", ar: "dangerous", fr: "dangerous" } },
        { id: "d", text: { en: "crowded", ar: "crowded", fr: "crowded" } },
      ],
      answer: "a",
      hint: {
        en: "Why could two cars not pass each other? Look at the clue after \"that\".",
        ar: "لماذا لم تستطع سيارتان المرور بجانب بعضهما؟ انظر إلى القرينة بعد \"that\".",
        fr: "Pourquoi deux voitures ne pouvaient-elles pas se croiser ? Regarde l'indice après \"that\".",
      },
      steps: [
        { text: {
          en: "\"So … that\" shows a result: the road's quality caused the problem.",
          ar: "تركيب \"so … that\" يدل على نتيجة: صفة الطريق سبّبت المشكلة.",
          fr: "\"So … that\" exprime une conséquence : la qualité de la route a causé le problème.",
        } },
        { text: {
          en: "Two cars cannot pass side by side when a road is not wide, so \"narrow\" = not wide.",
          ar: "لا تمرّ سيارتان جنبًا إلى جنب إذا لم يكن الطريق عريضًا، إذن \"narrow\" = غير عريض.",
          fr: "Deux voitures ne peuvent pas se croiser si la route n'est pas large, donc \"narrow\" = pas large.",
        } },
      ],
      misconceptions: [
        { value: "c", id: "guess-from-feeling",
          label: { en: "Guessed from the mood", ar: "خمّنت من الانطباع العام", fr: "Deviné d'après l'ambiance" },
          found: {
            en: "You chose \"dangerous\": it fits the feeling of the sentence, but not the clue.",
            ar: "اخترت \"dangerous\": وهي تناسب الإحساس العام للجملة، لكنها لا تناسب القرينة.",
            fr: "Tu as choisi \"dangerous\" : cela colle à l'ambiance de la phrase, mais pas à l'indice.",
          },
          why: {
            en: "Use the exact clue: cars not passing each other is about width, not danger.",
            ar: "استخدم القرينة الدقيقة: عدم قدرة السيارتين على المرور يتعلق بالعرض لا بالخطر.",
            fr: "Sers-toi de l'indice exact : des voitures qui ne se croisent pas, c'est une question de largeur, pas de danger.",
          },
          tags: ["context-clues"] },
        { value: "d", id: "related-not-exact",
          label: { en: "Picked a related idea", ar: "اخترت فكرة قريبة", fr: "Choisi une idée voisine" },
          found: {
            en: "You chose \"crowded\", which is about many cars, not the size of the road.",
            ar: "اخترت \"crowded\"، وهي تتعلق بكثرة السيارات لا بحجم الطريق.",
            fr: "Tu as choisi \"crowded\", qui parle du nombre de voitures, pas de la taille de la route.",
          },
          why: {
            en: "The sentence mentions only two cars, so the problem is the road's width.",
            ar: "الجملة تذكر سيارتين فقط، فالمشكلة إذن في عرض الطريق.",
            fr: "La phrase ne parle que de deux voitures : le problème vient donc de la largeur de la route.",
          },
          tags: ["context-clues"] },
      ],
    },
    {
      concept: "vocab",
      difficulty: 2,
      type: "mc",
      prompt: { en: "Choose the word that fits:", ar: "اختر الكلمة المناسبة:", fr: "Choisis le mot qui convient :" },
      display: {
        en: "I used to live in Irbid, but ___ I live in Amman.",
        ar: "I used to live in Irbid, but ___ I live in Amman.",
        fr: "I used to live in Irbid, but ___ I live in Amman.",
      },
      options: [
        { id: "a", text: { en: "actually", ar: "actually", fr: "actually" } },
        { id: "b", text: { en: "currently", ar: "currently", fr: "currently" } },
        { id: "c", text: { en: "eventually", ar: "eventually", fr: "eventually" } },
        { id: "d", text: { en: "already", ar: "already", fr: "already" } },
      ],
      answer: "b",
      hint: {
        en: "You need a word that means \"at the present time\".",
        ar: "تحتاج إلى كلمة تعني \"في الوقت الحاضر\".",
        fr: "Il te faut un mot qui veut dire « en ce moment ».",
      },
      steps: [
        { text: {
          en: "The sentence contrasts the past (used to live) with the present (live).",
          ar: "الجملة تقارن بين الماضي (used to live) والحاضر (live).",
          fr: "La phrase oppose le passé (used to live) au présent (live).",
        } },
        { text: {
          en: "\"Currently\" means \"at the present time\", so it fits.",
          ar: "\"currently\" تعني \"في الوقت الحاضر\"، لذلك هي المناسبة.",
          fr: "\"Currently\" signifie « actuellement », donc c'est le bon mot.",
        } },
      ],
      misconceptions: [
        { value: "a", id: "false-friend-actually",
          label: { en: "False friend: actually", ar: "صديق مزيّف: actually", fr: "Faux ami : actually" },
          found: {
            en: "You chose \"actually\", perhaps thinking it means \"actuellement\" (now).",
            ar: "اخترت \"actually\"، وربما ظننت أنها تعني \"حاليًا\" مثل الفرنسية \"actuellement\".",
            fr: "Tu as choisi \"actually\", sans doute en pensant à « actuellement ».",
          },
          why: {
            en: "\"Actually\" means \"in fact\" or \"really\". For \"now\" use \"currently\" or \"now\".",
            ar: "\"actually\" تعني \"في الحقيقة\" أو \"فعلًا\". وللتعبير عن \"الآن\" استخدم \"currently\" أو \"now\".",
            fr: "\"Actually\" veut dire « en fait ». Pour « maintenant », on dit \"currently\" ou \"now\".",
          },
          tags: ["false-friends", "french-transfer"] },
        { value: "c", id: "false-friend-eventually",
          label: { en: "False friend: eventually", ar: "صديق مزيّف: eventually", fr: "Faux ami : eventually" },
          found: {
            en: "You chose \"eventually\", which can look like \"éventuellement\" (possibly).",
            ar: "اخترت \"eventually\"، وقد تبدو شبيهة بالفرنسية \"éventuellement\" (ربما).",
            fr: "Tu as choisi \"eventually\", qui ressemble à « éventuellement ».",
          },
          why: {
            en: "\"Eventually\" means \"in the end, after a long time\", not \"now\" or \"possibly\".",
            ar: "\"eventually\" تعني \"في النهاية بعد وقت طويل\"، لا \"الآن\" ولا \"ربما\".",
            fr: "\"Eventually\" signifie « finalement, au bout d'un certain temps », ni « maintenant » ni « peut-être ».",
          },
          tags: ["false-friends", "french-transfer"] },
      ],
    },
    {
      concept: "vocab",
      difficulty: 3,
      type: "mc",
      prompt: { en: "Choose the natural English expression:", ar: "اختر التعبير الإنجليزي الطبيعي:", fr: "Choisis l'expression anglaise naturelle :" },
      display: {
        en: "Please ___ the light. I want to sleep.",
        ar: "Please ___ the light. I want to sleep.",
        fr: "Please ___ the light. I want to sleep.",
      },
      options: [
        { id: "a", text: { en: "close", ar: "close", fr: "close" } },
        { id: "b", text: { en: "turn off", ar: "turn off", fr: "turn off" } },
        { id: "c", text: { en: "shut down", ar: "shut down", fr: "shut down" } },
        { id: "d", text: { en: "turn on", ar: "turn on", fr: "turn on" } },
      ],
      answer: "b",
      hint: {
        en: "In English, lights are not opened or closed like doors.",
        ar: "في الإنجليزية لا نفتح الضوء ولا نغلقه كما نفعل مع الباب.",
        fr: "En anglais, on n'ouvre pas et on ne ferme pas la lumière comme une porte.",
      },
      steps: [
        { text: {
          en: "The speaker wants to sleep, so the light must stop.",
          ar: "المتحدث يريد النوم، لذلك يجب إطفاء الضوء.",
          fr: "La personne veut dormir, donc il faut éteindre la lumière.",
        } },
        { text: {
          en: "English uses \"turn off\" (or \"switch off\") with lights.",
          ar: "تستخدم الإنجليزية \"turn off\" (أو \"switch off\") مع الأضواء.",
          fr: "L'anglais utilise \"turn off\" (ou \"switch off\") pour la lumière.",
        } },
      ],
      misconceptions: [
        { value: "a", id: "literal-translation",
          label: { en: "Translated word by word", ar: "ترجمت كلمة بكلمة", fr: "Traduit mot à mot" },
          found: {
            en: "You chose \"close\", like \"سكّر الضو\" in spoken Arabic or \"fermer la lumière\" in French.",
            ar: "اخترت \"close\"، كما نقول في العامية \"سكّر الضو\".",
            fr: "Tu as choisi \"close\", comme « fermer la lumière » en français familier.",
          },
          why: {
            en: "Each language has its own word partners; in English we \"turn off\" a light and \"close\" a door.",
            ar: "لكل لغة متلازماتها الخاصة؛ ففي الإنجليزية نقول \"turn off\" للضوء و\"close\" للباب.",
            fr: "Chaque langue a ses propres associations ; en anglais, on dit \"turn off\" une lumière et \"close\" une porte.",
          },
          tags: ["collocations", "literal-translation"] },
        { value: "c", id: "wrong-collocation",
          label: { en: "Used a computer phrase", ar: "استخدمت تعبيرًا للحاسوب", fr: "Pris une expression d'ordinateur" },
          found: {
            en: "You chose \"shut down\", which we use for computers and factories.",
            ar: "اخترت \"shut down\"، وهي تُستخدم للحواسيب والمصانع.",
            fr: "Tu as choisi \"shut down\", qu'on emploie pour les ordinateurs ou les usines.",
          },
          why: {
            en: "Similar meanings do not always swap; a light goes with \"turn off\" or \"switch off\".",
            ar: "الكلمات المتقاربة في المعنى لا تتبادل دائمًا؛ فالضوء يأتي مع \"turn off\" أو \"switch off\".",
            fr: "Des sens proches ne sont pas toujours interchangeables : avec une lumière, on dit \"turn off\" ou \"switch off\".",
          },
          tags: ["collocations"] },
      ],
    },
    // ---------- reading ----------
    {
      concept: "reading",
      difficulty: 1,
      type: "mc",
      prompt: {
        en: "Read the text. What is the main idea?",
        ar: "اقرأ النص. ما الفكرة الرئيسة؟",
        fr: "Lis le texte. Quelle est l'idée principale ?",
      },
      display: {
        en: "Bees do much more than make honey. They carry pollen from flower to flower, which helps plants grow fruit. Without bees, many of the foods we eat would disappear.",
        ar: "Bees do much more than make honey. They carry pollen from flower to flower, which helps plants grow fruit. Without bees, many of the foods we eat would disappear.",
        fr: "Bees do much more than make honey. They carry pollen from flower to flower, which helps plants grow fruit. Without bees, many of the foods we eat would disappear.",
      },
      options: [
        { id: "a", text: { en: "Bees make honey.", ar: "Bees make honey.", fr: "Bees make honey." } },
        { id: "b", text: { en: "Bees are important for growing our food.", ar: "Bees are important for growing our food.", fr: "Bees are important for growing our food." } },
        { id: "c", text: { en: "Flowers have a lot of pollen.", ar: "Flowers have a lot of pollen.", fr: "Flowers have a lot of pollen." } },
        { id: "d", text: { en: "Many people are afraid of bees.", ar: "Many people are afraid of bees.", fr: "Many people are afraid of bees." } },
      ],
      answer: "b",
      hint: {
        en: "Which answer is true for all three sentences, not just one?",
        ar: "أي إجابة تنطبق على الجمل الثلاث كلها لا على جملة واحدة؟",
        fr: "Quelle réponse vaut pour les trois phrases, et pas pour une seule ?",
      },
      steps: [
        { text: {
          en: "Sentence 1 says bees do more than honey; sentences 2 and 3 explain pollen and food.",
          ar: "الجملة الأولى تقول إنّ النحل يفعل أكثر من صنع العسل، والجملتان الثانية والثالثة تشرحان حبوب اللقاح والغذاء.",
          fr: "La phrase 1 dit que les abeilles font plus que du miel ; les phrases 2 et 3 parlent du pollen et de la nourriture.",
        } },
        { text: {
          en: "The idea that joins them all: bees are important for our food.",
          ar: "الفكرة التي تجمعها كلها: النحل مهم لغذائنا.",
          fr: "L'idée qui les relie : les abeilles sont importantes pour notre nourriture.",
        } },
      ],
      misconceptions: [
        { value: "a", id: "detail-as-main-idea",
          label: { en: "Picked a detail", ar: "اخترت تفصيلًا", fr: "Choisi un détail" },
          found: {
            en: "You chose \"Bees make honey\", which comes from the first sentence only.",
            ar: "اخترت \"Bees make honey\"، وهي مأخوذة من الجملة الأولى فقط.",
            fr: "Tu as choisi \"Bees make honey\", qui vient seulement de la première phrase.",
          },
          why: {
            en: "The text even says bees do \"much more than\" this; the main idea must cover the whole text.",
            ar: "النص نفسه يقول إنّ النحل يفعل \"أكثر بكثير\" من ذلك؛ والفكرة الرئيسة يجب أن تشمل النص كله.",
            fr: "Le texte dit même que les abeilles font « bien plus » que cela ; l'idée principale doit couvrir tout le texte.",
          },
          tags: ["main-idea"] },
        { value: "d", id: "outside-knowledge",
          label: { en: "Used outside knowledge", ar: "اعتمدت على معلومات خارجية", fr: "Utilisé une info extérieure" },
          found: {
            en: "You chose \"Many people are afraid of bees\", which may be true but is not in the text.",
            ar: "اخترت \"Many people are afraid of bees\"، وقد تكون صحيحة لكنها غير موجودة في النص.",
            fr: "Tu as choisi \"Many people are afraid of bees\" : c'est peut-être vrai, mais ce n'est pas dans le texte.",
          },
          why: {
            en: "Answers must come from what the passage says, not from what we already know.",
            ar: "يجب أن تُستمد الإجابة مما يقوله النص، لا مما نعرفه مسبقًا.",
            fr: "La réponse doit venir de ce que dit le texte, pas de ce qu'on sait déjà.",
          },
          tags: ["text-evidence"] },
      ],
    },
    {
      concept: "reading",
      difficulty: 2,
      type: "mc",
      prompt: {
        en: "Read the text. What can you infer?",
        ar: "اقرأ النص. ماذا تستنتج؟",
        fr: "Lis le texte. Que peux-tu en déduire ?",
      },
      display: {
        en: "Lina looked out of the window and smiled. She put her umbrella back in the cupboard and took out her sunglasses.",
        ar: "Lina looked out of the window and smiled. She put her umbrella back in the cupboard and took out her sunglasses.",
        fr: "Lina looked out of the window and smiled. She put her umbrella back in the cupboard and took out her sunglasses.",
      },
      options: [
        { id: "a", text: { en: "It is raining heavily.", ar: "It is raining heavily.", fr: "It is raining heavily." } },
        { id: "b", text: { en: "The weather is sunny.", ar: "The weather is sunny.", fr: "The weather is sunny." } },
        { id: "c", text: { en: "Lina is going to sleep.", ar: "Lina is going to sleep.", fr: "Lina is going to sleep." } },
        { id: "d", text: { en: "Lina's umbrella is broken.", ar: "Lina's umbrella is broken.", fr: "Lina's umbrella is broken." } },
      ],
      answer: "b",
      hint: {
        en: "What did Lina put away, and what did she take instead?",
        ar: "ماذا أعادت لينا إلى مكانه، وماذا أخذت بدلًا منه؟",
        fr: "Qu'est-ce que Lina a rangé, et qu'a-t-elle pris à la place ?",
      },
      steps: [
        { text: {
          en: "Clues: she put the umbrella away and took sunglasses.",
          ar: "القرائن: أعادت المظلة إلى الخزانة وأخذت النظارة الشمسية.",
          fr: "Indices : elle range son parapluie et prend ses lunettes de soleil.",
        } },
        { text: {
          en: "People need sunglasses, not umbrellas, when it is sunny.",
          ar: "يحتاج الناس إلى النظارة الشمسية، لا إلى المظلة، عندما يكون الجو مشمسًا.",
          fr: "On a besoin de lunettes de soleil, pas d'un parapluie, quand il fait beau.",
        } },
      ],
      misconceptions: [
        { value: "a", id: "word-matching",
          label: { en: "Matched a word, not meaning", ar: "طابقت كلمة لا معنى", fr: "Repéré un mot, pas le sens" },
          found: {
            en: "You chose \"It is raining\", probably because you saw the word \"umbrella\".",
            ar: "اخترت \"It is raining\"، غالبًا لأنك رأيت كلمة \"umbrella\".",
            fr: "Tu as choisi \"It is raining\", sans doute parce que tu as vu le mot \"umbrella\".",
          },
          why: {
            en: "Read what happens to the umbrella: she puts it away, so she does not need it.",
            ar: "انتبه لما حدث للمظلة: لقد أعادتها إلى مكانها، أي أنها لا تحتاج إليها.",
            fr: "Regarde ce qu'elle fait du parapluie : elle le range, donc elle n'en a pas besoin.",
          },
          tags: ["inference", "word-matching"] },
        { value: "d", id: "over-inference",
          label: { en: "Inferred too much", ar: "استنتجت أكثر من اللازم", fr: "Trop déduit" },
          found: {
            en: "You chose \"Lina's umbrella is broken\", but nothing in the text suggests that.",
            ar: "اخترت \"Lina's umbrella is broken\"، لكن لا شيء في النص يدل على ذلك.",
            fr: "Tu as choisi \"Lina's umbrella is broken\", mais rien dans le texte ne l'indique.",
          },
          why: {
            en: "A good inference needs clues; the sunglasses and her smile point to sunny weather.",
            ar: "الاستنتاج الجيد يحتاج إلى قرائن، والنظارة الشمسية وابتسامتها تشيران إلى جو مشمس.",
            fr: "Une bonne déduction s'appuie sur des indices ; les lunettes de soleil et son sourire indiquent du beau temps.",
          },
          tags: ["inference", "text-evidence"] },
      ],
    },
    {
      concept: "reading",
      difficulty: 3,
      type: "mc",
      prompt: {
        en: "Read the text. What can you infer about Karim?",
        ar: "اقرأ النص. ماذا تستنتج عن كريم؟",
        fr: "Lis le texte. Que peux-tu déduire à propos de Karim ?",
      },
      display: {
        en: "Karim studied every evening for a month. On the day of the exam, he finished early and walked out smiling. A week later, his teacher asked him to help other students with the same topic.",
        ar: "Karim studied every evening for a month. On the day of the exam, he finished early and walked out smiling. A week later, his teacher asked him to help other students with the same topic.",
        fr: "Karim studied every evening for a month. On the day of the exam, he finished early and walked out smiling. A week later, his teacher asked him to help other students with the same topic.",
      },
      options: [
        { id: "a", text: { en: "Karim did well on the exam.", ar: "Karim did well on the exam.", fr: "Karim did well on the exam." } },
        { id: "b", text: { en: "Karim gave up because the exam was too hard.", ar: "Karim gave up because the exam was too hard.", fr: "Karim gave up because the exam was too hard." } },
        { id: "c", text: { en: "The teacher was angry with Karim.", ar: "The teacher was angry with Karim.", fr: "The teacher was angry with Karim." } },
        { id: "d", text: { en: "Karim does not like studying.", ar: "Karim does not like studying.", fr: "Karim does not like studying." } },
      ],
      answer: "a",
      hint: {
        en: "Put three clues together: how he studied, how he looked, and what the teacher asked.",
        ar: "اجمع ثلاث قرائن: كيف درس، وكيف بدا، وماذا طلب منه المعلم.",
        fr: "Réunis trois indices : comment il a révisé, son attitude et ce que le professeur lui a demandé.",
      },
      steps: [
        { text: {
          en: "He studied a lot and left the exam smiling.",
          ar: "درس كثيرًا وخرج من الامتحان مبتسمًا.",
          fr: "Il a beaucoup révisé et il est sorti de l'examen en souriant.",
        } },
        { text: {
          en: "A teacher asks a student to help others when that student understands the topic well.",
          ar: "يطلب المعلم من الطالب مساعدة زملائه عندما يكون قد فهم الموضوع جيدًا.",
          fr: "Un professeur demande à un élève d'aider les autres quand il maîtrise bien le sujet.",
        } },
        { text: {
          en: "So Karim most likely did well.",
          ar: "إذن على الأرجح أنّ كريم أدّى الامتحان بشكل جيد.",
          fr: "Karim a donc très probablement réussi.",
        } },
      ],
      misconceptions: [
        { value: "b", id: "single-clue",
          label: { en: "Used only one clue", ar: "اعتمدت على قرينة واحدة", fr: "Utilisé un seul indice" },
          found: {
            en: "You chose \"gave up\", maybe because \"finished early\" made you think he stopped.",
            ar: "اخترت \"gave up\"، ربما لأنّ عبارة \"finished early\" جعلتك تظن أنه توقف.",
            fr: "Tu as choisi \"gave up\", peut-être parce que \"finished early\" t'a fait penser qu'il avait abandonné.",
          },
          why: {
            en: "Check one clue against the others: smiling and helping classmates do not fit giving up.",
            ar: "قارن كل قرينة بالقرائن الأخرى: الابتسامة ومساعدة الزملاء لا تتفقان مع الاستسلام.",
            fr: "Confronte chaque indice aux autres : sourire et aider ses camarades ne vont pas avec un abandon.",
          },
          tags: ["inference", "combining-clues"] },
        { value: "d", id: "contradicts-text",
          label: { en: "Contradicted the text", ar: "خالفت ما في النص", fr: "Contredit le texte" },
          found: {
            en: "You chose \"does not like studying\", but he studied every evening for a month.",
            ar: "اخترت \"does not like studying\"، لكنه درس كل مساء لمدة شهر.",
            fr: "Tu as choisi \"does not like studying\", alors qu'il a révisé tous les soirs pendant un mois.",
          },
          why: {
            en: "An inference can go beyond the text, but it can never go against it.",
            ar: "قد يتجاوز الاستنتاج ما في النص، لكنه لا يمكن أن يناقضه أبدًا.",
            fr: "Une déduction peut aller au-delà du texte, mais jamais contre lui.",
          },
          tags: ["inference", "text-evidence"] },
      ],
    },
    // ---------- punct ----------
    {
      concept: "punct",
      difficulty: 1,
      type: "mc",
      prompt: { en: "Choose the correct word:", ar: "اختر الكلمة الصحيحة:", fr: "Choisis le bon mot :" },
      display: {
        en: "The cat is licking ___ paw.",
        ar: "The cat is licking ___ paw.",
        fr: "The cat is licking ___ paw.",
      },
      options: [
        { id: "a", text: { en: "it's", ar: "it's", fr: "it's" } },
        { id: "b", text: { en: "its", ar: "its", fr: "its" } },
        { id: "c", text: { en: "its'", ar: "its'", fr: "its'" } },
        { id: "d", text: { en: "it is", ar: "it is", fr: "it is" } },
      ],
      answer: "b",
      hint: {
        en: "Try replacing the blank with \"it is\". Does the sentence still make sense?",
        ar: "جرّب وضع \"it is\" مكان الفراغ. هل تبقى الجملة منطقية؟",
        fr: "Essaie de remplacer le blanc par \"it is\". La phrase a-t-elle encore un sens ?",
      },
      steps: [
        { text: {
          en: "The paw belongs to the cat, so we need a possessive word.",
          ar: "المخلب يخص القطة، لذلك نحتاج إلى كلمة تدل على الملكية.",
          fr: "La patte appartient au chat, donc il faut un possessif.",
        } },
        { text: {
          en: "The possessive is \"its\", with no apostrophe (like his, her).",
          ar: "كلمة الملكية هي \"its\" دون فاصلة عليا (مثل his وher).",
          fr: "Le possessif est \"its\", sans apostrophe (comme his, her).",
        } },
      ],
      misconceptions: [
        { value: "a", id: "its-its-confusion",
          label: { en: "Confused its and it's", ar: "خلطت بين its وit's", fr: "Confondu its et it's" },
          found: {
            en: "You chose \"it's\", maybe because an apostrophe often shows possession (Ali's book).",
            ar: "اخترت \"it's\"، ربما لأنّ الفاصلة العليا تدل غالبًا على الملكية (Ali's book).",
            fr: "Tu as choisi \"it's\", sans doute parce que l'apostrophe marque souvent la possession (Ali's book).",
          },
          why: {
            en: "\"It's\" always means \"it is\" or \"it has\". Possessive pronouns (its, his, hers) never use an apostrophe.",
            ar: "\"it's\" تعني دائمًا \"it is\" أو \"it has\". وضمائر الملكية (its وhis وhers) لا تأخذ فاصلة عليا أبدًا.",
            fr: "\"It's\" veut toujours dire \"it is\" ou \"it has\". Les possessifs (its, his, hers) n'ont jamais d'apostrophe.",
          },
          tags: ["apostrophe", "its-its"] },
        { value: "d", id: "expanded-contraction",
          label: { en: "Used \"it is\" for possession", ar: "استخدمت \"it is\" للملكية", fr: "Mis \"it is\" pour posséder" },
          found: {
            en: "You chose \"it is\", but \"The cat is licking it is paw\" does not make sense.",
            ar: "اخترت \"it is\"، لكن جملة \"The cat is licking it is paw\" غير منطقية.",
            fr: "Tu as choisi \"it is\", mais \"The cat is licking it is paw\" n'a pas de sens.",
          },
          why: {
            en: "We need a word that shows the paw belongs to the cat: \"its\".",
            ar: "نحتاج إلى كلمة تبيّن أنّ المخلب للقطة: \"its\".",
            fr: "Il faut un mot qui montre que la patte est au chat : \"its\".",
          },
          tags: ["apostrophe", "its-its"] },
      ],
    },
    {
      concept: "punct",
      difficulty: 2,
      type: "mc",
      prompt: {
        en: "Which sentence is punctuated correctly?",
        ar: "أيّ جملة علامات ترقيمها صحيحة؟",
        fr: "Quelle phrase est correctement ponctuée ?",
      },
      display: {
        en: "I was tired / I went to bed early",
        ar: "I was tired / I went to bed early",
        fr: "I was tired / I went to bed early",
      },
      options: [
        { id: "a", text: { en: "I was tired, I went to bed early.", ar: "I was tired, I went to bed early.", fr: "I was tired, I went to bed early." } },
        { id: "b", text: { en: "I was tired, so I went to bed early.", ar: "I was tired, so I went to bed early.", fr: "I was tired, so I went to bed early." } },
        { id: "c", text: { en: "I was tired so, I went to bed early.", ar: "I was tired so, I went to bed early.", fr: "I was tired so, I went to bed early." } },
        { id: "d", text: { en: "I was tired. so I went to bed early.", ar: "I was tired. so I went to bed early.", fr: "I was tired. so I went to bed early." } },
      ],
      answer: "b",
      hint: {
        en: "Both parts are full sentences. What do you need to join them with a comma?",
        ar: "كل جزء جملة كاملة. ماذا تحتاج لربطهما بفاصلة؟",
        fr: "Les deux parties sont des phrases complètes. Que faut-il pour les relier avec une virgule ?",
      },
      steps: [
        { text: {
          en: "\"I was tired\" and \"I went to bed early\" are both complete sentences.",
          ar: "\"I was tired\" و\"I went to bed early\" جملتان كاملتان.",
          fr: "\"I was tired\" et \"I went to bed early\" sont deux phrases complètes.",
        } },
        { text: {
          en: "To join them, use a comma + a joining word (and, but, so): \", so\".",
          ar: "لربطهما نستخدم فاصلة + أداة ربط (and أو but أو so): \", so\".",
          fr: "Pour les relier, on met une virgule + un mot de liaison (and, but, so) : \", so\".",
        } },
      ],
      misconceptions: [
        { value: "a", id: "comma-splice",
          label: { en: "Joined sentences with a comma", ar: "ربطت جملتين بفاصلة فقط", fr: "Relié deux phrases par une virgule" },
          found: {
            en: "You chose the sentence with only a comma between two full sentences.",
            ar: "اخترت الجملة التي لا يفصل بين جزأيها الكاملين سوى فاصلة.",
            fr: "Tu as choisi la phrase où seule une virgule sépare deux phrases complètes.",
          },
          why: {
            en: "In English this is a comma splice; add \"so\" after the comma or use a full stop.",
            ar: "يُعدّ هذا خطأ في الإنجليزية؛ أضف \"so\" بعد الفاصلة أو استخدم نقطة.",
            fr: "En anglais, c'est une faute (comma splice) : ajoute \"so\" après la virgule ou mets un point.",
          },
          tags: ["comma-splice", "commas"] },
        { value: "d", id: "lowercase-after-stop",
          label: { en: "No capital after full stop", ar: "لا حرف كبير بعد النقطة", fr: "Pas de majuscule après le point" },
          found: {
            en: "You chose the sentence that starts \"so\" with a small letter after a full stop.",
            ar: "اخترت الجملة التي تبدأ فيها \"so\" بحرف صغير بعد النقطة.",
            fr: "Tu as choisi la phrase où \"so\" commence par une minuscule après un point.",
          },
          why: {
            en: "After a full stop, a new sentence always starts with a capital letter.",
            ar: "بعد النقطة تبدأ الجملة الجديدة دائمًا بحرف كبير.",
            fr: "Après un point, une nouvelle phrase commence toujours par une majuscule.",
          },
          tags: ["capitalization"] },
      ],
    },
    {
      concept: "punct",
      difficulty: 3,
      type: "numeric",
      prompt: {
        en: "How many capital letters are missing in this sentence?",
        ar: "كم حرفًا كبيرًا ينقص في هذه الجملة؟",
        fr: "Combien de majuscules manque-t-il dans cette phrase ?",
      },
      display: {
        en: "last monday, ahmad and i visited the dead sea.",
        ar: "last monday, ahmad and i visited the dead sea.",
        fr: "last monday, ahmad and i visited the dead sea.",
      },
      answer: 6,
      hint: {
        en: "Check the first word, the day, the name, the pronoun \"i\" and the place name (two words).",
        ar: "تحقّق من الكلمة الأولى، واسم اليوم، واسم الشخص، والضمير \"i\"، واسم المكان (كلمتان).",
        fr: "Vérifie le premier mot, le jour, le prénom, le pronom \"i\" et le nom de lieu (deux mots).",
      },
      steps: [
        { text: {
          en: "Sentence start: Last. Day: Monday. Name: Ahmad.",
          ar: "بداية الجملة: Last. اليوم: Monday. الاسم: Ahmad.",
          fr: "Début de phrase : Last. Jour : Monday. Prénom : Ahmad.",
        } },
        { text: {
          en: "The pronoun \"I\" is always a capital. Place: Dead Sea (2 capitals).",
          ar: "الضمير \"I\" يُكتب دائمًا بحرف كبير. المكان: Dead Sea (حرفان كبيران).",
          fr: "Le pronom \"I\" prend toujours une majuscule. Lieu : Dead Sea (2 majuscules).",
        } },
        { text: {
          en: "1 + 1 + 1 + 1 + 2 = 6 missing capitals.",
          ar: "1 + 1 + 1 + 1 + 2 = 6 أحرف كبيرة ناقصة.",
          fr: "1 + 1 + 1 + 1 + 2 = 6 majuscules manquantes.",
        } },
      ],
      misconceptions: [
        { value: 5, id: "missed-i-or-day",
          label: { en: "Missed \"I\" or the day", ar: "فاتك \"I\" أو اسم اليوم", fr: "Oublié \"I\" ou le jour" },
          found: {
            en: "You answered 5, so you probably missed either the pronoun \"I\" or \"Monday\".",
            ar: "أجبت 5، وربما فاتك إمّا الضمير \"I\" وإمّا \"Monday\".",
            fr: "Tu as répondu 5 : tu as sans doute oublié soit le pronom \"I\", soit \"Monday\".",
          },
          why: {
            en: "Unlike French \"je\" and \"lundi\", English always capitalizes \"I\" and the days of the week.",
            ar: "على عكس الفرنسية، تكتب الإنجليزية دائمًا \"I\" وأيام الأسبوع بحرف كبير.",
            fr: "Contrairement à « je » et « lundi » en français, l'anglais met toujours une majuscule à \"I\" et aux jours.",
          },
          tags: ["capitalization", "french-transfer"] },
        { value: 4, id: "missed-i-and-day",
          label: { en: "Missed both \"I\" and the day", ar: "فاتك \"I\" واسم اليوم", fr: "Oublié \"I\" et le jour" },
          found: {
            en: "You answered 4, so you probably capitalized the names but not \"I\" or \"Monday\".",
            ar: "أجبت 4، وربما كتبت الأسماء بحرف كبير لكن ليس \"I\" ولا \"Monday\".",
            fr: "Tu as répondu 4 : tu as sans doute mis une majuscule aux noms, mais pas à \"I\" ni à \"Monday\".",
          },
          why: {
            en: "English capitals go on more than names: the word \"I\" and days and months always need one.",
            ar: "الحرف الكبير في الإنجليزية لا يقتصر على الأسماء: فالكلمة \"I\" والأيام والشهور تحتاج إليه دائمًا.",
            fr: "En anglais, les majuscules ne sont pas réservées aux noms : \"I\", les jours et les mois en prennent toujours une.",
          },
          tags: ["capitalization", "french-transfer"] },
      ],
    },
  ],
  demo: {
    before: { tenses: 62, vocab: 55, agree: 40, reading: 58, punct: 50 },
    after: { tenses: 82, vocab: 74, agree: 78, reading: 76, punct: 72 },
    confidence: { tenses: 75, vocab: 60, agree: 70, reading: 65, punct: 55 },
  },
};
