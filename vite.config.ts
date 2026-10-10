import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Tauri v2: the frontend talks to Rust via IPC (@tauri-apps/api),
// so no HTTP proxy to an Express server is needed (unlike the
// original Node `agent-sessions-box` which proxied /api).
export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  base: './',
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
});
