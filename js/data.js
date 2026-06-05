// ============================================================
//  data.js — グラフのデータ定義
//  キャラや関係性を追加・編集するときは、基本このファイルだけ触ればOK。
// ============================================================

// 陣営の定義（色とラベル）
export const FACTION = {
  jedi:    { color: 0x4FA8FF, label: 'ジェダイ / 共和国' },
  sith:    { color: 0xFF4F4F, label: 'シス / 帝国' },
  rebel:   { color: 0xFFE81F, label: '反乱同盟 / レジスタンス' },
  neutral: { color: 0x9D7BFF, label: 'その他 / 中立' },
};

// 関係性の種類（線の色とラベル）
export const REL = {
  family:  { color: 0xFFE81F, label: '家族' },
  master:  { color: 0x4FA8FF, label: '師弟' },
  ally:    { color: 0x888888, label: '仲間' },
  enemy:   { color: 0xFF4F4F, label: '敵対' },
  romance: { color: 0xFF6FD8, label: '恋愛' },
};

// キャラクター（ノード）
//   id      : 一意のID（links から参照される）
//   name    : 表示名
//   faction : 陣営（FACTION のキー）
//   size    : 球体の大きさ
//   image   : 画像URL。空のままでもOK（イニシャル付きの色球で表示される）。
//             自前ホスティングのURLを入れると起動時に自動で球体に貼られる。
//             または画面に画像をドラッグ＆ドロップして貼ることも可能。
//   desc    : 選択時に表示される説明文
//   films   : 登場作品の配列（情報パネルに表示）。EPn は エピソードn。
export const nodes = [
  { id:'luke',    name:'ルーク・スカイウォーカー', faction:'rebel',   size:11, image:'', films:['EP4','EP5','EP6','EP7','EP8','EP9','マンダロリアン(TV)'], desc:'反乱同盟のパイロットにしてジェダイ。デス・スターを破壊し、銀河の運命を変えた英雄。' },
  { id:'leia',    name:'レイア・オーガナ',        faction:'rebel',   size:10, image:'', films:['EP4','EP5','EP6','EP7','EP8','EP9','ローグ・ワン'], desc:'オルデランの王女であり反乱同盟の指導者。ルークの双子の妹。' },
  { id:'han',     name:'ハン・ソロ',              faction:'rebel',   size:10, image:'', films:['EP4','EP5','EP6','EP7','ハン・ソロ'], desc:'ミレニアム・ファルコンの船長。元密輸業者で、反乱同盟の将軍となる。' },
  { id:'vader',   name:'ダース・ベイダー',        faction:'sith',    size:12, image:'', films:['EP3','EP4','EP5','EP6','ローグ・ワン'], desc:'帝国のシス卿。かつてはアナキン・スカイウォーカーと呼ばれたジェダイ。' },
  { id:'anakin',  name:'アナキン・スカイウォーカー', faction:'jedi', size:11, image:'', films:['EP1','EP2','EP3','EP9'], desc:'「選ばれし者」と予言された才能あるジェダイ。後にダース・ベイダーへ堕ちる。' },
  { id:'obiwan',  name:'オビ=ワン・ケノービ',     faction:'jedi',    size:10, image:'', films:['EP1','EP2','EP3','EP4','EP5','EP6','オビ=ワン(TV)'], desc:'高潔なジェダイ・マスター。アナキンとルークの師。' },
  { id:'palpatine', name:'パルパティーン',        faction:'sith',    size:11, image:'', films:['EP1','EP2','EP3','EP6','EP9'], desc:'銀河帝国の皇帝にしてシスの暗黒卿ダース・シディアス。' },
  { id:'yoda',    name:'ヨーダ',                  faction:'jedi',    size:10, image:'', films:['EP1','EP2','EP3','EP5','EP6','EP8'], desc:'900歳のジェダイ・グランドマスター。深遠なフォースの使い手。' },
  { id:'padme',   name:'パドメ・アミダラ',        faction:'jedi',    size:9,  image:'', films:['EP1','EP2','EP3'], desc:'ナブーの女王・元老院議員。アナキンの妻でルークとレイアの母。' },
  { id:'chewie',  name:'チューバッカ',            faction:'rebel',   size:8,  image:'', films:['EP3','EP4','EP5','EP6','EP7','EP8','EP9','ハン・ソロ'], desc:'ウーキー族の戦士。ハン・ソロの忠実な相棒。' },
  { id:'r2d2',    name:'R2-D2',                  faction:'rebel',   size:7,  image:'', films:['EP1','EP2','EP3','EP4','EP5','EP6','EP7','EP8','EP9','ローグ・ワン'], desc:'勇敢なアストロメク・ドロイド。数々の危機を救う。' },
  { id:'c3po',    name:'C-3PO',                  faction:'rebel',   size:7,  image:'', films:['EP1','EP2','EP3','EP4','EP5','EP6','EP7','EP8','EP9','ローグ・ワン'], desc:'600万種の言語を操るプロトコル・ドロイド。R2-D2の相棒。' },
  { id:'quigon',  name:'クワイ=ガン・ジン',       faction:'jedi',    size:8,  image:'', films:['EP1'], desc:'オビ=ワンの師。アナキンを発見したジェダイ・マスター。' },
  { id:'maul',    name:'ダース・モール',          faction:'sith',    size:8,  image:'', films:['EP1','ハン・ソロ'], desc:'シスの暗殺者。二刀のライトセーバーを操る。' },
  { id:'rey',     name:'レイ',                    faction:'rebel',   size:10, image:'', films:['EP7','EP8','EP9'], desc:'ジャクーの廃品回収業者から立ち上がった新世代のジェダイ。' },
  { id:'kylo',    name:'カイロ・レン',            faction:'sith',    size:10, image:'', films:['EP7','EP8','EP9'], desc:'ファースト・オーダーの戦士。ハンとレイアの息子ベン・ソロ。' },
  { id:'finn',    name:'フィン',                  faction:'rebel',   size:8,  image:'', films:['EP7','EP8','EP9'], desc:'元ストームトルーパー。レジスタンスへ寝返った。' },
  { id:'poe',     name:'ポー・ダメロン',          faction:'rebel',   size:8,  image:'', films:['EP7','EP8','EP9'], desc:'レジスタンス随一のエースパイロット。' },
  { id:'lando',   name:'ランド・カルリジアン',     faction:'rebel',   size:7,  image:'', films:['EP5','EP6','EP9','ハン・ソロ'], desc:'クラウド・シティの管理者。元ファルコンの持ち主。' },
  { id:'grievous',name:'グリーヴァス将軍',        faction:'sith',    size:7,  image:'', films:['EP3'], desc:'分離主義勢力のサイボーグ将軍。ジェダイ狩りで知られる。' },
  { id:'mando',   name:'マンダロリアン（ディン・ジャリン）', faction:'neutral', size:10, image:'', films:['マンダロリアン(TV)','ボバ・フェット(TV)'], desc:'マンダロリアンの賞金稼ぎ。グローグーを守る「父」となり、銀河を旅する。' },
  { id:'grogu',   name:'グローグー',              faction:'neutral', size:7,  image:'', films:['マンダロリアン(TV)','ボバ・フェット(TV)'], desc:'ヨーダと同じ種族のフォース感応者の幼子。マンダロリアンに保護される。' },
  { id:'boba',    name:'ボバ・フェット',          faction:'neutral', size:9,  image:'', films:['EP5','EP6','ボバ・フェット(TV)','マンダロリアン(TV)'], desc:'銀河で最も恐れられた賞金稼ぎ。後にタトゥイーンの犯罪組織を率いる。' },
  { id:'rotta',   name:'ロッタ・ザ・ハット',      faction:'neutral', size:6,  image:'', films:['クローン・ウォーズ(TV)'], desc:'ジャバ・ザ・ハットの幼い息子。「スティンキー」とも呼ばれる。' },
  { id:'hutttwins',name:'ハット・ツインズ',        faction:'neutral', size:7,  image:'', films:['ボバ・フェット(TV)'], desc:'ジャバの従兄妹にあたるハット族の双子。タトゥイーンの利権を争う。' },
  { id:'jabba',   name:'ジャバ・ザ・ハット',      faction:'neutral', size:10, image:'', films:['EP1','EP4','EP6'], desc:'タトゥイーンを支配する強大なハット族の犯罪王。賞金稼ぎや密輸業者を従える。' },
  { id:'dooku',   name:'ドゥークー伯爵',          faction:'sith',    size:9,  image:'', films:['EP2','EP3'], desc:'元ジェダイにしてシスの暗黒卿ダース・タイラナス。分離主義勢力を率いる。' },
  { id:'mace',    name:'メイス・ウィンドゥ',      faction:'jedi',    size:9,  image:'', films:['EP1','EP2','EP3'], desc:'ジェダイ評議会の重鎮。紫のライトセーバーを操る屈指の剣士。' },
  { id:'jango',   name:'ジャンゴ・フェット',      faction:'neutral', size:8,  image:'', films:['EP2'], desc:'クローン軍の遺伝子提供者となった賞金稼ぎ。ボバ・フェットの父。' },
  { id:'ahsoka',  name:'アソーカ・タノ',          faction:'jedi',    size:9,  image:'', films:['クローン・ウォーズ(TV)','マンダロリアン(TV)','アソーカ(TV)'], desc:'アナキンの弟子だった元ジェダイ。独自の道を歩むフォースの戦士。' },
  { id:'snoke',   name:'スノーク',                faction:'sith',    size:9,  image:'', films:['EP7','EP8'], desc:'ファースト・オーダー最高指導者。パルパティーンが生み出した存在。' },
  { id:'hux',     name:'アーミテイジ・ハックス',  faction:'sith',    size:7,  image:'', films:['EP7','EP8','EP9'], desc:'ファースト・オーダーの冷酷な将軍。スターキラー基地を指揮した。' },
  { id:'phasma',  name:'ファズマ',                faction:'sith',    size:7,  image:'', films:['EP7','EP8'], desc:'クロームの装甲をまとうストームトルーパー隊長。' },
  { id:'bb8',     name:'BB-8',                   faction:'rebel',   size:7,  image:'', films:['EP7','EP8','EP9'], desc:'ポーの相棒の球状ドロイド。レジスタンスの危機を幾度も救う。' },
  { id:'jyn',     name:'ジン・アーソ',            faction:'rebel',   size:8,  image:'', films:['ローグ・ワン'], desc:'デス・スターの設計図奪取作戦を率いた反乱同盟の戦士。' },
  { id:'cassian', name:'カッシアン・アンドー',    faction:'rebel',   size:8,  image:'', films:['ローグ・ワン','アンドー(TV)'], desc:'反乱同盟の諜報員。スカリフの戦いでジンと共に戦う。' },
  { id:'krennic', name:'クレニック長官',          faction:'sith',    size:8,  image:'', films:['ローグ・ワン'], desc:'デス・スター計画を統括した帝国の兵器開発局長官。' },
  // --- プリクエル / クローン大戦 ---
  { id:'shmi',    name:'シミ・スカイウォーカー',  faction:'neutral', size:6,  image:'', films:['EP1','EP2'], desc:'タトゥイーンの奴隷だったアナキンの母。' },
  { id:'bail',    name:'ベイル・オーガナ',        faction:'rebel',   size:7,  image:'', films:['EP2','EP3','ローグ・ワン'], desc:'オルデランの議員。レイアを養女に迎え、反乱の礎を築く。' },
  { id:'jarjar',  name:'ジャー・ジャー・ビンクス', faction:'neutral', size:6, image:'', films:['EP1','EP2','EP3'], desc:'グンガン族のおっちょこちょい。元老院議員も務めた。' },
  { id:'rex',     name:'キャプテン・レックス',    faction:'rebel',   size:7,  image:'', films:['クローン・ウォーズ(TV)'], desc:'第501軍団を率いたクローン兵の隊長。アナキンとアソーカの戦友。' },
  { id:'cody',    name:'コマンダー・コーディ',    faction:'neutral', size:6,  image:'', films:['EP3','クローン・ウォーズ(TV)'], desc:'オビ=ワン麾下のクローン司令官。オーダー66を実行する。' },
  { id:'nute',    name:'ヌート・ガンレイ',        faction:'sith',    size:6,  image:'', films:['EP1','EP2','EP3'], desc:'通商連合の総督。分離主義勢力の中心人物。' },
  { id:'aayla',   name:'アイラ・セキュラ',        faction:'jedi',    size:6,  image:'', films:['EP2','EP3'], desc:'トワイレックのジェダイ・ナイト。' },
  { id:'kitfisto',name:'キット・フィスト',        faction:'jedi',    size:6,  image:'', films:['EP2','EP3'], desc:'ナゴトの剣士として知られるジェダイ・マスター。' },
  // --- オリジナル三部作 ---
  { id:'tarkin',  name:'ウィルハフ・ターキン',    faction:'sith',    size:8,  image:'', films:['EP4','ローグ・ワン'], desc:'デス・スターを指揮した帝国の冷酷な総督。' },
  { id:'wedge',   name:'ウェッジ・アンティリーズ', faction:'rebel',  size:6,  image:'', films:['EP4','EP5','EP6','EP9'], desc:'二つのデス・スター攻略を生き延びた反乱同盟のエースパイロット。' },
  { id:'ackbar',  name:'アクバー提督',            faction:'rebel',   size:6,  image:'', films:['EP6','EP7','EP8'], desc:'モン・カラマリ族の名提督。「それは罠だ！」の名言で知られる。' },
  { id:'wicket',  name:'ウィケット',              faction:'neutral', size:5,  image:'', films:['EP6'], desc:'エンドアの森に住むイウォーク族の戦士。' },
  // --- 続三部作 ---
  { id:'maz',     name:'マズ・カナタ',            faction:'neutral', size:6,  image:'', films:['EP7','EP8','EP9'], desc:'千年を生きる海賊の女傑。古いライトセーバーを守っていた。' },
  { id:'rose',    name:'ローズ・ティコ',          faction:'rebel',   size:6,  image:'', films:['EP8','EP9'], desc:'レジスタンスの整備士。フィンと共に任務に挑む。' },
  // --- マンダロリアン / 配信シリーズ ---
  { id:'gideon',  name:'モフ・ギデオン',          faction:'sith',    size:8,  image:'', films:['マンダロリアン(TV)'], desc:'ダークセーバーを操る帝国残党の指揮官。グローグーを狙う。' },
  { id:'bocatan', name:'ボ＝カターン・クライズ',  faction:'neutral', size:7,  image:'', films:['クローン・ウォーズ(TV)','マンダロリアン(TV)'], desc:'マンダロアの再興を目指す戦士。クライズ氏族の継承者。' },
  { id:'fennec',  name:'フェネック・シャンド',    faction:'neutral', size:7,  image:'', films:['マンダロリアン(TV)','ボバ・フェット(TV)'], desc:'凄腕の暗殺者。ボバ・フェットの右腕となる。' },
  { id:'greef',   name:'グリーフ・カルガ',        faction:'neutral', size:6,  image:'', films:['マンダロリアン(TV)'], desc:'賞金稼ぎギルドの元締め。後にネヴァロの行政官に。' },
  { id:'ig11',    name:'IG-11',                  faction:'neutral', size:6,  image:'', films:['マンダロリアン(TV)'], desc:'暗殺ドロイドから保育・護衛ドロイドへ転じた。' },
  // --- ローグ・ワン ---
  { id:'saw',     name:'ソウ・ゲレラ',            faction:'rebel',   size:6,  image:'', films:['ローグ・ワン','クローン・ウォーズ(TV)'], desc:'過激派の反乱者。幼いジンを育てた。' },
  { id:'chirrut', name:'チアルート・イムウェ',    faction:'rebel',   size:6,  image:'', films:['ローグ・ワン'], desc:'フォースを信じる盲目の武道家。' },
  { id:'baze',    name:'ベイズ・マルバス',        faction:'rebel',   size:6,  image:'', films:['ローグ・ワン'], desc:'重火器を操る傭兵。チアルートの相棒。' },
  { id:'k2so',    name:'K-2SO',                  faction:'rebel',   size:6,  image:'', films:['ローグ・ワン','アンドー(TV)'], desc:'再プログラムされた帝国製の護衛ドロイド。カッシアンの相棒。' },
  { id:'bodhi',   name:'ボーディー・ルック',      faction:'rebel',   size:6,  image:'', films:['ローグ・ワン'], desc:'帝国を離反した貨物パイロット。設計図奪取の鍵を握る。' },
  // --- 公式キャラ一覧より追加 ---
  { id:'beru',    name:'ベルー・ラーズ',          faction:'neutral', size:6,  image:'', films:['EP2','EP4'], desc:'タトゥイーンでルークを育てた叔母。' },
  { id:'sebulba', name:'セブルバ',                faction:'neutral', size:6,  image:'', films:['EP1'], desc:'ポッドレースでアナキンと競った荒くれ者のダグ族。' },
  { id:'greedo',  name:'グリード',                faction:'neutral', size:6,  image:'', films:['EP1','EP4'], desc:'ジャバに雇われたロディア人の賞金稼ぎ。' },
  { id:'jawa',    name:'ジャワ',                  faction:'neutral', size:5,  image:'', films:['EP1','EP2','EP4'], desc:'タトゥイーンでスクラップを売買する小柄な種族。' },
  { id:'battledroid', name:'バトル・ドロイド',    faction:'sith',    size:6,  image:'', films:['EP1','EP2','EP3'], desc:'通商連合・分離主義勢力の量産歩兵ドロイド。' },
  { id:'superbd', name:'スーパー・バトル・ドロイド', faction:'sith', size:6, image:'', films:['EP2','EP3'], desc:'重装甲化された強化型バトル・ドロイド。' },
  { id:'droideka',name:'ドロイデカ',              faction:'sith',    size:6,  image:'', films:['EP1','EP2','EP3'], desc:'球状に変形しシールドを張る破壊ドロイド。' },
  { id:'stormtrooper', name:'ストームトルーパー', faction:'sith',    size:6,  image:'', films:['EP4','EP5','EP6'], desc:'銀河帝国の白い装甲をまとった歩兵部隊。' },
  { id:'deathtrooper', name:'デス・トルーパー',   faction:'sith',    size:6,  image:'', films:['ローグ・ワン'], desc:'クレニック直属の黒装甲の精鋭兵。' },
  { id:'beckett', name:'トバイアス・ベケット',    faction:'neutral', size:7,  image:'', films:['ハン・ソロ'], desc:'ハンに裏社会の手ほどきをした熟練の盗賊。' },
  { id:'qira',    name:'キーラ',                  faction:'neutral', size:7,  image:'', films:['ハン・ソロ'], desc:'ハンの幼馴染。犯罪組織クリムゾン・ドーンで頭角を現す。' },
  { id:'dryden',  name:'ドライデン・ヴォス',      faction:'sith',    size:7,  image:'', films:['ハン・ソロ'], desc:'クリムゾン・ドーンを率いる冷酷な犯罪王。' },
  { id:'l337',    name:'L3-37',                  faction:'neutral', size:6,  image:'', films:['ハン・ソロ'], desc:'ランドの自律型ドロイド。ドロイドの自由を求める。' },
  { id:'do',      name:'D-O',                    faction:'rebel',   size:5,  image:'', films:['EP9'], desc:'レイたちと旅する小さな車輪型ドロイド。' },
  { id:'kuiil',   name:'クイール',                faction:'neutral', size:6,  image:'', films:['マンダロリアン(TV)'], desc:'「そうあるべきだ」が口癖の働き者のウグナウト。' },
  { id:'armorer', name:'アーマラー',              faction:'neutral', size:7,  image:'', films:['マンダロリアン(TV)'], desc:'マンダロリアンの鎧を鍛える氏族の長。' },
  // ===== Wikipedia 正史一覧より網羅追加 =====
  // --- プリクエル：ジェダイ評議会・ナイト ---
  { id:'shaakti', name:'シャク・ティ',            faction:'jedi',    size:6, image:'', films:['EP2','EP3'], desc:'トグルータ族のジェダイ・マスター。' },
  { id:'adigallia', name:'アディ・ガリア',        faction:'jedi',    size:6, image:'', films:['EP1','EP2'], desc:'評議会に名を連ねるジェダイ・マスター。' },
  { id:'agenkolar', name:'エージェン・コーラー',  faction:'jedi',    size:6, image:'', films:['EP2','EP3'], desc:'ザブラク族のジェダイ・マスター。' },
  { id:'barriss', name:'バリス・オフィー',        faction:'jedi',    size:6, image:'', films:['EP2'], desc:'ルミナーラの弟子。後にジェダイに背く。' },
  { id:'sianj',   name:'シン・ドローリグ',        faction:'jedi',    size:5, image:'', films:['EP2'], desc:'ジオノーシスの戦いに参加したジェダイ。' },
  { id:'ckcaj',   name:'コールマン・カジ',        faction:'jedi',    size:5, image:'', films:['EP3'], desc:'評議会に席を持つジェダイ・マスター。' },
  { id:'ctrebor', name:'コールマン・トレバー',    faction:'jedi',    size:5, image:'', films:['EP2'], desc:'ジオノーシスで散ったジェダイ・マスター。' },
  { id:'depa',    name:'デパ・ビラバ',            faction:'jedi',    size:6, image:'', films:['EP1'], desc:'メイスの弟子でもあった評議会のジェダイ。' },
  { id:'eeth',    name:'イース・コス',            faction:'jedi',    size:5, image:'', films:['EP1','EP2','EP3'], desc:'ザブラク族のジェダイ・マスター。' },
  { id:'evenpiell', name:'イーヴン・ピール',      faction:'jedi',    size:5, image:'', films:['EP1'], desc:'小柄ながら屈強なジェダイ・マスター。' },
  { id:'jocasta', name:'ジョカスタ・ヌー',        faction:'jedi',    size:5, image:'', films:['EP2'], desc:'ジェダイ・アーカイブの司書。' },
  { id:'kiadi',   name:'キ＝アディ＝ムンディ',    faction:'jedi',    size:6, image:'', films:['EP1','EP2','EP3'], desc:'長い頭を持つセリア人のジェダイ・マスター。' },
  { id:'luminara', name:'ルミナーラ・アンドゥリィ', faction:'jedi',  size:6, image:'', films:['EP2','EP3'], desc:'規律を重んじるミリアラン族のジェダイ。' },
  { id:'oppo',    name:'オポー・ランシシス',      faction:'jedi',    size:5, image:'', films:['EP1'], desc:'評議会の長老格のジェダイ・マスター。' },
  { id:'plo',     name:'プロ・クーン',            faction:'jedi',    size:6, image:'', films:['EP1','EP2','EP3'], desc:'呼吸マスクを着けたケル・ドア族のジェダイ。' },
  { id:'quinlan', name:'クインラン・ヴォス',      faction:'jedi',    size:6, image:'', films:['EP3'], desc:'記憶を読む力を持つ型破りなジェダイ。' },
  { id:'saesee',  name:'セイシー・ティン',        faction:'jedi',    size:5, image:'', films:['EP1','EP2','EP3'], desc:'イクトッチ族の沈着なジェダイ・マスター。' },
  { id:'sifo',    name:'サイフォ＝ディアス',      faction:'jedi',    size:5, image:'', films:['EP2'], desc:'クローン軍を密かに発注した謎のジェダイ。' },
  { id:'stass',   name:'スタス・アリー',          faction:'jedi',    size:5, image:'', films:['EP2','EP3'], desc:'アディ・ガリアの親類にあたるジェダイ。' },
  { id:'yaddle',  name:'ヤドル',                  faction:'jedi',    size:5, image:'', films:['EP1'], desc:'ヨーダと同じ種族の女性ジェダイ・マスター。' },
  { id:'yarael',  name:'ヤレアル・プーフ',        faction:'jedi',    size:5, image:'', films:['EP1'], desc:'長い首を持つキ・ノク族のジェダイ・マスター。' },
  // --- プリクエル：シス ---
  { id:'ventress', name:'アサージ・ヴェントレス', faction:'sith',    size:7, image:'', films:['クローン・ウォーズ(TV)'], desc:'ドゥークーの暗殺者。ダソミアの魔女。' },
  { id:'plagueis', name:'ダース・プレイガス',     faction:'sith',    size:6, image:'', films:['EP3'], desc:'パルパティーンの師とされる伝説のシス卿。' },
  // --- 共和国・元老院 ---
  { id:'valorum', name:'フィニーズ・ヴァローラム', faction:'neutral', size:6, image:'', films:['EP1'], desc:'パルパティーンの前任の最高議長。' },
  // --- ナブー ---
  { id:'jamillia', name:'ジャミリア女王',         faction:'neutral', size:5, image:'', films:['EP2'], desc:'パドメの後を継いだナブーの女王。' },
  { id:'apailana', name:'アペイラーナ女王',       faction:'neutral', size:5, image:'', films:['EP3'], desc:'クローン大戦末期のナブーの女王。' },
  { id:'panaka',  name:'クァーシュ・パナカ',      faction:'neutral', size:6, image:'', films:['EP1'], desc:'パドメを守るナブーの警備隊長。' },
  { id:'typho',   name:'グレガー・タイフォ',      faction:'neutral', size:6, image:'', films:['EP2'], desc:'パドメの護衛を務める隻眼の隊長。' },
  { id:'sibble',  name:'シオ・ビブル',            faction:'neutral', size:5, image:'', films:['EP1','EP2'], desc:'ナブーの総督。' },
  { id:'corde',   name:'コーデ',                  faction:'neutral', size:5, image:'', films:['EP2'], desc:'パドメの身代わりを務めた侍女。' },
  { id:'bossnass', name:'ボス・ナス',             faction:'neutral', size:6, image:'', films:['EP1'], desc:'グンガン族を統べる長。' },
  // --- タトゥイーン ---
  { id:'cliegg',  name:'クリーグ・ラーズ',        faction:'neutral', size:6, image:'', films:['EP2'], desc:'シミを妻に迎えた農夫。オーウェンの父。' },
  { id:'owen',    name:'オーウェン・ラーズ',      faction:'neutral', size:6, image:'', films:['EP2','EP3','EP4'], desc:'ルークを育てた叔父。ベルーの夫。' },
  { id:'watto',   name:'ワトー',                  faction:'neutral', size:6, image:'', films:['EP1','EP2'], desc:'アナキン親子を所有していたトイダリア人の商人。' },
  { id:'gardulla', name:'ガーデュラ・ザ・ハット', faction:'neutral', size:6, image:'', films:['EP1'], desc:'かつてジャバと勢力を争ったハット族。' },
  { id:'ratts',   name:'ラッツ・タイレル',        faction:'neutral', size:5, image:'', films:['EP1'], desc:'ブーンタ・イヴ・レースの出場者。' },
  { id:'benq',    name:'ベン・クァディナロス',    faction:'neutral', size:5, image:'', films:['EP1'], desc:'多腕種族のポッドレーサー。' },
  { id:'boles',   name:'ボールズ・ロア',          faction:'neutral', size:5, image:'', films:['EP1'], desc:'ポッドレースの出場者。' },
  { id:'mawhonic', name:'マホーニック',           faction:'neutral', size:5, image:'', films:['EP1'], desc:'グラン族のポッドレーサー。' },
  { id:'teemto',  name:'ティーント・パガリス',    faction:'neutral', size:5, image:'', films:['EP1'], desc:'ヴィーン族のポッドレーサー。' },
  { id:'gasgano', name:'ガスガノ',                faction:'neutral', size:5, image:'', films:['EP1'], desc:'多指のジン・トー族のポッドレーサー。' },
  { id:'oddy',    name:'オディ・マンドレル',      faction:'neutral', size:5, image:'', films:['EP1'], desc:'ポッドレースの常連出場者。' },
  { id:'fodebeed', name:'フォード&ビード',        faction:'neutral', size:5, image:'', films:['EP1'], desc:'ブーンタ・イヴ・レースの二頭実況者。' },
  // --- 独立星系連合・通商連合 ---
  { id:'rune',    name:'ルーン・ハーコ',          faction:'sith',    size:5, image:'', films:['EP1'], desc:'ヌート・ガンレイの副官。' },
  { id:'dofine',  name:'ドールテイ・ドファイン',  faction:'sith',    size:5, image:'', films:['EP1'], desc:'通商連合の艦長。' },
  { id:'lushros', name:'ラシュロス・ドファイン',  faction:'sith',    size:5, image:'', films:['EP3'], desc:'インビジブル・ハンドの艦長。' },
  { id:'lottdod', name:'ロット・ドッド',          faction:'sith',    size:5, image:'', films:['EP1','EP2'], desc:'通商連合の元老院代表。' },
  { id:'poggle',  name:'ポグル・ザ・レッサー',    faction:'sith',    size:6, image:'', films:['EP2','EP3'], desc:'ジオノーシアンの大公。兵器工場を統べる。' },
  { id:'lamasu',  name:'ラマ・スー',              faction:'neutral', size:6, image:'', films:['EP2'], desc:'カミーノのクローン製造を統括する首相。' },
  { id:'taunwe',  name:'トーン・ウィ',            faction:'neutral', size:5, image:'', films:['EP2'], desc:'カミーノのクローン施設の管理者。' },
  { id:'zam',     name:'ザム・ウェセル',          faction:'neutral', size:6, image:'', films:['EP2'], desc:'パドメ暗殺を請け負った変身能力者。' },
  { id:'dexter',  name:'デクスター・ジェッスター', faction:'neutral', size:6, image:'', films:['EP2'], desc:'オビ=ワンに情報を与える食堂の主人。' },
  // --- オリジナル：反乱同盟 ---
  { id:'dodonna', name:'ジャン・ドドンナ',        faction:'rebel',   size:6, image:'', films:['EP4'], desc:'デス・スター攻略を立案した反乱同盟の将軍。' },
  { id:'monmothma', name:'モン・モスマ',          faction:'rebel',   size:7, image:'', films:['EP6','ローグ・ワン'], desc:'反乱同盟を率いる指導者。' },
  { id:'nien',    name:'ナイン・ナン',            faction:'rebel',   size:5, image:'', films:['EP6','EP9'], desc:'ファルコンの副操縦士を務めたサラスタン人。' },
  { id:'arvel',   name:'アーヴェル・クライニッド', faction:'rebel',   size:5, image:'', films:['EP6'], desc:'第二デス・スター戦で散ったAウィング乗り。' },
  { id:'biggs',   name:'ビッグス・ダークライター', faction:'rebel',  size:5, image:'', films:['EP4'], desc:'ルークの幼馴染のパイロット。' },
  { id:'porkins', name:'ジェク・ポーキンズ',      faction:'rebel',   size:5, image:'', films:['EP4'], desc:'ヤヴィンの戦いに参加したXウィング乗り。' },
  { id:'lobot',   name:'ロボト',                  faction:'neutral', size:5, image:'', films:['EP5'], desc:'ランドを補佐するクラウド・シティの管理者。' },
  // --- オリジナル：銀河帝国 ---
  { id:'piett',   name:'ファーマス・ピエット',    faction:'sith',    size:6, image:'', films:['EP5','EP6'], desc:'エグゼクターを預かる帝国提督。' },
  { id:'veers',   name:'マクシミリアン・ヴィアーズ', faction:'sith', size:6, image:'', films:['EP5'], desc:'ホスでAT-AT部隊を率いた帝国将軍。' },
  { id:'tagge',   name:'カシオ・タッグ',          faction:'sith',    size:5, image:'', films:['EP4'], desc:'デス・スターの会議に出席した帝国将軍。' },
  { id:'jerjerrod', name:'ティアン・ジャジャーロッド', faction:'sith', size:5, image:'', films:['EP6'], desc:'第二デス・スター建造を監督した司令官。' },
  { id:'ozzel',   name:'ケンダル・オゼル',        faction:'sith',    size:5, image:'', films:['EP5'], desc:'ベイダーに粛清された帝国提督。' },
  { id:'motti',   name:'コナン・アントニオ・モッティ', faction:'sith', size:5, image:'', films:['EP4'], desc:'フォースを侮りベイダーに締め上げられた提督。' },
  { id:'needa',   name:'ロース・ニーダ',          faction:'sith',    size:5, image:'', films:['EP5'], desc:'ファルコンを取り逃しベイダーに処された艦長。' },
  // --- オリジナル：犯罪組織・賞金稼ぎ ---
  { id:'bib',     name:'ビブ・フォーチュナ',      faction:'neutral', size:6, image:'', films:['EP6'], desc:'ジャバの執事を務めたトワイレック。' },
  { id:'ig88',    name:'IG-88',                  faction:'neutral', size:6, image:'', films:['EP5'], desc:'ベイダーに雇われた暗殺ドロイドの賞金稼ぎ。' },
  { id:'fourlom', name:'4-LOM',                  faction:'neutral', size:5, image:'', films:['EP5'], desc:'プロトコル・ドロイドから転じた賞金稼ぎ。' },
  { id:'zuckuss', name:'ザッカス',                faction:'neutral', size:5, image:'', films:['EP5'], desc:'グランド族の賞金稼ぎ。4-LOMの相棒。' },
  { id:'bossk',   name:'ボスク',                  faction:'neutral', size:6, image:'', films:['EP5'], desc:'トランドーシャン族の爬虫類型賞金稼ぎ。' },
  // --- 続三部作：新共和国・レジスタンス ---
  { id:'holdo',   name:'アミリン・ホルド',        faction:'rebel',   size:7, image:'', films:['EP8'], desc:'身を挺してレジスタンスを救った提督。' },
  { id:'connix',  name:'ケイデル・コー・コニックス', faction:'rebel', size:5, image:'', films:['EP7','EP8','EP9'], desc:'レジスタンス司令部の若き士官。' },
  { id:'snap',    name:'スナップ・ウェクスリー',  faction:'rebel',   size:5, image:'', films:['EP7','EP8','EP9'], desc:'レジスタンスのベテランパイロット。' },
  { id:'lorsan',  name:'ロー・サン・テッカ',      faction:'rebel',   size:6, image:'', films:['EP7'], desc:'ルークの手がかりを守っていた探検家。' },
  { id:'villecham', name:'ラネヴァー・ヴィルチャム', faction:'neutral', size:5, image:'', films:['EP7'], desc:'新共和国の最高議長。' },
  { id:'ematt',   name:'カルアン・イーマット',    faction:'rebel',   size:5, image:'', films:['EP7'], desc:'反乱同盟以来のレジスタンス将校。' },
  { id:'beaumont', name:'ボーモント・キン',       faction:'rebel',   size:5, image:'', films:['EP9'], desc:'歴史に通じたレジスタンスの士官。' },
  // --- 続三部作：ファースト・オーダー ---
  { id:'canady',  name:'モーデン・キャナディ',    faction:'sith',    size:5, image:'', films:['EP8'], desc:'ドレッドノートを指揮した古参の大佐。' },
  { id:'pryde',   name:'エンリック・プライド',    faction:'sith',    size:6, image:'', films:['EP9'], desc:'シディアスに通じたファイナル・オーダーの提督。' },
  // --- 続三部作：無法者 ---
  { id:'dj',      name:'DJ',                     faction:'neutral', size:5, image:'', films:['EP8'], desc:'信義より利を取るコードブレイカー。' },
  { id:'zorii',   name:'ゾーリ・ブリス',          faction:'neutral', size:6, image:'', films:['EP9'], desc:'キジーミの密輸業者。ポーの旧知。' },
  // --- マンダロリアン ---
  { id:'cara',    name:'キャラ・デューン',        faction:'neutral', size:7, image:'', films:['マンダロリアン(TV)'], desc:'元反乱同盟の特殊部隊出身の歴戦の戦士。' },
  { id:'pershing', name:'ドクター・パーシング',   faction:'neutral', size:5, image:'', films:['マンダロリアン(TV)'], desc:'グローグーを狙う帝国残党の科学者。' },
  { id:'peli',    name:'ペリ・モット',            faction:'neutral', size:6, image:'', films:['マンダロリアン(TV)'], desc:'モス・アイズリーの整備士。' },
  { id:'mayfeld', name:'ミグズ・メイフェルド',    faction:'neutral', size:6, image:'', films:['マンダロリアン(TV)'], desc:'元帝国兵の傭兵。マンドと共闘する。' },
  { id:'koska',   name:'コスカ・リーヴス',        faction:'neutral', size:6, image:'', films:['マンダロリアン(TV)'], desc:'ボ＝カターンに従うマンダロリアンの戦士。' },
  // --- ローグ・ワン ---
  { id:'raddus',  name:'ラダス',                  faction:'rebel',   size:6, image:'', films:['ローグ・ワン'], desc:'スカリフの戦いを率いたモン・カラマリの提督。' },
  { id:'galen',   name:'ゲイレン・アーソ',        faction:'neutral', size:6, image:'', films:['ローグ・ワン'], desc:'デス・スターに弱点を仕込んだ設計者。ジンの父。' },
  { id:'lyra',    name:'ライラ・アーソ',          faction:'neutral', size:5, image:'', films:['ローグ・ワン'], desc:'ジンの母。ゲイレンの妻。' },
  // --- ハン・ソロ ---
  { id:'proxima', name:'レディ・プロキシマ',      faction:'neutral', size:6, image:'', films:['ハン・ソロ'], desc:'コレリアの犯罪組織を仕切る首領。' },
  { id:'moloch',  name:'モロック',                faction:'neutral', size:5, image:'', films:['ハン・ソロ'], desc:'プロキシマ配下の追手。' },
  { id:'val',     name:'ヴァル',                  faction:'neutral', size:5, image:'', films:['ハン・ソロ'], desc:'ベケットの相棒にして恋人。' },
  { id:'rio',     name:'リオ・デュラント',        faction:'neutral', size:5, image:'', films:['ハン・ソロ'], desc:'ベケット一味の多腕の操縦士。' },
  { id:'enfys',   name:'エンフィス・ネスト',      faction:'neutral', size:6, image:'', films:['ハン・ソロ'], desc:'クラウド・ライダーズを率いる謎の襲撃者。' },
];

