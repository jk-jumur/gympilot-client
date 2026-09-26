
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <div className="relative bg-[#FAF7F2] dark:bg-zinc-950 text-gray-900 dark:text-white py-16 sm:py-20 lg:py-32 overflow-hidden transition-colors duration-300">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-10 -right-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent rounded-full filter blur-[100px] sm:blur-[140px]"></div>
        <div className="absolute -bottom-20 -left-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-orange-600/10 rounded-full filter blur-[90px] sm:blur-[130px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content (6 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2.5 bg-white/80 dark:bg-zinc-900 border border-orange-200/60 dark:border-zinc-800 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400 shadow-sm mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Fitness & Gym Management Platform
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] sm:leading-[1.1]">
              Transform Your <span className="text-orange-500">Fitness Journey</span> With GymPilot
            </h1>
            
            <p className="text-gray-600 dark:text-zinc-400 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover professional fitness classes, book expert trainers, track your progress, and join our vibrant community to achieve your ultimate fitness potential.
            </p>
            
            {/* Dual Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/all-classes"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 text-base font-bold rounded-2xl text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <span>Explore Classes</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
              <Link
                href="/register"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 text-base font-bold rounded-2xl text-gray-900 dark:text-white bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <span>Join Free</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-orange-200/50 dark:border-zinc-800 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">50+</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">Trainers</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">100+</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">Pro Classes</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">24/7</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">Access</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative mt-6 lg:mt-0"
          >
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
              
              {/* 1. Left Image */}
              <div className="w-1/3 lg:transform lg:-translate-y-12">
                <div className="relative w-full h-48 sm:h-64 lg:h-72 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-orange-200/60 dark:border-zinc-800 bg-white dark:bg-zinc-900 group">
                  <Image 
                    src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600&auto=format&fit=crop" 
                    alt="Woman Fitness Workout" 
                    fill
                    sizes="(max-width: 768px) 33vw, 200px"
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

          
              <div className="w-1/3 z-10">
                <div className="relative w-full h-56 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-orange-500/50 bg-white dark:bg-zinc-900 group">
                  <Image 
                    src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop" 
                    alt="Man Gym Training Session" 
                    fill
                    priority
                    sizes="(max-width: 768px) 33vw, 250px"
                    className="object-cover opacity-95 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md whitespace-nowrap z-20">
                    Featured
                  </div>
                </div>
              </div>

              {/* 3. Right Image */}
              <div className="w-1/3 lg:transform lg:translate-y-12">
                <div className="relative w-full h-48 sm:h-64 lg:h-72 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-orange-200/60 dark:border-zinc-800 bg-white dark:bg-zinc-900 group">
                  <Image 
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop" 
                    alt="Fitness Woman Training" 
                    fill
                    sizes="(max-width: 768px) 33vw, 200px"
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Banner;








