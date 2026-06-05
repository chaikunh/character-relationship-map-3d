// ============================================================
//  ui.js — UI レイヤー
//  クリック選択 / 右リスト / 検索 / 画像ドラッグ＆ドロップ。
//  選択状態（selection.index）は animate ループからも参照される。
// ============================================================
import * as THREE from 'three';
import { nodes, FACTION, MAX_LEVEL, saveImageLocal, clearImagesLocal } from './data.js';
import { cam } from './controls.js';

// 選択状態。index = -1 は未選択。
export const selection = { index: -1 };

// 表示フィルタ。凡例のチェックボックスで切り替える。
// animate ループ（main.js）がこれを読んでノード／リンクの表示を決める。
export const filters = {
  faction: { jedi: true, sith: true, rebel: true, neutral: true },
  rel: { family: true, master: true, ally: true, enemy: true, romance: true },
  film: {}, // 作品キー → 表示true。データから動的に構築（下記）。
  level: MAX_LEVEL, // この値以下のレベル(=重要度が高い)だけ表示。MAX で全員。
};

// 表示レベルのラベル
const LEVEL_LABEL = { 1: '主要のみ', 2: '重要まで', 3: '準主要まで', 4: '脇役まで', 5: '全部' };

// 作品の並び順（この順でチェックを並べる。未知の作品は末尾）
const FILM_ORDER = [
  'EP1', 'EP2', 'EP3', 'EP4', 'EP5', 'EP6', 'EP7', 'EP8', 'EP9',
  'ローグ・ワン', 'ハン・ソロ',
  'クローン・ウォーズ(TV)', 'オビ=ワン(TV)', 'マンダロリアン(TV)',
  'ボバ・フェット(TV)', 'アソーカ(TV)', 'アンドー(TV)',
];

// データに出現する作品を重複なく集め、FILM_ORDER 順に並べる
function collectFilms() {
  const set = new Set();
  nodes.forEach(n => (n.films || []).forEach(f => set.add(f)));
  const order = f => { const i = FILM_ORDER.indexOf(f); return i < 0 ? 999 : i; };
  return [...set].sort((a, b) => order(a) - order(b) || a.localeCompare(b, 'ja'));
}

// 1ノードがフィルタ条件（レベル・陣営・登場作品）で表示対象か。
// main.js の描画と右リストの両方がこの判定を共有する（単一の真実）。
export function isNodeShown(n) {
  if (n.level > filters.level) return false;
  if (!filters.faction[n.faction]) return false;
  const f = n.films || [];
  return f.length === 0 || f.some(x => filters.film[x]);
}

