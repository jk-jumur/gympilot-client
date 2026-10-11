

"use client";

import toastLib from "react-hot-toast";

export const toast = {
  success: (msg, opts) => toastLib.success(msg, opts),
  error: (msg, opts) => toastLib.error(msg, opts),
  info: (msg, opts) => toastLib(msg, opts),
  loading: (msg, opts) => toastLib.loading(msg, opts),
};
