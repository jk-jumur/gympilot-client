"use client";

import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Repeat2,
  BadgeCheck,
  Quote,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const voices = [
  {
    id: 1,
    name: "Sarah Mitchell",
    handle: "@sarah_lifts",
    role: "Member · 2 years",
    time: "2 weeks ago",
    avatar: "SM",
    avatarColor: "from-pink-500 to-rose-500",
    quote:
      "Tried 4 different fitness apps before this. GymPilot is the only one where I don't feel like a customer — I feel like part of a community. The forum alone kept me going when I wanted to quit.",
    likes: 248,
    replies: 32,
    reposts: 18,
    verified: true,
    tag: "COMMUNITY",
  },
  {
    id: 2,
    name: "Raj Kapoor",
    handle: "@coach_raj",
    role: "Trainer · 6 years",
    time: "1 week ago",
    avatar: "RK",
    avatarColor: "from-orange-500 to-amber-500",
    quote:
      "I've used Trainerize, TrueCoach, all of them. The difference here? My members actually show up. Because GymPilot builds accountability into the platform — not as an add-on.",
    likes: 412,
    replies: 56,
    reposts: 89,
    verified: true,
    tag: "RETENTION",
  },
  {
    id: 3,
    name: "Meera Chowdhury",
    handle: "@meera_owns",
    role: "Gym Owner · Scale: 800 members",
    time: "3 days ago",
    avatar: "MC",
    avatarColor: "from-violet-500 to-purple-500",
    quote:
      "As an owner I used to spend 3 hours every Sunday reconciling payments. Now it's automated. That's 150+ hours a year I got back. That's the real difference.",
    likes: 689,
    replies: 94,
    reposts: 156,
    verified: true,
    tag: "TIME SAVED",
  },
  {
    id: 4,
    name: "Dev Sharma",
    handle: "@dev_builds",
    role: "Developer · Self-hosted",
    time: "5 days ago",
    avatar: "DS",
    avatarColor: "from-cyan-500 to-blue-500",
    quote:
      "Open source core means I could fork it, self-host it, and add our gym's custom attendance hardware. No vendor lock-in. No 'contact sales'. Just code.",
    likes: 521,
    replies: 78,
    reposts: 210,
    verified: false,
    tag: "OPEN SOURCE",
  },
];

