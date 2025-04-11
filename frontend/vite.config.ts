import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  server: {
    proxy: {

      // "/api": { target: "http://localhost:3000", secure: false },
      // Para hacer las pruebas con el backend en docker, descomentar la siguiente linea y comentar la anterior
      "/api": { target: "http://backend:3000", secure: false },
    },
    host: "0.0.0.0",
    port: 5173, 
  },
  plugins: [
    tailwindcss(),
  ],
})