import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'pokedex',
  base: '/pokemon-PK/pokedex/',
  plugins: [react()],
  resolve: {
    // 如果新版用到 @ 且指向新版目錄，把 'src' 改成 'pokedex'
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  build: {
    outDir: '../dist/pokedex',
    emptyOutDir: false,
  },
})
