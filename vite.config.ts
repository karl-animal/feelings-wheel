import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The repo is published at https://<user>.github.io/feelings-wheel/, so the
// production base path must match the repo name. Dev/preview stay at root.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/feelings-wheel/" : "/",
  plugins: [react(), tailwindcss()],
}));
