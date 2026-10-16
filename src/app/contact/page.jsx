"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "@/lib/toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors below");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || data.error || "Failed to send message");
        setLoading(false);
        return;
      }

      toast.success("Message sent! We'll reply within 24 hours.", {
        duration: 4000,
        icon: "✅",
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border py-3 px-4 text-sm transition-all focus:outline-none ${
      errors[field]
        ? "border-red-400 bg-red-50/50 focus:border-red-500 dark:border-red-800 dark:bg-red-900/10"
        : "border-[#FED7AA] bg-[#FAFAF9] text-[#171717] placeholder-[#A3A3A3] focus:border-[#F97316] focus:bg-white dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-white dark:placeholder-[#666666] dark:focus:border-[#FF4D00] dark:focus:bg-[#151515]"
    }`;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FAFAF9] p-4 text-[#171717] transition-colors dark:bg-[#0F0F0F] dark:text-white sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white shadow-[0_20px_60px_rgba(23,23,23,0.08)] grid grid-cols-1 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] lg:grid-cols-2">
        
        {/* ═══════════ LEFT SIDE ═══════════ */}
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#EA580C] via-[#F97316] to-[#F59E0B] p-10 text-white dark:from-[#1A1A1A] dark:via-[#1F120B] dark:to-[#2A1500]">
          
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
          <div className="relative z-10 my-auto space-y-6 py-8">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight xl:text-4xl">
              Let's talk.{" "}
              <span className="text-amber-200 dark:text-[#FFB800]">
                We're listening.
              </span>
            </h1>
            <p className="text-sm leading-relaxed text-orange-50 dark:text-[#A0A0A0] xl:text-base">
              Have a question, feedback, or partnership idea? Our team is here
              to help you get the most out of GymPilot.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              {[
                { icon: "✉️", label: "Email", value: "support@gympilot.com" },
                { icon: "📞", label: "Phone", value: "+880 1234 567 890" },
                { icon: "📍", label: "Address", value: "123 Fitness Ave, Dhaka 1212" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur-md dark:border-[#FF4D00]/20 dark:bg-[#FF4D00]/10"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/25 text-base dark:bg-[#FF4D00]/25">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-orange-100 dark:text-[#A0A0A0]">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-white truncate">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response time */}
            <div className="flex items-center gap-2 pt-2 text-xs text-orange-100 dark:text-[#A0A0A0]">
              <span className="flex h-2 w-2 rounded-full bg-emerald-300 dark:bg-emerald-500" />
              Typically replies within 24 hours
            </div>
          </div>

          <div className="relative z-10 text-xs text-orange-100 dark:text-[#666666]">
            &copy; {new Date().getFullYear()} GymPilot. All rights reserved.
          </div>
        </div>

        {/* ═══════════ RIGHT SIDE (FORM) ═══════════ */}
        <div className="flex flex-col justify-between bg-white p-8 dark:bg-[#1A1A1A] sm:p-10 lg:p-12">
          
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight text-[#171717] dark:text-white sm:text-3xl">
                Get in touch
              </h2>

              <Link href="/" className="flex items-center gap-2 no-underline lg:hidden">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md dark:bg-[#FF4D00]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
              </Link>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A0A0A0]">
              Fill out the form and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Form / Success */}
          <div className="my-6 space-y-5">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl dark:bg-emerald-900/20">
                  ✅
                </div>
                <h3 className="mb-2 text-xl font-extrabold text-[#171717] dark:text-white">
                  Message sent!
                </h3>
                <p className="text-sm text-[#737373] dark:text-[#A0A0A0]">
                  Thanks for reaching out. We'll reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputClass("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0]">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className={inputClass("subject")}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-500">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    className={`${inputClass("message")} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#F59E0B] py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#FF4D00] dark:from-[#FF4D00] dark:to-[#FF4D00] dark:shadow-orange-900/30 dark:hover:bg-[#FF6A1A]"
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  {!loading && (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer note */}
          <div className="text-center text-xs text-[#A3A3A3] dark:text-[#666666] lg:text-left">
            By submitting, you agree to GymPilot's{" "}
            <Link href="/terms" className="underline hover:text-[#F97316] dark:hover:text-[#FF4D00]">
              Terms
            </Link>{" "}
            &{" "}
            <Link href="/privacy-policy" className="underline hover:text-[#F97316] dark:hover:text-[#FF4D00]">
              Privacy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}