const floatAnimation = (i) => ({
  initial: { opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 },
  whileInView: { opacity: 1, y: 0, rotate: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
});

export default function WhyDifferent() {
  return (
    <section className="relative w-full py-20 md:py-28 lg:py-32 bg-white dark:bg-[#080808] text-neutral-900 dark:text-white overflow-hidden transition-colors duration-500">
      
      {/* Background blobs */}
      <div className="absolute top-20 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-500/[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
      
      {/* Dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
        
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-500 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-5 md:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Why We're Different
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] md:leading-[1.1] tracking-tight mb-4 md:mb-6 px-2">
            Don't take our word.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Hear theirs.
            </span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4">
            Real people. Real experiences. Real reasons.
          </p>
        </motion.div>

        {/* ─── Conversation Feed ─── */}
        <div className="relative">
          
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-orange-500/20 to-transparent -translate-x-1/2" />

          <div className="space-y-6 md:space-y-10">
            {voices.map((voice, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={voice.id}
                  {...floatAnimation(index)}
                  className={`relative flex ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}
                >
                  <div className="group relative w-full md:w-[58%] lg:w-[55%]">
                    
                    {/* Timeline dot */}
                    <div
                      className={`hidden md:flex absolute top-8 ${
                        isLeft ? "-right-[calc(50%+8px)]" : "-left-[calc(50%+8px)]"
                      } w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)] z-10 items-center justify-center`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    {/* Connector line */}
                    <div
                      className={`hidden md:block absolute top-[38px] ${
                        isLeft ? "right-[-30px]" : "left-[-30px]"
                      } w-[30px] h-[1px] bg-orange-500/30`}
                    />

                    {/* Card */}
                    <div className="relative rounded-2xl md:rounded-3xl p-[1px] bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 group-hover:from-orange-500/70 group-hover:via-orange-500/30 group-hover:to-transparent transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:shadow-orange-500/20">
                      <div className="relative rounded-[15px] md:rounded-[23px] bg-white dark:bg-[#0d0d0d] p-5 md:p-6 lg:p-7 overflow-hidden">
                        
                        {/* ✨ Stronger corner glow on hover */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Header Row */}
                        <div className="relative flex items-start gap-3 md:gap-4 mb-4 md:mb-5">
                          
                          {/* Avatar */}
                          <div
                            className={`relative shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${voice.avatarColor} flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg`}
                          >
                            {voice.avatar}
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-[#0d0d0d] flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                            </div>
                          </div>

                          {/* Name + Handle + Role */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-neutral-900 dark:text-white text-sm md:text-base truncate">
                                {voice.name}
                              </span>
                              {voice.verified && (
                                <BadgeCheck className="w-4 h-4 text-orange-500 shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-500 flex-wrap">
                              <span className="truncate">{voice.handle}</span>
                              <span className="text-neutral-300 dark:text-neutral-700">·</span>
                              <span className="text-neutral-500 text-[11px] md:text-xs">{voice.role}</span>
                              {/* ✨ NEW: Timestamp */}
                              <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">·</span>
                              <span className="text-neutral-400 dark:text-neutral-600 text-[10px] md:text-[11px] hidden sm:inline">
                                {voice.time}
                              </span>
                            </div>
                          </div>

                          {/* Tag */}
                          <span className="shrink-0 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-2 md:px-2.5 py-1 rounded-full border border-orange-100 dark:border-orange-500/20">
                            {voice.tag}
                          </span>
                        </div>

                        {/* Quote Icon */}
                        <Quote className="relative w-5 h-5 md:w-6 md:h-6 text-orange-500/30 mb-2" strokeWidth={2.5} />

                        {/* Quote Text */}
                        <p className="relative text-neutral-700 dark:text-neutral-300 text-sm md:text-[15px] leading-relaxed mb-5 md:mb-6">
                          {voice.quote}
                        </p>

                        {/* Interaction Row */}
                        <div className="relative flex items-center gap-5 md:gap-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 text-xs md:text-sm text-neutral-500">
                          <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors group/btn">
                            <Heart className="w-4 h-4 group-hover/btn:fill-rose-500 group-hover/btn:scale-110 transition-all" />
                            <span className="font-medium">{voice.likes}</span>
                          </button>
                          <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors group/btn">
                            <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-all" />
                            <span className="font-medium">{voice.replies}</span>
                          </button>
                          <button className="flex items-center gap-1.5 hover:text-green-500 transition-colors group/btn">
                            <Repeat2 className="w-4 h-4 group-hover/btn:scale-110 transition-all" />
                            <span className="font-medium">{voice.reposts}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ─── ✨ NEW: "Add Your Voice" Card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center mt-6 md:mt-10"
          >
            
                  
             <Link href="/forum" 
             className="group relative w-full md:w-[58%] lg:w-[55%]">
              {/* Timeline dot */}
              <div className="hidden md:flex absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)] z-10 items-center justify-center animate-pulse">
                <Plus className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </div>

              {/* Card */}
              <div className="relative rounded-2xl md:rounded-3xl border-2 border-dashed border-neutral-300 dark:border-neutral-800 group-hover:border-orange-500/60 bg-neutral-50/50 dark:bg-neutral-900/30 group-hover:bg-orange-50/50 dark:group-hover:bg-orange-500/5 transition-all duration-500 p-6 md:p-8">
                <div className="flex items-center gap-4 md:gap-5">
                  
                  {/* Plus icon circle */}
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#0d0d0d] border-2 border-neutral-300 dark:border-neutral-800 group-hover:border-orange-500 group-hover:bg-orange-500 flex items-center justify-center transition-all duration-300">
                    <Plus className="w-5 h-5 md:w-6 md:h-6 text-neutral-400 dark:text-neutral-600 group-hover:text-white group-hover:rotate-90 transition-all duration-300" strokeWidth={2.5} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="text-base md:text-lg font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors">
                      Your story goes here.
                    </div>
                    <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-500">
                      Share how GymPilot changed your fitness journey.
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-orange-500 flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ─── Bottom Line ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14 md:mt-20"
        >
          <p className="text-neutral-500 text-xs sm:text-sm font-medium">
            Want to see the code behind it?{" "}
            <Link
              href="#tech-stack"
              className="text-orange-500 hover:text-orange-400 font-bold underline-offset-4 hover:underline transition-colors"
            >
              See the tech stack →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}