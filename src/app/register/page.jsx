"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/lib/toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(pass);
  };
const handleImageChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast.error("Please select a valid image file");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.error("Image must be smaller than 5MB");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64 = reader.result;
    setImagePreview(base64);
    setUploadingImage(true);

    try {
      // ⭐ Client-side Imgbb upload (uses NEXT_PUBLIC_IMGBB_KEY)
      const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

      if (!imgbbApiKey) {
        toast.error("Imgbb API key not configured");
        setImagePreview("");
        return;
      }

      const base64Data = base64.split(",")[1];

      const formData = new FormData();
      formData.append("key", imgbbApiKey);
      formData.append("image", base64Data);

      const res = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error("Imgbb error:", data);
        toast.error(data?.error?.message || "Failed to upload image");
        setImagePreview("");
        return;
      }

      setImage(data.data.url);
      toast.success("Image uploaded!", { icon: "✅" });
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
      setImagePreview("");
    } finally {
      setUploadingImage(false);
    }
  };

  reader.readAsDataURL(file);
};

  const handleRemoveImage = () => {
    setImage("");
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (uploadingImage) {
      toast.error("Please wait for the image to finish uploading");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters with uppercase & lowercase");
      setError("Password must be at least 6 characters long and contain both uppercase and lowercase letters.");
      return;
    }

    setLoading(true);
    try {
      await authClient.signUp.email(
        { email, password, name, image: image || undefined },
        {
          onSuccess: () => {
            toast.success(`Account created! Welcome, ${name}!`, { duration: 3000, icon: "🎉" });
            setTimeout(() => {
              router.push("/");
              router.refresh();
            }, 800);
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            toast.error(ctx.error.message || "Registration failed");
            setLoading(false);
          },
        }
      );
    } catch (err) {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      toast.loading("Redirecting to Google...", { duration: 2000 });
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch (err) {
      toast.error("Google signup failed");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FAFAF9] p-3 text-[#171717] transition-colors dark:bg-[#0F0F0F] dark:text-white sm:p-6 lg:p-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-[0_20px_60px_rgba(23,23,23,0.08)] dark:border-[#2A2A2A] dark:bg-[#1A1A1A] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:max-w-5xl sm:rounded-3xl lg:grid lg:grid-cols-2">
        
        {/* ═══════════ LEFT SIDE (Desktop only) ═══════════ */}
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#EA580C] via-[#F97316] to-[#F59E0B] p-10 text-white dark:from-[#1A1A1A] dark:via-[#1F120B] dark:to-[#2A1500]">
          <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl dark:bg-[#FF4D00]/10" />
          <div className="pointer-events-none absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-black/10 blur-3xl dark:bg-[#FF4D00]/5" />

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

          <div className="relative z-10 my-auto space-y-6 py-8">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight xl:text-4xl">
              Start Your <span className="text-amber-200 dark:text-[#FFB800]">Fitness Journey</span>
            </h1>
            <p className="text-sm leading-relaxed text-orange-50 dark:text-[#A0A0A0] xl:text-base">
              Join GymPilot today — book expert classes, track your progress, and become part of a powerful fitness community.
            </p>

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

          <div className="relative z-10 text-xs text-orange-100 dark:text-[#666666]">
            &copy; {new Date().getFullYear()} GymPilot. All rights reserved.
          </div>
        </div>

        {/* ═══════════ RIGHT SIDE (Form) ═══════════ */}
        <div className="flex flex-col justify-between bg-white p-5 dark:bg-[#1A1A1A] sm:p-8 lg:p-12">
          
          {/* Header */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold tracking-tight text-[#171717] dark:text-white sm:text-2xl lg:text-3xl">
                Create Account
              </h2>

              <Link href="/" className="flex items-center gap-2 no-underline lg:hidden">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md dark:bg-[#FF4D00]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
              </Link>
            </div>

            <p className="text-xs text-[#737373] dark:text-[#A0A0A0] sm:text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#F97316] no-underline hover:underline dark:text-[#FF4D00]">
                Sign in
              </Link>
            </p>
          </div>

          <div className="my-4 space-y-4 sm:my-6 sm:space-y-5">
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0] sm:text-xs">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-[#FED7AA] bg-[#FAFAF9] px-3.5 py-2.5 text-sm text-[#171717] placeholder-[#A3A3A3] transition-all focus:border-[#F97316] focus:bg-white focus:outline-none dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-white dark:placeholder-[#666666] dark:focus:border-[#FF4D00] dark:focus:bg-[#151515] sm:px-4 sm:py-3"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0] sm:text-xs">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#FED7AA] bg-[#FAFAF9] px-3.5 py-2.5 text-sm text-[#171717] placeholder-[#A3A3A3] transition-all focus:border-[#F97316] focus:bg-white focus:outline-none dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-white dark:placeholder-[#666666] dark:focus:border-[#FF4D00] dark:focus:bg-[#151515] sm:px-4 sm:py-3"
                />
              </div>

              {/* Profile Image Upload */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0] sm:text-xs">
                  Profile Image <span className="font-normal normal-case text-[#A3A3A3] dark:text-[#666666]">(Optional)</span>
                </label>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  
                  {/* Preview — only when image exists */}
                  {(image || imagePreview) && (
                    <div className="relative h-12 w-12 shrink-0">
                      {image ? (
                        <>
                          <img
                            src={image}
                            alt="Profile preview"
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-[#F97316]/30 dark:ring-[#FF4D00]/30"
                          />
                          {!uploadingImage && (
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-transform hover:scale-110"
                              aria-label="Remove image"
                            >
                              <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          <img
                            src={imagePreview}
                            alt="Uploading preview"
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-[#F97316]/30 dark:ring-[#FF4D00]/30"
                          />
                          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Upload Button */}
                  <label
                    htmlFor="profile-image-upload"
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-dashed border-[#FED7AA] bg-[#FAFAF9] px-3.5 py-2.5 text-xs font-bold text-[#F97316] transition-all hover:border-[#F97316] hover:bg-[#FFF7ED] dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#FF4D00] dark:hover:border-[#FF4D00] sm:px-4 ${
                      uploadingImage ? "pointer-events-none opacity-60" : ""
                    }`}
                  >
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {uploadingImage ? "Uploading..." : image ? "Change" : "Choose Photo"}
                  </label>

                  {/* Uploaded indicator */}
                  {image && !uploadingImage && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Uploaded
                    </span>
                  )}

                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </div>

                <p className="text-[10px] text-[#737373] dark:text-[#666666] sm:text-[11px]">
                  JPG, PNG or GIF · Max 5MB
                </p>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0] sm:text-xs">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={isVisible ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#FED7AA] bg-[#FAFAF9] px-3.5 py-2.5 pr-10 text-sm text-[#171717] placeholder-[#A3A3A3] transition-all focus:border-[#F97316] focus:bg-white focus:outline-none dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-white dark:placeholder-[#666666] dark:focus:border-[#FF4D00] dark:focus:bg-[#151515] sm:px-4 sm:py-3"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute right-3 text-[#A3A3A3] hover:text-[#525252] focus:outline-none dark:text-[#666666] dark:hover:text-[#A0A0A0] sm:right-3.5"
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
                <p className="text-[10px] text-[#737373] dark:text-[#666666] sm:text-xs">
                  Min 6 characters, 1 uppercase & 1 lowercase letter
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 sm:px-4 sm:py-3 sm:text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#F59E0B] py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 dark:bg-[#FF4D00] dark:from-[#FF4D00] dark:to-[#FF4D00] dark:shadow-orange-900/30 dark:hover:bg-[#FF6A1A] sm:py-3"
              >
                <span>{loading ? "Creating account..." : "Create Account"}</span>
                {!loading && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E5E5] dark:border-[#2A2A2A]" />
              </div>
              <span className="relative bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] dark:bg-[#1A1A1A] dark:text-[#666666] sm:px-4 sm:text-xs">
                Or
              </span>
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#FED7AA] bg-white py-2.5 text-xs font-semibold text-[#404040] shadow-sm transition-all hover:border-[#FDBA74] hover:bg-[#FFF7ED] dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#E0E0E0] dark:hover:border-[#3A3A3A] dark:hover:bg-[#1F1F1F] sm:gap-3 sm:py-3 sm:text-sm"
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

          <div className="text-center text-[10px] text-[#A3A3A3] dark:text-[#666666] sm:text-xs lg:text-left">
            By creating an account, you agree to GymPilot's Terms & Privacy.
          </div>
        </div>
      </div>
    </div>
  );
}