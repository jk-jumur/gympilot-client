// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import {
//   HiOutlineMagnifyingGlass,
//   HiOutlineCreditCard,
//   HiOutlineLockClosed,
//   HiOutlineChatBubbleLeftRight,
//   HiOutlineChartBarSquare,
//   HiOutlinePhoto,
//   HiOutlineSparkles,
// } from "react-icons/hi2";

// const FEATURES = [
//   {
//     icon: HiOutlineMagnifyingGlass,
//     title: "Smart Class Search",
//     description:
//       "Find classes instantly with case-insensitive search, category filters, and server-side pagination.",
//     image:
//       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
//     alt: "Analytics dashboard showing search results",
//     accent: "from-blue-500 to-cyan-500",
//   },
//   {
//     icon: HiOutlineCreditCard,
//     title: "Secure Stripe Payments",
//     description:
//       "Complete bookings with Stripe Checkout, encrypted transactions, and automatic booking creation.",
//     image:
//       "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&auto=format&fit=crop",
//     alt: "Secure online payment",
//     accent: "from-emerald-500 to-teal-500",
//   },
//   {
//     icon: HiOutlineLockClosed,
//     title: "Role-Based Access Control",
//     description:
//       "Three-tier security with session auth, protected routes, and role-specific middleware.",
//     image:
//       "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&auto=format&fit=crop",
//     alt: "Code and security system",
//     accent: "from-orange-500 to-amber-500",
//   },
//   {
//     icon: HiOutlineChatBubbleLeftRight,
//     title: "Community Forum",
//     description:
//       "Real engagement with posts, likes, comments, replies, and editing — all with permissions.",
//     image:
//       "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop",
//     alt: "Team collaboration and discussion",
//     accent: "from-purple-500 to-indigo-500",
//   },
//   {
//     icon: HiOutlineChartBarSquare,
//     title: "Role-Specific Dashboards",
//     description:
//       "Every user gets a tailored dashboard with real-time stats, charts, and clean data tables.",
//     image:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
//     alt: "Analytics charts and dashboards",
//     accent: "from-rose-500 to-pink-500",
//   },
//   {
//     icon: HiOutlinePhoto,
//     title: "Imgbb Image Uploads",
//     description:
//       "Upload class and forum images directly to Imgbb CDN with live preview — no local storage.",
//     image:
//       "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800&q=80&auto=format&fit=crop",
//     alt: "Cloud upload interface",
//     accent: "from-indigo-500 to-blue-500",
//   },
// ];

// const container = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1, delayChildren: 0.1 },
//   },
// };

// const item = {
//   hidden: { opacity: 0, y: 30 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// export default function PlatformFeatures() {
//   return (
//     <section className="relative py-16 sm:py-20 lg:py-28 bg-white dark:bg-zinc-950 transition-colors overflow-hidden">
//       {/* Ambient glow */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-orange-500/[0.03] rounded-full filter blur-[120px] sm:blur-[150px]" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
//         {/* ═══ Header ═══ */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-80px" }}
//           transition={{ duration: 0.8 }}
//           className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20"
//         >
//           <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4 sm:mb-6">
//             <HiOutlineSparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-orange-500" />
//             <span className="text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.25em] text-orange-600 dark:text-orange-400">
//               Platform Features
//             </span>
//           </div>

//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-gray-950 dark:text-white leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-5">
//             Everything you need.
//             <br />
//             <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
//               Already built in.
//             </span>
//           </h2>

//           <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
//             Six production-grade features powered by modern tech — from smart
//             search to secure payments.
//           </p>
//         </motion.div>

//         {/* ═══ 6 Feature Cards with Images ═══ */}
//         <motion.div
//           variants={container}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, margin: "-80px" }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
//         >
//           {FEATURES.map((feature) => {
//             const Icon = feature.icon;
//             return (
//               <motion.div
//                 key={feature.title}
//                 variants={item}
//                 whileHover={{ y: -6 }}
//                 className="group relative rounded-2xl sm:rounded-3xl overflow-hidden 
//                   bg-white dark:bg-zinc-900 
//                   border border-gray-200/70 dark:border-zinc-800/70 
//                   shadow-sm hover:shadow-xl 
//                   transition-all duration-500 flex flex-col"
//               >
//                 {/* ── Image Section ── */}
//                 <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-zinc-800">
//                   <Image
//                     src={feature.image}
//                     alt={feature.alt}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     className="object-cover transition-transform duration-700 group-hover:scale-105"
//                   />

//                   {/* Gradient overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

//                   {/* Icon badge — floating bottom-left */}
//                   <div
//                     className={`absolute bottom-4 left-4 inline-flex items-center justify-center h-11 w-11 sm:h-12 sm:w-12 
//                       rounded-xl bg-gradient-to-br ${feature.accent} 
//                       shadow-lg border-2 border-white/20 backdrop-blur-sm 
//                       transition-transform duration-500 group-hover:scale-110`}
//                   >
//                     <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
//                   </div>
//                 </div>

//                 {/* ── Text Section ── */}
//                 <div className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col">
//                   <h3 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white tracking-tight leading-tight mb-2 sm:mb-3">
//                     {feature.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }