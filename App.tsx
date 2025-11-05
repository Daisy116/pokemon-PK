import React, { useEffect, useMemo, useState } from "react";

/**
 * Pokémon 野生特區小程序
 * - 單檔 React 元件，可在 Canvas 預覽
 * - 無外部相依（只用 Tailwind）
 * - 本地儲存 localStorage：已捕捉清單、隊伍清單
 *
 * 📦 你可以直接在下方 DATA 區塊把各 WILD ZONE 的寶可夢清單、固定頭目與進化條件補齊。
 *   目前僅放了部分示例資料（Zone 1、2、3…），其餘可以按格式繼續擴充。
 *
 * ✅ 功能
 * 1) 「野生特區」分區列表（1~20）：
 *    - 勾選我已捕捉的物種（支援搜尋 / 篩選 / 展開摺疊）
 *    - 將物種加入隊伍（上限 6 隻，可拖移排序 / 一鍵清空）
 *    - 標記是否為頭目級（Alpha）
 * 2) 「固定頭目」分頁：固定刷新或地標式頭目（清單可編輯）
 * 3) 「進化條件」分頁：列出特殊進化條件（可快速搜尋）
 *
 * 🧩 設計重點
 * - 不使用 shadcn Tabs，避免你先前遇到的 data-active 混亂；改用極簡自製 Tabs。
 * - 手機優先排版，卡片式 UI、可縮起分區。
 *
 * ✍️ 資料補齊說明
 * - 來源建議
 *   Wild Zone 與固定頭目：
 *   https://pokemonhubs.com/legends-z-a/wild-zone-pokemon-overview/
 *   https://kkplay3c.net/pm-za-wild-area-guide/
 *   進化條件：
 *   https://pokemonhubs.com/legends-z-a/special-evolutions-list/
 * - 建議由你逐步補足 DATA 區塊的清單，不須改邏輯。
 */

