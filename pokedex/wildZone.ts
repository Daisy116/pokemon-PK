// src/wildZone.ts

export type MonId = string;

export type ZoneMon = {
  id: MonId;
  displayName: string;
  enName?: string;
  types?: string[];
  image?: string;
  alpha?: boolean;
};

export type WildZone = {
  zoneNo: number;
  mons: ZoneMon[];
};

const spriteUrlByDex = (dex: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dex}.png`;

export const WILD_ZONES: WildZone[] = [
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
