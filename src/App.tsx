import React from 'react'

export default function App() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">寶可夢屬性相剋查詢器（模板）</h1>
      <p className="text-sm text-zinc-600 mb-4">
        這是可直接部署到 GitHub Pages 的模板。<br/>
        將你在「畫布」上的 <code>App.tsx</code> 內容，覆蓋此檔案即可。
      </p>
      <ol className="list-decimal pl-5 space-y-1 text-sm">
        <li>把你的 <code>App.tsx</code> 複製貼上取代本檔。</li>
        <li>若有使用 <code>@/components/ui/*</code>，本專案已提供簡化版可直接使用。</li>
        <li><code>npm i</code> → <code>npm run dev</code> 本機預覽。</li>
        <li>Push 到 GitHub 後，GitHub Actions 會自動部署到 Pages。</li>
      </ol>
    </div>
  )
}
