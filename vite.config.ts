import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002, // Change this to your desired port
    host: "0.0.0.0", // This ensures the server is accessible over the network
  },
});
