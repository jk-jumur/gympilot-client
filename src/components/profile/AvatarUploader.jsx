"use client";

import { useRef, useState } from "react";
import { toast } from "@/lib/toast";

const API = "";

export default function AvatarUploader({
  currentImage,
  userName,
  onUploadSuccess,
}) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(currentImage || "");
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e) => {
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
    reader.onloadend = () => {
      setPreview(reader.result);
      uploadImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (base64Image) => {
    setUploading(true);
    try {
      const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
      if (!imgbbApiKey) {
        toast.error("Imgbb API key not configured");
        setPreview(currentImage || "");
        return;
      }

      const base64Data = base64Image.split(",")[1];

      const formData = new FormData();
      formData.append("key", imgbbApiKey);
      formData.append("image", base64Data);

      const imgbbRes = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const imgbbData = await imgbbRes.json();

      if (!imgbbData.success) {
        toast.error("Failed to upload image");
        setPreview(currentImage || "");
        return;
      }

      const uploadedUrl = imgbbData.data.url;

      const res = await fetch(`${API}/api/users/me/avatar`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ image: uploadedUrl }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to update profile image");
        setPreview(currentImage || "");
        return;
      }

      setPreview(uploadedUrl);
      toast.success("Profile image updated!", { icon: "✅" });
      onUploadSuccess?.(uploadedUrl);
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
      setPreview(currentImage || "");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative">
        {preview ? (
          <img
            src={preview}
            alt={userName || "Profile"}
            className="h-24 w-24 rounded-full object-cover ring-4 ring-[#FED7AA] dark:ring-[#2A2A2A] sm:h-28 sm:w-28"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#F97316] to-[#F59E0B] text-4xl font-bold text-white ring-4 ring-[#FED7AA] dark:ring-[#2A2A2A] sm:h-28 sm:w-28">
            {userName?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
      </div>

      <div className="flex-1 text-center sm:text-left">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#F59E0B] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#FF4D00]"
        >
          {uploading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Uploading...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Change Photo
            </>
          )}
        </button>

        <p className="mt-2 text-xs text-[#737373] dark:text-[#A0A0A0]">
          JPG, PNG or GIF · Max 5MB
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}