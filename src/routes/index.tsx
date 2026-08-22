import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import heroImage from "@/assets/hero-farmer.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KrishokMitra — AI Crop Doctor for Indian Farmers" },
      {
        name: "description",
        content:
          "Diagnose crop diseases in 5 seconds, check live mandi prices from 500+ markets, and sell directly to buyers. Free AI krishi app for smallholder farmers in India.",
      },
      { property: "og:title", content: "KrishokMitra — AI Crop Doctor for Indian Farmers" },
      {
        property: "og:description",
        content:
          "AI-powered crop diagnosis, real-time mandi prices & direct selling — all in your pocket. Trusted by 8,000+ farmers across Karnataka.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KrishokMitra,
});

/* ---------------- i18n ---------------- */

type Lang = "en" | "hi" | "kn";

interface Strings {
  getStarted: string;
  scanNow: string;
  headline: string;
  sub: string;
  feat1t: string;
  feat1d: string;
  feat2t: string;
  feat2d: string;
  feat3t: string;
  feat3d: string;
  howTitle: string;
  step1t: string;
  step1d: string;
  step2t: string;
  step2d: string;
  step3t: string;
  step3d: string;
  featuresTitle: string;
  stories: string;
  trust: string;
}

const T: Record<Lang, Strings> = {
  en: {
    getStarted: "Get Started",
    scanNow: "Scan Your Crop Now",
    headline: "Stop Guessing. Start Growing.",
    sub: "AI-powered crop diagnosis, real-time prices & direct selling — all in your pocket.",
    feat1t: "AI Scan",
    feat1d: "Diagnose diseases in 5 seconds",
    feat2t: "Smart Price",
    feat2d: "Know market rates instantly",
    feat3t: "Sell Direct",
    feat3d: "No middlemen, better earnings",
    howTitle: "How It Works",
    step1t: "Click a Photo",
    step1d: "Snap a picture of your crop",
    step2t: "AI Analyzes",
    step2d: "Diagnoses disease & suggests price",
    step3t: "Sell or Treat",
    step3d: "Connect to buyers or get a treatment plan",
    featuresTitle: "Everything Your Farm Needs",
    stories: "Farmer Stories",
    trust: "Trusted by 8,000+ farmers across Karnataka",
  },
  hi: {
    getStarted: "शुरू करें",
    scanNow: "अभी फ़सल स्कैन करें",
    headline: "अंदाज़ा नहीं। अब सही खेती।",
    sub: "AI से फ़सल रोग की पहचान, ताज़ा मंडी भाव और सीधी बिक्री — सब आपकी जेब में।",
    feat1t: "AI स्कैन",
    feat1d: "5 सेकंड में रोग पहचानें",
    feat2t: "स्मार्ट भाव",
    feat2d: "मंडी के भाव तुरंत जानें",
    feat3t: "सीधी बिक्री",
    feat3d: "बिचौलिए नहीं, ज़्यादा कमाई",
    howTitle: "कैसे काम करता है",
    step1t: "फ़ोटो खींचें",
    step1d: "अपनी फ़सल की तस्वीर लें",
    step2t: "AI जाँच करे",
    step2d: "रोग पहचाने और भाव बताए",
    step3t: "बेचें या इलाज करें",
    step3d: "सीधे खरीदार से जुड़ें या इलाज जानें",
    featuresTitle: "आपके खेत की हर ज़रूरत",
    stories: "किसानों की कहानियाँ",
    trust: "कर्नाटक के 8,000+ किसानों का भरोसा",
  },
  kn: {
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    scanNow: "ಈಗ ನಿಮ್ಮ ಬೆಳೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    headline: "ಊಹಿಸಬೇಡಿ. ಬೆಳೆಯಿರಿ.",
    sub: "AI-ಆಧಾರಿತ ಬೆಳೆ ರೋಗ ಪತ್ತೆ, ನೈಜ-ಸಮಯದ ಬೆಲೆ ಮತ್ತು ನೇರ ಮಾರಾಟ — ಎಲ್ಲಾ ನಿಮ್ಮ ಕೈಗೆ.",
    feat1t: "AI ಸ್ಕ್ಯಾನ್",
    feat1d: "5 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ರೋಗ ಪತ್ತೆ",
    feat2t: "ಸ್ಮಾರ್ಟ್ ಬೆಲೆ",
    feat2d: "ಮಾರುಕಟ್ಟೆ ದರ ತಕ್ಷಣ ತಿಳಿಯಿರಿ",
    feat3t: "ನೇರ ಮಾರಾಟ",
    feat3d: "ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲ, ಹೆಚ್ಚು ಆದಾಯ",
    howTitle: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    step1t: "ಫೋಟೋ ಕ್ಲಿಕ್ ಮಾಡಿ",
    step1d: "ನಿಮ್ಮ ಬೆಳೆಯ ಚಿತ್ರ ತೆಗೆಯಿರಿ",
    step2t: "AI ವಿಶ್ಲೇಷಿಸುತ್ತದೆ",
    step2d: "ರೋಗ ಪತ್ತೆ ಮಾಡಿ ಬೆಲೆ ಸೂಚಿಸುತ್ತದೆ",
    step3t: "ಮಾರಿ ಅಥವಾ ಚಿಕಿತ್ಸೆ",
    step3d: "ಖರೀದಿದಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ ಚಿಕಿತ್ಸಾ ಯೋಜನೆ ಪಡೆಯಿರಿ",
    featuresTitle: "ನಿಮ್ಮ ಹೊಲದ ಎಲ್ಲಾ ಅಗತ್ಯಗಳು",
    stories: "ರೈತರ ಕಥೆಗಳು",
    trust: "ಕರ್ನಾಟಕದ 8,000+ ರೈತರ ವಿಶ್ವಾಸ",
  },
};

