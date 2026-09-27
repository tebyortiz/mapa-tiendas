import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // La API de geolocalización no envía CORS: se consulta a través del proxy.
    proxy: {
      '/api/geo': { target: 'https://geo-e-commerce.vercel.app', changeOrigin: true },
    },
  },
})