// ------------------------------
// 圖片工具 & 屬性色彩（供列表與隊伍使用）
// ------------------------------
const spriteUrlByDex = (dex: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dex}.png`;
const TYPE_COLOR: Record<string, string> = {
  一般: "bg-zinc-200 text-zinc-800",
  火: "bg-red-200 text-red-800",
  水: "bg-blue-200 text-blue-800",
  草: "bg-green-200 text-green-800",
  電: "bg-yellow-200 text-yellow-800",
  冰: "bg-cyan-200 text-cyan-800",
  格鬥: "bg-orange-200 text-orange-800",
  毒: "bg-fuchsia-200 text-fuchsia-800",
  地面: "bg-amber-200 text-amber-900",
  飛行: "bg-indigo-200 text-indigo-800",
  超能力: "bg-pink-200 text-pink-800",
  蟲: "bg-lime-200 text-lime-800",
  岩石: "bg-stone-300 text-stone-800",
  幽靈: "bg-purple-200 text-purple-800",
  龍: "bg-sky-300 text-sky-900",
  惡: "bg-slate-300 text-slate-900",
  鋼: "bg-gray-300 text-gray-900",
  妖精: "bg-rose-200 text-rose-800",
};

// ------------------------------
// DATA — 先放示例，格式已就緒，之後可直接擴充
// ------------------------------

// 物種唯一鍵建議用英文代號（不含空白），displayName 顯示中文/日文皆可
export type MonId = string;

type ZoneMon = {
  id: MonId;
  displayName: string; // 顯示名稱（中文）
  enName?: string;     // 英文名（次要顯示）
  types?: string[];    // 屬性（中文）
  image?: string;      // 小圖 URL（預設可用官方絕版圖）
  alpha?: boolean;     // 是否為頭目級（可手動切換）
};

type WildZone = {
  zoneNo: number;
  mons: ZoneMon[];
};

// ⛏️ 範例（請依你的截圖 / 資料來源補齊）
const WILD_ZONES: WildZone[] = [
  {
    zoneNo: 1,
    mons: [
      { id: "pikachu", displayName: "皮卡丘", enName: "Pikachu", types: ["電"], image: spriteUrlByDex(25) },
      { id: "eevee", displayName: "伊布", enName: "Eevee", types: ["一般"], image: spriteUrlByDex(133) },
      { id: "fletchling", displayName: "小箭雀", enName: "Fletchling", types: ["一般","飛行"], image: spriteUrlByDex(661) },
      { id: "bidoof", displayName: "大牙狸", enName: "Bidoof", types: ["一般"], image: spriteUrlByDex(399) },
    ],
  },
  {
    zoneNo: 2,
    mons: [
      { id: "staryu", displayName: "海星星", enName: "Staryu", types: ["水"], image: spriteUrlByDex(120), alpha: true },
      { id: "magikarp", displayName: "鯉魚王", enName: "Magikarp", types: ["水"], image: spriteUrlByDex(129) },
      { id: "weedle", displayName: "獨角蟲", enName: "Weedle", types: ["蟲","毒"], image: spriteUrlByDex(13) },
    ],
  },
  {
    zoneNo: 3,
    mons: [
      { id: "piplup", displayName: "波加曼", enName: "Piplup", types: ["水"], image: spriteUrlByDex(393) },
      { id: "riolu", displayName: "利歐路", enName: "Riolu", types: ["格鬥"], image: spriteUrlByDex(447) },
      { id: "mareep", displayName: "咩利羊", enName: "Mareep", types: ["電"], image: spriteUrlByDex(179) },
    ],
  },
  // TODO: 4~20 區：請依同格式補齊清單（已支援雙語/屬性/小圖/頭目）。
];

// 固定頭目（可當成世界 BOSS 或固定刷新頭目）
// 之後你可把資料補上座標 / 天氣 / 時段等條件
const FIXED_ALPHAS: ZoneMon[] = [
  { id: "alpha-starmie", displayName: "寶石海星", enName: "Starmie", types: ["水","超能力"], image: spriteUrlByDex(121) },
  { id: "alpha-snorlax", displayName: "卡比獸", enName: "Snorlax", types: ["一般"], image: spriteUrlByDex(143) },
  // TODO: 其餘固定頭目待補
];

// 特殊進化條件（示例）
// tip: 可把條件拆欄位（道具 / 等級 / 招式 / 地點 / 特殊），這裡先用簡化字串
const EVOLUTIONS: { from: string; to: string; condition: string }[] = [
  { from: "伊布", to: "水伊布", condition: "使用水之石" },
  { from: "伊布", to: "雷伊布", condition: "使用雷之石" },
  { from: "伊布", to: "月伊布", condition: "高好感＋夜晚升級" },
  { from: "伊布", to: "太陽伊布", condition: "高好感＋白天升級" },
  { from: "利歐路", to: "路卡利歐", condition: "高好感＋白天升級" },
  // ...請依官方/攻略補齊 ZA 版本特殊條件
];

// ------------------------------
// 儲存 / 邏輯
// ------------------------------

type TeamState = { order: MonId[] };
const LS_KEYS = { team: "za_team", alpha: "za_alpha_map" };
type AlphaMap = Record<MonId, boolean>;

function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(state)); } catch {} }, [key, state]);
  return [state, setState] as const;
}

// ------------------------------
// UI 小元件
// ------------------------------

const TabBtn: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-medium transition border ${active ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50"}`}
  >{children}</button>
);

