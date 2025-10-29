import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/* =========================
   顏色：按鈕/徽章對應的型色
   ========================= */
const TYPE_COLORS: Record<string,string> = {
  normal:  "bg-gray-300 text-black",
  fire:    "bg-red-500 text-white",
  water:   "bg-blue-500 text-white",
  electric:"bg-yellow-400 text-black",
  grass:   "bg-green-500 text-white",
  ice:     "bg-cyan-400 text-black",
  fighting:"bg-orange-700 text-white",
  poison:  "bg-purple-500 text-white",
  ground:  "bg-yellow-700 text-white",
  flying:  "bg-indigo-400 text-white",
  psychic: "bg-pink-500 text-white",
  bug:     "bg-lime-500 text-black",
  rock:    "bg-stone-500 text-white",
  ghost:   "bg-violet-600 text-white",
  dragon:  "bg-indigo-700 text-white",
  dark:    "bg-zinc-800 text-white",
  steel:   "bg-gray-500 text-white",
  fairy:   "bg-fuchsia-400 text-white",
};

const TYPE_ZH: Record<string,string> = {
  normal:"一般", fire:"火", water:"水", electric:"電", grass:"草", ice:"冰",
  fighting:"格鬥", poison:"毒", ground:"地面", flying:"飛行", psychic:"超能", bug:"蟲",
  rock:"岩石", ghost:"幽靈", dragon:"龍", dark:"惡", steel:"鋼", fairy:"妖精",
};

function TypeBadge({ t, extra }:{ t:string; extra?: string }){
  const color = TYPE_COLORS[t] || "bg-gray-200 text-black";
  return (
    <Badge className={`capitalize text-xs px-2 py-1 rounded-xl mr-1 mb-1 inline-flex items-center gap-1 ${color}`}>
      {TYPE_ZH[t] ?? t}
      {extra ? <span className="opacity-90">{extra}</span> : null}
    </Badge>
  );
}

/* =========================
   中文→英文 名稱解析（含地區/超級）
   ========================= */
