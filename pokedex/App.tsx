import React, { useEffect, useMemo, useState } from "react";
import { EVOLUTIONS, EvolutionRecord } from "../src/evolutions";
import { WILD_ZONES, WildZone, ZoneMon } from "./wildZone";
import { MONDEX_BY_NAME_ZH } from "../src/monInfo";

const homeURL = "https://daisy116.github.io/pokemon-PK/";

/**
 * Pokémon 野生特區小程序
 *
 * ✅ 功能
 * 1) 「野生特區」分區列表（1~20）：
 *    - 勾選我已捕捉的物種（支援搜尋 / 篩選 / 展開摺疊）
 *    - 將物種加入隊伍
 *    - 標記是否為頭目級（Alpha）
 * 2) 「進化圖鑑（依隊伍）」：列出目前隊伍中尚可進化者及條件，並可直接讓隊伍寶可夢進化
 *
 * ✍️ 進化資料補齊說明
 * - EVOLUTIONS 使用「中文名字」對應 WILD_ZONES.mons 的 displayName
 *   例：from: "菊草葉", to: "月桂葉", condition: "等級 16"
 */

// ------------------------------
// 圖片工具 & 屬性色彩（供列表與隊伍使用）
// ------------------------------
const spriteUrlByDex = (dex: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dex}.png`;

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

// 中文屬性 → 英文屬性（給 my_team 的 moves 用）
const TYPE_ZH_TO_EN: Record<string, string> = {
  一般: "normal",
  火: "fire",
  水: "water",
  草: "grass",
  電: "electric",
  冰: "ice",
  格鬥: "fighting",
  毒: "poison",
  地面: "ground",
  飛行: "flying",
  超能力: "psychic",
  蟲: "bug",
  岩石: "rock",
  幽靈: "ghost",
  龍: "dragon",
  惡: "dark",
  鋼: "steel",
  妖精: "fairy",
};

// 和根目錄 App 共用的 my_team 格式
type MyTeamEntry = { id: string; name: string; moves: string[]; dex?: number };
const MY_TEAM_KEY = "my_team";

// ------------------------------
// DATA
// ------------------------------

export type MonId = string;

// 利用中文名，從「野生特區」或「圖鑑資料」拿到一個 ZoneMon 風格的物件
const getMonByName = (nameZh: string, flatMons: ZoneMon[]): ZoneMon | null => {
  // 1) 先從 WILD_ZONES 裡找（如果那隻本來就會出現在野生特區）
  const fromWild = flatMons.find((m) => m.displayName === nameZh);
  if (fromWild) return fromWild;

  // 2) 找不到就去查小圖鑑（monInfo.ts）
  const basic = MONDEX_BY_NAME_ZH[nameZh];
  if (!basic) return null;

  // 3) 組成一個 ZoneMon 物件（id 給個穩定字串即可）
  return {
    id: `dex-${basic.dex}`,
    displayName: basic.nameZh,
    enName: basic.nameEn,
    types: basic.types,
    image: spriteUrlByDex(basic.dex),
  };
};

// 固定頭目（暫時沒用到，但先保留）
const FIXED_ALPHAS: ZoneMon[] = [
  {
    id: "alpha-starmie",
    displayName: "寶石海星",
    enName: "Starmie",
    types: ["水", "超能力"],
    image: spriteUrlByDex(121),
  },
  {
    id: "alpha-snorlax",
    displayName: "卡比獸",
    enName: "Snorlax",
    types: ["一般"],
    image: spriteUrlByDex(143),
  },
  {
    id: "alpha-rapidash",
    displayName: "烈焰馬",
    enName: "Rapidash",
    types: ["火"],
    image: spriteUrlByDex(78),
  },
  {
    id: "alpha-gyarados",
    displayName: "暴鯉龍",
    enName: "Gyarados",
    types: ["水", "飛行"],
    image: spriteUrlByDex(130),
  },
  {
    id: "alpha-scyther",
    displayName: "飛天螳螂",
    enName: "Scyther",
    types: ["蟲", "飛行"],
    image: spriteUrlByDex(123),
  },
];

// ------------------------------
// 儲存 / 邏輯
// ------------------------------

const LS_KEYS = { team: MY_TEAM_KEY, alpha: "za_alpha_map" };
type AlphaMap = Record<MonId, boolean>;

function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState] as const;
}

// ------------------------------
// UI 小元件
// ------------------------------

const TabBtn: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-medium transition border ${
      active
        ? "bg-zinc-900 text-white border-zinc-900"
        : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50"
    }`}
  >
    {children}
  </button>
);