// UI をまとめてセットアップする。
//   ctx: { renderer, camera, nodeMeshes, applyImageToNode }
export function setupUI(ctx) {
  const { renderer, camera, nodeMeshes, applyImageToNode } = ctx;
  const dom = renderer.domElement;
  const infoEl = document.getElementById('info');

  // ----- 選択 -----
  function selectNode(i, focus) {
    selection.index = i;
    const n = nodes[i];
    document.getElementById('info-name').textContent = n.name;
    const fac = document.getElementById('info-faction');
    fac.textContent = FACTION[n.faction].label;
    fac.style.color = '#' + FACTION[n.faction].color.toString(16).padStart(6, '0');
    document.getElementById('info-desc').textContent = n.desc;
    const img = document.getElementById('info-img');
    if (n.image) { img.src = n.image; img.style.display = ''; }
    else { img.removeAttribute('src'); img.style.display = 'none'; }
    const creditEl = document.getElementById('info-credit');
    if (n.image && n.credit) { creditEl.textContent = '画像: ' + n.credit; creditEl.style.display = ''; }
    else { creditEl.textContent = ''; creditEl.style.display = 'none'; }
    const filmsEl = document.getElementById('info-films');
    filmsEl.innerHTML = (n.films || []).map(f => `<span class="film-chip">${f}</span>`).join('');
    infoEl.classList.add('show');
    syncListSelection();
    if (focus) focusOnNode(i);
  }
  function deselect() {
    selection.index = -1;
    infoEl.classList.remove('show');
    syncListSelection();
  }
  // カメラをそのノードへ寄せる
  function focusOnNode(i) {
    cam.targetPan.copy(nodeMeshes[i].position);
    cam.targetDist = Math.max(140, nodes[i].size * 9);
  }

  // ----- ビュー上のクリックで選択 -----
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  dom.addEventListener('click', e => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(nodeMeshes, false);
    if (hits.length) {
      const i = hits[0].object.userData.index;
      selectNode(i);
      cam.targetPan.copy(nodeMeshes[i].position); // クリックしたキャラを回転中心にする（ズームは変えない）
    } else {
      deselect();
    }
  });

  // ----- 右側キャラクターリスト -----
  const clItems = document.getElementById('cl-items');
  document.getElementById('cl-count').textContent = '(' + nodes.length + ')';
  const listRows = [];
  const factionOrder = { jedi: 0, sith: 1, rebel: 2, neutral: 3 };
  const sortedIdx = nodes.map((n, i) => i).sort((a, b) => {
    const fa = factionOrder[nodes[a].faction], fb = factionOrder[nodes[b].faction];
    if (fa !== fb) return fa - fb;
    return nodes[a].name.localeCompare(nodes[b].name, 'ja');
  });
  sortedIdx.forEach(i => {
    const n = nodes[i];
    const col = '#' + FACTION[n.faction].color.toString(16).padStart(6, '0');
    const row = document.createElement('div');
    row.className = 'cl-item';
    row.dataset.index = i;
    row.innerHTML = `<span class="cl-dot" style="color:${col};background:${col}"></span>` +
                    `<span class="cl-name">${n.name}</span>`;
    row.addEventListener('click', () => selectNode(i, true));
    clItems.appendChild(row);
    listRows[i] = row;
  });
  function syncListSelection() {
    listRows.forEach((row, i) => {
      if (!row) return;
      const on = i === selection.index;
      row.classList.toggle('active', on);
      if (on) row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  }
  // フィルタ結果に合わせてリストの行を出し入れし、件数を更新する
  function refreshList() {
    let visible = 0;
    listRows.forEach((row, i) => {
      if (!row) return;
      const on = isNodeShown(nodes[i]);
      row.style.display = on ? '' : 'none';
      if (on) visible++;
    });
    document.getElementById('cl-count').textContent = '(' + visible + ')';
  }

  // ----- 表示レベル（スライダー） -----
  const levelSlider = document.getElementById('level-slider');
  const levelVal = document.getElementById('level-val');
  const updateLevel = () => {
    filters.level = parseInt(levelSlider.value, 10);
    levelVal.textContent = LEVEL_LABEL[filters.level] || filters.level;
    refreshList();
  };
  levelSlider.addEventListener('input', updateLevel);
  updateLevel();

  // ----- 凡例フィルタ（チェックボックス） -----
  document.querySelectorAll('input[data-faction]').forEach(cb => {
    cb.addEventListener('change', () => { filters.faction[cb.dataset.faction] = cb.checked; refreshList(); });
  });
  document.querySelectorAll('input[data-rel]').forEach(cb => {
    cb.addEventListener('change', () => { filters.rel[cb.dataset.rel] = cb.checked; });
  });

  // ----- 登場作品フィルタ（データから動的生成） -----
  const filmsWrap = document.getElementById('legend-films');
  const filmList = collectFilms();
  const filmInputs = [];
  filmList.forEach(f => {
    filters.film[f] = true;
    const label = document.createElement('label');
    label.className = 'lg-row film-row';
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = true; cb.dataset.film = f;
    cb.addEventListener('change', () => { filters.film[f] = cb.checked; refreshList(); });
    const txt = document.createElement('span');
    txt.className = 'lg-film-name'; txt.textContent = f;
    label.appendChild(cb); label.appendChild(txt);
    filmsWrap.appendChild(label);
    filmInputs.push(cb);
  });
  function setAllFilms(on) {
    filmInputs.forEach(cb => { cb.checked = on; filters.film[cb.dataset.film] = on; });
    refreshList();
  }
  document.getElementById('film-all').addEventListener('click', () => setAllFilms(true));
  document.getElementById('film-none').addEventListener('click', () => setAllFilms(false));
  refreshList(); // 初期表示を現在のフィルタに合わせる

  // ----- 検索 -----
  document.getElementById('search').addEventListener('input', e => {
    const q = e.target.value.trim();
    if (!q) { deselect(); return; }
    const i = nodes.findIndex(n => n.name.includes(q) || n.id.includes(q.toLowerCase()));
    if (i >= 0) selectNode(i, true);
  });

  // ----- 画像ドラッグ＆ドロップ -----
  const dropzone = document.getElementById('dropzone');
  const assignEl = document.getElementById('assign');
  const asPreview = document.getElementById('as-preview');
  const asSelect = document.getElementById('as-select');
  const asDatalist = document.getElementById('as-datalist');
  let pendingDataURL = null;

  // 検索用 datalist（値＝人物名）を構築
  nodes.forEach(n => {
    const o = document.createElement('option');
    o.value = n.name;
    asDatalist.appendChild(o);
  });
  // 入力中の人物名 → ノード番号（一致しなければ -1）
  const asSelectedIndex = () => nodes.findIndex(n => n.name === asSelect.value.trim());

  // ----- 画像の永続保存（localStorage） -----
  const IMG_STORE_KEY = 'sw3d_images';
  const loadSavedImages = () => {
    try { return JSON.parse(localStorage.getItem(IMG_STORE_KEY) || '{}'); } catch (e) { return {}; }
  };
  // 画像を縮小して dataURL 化（保存容量を抑える。球テクスチャ用に十分）
  const shrinkImage = (dataURL, max, cb) => {
    const im = new Image();
    im.onload = () => {
      const s = Math.min(1, max / Math.max(im.width, im.height));
      const w = Math.round(im.width * s), h = Math.round(im.height * s);
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      c.getContext('2d').drawImage(im, 0, 0, w, h);
      try { cb(c.toDataURL('image/jpeg', 0.85)); } catch (e) { cb(dataURL); }
    };
    im.onerror = () => cb(dataURL);
    im.src = dataURL;
  };

  // 起動時：保存済み画像を球へ復元（旧形式の文字列／新形式の{image,credit}両対応）
  const saved = loadSavedImages();
  Object.keys(saved).forEach(id => {
    const i = nodes.findIndex(n => n.id === id);
    if (i < 0) return;
    const v = saved[id];
    const src = typeof v === 'string' ? v : v.image;
    if (typeof v !== 'string' && v.credit) nodes[i].credit = v.credit;
    nodes[i].image = src;
    applyImageToNode(i, src);
  });

  let dragDepth = 0;
  addEventListener('dragenter', e => { e.preventDefault(); dragDepth++; dropzone.classList.add('active'); });
  addEventListener('dragover', e => { e.preventDefault(); });
  addEventListener('dragleave', e => { e.preventDefault(); if (--dragDepth <= 0) dropzone.classList.remove('active'); });
  addEventListener('drop', e => {
    e.preventDefault(); dragDepth = 0; dropzone.classList.remove('active');
    const file = [...(e.dataTransfer.files || [])].find(f => f.type.startsWith('image/'));
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      shrinkImage(reader.result, 256, small => {  // 縮小してから保持
        pendingDataURL = small;
        asPreview.src = small;
        const sel = selection.index;
        asSelect.value = sel >= 0 ? nodes[sel].name : '';
        document.getElementById('as-credit').value = sel >= 0 && nodes[sel].credit ? nodes[sel].credit : '';
        assignEl.classList.add('show');
      });
    };
    reader.readAsDataURL(file);
  });

  const asUrl = document.getElementById('as-url');
  const asCredit = document.getElementById('as-credit');

  document.getElementById('as-ok').addEventListener('click', () => {
    const url = asUrl.value.trim();
    const credit = asCredit.value.trim();
    const src = url || pendingDataURL; // URL を優先、無ければドロップ画像
    const i = asSelectedIndex();
    if (src && i >= 0) {
      applyImageToNode(i, src);
      nodes[i].image = src;            // 状態として保持
      nodes[i].credit = credit || undefined;
      const ok = saveImageLocal(nodes[i].id, src, credit); // 永続化（localStorage）
      if (!ok) alert('画像は表示しましたが、保存容量を超えたため永続保存できませんでした。\n大きな画像は縮小するか、URL方式（IMAGES）をご利用ください。');
      if (i === selection.index) selectNode(i); // 表示中なら詳細カードの画像も更新
    } else if (src && i < 0) {
      alert('人物を一覧から選んでください（名前を入力して候補から選択）。');
      return;
    }
    closeAssign();
  });
  document.getElementById('as-cancel').addEventListener('click', closeAssign);
  function closeAssign() { assignEl.classList.remove('show'); pendingDataURL = null; asUrl.value = ''; asCredit.value = ''; }

  // ----- 画像URLを設定（選択中のキャラへ） -----
  document.getElementById('img-url-btn').addEventListener('click', () => {
    pendingDataURL = null;
    asPreview.removeAttribute('src');
    const i = selection.index >= 0 ? selection.index : -1;
    asSelect.value = i >= 0 ? nodes[i].name : '';
    asUrl.value = i >= 0 && nodes[i].image && /^https?:/.test(nodes[i].image) ? nodes[i].image : '';
    asCredit.value = i >= 0 && nodes[i].credit ? nodes[i].credit : '';
    assignEl.classList.add('show');
    asUrl.focus();
  });

  // ----- 画像URLを data.js 用に書き出す -----
  document.getElementById('img-export-btn').addEventListener('click', () => {
    const esc = s => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const lines = nodes
      .filter(n => n.image && /^https?:/.test(n.image))
      .map(n => n.credit
        ? `  ${n.id}: { url: '${esc(n.image)}', credit: '${esc(n.credit)}' },`
        : `  ${n.id}: '${esc(n.image)}',`);
    if (!lines.length) {
      alert('URL形式の画像が設定されていません。\n（ドロップ画像はURLではないため対象外です。「🖼 画像URL」でURLを設定してください）');
      return;
    }
    const text = 'export const IMAGES = {\n' + lines.join('\n') + '\n};';
    navigator.clipboard.writeText(text).then(
      () => alert('data.js 用の IMAGES をコピーしました。\ndata.js の IMAGES を、この内容で置き換えてください。'),
      () => window.prompt('コピーできなかったので手動でコピーしてください:', text)
    );
  });

  // ----- 保存した球体画像をすべて消去 -----
  document.getElementById('img-clear-btn').addEventListener('click', () => {
    if (!confirm('保存した球体画像をすべて消去します。よろしいですか？\n（ページを再読み込みすると反映されます）')) return;
    clearImagesLocal();
    alert('消去しました。ページを再読み込みしてください。');
  });

  // 外部からも呼べるように返す
  return { selectNode, deselect };
}
