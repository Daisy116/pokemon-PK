import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pokemon-PK/',
  server: { port: 5173, host: true },
  resolve: { alias: { '@': '/src' } },
})