// 関係性（リンク）：[ノードAのid, ノードBのid, 関係タイプ(RELのキー)]
export const links = [
  ['luke','leia','family'], ['luke','vader','family'], ['leia','vader','family'],
  ['luke','anakin','family'], ['anakin','vader','master'], // 同一人物→特別扱い
  ['luke','obiwan','master'], ['anakin','obiwan','master'], ['obiwan','quigon','master'],
  ['anakin','yoda','master'], ['luke','yoda','master'],
  ['anakin','padme','romance'], ['padme','luke','family'], ['padme','leia','family'],
  ['han','leia','romance'], ['han','chewie','ally'], ['han','luke','ally'], ['han','lando','ally'],
  ['r2d2','c3po','ally'], ['r2d2','luke','ally'], ['r2d2','anakin','ally'], ['c3po','padme','ally'],
  ['anakin','palpatine','master'], ['palpatine','vader','master'], ['palpatine','yoda','enemy'],
  ['palpatine','maul','master'], ['obiwan','maul','enemy'], ['obiwan','grievous','enemy'],
  ['palpatine','grievous','ally'], ['vader','obiwan','enemy'], ['vader','luke','enemy'],
  ['rey','kylo','enemy'], ['rey','finn','ally'], ['rey','luke','master'], ['rey','leia','master'],
  ['finn','poe','ally'], ['poe','leia','ally'], ['kylo','han','family'], ['kylo','leia','family'],
  ['kylo','palpatine','master'], ['rey','palpatine','family'],
  ['mando','grogu','family'], ['grogu','luke','master'], ['grogu','yoda','ally'],
  ['boba','mando','ally'], ['boba','vader','ally'], ['boba','han','enemy'],
  ['rotta','hutttwins','family'], ['boba','hutttwins','enemy'],
  ['jabba','rotta','family'], ['jabba','hutttwins','family'], ['jabba','boba','ally'],
  ['jabba','han','enemy'], ['jabba','leia','enemy'], ['jabba','luke','enemy'],
  // 前日譚（プリクエル / クローン大戦）
  ['dooku','yoda','master'], ['dooku','quigon','master'], ['dooku','palpatine','master'],
  ['dooku','obiwan','enemy'], ['dooku','anakin','enemy'], ['dooku','grievous','ally'], ['dooku','jango','ally'],
  ['mace','yoda','ally'], ['mace','palpatine','enemy'], ['mace','anakin','ally'], ['mace','obiwan','ally'],
  ['jango','boba','family'], ['jango','obiwan','enemy'],
  ['ahsoka','anakin','master'], ['ahsoka','maul','enemy'], ['ahsoka','vader','enemy'],
  ['ahsoka','mando','ally'], ['ahsoka','grogu','ally'],
  // 続三部作（ファースト・オーダー）
  ['snoke','kylo','master'], ['snoke','palpatine','master'], ['snoke','rey','enemy'],
  ['hux','kylo','ally'], ['hux','snoke','ally'], ['phasma','finn','enemy'], ['phasma','hux','ally'],
  ['bb8','poe','ally'], ['bb8','rey','ally'], ['bb8','finn','ally'],
  // ローグ・ワン
  ['jyn','leia','ally'], ['jyn','vader','enemy'], ['jyn','cassian','ally'],
  ['jyn','krennic','enemy'], ['krennic','vader','ally'],
  // 追加キャラの関係
  ['shmi','anakin','family'],
  ['bail','leia','family'], ['bail','padme','ally'], ['bail','obiwan','ally'],
  ['jarjar','padme','ally'], ['jarjar','quigon','ally'], ['jarjar','obiwan','ally'],
  ['rex','ahsoka','ally'], ['rex','anakin','ally'], ['cody','obiwan','ally'], ['cody','rex','ally'],
  ['nute','palpatine','ally'], ['nute','dooku','ally'], ['nute','grievous','ally'],
  ['aayla','yoda','ally'], ['aayla','mace','ally'], ['kitfisto','mace','ally'], ['kitfisto','yoda','ally'],
  ['tarkin','vader','ally'], ['tarkin','palpatine','ally'], ['tarkin','leia','enemy'], ['tarkin','krennic','enemy'],
  ['wedge','luke','ally'], ['wedge','poe','ally'],
  ['ackbar','leia','ally'], ['ackbar','lando','ally'],
  ['wicket','leia','ally'], ['wicket','han','ally'],
  ['maz','han','ally'], ['maz','finn','ally'], ['maz','rey','ally'],
  ['rose','finn','romance'], ['rose','poe','ally'],
  ['gideon','mando','enemy'], ['gideon','grogu','enemy'], ['gideon','bocatan','enemy'],
  ['bocatan','mando','ally'], ['bocatan','ahsoka','ally'],
  ['fennec','boba','ally'], ['fennec','mando','ally'], ['greef','mando','ally'], ['greef','fennec','ally'],
  ['ig11','mando','ally'], ['ig11','grogu','ally'],
  ['saw','jyn','family'], ['saw','cassian','ally'],
  ['chirrut','baze','ally'], ['chirrut','jyn','ally'], ['baze','cassian','ally'],
  ['k2so','cassian','ally'], ['k2so','jyn','ally'], ['bodhi','jyn','ally'], ['bodhi','cassian','ally'],
  // 公式一覧より追加したキャラの関係
  ['beru','luke','family'], ['beru','anakin','family'], ['beru','shmi','family'],
  ['sebulba','anakin','enemy'],
  ['greedo','han','enemy'], ['greedo','jabba','ally'],
  ['jawa','r2d2','ally'], ['jawa','c3po','ally'],
  ['battledroid','nute','ally'], ['battledroid','grievous','ally'], ['battledroid','droideka','ally'],
  ['superbd','battledroid','ally'], ['superbd','grievous','ally'], ['droideka','nute','ally'],
  ['stormtrooper','vader','ally'], ['stormtrooper','palpatine','ally'], ['stormtrooper','tarkin','ally'],
  ['deathtrooper','krennic','ally'], ['deathtrooper','stormtrooper','ally'],
  ['beckett','han','master'], ['beckett','chewie','ally'], ['beckett','qira','ally'], ['beckett','dryden','ally'],
  ['qira','han','romance'], ['qira','dryden','ally'], ['qira','maul','ally'], ['qira','l337','ally'],
  ['dryden','han','enemy'],
  ['l337','lando','ally'],
  ['do','bb8','ally'], ['do','rey','ally'], ['do','poe','ally'],
  ['kuiil','mando','ally'], ['kuiil','ig11','ally'], ['kuiil','grogu','ally'],
  ['armorer','mando','ally'], ['armorer','bocatan','ally'],
  // ===== 網羅追加キャラの関係 =====
  // プリクエル：ジェダイ評議会（mace/yoda を軸に）
  ['shaakti','mace','ally'], ['shaakti','yoda','ally'],
  ['adigallia','mace','ally'], ['agenkolar','mace','ally'], ['barriss','luminara','master'],
  ['barriss','ahsoka','enemy'], ['sianj','mace','ally'], ['ckcaj','mace','ally'],
  ['ctrebor','mace','ally'], ['depa','mace','master'], ['eeth','mace','ally'],
  ['evenpiell','yoda','ally'], ['jocasta','obiwan','ally'], ['kiadi','mace','ally'],
  ['kiadi','yoda','ally'], ['luminara','yoda','ally'], ['oppo','yoda','ally'],
  ['plo','mace','ally'], ['plo','yoda','ally'], ['quinlan','obiwan','ally'],
  ['saesee','mace','ally'], ['sifo','dooku','ally'], ['sifo','yoda','ally'],
  ['stass','adigallia','family'], ['stass','mace','ally'], ['yaddle','yoda','ally'],
  ['yarael','mace','ally'],
  // プリクエル：シス
  ['ventress','dooku','master'], ['ventress','obiwan','enemy'], ['ventress','ahsoka','enemy'],
  ['plagueis','palpatine','master'],
  // 共和国・元老院
  ['valorum','palpatine','ally'], ['valorum','padme','ally'],
  // ナブー
  ['jamillia','padme','ally'], ['apailana','padme','ally'], ['panaka','padme','ally'],
  ['typho','padme','ally'], ['sibble','padme','ally'], ['corde','padme','ally'],
  ['bossnass','jarjar','ally'], ['bossnass','padme','ally'],
  // タトゥイーン
  ['cliegg','shmi','romance'], ['cliegg','owen','family'], ['cliegg','anakin','family'],
  ['owen','beru','romance'], ['owen','luke','family'], ['owen','anakin','family'],
  ['watto','anakin','enemy'], ['watto','shmi','enemy'], ['gardulla','jabba','family'],
  ['gardulla','watto','ally'],
  ['ratts','sebulba','ally'], ['benq','sebulba','ally'], ['boles','sebulba','ally'],
  ['mawhonic','sebulba','ally'], ['teemto','sebulba','ally'], ['gasgano','sebulba','ally'],
  ['oddy','sebulba','ally'], ['fodebeed','sebulba','ally'], ['ratts','anakin','enemy'],
  ['gasgano','anakin','enemy'],
  // 独立星系連合・通商連合
  ['rune','nute','ally'], ['dofine','nute','ally'], ['lushros','grievous','ally'],
  ['lottdod','nute','ally'], ['poggle','dooku','ally'], ['poggle','nute','ally'],
  ['lamasu','jango','ally'], ['lamasu','obiwan','ally'], ['taunwe','lamasu','ally'],
  ['taunwe','obiwan','ally'], ['zam','jango','ally'], ['zam','padme','enemy'],
  ['dexter','obiwan','ally'],
  // オリジナル：反乱同盟
  ['dodonna','leia','ally'], ['monmothma','leia','ally'], ['monmothma','bail','ally'],
  ['nien','lando','ally'], ['arvel','ackbar','ally'], ['biggs','luke','ally'],
  ['porkins','luke','ally'], ['porkins','wedge','ally'], ['lobot','lando','ally'],
  // オリジナル：銀河帝国
  ['piett','vader','ally'], ['veers','vader','ally'], ['tagge','tarkin','ally'],
  ['jerjerrod','palpatine','ally'], ['ozzel','vader','enemy'], ['ozzel','piett','ally'],
  ['motti','tarkin','ally'], ['motti','vader','enemy'], ['needa','vader','enemy'],
  // オリジナル：犯罪組織・賞金稼ぎ
  ['bib','jabba','ally'], ['ig88','boba','ally'], ['fourlom','zuckuss','ally'],
  ['zuckuss','boba','ally'], ['bossk','boba','ally'],
  // 続三部作：レジスタンス
  ['holdo','leia','ally'], ['holdo','poe','ally'], ['connix','leia','ally'],
  ['snap','poe','ally'], ['lorsan','leia','ally'], ['villecham','leia','ally'],
  ['ematt','leia','ally'], ['beaumont','poe','ally'],
  // 続三部作：ファースト・オーダー
  ['canady','hux','ally'], ['pryde','kylo','ally'], ['pryde','hux','ally'],
  ['pryde','palpatine','ally'],
  // 続三部作：無法者
  ['dj','finn','ally'], ['dj','rose','ally'], ['zorii','poe','ally'],
  // マンダロリアン
  ['cara','mando','ally'], ['cara','greef','ally'], ['pershing','gideon','ally'],
  ['peli','mando','ally'], ['mayfeld','mando','ally'], ['koska','bocatan','ally'], ['koska','mando','ally'],
  // ローグ・ワン
  ['raddus','monmothma','ally'], ['raddus','jyn','ally'], ['galen','jyn','family'],
  ['galen','krennic','enemy'], ['galen','lyra','romance'], ['lyra','jyn','family'],
  // ハン・ソロ
  ['proxima','qira','enemy'], ['proxima','han','enemy'], ['moloch','proxima','ally'],
  ['val','beckett','romance'], ['rio','beckett','ally'], ['rio','han','ally'],
  ['enfys','beckett','enemy'], ['enfys','han','ally'],
];

