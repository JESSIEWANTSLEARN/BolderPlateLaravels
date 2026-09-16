import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Send every /api request from React to Laravel.
  // This keeps the frontend and backend as two separate processes
  // while avoiding CORS problems during the lab exam.
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
});