const Tag: React.FC<{ children: React.ReactNode; typeName?: string }> = ({ children, typeName }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] ${typeName ? TYPE_COLOR[typeName] : "border border-zinc-200 text-zinc-600"}`}>{children}</span>
);

const MoveButtons: React.FC<{ onUp: () => void; onDown: () => void; disabledUp?: boolean; disabledDown?: boolean }> = ({ onUp, onDown, disabledUp, disabledDown }) => (
  <div className="flex gap-1">
    <button onClick={onUp} disabled={disabledUp} className="px-2 py-1 rounded-lg border border-zinc-200 disabled:opacity-40">↑</button>
    <button onClick={onDown} disabled={disabledDown} className="px-2 py-1 rounded-lg border border-zinc-200 disabled:opacity-40">↓</button>
  </div>
);

// ------------------------------
// 主元件
// ------------------------------

export default function App() {
  const [activeTab, setActiveTab] = useState<"zones" | "alphas" | "evo">("zones");
  const [team, setTeam] = useLocalStorage<TeamState>(LS_KEYS.team, { order: [] });
  const [alphaMap, setAlphaMap] = useLocalStorage<AlphaMap>(LS_KEYS.alpha, {});
  const [q, setQ] = useState("");
  const [onlyAlpha, setOnlyAlpha] = useState(false);
  const [caughtFilter, setCaughtFilter] = useState<"all" | "caught" | "uncaught">("all");

  const flatMons = useMemo(() => {
    const list: ZoneMon[] = [];
    WILD_ZONES.forEach((z) => z.mons.forEach((m) => list.push(m)));
    return list;
  }, []);

  const inTeam = (id: MonId) => team.order.includes(id);
  const toggleAlpha = (id: MonId) => setAlphaMap((m) => ({ ...m, [id]: !m[id] }));

  const addToTeam = (id: MonId) => setTeam((t) => (t.order.includes(id) ? t : { order: [...t.order, id] }));
  const removeFromTeam = (id: MonId) => setTeam((t) => ({ order: t.order.filter((x) => x !== id) }));
  const clearTeam = () => setTeam({ order: [] });

  const moveTeam = (idx: number, dir: -1 | 1) => setTeam((t) => {
    const arr = [...t.order];
    const j = idx + dir; if (j < 0 || j >= arr.length) return t;
    [arr[idx], arr[j]] = [arr[j], arr[idx]]; return { order: arr };
  });

  const matchQ = (name: string) => name.toLowerCase().includes(q.trim().toLowerCase());
  const nameById = (id: MonId) => flatMons.find((m) => m.id === id)?.displayName || id;

  return (
    <div className="min-h-screen bg-white text-zinc-900 p-3 sm:p-6">
      <header className="mb-4">
        <h1 className="text-xl font-bold">Pokémon Legends ZA — 野生特區小程序</h1>
        <p className="text-sm text-zinc-600">快速勾選已捕捉、加入隊伍、查看固定頭目與進化條件。資料本地保存。</p>
      </header>

      <div className="flex items-center gap-2 mb-4">
        <TabBtn active={activeTab === "zones"} onClick={() => setActiveTab("zones")}>野生特區</TabBtn>
        <TabBtn active={activeTab === "alphas"} onClick={() => setActiveTab("alphas")}>固定頭目</TabBtn>
        <TabBtn active={activeTab === "evo"} onClick={() => setActiveTab("evo")}>進化條件</TabBtn>
      </div>

      <div className="mb-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="flex items-center gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜尋寶可夢名稱…" className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900" />
          <label className="flex items-center gap-2 text-xs text-zinc-700 whitespace-nowrap">
            <input type="checkbox" checked={onlyAlpha} onChange={(e) => setOnlyAlpha(e.target.checked)} />只看頭目
          </label>
          <select value={caughtFilter} onChange={(e) => setCaughtFilter(e.target.value as any)} className="rounded-lg border border-zinc-200 px-2 py-2 text-xs">
            <option value="all">全部</option>
            <option value="caught">只顯示已捕捉</option>
            <option value="uncaught">只顯示未捕捉</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <TeamBar team={team} nameById={nameById} onRemove={removeFromTeam} onClear={clearTeam} alphaMap={alphaMap} />
        </div>
      </div>

      {activeTab === "zones" && (
        <ZonesView zones={WILD_ZONES} alphaMap={alphaMap} onlyAlpha={onlyAlpha} q={q} onToggleAlpha={toggleAlpha} onAddTeam={addToTeam} inTeam={inTeam} caughtFilter={caughtFilter} />
      )}

      {activeTab === "alphas" && <AlphasView list={FIXED_ALPHAS} onAddTeam={addToTeam} inTeam={inTeam} />}
      {activeTab === "evo" && <EvolutionView list={EVOLUTIONS} />}

      <footer className="mt-8 text-[11px] text-zinc-500">資料暫存於本機（localStorage）。如需重置，請清除瀏覽器儲存或於程式中更換 LS_KEYS 前綴。</footer>
    </div>
  );
}

// ------------------------------
// 分頁：野生特區
// ------------------------------

const ZonesView: React.FC<{ zones: WildZone[]; alphaMap: AlphaMap; onlyAlpha: boolean; q: string; onToggleAlpha: (id: MonId) => void; onAddTeam: (id: MonId) => void; inTeam: (id: MonId) => boolean; caughtFilter: "all" | "caught" | "uncaught"; }> = ({ zones, alphaMap, onlyAlpha, q, onToggleAlpha, onAddTeam, inTeam, caughtFilter }) => {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  useEffect(() => { const init: Record<number, boolean> = {}; zones.forEach((z) => (init[z.zoneNo] = true)); setOpen(init); }, [zones]);
  const matchQ = (name: string) => name.toLowerCase().includes(q.trim().toLowerCase());
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {zones.map((z) => {
        const filtered = z.mons.filter((m) => {
          const nameHit = !q || matchQ(m.displayName) || (m.enName ?? "").toLowerCase().includes(q.toLowerCase());
          const alphaHit = !onlyAlpha || alphaMap[m.id] || m.alpha;
          const captured = inTeam(m.id);
          const caughtHit = caughtFilter === "all" ? true : caughtFilter === "caught" ? captured : !captured;
          return nameHit && alphaHit && caughtHit;
        });
        if (!filtered.length && q) return null;
        return (
          <div key={z.zoneNo} className="rounded-2xl border border-zinc-200 overflow-hidden">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50 hover:bg-zinc-100" onClick={() => setOpen((o) => ({ ...o, [z.zoneNo]: !o[z.zoneNo] }))}>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-zinc-900 text-white grid place-items-center text-sm">{z.zoneNo}</div>
                <div className="text-left"><div className="text-sm font-semibold">野生特區 {z.zoneNo}</div><div className="text-[11px] text-zinc-500">{z.mons.length} 種</div></div>
              </div>
              <div className="text-xs text-zinc-600">{open[z.zoneNo] ? "收起" : "展開"}</div>
            </button>
            {open[z.zoneNo] && (
              <div className="p-3 grid grid-cols-1 gap-2">
                <div className="flex items-center justify-end mb-2"><button onClick={() => z.mons.forEach((m) => onAddTeam(m.id))} className="text-xs px-2 py-1 rounded-lg border bg-emerald-50 text-emerald-700 border-emerald-200">全選加入隊伍</button></div>
                {filtered.map((m) => (
                  <div key={m.id} className="flex items-center justify-between rounded-xl border border-zinc-200 p-2">
                    <div className="flex items-center gap-3">
                      <img src={m.image || spriteUrlByDex(25)} alt={m.displayName} className="h-12 w-12 rounded-lg object-contain bg-white" />
                      <div>
                        <div className="text-sm font-medium flex items-center gap-2"><span>{m.displayName}</span>{m.enName && <span className="text-[10px] text-zinc-500">{m.enName}</span>}{(alphaMap[m.id] || m.alpha) && <Tag>頭目</Tag>}</div>
                        <div className="flex flex-wrap gap-1 mt-1">{(m.types || []).map((t) => (<Tag key={t} typeName={t}>{t}</Tag>))}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onToggleAlpha(m.id)} className={`text-xs px-2 py-1 rounded-lg border ${(alphaMap[m.id] || m.alpha) ? "bg-amber-100 border-amber-200" : "border-zinc-200"}`}>頭目</button>
                      <button onClick={() => onAddTeam(m.id)} disabled={inTeam(m.id)} className={`text-xs px-2 py-1 rounded-lg border ${inTeam(m.id) ? "bg-emerald-100 border-emerald-200 text-emerald-700" : "border-zinc-200"} disabled:opacity-40`}>{inTeam(m.id) ? "已在隊伍" : "加入隊伍"}</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ------------------------------
// 分頁：固定頭目清單
// ------------------------------

const AlphasView: React.FC<{ list: ZoneMon[]; onAddTeam: (id: MonId) => void; inTeam: (id: MonId) => boolean; }> = ({ list, onAddTeam, inTeam }) => {
  const [q, setQ] = useState("");
  const view = useMemo(() => list.filter((m) => m.displayName.toLowerCase().includes(q.toLowerCase())), [list, q]);
  return (
    <div>
      <div className="mb-3"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜尋固定頭目…" className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {view.map((m) => (
          <div key={m.id} className="rounded-2xl border border-zinc-200 p-3 flex items-center justify-between">
            <div><div className="text-sm font-semibold">{m.displayName}</div><div className="text-[11px] text-zinc-500">ID: {m.id}</div></div>
            <button onClick={() => onAddTeam(m.id)} disabled={inTeam(m.id)} className={`text-xs px-2 py-1 rounded-lg border ${inTeam(m.id) ? "bg-emerald-100 border-emerald-200 text-emerald-700" : "border-zinc-200"} disabled:opacity-40`}>{inTeam(m.id) ? "已在隊伍" : "加入隊伍"}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ------------------------------
// 分頁：進化條件
// ------------------------------

const EvolutionView: React.FC<{ list: { from: string; to: string; condition: string }[] }> = ({ list }) => {
  const [q, setQ] = useState("");
  const view = useMemo(() => list.filter((r) => r.from.toLowerCase().includes(q.toLowerCase()) || r.to.toLowerCase().includes(q.toLowerCase()) || r.condition.toLowerCase().includes(q.toLowerCase())), [list, q]);
  return (
    <div>
      <div className="mb-3"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜尋進化（例：伊布 / 水之石 / 夜晚）" className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900" /></div>
      <div className="rounded-2xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-zinc-50"><tr><th className="text-left px-3 py-2">進化前</th><th className="text-left px-3 py-2">進化後</th><th className="text-left px-3 py-2">條件</th></tr></thead><tbody>{view.map((r, i) => (<tr key={i} className="border-t border-zinc-100"><td className="px-3 py-2">{r.from}</td><td className="px-3 py-2">{r.to}</td><td className="px-3 py-2 text-zinc-600">{r.condition}</td></tr>))}</tbody></table>
      </div>
    </div>
  );
};

// ------------------------------
// 隊伍列（沒上限）
// ------------------------------

const TeamBar: React.FC<{ team: TeamState; nameById: (id: MonId) => string; onRemove: (id: MonId) => void; onClear: () => void; alphaMap: AlphaMap; }> = ({ team, nameById, onRemove, onClear, alphaMap }) => {
  return (
    <div className="rounded-2xl border border-zinc-200 p-3">
      <div className="relative flex items-center mb-2">
        <div className="text-sm font-semibold">我的隊伍（{team.order.length}）</div>
        <div className="flex items-center gap-2"><button onClick={onClear} className="text-xs px-2 py-1 rounded-lg border border-zinc-200">清空</button></div>
      </div>
      {team.order.length === 0 ? (
        <div className="text-[12px] text-zinc-500">尚未加入任何寶可夢。到列表點「加入隊伍」吧！</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {team.order.map((id) => {
  const hit = WILD_ZONES.flatMap(z => z.mons).find(m => m.id === id);

  return (
    <div key={id} className="relative flex items-center rounded-xl border border-zinc-200 p-2">
      <div className="flex items-center gap-3">
        <img
          src={hit?.image || spriteUrlByDex(25)}
          alt={hit?.displayName || nameById(id)}
          className="h-12 w-12 rounded-lg object-contain bg-white"
        />
        <div>
          <div className="text-sm font-medium">{hit?.displayName || nameById(id)}</div>

          {/* 這裡加「頭目」判斷 */}
          <div className="flex flex-wrap gap-1 mt-1">
            {(hit?.types || []).map((t) => (
              <Tag key={t} typeName={t}>{t}</Tag>
            ))}
            {(alphaMap[id] || hit?.alpha) && <Tag>頭目</Tag>}
          </div>
        </div>
      </div>

      {/* 右上角 X（父層要 relative 才定位正確） */}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-1 right-1 h-6 w-6 rounded-full border border-zinc-200 text-zinc-500 hover:bg-zinc-50"
        aria-label="移除"
      >
        ×
      </button>
    </div>
  );
})}

        </div>
      )}
    </div>
  );
};