// ============================================================
//  画像URL（永続化）
//  id → 画像URL。ここに書いた画像は起動時に自動で球へ貼られ、
//  ページを再読み込みしても残る。
//  ※利用権のある／ライセンスの明確な画像URLのみを入れること。
//  （画面でドロップ／URL設定した画像は「📋 URL書出」でこの形式に出力できる）
// ============================================================
// 値は文字列（URL）か、クレジット付きの { url, credit } を指定できる。
//   luke: 'https://example.com/luke.jpg',
//   leia: { url: 'https://example.com/leia.jpg', credit: 'Photo by X / CC BY-SA, Wikimedia' },
export const IMAGES = {
};

// IMAGES を各ノードの image / credit に反映
nodes.forEach(n => {
  const v = IMAGES[n.id];
  if (!v) return;
  if (typeof v === 'string') { n.image = v; }
  else { n.image = v.url; n.credit = v.credit; }
});

// --- 画像の永続化（ブラウザの localStorage） ---
// data.js の IMAGES に加え、ユーザーが貼った画像（ドロップ／URL）を localStorage に保存し、
// 起動時に復元する。ローカル画像（dataURL）もこれで再読み込み後に残る。
const IMG_STORE_KEY = 'sw3d_images';

(function restoreSavedImages() {
  try {
    const saved = JSON.parse(localStorage.getItem(IMG_STORE_KEY) || '{}');
    nodes.forEach(n => {
      const v = saved[n.id];
      if (!v) return;
      if (typeof v === 'string') { n.image = v; }      // 旧形式（文字列）互換
      else { n.image = v.image; n.credit = v.credit; } // 新形式 { image, credit }
    });
  } catch (e) { /* 壊れていたら無視 */ }
})();

