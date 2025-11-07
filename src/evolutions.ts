export type EvolutionRecord = {
  from: string;
  to: string;
  condition: string;
  note?: string; // 這個是你新加的備註欄位
};

export const EVOLUTIONS: EvolutionRecord[] = [
  { from: "菊草葉", to: "月桂葉", condition: "等級 16" },
  { from: "月桂葉", to: "大竺葵", condition: "等級 32" },
  { from: "大竺葵", to: "超級大竺葵", condition: "持有超級石進化", note: "主任務10獲得（初始御三家選菊草葉）" },

  { from: "暖暖豬", to: "炒炒豬", condition: "等級 17" },
  { from: "炒炒豬", to: "炎武王", condition: "等級 36" },
  { from: "炎武王", to: "超級炎武王", condition: "持有超級石進化", note: "主任務10獲得（初始御三家選暖暖豬）" },

  { from: "小鋸鱷", to: "藍鱷", condition: "等級 18" },
  { from: "藍鱷", to: "大力鱷", condition: "等級 30" },
  { from: "大力鱷", to: "超級大力鱷", condition: "持有超級石進化", note: "主任務10獲得（初始御三家選小鋸鱷）" },

  { from: "小箭雀", to: "火箭雀", condition: "等級 17" },
  { from: "火箭雀", to: "烈箭鷹", condition: "等級 34" },

  { from: "掘掘兔", to: "掘地兔", condition: "等級 20" },

  { from: "粉蝶蟲", to: "粉蝶蛹", condition: "等級 9" },
  { from: "粉蝶蛹", to: "彩粉蝶", condition: "等級 12" },

  { from: "獨角蟲", to: "鐵殼蛹", condition: "等級 7" },
  { from: "鐵殼蛹", to: "大針蜂", condition: "等級 10" },
  { from: "大針蜂", to: "超級大針蜂", condition: "持有超級石進化", note: "擊敗失控超級大針蜂（主任務16）" },

  { from: "波波", to: "比比鳥", condition: "等級 18" },
  { from: "比比鳥", to: "大比鳥", condition: "等級 36" },
  { from: "大比鳥", to: "超級大比鳥", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "咩利羊", to: "茸茸羊", condition: "等級 15" },
  { from: "茸茸羊", to: "電龍", condition: "等級 30" },
  { from: "電龍", to: "超級電龍", condition: "持有超級石進化", note: "擊敗失控超級電龍（主任務23）" },
  
  { from: "探探鼠", to: "步哨鼠", condition: "等級 20" },

  { from: "含羞苞", to: "毒薔薇", condition: "高好感進化", note: "親密度220以上且白天進化" },
  { from: "毒薔薇", to: "羅絲雷朵", condition: "使用光之石" },

  { from: "鯉魚王", to: "暴鯉龍", condition: "等級 20" },
  { from: "暴鯉龍", to: "超級暴鯉龍", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "龜腳腳", to: "龜足巨鎧", condition: "等級 39" },
  { from: "龜足巨鎧", to: "超級龜足巨鎧", condition: "持有超級石進化", note: "擊敗失控超級龜足巨鎧（主任務22）" },

  { from: "海星星", to: "寶石海星", condition: "使用水之石" },
  { from: "寶石海星", to: "超級寶石海星", condition: "持有超級石進化", note: "擊敗失控超級寶石海星（主任務34）" },

  { from: "花蓓蓓", to: "花葉蒂", condition: "等級 19" },
  { from: "花葉蒂", to: "花潔夫人", condition: "使用光之石" },

  { from: "坐騎小羊", to: "坐騎山羊", condition: "等級 32" },

  { from: "妙喵", to: "超能妙喵", condition: "等級 25", note: "雌雄皆可進化（雌性或雄性Lv25）" },

  { from: "小獅獅", to: "火炎獅", condition: "等級 35" },
  { from: "火炎獅", to: "超級火炎獅", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "頑皮熊貓", to: "流氓熊貓", condition: "等級 32", note: "進化時需與惡屬性寶可夢同行" },

  { from: "破破袋", to: "灰塵山", condition: "等級 36" },

  { from: "皮丘", to: "皮卡丘", condition: "高好感進化", note: "親密度額滿（喝咖啡可提升親密度）" },
  { from: "皮卡丘", to: "雷丘", condition: "使用雷之石" },
  { from: "雷丘", to: "超級雷丘 X", condition: "持有超級石進化", note: "DLC限定" },
  { from: "雷丘", to: "超級雷丘 Y", condition: "持有超級石進化", note: "DLC限定" },

  { from: "皮寶寶", to: "皮皮", condition: "高好感進化", note: "親密度額滿（喝咖啡可提升親密度）" },
  { from: "皮皮", to: "皮可西", condition: "使用月之石" },
  { from: "皮可西", to: "超級皮可西", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "圓絲蛛", to: "阿利多斯", condition: "等級 22" },

  { from: "阿柏蛇", to: "阿柏怪", condition: "等級 22" },

  { from: "凱西", to: "勇基拉", condition: "等級 16" },
  { from: "勇基拉", to: "胡地", condition: "通訊進化", note: "透過連線交換進化" },
  { from: "胡地", to: "超級胡地", condition: "持有超級石進化", note: "闊星公司可購買" },
  
  { from: "鬼斯", to: "鬼斯通", condition: "等級 25" },
  { from: "鬼斯通", to: "耿鬼", condition: "通訊進化", note: "透過連線交換進化" },
  { from: "耿鬼", to: "超級耿鬼", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "百足蜈蚣", to: "車輪毬", condition: "等級 22" },
  { from: "車輪毬", to: "蜈蚣王", condition: "等級 30" },
  { from: "蜈蚣王", to: "超級蜈蚣王", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "獨劍鞘", to: "雙劍鞘", condition: "等級 35" },
  { from: "雙劍鞘", to: "堅盾劍怪", condition: "使用暗之石" },

  { from: "喇叭芽", to: "口呆花", condition: "等級 21" },
  { from: "口呆花", to: "大食花", condition: "使用葉之石" },
  { from: "大食花", to: "超級大食花", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "花椰猴", to: "花椰猿", condition: "使用葉之石" },
  { from: "爆香猴", to: "爆香猿", condition: "使用火之石" },
  { from: "冷水猴", to: "冷水猿", condition: "使用水之石" },

  { from: "瑪沙那", to: "恰雷姆", condition: "等級 37" },
  { from: "恰雷姆", to: "超級恰雷姆", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "落雷獸", to: "雷電獸", condition: "等級 26" },
  { from: "雷電獸", to: "超級雷電獸", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "拉魯拉絲", to: "奇魯莉安", condition: "等級 20" },
  { from: "奇魯莉安", to: "沙奈朵", condition: "等級 30" },
  { from: "奇魯莉安", to: "艾路雷朵", condition: "使用覺醒之石", note: "僅雄性可進化" },
  { from: "沙奈朵", to: "超級沙奈朵", condition: "持有超級石進化", note: "闊星公司可購買" },
  { from: "艾路雷朵", to: "超級艾路雷朵", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "戴魯比", to: "黑魯加", condition: "等級 24" },
  { from: "黑魯加", to: "超級黑魯加", condition: "持有超級石進化", note: "闊星公司可購買" },
  
  { from: "青綿鳥", to: "七夕青鳥", condition: "等級 35" },
  { from: "七夕青鳥", to: "超級七夕青鳥", condition: "持有超級石進化", note: "擊敗失控超級詛咒娃娃（主任務28）" },

  { from: "差不多娃娃", to: "超級差不多娃娃", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "粉香香", to: "芳香精", condition: "通訊進化", note: "攜帶香袋透過連線交換" },
  { from: "綿綿泡芙", to: "胖甜妮", condition: "通訊進化", note: "攜帶泡沫奶油透過連線交換" },

  { from: "伊布", to: "水伊布", condition: "使用水之石" },
  { from: "伊布", to: "雷伊布", condition: "使用雷之石" },
  { from: "伊布", to: "火伊布", condition: "使用火之石" },
  { from: "伊布", to: "太陽伊布", condition: "高好感進化", note: "親密度額滿且白天進化" },
  { from: "伊布", to: "月亮伊布", condition: "高好感進化", note: "親密度額滿且夜晚進化" },
  { from: "伊布", to: "葉伊布", condition: "使用葉之石" },
  { from: "伊布", to: "冰伊布", condition: "使用冰之石" },
  { from: "伊布", to: "仙子伊布", condition: "高好感進化", note: "親密度額滿且習得妖精屬性招式" },

  { from: "捲捲耳", to: "長耳兔", condition: "高好感進化", note: "親密度額滿" },

  { from: "怨影娃娃", to: "詛咒娃娃", condition: "等級 37" },
  { from: "詛咒娃娃", to: "超級詛咒娃娃", condition: "持有超級石進化", note: "擊敗失控超級詛咒娃娃（主任務18）" },

  { from: "迷你冰", to: "多多冰", condition: "等級 35" },
  { from: "多多冰", to: "雙倍多多冰", condition: "等級 47" },

  { from: "呆火駝", to: "噴火駝", condition: "等級 33" },
  { from: "噴火駝", to: "超級噴火駝", condition: "持有超級石進化", note: "擊敗失控超噴火駝（主任務12）" },

  { from: "沙河馬", to: "河馬獸", condition: "等級 34" },

  { from: "螺釘地鼠", to: "龍頭地鼠", condition: "等級 31" },
  { from: "龍頭地鼠", to: "超級龍頭地鼠", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "黑眼鱷", to: "混混鱷", condition: "等級 29" },
  { from: "混混鱷", to: "流氓鱷", condition: "等級 40" },
  
  { from: "腕力", to: "豪力", condition: "等級 28" },
  { from: "豪力", to: "怪力", condition: "通訊進化", note: "透過連線交換進化" },

  { from: "圓陸鯊", to: "尖牙陸鯊", condition: "等級 24" },
  { from: "尖牙陸鯊", to: "烈咬陸鯊", condition: "等級 48" },
  { from: "烈咬陸鯊", to: "超級烈咬陸鯊", condition: "持有超級石進化", note: "石頭館購買" },

  { from: "勾魂眼", to: "超級勾魂眼", condition: "持有超級石進化", note: "闊星公司可購買" },
  { from: "大嘴娃", to: "超級大嘴娃", condition: "持有超級石進化", note: "擊敗失控超級大嘴娃（主任務21）" },
  { from: "阿勃梭魯", to: "超級阿勃梭魯", condition: "持有超級石進化", note: "擊敗失控超級阿勃梭魯（主任務09）" },

  { from: "利歐路", to: "路卡利歐", condition: "高好感進化", note: "親密度額滿（喝咖啡可提升親密度）" },

  { from: "呆呆獸", to: "呆殼獸", condition: "等級 37" },
  { from: "呆呆獸", to: "呆呆王", condition: "通訊進化", note: "攜帶王者之證透過連線交換" },
  { from: "呆呆獸", to: "伽勒爾呆呆獸", condition: "使用伽勒荳蔻花圈" },
  { from: "呆殼獸", to: "超級呆殼獸", condition: "持有超級石進化", note: "擊敗失控超級呆殼獸（主任務11）" },

  { from: "利牙魚", to: "巨牙鯊", condition: "等級 30" },
  { from: "巨牙鯊", to: "超級巨牙鯊", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "麻麻小魚", to: "麻麻鰻", condition: "等級 39" },
  { from: "麻麻鰻", to: "麻麻鰻魚王", condition: "使用雷之石" },
  { from: "麻麻鰻魚王", to: "超級麻麻鰻魚王", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "迷你龍", to: "哈克龍", condition: "等級 30" },
  { from: "哈克龍", to: "快龍", condition: "等級 55" },
  { from: "快龍", to: "超級快龍", condition: "持有超級石進化", note: "擊敗失控超級快龍（主任務32）" },

  { from: "妙蛙種子", to: "妙蛙草", condition: "等級 16" },
  { from: "妙蛙草", to: "妙蛙花", condition: "等級 32" },
  { from: "妙蛙花", to: "超級妙蛙花", condition: "持有超級石進化", note: "擊敗失控超級妙蛙花（主任務29）" },

  { from: "小火龍", to: "火恐龍", condition: "等級 16" },
  { from: "火恐龍", to: "噴火龍", condition: "等級 36" },
  { from: "噴火龍", to: "超級噴火龍", condition: "持有超級石進化", note: "石頭館購買" },

  { from: "傑尼龜", to: "卡咪龜", condition: "等級 16" },
  { from: "卡咪龜", to: "水箭龜", condition: "等級 36" },
  { from: "水箭龜", to: "超級水箭龜", condition: "持有超級石進化", note: "石頭館購買" },
  
  { from: "好啦魷", to: "烏賊王", condition: "等級 30（倒置主機）", note: "Lv30 並將主機倒置；連接 Pro 手把等裝置時無法進化" },
  { from: "烏賊王", to: "超級烏賊王", condition: "持有超級石進化", note: "闊星公司可購買" },
  
  { from: "垃垃藻", to: "毒藻龍", condition: "等級 48" },
  { from: "毒藻龍", to: "超級毒藻龍", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "鐵臂槍蝦", to: "鋼炮臂蝦", condition: "等級 37" },

  { from: "黏黏寶", to: "黏美兒", condition: "等級 40" },
  { from: "黏美兒", to: "黏美龍", condition: "等級 50（下雨天）" },

  { from: "雪童子", to: "冰鬼護", condition: "等級 42" },
  { from: "雪童子", to: "雪妖女", condition: "使用覺醒之石（雌性）" },
  { from: "冰鬼護", to: "超級冰鬼護", condition: "持有超級石進化", note: "闊星公司可購買" },
  { from: "雪妖女", to: "超級雪妖女", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "雪笠怪", to: "暴雪王", condition: "等級 40" },
  { from: "暴雪王", to: "超級暴雪王", condition: "持有超級石進化", note: "石頭館購買" },

  { from: "冰寶", to: "冰岩怪", condition: "等級 37" },

  { from: "飛天螳螂", to: "巨鉗螳螂", condition: "通訊進化", note: "攜帶金屬膜透過連線交換" },
  { from: "巨鉗螳螂", to: "超級巨鉗螳螂", condition: "持有超級石進化", note: "石頭館購買" },

  { from: "凱羅斯", to: "超級凱羅斯", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "赫拉克羅斯", to: "超級赫拉克羅斯", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "摔角鷹人", to: "超級摔角鷹人", condition: "持有超級石進化", note: "擊敗失控超級摔角鷹人（主任務17）" },

  { from: "小木靈", to: "朽木妖", condition: "通訊進化", note: "透過連線交換" },

  { from: "滑滑小子", to: "頭巾混混", condition: "等級 39" },
  { from: "頭巾混混", to: "超級頭巾混混", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "嗡蝠", to: "音波龍", condition: "等級 48" },
  
  { from: "燭光靈", to: "燈火幽靈", condition: "等級 41" },
  { from: "燈火幽靈", to: "水晶燈火靈", condition: "使用暗之石" },
  { from: "水晶燈火靈", to: "超級水晶燈火靈", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "化石翼龍", to: "超級化石翼龍", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "寶寶暴龍", to: "怪顎龍", condition: "等級 39（白天）" },

  { from: "冰雪龍", to: "冰雪巨龍", condition: "等級 39（夜晚）" },

  { from: "大岩蛇", to: "大鋼蛇", condition: "通訊進化", note: "攜帶金屬膜透過連線交換" },
  { from: "大鋼蛇", to: "超級大鋼蛇", condition: "持有超級石進化", note: "石頭館購買" },

  { from: "可可多拉", to: "可多拉", condition: "等級 32" },
  { from: "可多拉", to: "波士可多拉", condition: "等級 42" },
  { from: "波士可多拉", to: "超級波士可多拉", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "傘電蜥", to: "光電傘蜥", condition: "使用日之石" },

  { from: "南瓜精", to: "南瓜怪人", condition: "通訊進化", note: "透過連線交換" },

  { from: "幼基拉斯", to: "沙基拉斯", condition: "等級 30" },
  { from: "沙基拉斯", to: "班基拉斯", condition: "等級 55" },
  { from: "班基拉斯", to: "超級班基拉斯", condition: "持有超級石進化", note: "擊敗失控超級班基拉斯（主任務33）" },

  { from: "呱呱泡蛙", to: "呱頭蛙", condition: "等級 16" },
  { from: "呱頭蛙", to: "甲賀忍蛙", condition: "等級 36" },
  { from: "甲賀忍蛙", to: "超級甲賀忍蛙", condition: "持有超級石進化", note: "排位賽升級獎勵（第1季）" },

  { from: "列陣兵", to: "超級列陣兵", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "哈力栗", to: "胖胖哈力", condition: "等級 16" },
  { from: "胖胖哈力", to: "布里卡隆", condition: "等級 36" },
  { from: "布里卡隆", to: "超級布里卡隆", condition: "持有超級石進化", note: "排位賽升級獎勵（第3季）" },

  { from: "盔甲鳥", to: "超級盔甲鳥", condition: "持有超級石進化", note: "闊星公司可購買" },
  
  { from: "火狐狸", to: "長尾火狐", condition: "等級 16" },
  { from: "長尾火狐", to: "妖火紅狐", condition: "等級 36" },
  { from: "妖火紅狐", to: "超級妖火紅狐", condition: "持有超級石進化", note: "排位賽升級獎勵（第2季）" },

  { from: "寶貝龍", to: "甲殼龍", condition: "等級 30" },
  { from: "甲殼龍", to: "暴飛龍", condition: "等級 50" },
  { from: "暴飛龍", to: "超級暴飛龍", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "袋獸", to: "超級袋獸", condition: "持有超級石進化", note: "石頭館購買" },

  { from: "老翁龍", to: "超級老翁龍", condition: "持有超級石進化", note: "闊星公司可購買" },

  { from: "鐵啞鈴", to: "金屬怪", condition: "等級 20" },
  { from: "金屬怪", to: "巨金怪", condition: "等級 45" },
  { from: "巨金怪", to: "超級巨金怪", condition: "持有超級石進化", note: "闊星公司可購買" },
];