const NAME_MAP_ZH2EN: Record<string, string> = {
  "龜腳腳":"binacle","皮丘":"pichu","皮卡丘":"pikachu","雷丘":"raichu","阿羅拉雷丘":"raichu-alola",
  "妙蛙種子":"bulbasaur","妙蛙草":"ivysaur","妙蛙花":"venusaur",
  "小火龍":"charmander","火恐龍":"charmeleon","噴火龍":"charizard",
  "超級噴火龍X":"charizard-mega-x","超級噴火龍Y":"charizard-mega-y",
  "傑尼龜":"squirtle","卡咪龜":"wartortle","水箭龜":"blastoise",
  "小鋸鱷":"totodile","藍鱷":"croconaw","大力鱷":"feraligatr",
  "菊草葉":"chikorita","月桂葉":"bayleef","大竺葵":"meganium",
  "暖暖豬":"tepig","炒炒豬":"pignite","炎武王":"emboar",
  "小箭雀":"fletchling","火箭雀":"fletchinder","烈箭鷹":"talonflame",
  "掘掘兔":"bunnelby","掘地兔":"diggersby",
  "粉蝶蟲":"scatterbug","粉蝶蛹":"spewpa","彩粉蝶":"vivillon",
  "獨角蟲":"weedle","鐵殼蛹":"kakuna","大針蜂":"beedrill",
  "波波":"pidgey","比比鳥":"pidgeotto","大比鳥":"pidgeot",
  "咩利羊":"mareep","茸茸羊":"flaaffy","電龍":"ampharos",
  "含羞苞":"budew","毒薔薇":"roselia","羅絲雷朵":"roserade",
  "鯉魚王":"magikarp","暴鯉龍":"gyarados",
  "海星星":"staryu","寶石海星":"starmie",
  "花蓓蓓":"flabebe","花葉蒂":"floette","花潔夫人":"florges",
  "坐騎小羊":"skiddo","坐騎山羊":"gogoat",
  "超能妙喵":"meowstic","小獅獅":"litleo","火炎獅":"pyroar",
  "頑皮熊貓":"pancham","流氓熊貓":"pangoro",
  "破破袋":"trubbish","灰塵山":"garbodor",
  "皮寶寶":"cleffa","皮皮":"clefairy","皮可西":"clefable",
  "圓絲蛛":"spinarak","阿利多斯":"ariados","阿柏蛇":"ekans","阿柏怪":"arbok",
  "凱西":"abra","勇基拉":"kadabra","胡地":"alakazam",
  "鬼斯":"gastly","鬼斯通":"haunter","耿鬼":"gengar",
  "百足蜈蚣":"venipede","車輪球":"whirlipede","蜈蚣王":"scolipede",
  "獨劍鞘":"honedge","雙劍鞘":"doublade","堅盾劍怪":"aegislash",
  "喇叭芽":"bellsprout","口呆花":"weepinbell","大食花":"victreebel",
  "花椰猴":"pansage","花椰猿":"simisage","爆香猴":"pansear","爆香猿":"simisear","冷水猴":"panpour","冷水猿":"simipour",
  "瑪沙那":"meditite","恰雷姆":"medicham",
  "落雷獸":"electrike","雷電獸":"manectric",
  "拉魯拉絲":"ralts","奇魯莉安":"kirlia","沙奈朵":"gardevoir","艾路雷朵":"gallade",
  "戴魯比":"houndour","黑魯加":"houndoom",
  "青綿鳥":"swablu","七夕青鳥":"altaria",
  "差不多娃娃":"audino","粉香香":"spritzee","芳香精":"aromatisse",
  "綿綿泡芙":"swirlix","胖甜妮":"slurpuff",
  "伊布":"eevee","水伊布":"vaporeon","雷伊布":"jolteon","火伊布":"flareon","太陽伊布":"espeon",
  "月亮伊布":"umbreon","葉伊布":"leafeon","冰伊布":"glaceon","仙子伊布":"sylveon",
  "捲捲耳":"buneary","長耳兔":"lopunny",
  "怨影娃娃":"shuppet","詛咒娃娃":"banette",
  "迷你冰":"vanillite","多多冰":"vanillish","雙倍多多冰":"vanilluxe",
  "呆火駝":"numel","噴火駝":"camerupt",
  "沙河馬":"hippopotas","河馬獸":"hippowdon",
  "螺釘地鼠":"drilbur","龍頭地鼠":"excadrill",
  "黑眼鱷":"sandile","混混鱷":"krokorok","流氓鱷":"krookodile",
  "腕力":"machop","豪力":"machoke","怪力":"machamp",
  "圓陸鯊":"gible","尖牙陸鯊":"gabite","烈咬陸鯊":"garchomp",
  "小碎鑽":"carbink","勾魂眼":"sableye","大嘴娃":"mawile",
  "阿勃梭魯":"absol","利歐路":"riolu","路卡利歐":"lucario",
  "呆呆獸":"slowpoke","呆殼獸":"slowbro","呆河馬":"slowking",
  "麻麻小魚":"tynamo","麻麻鰻":"eelektrik","麻麻鰻魚王":"eelektross",
  "迷你龍":"dratini","哈克龍":"dragonair","快龍":"dragonite"
};