// 1キャラの画像（とクレジット）を保存。容量超過時は false を返す。
export function saveImageLocal(id, src, credit) {
  try {
    const m = JSON.parse(localStorage.getItem(IMG_STORE_KEY) || '{}');
    m[id] = credit ? { image: src, credit } : { image: src };
    localStorage.setItem(IMG_STORE_KEY, JSON.stringify(m));
    return true;
  } catch (e) {
    return false; // QuotaExceeded など
  }
}

// 保存した画像をすべて消す
export function clearImagesLocal() {
  localStorage.removeItem(IMG_STORE_KEY);
}

// ============================================================
//  重要度レベル（自動算出 + 主要キャラの底上げ）
//  各ノードに level(1=主要 〜 5=モブ) を付与する。
//  スコア = 関係の多さ*2 + 登場作品数。スコア順の「順位の割合」で
//  1〜5 に振り分ける。手作業のタグ付けは不要。
//  ただしサーガの主役級だけは VIP として Lv1 に固定する。
// ============================================================
export const MAX_LEVEL = 5;

// サーガの主役級（必ず Lv1）
const VIP = new Set([
  'luke', 'leia', 'han', 'vader', 'anakin', 'obiwan', 'palpatine', 'yoda',
  'rey', 'kylo', 'mando', 'grogu', 'padme', 'chewie', 'r2d2', 'c3po',
]);

(function assignLevels() {
  // 関係数（次数）を集計
  const deg = {};
  nodes.forEach(n => { deg[n.id] = 0; });
  links.forEach(l => { deg[l[0]]++; deg[l[1]]++; });

  // スコア降順に並べる
  const ranked = nodes
    .map(n => ({ id: n.id, score: deg[n.id] * 2 + (n.films ? n.films.length : 0) }))
    .sort((a, b) => b.score - a.score);

  // 順位の割合で 1〜5 に配分（累積割合の区切り）
  const cuts = [0.10, 0.25, 0.45, 0.70];
  const level = {};
  ranked.forEach((e, i) => {
    const r = i / ranked.length;
    level[e.id] = r < cuts[0] ? 1 : r < cuts[1] ? 2 : r < cuts[2] ? 3 : r < cuts[3] ? 4 : 5;
  });
  VIP.forEach(id => { if (id in level) level[id] = 1; });

  nodes.forEach(n => { n.level = level[n.id]; });
})();
