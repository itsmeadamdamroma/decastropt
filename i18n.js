// i18n.js — DOM-based bilingual IT/EN for Decastro PT
// No framework, no rebuild. Text swap via dictionary + MutationObserver for SPA.
(function(){
'use strict';

const DICT = {
  // Nav
  "Metodo": "Method",
  "Il metodo": "Method",
  "Servizi": "Services",
  "Storie": "Stories",
  "Contatti": "Contact",
  "Risultati": "Results",
  "Blog": "Blog",
  "FAQ": "FAQ",
  "Chi sono": "About",
  // Hero
  "Personal trainer · Schede tecniche su misura": "Personal trainer · Custom technical programs",
  "Schede tecniche · Calcolate su di te": "Technical programs · Calculated on you",
  "La tua scheda d'allenamento, calcolata su di te.": "Your training program, calculated on you.",
  "Rispondi a poche domande. Ricevi il tuo protocollo tecnico in PDF, calcolato su di te.": "Answer a few questions. Receive your technical protocol in PDF, calculated on you.",
  "Scopri il metodo": "Discover the method",
  "Richiedi ora": "Request now",
  "Richiedi la tua scheda": "Request your program",
  "Richiedi scheda": "Request program",
  "Richiedi la": "Request your",
  "Parla con Davide": "Talk to Davide",
  "Chi si allena con metodo": "Who trains with method",
  "Scegli il tuo protocollo": "Choose your protocol",
  "PLANS": "PLANS",
  // Plans
  "Single Plan": "Single Plan",
  "Evolution Pack": "Evolution Pack",
  "Ricomposizione · Single Plan": "Recomposition · Single Plan",
  "Ricondizionamento": "Reconditioning",
  "Scheda tecnica": "Technical program",
  "Scheda tecnica personalizzata": "Custom technical program",
  "Valutazione": "Assessment",
  "BMI · BMR · TDEE": "BMI · BMR · TDEE",
  "PDF pronto per la palestra": "PDF ready for the gym",
  "3 mesocicli progressivi": "3 progressive mesocycles",
  "Check-in mensile dei progressi": "Monthly progress check-in",
  "Supporto email 7 giorni": "7-day email support",
  "Priorità nelle risposte": "Priority responses",
  "Consulenza diretta con Davide. Percorso completo, seguito passo dopo passo. Su richiesta.": "Direct consultation with Davide. Complete journey, step by step. On request.",
  "Prezzi trasparenti. Nessun abbonamento nascosto, solo lavoro tecnico su di te.": "Transparent pricing. No hidden subscriptions, just technical work on you.",
  "Parto dai tuoi dati: BMI, BMR e TDEE, insieme all'obiettivo calorico. Su questi numeri costruisco volume, intensità e recupero. Niente template generici.": "I start from your data: BMI, BMR and TDEE, along with the caloric target. On these numbers I build volume, intensity and recovery. No generic templates.",
  "Non schede copiate da Instagram. Costruisco protocolli personalizzati da": "Protocolli costruiti sui tuoi dati, non su trend. Programmi personalizzati da",
  "dati reali": "real data",
  "tua scheda": "your program",
  // Form
  "Il tuo nome": "Your name",
  "Email": "Email",
  "Obiettivo": "Goal",
  "Seleziona un obiettivo": "Select a goal",
  "tu@email.com": "you@email.com",
  "Compila nome, email e obiettivo.": "Fill in name, email and goal.",
  // FAQ
  "In quanto tempo ricevo la mia scheda?": "How soon do I receive my program?",
  "Dopo aver ricevuto le tue risposte, consegno la scheda in PDF entro 48–72 ore lavorative, pronta da portare in palestra.": "After receiving your answers, I deliver the program in PDF within 48–72 business hours, ready to take to the gym.",
  "Posso passare da Single Plan a Evolution Pack?": "Can I switch from Single Plan to Evolution Pack?",
  "Assolutamente. Molti iniziano con una singola scheda e poi passano al percorso progressivo. Scalo il prezzo già pagato sul pacchetto.": "Absolutely. Many start with a single program and then move to the progressive journey. I scale the already-paid price on the package.",
  "Come vengono calcolate le schede?": "How are programs calculated?",
  "Indicali nel form o durante la valutazione: adatto esercizi e carichi per allenarti in sicurezza senza sacrificare i risultati.": "Indicate them in the form or during the assessment: I adapt exercises and loads so you can train safely without sacrificing results.",
  "In 8 settimane ho recuperato forza senza rischiare la schiena. La scheda era chiara e ogni scelta aveva un senso. Finalmente non seguo più programmi a caso.": "In 8 weeks I regained strength without risking my back. The program was clear and every choice made sense. I finally stopped following random programs.",
  "Prenota consulenza gratuita": "Book free consultation",
  "Come funziona la prima consulenza?": "How does the first consultation work?",
  "La prima consulenza è gratuita e serve a capire i tuoi obiettivi, il tuo livello attuale e costruire un percorso personalizzato.": "The first consultation is free and helps understand your goals, your current level and build a personalized journey.",
  "Le schede sono personalizzate?": "Are the programs personalized?",
  "Sì, ogni scheda è costruita su misura basandosi sui tuoi obiettivi, esperienza, equipaggiamento disponibile e tempo.": "Yes, each program is custom-built based on your goals, experience, available equipment and time.",
  "Posso allenarmi a casa?": "Can I train at home?",
  "Sì, le schede sono adattabili sia per palestra che per allenamento a casa con o senza attrezzatura.": "Yes, programs are adaptable for both gym and home training with or without equipment.",
  "Devo avere una palestra completa?": "Do I need a full gym?",
  "No. Adatto la scheda a ciò che hai a disposizione, che sia una palestra completa o un setup essenziale a casa.": "No. I adapt the program to what you have available, whether a full gym or a basic home setup.",
  "Posso iniziare con una singola scheda?": "Can I start with a single program?",
  "Quanto costa una scheda personalizzata?": "How much does a custom program cost?",
  "Il prezzo varia in base al pacchetto scelto (singola scheda, percorso mensile, pacchetto progressivo). La prima consulenza è sempre gratuita.": "Price varies based on the chosen package (single program, monthly journey, progressive package). The first consultation is always free.",
  "Offri consulenza nutrizionale?": "Do you offer nutrition consultation?",
  "Sì, offriamo piano alimentare opzionale come servizio aggiuntivo alla scheda tecnica di allenamento.": "Yes, we offer an optional meal plan as an add-on to the training program.",
  "Soffro di problemi alla schiena, posso allenarmi?": "I have back problems, can I train?",
  // Index static
  "Personal Trainer Roma | Davide Decastro PT — Schede su Misura": "Personal Trainer Rome | Davide Decastro PT — Custom Programs",
  "Davide Decastro PT — Personal Trainer a Roma": "Davide Decastro PT — Personal Trainer in Rome",
  "Personal trainer a Roma. Schede tecniche su misura, programmazione personalizzata e metodo scientifico per raggiungere i tuoi obiettivi. Prima consulenza gratuita.": "Personal trainer in Rome. Custom technical programs, personalized training and scientific method to reach your goals. First consultation free.",
  "Assessment personalizzato": "Custom assessment",
  "BMI, BFR, BMR, TDEE, analisi posturale": "BMI, BFR, BMR, TDEE, posture analysis",
  "Scheda tecnica personalizzata": "Custom technical program",
  "PDF con protocollo di allenamento su misura": "PDF with custom training protocol",
  "Follow-up": "Follow-up",
  "Monitoraggio progressi e aggiustamenti": "Progress monitoring and adjustments",
  "Consulenza nutrizionale": "Nutrition consultation",
  "Piano alimentare opzionale": "Optional meal plan",
  "Metodo (3 Step)": "Method (3 Steps)",
  "Valutazione": "Assessment",
  "BMI, BMR, TDEE e obiettivo calorico. Partiamo dai tuoi numeri reali, non da stime generiche.": "BMI, BMR, TDEE and caloric target. We start from your real numbers, not generic estimates.",
  "Scheda su misura": "Custom program",
  "PDF via email, pronto da portare in palestra. Chiaro, tecnico e immediatamente applicabile.": "PDF via email, ready for the gym. Clear, technical and immediately applicable.",
  "Consegna": "Delivery",
  "PDF pronto per la palestra entro 48-72 ore lavorative.": "PDF ready for the gym within 48-72 business hours.",
  "Perché scegliere Decastro PT": "Why choose Decastro PT",
  "Non schede copiate da Instagram. Costruisco protocolli personalizzati dai tuoi dati reali: BMI, BMR, TDEE. Rispondi a poche domande e ricevi la tua scheda in PDF.": "Protocolli personalizzati costruiti sui tuoi dati reali: BMI, BMR, TDEE. Rispondi a poche domande e ricevi la tua scheda in PDF.",
  // Servizi page
  "Servizi e Prezzi": "Services & Pricing",
  "Servizi e Prezzi | Davide Decastro PT — Personal Trainer Roma": "Services & Pricing | Davide Decastro PT — Personal Trainer Rome",
  "Personal training a Roma. Prezzi chiari, nessun pacchetto nascosto.": "Personal training in Rome. Clear pricing, no hidden packages.",
  "Assessment Personalizzato": "Custom Assessment",
  "€50 · 60 min": "€50 · 60 min",
  "Valutazione completa: BMI, BFR (body fat ratio), BMR (metabolismo basale), TDEE (fabbisogno calorico giornaliero), analisi posturale e test di mobilità. Da questi numeri costruisco volume, intensità e recupero della tua scheda.": "Complete evaluation: BMI, BFR (body fat ratio), BMR (basal metabolic rate), TDEE (daily caloric need), posture analysis and mobility test. From these numbers I build volume, intensity and recovery of your program.",
  "Capisci": "Understand",
  "da dove parti, con dati reali non stime": "where you start, with real data not estimates",
  "Ricevi": "Receive",
  "un report con i tuoi valori e cosa significano": "a report with your values and what they mean",
  "Base": "Baseline",
  "per ogni scheda successiva": "for every subsequent program",
  "Scheda Tecnica Personalizzata": "Custom Technical Program",
  "€80 · PDF consegnato in 48-72h": "€80 · PDF delivered in 48-72h",
  "Protocollo di allenamento su misura in PDF. Costruito sui tuoi obiettivi, livello, equipaggiamento disponibile e tempo. Pronto da portare in palestra.": "Custom training protocol in PDF. Built on your goals, level, available equipment and time. Ready for the gym.",
  "Esercizi": "Exercises",
  "selezionati per te, non copiati da internet": "selected for you, based on your goals and equipment",
  "Set, reps, recupero": "Sets, reps, rest",
  "calcolati sul tuo livello": "calculated on your level",
  "Progressione": "Progression",
  "settimanale definita": "weekly, defined",
  "Adattamento": "Adaptation",
  "per infortuni o limitazioni": "for injuries or limitations",
  "Follow-up Mensile": "Monthly Follow-up",
  "€30 · 30 min": "€30 · 30 min",
  "Monitoraggio progressi e aggiustamento della scheda. Ricalcolo di volumi e intensità in base ai tuoi risultati.": "Progress monitoring and program adjustment. Recalculation of volume and intensity based on your results.",
  "Riguarda": "Review",
  "i tuoi log di allenamento": "your training logs",
  "Modifica": "Modify",
  "esercizi, set, reps se qualcosa non funziona": "exercises, sets, reps if something isn't working",
  "Aggiorna": "Update",
  "BMI/BFR/TDEE se il tuo corpo è cambiato": "BMI/BFR/TDEE if your body has changed",
  "Consulenza Nutrizionale": "Nutrition Consultation",
  "€40 · 45 min": "€40 · 45 min",
  "Piano alimentare personalizzato, opzionale ma complementare alla scheda. Calcolo macronutrienti (proteine, carboidrati, grassi) sul tuo TDEE reale.": "Personalized meal plan, optional but complementary to the program. Macro calculation (protein, carbs, fat) on your real TDEE.",
  "Non": "Not",
  "una dieta generica, ma un piano sui tuoi numeri": "a generic diet, but a plan on your numbers",
  "Target": "Target",
  "calorico allineato all'obiettivo (massa, definizione, dimagrimento)": "caloric aligned with the goal (bulk, definition, weight loss)",
  "Flexibile": "Flexible",
  ": nessun cibo vietato, solo proporzioni": ": no forbidden foods, just proportions",
  "Tabella prezzi riassuntiva": "Price summary table",
  "Servizio": "Service",
  "Durata": "Duration",
  "Prezzo": "Price",
  "60 min": "60 min",
  "PDF 48-72h": "PDF 48-72h",
  "30 min": "30 min",
  "45 min": "45 min",
  "Come iniziare": "How to start",
  "prima consulenza è gratuita": "first consultation is free",
  "Contattami": "Contact me",
  "per capire insieme i tuoi obiettivi e costruire il percorso giusto.": "to understand your goals together and build the right journey.",
  "Prenota la consulenza gratuita →": "Book the free consultation →",
  "Consulenza gratuita su Calendly": "Free consultation on Calendly",
  "← Torna al sito": "← Back to site",
  // SPA missing strings
  "frequenti": "frequent",
  "improvvisazione.": "improvisation.",
  ". Rispondi a poche domande e ricevi la tua scheda in PDF.": ". Answer a few questions and receive your program in PDF.",
  "1:1 Coaching": "1:1 Coaching",
  "3 schede progressive + check-in": "3 progressive programs + check-in",
  "Altro": "Other",
  "Consegna professionale": "Professional delivery",
  "Dimagrimento": "Weight loss",
  "Domande ": "Questions ",
  "Esercizi, serie, ripetizioni e recupero calibrati su di te. Ogni parametro ha una ragione.": "Exercises, sets, reps and rest calibrated on you. Every parameter has a reason.",
  "Forza": "Strength",
  "Giulia R.": "GIULIA R.",
  "Instagram": "Instagram",
  "Invia richiesta": "Send request",
  "L'Evolution Pack mi ha tenuto costante per tre mesi. I check-in mensili hanno fatto la differenza: ogni scheda era tarata sui progressi reali, non sulle sensazioni.": "The Evolution Pack kept me consistent for three months. Monthly check-ins made the difference: each program was calibrated on real progress, not feelings.",
  "Marco T.": "MARCO T.",
  "Massa muscolare": "Muscle mass",
  "Massa · Evolution Pack": "MASS · EVOLUTION PACK",
  "No. Adatto la scheda a ciò che hai a disposizione, che sia una palestra completa o un setup essenziale a casa. Basta indicarlo nel form.": "No. I adapt the program to what you have available, whether a full gym or a basic home setup. Just indicate it in the form.",
  "Nome": "Name",
  "Parla con Davide ": "Talk to Davide ",
  "Più scelto": "Most chosen",
  "Ricalibrazione parametri": "Parameter recalibration",
  "Richiedi la ": "Request your ",
  "Richiedi ora ": "Request now ",
  "Richiesta inviata! Controlla la tua email.": "Request sent! Check your email.",
  "Ricomposizione": "Recomposition",
  "Serve attrezzatura specifica?": "Do I need specific equipment?",
  "Tre fasi. ": "Three phases. ",
  "Tutto del Single Plan": "Everything from Single Plan",
  "Una scheda completa · 4 settimane": "One complete program · 4 weeks",
  "Valutazione BMI / BMR / TDEE": "Assessment BMI / BMR / TDEE",
  "Valutazione completa": "Complete assessment",
  "Zero": "Zero",
  "Zero copia-incolla": "Zero copy-paste",
  // Form placeholders
  "Messaggio (opzionale)": "Message (optional)",
  "Livello, frequenza, infortuni…": "Level, frequency, injuries…",
  "Il tuo nome": "Your name",
  "tu@email.com": "you@email.com",
  "← Servizi e prezzi": "← Services & pricing",
  // Chi sono page
  "Pugile · Maratoneta · Personal Trainer": "Boxer · Marathon Runner · Personal Trainer",
  "Sono": "I am",
  ". Prima di allenare gli altri, ho allenato me stesso — sul ring, sulla strada, nei libri. Il mio metodo non viene da YouTube: viene da anni di sport competitivo, una laurea in Scienze Motorie e migliaia di ore di pratica.": ". Before training others, I trained myself — in the ring, on the road, in books. My method doesn't come from YouTube: it comes from years of competitive sport, a degree in Sports Science and thousands of hours of practice.",
  "Carriera sportiva": "Sports career",
  "Campione Regionale — Terza Serie": "Regional Champion — Third Series",
  "Categoria 64kg. Primo titolo regionale nella boxe agonistica. Allenamento due volte al giorno, sei giorni su sette.": "64kg category. First regional title in competitive boxing. Training twice a day, six days a week.",
  "Campionato Regionale — Seconda Serie": "Regional Championship — Second Series",
  "Categoria 64kg. Secondo anno di competitizione, livello più alto. La boxe mi ha insegnato disciplina, dolore e rispetto dei limiti.": "64kg category. Second year of competition, higher level. Boxing taught me discipline, pain and respect for limits.",
  "Maratone — Roma e Firenze": "Marathons — Rome & Florence",
  "Due maratone completate. 42km che insegnano più sulla gestione del dolore e della resistenza mentale di qualsiasi manuale.": "Two marathons completed. 42km that teach more about pain management and mental endurance than any manual.",
  "Formazione": "Education",
  "Laurea L-22": "Degree L-22",
  "Scienze Motorie — Biosanitario": "Sports Science — Biosanitary",
  "Indirizzo biosanitario: anatomia, fisiologia, biomeccanica, patologia. La base scientifica dietro ogni scheda.": "Biosanitary track: anatomy, physiology, biomechanics, pathology. The scientific foundation behind every program.",
  "Diploma Nazionale": "National Diploma",
  "Personal Trainer — I e II Livello": "Personal Trainer — Level I & II",
  "Certificazione nazionale primo e secondo livello. Programmazione, valutazione funzionale, metodologia dell'allenamento.": "National certification first and second level. Programming, functional assessment, training methodology.",
  "Corso": "Course",
  "Istruttore Fitbox": "Fitbox Instructor",
  "Certificazione come istruttore di Fitbox. Conoscenza delle discipline di combat fitness applicate al conditioning.": "Fitbox instructor certification. Knowledge of combat fitness disciplines applied to conditioning.",
  "Il mio approccio": "My approach",
  "Parto sempre dai": "I always start from",
  ": peso, altezza, età, livello di attività, storico di infortuni. Da questi numeri calcolo BMI, BFR, BMR e TDEE. Da lì costruisco volume, intensità e recupero. Niente schede generiche, niente protocolli copiati.": ": weight, height, age, activity level, injury history. From these numbers I calculate BMI, BFR, BMR and TDEE. From there I build volume, intensity and recovery. No generic programs, no copied protocols.",
  "Ogni scheda è un": "Every program is a",
  ": esercizi, set, reps, recupero, progressione settimanale. La puoi portare in palestra e seguire senza dubbi.": ": exercises, sets, reps, rest, weekly progression. You can take it to the gym and follow without doubts.",
  "Cosa non faccio": "What I don't do",
  "Non vendo \"trasformazioni in 30 giorni\"": "I don't sell \"30-day transformations\"",
  "Non uso protocolli standardizzati per tutti": "I don't use standardized protocols for everyone",
  "Non prometto miracoli: prometto metodo": "I don't promise miracles: I promise method",
  "Non ti lascio solo con un PDF: c'è il follow-up": "I don't leave you alone with a PDF: there's follow-up",
  "Per chi lavoro": "Who I work with",
  "Principianti": "Beginners",
  "che non sanno da dove iniziare": "who don't know where to start",
  "Intermedi": "Intermediates",
  "che sono fermi da mesi e non capiscono perché": "who've been stuck for months and don't understand why",
  "Post-infortunio": "Post-injury",
  "che vogliono riprendere in sicurezza": "who want to resume safely",
  "Donne": "Women",
  "che cercano un metodo specifico, non una scheda da uomo riadattata": "looking for a specific method, not an adapted men's program",
  "Online": "Online",
  "per chi non è a Roma ma vuole una scheda seria": "for those not in Rome but wanting a serious program",
  "Il metodo in 3 step": "The method in 3 steps",
  "1. Valutazione": "1. Assessment",
  "— BMI, BMR, TDEE, obiettivo calorico. Partiamo dai tuoi numeri.": "— BMI, BMR, TDEE, caloric target. We start from your numbers.",
  "2. Scheda su misura": "2. Custom program",
  "— PDF via email, pronto da portare in palestra.": "— PDF via email, ready for the gym.",
  "3. Follow-up": "3. Follow-up",
  "— Ricalcolo e aggiustamento in base ai tuoi progressi.": "— Recalculation and adjustment based on your progress.",
  "Dove": "Where",
  "Base a Roma.": "Based in Rome.",
  "Assessment e follow-up in presenza": "Assessment and follow-up in person",
  "(zona Trastevere/Prati).": "(Trastevere/Prati area).",
  "Scheda tecnica e consulenza nutrizionale anche online": "Technical program and nutrition consultation also online",
  "via videochiamata.": "via video call.",
  "Prima consulenza gratuita": "First consultation free",
  "Parliamo dei tuoi obiettivi. Senza impegno.": "Let's talk about your goals. No commitment.",
  "Prenota ora": "Book now",
  "Personal Trainer — Roma": "Personal Trainer — Rome",
  "© 2026 DECASTRO PT": "© 2026 DECASTRO PT",
  // Blog index
  "Blog | Davide Decastro PT": "Blog | Davide Decastro PT",
  "Articoli su allenamento, programmazione, nutrizione e metodo scientifico. Il blog di Davide Decastro, personal trainer a Roma.": "Articles on training, programming, nutrition and scientific method. The blog of Davide Decastro, personal trainer in Rome.",
  "Metodo scientifico, programmazione e consigli pratici dal personal trainer Davide Decastro.": "Scientific method, programming and practical advice from personal trainer Davide Decastro.",
  // Blog articles — titles
  "Personal Trainer a Roma: come scegliere quello giusto": "Personal Trainer in Rome: how to choose the right one",
  "Scegliere un personal trainer a Roma non è semplice. Ecco i criteri oggettivi per valutare chi ti seguirà davvero, senza sprecare tempo e soldi.": "Choosing a personal trainer in Rome isn't easy. Here are the objective criteria to evaluate who will truly follow you, without wasting time and money.",
  "Scheda tecnica personalizzata: cosa aspettarsi davvero": "Custom technical program: what to really expect",
  "Non tutte le schede sono uguali. Differenza tra schede generiche e programmazione su misura, e perché conta per i tuoi risultati.": "Not all programs are equal. The difference between generic programs and custom programming, and why it matters for your results.",
  "Allenamento a casa vs palestra: pro, contro e quando scegliere": "Home training vs gym: pros, cons and when to choose",
  "Quale conviene per i tuoi obiettivi? Analisi onesta di costi, risultati e sostenibilità nel tempo.": "Which is better for your goals? Honest analysis of costs, results and sustainability over time.",
  "Personal Trainer Roma: prezzi e costi nel 2026": "Personal Trainer Rome: prices and costs in 2026",
  "Quanto costa un personal trainer a Roma nel 2026? Prezzi medi, fattori che influenzano il costo e come scegliere il rapporto qualità-prezzo migliore.": "How much does a personal trainer in Rome cost in 2026? Average prices, cost factors and how to choose the best value for money.",
  "Assessment corporeo: BMI, BFR, BMR e TDEE spiegati": "Body assessment: BMI, BFR, BMR and TDEE explained",
  "Cosa sono BMI, BFR, BMR e TDEE? Come si calcolano e perché servono per una scheda di allenamento personalizzata.": "What are BMI, BFR, BMR and TDEE? How they're calculated and why they're needed for a custom training program.",
  "Personal trainer online vs in presenza: pro e contro": "Online vs in-person personal trainer: pros and cons",
  "Conviene un personal trainer online o in presenza? Confronto pratico su costi, efficacia, flessibilità e risultati.": "Is an online or in-person personal trainer better? Practical comparison on costs, effectiveness, flexibility and results.",
  "Programmazione allenamento per principianti: da dove iniziare": "Training programming for beginners: where to start",
  "Come iniziare ad allenarsi quando non hai mai fatto sport. Programmazione progressiva, errori comuni e consigli pratici.": "How to start training when you've never done sports. Progressive programming, common mistakes and practical advice.",
  "Allenamento post-infortunio a Roma: come riprendere in sicurezza": "Post-injury training in Rome: how to resume safely",
  "Dopo un infortunio, riprendere l'allenamento richiede attenzione. Come costruire un percorso sicuro con un personal trainer.": "After an injury, resuming training requires care. How to build a safe journey with a personal trainer.",
  "Personal trainer donna Roma: perché scegliere un professionista": "Female personal trainer Rome: why choose a professional",
  "Personal trainer per donne a Roma: schede e metodo specifico": "Personal trainer for women in Rome: specific programs and method",
  "Perché scegliere una personal trainer donna a Roma? Vantaggi, approccio e quando fa la differenza per i tuoi obiettivi.": "Why choose a female personal trainer in Rome? Advantages, approach and when it makes a difference for your goals.",
  "Perché una donna dovrebbe scegliere un personal trainer specifico? Allenamento, metodo e attenzione al corpo femminile.": "Why should a woman choose a specific personal trainer? Training, method and attention to the female body.",
  "Nutrizione sportiva: calcolo macronutrienti e piano alimentare": "Sports nutrition: macro calculation and meal plan",
  "Nutrizione sportiva: calcolo dei macronutrienti per atleti": "Sports nutrition: macro calculation for athletes",
  "Come calcolare i macronutrienti per lo sport. Proteine, carboidrati e grassi: quantità, distribuzione e strategia per i tuoi obiettivi.": "How to calculate macronutrients for sport. Protein, carbs and fat: amounts, distribution and strategy for your goals.",
  "Come calcolare proteine, carboidrati e grassi in base al tuo obiettivo. Massa muscolare, definizione, dimagrimento: i numeri che contano.": "How to calculate protein, carbs and fat based on your goal. Muscle mass, definition, weight loss: the numbers that matter.",
  "Le donne hanno bisogno di allenamenti diversi? Metodi, miti da sfatare e come scegliere un PT che capisca il corpo femminile.": "Do women need different workouts? Methods, myths to bust and how to choose a PT who understands the female body.",
  "Nutrizione sportiva: calcolo macronutrienti e piano alimentare": "Sports nutrition: macro calculation and meal plan",
  "Come calcolare i macronutrienti per lo sport. Proteine, carboidrati e grassi: quantità, distribuzione e strategia per i tuoi obiettivi.": "How to calculate macronutrients for sport. Protein, carbs and fat: amounts, distribution and strategy for your goals.",
  "6 Agosto 2026 · 5 min lettura": "August 6, 2026 · 5 min read",
  "6 Agosto 2026 · 4 min lettura": "August 6, 2026 · 4 min read",
  "6 Agosto 2026 · 6 min lettura": "August 6, 2026 · 6 min read",
  "7 Agosto 2026 · 6 min lettura": "August 7, 2026 · 6 min read",
  "7 Agosto 2026 · 7 min lettura": "August 7, 2026 · 7 min read",
  "7 Agosto 2026 · 8 min lettura": "August 7, 2026 · 8 min read",
  "· Davide Decastro": "· Davide Decastro",
  // Footer links
  "Servizi e prezzi": "Services & pricing",
  "Chi sono": "About",
  "Come scegliere un personal trainer a Roma": "How to choose a personal trainer in Rome",
  "Scheda tecnica personalizzata": "Custom technical program",
  "Allenamento a casa vs palestra": "Home training vs gym",
  "Prezzi personal trainer Roma 2026": "Personal trainer Rome prices 2026",
  "Assessment corporeo BMI BFR BMR": "Body assessment BMI BFR BMR",
  "PT online vs presenza": "Online vs in-person PT",
  "Programmazione per principianti": "Programming for beginners",
  "Allenamento post-infortunio": "Post-injury training",
  "Personal trainer donna Roma": "Female personal trainer Rome",
  "Nutrizione sportiva macronutrienti": "Sports nutrition macros",
  // Assessment form labels
  " Richiedi la tua scheda": " Request your program",
  "Compila il questionario e prenota la consulenza gratuita. 4 step, 2 minuti.": "Fill in the questionnaire and book the free consultation. 4 steps, 2 minutes.",
  "Telefono": "Phone",
  "+39 333 1234567": "+1 555 000 0000",
  "Dati fisici": "Physical data",
  "Servono per calcolare BMR, TDEE e parametri base.": "Used to calculate BMR, TDEE and base parameters.",
  "Sesso": "Sex",
  "Seleziona": "Select",
  "Uomo": "Man",
  "Donna": "Woman",
  "Età": "Age",
  "Peso (kg)": "Weight (kg)",
  "Altezza (cm)": "Height (cm)",
  "Avanti →": "Next →",
  "← Indietro": "← Back",
  "Allenamento": "Training",
  "Per costruire la programmazione giusta.": "To build the right programming.",
  "Obiettivo principale": "Main goal",
  "Riabilitazione post-infortunio": "Post-injury rehab",
  "Performance sportiva": "Sports performance",
  "Livello attuale": "Current level",
  "Principiante (0-6 mesi)": "Beginner (0-6 months)",
  "Intermedio (6 mesi - 2 anni)": "Intermediate (6 months - 2 years)",
  "Avanzato (2+ anni)": "Advanced (2+ years)",
  "Giorni a settimana": "Days per week",
  "1-2 giorni": "1-2 days",
  "3 giorni": "3 days",
  "4 giorni": "4 days",
  "5+ giorni": "5+ days",
  "Dove ti alleni": "Where you train",
  "Palestra": "Gym",
  "Casa": "Home",
  "Ibrido (palestra + casa)": "Hybrid (gym + home)",
  "Sport pregressi o attuali": "Past or current sports",
  "Calcio, nuoto, nessuno…": "Football, swimming, none…",
  "Salute e contesto": "Health and context",
  "Info necessarie per una scheda sicura e efficace.": "Info needed for a safe and effective program.",
  "Infortuni o limitazioni fisiche": "Injuries or physical limitations",
  "Lombalgia, spalla, ginocchio, nessuno…": "Lower back, shoulder, knee, none…",
  "Farmaci (opzionale)": "Medications (optional)",
  "Nessuno…": "None…",
  "Sonno (ore/notte)": "Sleep (hours/night)",
  "Meno di 5": "Less than 5",
  "5-6": "5-6",
  "7-8": "7-8",
  "Più di 8": "More than 8",
  "Livello di stress": "Stress level",
  "Basso": "Low",
  "Medio": "Medium",
  "Alto": "High",
  "Note (opzionale)": "Notes (optional)",
  "Tutto quello che vuoi dirmi…": "Anything you want to tell me…",
  "Invia e prenota →": "Send and book →",
  "Prenota la call": "Book the call",
  "Scegli un orario per la consulenza gratuita di 30 minuti.": "Choose a time for the 30-minute free consultation.",
  "Richiesta inviata!": "Request sent!",
  "Controlla la tua email per la conferma.": "Check your email for confirmation.",
  "Davide ti contatterà entro 24 ore.": "Davide will contact you within 24 hours.",
  // Blog index page missing
  "Personal trainer per donne Roma: allenamento su misura senza stereotipi.": "Personal trainer for women in Rome: custom training without stereotypes.",
  "Come costruire un allenamento per le donne basato sui dati, non sui cliché. Forza, consulenza, risultati.": "How to build training for women based on data, not clichés. Strength, coaching, results.",
  // Static pages
  "Home": "Home",
  "About": "About",
  "Services": "Services",
  "Contact": "Contact",

  // Legal — Privacy Policy (EN page, IT translations)
  "Privacy Policy": "Informativa sulla Privacy",
  "Last updated: 7 August 2026": "Ultimo aggiornamento: 7 Agosto 2026",
  "1. Who we are": "1. Chi siamo",
  "The data controller is": "Il titolare del trattamento è",
  "2. What data we collect": "2. Quali dati raccogliamo",
  "Identity/contact:": "Identità/contatto:",
  "name, email, phone": "nome, email, telefono",
  "Physical data:": "Dati fisici:",
  "sex, age, weight, height": "sesso, età, peso, altezza",
  "Health data:": "Dati sanitari:",
  "injuries, medications, sleep, stress, training goals": "infortuni, farmaci, sonno, stress, obiettivi di allenamento",
  "special category data": "dati di categoria speciale",
  "collected only with your explicit consent": "raccolti solo con tuo consenso esplicito",
  "Usage data:": "Dati di utilizzo:",
  "3. Legal basis": "3. Base giuridica",
  "Performance of a contract / pre-contract:": "Esecuzione di un contratto / pre-contratto:",
  "to reply to your request and plan your training.": "per rispondere alla tua richiesta e pianificare il tuo allenamento.",
  "for health data and for non-essential analytics cookies.": "per i dati sanitari e per i cookie analitici non essenziali.",
  "Legitimate interest:": "Interesse legittimo:",
  "site security, fraud prevention and technical diagnostics.": "sicurezza del sito, prevenzione frodi e diagnostica tecnica.",
  "4. How we use your data": "4. Come usiamo i tuoi dati",
  "5. Data sharing": "5. Condivisione dei dati",
  "6. International transfers": "6. Trasferimenti internazionali",
  "7. Retention": "7. Conservazione",
  "8. Your rights": "8. I tuoi diritti",
  "9. Cookies": "9. Cookie",
  "10. Changes": "10. Modifiche",
  "11. Contact": "11. Contatto",

  // Legal — Terms (IT page, EN translations)
  "Termini e Condizioni": "Terms and Conditions",
  "Ultimo aggiornamento: 11 Agosto 2026": "Last updated: 11 August 2026",
  "1. Accettazione dei termini": "1. Acceptance of terms",
  "2. Servizi": "2. Services",
  "3. Prenotazioni e cancellazioni": "3. Bookings and cancellations",
  "3. Pagamenti": "3. Payments",
  "4. Ripetizioni e responsabilità": "4. Repetitions and liability",
  "5. Proprietà intellettuale": "5. Intellectual property",
};

// Reverse dict for EN → IT
const REV = {};
for (const [it, en] of Object.entries(DICT)) {
  if (it !== en) REV[en] = it;
}

function getLang() {
  return localStorage.getItem('lang') || 'it';
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  applyLang(lang);
}

function swapTextNodes(root, lang) {
  const map = lang === 'en' ? DICT : REV;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent || !node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement.tagName === 'SCRIPT' || node.parentElement.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (const node of nodes) {
    const original = node.textContent.trim();
    // Try exact match first
    if (map[original]) {
      node.textContent = node.textContent.replace(original, map[original]);
    } else {
      // Try partial replacement (for text mixed with HTML)
      let replaced = node.textContent;
      for (const [from, to] of Object.entries(map)) {
        if (from.length < 8) continue; // skip short strings to avoid partial match corruption (e.g. "Storie" → "Stories"+"s")
        if (replaced.includes(from)) {
          replaced = replaced.split(from).join(to);
        }
      }
      if (replaced !== node.textContent) {
        node.textContent = replaced;
      }
    }
  }

  // Also swap placeholder attributes
  const inputs = root.querySelectorAll ? root.querySelectorAll('input,textarea,select') : [];
  for (const el of inputs) {
    const ph = el.getAttribute('placeholder');
    if (ph && map[ph]) el.setAttribute('placeholder', map[ph]);
    // Select options
    if (el.tagName === 'SELECT') {
      for (const opt of el.options) {
        if (map[opt.textContent.trim()]) opt.textContent = map[opt.textContent.trim()];
      }
    }
  }
}

let observer = null;

function applyLang(lang) {
  // Update toggle button
  document.documentElement.lang = lang;
  const btns = document.querySelectorAll('.lang-toggle button');
  btns.forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // Swap all text
  swapTextNodes(document.body, lang);

  // For SPA: observe DOM mutations
  // Clear all data-i18n-done markers
  document.querySelectorAll('[data-i18n-done]').forEach(el => el.removeAttribute('data-i18n-done'));
  if (observer) observer.disconnect();
  if (lang !== 'it') {
    observer = new MutationObserver((mutations) => {
      for (const mut of mutations) {
        for (const node of mut.addedNodes) {
          if (node.nodeType === 1 || node.nodeType === 3) {
            swapTextNodes(node.parentElement || node, lang);
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: false });
  }
}

// Inject burger menu CSS + HTML on pages that lack it, then place lang toggle inside
function injectBurgerCSS() {
  if (document.getElementById('burger-css')) return;
  const css = `<style id="burger-css">
.nav-burger{display:none;flex-direction:column;justify-content:space-between;width:24px;height:18px;background:none;border:none;cursor:pointer;padding:0;z-index:60}
.nav-burger span{display:block;width:100%;height:2px;background:var(--text,#F8FAFC);transition:transform .3s,opacity .3s}
.nav-burger.open span:nth-child(1){transform:translateY(8px) rotate(45deg)}
.nav-burger.open span:nth-child(2){opacity:0}
.nav-burger.open span:nth-child(3){transform:translateY(-8px) rotate(-45deg)}
.nav-mobile{display:none;position:fixed;top:0;right:0;width:100%;max-width:300px;height:100vh;background:rgba(6,6,6,0.98);backdrop-filter:blur(12px);border-left:1px solid rgba(255,255,255,0.1);padding:80px 24px 24px;z-index:55;flex-direction:column;gap:0;transform:translateX(100%);transition:transform .3s ease}
.nav-mobile.open{display:flex;transform:translateX(0)}
.nav-mobile a{font-family:Oswald,sans-serif;font-size:18px;color:var(--text,#F8FAFC);text-decoration:none;padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.05);text-transform:uppercase;letter-spacing:0.02em}
.nav-mobile a:hover{color:var(--accent,#F97316)}
.nav-mobile-cta{margin-top:16px;background:var(--accent,#F97316);color:#000!important;text-align:center;padding:14px!important;border-radius:0;font-weight:600}
@media(max-width:768px){
  .nav-links,.nav-cta{display:none!important}
  .nav-burger{display:flex}
}
  </style>`;
  document.head.insertAdjacentHTML('beforeend', css);
}

function ensureBurger() {
  injectBurgerCSS();
  const nav = document.querySelector('nav.nav, .nav');
  if (!nav) return;
  
  // Add burger button if missing
  if (!nav.querySelector('.nav-burger')) {
    const btn = document.createElement('button');
    btn.className = 'nav-burger';
    btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    btn.onclick = function() {
      const m = document.getElementById('nav-mobile');
      this.classList.toggle('open');
      if (m) m.classList.toggle('open');
    };
    nav.appendChild(btn);
  }
  
  // Add nav-mobile container if missing
  if (!document.getElementById('nav-mobile')) {
    const mobile = document.createElement('div');
    mobile.className = 'nav-mobile';
    mobile.id = 'nav-mobile';
    // Copy nav links
    const links = nav.querySelectorAll('.nav-links a');
    links.forEach(a => {
      const clone = a.cloneNode(true);
      clone.addEventListener('click', () => {
        mobile.classList.remove('open');
        nav.querySelector('.nav-burger')?.classList.remove('open');
      });
      mobile.appendChild(clone);
    });
    // Add CTA if exists
    const cta = nav.querySelector('.nav-cta');
    if (cta) {
      const ctaClone = cta.cloneNode(true);
      ctaClone.className = 'nav-mobile-cta';
      ctaClone.addEventListener('click', () => {
        mobile.classList.remove('open');
        nav.querySelector('.nav-burger')?.classList.remove('open');
      });
      mobile.appendChild(ctaClone);
    }
    nav.parentNode.insertBefore(mobile, nav.nextSibling);
  }
}

// Inject toggle button — CSS controls visibility, not JS
function injectToggle() {
  if (document.querySelector('.lang-toggle-desktop')) return;
  ensureBurger();

  const toggleHTML = '<button data-lang="it" class="active" style="background:none;border:none;color:var(--text,#fff);font-family:Oswald,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.05em;cursor:pointer;padding:2px 4px">IT</button><span style="color:var(--text-dim,#888);font-size:12px">·</span><button data-lang="en" style="background:none;border:none;color:var(--text-dim,#888);font-family:Oswald,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.05em;cursor:pointer;padding:2px 4px">EN</button>';

  // Desktop: floating top-right (hidden on mobile via CSS)
  const desktop = document.createElement('div');
  desktop.className = 'lang-toggle lang-toggle-desktop';
  desktop.innerHTML = toggleHTML;
  desktop.style.cssText = 'position:fixed;top:16px;right:16px;z-index:9999;display:flex;gap:4px;align-items:center;background:rgba(6,6,6,0.85);backdrop-filter:blur(8px);padding:4px 10px;border:1px solid rgba(255,255,255,0.1)';
  document.body.appendChild(desktop);

  // Mobile: inside burger menu (hidden on desktop via CSS)
  // Try static pages first (#nav-mobile), then SPA (.nav-mobile-menu)
  const navMobile = document.getElementById('nav-mobile') || document.querySelector('[data-testid="nav-mobile-menu"]');
  if (navMobile) {
    const mobile = document.createElement('div');
    mobile.className = 'lang-toggle lang-toggle-mobile';
    mobile.innerHTML = toggleHTML;
    mobile.style.cssText = 'display:flex;gap:4px;align-items:center;padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.05)';
    navMobile.appendChild(mobile);
  }

  // CSS: show/hide based on viewport
  if (!document.getElementById('lang-toggle-css')) {
    const css = '<style id="lang-toggle-css">@media(max-width:768px){.lang-toggle-desktop{display:none!important}.lang-toggle-mobile{display:flex!important}}@media(min-width:769px){.lang-toggle-mobile{display:none!important}.lang-toggle-desktop{display:flex!important}}</style>';
    document.head.insertAdjacentHTML('beforeend', css);
  }
}

// No resize handler needed — CSS media queries handle toggle visibility

// Inject "Chi sono" link into SPA nav (React doesn't include it)
function injectChiSono() {
  // Check if already present
  const existing = document.querySelector('a[href="/chi-sono.html"]');
  if (existing) return;
  
  // Find the nav-links container in the SPA
  const navLinks = document.querySelector('.site-nav nav, nav.site-nav, .nav-links, nav');
  if (!navLinks) return;
  
  // Don't add to static page navs (they already have it)
  if (document.querySelector('.nav-links a[href="/chi-sono.html"]')) return;
  if (document.querySelector('nav.nav a[href="/chi-sono.html"]')) return;
  
  // Create the link styled like existing nav links
  const link = document.createElement('a');
  link.href = '/chi-sono.html';
  link.textContent = 'Chi sono';
  link.style.cssText = 'font-family:Outfit,sans-serif;font-size:14px;color:var(--text-dim,#94A3B8);text-decoration:none;transition:color .2s;cursor:pointer';
  link.addEventListener('mouseenter', () => link.style.color = 'var(--text,#F8FAFC)');
  link.addEventListener('mouseleave', () => link.style.color = 'var(--text-dim,#94A3B8)');
  
  // Insert before FAQ (or at the end)
  const faqLink = Array.from(navLinks.querySelectorAll('a')).find(a => a.getAttribute('href') === '#faq' || a.textContent.toLowerCase().includes('faq'));
  if (faqLink) {
    navLinks.insertBefore(link, faqLink);
  } else {
    navLinks.appendChild(link);
  }
}

  // Event delegation
  document.addEventListener('click', (e) => {
    if (e.target.closest('.lang-toggle button')) {
      const btn = e.target.closest('.lang-toggle button');
      setLang(btn.dataset.lang);
    }
  });


// Init
function init() {
  injectToggle();
  injectChiSono();
  const lang = getLang();
  if (lang !== 'it') {
    // Wait for SPA to render
    setTimeout(() => applyLang(lang), 300);
    setTimeout(() => applyLang(lang), 1000);
    setTimeout(() => applyLang(lang), 2000);
  }
  // Update active state
  document.querySelectorAll('.lang-toggle button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
    b.style.color = b.dataset.lang === lang ? 'var(--text)' : 'var(--text-dim)';
  });
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Re-inject toggle + chi-sono for SPA (React may remove them during re-render)
const reInject = setInterval(() => {
  const needsDesktop = !document.querySelector('.lang-toggle-desktop');
  const needsMobile = !document.querySelector('.lang-toggle-mobile');
  const navMobile = document.getElementById('nav-mobile') || document.querySelector('[data-testid="nav-mobile-menu"]');
  if (needsDesktop || (needsMobile && navMobile)) {
    injectToggle();
    const lang = getLang();
    document.querySelectorAll('.lang-toggle button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
      b.style.color = b.dataset.lang === lang ? 'var(--text,#fff)' : 'var(--text-dim,#888)';
    });
    if (lang !== 'it') applyLang(lang);
  }
  injectChiSono();
}, 1000);
// Keep checking — SPA can re-render at any time
// (removed 10s timeout — toggle is critical)
})();
