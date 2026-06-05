# 発信用テンプレート集（技術デモ主軸・安全寄り）

> 方針：**「Three.js で作った3D人物相関ビューア」という“技術デモ”を主役**にする。
> 題材（フランチャイズ）は「デモのサンプルデータ」という位置づけにして、
> 非営利・非公式を明示する。バズっても安全度が下がりにくい見せ方。

---

## 0. 非公式ディスクレーマー（全媒体で使う一文）

**日本語**
> 本作は非公式・非営利のファン制作です。Lucasfilm Ltd. および The Walt Disney Company とは一切関係がなく、公式の承認・後援も受けていません。作品名・キャラクター名等の商標・著作権は各権利者に帰属します。

**English**
> This is an unofficial, non-commercial fan project. Not affiliated with, endorsed, or sponsored by Lucasfilm Ltd. or The Walt Disney Company. All names, characters, and related marks are trademarks/copyrights of their respective owners.

※ 画面下の音楽クレジット（CC BY 4.0）は必ず残すこと。

---

## 1. GitHub README（推奨構成）

```markdown
# 3D Character Relationship Map — Three.js

ブラウザだけで動く、人物相関を 3D 空間に可視化するビューア。
力学レイアウト・陣営/関係/作品フィルタ・重要度レベル表示・検索連動リストを実装。
ビルドツールなし、素の ES Modules + Three.js（CDN）。

▶ デモ: https://<your-username>.github.io/<repo>/
（※サンプルデータはフィクション作品の人物相関。非公式ファン制作）

## 特長
- 3D 力学レイアウト（セルリスト法で軽量化）
- 陣営・関係タイプ・登場作品でのフィルタ（チェックボックス）
- 重要度レベルのスライダー表示（自動スコアリング）
- 名前検索 ⇄ サイドリスト ⇄ 3D ハイライトの連動
- マウス/タッチ操作、全画面、BGM（CC BY 音源）

## 技術スタック
- Three.js r160（importmap 経由・ビルド不要）
- Vanilla JS（ES Modules）/ data.js だけで題材を差し替え可能

## ローカル実行
    python -m http.server 8000   # → http://localhost:8000

## ライセンス / 免責
- コード: （MIT など自分で選択）
- サンプルデータの題材は非公式ファン制作。各権利は権利者に帰属。
- BGM: "Space Adventures Orchestra Music (Star Wars style)" by humanoide9000
  / freesound.org/s/676266/ / CC BY 4.0
```

> 安全メモ：公開リポジトリに著作物データ（`data.js` の人物名・説明）を含めるのが気になる場合は、
> **リポジトリにはパブリックドメイン題材のサンプルを同梱**し、フランチャイズ版はデプロイ先だけに置く構成が無難。

---

## 2. X（旧Twitter）投稿案

**日本語（技術デモ寄り）**
> ブラウザだけで動く「3D 人物相関ビューア」を Three.js で作りました🌌
> 力学レイアウト／陣営・関係・作品フィルタ／重要度スライダー／検索連動。
> データ（data.js）を差し替えれば題材を自由に変えられます。
> デモはフィクション作品の相関（非公式ファン制作）👇
> #threejs #個人開発 #dataviz #つくってみた
> 🔗 <URL>

**English**
> I built a 3D character-relationship map that runs entirely in the browser — Three.js, force layout, faction/relation/film filters, importance slider, search-linked list. Swap one data file to change the subject. Demo uses a fan dataset (unofficial). 👇
> #threejs #dataviz #creativecoding #webdev
> 🔗 <URL>

※ 画像/動画必須。回転→フィルタ→検索の 15〜30 秒 GIF を添付。

---

## 3. Reddit 投稿案

**r/threejs / r/webdev（タイトル）**
> Show: A 3D character-relationship map in the browser (Three.js, force layout, filters, importance levels)

**本文**
> Built with vanilla ES Modules + Three.js (no build step). Features: 3D force layout
> (cell-list optimized), checkbox filters for faction/relation/film, an importance slider,
> and a search box linked to a side list and 3D highlight. The whole dataset lives in a
> single data.js, so the subject is swappable.
>
> The demo dataset is a fan-made character map (unofficial, non-commercial; not affiliated
> with any rights holder). Feedback on the layout/UX welcome!
>
> Live: <URL> ・ Code: <repo>

**r/dataisbeautiful（タイトル例）**
> [OC] 3D character relationship map — interactive, force-directed (Three.js)

> ※ r/dataisbeautiful は [OC] 必須・ツール明記（Tool: Three.js）・自作であること。

---

## 4. Zenn / Qiita 記事の導入文案

**タイトル案**
> Three.js で「3D 人物相関ビューア」を作った — 力学レイアウト・フィルタ・重要度表示

**導入**
> ブラウザだけで動く人物相関の 3D ビューアを、ビルドツールなしの素の ES Modules +
> Three.js で作りました。本記事では、(1) 力学レイアウトをセルリスト法で軽量化した話、
> (2) 陣営・関係・登場作品のフィルタ設計、(3) 関係数と登場作品数から「重要度レベル」を
> 自動スコアリングして表示を段階化した仕組み、(4) 検索・サイドリスト・3D ハイライトの
> 状態連動、を中心に解説します。題材データは `data.js` 一枚に集約しており、差し替えれば
> 任意の相関図に転用できます（デモはフィクション作品・非公式ファン制作）。

---

## 5. 発信の段取り（おすすめ）
1. **30秒デモGIF**を用意（回転 → フィルタ → 検索 → レベルスライダー）。
2. まず **技術コミュニティ**（r/threejs・Three.js フォーラム Showcase・X #threejs・Zenn）。
3. 反応を見て **ファン層**（r/StarWars・X SW タグ）にも。※非営利・免責を明記。
4. 伸びたら **PD 題材版（三国志/ギリシャ神話）を本命の公開版**として展開し、技術の評価を資産化。

## 注意（再掲）
- 非営利を厳守（広告・寄付・課金なし）。
- 公式ロゴ/公式素材を使わない・「公式」を名乗らない。
- 権利者から要請が来たら速やかに取り下げる。
- BGM の CC BY クレジットは残す。