const Tag: React.FC<{ children: React.ReactNode; typeName?: string }> = ({
  children,
  typeName,
}) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] ${
      typeName ? TYPE_COLOR[typeName] : "border border-zinc-200 text-zinc-600"
    }`}
  >
    {children}
  </span>
);

// ------------------------------
// 主元件
// ------------------------------

export default function App() {
  const [activeTab, setActiveTab] = useState<"zones" | "evo">("zones");
  const [team, setTeam] = useLocalStorage<MyTeamEntry[]>(LS_KEYS.team, []);
  const [alphaMap, setAlphaMap] = useLocalStorage<AlphaMap>(LS_KEYS.alpha, {});
  const [q, setQ] = useState("");
  const [onlyAlpha, setOnlyAlpha] = useState(false);
  const [caughtFilter, setCaughtFilter] = useState<
    "all" | "caught" | "uncaught"
  >("all");

  // 新增：目前選中的隊伍成員 + 進化圖鑑的搜尋字
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(
    null
  );
  const [evoSearch, setEvoSearch] = useState("");

  const flatMons = useMemo(() => {
    const list: ZoneMon[] = [];
    WILD_ZONES.forEach((z) => z.mons.forEach((m) => list.push(m)));
    return list;
  }, []);

  const inTeam = (id: MonId) => {
    const mon = flatMons.find((m) => m.id === id);
    if (!mon) return false;
    return team.some((t) => t.name === mon.displayName);
  };

  const toggleAlpha = (id: MonId) =>
    setAlphaMap((m) => ({ ...m, [id]: !m[id] }));

  const addToTeam = (id: MonId) =>
    setTeam((prev) => {
      const mon = flatMons.find((m) => m.id === id);
      if (!mon) return prev;

      // 已經在隊伍裡就不再加入（用 displayName 判斷）
      if (prev.some((t) => t.name === mon.displayName)) return prev;

      // 從圖片 URL 抓 dex 編號（.../25.png）
      let dex: number | undefined;
      if (mon.image) {
        const match = mon.image.match(/\/(\d+)\.png$/);
        if (match) dex = Number(match[1]);
      }

      const movesZh = mon.types || [];
      const movesEn = movesZh.map((t) => TYPE_ZH_TO_EN[t] || "normal");
      const moves = movesEn.length ? movesEn : ["normal"];

      const newEntry: MyTeamEntry = {
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        name: mon.displayName,
        moves,
        dex,
      };

      return [...prev, newEntry];
    });

  const removeFromTeam = (memberId: string) =>
    setTeam((prev) => prev.filter((t) => t.id !== memberId));

  const clearTeam = () => {
    setTeam([]);
    setSelectedTeamIndex(null);
  };

  // 讓隊伍中的某一隻進化為新的名字
  const handleEvolve = (index: number, fromName: string, toName: string) => {
    if (!toName) return;

    setTeam((prev) => {
      if (index < 0 || index >= prev.length) return prev;

      const current = prev[index];
      // 雖然理論上 fromName 應該一致，但就算不一致也直接覆蓋沒關係
      const toMon = getMonByName(toName, flatMons);
      if (!toMon) return prev;

      let dex: number | undefined;
      if (toMon.image) {
        const match = toMon.image.match(/\/(\d+)\.png$/);
        if (match) dex = Number(match[1]);
      }

      const movesZh = toMon.types || [];
      const movesEn = movesZh.map((t) => TYPE_ZH_TO_EN[t] || "normal");
      const moves = movesEn.length ? movesEn : ["normal"];

      const updated: MyTeamEntry = {
        ...current,
        name: toMon.displayName,
        dex,
        moves,
      };

      const next = [...prev];
      next[index] = updated;
      return next;
    });
  };


return (
  <div className="min-h-screen theme-space bg-cover bg-center text-white">
    <div className="p-3 sm:p-6 max-w-6xl mx-auto">
      <header className="mb-4">
        <h1 className="text-xl font-bold">
          Pokémon Legends ZA — 野生特區小程序
        </h1>
        <p className="text-sm text-zinc-300">
          快速勾選已捕捉、加入隊伍與進化條件。
        </p>
        <a
          href={homeURL}
          className="inline-flex items-center gap-1 rounded-full bg-white/80 hover:bg-white text-zinc-900 border border-zinc-300 px-3 py-1 text-xs font-medium transition"
        >
          返回首頁 →
        </a>
      </header>

      <div className="flex items-center gap-2 mb-4">
        <TabBtn
          active={activeTab === "zones"}
          onClick={() => setActiveTab("zones")}
        >
          野生特區
        </TabBtn>
        <TabBtn
          active={activeTab === "evo"}
          onClick={() => setActiveTab("evo")}
        >
          進化圖鑑（依隊伍）
        </TabBtn>
      </div>

      {/* 工具列（搜尋 / 篩選）＋ 我的隊伍 */}
      <div className="mb-4 space-y-3">
        {/* 搜尋＋篩選：小螢幕直排，大螢幕橫排 */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜尋寶可夢名稱…"
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-zinc-700 whitespace-nowrap">
              <input
                type="checkbox"
                checked={onlyAlpha}
                onChange={(e) => setOnlyAlpha(e.target.checked)}
              />
              只看頭目
            </label>
            <select
              value={caughtFilter}
              onChange={(e) =>
                setCaughtFilter(e.target.value as "all" | "caught" | "uncaught")
              }
              className="rounded-lg border border-zinc-200 px-2 py-2 text-xs"
            >
              <option value="all">全部</option>
              <option value="caught">只顯示已捕捉</option>
              <option value="uncaught">只顯示未捕捉</option>
            </select>
          </div>
        </div>

        {/* 我的隊伍 */}
        <TeamBar
          team={team}
          onRemove={removeFromTeam}
          onClear={clearTeam}
          alphaMap={alphaMap}
          selectedIndex={selectedTeamIndex}
          onSelect={(i, name) => {
            setSelectedTeamIndex(i);
            setEvoSearch(name);
            setActiveTab("evo");
          }}
          flatMons={flatMons}
        />
      </div>

      {activeTab === "zones" && (
        <ZonesView
          zones={WILD_ZONES}
          alphaMap={alphaMap}
          onlyAlpha={onlyAlpha}
          q={q}
          onToggleAlpha={toggleAlpha}
          onAddTeam={addToTeam}
          inTeam={inTeam}
          caughtFilter={caughtFilter}
        />
      )}

      {activeTab === "evo" && (
        <EvolutionView
          evolutions={EVOLUTIONS}
          team={team}
          flatMons={flatMons}
          selectedTeamIndex={selectedTeamIndex}
          search={evoSearch}
          setSearch={setEvoSearch}
          onEvolve={handleEvolve}
        />
      )}

      <footer className="mt-8 text-[11px] text-zinc-500">
        資料暫存於本機（localStorage）。如需重置，請清除瀏覽器儲存或於程式中更換
        LS_KEYS 前綴。
      </footer>

      </div>
    </div>
  );
}

// ------------------------------
// 分頁：野生特區
// ------------------------------

const ZonesView: React.FC<{
  zones: WildZone[];
  alphaMap: AlphaMap;
  onlyAlpha: boolean;
  q: string;
  onToggleAlpha: (id: MonId) => void;
  onAddTeam: (id: MonId) => void;
  inTeam: (id: MonId) => boolean;
  caughtFilter: "all" | "caught" | "uncaught";
}> = ({
  zones,
  alphaMap,
  onlyAlpha,
  q,
  onToggleAlpha,
  onAddTeam,
  inTeam,
  caughtFilter,
}) => {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const init: Record<number, boolean> = {};
    zones.forEach((z) => (init[z.zoneNo] = true));
    setOpen(init);
  }, [zones]);

  const matchQ = (name: string) =>
    name.toLowerCase().includes(q.trim().toLowerCase());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {zones.map((z) => {
        const filtered = z.mons.filter((m) => {
          const nameHit =
            !q ||
            matchQ(m.displayName) ||
            (m.enName ?? "").toLowerCase().includes(q.toLowerCase());
          const alphaHit = !onlyAlpha || alphaMap[m.id] || m.alpha;
          const captured = inTeam(m.id);
          const caughtHit =
            caughtFilter === "all"
              ? true
              : caughtFilter === "caught"
              ? captured
              : !captured;
          return nameHit && alphaHit && caughtHit;
        });
        if (!filtered.length && q) return null;
        return (
          <div
            key={z.zoneNo}
            className="rounded-2xl border border-zinc-200 overflow-hidden"
          >
            <div className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50">
              {/* 左邊：點這裡收起 / 展開 */}
              <button
                className="flex-1 flex items-center justify-between hover:bg-zinc-100 rounded-xl text-left pr-3"
                onClick={() =>
                  setOpen((o) => ({ ...o, [z.zoneNo]: !o[z.zoneNo] }))
                }
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-zinc-900 text-white grid place-items-center text-sm">
                    {z.zoneNo}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-zinc-900">
                      野生特區 {z.zoneNo}
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      {z.mons.length} 種
                    </div>
                  </div>
                </div>
                <div className="text-xs text-zinc-600">
                  {open[z.zoneNo] ? "收起" : "展開"}
                </div>
              </button>

              {/* 右邊：全選加入隊伍 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  z.mons.forEach((m) => onAddTeam(m.id));
                }}
                className="ml-2 text-xs px-2 py-1 rounded-lg border bg-emerald-50 text-emerald-700 border-emerald-200"
              >
                全選加入隊伍
              </button>
            </div>
            {open[z.zoneNo] && (
              <div className="p-3 grid grid-cols-1 gap-2">
                {z.mons.length === 0 && (
                  <div className="text-xs text-zinc-500 border border-dashed border-zinc-200 rounded-lg p-3">
                    此區資料待補（我會分批把物種補上）。
                  </div>
                )}
                {filtered.map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl border border-zinc-200 p-2"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={m.image || spriteUrlByDex(25)}
                        alt={m.displayName}
                        className="h-12 w-12 rounded-lg object-contain bg-white"
                      />
                      <div>
                        <div className="text-sm font-medium flex items-center gap-2">
                          <span>{m.displayName}</span>
                          {m.enName && (
                            <span className="text-[10px]">
                              {m.enName}
                            </span>
                          )}
                          {(alphaMap[m.id] || m.alpha) && <Tag>頭目</Tag>}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(m.types || []).map((t) => (
                            <Tag key={t} typeName={t}>
                              {t}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-zinc-100 flex items-center gap-2 justify-end sm:mt-0 sm:pt-0 sm:border-0">
                      <button
                        onClick={() => onToggleAlpha(m.id)}
                        className={
                          "text-xs px-3 py-1 rounded-full border " +
                          ((alphaMap[m.id] || m.alpha)
                            ? "bg-amber-100 border-amber-300 text-amber-700"
                            : "bg-white border-zinc-200 text-zinc-600")
                        }
                      >
                        頭目
                      </button>

                      <button
                        onClick={() => onAddTeam(m.id)}
                        disabled={inTeam(m.id)}
                        className={
                          "text-xs px-3 py-1 rounded-full border transition " +
                          (inTeam(m.id)
                            ? "bg-emerald-100 border-emerald-200 text-emerald-700"
                            : "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600") +
                          " disabled:opacity-60"
                        }
                      >
                        {inTeam(m.id) ? "已在隊伍" : "加入隊伍"}
                      </button>
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
// 分頁：進化圖鑑（依隊伍）
// ------------------------------

type EvoCategory = "全部" | "等級" | "道具" | "好感" | "通訊進化";

const getCategory = (condition: string): Exclude<EvoCategory, "全部"> => {
  if (condition.includes("之石") || condition.includes("道具") || condition.includes("持有"))
    return "道具";
  if (condition.includes("好感") || condition.includes("親密")) return "好感";
  if (condition.includes("交換") || condition.includes("通訊") || condition.includes("連線"))
    return "通訊進化";
  return "等級";
};

const EvolutionView: React.FC<{
  evolutions: EvolutionRecord[];
  team: MyTeamEntry[];
  flatMons: ZoneMon[];
  selectedTeamIndex: number | null;
  search: string;
  setSearch: (v: string) => void;
  onEvolve: (index: number, from: string, to: string) => void;
}> = ({
  evolutions,
  team,
  flatMons,
  selectedTeamIndex,
  search,
  setSearch,
  onEvolve,
}) => {
  const [category, setCategory] = useState<EvoCategory>("全部");
  const cats: EvoCategory[] = ["全部", "等級", "道具", "好感", "通訊進化"];

  const teamNames = useMemo(() => new Set(team.map((t) => t.name)), [team]);

  const groups = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const map = new Map<
      string,
      {
        fromMon: ZoneMon | null;
        records: {
          record: EvolutionRecord;
          toMon: ZoneMon | null;
          cat: EvoCategory;
        }[];
      }
    >();

    evolutions.forEach((r) => {
      // 只看隊伍裡的 from
      if (!teamNames.has(r.from)) return;

      const condCat: Exclude<EvoCategory, "全部"> = getCategory(r.condition);
      if (category !== "全部" && condCat !== category) return;

      const textToSearch = (r.from + r.to + r.condition).toLowerCase();
      if (keyword && !textToSearch.includes(keyword)) return;

      const current = map.get(r.from);
      const fromMon = current?.fromMon ?? getMonByName(r.from, flatMons);
      const toMon = getMonByName(r.to, flatMons);

      const next = current ?? { fromMon, records: [] };
      next.records.push({ record: r, toMon, cat: condCat });
      map.set(r.from, next);
    });

    return Array.from(map.entries()).map(([fromName, data]) => ({
      fromName,
      fromMon: data.fromMon,
      records: data.records,
    }));
  }, [evolutions, teamNames, search, category, flatMons]);

  const totalEvolvable = groups.length;

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="text-base sm:text-lg font-semibold text-zinc-900">
            進化圖鑑（依我的隊伍）
          </h2>
          <span className="text-[11px] text-zinc-500">
            目前隊伍中有 {totalEvolvable} 隻尚可進化
          </span>
        </div>

        {/* 搜尋＋篩選 */}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋（例：伊布／菊草葉／水之石／等級）"
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <div className="flex flex-wrap gap-2 text-xs">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1 rounded-full border transition ${
                  category === c
                    ? "bg-zinc-900 text-white border-zinc-900"
                    : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 bg-white px-4 py-6 text-center text-xs text-zinc-500">
          目前隊伍中沒有尚可進化（或被搜尋／篩選條件排除）的寶可夢。
          <br />
          請先在「野生特區」中加入隊伍，或調整上方搜尋／進化方式篩選。
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map(({ fromName, fromMon, records }) => (
            <div
              key={fromName}
              className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm flex flex-col gap-4"
            >
              <h3 className="text-sm font-semibold text-zinc-900">
                {fromName} 的下一步進化
              </h3>
              <div className="flex flex-col gap-3">
                {records.map(({ record, toMon, cat }, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-zinc-200 bg-white px-3 py-3 flex items-center justify-between gap-3"
                  >
                    {/* 左：目前型態 */}
                    <div className="flex flex-col items-center gap-1 w-24 sm:w-32">
                      {fromMon ? (
                        <>
                          <img
                            src={fromMon.image || spriteUrlByDex(25)}
                            alt={fromMon.displayName}
                            className="h-20 w-20 rounded-xl bg-zinc-50 object-contain border border-zinc-100"
                          />
                          <div className="text-sm font-semibold text-zinc-900">
                            {fromMon.displayName}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {(fromMon.types || []).map((t) => (
                              <Tag key={t} typeName={t}>
                                {t}
                              </Tag>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="h-20 w-20 rounded-xl bg-zinc-100 grid place-items-center text-[11px] text-zinc-500 border border-dashed border-zinc-200">
                          無圖片
                        </div>
                      )}
                    </div>

                    {/* 中：箭頭＋進化方式 */}
                    <div className="flex flex-col items-center justify-center w-24 shrink-0">
                      <span className="text-2xl text-zinc-400">→</span>
                      <span className="mt-1 inline-flex items-center rounded-full border border-zinc-300 px-2 py-[1px] text-[10px] text-zinc-700">
                        {cat}
                      </span>
                      <span className="mt-1 text-[11px] text-zinc-500">
                        {record.condition}
                      </span>
                    </div>

                    {/* 右：進化後 */}
                    <div className="flex flex-col items-center gap-1 w-24 sm:w-32">
                      {toMon ? (
                        <>
                          <img
                            src={toMon.image || spriteUrlByDex(25)}
                            alt={toMon.displayName}
                            className="h-20 w-20 rounded-xl bg-zinc-50 object-contain border border-zinc-100"
                          />
                          <div className="text-sm font-semibold text-zinc-900">
                            {toMon.displayName}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {(toMon.types || []).map((t) => (
                              <Tag key={t} typeName={t}>
                                {t}
                              </Tag>
                            ))}
                          </div>

                          {/* 進化按鈕 */}
                          <button
                            onClick={() => {
                              if (selectedTeamIndex == null) {
                                alert("請先從上方「我的隊伍」選擇一隻寶可夢");
                                return;
                              }
                              onEvolve(
                                selectedTeamIndex,
                                fromName,
                                toMon.displayName
                              );
                            }}
                            className="mt-2 text-xs px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          >
                            進化
                          </button>
                        </>
                      ) : (
                        <div className="h-20 w-20 rounded-xl bg-zinc-100 grid place-items-center text-[11px] text-zinc-500 border border-dashed border-zinc-200">
                          無圖
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// ------------------------------
// 隊伍列（顯示 my_team）
// ------------------------------

const TeamBar: React.FC<{
  team: MyTeamEntry[];
  onRemove: (id: string) => void;
  onClear: () => void;
  alphaMap: AlphaMap;
  onSelect: (index: number, name: string) => void;
  selectedIndex: number | null;
  flatMons: ZoneMon[];
}> = ({ team, onRemove, onClear, alphaMap, onSelect, selectedIndex, flatMons }) => {
  return (
    <div className="rounded-2xl border border-zinc-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold">我的隊伍（{team.length}）</div>
        <button
          onClick={onClear}
          className="text-xs px-2 py-1 rounded-lg border border-zinc-200"
        >
          清空
        </button>
      </div>

      {team.length === 0 ? (
        <div className="text-[12px] text-zinc-500">
          尚未加入任何寶可夢。到「野生特區」列表點「加入隊伍」吧！
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {team.map((member, i) => {
            const mon = getMonByName(member.name, flatMons);

            return (
              <div
                key={member.id}
                onClick={() => onSelect(i, member.name)}
                className={
                  "relative flex items-center rounded-xl p-2 bg-white cursor-pointer transition " +
                  (selectedIndex === i
                    ? "ring-2 ring-amber-400 border border-amber-300"
                    : "border border-zinc-200")
                }
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      mon?.image ||
                      (member.dex
                        ? spriteUrlByDex(member.dex)
                        : spriteUrlByDex(25))
                    }
                    alt={member.name}
                    className="h-12 w-12 rounded-lg object-contain bg-white"
                  />
                  <div>
                    <div className="text-sm font-medium">{member.name}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(mon?.types || []).map((t) => (
                        <Tag key={t} typeName={t}>
                          {t}
                        </Tag>
                      ))}
                      {mon && (alphaMap[mon.id] || mon.alpha) && <Tag>頭目</Tag>}
                    </div>
                  </div>
                </div>

                {/* 右上角刪除按鈕 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(member.id);
                  }}
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


