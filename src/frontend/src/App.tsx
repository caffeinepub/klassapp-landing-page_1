import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useJoinWaitlist, useWaitlistCount } from "@/hooks/useQueries";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  FileText,
  Home,
  Loader2,
  Menu,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const FEATURES = [
  {
    icon: Clock,
    title: "Attendance & Scheduling",
    desc: "Automate daily attendance, manage class schedules, and get real-time reports — all from one place.",
  },
  {
    icon: BarChart3,
    title: "Grades & Analytics",
    desc: "Track academic performance with intuitive grade books, progress charts, and predictive analytics.",
  },
  {
    icon: Users,
    title: "Staff & Communication",
    desc: "Streamline staff coordination, internal messaging, and announcements across your entire institution.",
  },
  {
    icon: Home,
    title: "Parent Portal",
    desc: "Keep parents informed with real-time updates on attendance, grades, and school announcements.",
  },
  {
    icon: CreditCard,
    title: "Fee Management",
    desc: "Simplify fee collection, payment tracking, and financial reporting with automated workflows.",
  },
  {
    icon: FileText,
    title: "Reports & Compliance",
    desc: "Generate detailed compliance reports, transcripts, and data exports in seconds.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Set up your school in minutes",
    desc: "Import your roster, configure your classes, and customize KlassApp to match your school's structure.",
  },
  {
    num: "02",
    title: "Invite staff, teachers & parents",
    desc: "Send bulk invitations via email. Role-based access ensures everyone sees exactly what they need.",
  },
  {
    num: "03",
    title: "Run everything from one dashboard",
    desc: "Attendance, grades, fees, and communication — all in one beautifully unified platform.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "KlassApp transformed how we manage our 800-student campus. What used to take hours now happens in minutes. I can't imagine going back.",
    name: "Dr. Amara Osei",
    role: "Principal, Greenfield Academy",
    stars: 5,
    initials: "AO",
    color: "from-blue-500 to-indigo-600",
  },
  {
    quote:
      "The parent portal alone has reduced our front-desk calls by 60%. Parents love the real-time updates. Our staff loves the simplicity.",
    name: "James Whitfield",
    role: "Head of Administration, Maplewood High",
    stars: 5,
    initials: "JW",
    color: "from-indigo-500 to-purple-600",
  },
  {
    quote:
      "Fee management used to be a nightmare. With KlassApp, we've cut payment processing time in half and our records are flawless.",
    name: "Priya Sharma",
    role: "Finance Director, Riverside Primary",
    stars: 5,
    initials: "PS",
    color: "from-teal-500 to-emerald-600",
  },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    desc: "Perfect for small schools getting started.",
    features: [
      "Up to 50 students",
      "Basic attendance tracking",
      "Grade book",
      "Email support",
    ],
    cta: "Start Free",
    highlight: false,
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    desc: "Everything your growing school needs.",
    features: [
      "Up to 500 students",
      "All Free features",
      "Parent portal",
      "Fee management",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Get Started",
    highlight: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Tailored solutions for large institutions.",
    features: [
      "Unlimited students",
      "All Pro features",
      "Custom integrations",
      "Dedicated account manager",
      "SLA & compliance support",
      "On-premise option",
    ],
    cta: "Contact Sales",
    highlight: false,
    popular: false,
  },
];

const SCHOOL_BADGES = [
  "Greenfield Academy",
  "Maplewood High",
  "Riverside Primary",
  "Lakeside Prep",
  "Summit Charter",
];

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#top" },
    { label: "Roadmap", href: "#top" },
  ],
  Company: [
    { label: "About Us", href: "#top" },
    { label: "Blog", href: "#top" },
    { label: "Careers", href: "#top" },
    { label: "Contact", href: "#waitlist" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#top" },
    { label: "Terms of Service", href: "#top" },
    { label: "Cookie Policy", href: "#top" },
    { label: "GDPR", href: "#top" },
  ],
};

