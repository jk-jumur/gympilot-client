
"use client";

import React from 'react';
import { motion } from "motion/react";
import { MdFitnessCenter, MdTrendingUp, MdGroup, MdTimer, MdRestaurant, MdVerified } from 'react-icons/md';

const WhyChooseUs = () => {
  const cards = [
    {
      icon: MdFitnessCenter,
      title: "Smart Equipment",
      description: "GymPilot connects with modern smart fitness gear to track every rep automatically.",
      bgAccent: "from-orange-500/10 to-amber-500/10 border-orange-500/30",
      iconBg: "bg-orange-500 text-white",
      glowColor: "group-hover:shadow-orange-500/20"
    },
    {
      icon: MdTrendingUp,
      title: "Progress Analytics",
      description: "Visualize strength gains and body transformation with detailed AI charts.",
      bgAccent: "from-blue-500/10 to-cyan-500/10 border-blue-500/30",
      iconBg: "bg-blue-500 text-white",
      glowColor: "group-hover:shadow-blue-500/20"
    },
    {
      icon: MdGroup,
      title: "Expert Trainers",
      description: "Get personalized guidance and direct communication with certified trainers.",
      bgAccent: "from-purple-500/15 to-pink-500/15 border-purple-500/30",
      iconBg: "bg-purple-500 text-white",
      glowColor: "group-hover:shadow-purple-500/20"
    },
    {
      icon: MdTimer,
      title: "Flexible Timings",
      description: "Access gym facilities and book slots 24/7 according to your schedule.",
      bgAccent: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30",
      iconBg: "bg-emerald-500 text-white",
      glowColor: "group-hover:shadow-emerald-500/20"
    },
    {
      icon: MdRestaurant,
      title: "Diet Planning",
      description: "Custom meal plans tailored to your fitness goals and body type.",
      bgAccent: "from-rose-500/10 to-orange-500/10 border-rose-500/30",
      iconBg: "bg-rose-500 text-white",
      glowColor: "group-hover:shadow-rose-500/20"
    },
    {
      icon: MdVerified,
      title: "Verified Results",
      description: "Join thousands of members who achieved their dream physique safely.",
      bgAccent: "from-indigo-500/10 to-violet-500/10 border-indigo-500/30",
      iconBg: "bg-indigo-500 text-white",
      glowColor: "group-hover:shadow-indigo-500/20"
    }
  ];

  // Duplicate cards array to make the infinite marquee seamless
  const extendedCards = [...cards, ...cards];

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Help and accompany your <span className="text-orange-500">fitness needs</span>
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            GymPilot provides everything you need to manage your fitness journey smoothly, efficiently, and with professional results.
          </p>
        </motion.div>

        {/* Image Container Wrapper */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[520px] sm:h-[500px] bg-slate-900">
          {/* Background Illustration Image */}
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop" 
            alt="Group Fitness Community" 
            className="w-full h-full object-cover brightness-[0.55]"
          />

          {/* Marquee Continuous Sliding Cards Container INSIDE the image */}
          <div className="absolute bottom-6 left-0 right-0 overflow-hidden px-4">
            <motion.div
              className="flex gap-6 w-max"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {extendedCards.map((card, index) => (
                <div
                  key={index}
                  className={`w-[300px] sm:w-[340px] flex-shrink-0 bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border bg-gradient-to-br ${card.bgAccent} transition-all duration-300 group hover:-translate-y-2 ${card.glowColor}`}
                >
                  <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;