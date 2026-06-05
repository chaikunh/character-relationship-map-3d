// ============================================================
//  graph.js — Three.js のシーン構築（描画レイヤー）
//  scene / camera / renderer とノード・リンクのメッシュを生成し、
//  まとめて返す。
// ============================================================
import * as THREE from 'three';
import { nodes, FACTION, REL } from './data.js';
import { pos, edges, simulate } from './layout.js';

// ラベル（人物名）スプライトを生成
function makeLabel(text) {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  ctx.font = 'bold 38px "Noto Sans JP", sans-serif';
  const w = ctx.measureText(text).width;
  c.width = w + 40; c.height = 64;
  ctx.font = 'bold 38px "Noto Sans JP", sans-serif';
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle';
  ctx.fillText(text, 20, 34);
  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearFilter;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  sp.scale.set(c.width / 6, c.height / 6, 1);
  return sp;
}

// 画像が無いキャラ用：イニシャル付きの色テクスチャを生成
function makeInitialTexture(n) {
  const col = FACTION[n.faction].color;
  const hex = '#' + col.toString(16).padStart(6, '0');
  const S = 256, c = document.createElement('canvas'); c.width = c.height = S;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(S * 0.35, S * 0.3, 10, S * 0.5, S * 0.5, S * 0.7);
  g.addColorStop(0, hex); g.addColorStop(1, '#101018');
  ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
  // イニシャル（日本語名の先頭1文字、英数字始まりは先頭2文字）
  let ini = n.name.charAt(0);
  if (/^[A-Za-z0-9]/.test(n.name)) ini = n.name.slice(0, 2);
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.font = 'bold 130px "Noto Sans JP", sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(ini, S / 2, S / 2 + 6);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// シーン全体を構築して、状態オブジェクトを返す
export function buildGraph() {
  // レイアウト計算（座標を確定させる）
  simulate(400);

  const container = document.getElementById('canvas-container');
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000008, 0.0016);

  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 5000);
  camera.position.set(0, 0, 420);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 星空背景
  (function stars() {
    const g = new THREE.BufferGeometry();
    const arr = [];
    for (let i = 0; i < 1800; i++) {
      const r = 800 + Math.random() * 1600;
      const t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
      arr.push(r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p));
    }
    g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
    const m = new THREE.PointsMaterial({ color: 0xffffff, size: 1.4, transparent: true, opacity: 0.7 });
    scene.add(new THREE.Points(g, m));
  })();

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const pl = new THREE.PointLight(0xffffff, 1.2); pl.position.set(200, 200, 300); scene.add(pl);

  // ノード生成
  const nodeGroup = new THREE.Group(); scene.add(nodeGroup);
  const labelSprites = [];
  const nodeMeshes = [];

  const loader = new THREE.TextureLoader();
  loader.crossOrigin = 'anonymous';

  // 指定インデックスのノードに画像URL（またはdataURL）を貼る
  function applyImageToNode(i, url) {
    loader.load(url, tex => {
      tex.colorSpace = THREE.SRGBColorSpace;
      const m = nodeMeshes[i];
      if (m.material.map) m.material.map.dispose();
      m.material.map = tex;
      m.material.emissiveIntensity = 0.05;
      m.material.metalness = 0.1;
      m.material.roughness = 0.7;
      m.material.needsUpdate = true;
      m.userData.hasImage = true;
    }, undefined, () => {
      console.warn('画像読み込み失敗:', nodes[i].name, url);
    });
  }

  nodes.forEach((n, i) => {
    const col = FACTION[n.faction].color;
    const geo = new THREE.SphereGeometry(n.size, 48, 48);
    const mat = new THREE.MeshStandardMaterial({
      map: makeInitialTexture(n),
      color: 0xffffff,
      emissive: col, emissiveIntensity: 0.18,
      roughness: 0.55, metalness: 0.15,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos[i]);
    mesh.userData = { index: i, baseEmissive: 0.18, hasImage: false };
    nodeGroup.add(mesh);
    nodeMeshes.push(mesh);

    // 画像URLが指定されていれば読み込んで貼る
    if (n.image) applyImageToNode(i, n.image);

    // グロー（陣営色の後光）
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(n.size * 1.5, 32, 32),
      new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.14, side: THREE.BackSide }));
    mesh.add(glow);

    const lbl = makeLabel(n.name);
    lbl.position.copy(pos[i]).add(new THREE.Vector3(0, n.size + 8, 0));
    scene.add(lbl);
    labelSprites.push(lbl);
  });

  // リンク生成
  const linkLines = [];
  edges.forEach(e => {
    const col = REL[e.type].color;
    const geo = new THREE.BufferGeometry().setFromPoints([pos[e.a], pos[e.b]]);
    const mat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.45 });
    const line = new THREE.Line(geo, mat);
    line.userData = { a: e.a, b: e.b, type: e.type, baseOpacity: 0.45 };
    scene.add(line);
    linkLines.push(line);
  });

  return { scene, camera, renderer, nodeMeshes, labelSprites, linkLines, applyImageToNode };
}
