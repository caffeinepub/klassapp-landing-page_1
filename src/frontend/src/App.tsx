import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { useOnboardingCount, useSubmitOnboarding } from "@/hooks/useQueries";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
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
import { useRef, useState } from "react";
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
    name: "Basic",
    price: "$30",
    period: "/mo",
    desc: "For small to medium schools ready to modernize.",
    features: [
      "Up to 300 students",
      "Attendance & scheduling",
      "Grade book & reports",
      "Parent portal",
      "Email support",
    ],
    cta: "Get Started",
    highlight: false,
    popular: false,
  },
  {
    name: "Pro",
    price: "$40",
    period: "/mo",
    desc: "Everything growing institutions need to thrive.",
    features: [
      "Up to 1,000 students",
      "All Basic features",
      "Fee management & payments",
      "Advanced analytics & insights",
      "Staff communication tools",
      "Priority support",
    ],
    cta: "Onboard Your School",
    highlight: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Tailored solutions for large institutions & districts.",
    features: [
      "Unlimited students",
      "All Pro features",
      "Custom integrations & API",
      "Dedicated account manager",
      "SLA & compliance support",
      "On-premise deployment option",
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
    { label: "Contact", href: "#onboarding" },
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
  const mockupRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!mockupRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(mockupRef.current, {
      backgroundColor: "#0d1b35",
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = "klassapp-dashboard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

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
      ref={mockupRef}
      className="dashboard-mockup w-full max-w-[580px] rounded-2xl overflow-hidden relative"
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
      <button
        type="button"
        data-ocid="hero.dashboard.button"
        onClick={handleDownload}
        title="Download dashboard as PNG"
        className="absolute bottom-3 right-3 flex items-center justify-center rounded-lg w-8 h-8 transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: "rgba(30,111,217,0.85)",
          border: "1px solid rgba(30,111,217,0.5)",
          backdropFilter: "blur(4px)",
          color: "#fff",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(30,111,217,1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(30,111,217,0.85)";
        }}
      >
        <Download className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeAudienceTab, setActiveAudienceTab] = useState<
    "Administrators" | "Teachers"
  >("Administrators");
  const [form, setForm] = useState({
    schoolName: "",
    schoolSize: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    role: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const onboardingRef = useRef<HTMLElement>(null);

  const { data: onboardingCount } = useOnboardingCount();
  const submitOnboarding = useSubmitOnboarding();

  const scrollToOnboarding = () => {
    onboardingRef.current?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.schoolName.trim() ||
      !form.schoolSize.trim() ||
      !form.contactName.trim() ||
      !form.contactEmail.trim() ||
      !form.role.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitOnboarding.mutateAsync({
        schoolName: form.schoolName,
        schoolSize: form.schoolSize,
        contactName: form.contactName,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
        role: form.role,
      });
      setSubmitted(true);
      toast.success("Your school has been submitted for onboarding!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const count = onboardingCount ? Number(onboardingCount) : 500;

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-brand-navy shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 overflow-visible">
          <a href="/" data-ocid="nav.link">
            <img
              src="/assets/uploads/klassapp-logo-primary-1.png"
              alt="KlassApp"
              className="h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-ocid="nav.link"
                className="text-sm font-semibold transition-colors text-white/90 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            {/* Dropdown nav items */}
            {[
              {
                label: "Product",
                items: [
                  { label: "Dashboard", href: "#features" },
                  { label: "Attendance", href: "#features" },
                  { label: "Grades", href: "#features" },
                  { label: "Communication", href: "#features" },
                  { label: "Reports", href: "#features" },
                ],
              },
              {
                label: "Company",
                items: [
                  { label: "About Us", href: "#top" },
                  { label: "Our Mission", href: "#top" },
                  { label: "Careers", href: "#top" },
                  { label: "Press", href: "#top" },
                ],
              },
              {
                label: "Legal",
                items: [
                  { label: "Privacy Policy", href: "#top" },
                  { label: "Terms of Service", href: "#top" },
                  { label: "Cookie Policy", href: "#top" },
                ],
              },
            ].map((dropdown) => (
              <div
                key={dropdown.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(dropdown.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white cursor-pointer transition-colors"
                >
                  {dropdown.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {activeDropdown === dropdown.label && (
                  <div
                    data-ocid="nav.dropdown_menu"
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50"
                  >
                    {dropdown.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        data-ocid="nav.link"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-blue transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="#pricing"
              data-ocid="nav.link"
              className="text-sm font-semibold transition-colors text-white/90 hover:text-white"
            >
              Pricing
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={scrollToOnboarding}
              data-ocid="nav.primary_button"
              className="font-semibold px-5 rounded-full transition-all bg-brand-blue hover:bg-blue-700 text-white"
            >
              Onboard Your School
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-white"
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
              className="md:hidden bg-brand-navy border-t border-white/10 shadow-lg"
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
                    className="text-sm font-medium text-white/90 hover:text-white py-2"
                  >
                    {item.label}
                  </a>
                ))}
                <Button
                  onClick={scrollToOnboarding}
                  data-ocid="nav.primary_button"
                  className="bg-brand-blue text-white font-semibold rounded-full w-full mt-1"
                >
                  Onboard Your School
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section className="hero-gradient min-h-screen flex items-center pt-16 pb-24 overflow-hidden relative">
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
                  KlassApp is Live — Onboard Your School Today
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6"
              >
                Built for Schools.{" "}
                <span className="text-brand-blue">Powered by Tomorrow.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              >
                KlassApp unifies your entire school ecosystem — students,
                teachers, parents, and administrators — into one intelligent,
                future-ready platform that transforms how modern schools
                connect, operate, and thrive. Powered by cutting-edge AI
                automation and blockchain-grade security, KlassApp delivers
                real-time communication, unbreakable data privacy, and infinite
                scalability, so your school doesn't just keep up with the
                future, it leads it.
              </motion.p>

              {/* Audience Tabs */}
              <motion.div variants={fadeUp} className="mb-6">
                <div className="flex gap-2 mb-4">
                  {(["Administrators", "Teachers"] as const).map((tab, idx) => (
                    <button
                      key={tab}
                      type="button"
                      data-ocid={`hero.tab.${idx + 1}`}
                      onClick={() => setActiveAudienceTab(tab)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        activeAudienceTab === tab
                          ? "bg-brand-blue text-white shadow-blue"
                          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAudienceTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5"
                  >
                    {activeAudienceTab === "Administrators" ? (
                      <>
                        <p className="text-white font-bold text-lg mb-1">
                          Stop managing chaos. Start leading with clarity.
                        </p>
                        <p className="text-white/70 text-sm">
                          One platform to run your entire school, smarter,
                          faster, and more securely than ever before.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-white font-bold text-lg mb-1">
                          Spend less time on admin. More time doing what you
                          love — teaching.
                        </p>
                        <p className="text-white/70 text-sm">
                          KlassApp handles the noise so you can focus on what
                          actually matters.
                        </p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
              >
                <Button
                  onClick={scrollToOnboarding}
                  data-ocid="hero.primary_button"
                  size="lg"
                  className="bg-brand-blue hover:bg-blue-600 text-white font-semibold px-8 py-6 rounded-full text-base shadow-blue"
                >
                  Onboard Your School Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  data-ocid="hero.secondary_button"
                  className="border-white/30 text-white bg-white/10 hover:bg-white/20 font-semibold px-8 py-6 rounded-full text-base backdrop-blur-sm"
                >
                  <a href="#features">See Features</a>
                </Button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 justify-center lg:justify-start text-sm text-white/60"
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
                  onClick={scrollToOnboarding}
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

      {/* ── School Onboarding CTA ── */}
      <section
        ref={onboardingRef as React.RefObject<HTMLElement>}
        id="onboarding"
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
                {count}+ schools onboarded
              </Badge>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Ready to transform your school?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-slate-400 text-lg mb-10"
            >
              Fill in your details and our team will get you set up within 24
              hours.
            </motion.p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  data-ocid="onboarding.success_state"
                  className="glass-card rounded-2xl p-10 flex flex-col items-center gap-4"
                >
                  <div className="h-16 w-16 rounded-full bg-brand-green/20 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-brand-green" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    You&apos;re all set!
                  </h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Our team will reach out within 24 hours to get your school
                    onboarded.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  data-ocid="onboarding.panel"
                  className="glass-card rounded-2xl p-8 text-left"
                >
                  {/* Row 1: School Name + School Size */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="school-name"
                        className="block text-xs font-medium text-slate-400 mb-1.5"
                      >
                        School Name
                      </label>
                      <Input
                        id="school-name"
                        placeholder="e.g. Greenfield Academy"
                        value={form.schoolName}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, schoolName: e.target.value }))
                        }
                        data-ocid="onboarding.school_name.input"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-brand-blue rounded-xl h-12"
                        autoComplete="organization"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="school-size"
                        className="block text-xs font-medium text-slate-400 mb-1.5"
                      >
                        School Size
                      </label>
                      <Select
                        value={form.schoolSize}
                        onValueChange={(v) =>
                          setForm((p) => ({ ...p, schoolSize: v }))
                        }
                      >
                        <SelectTrigger
                          id="school-size"
                          data-ocid="onboarding.school_size.select"
                          className="bg-white/10 border-white/20 text-white rounded-xl h-12 focus:border-brand-blue"
                        >
                          <SelectValue placeholder="Select school size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Under 100 students">
                            Under 100 students
                          </SelectItem>
                          <SelectItem value="100–500 students">
                            100–500 students
                          </SelectItem>
                          <SelectItem value="500–1,000 students">
                            500–1,000 students
                          </SelectItem>
                          <SelectItem value="1,000+ students">
                            1,000+ students
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Row 2: Contact Name + Role */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-slate-400 mb-1.5"
                      >
                        Contact Name
                      </label>
                      <Input
                        id="contact-name"
                        placeholder="e.g. Dr. Jane Smith"
                        value={form.contactName}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            contactName: e.target.value,
                          }))
                        }
                        data-ocid="onboarding.contact_name.input"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-brand-blue rounded-xl h-12"
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-xs font-medium text-slate-400 mb-1.5"
                      >
                        Role / Title
                      </label>
                      <Select
                        value={form.role}
                        onValueChange={(v) =>
                          setForm((p) => ({ ...p, role: v }))
                        }
                      >
                        <SelectTrigger
                          id="role"
                          data-ocid="onboarding.role.select"
                          className="bg-white/10 border-white/20 text-white rounded-xl h-12 focus:border-brand-blue"
                        >
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Principal">Principal</SelectItem>
                          <SelectItem value="Vice Principal">
                            Vice Principal
                          </SelectItem>
                          <SelectItem value="Administrator">
                            Administrator
                          </SelectItem>
                          <SelectItem value="IT Director">
                            IT Director
                          </SelectItem>
                          <SelectItem value="Finance Director">
                            Finance Director
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Row 3: Work Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-slate-400 mb-1.5"
                      >
                        Work Email
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="jane@school.edu"
                        value={form.contactEmail}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            contactEmail: e.target.value,
                          }))
                        }
                        data-ocid="onboarding.email.input"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-brand-blue rounded-xl h-12"
                        autoComplete="email"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-medium text-slate-400 mb-1.5"
                      >
                        Phone (optional)
                      </label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.contactPhone}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            contactPhone: e.target.value,
                          }))
                        }
                        data-ocid="onboarding.phone.input"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-brand-blue rounded-xl h-12"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitOnboarding.isPending}
                    data-ocid="onboarding.submit_button"
                    className="w-full bg-brand-blue hover:bg-blue-600 text-white font-semibold rounded-full py-6 text-base shadow-blue"
                  >
                    {submitOnboarding.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Onboard Your School Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-slate-500 text-xs mt-4 text-center">
                    No spam. Your data is safe with us.
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
                className="h-12 w-auto object-contain mb-4"
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
