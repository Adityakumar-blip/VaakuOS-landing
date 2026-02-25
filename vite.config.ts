import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/lib/m.js": {
        target: "https://cdn.mxpnl.com",
        changeOrigin: true,
        rewrite: () => "/libs/mixpanel-2-latest.min.js",
      },
      "/lib/ga": {
        target: "https://www.googletagmanager.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lib\/ga/, "/gtag/js"),
      },
      "/c/collect": {
        target: "https://www.clarity.ms",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/c\/collect/, "/collect"),
      },
      "/c": {
        target: "https://www.clarity.ms",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/c/, ""),
      },
      "/mx": {
        target: "https://api.mixpanel.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mx/, ""),
      },
      "/gx": {
        target: "https://www.google-analytics.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gx/, ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