/* ─── Coded Dashboard Mockup Component ─── */
function DashboardMockup() {
  const students = [
    { name: "Ava Thompson", class: "Grade 8A", status: "Present", fee: "Paid" },
    {
      name: "Kofi Mensah",
      class: "Grade 7B",
      status: "Absent",
      fee: "Pending",
    },
    { name: "Sofia Rivera", class: "Grade 9C", status: "Present", fee: "Paid" },
  ];

  return (
    <div
      className="dashboard-mockup w-full max-w-[580px] rounded-2xl overflow-hidden"
      style={{
        background: "#0d1b35",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{
          background: "#0a1628",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <span
          className="text-xs font-semibold tracking-wide"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          KlassApp Dashboard
        </span>
        <div
          className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: "#1E6FD9", color: "#fff" }}
        >
          A
        </div>
      </div>

      <div className="p-5">
        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div
            className="rounded-xl p-3.5"
            style={{
              background: "rgba(30,111,217,0.15)",
              border: "1px solid rgba(30,111,217,0.25)",
            }}
          >
            <p
              className="text-xs mb-1"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Total Students
            </p>
            <p className="text-2xl font-extrabold" style={{ color: "#fff" }}>
              1,248
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" style={{ color: "#22C55E" }} />
              <span className="text-xs" style={{ color: "#22C55E" }}>
                +4.2%
              </span>
            </div>
          </div>
          <div
            className="rounded-xl p-3.5"
            style={{
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.25)",
            }}
          >
            <p
              className="text-xs mb-1"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Today's Attendance
            </p>
            <p className="text-2xl font-extrabold" style={{ color: "#22C55E" }}>
              94%
            </p>
            <div
              className="mt-1.5 rounded-full h-1.5 w-full"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <div
                className="h-1.5 rounded-full"
                style={{ width: "94%", background: "#22C55E" }}
              />
            </div>
          </div>
          <div
            className="rounded-xl p-3.5"
            style={{
              background: "rgba(251,191,36,0.1)",
              border: "1px solid rgba(251,191,36,0.2)",
            }}
          >
            <p
              className="text-xs mb-1"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Pending Fees
            </p>
            <p className="text-2xl font-extrabold" style={{ color: "#FBBF24" }}>
              12
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              ₦48,000 due
            </p>
          </div>
        </div>

        {/* Mini Table */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div
            className="px-4 py-2.5 flex items-center justify-between"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              className="text-xs font-semibold"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Recent Students
            </span>
            <span className="text-xs" style={{ color: "#1E6FD9" }}>
              View all →
            </span>
          </div>
          <div>
            {students.map((s, i) => (
              <div
                key={s.name}
                className="flex items-center justify-between px-4 py-2.5"
                style={{
                  borderBottom:
                    i < students.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background:
                        i === 0 ? "#1E6FD9" : i === 1 ? "#7C3AED" : "#0D9488",
                      color: "#fff",
                    }}
                  >
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      {s.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {s.class}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background:
                        s.status === "Present"
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(239,68,68,0.15)",
                      color: s.status === "Present" ? "#22C55E" : "#EF4444",
                    }}
                  >
                    {s.status}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background:
                        s.fee === "Paid"
                          ? "rgba(30,111,217,0.15)"
                          : "rgba(251,191,36,0.15)",
                      color: s.fee === "Paid" ? "#60A5FA" : "#FBBF24",
                    }}
                  >
                    {s.fee}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const waitlistRef = useRef<HTMLElement>(null);

  const { data: waitlistCount } = useWaitlistCount();
  const joinWaitlist = useJoinWaitlist();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in your name and email.");
      return;
    }
    try {
      await joinWaitlist.mutateAsync({ name: form.name, email: form.email });
      setSubmitted(true);
      toast.success("You're on the list! We'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const count = waitlistCount ? Number(waitlistCount) : 500;

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="/" data-ocid="nav.link">
            <img
              src="/assets/uploads/klassapp-logo-primary-1.png"
              alt="KlassApp"
              className="h-8 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Pricing", href: "#pricing" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-ocid="nav.link"
                className={`text-sm font-semibold transition-colors ${
                  scrolled
                    ? "text-slate-700 hover:text-brand-blue"
                    : "text-white hover:text-white/70"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={scrollToWaitlist}
              data-ocid="nav.primary_button"
              className={`font-semibold px-5 rounded-full transition-all ${
                scrolled
                  ? "bg-brand-blue hover:bg-blue-700 text-white"
                  : "bg-white hover:bg-white/90 text-brand-navy shadow-md"
              }`}
            >
              Get Early Access
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={`md:hidden p-2 rounded-lg ${
              scrolled ? "text-slate-700" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white border-t border-slate-100 shadow-lg"
            >
              <div className="container px-4 py-4 flex flex-col gap-3">
                {[
                  { label: "Features", href: "#features" },
                  { label: "How It Works", href: "#how-it-works" },
                  { label: "Pricing", href: "#pricing" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    data-ocid="nav.link"
                    className="text-sm font-medium text-slate-700 hover:text-brand-blue py-2"
                  >
                    {item.label}
                  </a>
                ))}
                <Button
                  onClick={scrollToWaitlist}
                  data-ocid="nav.primary_button"
                  className="bg-brand-blue text-white font-semibold rounded-full w-full mt-1"
                >
                  Get Early Access
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section className="hero-gradient min-h-screen flex items-center pt-16 pb-24 overflow-hidden relative">
        {/* Subtle grid overlay */}
        <div className="hero-grid-overlay" />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeUp}>
                <Badge className="mb-6 inline-flex items-center gap-1.5 bg-brand-green/15 text-brand-green border-brand-green/30 px-3 py-1 text-xs font-semibold rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
                  Now in Beta — Join the Waitlist
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
              >
                Smarter <span className="hero-shimmer-text">School</span>
                <br />
                Management.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              >
                KlassApp brings together students, teachers, and administrators
                in one beautifully simple platform — designed for the modern
                school.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
              >
                <Button
                  onClick={scrollToWaitlist}
                  data-ocid="hero.primary_button"
                  size="lg"
                  className="bg-brand-blue hover:bg-blue-600 text-white font-semibold px-8 py-6 rounded-full text-base shadow-blue"
                >
                  Get Early Access
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  data-ocid="hero.secondary_button"
                  className="border-white/30 text-white bg-white/5 hover:bg-white/10 font-semibold px-8 py-6 rounded-full text-base backdrop-blur-sm"
                >
                  <a href="#features">See Features</a>
                </Button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 justify-center lg:justify-start text-sm text-slate-400"
              >
                <CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />
                <span>
                  Join{" "}
                  <span className="text-white font-semibold">{count}+</span>{" "}
                  schools already on KlassApp
                </span>
              </motion.div>
            </motion.div>

            {/* Right: Coded Dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
                delay: 0.2,
              }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow behind */}
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(30,111,217,0.35) 0%, transparent 70%)",
                  }}
                />
                {/* Outer glass frame */}
                <div className="relative glass-card rounded-3xl overflow-hidden p-3 shadow-2xl">
                  <DashboardMockup />
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2.5"
                >
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ background: "#22C55E" }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      94% Attendance
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      Updated just now
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold text-slate-400 mb-7 tracking-widest uppercase">
            Trusted by schools across the country
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {SCHOOL_BADGES.map((name) => (
              <span
                key={name}
                className="trust-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 bg-white"
              >
                <Building2 className="h-3.5 w-3.5 text-brand-blue flex-shrink-0" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="bg-brand-gray py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-brand-blue font-bold text-xs tracking-widest uppercase mb-3"
            >
              Features
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight"
            >
              Everything your school needs.
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="section-underline mx-auto mt-4 mb-5"
            />
            <motion.p
              variants={fadeUp}
              className="text-slate-500 text-lg max-w-xl mx-auto"
            >
              Purpose-built tools that simplify school administration and
              empower every stakeholder.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                data-ocid={`features.item.${i + 1}`}
                className="feature-card bg-white border border-slate-100 rounded-2xl p-7 shadow-xs hover:shadow-md group"
              >
                <div className="h-11 w-11 rounded-xl feature-icon-bg flex items-center justify-center mb-5">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-brand-navy mb-2">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="bg-white py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-brand-blue font-bold text-xs tracking-widest uppercase mb-3"
            >
              How It Works
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold text-brand-navy"
            >
              Up and running in 3 steps.
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="section-underline mx-auto mt-4"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-8 relative"
          >
            {/* Dashed connecting line */}
            <div className="hidden md:block absolute top-10 left-[calc(33%+2rem)] right-[calc(33%+2rem)] border-t-2 border-dashed border-brand-blue/25" />
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                data-ocid={`steps.item.${i + 1}`}
                className="relative text-center group"
              >
                {/* Large outlined number */}
                <div className="relative h-24 w-24 mx-auto mb-6 flex items-center justify-center">
                  <span className="step-number-outline font-display font-extrabold">
                    {step.num}
                  </span>
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-blue/20 group-hover:border-brand-blue/40 transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-brand-gray py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-brand-blue font-bold text-xs tracking-widest uppercase mb-3"
            >
              Testimonials
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold text-brand-navy"
            >
              Loved by educators.
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="section-underline mx-auto mt-4"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                data-ocid={`testimonials.item.${i + 1}`}
                className="testimonial-card bg-white rounded-2xl p-8 relative overflow-hidden shadow-xs"
              >
                <div
                  className="absolute top-5 right-6 font-display text-7xl font-extrabold leading-none select-none"
                  style={{ color: "#1E6FD9", opacity: 0.08 }}
                >
                  &ldquo;
                </div>
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.stars }, (_, j) => j).map((j) => (
                    <Star
                      key={`star-${j}`}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white font-bold text-sm">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-navy text-sm">
                      {t.name}
                    </p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="bg-white py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-brand-blue font-bold text-xs tracking-widest uppercase mb-3"
            >
              Pricing
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold text-brand-navy"
            >
              Simple, transparent pricing.
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="section-underline mx-auto mt-4 mb-5"
            />
            <motion.p variants={fadeUp} className="text-slate-500 text-lg">
              No hidden fees. Cancel anytime.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6 items-start"
          >
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                data-ocid={`pricing.item.${i + 1}`}
                className={`relative bg-white rounded-2xl p-8 ${
                  plan.highlight
                    ? "pricing-highlight -mt-4 pt-12 pb-12"
                    : "border border-slate-100 shadow-xs"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-brand-green text-white font-semibold text-xs px-4 py-1 rounded-full border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <h3 className="font-display text-xl font-bold text-brand-navy mb-1">
                  {plan.name}
                </h3>
                <p className="text-slate-500 text-sm mb-5">{plan.desc}</p>
                <div className="flex items-end gap-1 mb-7">
                  <span className="font-display text-4xl font-extrabold text-brand-navy">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-slate-500 text-sm mb-1">
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-slate-600"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand-green flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={scrollToWaitlist}
                  data-ocid={`pricing.primary_button.${i + 1}`}
                  className={`w-full rounded-full font-semibold ${
                    plan.highlight
                      ? "bg-brand-blue hover:bg-blue-700 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-brand-navy"
                  }`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Waitlist CTA ── */}
      <section
        ref={waitlistRef as React.RefObject<HTMLElement>}
        id="waitlist"
        className="waitlist-section py-24 relative overflow-hidden"
      >
        {/* Grid texture overlay */}
        <div className="waitlist-grid-overlay" />
        <div className="container max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-6 inline-flex items-center gap-1.5 bg-brand-green/15 text-brand-green border-brand-green/30 px-3 py-1 text-xs font-semibold rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
                {count}+ schools joined
              </Badge>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Be the first to transform your school.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-slate-400 text-lg mb-10"
            >
              Join the waitlist today and get early access, exclusive onboarding
              support, and 3 months free on any paid plan.
            </motion.p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  data-ocid="waitlist.success_state"
                  className="glass-card rounded-2xl p-10 flex flex-col items-center gap-4"
                >
                  <div className="h-16 w-16 rounded-full bg-brand-green/20 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-brand-green" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    You&apos;re on the list!
                  </h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    We&apos;ll reach out as soon as early access opens. Keep an
                    eye on your inbox.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  data-ocid="waitlist.panel"
                  className="glass-card rounded-2xl p-8"
                >
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="text-left">
                      <label
                        htmlFor="waitlist-name"
                        className="block text-xs font-medium text-slate-400 mb-1.5"
                      >
                        Full Name
                      </label>
                      <Input
                        id="waitlist-name"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        data-ocid="waitlist.input"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-brand-blue rounded-xl h-12"
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div className="text-left">
                      <label
                        htmlFor="waitlist-email"
                        className="block text-xs font-medium text-slate-400 mb-1.5"
                      >
                        Work Email
                      </label>
                      <Input
                        id="waitlist-email"
                        type="email"
                        placeholder="jane@school.edu"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        data-ocid="waitlist.input"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-brand-blue rounded-xl h-12"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={joinWaitlist.isPending}
                    data-ocid="waitlist.submit_button"
                    className="w-full bg-brand-blue hover:bg-blue-600 text-white font-semibold rounded-full py-6 text-base shadow-blue"
                  >
                    {joinWaitlist.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Joining…
                      </>
                    ) : (
                      <>
                        Join the Waitlist
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-slate-500 text-xs mt-4">
                    No spam. Unsubscribe anytime. Your data is safe with us.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-brand-navy py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-1">
              <img
                src="/assets/uploads/klassapp-logo-primary-1.png"
                alt="KlassApp"
                className="h-8 w-auto object-contain mb-4"
              />
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                The modern school management platform that brings your whole
                institution together.
              </p>
            </div>

            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <p className="text-white font-semibold text-sm mb-4">
                  {section}
                </p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        data-ocid="footer.link"
                        className="text-slate-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} KlassApp. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
