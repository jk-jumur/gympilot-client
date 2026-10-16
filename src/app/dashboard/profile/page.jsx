"use client";

import { useEffect, useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "@/lib/toast";
import AvatarUploader from "@/components/profile/AvatarUploader";

const API = "";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }

    setSavingProfile(true);
    try {
      const res = await fetch(`${API}/api/users/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to update profile");
        return;
      }

      toast.success("Profile updated!", { icon: "✅" });
      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(newPassword)) {
      toast.error("Password needs 1 uppercase & 1 lowercase letter");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSavingPassword(true);
    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully", { icon: "🔒" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold text-[#171717] dark:text-white sm:text-3xl">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-[#737373] dark:text-[#A0A0A0]">
          Manage your account information and security
        </p>
      </div>

      {/* Avatar */}
      <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#737373] dark:text-[#A0A0A0]">
          Profile Photo
        </h2>
        <AvatarUploader
          currentImage={image}
          userName={name}
          onUploadSuccess={(url) => setImage(url)}
        />
      </div>

      {/* Basic Info */}
      <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#737373] dark:text-[#A0A0A0]">
          Basic Information
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0]">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#FED7AA] bg-[#FAFAF9] px-4 py-3 text-sm text-[#171717] transition-all focus:border-[#F97316] focus:bg-white focus:outline-none dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-white dark:focus:border-[#FF4D00]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0]">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-[#E7E5E4] bg-[#F5F5F4] px-4 py-3 text-sm text-[#737373] dark:border-[#2A2A2A] dark:bg-[#0F0F0F] dark:text-[#666666]"
            />
            <p className="text-xs text-[#737373] dark:text-[#666666]">
              Email cannot be changed
            </p>
          </div>

          <button
            type="submit"
            disabled={savingProfile}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#F59E0B] px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all hover:scale-[1.02] disabled:opacity-60 dark:bg-[#FF4D00]"
          >
            {savingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#737373] dark:text-[#A0A0A0]">
          Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          {[
            { label: "Current Password", value: currentPassword, setter: setCurrentPassword },
            { label: "New Password", value: newPassword, setter: setNewPassword },
            { label: "Confirm New Password", value: confirmPassword, setter: setConfirmPassword },
          ].map((field) => (
            <div key={field.label} className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#404040] dark:text-[#A0A0A0]">
                {field.label}
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full rounded-xl border border-[#FED7AA] bg-[#FAFAF9] px-4 py-3 text-sm text-[#171717] transition-all focus:border-[#F97316] focus:bg-white focus:outline-none dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-white dark:focus:border-[#FF4D00]"
              />
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={savingPassword}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#F59E0B] px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all hover:scale-[1.02] disabled:opacity-60 dark:bg-[#FF4D00]"
            >
              {savingPassword ? "Updating..." : "Update Password"}
            </button>

            <label className="flex cursor-pointer items-center gap-2 text-xs text-[#737373] dark:text-[#A0A0A0]">
              <input
                type="checkbox"
                checked={showPasswords}
                onChange={(e) => setShowPasswords(e.target.checked)}
                className="h-4 w-4 rounded border-[#FED7AA] text-[#F97316] focus:ring-[#F97316]"
              />
              Show passwords
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}