/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // ═══════════ Image Hosting ═══════════
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "ibb.co" },
      { protocol: "https", hostname: "imgbb.com" },

      // ═══════════ Google / OAuth ═══════════
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "*.gstatic.com" },

      // ═══════════ GitHub ═══════════
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "*.githubusercontent.com" },

      // ═══════════ Cloudinary / CDN ═══════════
      { protocol: "https", hostname: "res.cloudinary.com" },

      // ═══════════ Placeholder / Stock ═══════════
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
    ],
  },

  async rewrites() {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    return [
      {
        source: "/api/classes/:path*",
        destination: `${backendUrl}/api/classes/:path*`,
      },
      {
        source: "/api/forum/:path*",
        destination: `${backendUrl}/api/forum/:path*`,
      },
      {
        source: "/api/users/:path*",
        destination: `${backendUrl}/api/users/:path*`,
      },
      {
        source: "/api/bookings/:path*",
        destination: `${backendUrl}/api/bookings/:path*`,
      },
      {
        source: "/api/favorites/:path*",
        destination: `${backendUrl}/api/favorites/:path*`,
      },
      {
        source: "/api/trainer-applications/:path*",
        destination: `${backendUrl}/api/trainer-applications/:path*`,
      },
      {
        source: "/api/payments/:path*",
        destination: `${backendUrl}/api/payments/:path*`,
      },
    ];
  },
};

export default nextConfig;