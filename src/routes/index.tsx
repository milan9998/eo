import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowUpRight, Plus, Minus } from "lucide-react";
import founderPortrait from "@/assets/contact-founder.png";

/* ---------- Imagery ---------- */
const IMG = {
  hero: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=80",
  heroMaterials: "/hero-materials.png",
  heroPlanning: "/hero-planning.png",
  heroLuxuryOne: "/portfolio-1.jpg",
  heroLuxuryTwo: "/portfolio-3.jpg",
  heroLuxuryThree: "/portfolio-6.jpg",
  about: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  m1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80", // large living
  m2: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80", // kitchen
  m3: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80", // bedroom
  m4: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80", // bathroom
  m5: "/refined-details.jpg", // refined detail
};
const VISUAL_DIRECTION = {
  main: "/visual-direction-v2-main.png",
  tiles: [
    { src: "/visual-direction-v2-1.png", cap: "Warm Minimalist" },
    { src: "/visual-direction-v2-2.png", cap: "Natural Materials" },
    { src: "/visual-direction-v2-3.png", cap: "Elegant Lighting" },
    { src: "/visual-direction-v2-4.png", cap: "Refined Details" },
  ],
};
const PORTFOLIO = [
  {
    src: "/portfolio-custom-1.png",
    title: "Residental Interior Contemporary Living",
    type: "Residental Interior",
  },
  {
    src: "/portfolio-custom-2.png",
    title: "Apartment Minimal Bedroom Concept",
    type: "Apartment",
  },
  {
    src: "/portfolio-custom-3.png",
    title: "Private Residental Warm Neutral Suite",
    type: "Private Residental",
  },
  {
    src: "/portfolio-custom-4.png",
    title: "Commercial Interior Executive Workspace",
    type: "Commercial Interior",
  },
  {
    src: "/portfolio-custom-5.png",
    title: "Design Detailing Kitchen Material Story",
    type: "Design Detailing",
  },
  {
    src: "/portfolio-custom-6.png",
    title: "Commercial Interior Office Details",
    type: "Commercial Interior",
  },
];
type HeroScene =
  {
    image: string;
    durationMs: number;
    fromX: string;
    toX: string;
    fromY: string;
    toY: string;
    fromScale: number;
    toScale: number;
    fromRotate: number;
    toRotate: number;
  };

/* ---------- Reveal helpers ---------- */
const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease: EASE },
  }),
};


function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}


