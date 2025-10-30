// vite.config.pokedex.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'pokedex',                          // ★ 新資料夾名稱
  base: '/pokemon-PK/pokedex/',             // ★ GitHub Pages 路徑
  plugins: [react()],
  build: {
    outDir: '../docs/pokedex',              // ★ 打包輸出位置
    emptyOutDir: false,                     // ★ 不要清掉其他版本
  },
})