function loadJSON<T=any>(k:string, fallback:T): T { try { const s=localStorage.getItem(k); return s? JSON.parse(s): fallback; } catch { return fallback; } }
function saveJSON(k:string, v:any){ try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

function normalizeZhForm(zh:string){
  let form: null | "mega" | "alola" | "galar" | "hisui" = null;
  let xy: null | "x" | "y" = null;
  let base = zh.replace(/\s+/g, "");
  if (base.startsWith("阿羅拉")) { form="alola"; base=base.slice(3); }
  else if (base.startsWith("伽勒爾")) { form="galar"; base=base.slice(3); }
  else if (base.startsWith("洗翠"))   { form="hisui"; base=base.slice(2); }
  else if (base.startsWith("超級"))   { form="mega";  base=base.slice(2);
    if (/X$/i.test(base)) { xy="x"; base=base.replace(/X$/i,""); }
    else if (/Y$/i.test(base)) { xy="y"; base=base.replace(/Y$/i,""); }
  }
  return { base, form, xy } as const;
}

async function resolveEnglishFromZh(zh:string): Promise<string|null>{
  if (NAME_MAP_ZH2EN[zh]) return NAME_MAP_ZH2EN[zh];
  const cache = loadJSON<Record<string,string>>("zh2en_cache", {});
  if (cache[zh]) return cache[zh];

  const { base, form, xy } = normalizeZhForm(zh);

  // 下載一次 species 清單（快取）
  let list = loadJSON<any[]>("poke_species_list", []);
  if (!list.length){
    const resp = await fetch("https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=20000");
    if (!resp.ok) return null;
    const data = await resp.json();
    list = data.results || [];
    saveJSON("poke_species_list", list);
  }

  // 逐筆檢查 zh-Hant 名稱
  for (const sp of list){
    const detail = await fetch(sp.url).then(r=>r.ok?r.json():null).catch(()=>null);
    if (!detail) continue;
    const zhHant = (detail.names||[]).find((n:any)=>n.language?.name==="zh-Hant")?.name?.replace(/\s+/g,"");
    if (zhHant && zhHant === base){
      let en = detail.name as string;
      if (form==="mega") en = xy? `${en}-mega-${xy}` : `${en}-mega`;
      else if (form)     en = `${en}-${form}`;
      cache[zh] = en; saveJSON("zh2en_cache", cache);
      return en;
    }
  }
  return null;
}

async function translateNameToEnglish(input: string): Promise<string | null> {
  const raw = input.trim();
  if (!raw) return null;
  const hasCJK = /[\u3400-\u9FFF]/.test(raw);
  if (hasCJK) return await resolveEnglishFromZh(raw);
  return raw.toLowerCase();
}

/* =========================
   相剋表（攻擊→防守 倍率）
   ========================= */
const TYPES = ["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"] as const;

const CHART: Record<string, Record<string, number>> = {
  normal:{ rock:0.5, ghost:0, steel:0.5 },
  fire:{ fire:0.5, water:0.5, grass:2, ice:2, bug:2, rock:0.5, dragon:0.5, steel:2 },
  water:{ fire:2, water:0.5, grass:0.5, ground:2, rock:2, dragon:0.5 },
  electric:{ water:2, electric:0.5, grass:0.5, ground:0, flying:2, dragon:0.5 },
  grass:{ fire:0.5, water:2, grass:0.5, poison:0.5, ground:2, flying:0.5, bug:0.5, rock:2, dragon:0.5, steel:0.5 },
  ice:{ fire:0.5, water:0.5, ice:0.5, ground:2, flying:2, dragon:2, steel:0.5 },
  fighting:{ normal:2, ice:2, rock:2, dark:2, steel:2, poison:0.5, flying:0.5, psychic:0.5, bug:0.5, fairy:0.5, ghost:0 },
  poison:{ grass:2, poison:0.5, ground:0.5, rock:0.5, ghost:0.5, steel:0, fairy:2 },
  ground:{ fire:2, electric:2, grass:0.5, poison:2, flying:0, bug:0.5, rock:2, steel:2 },
  flying:{ electric:0.5, grass:2, fighting:2, bug:2, rock:0.5, steel:0.5 },
  psychic:{ fighting:2, poison:2, psychic:0.5, steel:0.5, dark:0 },
  bug:{ fire:0.5, grass:2, fighting:0.5, poison:0.5, flying:0.5, psychic:2, ghost:0.5, dark:2, steel:0.5, fairy:0.5 },
  rock:{ fire:2, ice:2, fighting:0.5, ground:0.5, flying:2, bug:2, steel:0.5 },
  ghost:{ normal:0, psychic:2, dark:0.5 },
  dragon:{ dragon:2, steel:0.5, fairy:0 },
  dark:{ fighting:0.5, psychic:2, ghost:2, dark:0.5, fairy:0.5 },
  steel:{ fire:0.5, water:0.5, electric:0.5, ice:2, rock:2, fairy:2, steel:0.5 },
  fairy:{ fire:0.5, fighting:2, poison:0.5, dragon:2, dark:2, steel:0.5 },
};

function multiplyAgainst(defTypes: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const atk of TYPES) {
    let m = 1;
    for (const d of defTypes) m *= (CHART[atk]?.[d] ?? 1);
    out[atk] = m;
  }
  return out;
}

/* =========================
   取得對手屬性（支援中文）
   ========================= */
