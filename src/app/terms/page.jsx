import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  UserCheck,
  CreditCard,
  AlertTriangle,
  Scale,
  Ban,
  Mail,
  Clock,
  Shield,
  ChevronRight,
} from "lucide-react";

export const metadata = {
  title: "Terms & Conditions — GymPilot",
  description: "Terms of service for using the GymPilot fitness platform.",
};

const sections = [
  {
    id: "account-terms",
    icon: UserCheck,
    title: "Account Terms",
    content: [
      "You must be at least **13 years old** to use GymPilot.",
      "You are responsible for maintaining the security of your account credentials.",
      "Provide accurate, complete information during registration.",
      "**One account per person.** Sharing accounts is not permitted.",
    ],
  },
  {
    id: "acceptable-use",
    icon: FileText,
    title: "Acceptable Use",
    content: [
      "Use GymPilot only for lawful fitness and community purposes.",
      "Do not post harmful, abusive, or misleading content.",
      "Do not attempt to hack, scrape, or disrupt the platform.",
      "Respect other members, trainers, and administrators.",
    ],
  },
  {
    id: "bookings-payments",
    icon: CreditCard,
    title: "Bookings & Payments",
    content: [
      "All class bookings require payment via **Stripe checkout**.",
      "Prices are set by trainers and displayed before purchase.",
      "Refunds are handled on a case-by-case basis per trainer policy.",
      "Booking confirmations are sent to your registered email.",
    ],
  },
  {
    id: "trainer-responsibilities",
    icon: AlertTriangle,
    title: "Trainer Responsibilities",
    content: [
      "Trainers must provide accurate class information and schedules.",
      "Trainers are responsible for delivering classes as advertised.",
      "GymPilot is **not liable** for injuries during in-person sessions.",
      "Trainer accounts may be revoked for policy violations.",
    ],
  },
  {
    id: "content-moderation",
    icon: Ban,
    title: "Content Moderation",
    content: [
      "We reserve the right to remove inappropriate forum content.",
      "Blocked users retain read-only access but cannot post or book.",
      "Repeat violations may result in **permanent account termination**.",
      "Appeals can be submitted via our contact form.",
    ],
  },
  {
    id: "limitation-liability",
    icon: Scale,
    title: "Limitation of Liability",
    content: [
      "GymPilot is provided **'as is'** without warranties of any kind.",
      "We are not liable for indirect, incidental, or consequential damages.",
      "Our total liability is limited to the amount you paid in the last 12 months.",
      "Some jurisdictions may not allow these limitations.",
    ],
  },
  {
    id: "changes-to-terms",
    icon: FileText,
    title: "Changes to Terms",
    content: [
      "We may update these terms to reflect product or legal changes.",
      "Continued use of GymPilot means you accept the updated terms.",
      "Material changes will be announced via email or in-app.",
      "You may close your account at any time if you disagree.",
    ],
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact",
    content: [
      "Questions about these terms? Email us anytime.",
      "**Legal:** legal@gympilot.com",
      "**Support:** support@gympilot.com",
    ],
  },
];

function renderContent(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-neutral-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#080808] text-neutral-900 dark:text-white transition-colors duration-500">
      
      {/* Ambient glow — responsive size */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] md:w-[900px] h-[300px] sm:h-[400px] md:h-[600px] bg-orange-500/[0.06] rounded-full blur-[80px] md:blur-[100px] lg:blur-[140px] pointer-events-none" />

      {/* ✅ Container — asymmetric padding (top normal, bottom spacious for footer) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-24 sm:pb-28 md:pb-32 lg:pb-40">
        
        {/* ─── Back link ─── */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-500 hover:text-orange-500 font-medium transition-colors mb-6 sm:mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        {/* ─── Header ─── */}
        <div className="max-w-3xl mb-10 sm:mb-12 md:mb-16">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
              <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Legal
            </span>
   
            <span className="text-neutral-300 dark:text-neutral-700 text-xs">·</span>
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] md:text-xs text-neutral-500">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              ~5 min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] sm:leading-[1.05] tracking-tight mb-4 sm:mb-5">
            Terms &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> Conditions</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
            These terms govern your use of GymPilot. By creating an account,
            you agree to abide by them.
          </p>
        </div>

        {/* ─── Content Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          
          {/* ─── Sticky TOC (Mobile এ উপরে, Desktop এ বামে) ─── */}
          <aside className="lg:col-span-4 xl:col-span-3 order-1 lg:order-1">
            <div className="lg:sticky lg:top-24">
              <div className="p-[1px] rounded-2xl bg-gradient-to-b from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
                <div className="rounded-[15px] bg-white dark:bg-[#0d0d0d] p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                    <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                      Table of Contents
                    </h3>
                  </div>

                  <nav className="space-y-0.5 sm:space-y-1">
                    {sections.map((section, i) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="group flex items-start gap-2 sm:gap-2.5 py-1.5 sm:py-2 px-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/5 transition-colors"
                      >
                        <span className="shrink-0 w-5 h-5 rounded-md bg-neutral-100 dark:bg-neutral-800 group-hover:bg-orange-500 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-neutral-500 dark:text-neutral-400 group-hover:text-white transition-all mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-[12px] sm:text-[13px] text-neutral-700 dark:text-neutral-300 group-hover:text-orange-500 font-medium leading-snug transition-colors">
                          {section.title}
                        </span>
                      </a>
                    ))}
                  </nav>

                  <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-neutral-100 dark:border-neutral-800/80">
                    <Link
                      href="/privacy-policy"
                      className="group flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500 hover:text-orange-500 transition-colors"
                    >
                      Privacy Policy
                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link
                      href="/about"
                      className="group flex items-center justify-between text-[11px] sm:text-xs font-semibold text-neutral-500 hover:text-orange-500 transition-colors mt-2 sm:mt-2.5"
                    >
                      About GymPilot
                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ─── Main Content ─── */}
          <main className="lg:col-span-8 xl:col-span-9 order-2 lg:order-2 space-y-4 sm:space-y-5 md:space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-20 sm:scroll-mt-24 group relative p-[1px] rounded-2xl md:rounded-3xl bg-gradient-to-b from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 hover:from-orange-500/40 hover:to-orange-500/5 transition-all duration-500"
                >
                  <div className="rounded-[15px] md:rounded-[23px] bg-white dark:bg-[#0d0d0d] p-4 sm:p-6 md:p-8">
                    
                    {/* Section Header */}
                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="shrink-0 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-orange-500/80 mb-0.5 sm:mb-1">
                          Section {String(index + 1).padStart(2, "0")}
                        </div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    {/* Content List */}
                    <ul className="space-y-2 sm:space-y-3">
                      {section.content.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 sm:gap-3 text-[13px] sm:text-sm md:text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)] shrink-0 mt-2 sm:mt-2.5" />
                          <span>{renderContent(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}

            {/* ─── Agreement Card ─── */}
            <div className="relative p-[1px] rounded-2xl md:rounded-3xl bg-gradient-to-br from-orange-500/40 via-orange-500/10 to-transparent">
              <div className="rounded-[15px] md:rounded-[23px] bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-[#0d0d0d] p-4 sm:p-6 md:p-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="shrink-0 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2 text-neutral-900 dark:text-white leading-tight">
                      By using GymPilot, you agree to these terms.
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-3 sm:mb-4 leading-relaxed">
                      Have questions? We're happy to clarify anything about our
                      terms or policies.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Contact legal team
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}