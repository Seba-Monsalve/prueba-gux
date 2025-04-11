import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  server: {
    proxy: {
      // "/api": { target: "http://backend:3000", secure: false },
      "/api": { target: "http://localhost:3000", secure: false },
    },
    host: "0.0.0.0",
    port: 5173, 
  },
  plugins: [
    tailwindcss(),
  ],
})