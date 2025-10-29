import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/* =========================
   顏色對應表
   ========================= */
const TYPE_COLORS: Record<string, string> = {
  normal: "bg-gray-300 text-black",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-black",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-400 text-black",
  fighting: "bg-orange-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-yellow-700 text-white",
  flying: "bg-indigo-400 text-white",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-black",
  rock: "bg-stone-500 text-white",
  ghost: "bg-violet-600 text-white",
  dragon: "bg-indigo-700 text-white",
  dark: "bg-zinc-800 text-white",
  steel: "bg-gray-500 text-white",
  fairy: "bg-fuchsia-400 text-white",
};

const TYPE_ZH: Record<string, string> = {
  normal: "一般",
  fire: "火",
  water: "水",
  electric: "電",
  grass: "草",
  ice: "冰",
  fighting: "格鬥",
  poison: "毒",
  ground: "地面",
  flying: "飛行",
  psychic: "超能",
  bug: "蟲",
  rock: "岩石",
  ghost: "幽靈",
  dragon: "龍",
  dark: "惡",
  steel: "鋼",
  fairy: "妖精",
};

function TypeBadge({ t, extra }: { t: string; extra?: string }) {
  const color = TYPE_COLORS[t] || "bg-gray-200 text-black";
  return (
    <Badge
      className={`capitalize text-xs px-2 py-1 rounded-xl mr-1 mb-1 inline-flex items-center gap-1 ${color}`}
    >
      {TYPE_ZH[t] ?? t}
      {extra ? <span className="opacity-90">{extra}</span> : null}
    </Badge>
  );
}

/* =========================
   中文→英文 轉換
   ========================= */
async function fetchTypesByName(name: string): Promise<string[] | null> {
  const en = name.trim().toLowerCase();
  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(en)}`);
    if (!resp.ok) throw new Error("not ok");
    const data = await resp.json();
    return (data.types as any[]).map((t: any) => t.type.name);
  } catch {
    return null;
  }
}

/* =========================
   主畫面
   ========================= */
export default function App() {
  const [enemyName, setEnemyName] = useState("");
  const [enemyTypes, setEnemyTypes] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState<any[]>(() => {
    try {
      const s = localStorage.getItem("my_team");
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });
  const [draftName, setDraftName] = useState("");
  const [teamLoading, setTeamLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("my_team", JSON.stringify(team));
  }, [team]);

  async function handleLookup() {
    if (!enemyName.trim()) return;
    setLoading(true);
    const t = await fetchTypesByName(enemyName.trim());
    setEnemyTypes(t);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold">寶可夢屬性相剋查詢器</h1>
      <p className="text-sm text-zinc-600 mb-3">
        【對手查詢】：輸入對手名稱或手動選屬性。 <br />
        【我的隊伍】：維護你的隊伍招式屬性。
      </p>

      <Tabs defaultValue="enemy" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-3 rounded-xl bg-zinc-100 p-1">
          <TabsTrigger value="enemy" className="tabs-trigger">對手查詢</TabsTrigger>
          <TabsTrigger value="team" className="tabs-trigger">我的隊伍</TabsTrigger>
        </TabsList>

        {/* 對手查詢 */}
        <TabsContent value="enemy">
          <Card className="mb-4 rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">以名稱查屬性</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 items-center mb-2">
                <Input
                  className="h-9 text-sm"
                  placeholder="e.g. pikachu, charizard"
                  value={enemyName}
                  onChange={(e) => setEnemyName(e.target.value)}
                />
                <Button
                  className="rounded-full min-w-[80px] bg-zinc-900 text-white border border-zinc-900 h-9 px-4 text-sm font-medium hover:bg-zinc-800 active:scale-[.98] transition disabled:opacity-50 disabled:pointer-events-none"
                  onClick={handleLookup}
                  disabled={loading || !enemyName.trim()}
                >
                  {loading ? "查詢中…" : "查屬性"}
                </Button>
              </div>

              <div className="text-sm text-zinc-600">
                {enemyTypes
                  ? `屬性：${enemyTypes.join(", ")}`
                  : "請輸入名稱查詢屬性"}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 我的隊伍 */}
        <TabsContent value="team">
          <Card className="mb-4 rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">新增我的寶可夢隊員</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 items-center mb-2">
                <Input
                  className="h-9 text-sm"
                  placeholder="寶可夢名稱"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                />
                <Button
                  className="rounded-full min-w-[70px] bg-zinc-900 text-white border border-zinc-900 h-9 px-3 text-sm font-medium hover:bg-zinc-800 active:scale-[.98] transition disabled:opacity-50 disabled:pointer-events-none"
                  onClick={async () => {
                    if (!draftName.trim() || teamLoading) return;
                    setTeamLoading(true);
                    try {
                      const types = await fetchTypesByName(draftName.trim());
                      if (types) {
                        setTeam((prev) => [
                          ...prev,
                          { id: Date.now(), name: draftName.trim(), moves: types },
                        ]);
                        setDraftName("");
                      }
                    } finally {
                      setTeamLoading(false);
                    }
                  }}
                  disabled={teamLoading || !draftName.trim()}
                >
                  {teamLoading ? "加入中…" : "加入"}
                </Button>
              </div>

              {team.length ? (
                <ul className="space-y-2">
                  {team.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center justify-between bg-zinc-50 border rounded-xl p-2"
                    >
                      <div>
                        <div className="text-sm font-medium">{m.name}</div>
                        <div>
                          {m.moves.map((t: string) => (
                            <TypeBadge key={m.id + t} t={t} />
                          ))}
                        </div>
                      </div>
                      <Button
                        className="h-9 px-3"
                        variant="destructive"
                        onClick={() =>
                          setTeam((prev) => prev.filter((x) => x.id !== m.id))
                        }
                      >
                        刪除
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-zinc-500">尚無成員，請先新增。</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <footer className="text-[10px] text-zinc-400 mt-6">
        資料來源：PokeAPI。第一次用中文名稱查詢時會建立索引並快取到本機。
      </footer>
    </div>
  );
}
