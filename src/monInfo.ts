// src/monInfo.ts

// 跟 wildZone.ts 用同一套中文屬性字串
export type BasicMonInfo = {
  nameZh: string;
  nameEn: string;
  dex: number;
  types: string[];
};

// 這個物件會被 EvolutionView 拿來補圖＆屬性
// key = 中文名（EVOLUTIONS 裡的 from / to）
export const MONDEX_BY_NAME_ZH: Record<string, BasicMonInfo> = {
  // ===== 伊布家族 =====
  "伊布":  { nameZh: "伊布",  nameEn: "Eevee",     dex: 133, types: ["一般"] },
  "水伊布": { nameZh: "水伊布", nameEn: "Vaporeon", dex: 134, types: ["水"] },
  "雷伊布": { nameZh: "雷伊布", nameEn: "Jolteon",  dex: 135, types: ["電"] },
  "火伊布": { nameZh: "火伊布", nameEn: "Flareon",  dex: 136, types: ["火"] },
  "太陽伊布": { nameZh: "太陽伊布", nameEn: "Espeon",  dex: 196, types: ["超能力"] },
  "月伊布":   { nameZh: "月伊布",   nameEn: "Umbreon", dex: 197, types: ["惡"] },
  "葉伊布":   { nameZh: "葉伊布",   nameEn: "Leafeon", dex: 470, types: ["草"] },
  "冰伊布":   { nameZh: "冰伊布",   nameEn: "Glaceon", dex: 471, types: ["冰"] },
  "仙子伊布": { nameZh: "仙子伊布", nameEn: "Sylveon", dex: 700, types: ["妖精"] },


  "電龍": {
    nameZh: "電龍",
    nameEn: "Ampharos",
    dex: 181,
    types: ["電"],
  },
  "暴鯉龍": {
    nameZh: "暴鯉龍",
    nameEn: "Gyarados",
    dex: 130,
    types: ["水", "飛行"],
  },

  // ===== 利歐路 → 路卡利歐 =====
  "利歐路": {
    nameZh: "利歐路",
    nameEn: "Riolu",
    dex: 447,
    types: ["格鬥"],
  },
  "路卡利歐": {
    nameZh: "路卡利歐",
    nameEn: "Lucario",
    dex: 448,
    types: ["格鬥", "鋼"],
  },

  // ===== 小鋸鱷 → 藍鱷 → 大力鱷 =====
  "小鋸鱷": {
    nameZh: "小鋸鱷",
    nameEn: "Totodile",
    dex: 158,
    types: ["水"],
  },
  "藍鱷": {
    nameZh: "藍鱷",
    nameEn: "Croconaw",
    dex: 159,
    types: ["水"],
  },
  "大力鱷": {
    nameZh: "大力鱷",
    nameEn: "Feraligatr",
    dex: 160,
    types: ["水"],
  },

  // ===== 小火龍 → 火恐龍 → 噴火龍 =====
  "小火龍": {
    nameZh: "小火龍",
    nameEn: "Charmander",
    dex: 4,
    types: ["火"],
  },
  "火恐龍": {
    nameZh: "火恐龍",
    nameEn: "Charmeleon",
    dex: 5,
    types: ["火"],
  },
  "噴火龍": {
    nameZh: "噴火龍",
    nameEn: "Charizard",
    dex: 6,
    types: ["火", "飛行"],
  },

  // ===== 傑尼龜 → 卡咪龜 → 水箭龜 =====
  "傑尼龜": {
    nameZh: "傑尼龜",
    nameEn: "Squirtle",
    dex: 7,
    types: ["水"],
  },
  "卡咪龜": {
    nameZh: "卡咪龜",
    nameEn: "Wartortle",
    dex: 8,
    types: ["水"],
  },
  "水箭龜": {
    nameZh: "水箭龜",
    nameEn: "Blastoise",
    dex: 9,
    types: ["水"],
  },

  // ===== 妙蛙種子 → 妙蛙草 → 妙蛙花 =====
  "妙蛙種子": {
    nameZh: "妙蛙種子",
    nameEn: "Bulbasaur",
    dex: 1,
    types: ["草", "毒"],
  },
  "妙蛙草": {
    nameZh: "妙蛙草",
    nameEn: "Ivysaur",
    dex: 2,
    types: ["草", "毒"],
  },
  "妙蛙花": {
    nameZh: "妙蛙花",
    nameEn: "Venusaur",
    dex: 3,
    types: ["草", "毒"],
  },

  "伽勒爾呆呆獸": {
    nameZh: "伽勒爾呆呆獸",
    nameEn: "Galarian Slowpoke",
    dex: 79,
    types: ["超能力"],
    },
    "光電傘蜥": {
    nameZh: "光電傘蜥",
    nameEn: "Heliolisk",
    dex: 695,
    types: ["電", "一般"],
    },
    "冰岩怪": {
    nameZh: "冰岩怪",
    nameEn: "Avalugg",
    dex: 713,
    types: ["冰"],
    },
    "冰雪巨龍": {
    nameZh: "冰雪巨龍",
    nameEn: "Aurorus",
    dex: 699,
    types: ["岩石", "冰"],
    },
    "冰雪龍": {
    nameZh: "冰雪龍",
    nameEn: "Amaura",
    dex: 698,
    types: ["岩石", "冰"],
    },
    "冰鬼護": {
    nameZh: "冰鬼護",
    nameEn: "Froslass",
    dex: 478,
    types: ["冰", "幽靈"],
    },
    "冷水猴": {
    nameZh: "冷水猴",
    nameEn: "Panpour",
    dex: 515,
    types: ["水"],
    },
    "冷水猿": {
    nameZh: "冷水猿",
    nameEn: "Simipour",
    dex: 516,
    types: ["水"],
    },
    "化石翼龍": {
    nameZh: "化石翼龍",
    nameEn: "Aerodactyl",
    dex: 142,
    types: ["岩石", "飛行"],
    },
    "南瓜怪人": {
    nameZh: "南瓜怪人",
    nameEn: "Gourgeist",
    dex: 711,
    types: ["幽靈", "草"],
    },
    "口呆花": {
    nameZh: "口呆花",
    nameEn: "Weepinbell",
    dex: 70,
    types: ["草", "毒"],
    },
    "呆呆王": {
    nameZh: "呆呆王",
    nameEn: "Slowking",
    dex: 199,
    types: ["水", "超能力"],
    },
    "呆殼獸": {
    nameZh: "呆殼獸",
    nameEn: "Slowbro",
    dex: 80,
    types: ["水", "超能力"],
    },
    "呱頭蛙": {
    nameZh: "呱頭蛙",
    nameEn: "Frogadier",
    dex: 657,
    types: ["水"],
    },
    "哈克龍": {
    nameZh: "哈克龍",
    nameEn: "Dragonair",
    dex: 148,
    types: ["龍"],
    },
    "噴火駝": {
    nameZh: "噴火駝",
    nameEn: "Camerupt",
    dex: 323,
    types: ["火", "地面"],
    },


    "垃垃藻": {
    nameZh: "垃垃藻",
    nameEn: "Trubbish",
    dex: 568,
    types: ["毒"],
    },
    "堅盾劍怪": {
    nameZh: "堅盾劍怪",
    nameEn: "Aegislash",
    dex: 681,
    types: ["鋼", "幽靈"],
    },
    "多多冰": {
    nameZh: "多多冰",
    nameEn: "Vanilluxe",
    dex: 584,
    types: ["冰"],
    },
    "大比鳥": {
    nameZh: "大比鳥",
    nameEn: "Pidgeot",
    dex: 18,
    types: ["一般", "飛行"],
    },
    "大竺葵": {
    nameZh: "大竺葵",
    nameEn: "Meganium",
    dex: 154,
    types: ["草"],
    },
    "大鋼蛇": {
    nameZh: "大鋼蛇",
    nameEn: "Steelix",
    dex: 208,
    types: ["鋼", "地面"],
    },
    "大食花": {
    nameZh: "大食花",
    nameEn: "Victreebel",
    dex: 71,
    types: ["草", "毒"],
    },
    "奇魯莉安": {
    nameZh: "奇魯莉安",
    nameEn: "Kirlia",
    dex: 281,
    types: ["超能力", "妖精"],
    },
    "妖火紅狐": {
    nameZh: "妖火紅狐",
    nameEn: "Delphox",
    dex: 655,
    types: ["火", "超能力"],
    },
    "寶寶暴龍": {
    nameZh: "寶寶暴龍",
    nameEn: "Tyrunt",
    dex: 696,
    types: ["岩石", "龍"],
    },
    "尖牙陸鯊": {
    nameZh: "尖牙陸鯊",
    nameEn: "Gabite",
    dex: 444,
    types: ["龍", "地面"],
    },
    "巨牙鯊": {
    nameZh: "巨牙鯊",
    nameEn: "Sharpedo",
    dex: 319,
    types: ["水", "惡"],
    },
    "巨金怪": {
    nameZh: "巨金怪",
    nameEn: "Metagross",
    dex: 376,
    types: ["鋼", "超能力"],
    },
    "巨鉗螳螂": {
    nameZh: "巨鉗螳螂",
    nameEn: "Scizor",
    dex: 212,
    types: ["蟲", "鋼"],
    },
    "布里卡隆": {
    nameZh: "布里卡隆",
    nameEn: "Chesnaught",
    dex: 652,
    types: ["草", "格鬥"],
    },

    "快龍": {
  nameZh: "快龍",
  nameEn: "Dragonite",
  dex: 149,
  types: ["龍", "飛行"],
},
"怪力": {
  nameZh: "怪力",
  nameEn: "Machamp",
  dex: 68,
  types: ["格鬥"],
},
"怪顎龍": {
  nameZh: "怪顎龍",
  nameEn: "Tyrantrum",
  dex: 697,
  types: ["岩石", "龍"],
},
"拉魯拉絲": {
  nameZh: "拉魯拉絲",
  nameEn: "Ralts",
  dex: 280,
  types: ["超能力", "妖精"],
},
"摔角鷹人": {
  nameZh: "摔角鷹人",
  nameEn: "Hawlucha",
  dex: 701,
  types: ["格鬥", "飛行"],
},
"暴雪王": {
  nameZh: "暴雪王",
  nameEn: "Abomasnow",
  dex: 460,
  types: ["草", "冰"],
},
"暴飛龍": {
  nameZh: "暴飛龍",
  nameEn: "Salamence",
  dex: 373,
  types: ["龍", "飛行"],
},
"月桂葉": {
  nameZh: "月桂葉",
  nameEn: "Bayleef",
  dex: 153,
  types: ["草"],
},
"朽木妖": {
  nameZh: "朽木妖",
  nameEn: "Trevenant",
  dex: 709,
  types: ["幽靈", "草"],
},
"水晶燈火靈": {
  nameZh: "水晶燈火靈",
  nameEn: "Chandelure",
  dex: 609,
  types: ["幽靈", "火"],
},
"沙基拉斯": {
  nameZh: "沙基拉斯",
  nameEn: "Pupitar",
  dex: 247,
  types: ["岩石", "地面"],
},
"流氓熊貓": {
  nameZh: "流氓熊貓",
  nameEn: "Pangoro",
  dex: 675,
  types: ["格鬥", "惡"],
},
"流氓鱷": {
  nameZh: "流氓鱷",
  nameEn: "Krookodile",
  dex: 553,
  types: ["地面", "惡"],
},
"滑滑小子": {
  nameZh: "滑滑小子",
  nameEn: "Scraggy",
  dex: 559,
  types: ["惡", "格鬥"],
},
"炎武王": {
  nameZh: "炎武王",
  nameEn: "Emboar",
  dex: 500,
  types: ["火", "格鬥"],
},
"炒炒豬": {
  nameZh: "炒炒豬",
  nameEn: "Pignite",
  dex: 499,
  types: ["火", "格鬥"],
},
"烈咬陸鯊": {
  nameZh: "烈咬陸鯊",
  nameEn: "Garchomp",
  dex: 445,
  types: ["龍", "地面"],
},
"烈箭鷹": {
  nameZh: "烈箭鷹",
  nameEn: "Talonflame",
  dex: 663,
  types: ["火", "飛行"],
},
"燭光靈": {
  nameZh: "燭光靈",
  nameEn: "Lampent",
  dex: 608,
  types: ["幽靈", "火"],
},
"爆香猴": {
  nameZh: "爆香猴",
  nameEn: "Pansage",
  dex: 511,
  types: ["草"],
},
"爆香猿": {
  nameZh: "爆香猿",
  nameEn: "Simisage",
  dex: 512,
  types: ["草"],
},


"班基拉斯": {
  nameZh: "班基拉斯",
  nameEn: "Tyranitar",
  dex: 248,
  types: ["岩石", "惡"],
},
"甲殼龍": {
  nameZh: "甲殼龍",
  nameEn: "Shelgon",
  dex: 372,
  types: ["龍"],
},
"甲賀忍蛙": {
  nameZh: "甲賀忍蛙",
  nameEn: "Greninja",
  dex: 658,
  types: ["水", "惡"],
},
"皮可西": {
  nameZh: "皮可西",
  nameEn: "Clefable",
  dex: 36,
  types: ["妖精"],
},
"破破袋": {
  nameZh: "破破袋",
  nameEn: "Garbodor",
  dex: 569,
  types: ["毒"],
},
"粉香香": {
  nameZh: "粉香香",
  nameEn: "Spritzee",
  dex: 682,
  types: ["妖精"],
},
"綿綿泡芙": {
  nameZh: "綿綿泡芙",
  nameEn: "Swirlix",
  dex: 684,
  types: ["妖精"],
},
"耿鬼": {
  nameZh: "耿鬼",
  nameEn: "Gengar",
  dex: 94,
  types: ["幽靈", "毒"],
},
"胖甜妮": {
  nameZh: "胖甜妮",
  nameEn: "Slurpuff",
  dex: 685,
  types: ["妖精"],
},
"胖胖哈力": {
  nameZh: "胖胖哈力",
  nameEn: "Makuhita",
  dex: 296,
  types: ["格鬥"],
},
"胡地": {
  nameZh: "胡地",
  nameEn: "Alakazam",
  dex: 65,
  types: ["超能力"],
},
"艾路雷朵": {
  nameZh: "艾路雷朵",
  nameEn: "Gallade",
  dex: 475,
  types: ["超能力", "格鬥"],
},
"花椰猴": {
  nameZh: "花椰猴",
  nameEn: "Pansear",
  dex: 513,
  types: ["火"],
},
"花椰猿": {
  nameZh: "花椰猿",
  nameEn: "Simisear",
  dex: 514,
  types: ["火"],
},
"芳香精": {
  nameZh: "芳香精",
  nameEn: "Aromatisse",
  dex: 683,
  types: ["妖精"],
},
"詛咒娃娃": {
  nameZh: "詛咒娃娃",
  nameEn: "Banette",
  dex: 354,
  types: ["幽靈"],
},

// ==== 超級進化系列 ====
"超級七夕青鳥": {
  nameZh: "超級七夕青鳥",
  nameEn: "Mega Altaria",
  dex: 334,
  types: ["龍", "妖精"],
},
"超級冰鬼護": {
  nameZh: "超級冰鬼護",
  nameEn: "Mega Froslass",
  dex: 478,
  types: ["冰", "幽靈"],
},
"超級凱羅斯": {
  nameZh: "超級凱羅斯",
  nameEn: "Mega Pinsir",
  dex: 127,
  types: ["蟲", "飛行"],
},
"超級列陣兵": {
  nameZh: "超級列陣兵",
  nameEn: "Mega Falinks",
  dex: 870,
  types: ["格鬥"],
},
"超級勾魂眼": {
  nameZh: "超級勾魂眼",
  nameEn: "Mega Sableye",
  dex: 302,
  types: ["惡", "幽靈"],
},

"超級化石翼龍": {
  nameZh: "超級化石翼龍",
  nameEn: "Mega Aerodactyl",
  dex: 142,
  types: ["岩石", "飛行"],
},
"超級呆殼獸": {
  nameZh: "超級呆殼獸",
  nameEn: "Mega Slowbro",
  dex: 80,
  types: ["水", "超能力"],
},
"超級噴火駝": {
  nameZh: "超級噴火駝",
  nameEn: "Mega Camerupt",
  dex: 323,
  types: ["火", "地面"],
},
"超級噴火龍": {
  nameZh: "超級噴火龍",
  nameEn: "Mega Charizard",
  dex: 6,
  types: ["火", "飛行"], // 註：有 X/Y 兩型，這裡取一般 Mega 名稱
},
"超級大力鱷": {
  nameZh: "超級大力鱷",
  nameEn: "Mega Feraligatr",
  dex: 160,
  types: ["水"],
},
"超級大嘴娃": {
  nameZh: "超級大嘴娃",
  nameEn: "Mega Mawile",
  dex: 303,
  types: ["鋼", "妖精"],
},
"超級大比鳥": {
  nameZh: "超級大比鳥",
  nameEn: "Mega Pidgeot",
  dex: 18,
  types: ["一般", "飛行"],
},
"超級大竺葵": {
  nameZh: "超級大竺葵",
  nameEn: "Mega Meganium",
  dex: 154,
  types: ["草"],
},
"超級大針蜂": {
  nameZh: "超級大針蜂",
  nameEn: "Mega Beedrill",
  dex: 15,
  types: ["蟲", "毒"],
},
"超級大鋼蛇": {
  nameZh: "超級大鋼蛇",
  nameEn: "Mega Steelix",
  dex: 208,
  types: ["鋼", "地面"],
},
"超級大食花": {
  nameZh: "超級大食花",
  nameEn: "Mega Victreebel",
  dex: 71,
  types: ["草", "毒"],
},
"超級妖火紅狐": {
  nameZh: "超級妖火紅狐",
  nameEn: "Mega Delphox",
  dex: 655,
  types: ["火", "超能力"],
},
"超級妙蛙花": {
  nameZh: "超級妙蛙花",
  nameEn: "Mega Venusaur",
  dex: 3,
  types: ["草", "毒"],
},
"超級寶石海星": {
  nameZh: "超級寶石海星",
  nameEn: "Mega Starmie",
  dex: 121,
  types: ["水", "超能力"],
},
"超級巨牙鯊": {
  nameZh: "超級巨牙鯊",
  nameEn: "Mega Sharpedo",
  dex: 319,
  types: ["水", "惡"],
},
"超級巨金怪": {
  nameZh: "超級巨金怪",
  nameEn: "Mega Metagross",
  dex: 376,
  types: ["鋼", "超能力"],
},
"超級巨鉗螳螂": {
  nameZh: "超級巨鉗螳螂",
  nameEn: "Mega Scizor",
  dex: 212,
  types: ["蟲", "鋼"],
},
"超級差不多娃娃": {
  nameZh: "超級差不多娃娃",
  nameEn: "Mega Audino",
  dex: 531,
  types: ["一般", "妖精"],
},
"超級布里卡隆": {
  nameZh: "超級布里卡隆",
  nameEn: "Mega Chesnaught",
  dex: 652,
  types: ["草", "格鬥"],
},
"超級快龍": {
  nameZh: "超級快龍",
  nameEn: "Mega Dragonite",
  dex: 149,
  types: ["龍", "飛行"],
},
"超級恰雷姆": {
  nameZh: "超級恰雷姆",
  nameEn: "Mega Medicham",
  dex: 308,
  types: ["格鬥", "超能力"],
},
"超級摔角鷹人": {
  nameZh: "超級摔角鷹人",
  nameEn: "Mega Hawlucha",
  dex: 701,
  types: ["格鬥", "飛行"],
},
"超級暴雪王": {
  nameZh: "超級暴雪王",
  nameEn: "Mega Abomasnow",
  dex: 460,
  types: ["草", "冰"],
},
"超級暴飛龍": {
  nameZh: "超級暴飛龍",
  nameEn: "Mega Salamence",
  dex: 373,
  types: ["龍", "飛行"],
},
"超級暴鯉龍": {
  nameZh: "超級暴鯉龍",
  nameEn: "Mega Gyarados",
  dex: 130,
  types: ["水", "惡"],
},
"超級毒藻龍": {
  nameZh: "超級毒藻龍",
  nameEn: "Mega Dragalge",
  dex: 691,
  types: ["毒", "龍"],
},
"超級水晶燈火靈": {
  nameZh: "超級水晶燈火靈",
  nameEn: "Mega Chandelure",
  dex: 609,
  types: ["幽靈", "火"],
},


"超級水箭龜": {
  nameZh: "超級水箭龜",
  nameEn: "Mega Blastoise",
  dex: 9,
  types: ["水"],
},
"超級沙奈朵": {
  nameZh: "超級沙奈朵",
  nameEn: "Mega Gardevoir",
  dex: 282,
  types: ["超能力", "妖精"],
},
"超級波士可多拉": {
  nameZh: "超級波士可多拉",
  nameEn: "Mega Aggron",
  dex: 306,
  types: ["鋼"],
},
"超級火炎獅": {
  nameZh: "超級火炎獅",
  nameEn: "Mega Pyroar", // 【非官方形態】
  dex: 668,
  types: ["火", "一般"],
},
"超級炎武王": {
  nameZh: "超級炎武王",
  nameEn: "Mega Emboar", // 【非官方形態】
  dex: 500,
  types: ["火", "格鬥"],
},
"超級烈咬陸鯊": {
  nameZh: "超級烈咬陸鯊",
  nameEn: "Mega Garchomp",
  dex: 445,
  types: ["龍", "地面"],
},
"超級烏賊王": {
  nameZh: "超級烏賊王",
  nameEn: "Mega Malamar", // 【非官方形態】
  dex: 687,
  types: ["惡", "超能力"],
},
"超級班基拉斯": {
  nameZh: "超級班基拉斯",
  nameEn: "Mega Tyranitar",
  dex: 248,
  types: ["岩石", "惡"],
},
"超級甲賀忍蛙": {
  nameZh: "超級甲賀忍蛙",
  nameEn: "Mega Greninja", // 【非官方形態】
  dex: 658,
  types: ["水", "惡"],
},
"超級皮可西": {
  nameZh: "超級皮可西",
  nameEn: "Mega Clefable", // 【非官方形態】
  dex: 36,
  types: ["妖精"],
},
"超級盔甲鳥": {
  nameZh: "超級盔甲鳥",
  nameEn: "Mega Skarmory", // 【非官方形態】
  dex: 227,
  types: ["鋼", "飛行"],
},
"超級老翁龍": {
  nameZh: "超級老翁龍",
  nameEn: "Mega Drampa", // 【非官方形態】
  dex: 780,
  types: ["一般", "龍"],
},
"超級耿鬼": {
  nameZh: "超級耿鬼",
  nameEn: "Mega Gengar",
  dex: 94,
  types: ["幽靈", "毒"],
},
"超級胡地": {
  nameZh: "超級胡地",
  nameEn: "Mega Alakazam",
  dex: 65,
  types: ["超能力"],
},
"超級艾路雷朵": {
  nameZh: "超級艾路雷朵",
  nameEn: "Mega Gallade",
  dex: 475,
  types: ["超能力", "格鬥"],
},
"超級蜈蚣王": {
  nameZh: "超級蜈蚣王",
  nameEn: "Mega Scolipede", // 【非官方形態】
  dex: 545,
  types: ["蟲", "毒"],
},
"超級袋獸": {
  nameZh: "超級袋獸",
  nameEn: "Mega Kangaskhan",
  dex: 115,
  types: ["一般"],
},
"超級詛咒娃娃": {
  nameZh: "超級詛咒娃娃",
  nameEn: "Mega Banette",
  dex: 354,
  types: ["幽靈"],
},
"超級赫拉克羅斯": {
  nameZh: "超級赫拉克羅斯",
  nameEn: "Mega Heracross",
  dex: 214,
  types: ["蟲", "格鬥"],
},
"超級阿勃梭魯": {
  nameZh: "超級阿勃梭魯",
  nameEn: "Mega Absol",
  dex: 359,
  types: ["惡"],
},
"超級雪妖女": {
  nameZh: "超級雪妖女",
  nameEn: "Mega Froslass", // 【非官方形態】
  dex: 478,
  types: ["冰", "幽靈"],
},
"超級雷丘 X": {
  nameZh: "超級雷丘 X",
  nameEn: "Mega Raichu X", // 【非官方形態】
  dex: 26,
  types: ["電", "格鬥"],
},
"超級雷丘 Y": {
  nameZh: "超級雷丘 Y",
  nameEn: "Mega Raichu Y", // 【非官方形態】
  dex: 26,
  types: ["電", "超能力"],
},
"超級雷電獸": {
  nameZh: "超級雷電獸",
  nameEn: "Mega Manectric",
  dex: 310,
  types: ["電"],
},
"超級電龍": {
  nameZh: "超級電龍",
  nameEn: "Mega Ampharos",
  dex: 181,
  types: ["電", "龍"],
},
"超級頭巾混混": {
  nameZh: "超級頭巾混混",
  nameEn: "Mega Pangoro", // 【非官方形態】
  dex: 675,
  types: ["格鬥", "惡"],
},
"超級麻麻鰻魚王": {
  nameZh: "超級麻麻鰻魚王",
  nameEn: "Mega Eelektross", // 【非官方形態】
  dex: 604,
  types: ["電"],
},
"超級黑魯加": {
  nameZh: "超級黑魯加",
  nameEn: "Mega Houndoom",
  dex: 229,
  types: ["惡", "火"],
},
"超級龍頭地鼠": {
  nameZh: "超級龍頭地鼠",
  nameEn: "Mega Excadrill", // 【非官方形態】
  dex: 530,
  types: ["地面", "鋼"],
},
"超級龜足巨鎧": {
  nameZh: "超級龜足巨鎧",
  nameEn: "Mega Barbaracle", // 【非官方形態】
  dex: 689,
  types: ["岩石", "水"],
},

"超能妙喵": {
  nameZh: "超能妙喵",
  nameEn: "Meowstic",
  dex: 678,
  types: ["超能力"],
},
"車輪毬": {
  nameZh: "車輪毬",
  nameEn: "Whirlipede",
  dex: 544,
  types: ["蟲", "毒"],
},
"迷你龍": {
  nameZh: "迷你龍",
  nameEn: "Dratini",
  dex: 147,
  types: ["龍"],
},
"金屬怪": {
  nameZh: "金屬怪",
  nameEn: "Metang",
  dex: 375,
  types: ["鋼", "超能力"],
},
"鋼炮臂蝦": {
  nameZh: "鋼炮臂蝦",
  nameEn: "Clawitzer",
  dex: 693,
  types: ["水"],
},
"鐵啞鈴": {
  nameZh: "鐵啞鈴",
  nameEn: "Beldum",
  dex: 374,
  types: ["鋼", "超能力"],
},
"長尾火狐": {
  nameZh: "長尾火狐",
  nameEn: "Fennekin",
  dex: 653,
  types: ["火"],
},
"長耳兔": {
  nameZh: "長耳兔",
  nameEn: "Lopunny",
  dex: 428,
  types: ["一般"],
},
"阿利多斯": {
  nameZh: "阿利多斯",
  nameEn: "Ariados",
  dex: 168,
  types: ["蟲", "毒"],
},
"阿勃梭魯": {
  nameZh: "阿勃梭魯",
  nameEn: "Absol",
  dex: 359,
  types: ["惡"],
},
"雙倍多多冰": {
  nameZh: "雙倍多多冰",
  nameEn: "Vanillish",
  dex: 583,
  types: ["冰"],
},
"雙劍鞘": {
  nameZh: "雙劍鞘",
  nameEn: "Doublade",
  dex: 680,
  types: ["鋼", "幽靈"],
},
"雪妖女": {
  nameZh: "雪妖女",
  nameEn: "Froslass",
  dex: 478,
  types: ["冰", "幽靈"],
},
"雷丘": {
  nameZh: "雷丘",
  nameEn: "Raichu",
  dex: 26,
  types: ["電"],
},
"雷電獸": {
  nameZh: "雷電獸",
  nameEn: "Manectric",
  dex: 310,
  types: ["電"],
},
"麻麻鰻": {
  nameZh: "麻麻鰻",
  nameEn: "Eelektrik",
  dex: 603,
  types: ["電"],
},
"麻麻鰻魚王": {
  nameZh: "麻麻鰻魚王",
  nameEn: "Eelektross",
  dex: 604,
  types: ["電"],
},
"黏美兒": {
  nameZh: "黏美兒",
  nameEn: "Sliggoo",
  dex: 705,
  types: ["龍"],
},
"黏美龍": {
  nameZh: "黏美龍",
  nameEn: "Goodra",
  dex: 706,
  types: ["龍"],
},
"黏黏寶": {
  nameZh: "黏黏寶",
  nameEn: "Goomy",
  dex: 704,
  types: ["龍"],
},
"黑魯加": {
  nameZh: "黑魯加",
  nameEn: "Houndoom",
  dex: 229,
  types: ["惡", "火"],
},

};
