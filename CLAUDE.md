# Claude Code 引き継ぎメモ

このプロジェクトは、ブラウザ上で動く Star Wars 人物相関 3D グラフです。
チャットで設計・実装した単一 HTML を、編集しやすいよう ES Modules で分割したものです。

## アーキテクチャ概要

ビルドツールなし、フレームワークなし。素の ES Modules + Three.js（CDN / importmap）。
`index.html` が `js/main.js` を `<script type="module">` で読み込み、main がほかを束ねる。

データの流れ:

```
data.js  (nodes/links/FACTION/REL)
   ↓
layout.js  (simulate でpos座標を計算, edges を生成)
   ↓
graph.js  (buildGraph: scene/camera/renderer + ノード・リンクのメッシュ)
   ↓
main.js  (animate ループ。controls と ui を接続)
   ├─ controls.js (cam 状態 + マウス/タッチ操作)
   └─ ui.js       (selection 状態 + クリック選択/リスト/検索/画像D&D)
```

## モジュール間で共有される状態（重要）

ファイルをまたぐ可変状態は 2 つだけ。どちらも export されたオブジェクト：

- `controls.js` の `cam` … カメラの現在値と目標値（targetRot/targetDist/targetPan）。
  `ui.js` の focusOnNode が `cam.targetPan/targetDist` を書き換え、
  `main.js` の animate ループが毎フレーム補間してカメラ位置を更新する。
- `ui.js` の `selection` … `{ index }`。選択中ノードの配列インデックス（未選択は -1）。
  `main.js` の animate ループがこれを読んでハイライトを描く。

`graph.js` の `buildGraph()` は scene 等とともに `applyImageToNode(i, url)` を返す。
これを `ui.js` に渡して、画像 D&D 時のテクスチャ貼り付けに使っている。

## 動作確認

`file://` 直開きは ES Modules の CORS で失敗する。必ず HTTP 経由：

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

簡易チェック:
```bash
node --check js/*.js           # 構文チェック
```

## 設計上の約束ごと

- **写真の扱い**: 著作権で保護された画像（映画スチル・俳優写真等）の URL を
  コードに埋め込まない。ユーザーが用意した画像（D&D または image フィールドの自前URL）のみ。
  D&D 画像は FileReader で dataURL 化してメモリ内で完結（外部送信なし）。
- **依存は最小**: 外部ライブラリは Three.js のみ。これを増やす場合は理由を明記。
- **データとロジックの分離**: キャラ・関係の増減は `data.js` だけで完結する設計を維持する。
  描画ロジック側（graph.js 等）にキャラ固有のハードコードを足さない。

## 拡張アイデア（未実装・やるなら）

- 関係性の凡例フィルタ（クリックで特定タイプのリンクだけ表示）
- レイアウトの再計算ボタン / ノードのドラッグ移動
- データの JSON 外部化＋エクスポート / インポート
- 関係タイプごとの線の太さ・点線表現
- URL ハッシュで選択状態を共有（#luke で起動時にルーク選択 等）

## 既知の注意点

- `simulate(400)` を起動時に同期実行している。ノード数が大幅に増えると
  反発計算が O(N^2) なので重くなる。数百ノード規模にするなら空間分割等の最適化が要る。
- ラベルはフォント読み込み後に位置確定させたいので、main.js で document.fonts.ready
  と 2 秒タイムアウトの二段構えで `start()` を呼んでいる（二重起動はフラグでガード）。
