"use client";

import { Link } from "@heroui/react";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Password validation according to requirement
  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(pass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters long and contain both uppercase and lowercase letters."
      );
      return;
    }

    // TODO: Call your Better Auth register function here
    console.log("Registering with:", { name, email, image, password });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FAFAF9] p-4 text-[#171717] transition-colors dark:bg-[#0F0F0F] dark:text-white sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white shadow-[0_20px_60px_rgba(23,23,23,0.08)] grid grid-cols-1 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] lg:grid-cols-2">
        
        {/* ================= LEFT SIDE ================= */}
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#EA580C] via-[#F97316] to-[#F59E0B] p-10 text-white dark:from-[#1A1A1A] dark:via-[#1F120B] dark:to-[#2A1500]">
          
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl dark:bg-[#FF4D00]/10" />
          <div className="pointer-events-none absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-black/10 blur-3xl dark:bg-[#FF4D00]/5" />

          {/* Logo */}
          <div className="relative z-10">
            <Link href="/" className="group flex items-center gap-3 no-underline">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-md transition-transform duration-300 group-hover:scale-105 dark:bg-[#FF4D00] dark:text-white dark:shadow-orange-900/40">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div className="flex items-center whitespace-nowrap text-2xl font-extrabold tracking-tight text-white">
                <span>Gym</span>
                <span className="text-amber-200 dark:text-[#FFB800]">Pilot</span>
              </div>
            </Link>
          </div>

          {/* Content */}
         {/* Content */}
       <div className="relative z-10 my-auto space-y-6 py-8">
    <h1 className="text-3xl font-extrabold leading-tight tracking-tight xl:text-4xl">
    Start Your <span className="text-amber-200 dark:text-[#FFB800]">Fitness Journey</span>
    </h1>
     <p className="text-sm leading-relaxed text-orange-50 dark:text-[#A0A0A0] xl:text-base">
    Join GymPilot today — book expert classes, track your progress, and become part of a powerful fitness community.
    </p>

  {/* Feature pills - Different from Login */}
     <div className="space-y-3 pt-2">
    {[
      { icon: "🚀", text: "Get Started in Minutes" },
      { icon: "🎯", text: "Personalized Training Path" },
      { icon: "🔥", text: "Stay Motivated Daily" },
    ].map((item, i) => (
      <div
        key={i}
        className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur-md dark:border-[#FF4D00]/20 dark:bg-[#FF4D00]/10"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/25 text-white dark:bg-[#FF4D00]/25">
          {item.icon}
        </span>
        <span>{item.text}</span>
      </div>
    ))}
  </div>
   </div>

          {/* Copyright */}
          <div className="relative z-10 text-xs text-orange-100 dark:text-[#666666]">
            &copy; {new Date().getFullYear()} GymPilot. All rights reserved.
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex flex-col justify-between bg-white p-8 dark:bg-[#1A1A1A] sm:p-10 lg:p-12">
          
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight text-[#171717] dark:text-white sm:text-3xl">
                Create Account
              </h2>

              {/* Mobile Logo */}
              <Link href="/" className="flex items-center gap-2 no-underline lg:hidden">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md dark:bg-[#FF4D00]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
              </Link>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A0A0A0]">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#F97316] no-underline hover:underline dark:text-[#FF4D00]">
                Sign in
              </Link>
            </p>
          </div>

          <div className="my-6 space-y-5">
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-[#FED7AA] bg-[#FAFAF9] py-3 px-4 text-sm text-[#171717] placeholder-[#A3A3A3] transition-all focus:border-[#F97316] focus:bg-white focus:outline-none dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-white dark:placeholder-[#666666] dark:focus:border-[#FF4D00] dark:focus:bg-[#151515]"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0]">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#FED7AA] bg-[#FAFAF9] py-3 px-4 text-sm text-[#171717] placeholder-[#A3A3A3] transition-all focus:border-[#F97316] focus:bg-white focus:outline-none dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-white dark:placeholder-[#666666] dark:focus:border-[#FF4D00] dark:focus:bg-[#151515]"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0]">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-[#FED7AA] bg-[#FAFAF9] py-3 px-4 text-sm text-[#171717] placeholder-[#A3A3A3] transition-all focus:border-[#F97316] focus:bg-white focus:outline-none dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-white dark:placeholder-[#666666] dark:focus:border-[#FF4D00] dark:focus:bg-[#151515]"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0]">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={isVisible ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#FED7AA] bg-[#FAFAF9] py-3 pl-4 pr-10 text-sm text-[#171717] placeholder-[#A3A3A3] transition-all focus:border-[#F97316] focus:bg-white focus:outline-none dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-white dark:placeholder-[#666666] dark:focus:border-[#FF4D00] dark:focus:bg-[#151515]"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute right-3.5 text-[#A3A3A3] hover:text-[#525252] focus:outline-none dark:text-[#666666] dark:hover:text-[#A0A0A0]"
                  >
                    {isVisible ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-[#737373] dark:text-[#666666]">
                  Min 6 characters, 1 uppercase & 1 lowercase letter
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#F59E0B] py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-200 hover:scale-[1.02] dark:bg-[#FF4D00] dark:from-[#FF4D00] dark:to-[#FF4D00] dark:shadow-orange-900/30 dark:hover:bg-[#FF6A1A]"
              >
                <span>Create Account</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E5E5] dark:border-[#2A2A2A]" />
              </div>
              <span className="relative bg-white px-4 text-xs font-bold uppercase tracking-wider text-[#A3A3A3] dark:bg-[#1A1A1A] dark:text-[#666666]">
                Or
              </span>
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#FED7AA] bg-white py-3 text-sm font-semibold text-[#404040] shadow-sm transition-all hover:border-[#FDBA74] hover:bg-[#FFF7ED] dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#E0E0E0] dark:hover:border-[#3A3A3A] dark:hover:bg-[#1F1F1F]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-[#A3A3A3] dark:text-[#666666] lg:text-left">
            By creating an account, you agree to GymPilot's Terms & Privacy.
          </div>
        </div>
      </div>
    </div>
  );
}