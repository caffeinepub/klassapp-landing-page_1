import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useJoinWaitlist, useWaitlistCount } from "@/hooks/useQueries";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  FileText,
  Home,
  Loader2,
  Menu,
  Star,
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
  },
  {
    quote:
      "The parent portal alone has reduced our front-desk calls by 60%. Parents love the real-time updates. Our staff loves the simplicity.",
    name: "James Whitfield",
    role: "Head of Administration, Maplewood High",
    stars: 5,
  },
  {
    quote:
      "Fee management used to be a nightmare. With KlassApp, we've cut payment processing time in half and our records are flawless.",
    name: "Priya Sharma",
    role: "Finance Director, Riverside Primary",
    stars: 5,
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
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-slate-700 hover:text-brand-blue"
                    : "text-white/80 hover:text-white"
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
              className="bg-brand-blue hover:bg-blue-700 text-white font-semibold px-5 rounded-full"
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
      <section className="hero-gradient min-h-screen flex items-center pt-16 pb-24 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
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
                Smarter{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #60a5fa 0%, #22c55e 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  School
                </span>
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

            {/* Right: Dashboard mockup */}
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
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(30,111,217,0.4) 0%, transparent 70%)",
                  }}
                />
                <div className="relative glass-card rounded-3xl overflow-hidden p-3 shadow-2xl">
                  <img
                    src="/assets/generated/klassapp-dashboard-mockup.dim_1200x800.png"
                    alt="KlassApp Dashboard"
                    className="w-full max-w-xl rounded-2xl"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 glass-card rounded-2xl p-3 shadow-xl">
                  <img
                    src="https://klassapp-logo-variations-i3t.caffeine.xyz/assets/generated/klassapp-icon.dim_512x512.png"
                    alt="KlassApp Icon"
                    className="h-14 w-14 rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-brand-gray py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold text-slate-500 mb-6 tracking-widest uppercase">
            Trusted by schools across the country
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {SCHOOL_BADGES.map((name) => (
              <span
                key={name}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-700 shadow-xs border border-slate-200"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="bg-white py-24">
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
              className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-3"
            >
              Features
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold text-brand-navy leading-tight"
            >
              Everything your school needs.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-slate-500 text-lg mt-4 max-w-xl mx-auto"
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
                className="feature-card bg-white border border-slate-100 rounded-2xl p-7 shadow-xs hover:shadow-md"
              >
                <div className="h-11 w-11 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-5">
                  <f.icon className="h-5 w-5 text-brand-blue" />
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
      <section id="how-it-works" className="bg-brand-gray py-24">
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
              className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-3"
            >
              How It Works
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold text-brand-navy"
            >
              Up and running in 3 steps.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-8 relative"
          >
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-brand-blue/20 via-brand-blue to-brand-blue/20" />
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                data-ocid={`steps.item.${i + 1}`}
                className="relative text-center"
              >
                <div className="h-20 w-20 rounded-2xl bg-brand-blue flex items-center justify-center mx-auto mb-6 shadow-blue">
                  <span className="font-display text-2xl font-extrabold text-white">
                    {step.num}
                  </span>
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
      <section className="bg-white py-24">
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
              className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-3"
            >
              Testimonials
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold text-brand-navy"
            >
              Loved by educators.
            </motion.h2>
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
                className="bg-brand-gray rounded-2xl p-8 relative overflow-hidden"
              >
                <div
                  className="absolute top-5 right-6 font-display text-7xl font-extrabold leading-none select-none"
                  style={{ color: "#1E6FD9", opacity: 0.12 }}
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
                <p className="text-slate-700 text-sm leading-relaxed mb-6 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-navy text-sm">
                      {t.name}
                    </p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="bg-brand-gray py-24">
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
              className="text-brand-blue font-semibold text-sm tracking-widest uppercase mb-3"
            >
              Pricing
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold text-brand-navy"
            >
              Simple, transparent pricing.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg mt-4">
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
                    : "shadow-xs"
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
        className="py-24"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1a2d4f 100%)",
        }}
      >
        <div className="container max-w-3xl mx-auto px-4 sm:px-6 text-center">
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
