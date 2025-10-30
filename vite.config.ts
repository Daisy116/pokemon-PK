// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/pokemon-PK/',        // GitHub Pages 子路徑
  plugins: [react()],
  build: {
    outDir: 'docs',            // 輸出到 /docs 作為舊版站點
    emptyOutDir: false,        // 避免清掉 docs/new-version
  },
})