async function fetchTypesByName(name: string): Promise<string[] | null> {
  const maybeEn = await translateNameToEnglish(name);
  const en = maybeEn ?? name.trim().toLowerCase();
  const key = `poke_types_${en}`;
  const cached = localStorage.getItem(key);
  if (cached) return JSON.parse(cached);
  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(en)}`);
    if (!resp.ok) throw new Error("not ok");
    const data = await resp.json();
    const types = (data.types as any[]).map((t:any)=> t.type.name);
    localStorage.setItem(key, JSON.stringify(types));
    return types;
  } catch {
    return null;
  }
}

/* =========================
   主畫面
   ========================= */
export default function App(){
  // --- 對手查詢 ---
  const [enemyName, setEnemyName] = useState("");
  const [enemyTypes, setEnemyTypes] = useState<string[]|null>(null);
  const [loading, setLoading] = useState(false);
  const [manual, setManual] = useState<string[]>([]); // 手動指定對手屬性（最多 2）

  // --- 我的隊伍（以招式屬性為主） ---
  type TeamMate = { id: string; name: string; moves: string[] };
  const [team, setTeam] = useState<TeamMate[]>(()=>loadJSON("my_team", []));
  useEffect(()=>saveJSON("my_team", team), [team]);

  // 新增隊員暫存
  const [draftName, setDraftName] = useState("");
  const [draftMoves, setDraftMoves] = useState<string[]>([]);

  // --- 相剋計算 ---
  const defTypes = enemyTypes ?? manual;
  const mult = useMemo(
    ()=> defTypes.length? multiplyAgainst(defTypes): null,
    [JSON.stringify(defTypes)]
  );

  const weakList = useMemo(()=>{
    if (!mult) return [] as {type:string,val:number}[];
    return Object.entries(mult)
      .filter(([,v])=>v>1)
      .sort((a,b)=>b[1]-a[1])
      .map(([type,val])=>({type,val}));
  },[mult]);

  const resistList = useMemo(()=>{
    if (!mult) return [] as {type:string,val:number}[];
    return Object.entries(mult)
      .filter(([,v])=>v>0 && v<=0.5)
      .sort((a,b)=> (a[1]-b[1]))
      .map(([type,val])=>({type,val}));
  },[mult]);

  // 依隊伍推薦上場：只要隊員的任何招式屬性出現在弱點清單即可
  const teamSuggest = useMemo(()=>{
    if (!weakList.length || !team.length) return [] as TeamMate[];
    const weakTypes = new Set(weakList.map(w=>w.type));
    return team.filter(m=> m.moves.some(t=> weakTypes.has(t)));
  }, [weakList.map(w=>w.type).join(','), JSON.stringify(team)]);

  async function handleLookup(){
    if (!enemyName.trim()) return;
    setLoading(true);
    const t = await fetchTypesByName(enemyName.trim());
    setEnemyTypes(t);
    setManual([]);
    setLoading(false);
  }

  // 草稿操作
  function toggleDraftType(t:string){
    setDraftMoves(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t]);
  }
  async function bringTypesFromName(){
    if (!draftName.trim()) return;
    const t = await fetchTypesByName(draftName.trim());
    if (t) setDraftMoves(Array.from(new Set([...draftMoves, ...t])));
  }
  function addMate(){
    if (!draftName.trim() || draftMoves.length===0) return;
    const id = `${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
    setTeam([...team, { id, name: draftName.trim(), moves: draftMoves }]);
    setDraftName(""); setDraftMoves([]);
  }
  function removeMate(id:string){ setTeam(team.filter(x=>x.id!==id)); }

  return (
    <div className="min-h-screen bg-white text-zinc-900 p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold">寶可夢屬性相剋查詢器</h1>
      <p className="text-sm text-zinc-600 mb-3">【對手查詢】：輸入對手名稱或手動選屬性，立即看弱點。 <br/>【我的隊伍】：維護你的隊伍招式屬性，幫你推薦上場人選。</p>

      {/* 頁首分頁：對手查詢 / 我的隊伍 */}
      <Tabs defaultValue="enemy" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-3 rounded-xl bg-zinc-100 p-1">
          <TabsTrigger value="enemy" className="text-sm data-[state=active]:bg-zinc-900 data-[state=active]:text-white rounded-lg">對手查詢</TabsTrigger>
          <TabsTrigger value="team" className="text-sm data-[state=active]:bg-zinc-900 data-[state=active]:text-white rounded-lg">我的隊伍</TabsTrigger>
        </TabsList>

        {/* 對手查詢分頁 */}
        <TabsContent value="enemy">
          <Card className="mb-4 rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-base">1) 以名稱查屬性</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-2 items-center mb-2">
                <Input
                  className="h-9 text-sm"
                  placeholder="e.g. pikachu, charizard, meowscarada"
                  value={enemyName}
                  onChange={(e)=>setEnemyName(e.target.value)}
                />
                <Button
                  className="rounded-full min-w-[80px] bg-zinc-900 text-white border border-zinc-900 h-9 px-4 text-sm font-medium hover:bg-zinc-800 active:scale-[.98] transition disabled:opacity-50 disabled:pointer-events-none"
                  onClick={handleLookup}
                  disabled={loading || !enemyName.trim()}
                >
                  {loading ? "查詢中…" : "查屬性"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4 rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-base">2) 或手動選屬性 <span className="text-xs text-zinc-500 align-middle">（可複選最多 2 種防禦屬性）</span></CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-2">
                {TYPES.map(t=> (
                  <button key={t}
                    onClick={()=>{
                      const next = manual.includes(t)? manual.filter(x=>x!==t): [...manual, t].slice(0,2);
                      setManual(next); setEnemyTypes(null);
                    }}
                    className={`px-3 py-1 rounded-full text-sm shadow border ${manual.includes(t)? 'ring-2 ring-black':''} ${TYPE_COLORS[t]||'bg-gray-200 text-black'}`}
                    title={TYPE_ZH[t]}
                  >{TYPE_ZH[t]}</button>
                ))}
              </div>
              <div className="text-sm text-zinc-600">目前：{(enemyTypes??manual).length? (enemyTypes??manual).map(t=> <TypeBadge key={t} t={t} />): '未選擇'}</div>
            </CardContent>
          </Card>

          <Card className="mb-4 rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-base">屬性相剋結果</CardTitle></CardHeader>
            <CardContent>
              {mult ? (
                <>
                  <div className="mb-3">
                    <div className="text-sm font-medium mb-1">弱點（請用下列招式屬性攻擊）：</div>
                    {weakList.length ? weakList.map(s=> <TypeBadge key={s.type} t={s.type} extra={`×${s.val}`} />) : <span className="text-sm text-zinc-500">無明顯弱點</span>}
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">抗性（盡量避免用這些屬性攻擊）：</div>
                    {resistList.length ? resistList.map(s=> <TypeBadge key={s.type} t={s.type} extra={`0.5×`} />) : <span className="text-sm text-zinc-500">無顯著抗性</span>}
                  </div>
                </>
              ): <div className="text-sm text-zinc-500">請先輸入對手名稱或手動選屬性。</div>}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-base">依我的隊伍推薦上場</CardTitle></CardHeader>
            <CardContent>
              {teamSuggest.length? (
                <ul className="list-disc pl-5 space-y-1">
                  {teamSuggest.map(m=> (
                    <li key={m.id} className="text-sm">
                      <span className="font-medium mr-2">{m.name}</span>
                      {m.moves.map(t=> <TypeBadge key={m.id+t} t={t} />)}
                    </li>
                  ))}
                </ul>
              ): <div className="text-sm text-zinc-500">尚未新增隊伍。請至「我的隊伍」分頁新增。</div>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 我的隊伍分頁 */}
        <TabsContent value="team">
          <Card className="mb-4 rounded-2xl">
              <CardHeader className="pb-2">
    <CardTitle className="text-base">新增我的寶可夢隊員</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-xs text-zinc-500 mb-2">
      提示：輸入寶可夢名稱後點右側按鈕，系統會自動抓取屬性並加入隊伍。
    </div>

    {/* 名稱輸入 + 右側合併按鈕 */}
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
          if (!draftName.trim()) return;
          const types = await fetchTypesByName(draftName.trim());
          if (types) {
            const newMate = {
              id: `${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
              name: draftName.trim(),
              moves: types,
            };
            setTeam((prev) => [...prev, newMate]);
            setDraftName("");
          }
        }}
        disabled={loading || !draftName.trim()}
      >
        加入
      </Button>
    </div>

    {/* （保留）型色按鈕區：你若仍想手動挑戰術屬性可以留著；不需要也可刪整段 */}
    <div className="flex flex-wrap gap-2 mb-3">
      {TYPES.map((t) => (
        <button
          key={t}
          onClick={() =>
            setDraftMoves((prev) =>
              prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
            )
          }
          className={`px-3 py-1 rounded-full text-sm shadow border ${
            draftMoves.includes(t) ? "ring-2 ring-black" : ""
          } ${TYPE_COLORS[t] || "bg-gray-200 text-black"}`}
        >
          {TYPE_ZH[t]}
        </button>
      ))}
    </div>
  </CardContent>
</Card>


          <Card className="rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-base">我的隊伍</CardTitle></CardHeader>
            <CardContent>
              {team.length? (
                <ul className="space-y-2">
                  {team.map(m=> (
                    <li key={m.id} className="flex items-center justify-between bg-zinc-50 border rounded-xl p-2">
                      <div>
                        <div className="text-sm font-medium">{m.name}</div>
                        <div>
                          {m.moves.map(t=> <TypeBadge key={m.id+':'+t} t={t} />)}
                        </div>
                      </div>
                      <Button className="h-9 px-3" variant="destructive" onClick={()=>removeMate(m.id)}>刪除</Button>
                    </li>
                  ))}
                </ul>
              ): <div className="text-sm text-zinc-500">尚無成員，請先新增。</div>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <footer className="text-[10px] text-zinc-400 mt-6">資料來源：PokeAPI。第一次用中文名稱查詢時會建立索引並快取到本機。</footer>
    </div>
  );
}