/* ---------------- Small building blocks ---------------- */

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-rounded ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ---------------- Page ---------------- */

function KrishokMitra() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const t = T[lang];

  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const featureCards = [
    { icon: "document_scanner", title: t.feat1t, desc: t.feat1d, bg: "bg-leaf-soft text-primary" },
    { icon: "trending_up", title: t.feat2t, desc: t.feat2d, bg: "bg-accent-soft text-accent-foreground" },
    { icon: "handshake", title: t.feat3t, desc: t.feat3d, bg: "bg-secondary text-secondary-foreground" },
  ];

  const steps = [
    { icon: "photo_camera", title: t.step1t, desc: t.step1d },
    { icon: "neurology", title: t.step2t, desc: t.step2d },
    { icon: "storefront", title: t.step3t, desc: t.step3d },
  ];

  const grid = [
    {
      icon: "bug_report",
      title: "AI Disease Diagnosis",
      desc: "95% accuracy across 40+ crops — leaf blight, pests, nutrient deficiency and more.",
      stat: "95% accurate",
    },
    {
      icon: "currency_rupee",
      title: "Real-time Market Prices",
      desc: "Live bhav from 500+ mandis across India, updated every morning before you leave home.",
      stat: "500+ mandis",
    },
    {
      icon: "groups",
      title: "Direct Buyer Connection",
      desc: "Sell to verified buyers and FPOs with zero middlemen. You keep every rupee you earn.",
      stat: "0% commission",
    },
    {
      icon: "mic",
      title: "Voice + USSD Support",
      desc: "No internet? No smartphone? Use voice in your language or dial *123# on any phone.",
      stat: "Works offline",
    },
  ];

  const testimonials = [
    {
      avatar: "face",
      avatarBg: "bg-leaf-soft text-primary",
      quote:
        "KrishokMitra found leaf blight in my ragi before I could even see it. The treatment plan saved my entire crop this season.",
      name: "Ramesh Gowda",
      place: "Ragi farmer, Mandya",
    },
    {
      avatar: "face_3",
      avatarBg: "bg-accent-soft text-accent-foreground",
      quote:
        "I sold my tomatoes directly to a buyer in Bengaluru — ₹4 more per kilo than the middleman ever gave me.",
      name: "Lakshmamma",
      place: "Vegetable farmer, Tumakuru",
    },
    {
      avatar: "elderly",
      avatarBg: "bg-secondary text-secondary-foreground",
      quote:
        "The app speaks to me in Kannada. I just hold the phone to my crop and listen. Even my father uses it without help.",
      name: "Siddu Patil",
      place: "Sugarcane farmer, Belagavi",
    },
  ];
  const [storyIdx, setStoryIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStoryIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const langSelect = (id: string) => (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        Select language
      </label>
      <select
        id={id}
        aria-label="Select language / भाषा चुनें / ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ"
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        className="min-h-11 appearance-none rounded-full border-2 border-primary/30 bg-card py-2 pl-4 pr-10 text-base font-semibold text-foreground transition-colors hover:border-primary"
      >
        <option value="kn">ಕನ್ನಡ</option>
        <option value="hi">हिन्दी</option>
        <option value="en">English</option>
      </select>
      <Icon
        name="expand_more"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a href="#top" className="flex min-h-11 min-w-0 items-center gap-2" aria-label="KrishokMitra home">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Icon name="eco" className="text-3xl" />
            </span>
            <span className="truncate font-display text-2xl font-bold text-primary">
              Krishok<span className="text-accent">Mitra</span>
            </span>
          </a>

          <nav className="hidden items-center gap-3 md:flex" aria-label="Main navigation">
            {langSelect("lang-desktop")}
            <a
              href="#scan"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-base font-bold text-primary-foreground shadow-harvest transition-all hover:bg-primary-dark hover:shadow-harvest-lg"
            >
              <Icon name="eco" />
              {t.getStarted}
            </a>
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border-2 border-primary/30 text-primary md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="text-3xl" />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-border md:hidden"
            >
              <div className="flex flex-col gap-3 px-4 py-4">
                {langSelect("lang-mobile")}
                <a
                  href="#scan"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-lg font-bold text-primary-foreground"
                >
                  <Icon name="eco" />
                  {t.getStarted}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="top">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-24 top-64 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 md:grid-cols-2 md:pt-16">
            <div>
              <motion.p
                {...fadeUp}
                className="inline-flex items-center gap-2 rounded-full bg-leaf-soft px-4 py-2 text-base font-bold text-primary"
              >
                <Icon name="grass" />
                Free for every farmer
              </motion.p>
              <motion.h1
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.08 }}
                className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl"
              >
                {t.headline}
              </motion.h1>
              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.16 }}
                className="mt-4 max-w-xl text-xl text-muted-foreground"
              >
                {t.sub}
              </motion.p>
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.24 }} className="mt-8">
                <a
                  id="scan"
                  href="#how"
                  className="inline-flex min-h-14 items-center gap-3 rounded-full bg-accent px-8 py-4 text-xl font-extrabold text-accent-foreground shadow-harvest transition-all hover:-translate-y-0.5 hover:shadow-harvest-lg"
                  aria-label="Scan your crop now — take a photo to diagnose disease"
                >
                  <Icon name="photo_camera" className="text-3xl" />
                  {t.scanNow}
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <img
                src={heroImage}
                alt="Indian farmer in a green field using a smartphone to scan a crop leaf with KrishokMitra"
                width={1024}
                height={1024}
                className="aspect-square w-full rounded-4xl border-4 border-card object-cover shadow-harvest-lg"
              />
              <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-harvest">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-leaf-soft text-primary">
                  <Icon name="check_circle" />
                </span>
                <div>
                  <p className="text-base font-bold leading-tight">Leaf blight detected</p>
                  <p className="text-sm text-muted-foreground">Treatment plan ready · 5 sec</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3 feature cards — horizontal scroll on mobile */}
          <div className="mx-auto max-w-6xl px-4 pb-14">
            <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
              {featureCards.map((c, i) => (
                <motion.article
                  key={c.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                  className="min-w-[270px] snap-center rounded-3xl border border-border bg-card p-6 shadow-harvest transition-transform hover:-translate-y-1 md:min-w-0"
                >
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl ${c.bg}`}>
                    <Icon name={c.icon} className="text-3xl" />
                  </span>
                  <h2 className="mt-4 text-2xl font-bold">{c.title}</h2>
                  <p className="mt-1 text-lg text-muted-foreground">{c.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section id="how" className="bg-card py-16">
          <div className="mx-auto max-w-6xl px-4">
            <motion.h2 {...fadeUp} className="text-center text-4xl font-extrabold md:text-5xl">
              {t.howTitle}
            </motion.h2>
            <div className="mt-12 grid gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
              {steps.map((s, i) => (
                <div key={s.title} className="contents">
                  <motion.div
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.12 }}
                    className="relative rounded-3xl border-2 border-primary/15 bg-background p-6 text-center shadow-harvest transition-transform hover:-translate-y-1"
                  >
                    <span className="absolute -top-4 left-1/2 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-accent font-display text-lg font-extrabold text-accent-foreground">
                      {i + 1}
                    </span>
                    <span className="mx-auto mt-3 grid h-16 w-16 place-items-center rounded-full bg-leaf-soft text-primary">
                      <Icon name={s.icon} className="text-4xl" />
                    </span>
                    <h3 className="mt-4 text-2xl font-bold">{s.title}</h3>
                    <p className="mt-1 text-lg text-muted-foreground">{s.desc}</p>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="flex items-center justify-center text-primary" aria-hidden="true">
                      <span className="md:hidden">
                        <Icon name="arrow_downward" className="text-4xl" />
                      </span>
                      <span className="hidden md:block">
                        <Icon name="arrow_forward" className="text-4xl" />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FEATURES GRID ============ */}
        <section id="features" className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <motion.h2 {...fadeUp} className="text-center text-4xl font-extrabold md:text-5xl">
              {t.featuresTitle}
            </motion.h2>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {grid.map((f, i) => (
                <motion.article
                  key={f.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: (i % 2) * 0.1 }}
                  className="group rounded-3xl border border-border bg-card p-7 shadow-harvest transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-harvest-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon name={f.icon} className="text-3xl" />
                    </span>
                    <span className="rounded-full bg-leaf-soft px-3 py-1 text-sm font-bold text-primary">
                      {f.stat}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold">{f.title}</h3>
                  <p className="mt-2 text-lg text-muted-foreground">{f.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="bg-primary py-14 text-primary-foreground">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 text-center md:grid-cols-4">
            {[
              { to: 8000, suffix: "+", label: "Farmers Helped" },
              { to: 50000, suffix: "+", label: "Crops Scanned" },
              { to: 95, suffix: "%", label: "Diagnosis Accuracy" },
              { to: 50000, prefix: "₹", suffix: "+", label: "Average Savings" },
            ].map((s) => (
              <motion.div key={s.label} {...fadeUp}>
                <p className="font-display text-4xl font-extrabold md:text-5xl">
                  <Counter to={s.to} prefix={s.prefix ?? ""} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-lg font-medium text-primary-foreground/85">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section id="stories" className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <motion.h2 {...fadeUp} className="text-center text-4xl font-extrabold md:text-5xl">
              {t.stories}
            </motion.h2>
            <div
              className="relative mt-10 min-h-72"
              role="region"
              aria-roledescription="carousel"
              aria-label="Farmer testimonials"
            >
              <AnimatePresence mode="wait">
                <motion.figure
                  key={storyIdx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl border border-border bg-card p-8 text-center shadow-harvest"
                >
                  <div
                    className={`mx-auto grid h-20 w-20 place-items-center rounded-full ${testimonials[storyIdx]?.avatarBg}`}
                    aria-hidden="true"
                  >
                    <Icon name={testimonials[storyIdx]?.avatar ?? "face"} className="text-5xl" />
                  </div>
                  <blockquote className="mt-5 text-xl leading-relaxed text-foreground">
                    “{testimonials[storyIdx]?.quote}”
                  </blockquote>
                  <figcaption className="mt-5">
                    <p className="text-xl font-bold text-primary">{testimonials[storyIdx]?.name}</p>
                    <p className="text-base text-muted-foreground">{testimonials[storyIdx]?.place}</p>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex justify-center gap-1" role="tablist" aria-label="Choose testimonial">
              {testimonials.map((tm, i) => (
                <button
                  key={tm.name}
                  type="button"
                  role="tab"
                  aria-selected={i === storyIdx}
                  aria-label={`Show testimonial from ${tm.name}`}
                  onClick={() => setStoryIdx(i)}
                  className="grid h-11 w-11 place-items-center"
                >
                  <span
                    className={`h-3.5 rounded-full transition-all ${
                      i === storyIdx ? "w-9 bg-primary" : "w-3.5 bg-primary/25 hover:bg-primary/50"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TRUST BADGES ============ */}
        <section className="border-y border-border bg-card py-12">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <p className="text-xl font-bold text-primary">{t.trust}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {[
                { icon: "account_balance", label: "Government of Karnataka" },
                { icon: "school", label: "IIT Bombay" },
                { icon: "agriculture", label: "NABARD" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex min-h-14 items-center gap-3 rounded-2xl border-2 border-border bg-background px-6 py-3 font-display text-lg font-bold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon name={b.icon} className="text-3xl text-accent" />
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer id="contact" className="bg-earth py-14 text-earth-foreground">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                    <Icon name="eco" className="text-3xl" />
                  </span>
                  <span className="font-display text-2xl font-bold">
                    Krishok<span className="text-accent">Mitra</span>
                  </span>
                </div>
                <p className="mt-4 max-w-xs text-lg opacity-85">
                  AI-powered agricultural intelligence for India's 120 million smallholder farmers.
                </p>
              </div>
              <nav aria-label="Footer links">
                <h3 className="text-xl font-bold">Quick Links</h3>
                <ul className="mt-4 space-y-1 text-lg">
                  {[
                    { label: "About", href: "#top" },
                    { label: "How It Works", href: "#how" },
                    { label: "Privacy", href: "#contact" },
                    { label: "Contact", href: "#contact" },
                  ].map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="inline-flex min-h-11 items-center opacity-85 transition-opacity hover:opacity-100 hover:underline"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div>
                <h3 className="text-xl font-bold">Follow Us</h3>
                <div className="mt-4 flex gap-3">
                  {[
                    { icon: "chat", label: "WhatsApp" },
                    { icon: "play_circle", label: "YouTube" },
                    { icon: "photo_camera", label: "Instagram" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href="#contact"
                      aria-label={`KrishokMitra on ${s.label}`}
                      className="grid h-12 w-12 place-items-center rounded-full bg-earth-foreground/10 transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground"
                    >
                      <Icon name={s.icon} className="text-2xl" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-earth-foreground/20 pt-6 text-center text-lg">
              Made with ❤️ for Indian Farmers
            </div>
          </div>
        </footer>
      </main>

      {/* ============ FLOATING WHATSAPP ============ */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with KrishokMitra on WhatsApp"
        className={`fixed right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-harvest-lg transition-all hover:scale-110 ${
          showStickyCta ? "bottom-24" : "bottom-5"
        }`}
      >
        <Icon name="chat" className="text-3xl" />
      </a>

      {/* ============ STICKY SCAN CTA ============ */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 bottom-5 z-40 mx-auto max-w-md"
          >
            <a
              href="#scan"
              className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-xl font-extrabold text-primary-foreground shadow-harvest-lg transition-transform hover:scale-[1.02]"
              aria-label="Scan your crop now"
            >
              <Icon name="photo_camera" className="text-3xl" />
              {t.scanNow}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