/* ---------- Nav ---------- */
const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const mobileMenu =
    typeof document !== "undefined"
      ? createPortal(
          <motion.div
            initial={false}
            animate={
              open
                ? { opacity: 1, visibility: "visible" }
                : { opacity: 0, visibility: "hidden" }
            }
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-0 z-[200] md:hidden flex flex-col bg-[var(--espresso)] overscroll-none"
            style={{ pointerEvents: open ? "auto" : "none" }}
            aria-hidden={!open}
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
              <span className="font-serif text-lg tracking-[0.2em] text-[var(--text-light)]">
                EO — INTERIORS
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="h-10 w-10 flex items-center justify-center rounded-full border border-white/15 text-[var(--text-light)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 py-6">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{
                    duration: 0.5,
                    delay: open ? 0.1 + i * 0.07 : 0,
                    ease: EASE,
                  }}
                  className="group flex items-center justify-between gap-4 py-5 border-b border-white/[0.08] font-serif text-[clamp(2.25rem,9vw,3.5rem)] leading-none text-[var(--text-light)] transition-colors hover:text-[var(--gold)]"
                >
                  <span>{n.label}</span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--gold)] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </motion.a>
              ))}
            </nav>

            <div className="shrink-0 border-t border-white/10 px-8 py-8">
              <p className="eo-eyebrow text-[var(--taupe)]">
                Interior Design · 3D Visualization · Project Development
              </p>
            </div>
          </motion.div>,
          document.body,
        )
      : null;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--ivory)]/85 backdrop-blur-md border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <a
            href="#home"
            className={`font-serif text-lg md:text-xl tracking-[0.2em] ${
              scrolled ? "text-[var(--espresso)]" : "text-[var(--text-light)]"
            }`}
          >
            EO&nbsp;—&nbsp;INTERIORS
          </a>
          <nav className="hidden md:flex items-center gap-9">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`eo-eyebrow transition-colors hover:text-[var(--gold)] ${
                  scrolled ? "text-[var(--text-dark)]" : "text-[var(--text-light)]"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`md:hidden h-10 w-10 flex items-center justify-center rounded-full border transition-colors ${
              scrolled
                ? "border-[var(--border)] text-[var(--espresso)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                : "border-white/20 text-[var(--text-light)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
            }`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>
      {mobileMenu}
    </>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const heroScenes: HeroScene[] = useMemo(() => {
    if (isMobile) {
      // Mobile cinematic sequence: clean full-frame motion.
      return [
        {
          image: IMG.heroMaterials,
          durationMs: 10000,
          fromX: "-2%",
          toX: "3%",
          fromY: "-1%",
          toY: "1%",
          fromScale: 1.08,
          toScale: 1.16,
          fromRotate: -0.2,
          toRotate: 0.15,
        },
        {
          image: IMG.heroPlanning,
          durationMs: 10000,
          fromX: "2%",
          toX: "-3%",
          fromY: "1%",
          toY: "-1%",
          fromScale: 1.08,
          toScale: 1.15,
          fromRotate: 0.2,
          toRotate: -0.15,
        },
        {
          image: IMG.heroLuxuryOne,
          durationMs: 10000,
          fromX: "-3%",
          toX: "4%",
          fromY: "-1%",
          toY: "1%",
          fromScale: 1.1,
          toScale: 1.17,
          fromRotate: -0.2,
          toRotate: 0.1,
        },
        {
          image: IMG.heroLuxuryTwo,
          durationMs: 10000,
          fromX: "3%",
          toX: "-4%",
          fromY: "-1%",
          toY: "1%",
          fromScale: 1.1,
          toScale: 1.17,
          fromRotate: 0.15,
          toRotate: -0.1,
        },
      ];
    }

    return [
      {
        image: IMG.heroMaterials,
        durationMs: 12000,
        fromX: "-3%",
        toX: "5%",
        fromY: "-2%",
        toY: "2%",
        fromScale: 1.08,
        toScale: 1.18,
        fromRotate: -0.2,
        toRotate: 0.2,
      },
      {
        image: IMG.heroPlanning,
        durationMs: 12000,
        fromX: "4%",
        toX: "-5%",
        fromY: "1%",
        toY: "-1%",
        fromScale: 1.08,
        toScale: 1.17,
        fromRotate: 0.2,
        toRotate: -0.2,
      },
      {
        image: IMG.heroLuxuryOne,
        durationMs: 11000,
        fromX: "-4%",
        toX: "6%",
        fromY: "-2%",
        toY: "1%",
        fromScale: 1.1,
        toScale: 1.2,
        fromRotate: -0.2,
        toRotate: 0.15,
      },
      {
        image: IMG.heroLuxuryTwo,
        durationMs: 11000,
        fromX: "5%",
        toX: "-6%",
        fromY: "-2%",
        toY: "1%",
        fromScale: 1.1,
        toScale: 1.2,
        fromRotate: 0.2,
        toRotate: -0.15,
      },
      {
        image: IMG.heroLuxuryThree,
        durationMs: 11000,
        fromX: "-3%",
        toX: "6%",
        fromY: "0%",
        toY: "-1%",
        fromScale: 1.1,
        toScale: 1.2,
        fromRotate: -0.2,
        toRotate: 0.15,
      },
      {
        image: IMG.heroLuxuryOne,
        durationMs: 13000,
        fromX: "-6%",
        toX: "6%",
        fromY: "-1%",
        toY: "1%",
        fromScale: 1.14,
        toScale: 1.22,
        fromRotate: -0.35,
        toRotate: 0.35,
      },
      {
        image: IMG.m1,
        durationMs: 11000,
        fromX: "4%",
        toX: "-5%",
        fromY: "-1%",
        toY: "1%",
        fromScale: 1.09,
        toScale: 1.18,
        fromRotate: 0.2,
        toRotate: -0.15,
      },
    ];
  }, [isMobile]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const safeSceneIndex = sceneIndex % heroScenes.length;
  const activeScene = heroScenes[safeSceneIndex];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSceneIndex((prev) => (prev + 1) % heroScenes.length);
    }, activeScene.durationMs);
    return () => window.clearTimeout(timer);
  }, [activeScene, heroScenes.length]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[92svh] min-h-[560px] md:h-screen md:min-h-[680px] w-full overflow-hidden"
    >
      <motion.div style={isMobile ? undefined : { scale, y }} className="absolute inset-0">
        <img
          src={IMG.hero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <AnimatePresence mode="wait">
          <motion.img
            key={`${activeScene.image}-${safeSceneIndex}`}
            src={activeScene.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.82] contrast-[1.08] saturate-[1.07]"
            initial={{
              opacity: 0,
              x: activeScene.fromX,
              y: activeScene.fromY,
              scale: activeScene.fromScale,
              rotate: activeScene.fromRotate,
            }}
            animate={{
              opacity: 1,
              x: activeScene.toX,
              y: activeScene.toY,
              scale: activeScene.toScale,
              rotate: activeScene.toRotate,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1, ease: EASE },
              x: { duration: activeScene.durationMs / 1000, ease: "linear" },
              y: { duration: activeScene.durationMs / 1000, ease: "linear" },
              scale: { duration: activeScene.durationMs / 1000, ease: "linear" },
              rotate: { duration: activeScene.durationMs / 1000, ease: "linear" },
            }}
          />
        </AnimatePresence>
        <img
          src={IMG.hero}
          alt="Luxury living room interior with warm tones"
          className="sr-only"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--espresso)]/72 via-[var(--espresso)]/48 to-[var(--espresso)]/84" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="eo-eyebrow text-[var(--taupe)] mb-8"
        >
          Interior Design Studio · Est. EO
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.1, ease: EASE }}
          className="font-serif text-[var(--text-light)] max-w-5xl text-[2.5rem] leading-[1.05] md:text-[4.5rem] md:leading-[1.02] lg:text-[5.5rem] tracking-[-0.015em]"
        >
          Interiors Designed for the Way You Live Today and Tomorrow
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1 }}
          className="mt-8 max-w-2xl text-[var(--text-light)]/80 text-base md:text-lg leading-relaxed font-light"
        >
          At EO Interiors, every project begins with understanding how you live, move and
          experience your space. By combining functionality, aesthetics and long-term thinking, we
          create interiors that remain relevant, comfortable and beautiful for years to come.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <a href="#contact" className="group inline-flex">
            <span className="relative inline-flex items-center gap-3 px-9 py-4 bg-[var(--text-light)] text-[var(--espresso)] eo-eyebrow overflow-hidden transition-all duration-500 hover:bg-[var(--gold)]">
              Start Your Project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </a>
          <p className="eo-eyebrow text-[var(--taupe)]">
            Interior Design · 3D Visualization · Project Development
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Section header ---------- */
function SectionHead({
  eyebrow,
  title,
  subtitle,
  light,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <span className={`eo-eyebrow ${light ? "text-[var(--taupe)]" : "text-[var(--gold)]"}`}>
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={1}>
        <h2
          className={`mt-6 font-serif text-[2.25rem] md:text-[3.25rem] leading-[1.08] tracking-[-0.015em] ${
            light ? "text-[var(--text-light)]" : "text-[var(--text-dark)]"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={2}>
          <p
            className={`mt-6 text-base md:text-lg leading-relaxed font-light ${
              light ? "text-[var(--text-light)]/75" : "text-[var(--text-dark)]/70"
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- About ---------- */
function About() {
  const stats = [
    { t: "Bespoke Concepts", d: "Tailored design direction for every client and space." },
    { t: "Realistic Planning", d: "Clear 3D visuals before construction or renovation." },
    { t: "Precise Documentation", d: "Detailed technical support for smooth execution." },
  ];
  return (
    <section id="about" className="bg-[var(--ivory)] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <Reveal className="lg:col-span-5">
          <div className="relative overflow-hidden aspect-[3/4]">
            <motion.img
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: EASE }}
              src={founderPortrait}
              alt="Emilija Obradović portrait"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <div className="lg:col-span-7 lg:pl-6">
          <SectionHead
            eyebrow="About EO-Interiors"
            title={
              <>
                Where architecture, function and emotion come together in one timeless language.
              </>
            }
          />
          <div className="mt-8 space-y-5 text-[var(--text-dark)]/75 leading-relaxed font-light max-w-xl">
            {[
              "EO Interiors was founded on the belief that a well-designed interior should do more than look beautiful, it should support the people who live in it, both in their daily lives and in the long term. I am Emilija Obradović, a future architect and interior designer whose passion for architecture began in early childhood. Over the years, this curiosity about space and design developed into a strong professional dedication to understanding how people experience and interact with their environments.",
              "I am currently in the final stage of my architectural studies, complemented by internationally recognized certifications in interior design and functional space planning. Alongside this, I work as a furniture constructor, which gives me a practical understanding of materials, construction, and real-world feasibility in design.",
              "My approach is not driven by trends, but by creating spaces that remain functional, relevant and emotionally balanced over time, spaces that evolve with the people who use them.",
            ].map((p, i) => (
              <Reveal key={i} delay={i + 1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.t} delay={i + 1}>
                <div className="border-t border-[var(--border)] pt-5">
                  <h4 className="font-serif text-xl text-[var(--espresso)]">{s.t}</h4>
                  <p className="mt-2 text-sm text-[var(--text-dark)]/65 font-light leading-relaxed">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
const SERVICES = [
  {
    n: "01",
    t: "Interior Design",
    d: "We create complete interior concepts that define the atmosphere, layout, color palette, furniture direction, materials, lighting and decorative details. Every design is created to feel visually refined, functional and aligned with the client's lifestyle or brand identity.",
  },
  {
    n: "02",
    t: "3D Visualizations",
    d: "High-quality 3D visualizations allow clients to see the final look of the space before work begins. Realistic images help with decision-making, material selection, furniture placement and overall project confidence.",
  },
  {
    n: "03",
    t: "Technical Documentation",
    d: "We prepare clear technical documentation needed for accurate execution, including layouts, furniture plans, lighting plans, material specifications and detailed drawings that help contractors understand and implement the design correctly.",
  },
  {
    n: "04",
    t: "Project Development",
    d: "We provide end-to-end project development, overseeing the translation of design into reality. From coordination with contractors to on-site supervision or full turnkey execution, every stage is managed with a focus on precision, quality and design consistency.",
  },
  {
    n: "05",
    t: "Consultations",
    d: "For clients who need professional guidance, we offer consultations focused on layout improvements, color direction, material choices, furniture selection, lighting atmosphere and practical solutions for existing or future spaces.",
  },
];

function Services() {
  return (
    <section id="services" className="bg-[var(--espresso)] text-[var(--text-light)] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHead
          eyebrow="Services"
          light
          title={
            <>
              Ways We Can <em className="italic font-light text-[var(--gold)]">Work</em> Together
            </>
          }
          subtitle="From the first idea to a fully developed interior concept, EO-Interiors provides a complete design experience supported by visual clarity, technical accuracy and refined aesthetics."
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={i}>
              <article className="group h-full bg-[var(--chocolate)] p-8 md:p-10 border border-transparent hover:border-[var(--gold)]/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-3xl text-[var(--gold)]/80 group-hover:text-[var(--gold)] transition-colors">
                    {s.n}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-[var(--taupe)] transition-all duration-500 group-hover:text-[var(--gold)] group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h3 className="mt-10 font-serif text-2xl md:text-[1.7rem] text-[var(--text-light)]">
                  {s.t}
                </h3>
                <p className="mt-4 text-[var(--text-light)]/65 font-light leading-relaxed text-[0.95rem]">
                  {s.d}
                </p>
              </article>
            </Reveal>
          ))}
          <Reveal delay={5}>
            <article className="group relative h-full min-h-[290px] overflow-hidden border border-[var(--gold)]/20 bg-[radial-gradient(circle_at_25%_20%,rgba(186,150,89,0.2),transparent_55%),linear-gradient(145deg,#2f1b14_0%,#261611_45%,#1e120f_100%)] p-8 md:p-10">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-12 bg-[radial-gradient(circle,rgba(186,150,89,0.24)_0%,transparent_58%)]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative z-10">
                <span className="eo-eyebrow text-[var(--gold)]/90">06 · Signature Layer</span>
                <h3 className="mt-8 font-serif text-2xl md:text-[1.7rem] text-[var(--text-light)]">
                  Premium Styling Direction
                </h3>
                <p className="mt-4 text-[var(--text-light)]/72 font-light leading-relaxed text-[0.95rem]">
                  We curate the final layer of the interior, the moment when a space gains its
                  identity. Through a carefully considered selection of furniture, textures, color
                  palette and sculptural details, we shape interiors that feel complete, balanced
                  and effortlessly elevated.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 eo-eyebrow text-[var(--taupe)] group-hover:text-[var(--gold)] transition-colors">
                  Bespoke finishing touch
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Visual Direction (mood collage) ---------- */
function Mood() {
  const tiles = VISUAL_DIRECTION.tiles;
  return (
    <section className="bg-[var(--cream)] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHead
          eyebrow="Visual Direction"
          title={
            <>
              A glimpse into the atmosphere,{" "}
              <em className="italic font-light text-[var(--gold)]">textures</em> and spatial
              language that define EO-Interiors.
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <Reveal className="lg:col-span-7">
            <figure className="relative overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-full group">
              <motion.img
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: EASE }}
                src={VISUAL_DIRECTION.main}
                alt="Calm luxury living room"
                className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
              />
              <figcaption className="absolute bottom-5 left-5 eo-eyebrow text-[var(--text-light)] bg-[var(--espresso)]/70 px-3 py-2">
                Calm Luxury
              </figcaption>
            </figure>
          </Reveal>
          <div className="lg:col-span-5 grid grid-cols-2 gap-5">
            {tiles.map((t, i) => (
              <Reveal key={t.cap} delay={i}>
                <figure className="relative overflow-hidden aspect-square group">
                  <motion.img
                    src={t.src}
                    alt={t.cap}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.1, rotate: 0.4 }}
                    transition={{ duration: 1.2, ease: EASE }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--espresso)]/45 via-transparent to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-700" />
                  <figcaption className="absolute bottom-3 left-3 eo-eyebrow text-[var(--text-light)] bg-[var(--espresso)]/70 px-2.5 py-1.5 text-[0.6rem]">
                    {t.cap}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Portfolio ---------- */
function Portfolio() {
  return (
    <section id="portfolio" className="bg-[var(--ivory)] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHead
          eyebrow="Portfolio"
          title={
            <>
              Selected interior projects with a focus on{" "}
              <em className="italic font-light text-[var(--gold)]">realism</em>, atmosphere and
              execution detail.
            </>
          }
          subtitle="A curated glimpse of residential and commercial spaces developed through EO-Interiors design direction."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PORTFOLIO.map((item, i) => (
            <Reveal key={item.title} delay={i}>
              <article className="group overflow-hidden bg-[var(--cream)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso)]/65 via-transparent to-transparent" />
                  <div className="absolute left-4 right-4 bottom-4">
                    <p className="eo-eyebrow text-[var(--taupe)]">{item.type}</p>
                    <h3 className="mt-2 font-serif text-2xl text-[var(--text-light)]">{item.title}</h3>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
const STEPS = [
  {
    n: "01",
    t: "Discovery & Brief",
    d: "We begin by understanding your needs, lifestyle, goals, preferred atmosphere, budget direction and the practical requirements of the space.",
  },
  {
    n: "02",
    t: "Concept & Mood",
    d: "We define the visual identity of the interior through moodboards, color direction, materials, furniture references and spatial atmosphere.",
  },
  {
    n: "03",
    t: "Design Development",
    d: "The concept is refined through layouts, 3D visualizations, material choices, lighting ideas and detailed design decisions.",
  },
  {
    n: "04",
    t: "Technical Documentation",
    d: "We prepare the necessary drawings and documentation so the design can be clearly understood and executed by contractors and craftsmen.",
  },
  {
    n: "05",
    t: "Final Guidance",
    d: "We support the final phase with recommendations, adjustments and design guidance so the project remains consistent with the original vision.",
  },
];

function Process() {
  return (
    <section className="bg-[var(--ivory)] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHead
          eyebrow="Our Process"
          title={
            <>
              A clear and thoughtful design{" "}
              <em className="italic font-light text-[var(--gold)]">journey</em>.
            </>
          }
          subtitle="From the first conversation to complete visual and technical direction."
        />

        <div className="mt-20 relative">
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-[var(--border)]" />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i}>
                <div className="relative pl-6 lg:pl-0 border-l lg:border-l-0 border-[var(--border)]">
                  <div className="hidden lg:flex absolute -top-1 left-0 h-3 w-3 rounded-full bg-[var(--gold)] ring-4 ring-[var(--ivory)]" />
                  <span className="font-serif text-2xl text-[var(--gold)]">{s.n}</span>
                  <h4 className="mt-4 lg:mt-10 font-serif text-xl text-[var(--espresso)]">
                    {s.t}
                  </h4>
                  <p className="mt-3 text-sm text-[var(--text-dark)]/65 font-light leading-relaxed">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQS = [
  {
    q: "How much does an interior design project cost?",
    a: "The cost of a project depends on the size of the space, the complexity of the design and the level of detail required. Each project is individually tailored, so pricing is provided after an initial consultation and understanding of your needs.",
  },
  {
    q: "Can you work with clients remotely?",
    a: "Yes. EO Interiors works with clients both locally and remotely. Through detailed communication, plans and 3D visualizations, the entire design process can be successfully completed online.",
  },
  {
    q: "What do I need to start a project?",
    a: "To begin, we typically need basic floor plans, measurements, photos of the space and a short description of your goals, preferences and lifestyle needs. From there, the design process can start.",
  },
  {
    q: "Will I see the design before implementation?",
    a: "Yes. Every project includes realistic 3D visualizations that allow you to clearly understand how your future space will look and feel before any work begins.",
  },
  {
    q: "How long does the design process take?",
    a: "The timeline depends on the scope and complexity of the project, but most interior design projects take from a few weeks up to a maximum of 3 months, from concept development to final delivery. In the case of a turnkey implementation, the overall duration may be longer and depends on contractor availability, craftsmen schedules, and the overall construction timeline.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-[var(--cream)] py-28 md:py-40">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <SectionHead
          eyebrow="FAQ"
          title={
            <>
              Frequently Asked <em className="italic font-light text-[var(--gold)]">Questions</em>
            </>
          }
        />
        <div className="mt-14 border-t border-[var(--border)]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i}>
                <div className="border-b border-[var(--border)]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group"
                  >
                    <span className="font-serif text-lg md:text-2xl text-[var(--espresso)] group-hover:text-[var(--gold)] transition-colors">
                      {f.q}
                    </span>
                    <span className="shrink-0 h-9 w-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--espresso)] group-hover:border-[var(--gold)] group-hover:text-[var(--gold)] transition-all">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 pr-14 text-[var(--text-dark)]/70 font-light leading-relaxed">
                      {f.a}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const onFieldChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `New Inquiry · ${formData.projectType || "EO-Interiors"} · ${formData.name}`;
    const body = [
      "Hello EO-Interiors,",
      "",
      "I would like to inquire about your services.",
      "",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || "Not provided"}`,
      `Project Type: ${formData.projectType}`,
      "",
      "Project Brief:",
      formData.message,
      "",
      "---",
      "Sent from EO-Interiors website form.",
    ].join("\n");
    window.location.href = `mailto:info@eo-interiors.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const inputCls =
    "w-full bg-transparent border-b border-white/20 py-4 text-[var(--text-light)] placeholder:text-[var(--taupe)]/60 focus:outline-none focus:border-[var(--gold)] transition-colors font-light";

  return (
    <section id="contact" className="bg-[var(--espresso)] text-[var(--text-light)] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <SectionHead
            eyebrow="Contact"
            light
            title={
              <>
                Let's create a space with{" "}
                <em className="italic font-light text-[var(--gold)]">character</em>, balance and
                lasting elegance.
              </>
            }
            subtitle="Whether you are planning a new interior, renovating an existing space or preparing a project for visualization and execution, EO-Interiors can help you transform ideas into a refined and clearly developed design direction."
          />

          {/* Premium founder portrait */}
          <Reveal className="mt-12">
            <figure className="group relative overflow-hidden aspect-[4/5] cursor-pointer">
              {/* gold frame outline */}
              <div className="pointer-events-none absolute inset-0 z-30 border border-[var(--gold)]/0 group-hover:border-[var(--gold)]/60 transition-all duration-700" />
              <div className="pointer-events-none absolute inset-3 z-30 border border-[var(--gold)]/0 group-hover:border-[var(--gold)]/25 transition-all duration-1000 delay-100" />

              <img
                src={founderPortrait}
                alt="EO-Interiors founder portrait"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale-[35%] contrast-[1.02] scale-105 transition-all duration-[1400ms] ease-out group-hover:grayscale-0 group-hover:scale-100"
              />

              {/* warm gradient wash */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso)] via-[var(--espresso)]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
              {/* hover darkening overlay */}
              <div className="absolute inset-0 bg-[var(--espresso)]/0 group-hover:bg-[var(--espresso)]/35 transition-colors duration-700" />
              {/* gold sheen sweep */}
              <div className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[60%] rotate-12 bg-gradient-to-r from-transparent via-[var(--gold)]/15 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1600ms] ease-out" />

              <figcaption className="absolute inset-x-0 bottom-0 z-20 p-7 md:p-9">
                <div className="eo-eyebrow text-[var(--gold)] mb-2 opacity-90">Founder · Creative Director</div>
                <div className="font-serif text-2xl md:text-3xl text-[var(--text-light)] leading-tight">
                  Emilija <em className="italic font-light text-[var(--gold)]">Obradović</em>
                </div>
                <div className="mt-3 max-w-sm overflow-hidden">
                  <p className="text-[var(--text-light)]/80 text-sm font-light translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-150">
                    Every space we design begins with a quiet conversation. Let's start yours.
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-12 space-y-5 text-[var(--text-light)]/75 font-light">
            <Reveal>
              <div>
                <span className="eo-eyebrow text-[var(--taupe)] block mb-1">Email</span>
                <a href="mailto:info@eo-interiors.com" className="hover:text-[var(--gold)] transition-colors">
                  info@eo-interiors.com
                </a>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div>
                <span className="eo-eyebrow text-[var(--taupe)] block mb-1">Phone</span>
                <a
                  href="https://wa.me/381694220690"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  +381 69 422 0690 (WhatsApp)
                </a>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div>
                <span className="eo-eyebrow text-[var(--taupe)] block mb-1">Location</span>
                Available for local and international projects
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="bg-[var(--chocolate)] p-8 md:p-12 border border-white/10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="py-20 text-center"
              >
                <h3 className="font-serif text-3xl md:text-4xl text-[var(--gold)]">Thank you.</h3>
                <p className="mt-5 text-[var(--text-light)]/75 font-light max-w-md mx-auto">
                  Your inquiry has been received. EO-Interiors will contact you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  required
                  placeholder="Name"
                  className={inputCls}
                  value={formData.name}
                  onChange={onFieldChange("name")}
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className={inputCls}
                  value={formData.email}
                  onChange={onFieldChange("email")}
                />
                <input
                  placeholder="Phone"
                  className={inputCls}
                  value={formData.phone}
                  onChange={onFieldChange("phone")}
                />
                <select
                  required
                  value={formData.projectType}
                  onChange={onFieldChange("projectType")}
                  className={`${inputCls} appearance-none cursor-pointer`}
                >
                  <option value="" disabled className="bg-[var(--chocolate)]">
                    Project type
                  </option>
                  {[
                    "Interior Design",
                    "3D Visualization",
                    "Technical Documentation",
                    "Project Development",
                    "Consultation",
                  ].map((o) => (
                    <option key={o} className="bg-[var(--chocolate)]">
                      {o}
                    </option>
                  ))}
                </select>
                <textarea
                  required
                  placeholder="Tell us about your project"
                  rows={5}
                  value={formData.message}
                  onChange={onFieldChange("message")}
                  className={`${inputCls} md:col-span-2 resize-none`}
                />
                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 px-9 py-4 bg-[var(--text-light)] text-[var(--espresso)] eo-eyebrow transition-all duration-500 hover:bg-[var(--gold)]"
                  >
                    Send Inquiry
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-[var(--espresso)] text-[var(--text-light)] border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        <div>
          <div className="font-serif tracking-[0.2em] text-xl">EO — INTERIORS</div>
          <p className="mt-3 text-[var(--text-light)]/55 text-sm font-light">
            Interior Design · 3D Visualization · Technical Documentation
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <a
              href="https://www.instagram.com/eo.interiors?igsh=eTc1dnRmNmQzeXJs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--text-light)]/80 hover:text-[var(--gold)] transition-colors"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current">
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span>Instagram: Click here</span>
            </a>
            <a
              href="https://www.linkedin.com/in/emilija-obradovic-776225294?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--text-light)]/80 hover:text-[var(--gold)] transition-colors"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M6.5 8.75A1.25 1.25 0 1 0 6.5 6.25a1.25 1.25 0 0 0 0 2.5Z" />
                <path d="M5.25 10h2.5v8h-2.5z" />
                <path d="M10 10h2.4v1.1h.03c.33-.62 1.15-1.28 2.37-1.28 2.53 0 3 1.66 3 3.82V18h-2.5v-3.85c0-.92-.02-2.1-1.28-2.1-1.28 0-1.48 1-1.48 2.03V18H10z" />
              </svg>
              <span>LinkedIn: Click here</span>
            </a>
          </div>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="eo-eyebrow text-[var(--text-light)]/70 hover:text-[var(--gold)] transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <p className="text-[var(--text-light)]/50 text-xs md:text-right font-light">
          © 2026 EO-Interiors. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
export default function EOHome() {
  return (
    <main className="bg-[var(--ivory)] text-[var(--text-dark)] overflow-x-clip">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Mood />
      <Portfolio />
      <Process />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
