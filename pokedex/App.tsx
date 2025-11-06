import React, { useEffect, useMemo, useState } from "react";

/**
 * Pokémon 野生特區小程序
 *
 * ✅ 功能
 * 1) 「野生特區」分區列表（1~20）：
 *    - 勾選我已捕捉的物種（支援搜尋 / 篩選 / 展開摺疊）
 *    - 將物種加入隊伍
 *    - 標記是否為頭目級（Alpha）
 * 2) 「進化圖鑑（依隊伍）」：列出目前隊伍中尚可進化者及條件
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
  一般: "bg-zinc-200 text-zinc-800",  火: "bg-red-200 text-red-800",  水: "bg-blue-200 text-blue-800",  草: "bg-green-200 text-green-800",  電: "bg-yellow-200 text-yellow-800",  冰: "bg-cyan-200 text-cyan-800",  格鬥: "bg-orange-200 text-orange-800",毒: "bg-fuchsia-200 text-fuchsia-800",地面: "bg-amber-200 text-amber-900",  飛行: "bg-indigo-200 text-indigo-800",  超能力: "bg-pink-200 text-pink-800",  蟲: "bg-lime-200 text-lime-800",岩石: "bg-stone-300 text-stone-800",  幽靈: "bg-purple-200 text-purple-800",  龍: "bg-sky-300 text-sky-900",  惡: "bg-slate-300 text-slate-900",鋼: "bg-gray-300 text-gray-900",  妖精: "bg-rose-200 text-rose-800",};

// 中文屬性 → 英文屬性（給 my_team 的 moves 用）
const TYPE_ZH_TO_EN: Record<string, string> = {
  一般: "normal",  火: "fire",  水: "water",  草: "grass",  電: "electric",  冰: "ice",  格鬥: "fighting",  毒: "poison",  地面: "ground",  飛行: "flying",超能力: "psychic",  蟲: "bug",  岩石: "rock",  幽靈: "ghost",  龍: "dragon",  惡: "dark",  鋼: "steel",  妖精: "fairy",};

// 和根目錄 App 共用的 my_team 格式
type MyTeamEntry = { id: string; name: string; moves: string[]; dex?: number };
const MY_TEAM_KEY = "my_team";

// ------------------------------
// DATA
// ------------------------------

export type MonId = string;

type ZoneMon = {
  id: MonId;
  displayName: string; // 顯示名稱（中文）
  enName?: string; // 英文名（次要顯示）
  types?: string[]; // 屬性（中文）
  image?: string; // 小圖 URL
  alpha?: boolean; // 是否為頭目級（可手動切換）
};

type WildZone = {
  zoneNo: number;
  mons: ZoneMon[];
};

const WILD_ZONES: WildZone[] = [
  {
    zoneNo: 1,
    mons: [
      { id: "weedle", displayName: "獨角蟲", enName: "Weedle", types: ["蟲", "毒"], image: spriteUrlByDex(13) },
      { id: "pichu", displayName: "皮丘", enName: "Pichu", types: ["電"], image: spriteUrlByDex(172) },
      { id: "scatterbug", displayName: "粉蝶蟲", enName: "Scatterbug", types: ["蟲"], image: spriteUrlByDex(664) },
      { id: "fletchling", displayName: "小箭雀", enName: "Fletchling", types: ["一般", "飛行"], image: spriteUrlByDex(661) },
      { id: "pidgey", displayName: "波波", enName: "Pidgey", types: ["一般", "飛行"], image: spriteUrlByDex(16), alpha: true },
      { id: "mareep", displayName: "咩利羊", enName: "Mareep", types: ["電"], image: spriteUrlByDex(179) },
      { id: "bunnelby", displayName: "掘掘兔", enName: "Bunnelby", types: ["一般"], image: spriteUrlByDex(659) },
    ],
  },
  {
    zoneNo: 2,
    mons: [
      { id: "kakuna", displayName: "鐵殼蛹", enName: "Kakuna", types: ["蟲", "毒"], image: spriteUrlByDex(14) },
      { id: "patrat", displayName: "探探鼠", enName: "Patrat", types: ["一般"], image: spriteUrlByDex(504) },
      { id: "binacle", displayName: "龜腳腳", enName: "Binacle", types: ["岩石", "水"], image: spriteUrlByDex(688) },
      { id: "staryu", displayName: "海星星", enName: "Staryu", types: ["水"], image: spriteUrlByDex(120), alpha: true },
      { id: "magikarp", displayName: "鯉魚王", enName: "Magikarp", types: ["水"], image: spriteUrlByDex(129), alpha: true },
      { id: "budew", displayName: "含羞苞", enName: "Budew", types: ["草", "毒"], image: spriteUrlByDex(406) },
    ],
  },
  {
    zoneNo: 3,
    mons: [
      { id: "skiddo", displayName: "坐騎小羊", enName: "Skiddo", types: ["草"], image: spriteUrlByDex(672) },
      { id: "pancham", displayName: "頑皮熊貓", enName: "Pancham", types: ["格鬥"], image: spriteUrlByDex(674) },
      { id: "litleo", displayName: "小獅獅", enName: "Litleo", types: ["火", "一般"], image: spriteUrlByDex(667), alpha: true },
      { id: "espurr", displayName: "妙喵", enName: "Espurr", types: ["超能力"], image: spriteUrlByDex(677) },
      { id: "flabebe", displayName: "花蓓蓓", enName: "Flabébé", types: ["妖精"], image: spriteUrlByDex(669) },
      { id: "pikachu", displayName: "皮卡丘", enName: "Pikachu", types: ["電"], image: spriteUrlByDex(25) },
    ],
  },
  {
    zoneNo: 4,
    mons: [
      { id: "patrat", displayName: "探探鼠", enName: "Patrat", types: ["一般"], image: spriteUrlByDex(504) },
      { id: "gastly", displayName: "鬼斯", enName: "Gastly", types: ["幽靈", "毒"], image: spriteUrlByDex(92) },
      { id: "honedge", displayName: "獨劍鞘", enName: "Honedge", types: ["鋼", "幽靈"], image: spriteUrlByDex(679) },
      { id: "spewpa", displayName: "粉蝶蛹", enName: "Spewpa", types: ["蟲"], image: spriteUrlByDex(665) },
      { id: "ekans", displayName: "阿柏蛇", enName: "Ekans", types: ["毒"], image: spriteUrlByDex(23) },
      { id: "spinarak", displayName: "圓絲蛛", enName: "Spinarak", types: ["蟲", "毒"], image: spriteUrlByDex(167), alpha: true },
    ],
  },
  {
    zoneNo: 5,
    mons: [
      { id: "pidgeotto", displayName: "比比鳥", enName: "Pidgeotto", types: ["一般", "飛行"], image: spriteUrlByDex(17) },
      { id: "venipede", displayName: "百足蜈蚣", enName: "Venipede", types: ["蟲", "毒"], image: spriteUrlByDex(543) },
      { id: "electrike", displayName: "落雷獸", enName: "Electrike", types: ["電"], image: spriteUrlByDex(309) },
      { id: "bellsprout", displayName: "喇叭芽", enName: "Bellsprout", types: ["草", "毒"], image: spriteUrlByDex(69), alpha: true },
      { id: "abra", displayName: "凱西", enName: "Abra", types: ["超能力"], image: spriteUrlByDex(63) },
      { id: "pidgey", displayName: "波波", enName: "Pidgey", types: ["一般", "飛行"], image: spriteUrlByDex(16) },
      { id: "bunnelby", displayName: "掘掘兔", enName: "Bunnelby", types: ["一般"], image: spriteUrlByDex(659) },
    ],
  },
  {
    zoneNo: 6,
    mons: [
      { id: "binacle", displayName: "龜腳腳", enName: "Binacle", types: ["岩石", "水"], image: spriteUrlByDex(688) },
      { id: "makuhita", displayName: "瑪沙那", enName: "Makuhita", types: ["格鬥"], image: spriteUrlByDex(296) },
      { id: "buneary", displayName: "捲捲耳", enName: "Buneary", types: ["一般"], image: spriteUrlByDex(427) },
      { id: "magikarp", displayName: "鯉魚王", enName: "Magikarp", types: ["水"], image: spriteUrlByDex(129) },
      { id: "houndour", displayName: "戴魯比", enName: "Houndour", types: ["惡", "火"], image: spriteUrlByDex(228) },
      { id: "swablu", displayName: "青綿鳥", enName: "Swablu", types: ["一般", "飛行"], image: spriteUrlByDex(333) },
      { id: "wooloo", displayName: "茸茸羊", enName: "Wooloo", types: ["一般"], image: spriteUrlByDex(831) },
    ],
  },
  {
    zoneNo: 7,
    mons: [
      { id: "hippopotas", displayName: "沙河馬", enName: "Hippopotas", types: ["地面"], image: spriteUrlByDex(449) },
      { id: "audino", displayName: "差不多娃娃", enName: "Audino", types: ["一般"], image: spriteUrlByDex(531) },
      { id: "vanillite", displayName: "迷你冰", enName: "Vanillite", types: ["冰"], image: spriteUrlByDex(582) },
      { id: "kakuna", displayName: "鐵殼蛹", enName: "Kakuna", types: ["蟲", "毒"], image: spriteUrlByDex(14) },
      { id: "lilligant", displayName: "花葉蒂", enName: "Lilligant", types: ["草"], image: spriteUrlByDex(549) },
      { id: "roselia", displayName: "毒薔薇", enName: "Roselia", types: ["草", "毒"], image: spriteUrlByDex(315) },
      { id: "shuppet", displayName: "怨影娃娃", enName: "Shuppet", types: ["幽靈"], image: spriteUrlByDex(353) },
    ],
  },
  {
    zoneNo: 8,
    mons: [
      { id: "sandile", displayName: "混混鱷", enName: "Sandile", types: ["地面", "惡"], image: spriteUrlByDex(551), alpha: true },
      { id: "krokorok", displayName: "黑眼鱷", enName: "Krokorok", types: ["地面", "惡"], image: spriteUrlByDex(552) },
      { id: "gible", displayName: "圓陸鯊", enName: "Gible", types: ["龍", "地面"], image: spriteUrlByDex(443) },
      { id: "drilbur", displayName: "螺釘地鼠", enName: "Drilbur", types: ["地面"], image: spriteUrlByDex(529) },
      { id: "machop", displayName: "腕力", enName: "Machop", types: ["格鬥"], image: spriteUrlByDex(66) },
      { id: "numel", displayName: "呆火駝", enName: "Numel", types: ["火", "地面"], image: spriteUrlByDex(322) },
    ],
  },
  {
    zoneNo: 9,
    mons: [
      { id: "carbink", displayName: "小碎鑽", enName: "Carbink", types: ["岩石", "妖精"], image: spriteUrlByDex(703) },
      { id: "espurr", displayName: "妙喵", enName: "Espurr", types: ["超能力"], image: spriteUrlByDex(677) },
      { id: "fletchinder", displayName: "火箭雀", enName: "Fletchinder", types: ["火", "飛行"], image: spriteUrlByDex(662) },
      { id: "kadabra", displayName: "勇基拉", enName: "Kadabra", types: ["超能力"], image: spriteUrlByDex(64) },
      { id: "sableye", displayName: "勾魂眼", enName: "Sableye", types: ["惡", "幽靈"], image: spriteUrlByDex(302) },
      { id: "mawile", displayName: "大嘴娃", enName: "Mawile", types: ["鋼", "妖精"], image: spriteUrlByDex(303) },
    ],
  },
  {
    zoneNo: 10,
    mons: [
      { id: "slowpoke", displayName: "呆呆獸", enName: "Slowpoke", types: ["水", "超能力"], image: spriteUrlByDex(79) },
      { id: "arbok", displayName: "阿柏怪", enName: "Arbok", types: ["毒"], image: spriteUrlByDex(24) },
      { id: "watchog", displayName: "步哨鼠", enName: "Watchog", types: ["一般"], image: spriteUrlByDex(505) },
      { id: "bellsprout", displayName: "喇叭芽", enName: "Bellsprout", types: ["草", "毒"], image: spriteUrlByDex(69) },
      { id: "carvanha", displayName: "利牙魚", enName: "Carvanha", types: ["水", "惡"], image: spriteUrlByDex(318) },
      { id: "staryu", displayName: "海星星", enName: "Staryu", types: ["水"], image: spriteUrlByDex(120) },
      { id: "helioptile", displayName: "麻麻小魚", enName: "Helioptile", types: ["電", "一般"], image: spriteUrlByDex(694) },
    ],
  },
  {
    zoneNo: 11,
    mons: [
      { id: "gyarados", displayName: "爆鱺龍", enName: "Gyarados", types: ["水", "飛行"], image: spriteUrlByDex(130) },
      { id: "clauncher", displayName: "鐵臂槍蝦", enName: "Clauncher", types: ["水"], image: spriteUrlByDex(692) },
      { id: "glameow", displayName: "多麗米亞", enName: "Glameow", types: ["一般"], image: spriteUrlByDex(431) },
      { id: "malamar", displayName: "好啦魷", enName: "Malamar", types: ["惡", "超能力"], image: spriteUrlByDex(687) },
      { id: "carvanha", displayName: "利牙魚", enName: "Carvanha", types: ["水", "惡"], image: spriteUrlByDex(318) },
      { id: "slowpoke", displayName: "呆呆獸", enName: "Slowpoke", types: ["水", "超能力"], image: spriteUrlByDex(79) },
      { id: "stunfisk", displayName: "泥巴魚", enName: "Stunfisk", types: ["地面", "電"], image: spriteUrlByDex(618) },
    ],
  },
  {
    zoneNo: 12,
    mons: [
      { id: "delibird", displayName: "信使鳥", enName: "Delibird", types: ["冰", "飛行"], image: spriteUrlByDex(225) },
      { id: "machop", displayName: "腕力", enName: "Machop", types: ["格鬥"], image: spriteUrlByDex(66) },
      { id: "snover", displayName: "雪笠怪", enName: "Snover", types: ["草", "冰"], image: spriteUrlByDex(459) },
      { id: "cubchoo", displayName: "冰寶", enName: "Cubchoo", types: ["冰"], image: spriteUrlByDex(613) },
      { id: "vanillite", displayName: "迷你冰", enName: "Vanillite", types: ["冰"], image: spriteUrlByDex(582) },
      { id: "gogoat", displayName: "坐騎山羊", enName: "Gogoat", types: ["草"], image: spriteUrlByDex(673) },
      { id: "snorunt", displayName: "雪童子", enName: "Snorunt", types: ["冰"], image: spriteUrlByDex(361) },
      { id: "machoke", displayName: "豪力", enName: "Machoke", types: ["格鬥"], image: spriteUrlByDex(67) },
    ],
  },
  {
    zoneNo: 13,
    mons: [
      { id: "phantump", displayName: "小木靈", enName: "Phantump", types: ["幽靈", "草"], image: spriteUrlByDex(708) },
      { id: "vivillon", displayName: "彩粉蝶", enName: "Vivillon", types: ["蟲", "飛行"], image: spriteUrlByDex(666) },
      { id: "heracross", displayName: "赫拉克羅斯", enName: "Heracross", types: ["蟲", "格鬥"], image: spriteUrlByDex(214) },
      { id: "pinsir", displayName: "凱羅斯", enName: "Pinsir", types: ["蟲"], image: spriteUrlByDex(127) },
      { id: "gulpin", displayName: "口呆朵", enName: "Gulpin", types: ["毒"], image: spriteUrlByDex(316) },
      { id: "scyther", displayName: "飛天螳螂", enName: "Scyther", types: ["蟲", "飛行"], image: spriteUrlByDex(123) },
      { id: "machoke", displayName: "豪力", enName: "Machoke", types: ["格鬥"], image: spriteUrlByDex(67) },
    ],
  },
  {
    zoneNo: 14,
    mons: [
      { id: "heliolisk", displayName: "傘電蜥", enName: "Heliolisk", types: ["電", "一般"], image: spriteUrlByDex(695) },
      { id: "drilbur", displayName: "螺釘地鼠", enName: "Drilbur", types: ["地面"], image: spriteUrlByDex(529) },
      { id: "onix", displayName: "大岩蛇", enName: "Onix", types: ["岩石", "地面"], image: spriteUrlByDex(95) },
      { id: "aron", displayName: "可可多拉", enName: "Aron", types: ["鋼", "岩石"], image: spriteUrlByDex(304) },
      { id: "lairon", displayName: "可多拉", enName: "Lairon", types: ["鋼", "岩石"], image: spriteUrlByDex(305) },
      { id: "excadrill", displayName: "龍頭地鼠", enName: "Excadrill", types: ["地面", "鋼"], image: spriteUrlByDex(530) },
      { id: "emolga", displayName: "電飛鼠", enName: "Emolga", types: ["電", "飛行"], image: spriteUrlByDex(587) },
    ],
  },
  {
    zoneNo: 15,
    mons: [
      { id: "pumpkaboo", displayName: "南瓜精", enName: "Pumpkaboo", types: ["幽靈", "草"], image: spriteUrlByDex(710) },
      { id: "shuppet", displayName: "怨影娃娃", enName: "Shuppet", types: ["幽靈"], image: spriteUrlByDex(353) },
      { id: "scolipede", displayName: "蜈蚣王", enName: "Scolipede", types: ["蟲", "毒"], image: spriteUrlByDex(545) },
      { id: "haunter", displayName: "鬼斯通", enName: "Haunter", types: ["幽靈", "毒"], image: spriteUrlByDex(93) },
      { id: "whirlipede", displayName: "車輪毯", enName: "Whirlipede", types: ["蟲", "毒"], image: spriteUrlByDex(544) },
      { id: "beedrill", displayName: "大針蜂", enName: "Beedrill", types: ["蟲", "毒"], image: spriteUrlByDex(15) },
      { id: "larvitar", displayName: "幼基拉斯", enName: "Larvitar", types: ["岩石", "地面"], image: spriteUrlByDex(246) },
    ],
  },
  {
    zoneNo: 16,
    mons: [
      { id: "falinks", displayName: "列陣兵", enName: "Falinks", types: ["格鬥"], image: spriteUrlByDex(870) },
      { id: "wooloo", displayName: "茸茸羊", enName: "Wooloo", types: ["一般"], image: spriteUrlByDex(831) },
      { id: "starmie", displayName: "寶石海星", enName: "Starmie", types: ["水", "超能力"], image: spriteUrlByDex(121) },
      { id: "barbaracle", displayName: "龜足巨鎧", enName: "Barbaracle", types: ["岩石", "水"], image: spriteUrlByDex(689) },
      { id: "medicham", displayName: "恰雷姆", enName: "Medicham", types: ["格鬥", "超能力"], image: spriteUrlByDex(308) },
      { id: "florges", displayName: "花潔夫人", enName: "Florges", types: ["妖精"], image: spriteUrlByDex(671) },
      { id: "froakie", displayName: "呱呱泡蛙", enName: "Froakie", types: ["水"], image: spriteUrlByDex(656) },
    ],
  },
  {
    zoneNo: 17,
    mons: [
      { id: "klefki", displayName: "鑰圈兒", enName: "Klefki", types: ["鋼", "妖精"], image: spriteUrlByDex(707) },
      { id: "lampent", displayName: "燈火幽靈", enName: "Lampent", types: ["幽靈", "火"], image: spriteUrlByDex(608) },
      { id: "skarmory", displayName: "盔甲鳥", enName: "Skarmory", types: ["鋼", "飛行"], image: spriteUrlByDex(227) },
      { id: "pyroar", displayName: "火炎獅", enName: "Pyroar", types: ["火", "一般"], image: spriteUrlByDex(668) },
      { id: "diggersby", displayName: "掘地兔", enName: "Diggersby", types: ["一般", "地面"], image: spriteUrlByDex(660) },
      { id: "chespin", displayName: "哈力栗", enName: "Chespin", types: ["草"], image: spriteUrlByDex(650) },
    ],
  },
  {
    zoneNo: 18,
    mons: [
      { id: "noibat", displayName: "嗡蝠", enName: "Noibat", types: ["飛行", "龍"], image: spriteUrlByDex(714) },
      { id: "fennekin", displayName: "火狐狸", enName: "Fennekin", types: ["火"], image: spriteUrlByDex(653) },
      { id: "bagon", displayName: "寶貝龍", enName: "Bagon", types: ["龍"], image: spriteUrlByDex(371) },
      { id: "altaria", displayName: "七夕青鳥", enName: "Altaria", types: ["龍", "飛行"], image: spriteUrlByDex(334) },
      { id: "noivern", displayName: "音波龍", enName: "Noivern", types: ["飛行", "龍"], image: spriteUrlByDex(715) },
      { id: "swablu", displayName: "青綿鳥", enName: "Swablu", types: ["一般", "飛行"], image: spriteUrlByDex(333) },
    ],
  },
  {
    zoneNo: 19,
    mons: [
      { id: "eevee", displayName: "伊布", enName: "Eevee", types: ["一般"], image: spriteUrlByDex(133) },
      { id: "glameow", displayName: "多麗米亞", enName: "Glameow", types: ["一般"], image: spriteUrlByDex(431) },
      { id: "drampa", displayName: "老翁龍", enName: "Drampa", types: ["一般", "龍"], image: spriteUrlByDex(780) },
      { id: "kangaskhan", displayName: "袋獸", enName: "Kangaskhan", types: ["一般"], image: spriteUrlByDex(115) },
      { id: "audino", displayName: "差不多娃娃", enName: "Audino", types: ["一般"], image: spriteUrlByDex(531) },
      { id: "clefairy", displayName: "皮皮", enName: "Clefairy", types: ["妖精"], image: spriteUrlByDex(35) },
      { id: "cleffa", displayName: "皮寶寶", enName: "Cleffa", types: ["妖精"], image: spriteUrlByDex(173) },
    ],
  },
  {
    zoneNo: 20,
    mons: [
      { id: "malamar", displayName: "烏賊王", enName: "Malamar", types: ["惡", "超能力"], image: spriteUrlByDex(687) },
      { id: "dragalge", displayName: "毒藻龍", enName: "Dragalge", types: ["毒", "龍"], image: spriteUrlByDex(691) },
      { id: "charmander", displayName: "小火龍", enName: "Charmander", types: ["火"], image: spriteUrlByDex(4) },
      { id: "tepig", displayName: "暖暖豬", enName: "Tepig", types: ["火"], image: spriteUrlByDex(498) },
      { id: "lucario", displayName: "路卡利歐", enName: "Lucario", types: ["格鬥", "鋼"], image: spriteUrlByDex(448) },
      { id: "hippowdon", displayName: "河馬獸", enName: "Hippowdon", types: ["地面"], image: spriteUrlByDex(450) },
      { id: "squirtle", displayName: "傑尼龜", enName: "Squirtle", types: ["水"], image: spriteUrlByDex(7) },
      { id: "totodile", displayName: "小鋸鱷", enName: "Totodile", types: ["水"], image: spriteUrlByDex(158) },
      { id: "bulbasaur", displayName: "妙蛙種子", enName: "Bulbasaur", types: ["草", "毒"], image: spriteUrlByDex(1) },
      { id: "roserade", displayName: "羅絲雷朵", enName: "Roserade", types: ["草", "毒"], image: spriteUrlByDex(407) },
      { id: "gardevoir", displayName: "沙奈朵", enName: "Gardevoir", types: ["超能力", "妖精"], image: spriteUrlByDex(282) },
      { id: "chikorita", displayName: "菊草葉", enName: "Chikorita", types: ["草"], image: spriteUrlByDex(152) },
      { id: "aggron", displayName: "波士可多拉", enName: "Aggron", types: ["鋼", "岩石"], image: spriteUrlByDex(306) },
      { id: "pancham", displayName: "頭巾混混", enName: "Pancham", types: ["格鬥"], image: spriteUrlByDex(674) },
      { id: "garbodor", displayName: "灰塵山", enName: "Garbodor", types: ["毒"], image: spriteUrlByDex(569) },
    ],
  },
];

// 固定頭目（暫時沒用到，但先保留）
const FIXED_ALPHAS: ZoneMon[] = [
  { id: "alpha-starmie", displayName: "寶石海星", enName: "Starmie", types: ["水", "超能力"], image: spriteUrlByDex(121) },
  { id: "alpha-snorlax", displayName: "卡比獸", enName: "Snorlax", types: ["一般"], image: spriteUrlByDex(143) },
  { id: "alpha-rapidash", displayName: "烈焰馬", enName: "Rapidash", types: ["火"], image: spriteUrlByDex(78) },
  { id: "alpha-gyarados", displayName: "暴鯉龍", enName: "Gyarados", types: ["水", "飛行"], image: spriteUrlByDex(130) },
  { id: "alpha-scyther", displayName: "飛天螳螂", enName: "Scyther", types: ["蟲", "飛行"], image: spriteUrlByDex(123) },
];

// 進化條件：使用「中文名字」對應 displayName
type EvolutionRecord = { from: string; to: string; condition: string };

const EVOLUTIONS: EvolutionRecord[] = [
  { from: "伊布", to: "水伊布", condition: "使用水之石" },
  { from: "伊布", to: "雷伊布", condition: "使用雷之石" },
  { from: "伊布", to: "月伊布", condition: "高好感＋夜晚升級" },
  { from: "伊布", to: "太陽伊布", condition: "高好感＋白天升級" },
  { from: "利歐路", to: "路卡利歐", condition: "高好感＋白天升級" },

  // 範例：菊草葉 → 月桂葉 → 大竺葵 → 超級大竺葵
  { from: "菊草葉", to: "月桂葉", condition: "等級 16" },
  { from: "月桂葉", to: "大竺葵", condition: "等級 32" },
  { from: "大竺葵", to: "超級大竺葵", condition: "持有超級石進化" },
  { from: "獨角蟲", to: "鐵殼蛹", condition: "等級 7" },
  { from: "鐵殼蛹", to: "大針蜂", condition: "等級 10" },
  { from: "大針蜂", to: "超級大針蜂", condition: "主任務16，持有超級石進化" },

  // ...請依官方/攻略補齊 ZA 版本特殊條件（記得 from / to 用「中文名字」）
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

const TabBtn: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({
  active,
  onClick,
  children,
}) => (
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

const Tag: React.FC<{ children: React.ReactNode; typeName?: string }> = ({ children, typeName }) => (
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
  const [caughtFilter, setCaughtFilter] = useState<"all" | "caught" | "uncaught">("all");

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

  const toggleAlpha = (id: MonId) => setAlphaMap((m) => ({ ...m, [id]: !m[id] }));

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

  const clearTeam = () => setTeam([]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 p-3 sm:p-6">
      <header className="mb-4">
        <h1 className="text-xl font-bold">Pokémon Legends ZA — 野生特區小程序</h1>
        <p className="text-sm text-zinc-600">快速勾選已捕捉、加入隊伍與進化條件。</p>
      </header>

      <div className="flex items-center gap-2 mb-4">
        <TabBtn active={activeTab === "zones"} onClick={() => setActiveTab("zones")}>
          野生特區
        </TabBtn>
        <TabBtn active={activeTab === "evo"} onClick={() => setActiveTab("evo")}>
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
              onChange={(e) => setCaughtFilter(e.target.value as any)}
              className="rounded-lg border border-zinc-200 px-2 py-2 text-xs"
            >
              <option value="all">全部</option>
              <option value="caught">只顯示已捕捉</option>
              <option value="uncaught">只顯示未捕捉</option>
            </select>
          </div>
        </div>

        {/* 我的隊伍 */}
        <TeamBar team={team} onRemove={removeFromTeam} onClear={clearTeam} alphaMap={alphaMap} />
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
        <EvolutionView evolutions={EVOLUTIONS} team={team} flatMons={flatMons} />
      )}

      <footer className="mt-8 text-[11px] text-zinc-500">
        資料暫存於本機（localStorage）。如需重置，請清除瀏覽器儲存或於程式中更換 LS_KEYS 前綴。
      </footer>
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
}> = ({ zones, alphaMap, onlyAlpha, q, onToggleAlpha, onAddTeam, inTeam, caughtFilter }) => {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const init: Record<number, boolean> = {};
    zones.forEach((z) => (init[z.zoneNo] = true));
    setOpen(init);
  }, [zones]);

  const matchQ = (name: string) => name.toLowerCase().includes(q.trim().toLowerCase());

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
          <div key={z.zoneNo} className="rounded-2xl border border-zinc-200 overflow-hidden">
            <div className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50">
              {/* 左邊：點這裡收起 / 展開 */}
              <button
                className="flex-1 flex items-center justify-between hover:bg-zinc-100 rounded-xl text-left pr-3"
                onClick={() => setOpen((o) => ({ ...o, [z.zoneNo]: !o[z.zoneNo] }))}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-zinc-900 text-white grid place-items-center text-sm">
                    {z.zoneNo}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">野生特區 {z.zoneNo}</div>
                    <div className="text-[11px] text-zinc-500">{z.mons.length} 種</div>
                  </div>
                </div>
                <div className="text-xs text-zinc-600">{open[z.zoneNo] ? "收起" : "展開"}</div>
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
                            <span className="text-[10px] text-zinc-500">{m.enName}</span>
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
}> = ({ evolutions, team, flatMons }) => {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<EvoCategory>("全部");

  const cats: EvoCategory[] = ["全部", "等級", "道具", "好感", "通訊進化"];

  const teamNames = useMemo(() => new Set(team.map((t) => t.name)), [team]);

  const groups = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    const map = new Map<
      string,
      {
        fromMon: ZoneMon | null;
        records: { record: EvolutionRecord; toMon: ZoneMon | null; cat: EvoCategory }[];
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
      const fromMon = current?.fromMon ?? flatMons.find((m) => m.displayName === r.from) ?? null;
      const toMon = flatMons.find((m) => m.displayName === r.to) ?? null;

      const next = current ?? { fromMon, records: [] };
      next.records.push({ record: r, toMon, cat: condCat });
      map.set(r.from, next);
    });

    return Array.from(map.entries()).map(([fromName, data]) => ({
      fromName,
      fromMon: data.fromMon,
      records: data.records,
    }));
  }, [evolutions, teamNames, q, category, flatMons]);

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
            value={q}
            onChange={(e) => setQ(e.target.value)}
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
              <h3 className="text-sm font-semibold text-zinc-900">{fromName} 的下一步進化</h3>
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
                      <span className="mt-1 text-[11px] text-zinc-500">{record.condition}</span>
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
}> = ({ team, onRemove, onClear, alphaMap }) => {
  const allMons = useMemo(() => {
    const list: ZoneMon[] = [];
    WILD_ZONES.forEach((z) => z.mons.forEach((m) => list.push(m)));
    return list;
  }, []);

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
          {team.map((member) => {
            const mon =
              allMons.find((m) => m.displayName === member.name) || null;

            return (
              <div
                key={member.id}
                className="relative flex items-center rounded-xl border border-zinc-200 p-2 bg-white"
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
                  onClick={() => onRemove(member.id)}
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