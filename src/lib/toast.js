"use client";

const TOAST_DURATION = 3500;

const STYLES = {
  success: {
    bg: "bg-emerald-500",
    text: "text-white",
    icon: "✓",
  },
  error: {
    bg: "bg-rose-500",
    text: "text-white",
    icon: "✕",
  },
  info: {
    bg: "bg-stone-900 dark:bg-stone-100",
    text: "text-white dark:text-stone-900",
    icon: "ℹ",
  },
};

function getContainer() {
  if (typeof document === "undefined") return null;

  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className =
      "fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 pointer-events-none";
    document.body.appendChild(container);
  }
  return container;
}

function show(message, type = "info") {
  const container = getContainer();
  if (!container) return;

  const style = STYLES[type] || STYLES.info;

  const el = document.createElement("div");
  el.className = `
    pointer-events-auto flex items-center gap-3
    px-4 py-3 rounded-xl shadow-2xl
    font-semibold text-sm max-w-md min-w-[280px]
    ${style.bg} ${style.text}
    transform translate-x-[120%] opacity-0
    transition-all duration-300 ease-out
  `;

  el.innerHTML = `
    <span class="shrink-0 h-6 w-6 rounded-full bg-white/25 flex items-center justify-center text-xs font-bold">
      ${style.icon}
    </span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(el);

  requestAnimationFrame(() => {
    el.style.transform = "translateX(0)";
    el.style.opacity = "1";
  });

  setTimeout(() => {
    el.style.transform = "translateX(120%)";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 300);
  }, TOAST_DURATION);
}

export const toast = {
  success: (msg) => show(msg, "success"),
  error: (msg) => show(msg, "error"),
  info: (msg) => show(msg, "info"),
};