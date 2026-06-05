// ============================================================
//  main.js — エントリポイント
//  各モジュールを組み立て、アニメーションループを回す。
// ============================================================
import * as THREE from 'three';
import { nodes } from './data.js';
import { edges } from './layout.js';
import { buildGraph } from './graph.js';
import { setupControls, cam } from './controls.js';
import { setupUI, selection, filters, isNodeShown } from './ui.js';

// シーン構築
const graph = buildGraph();
const { scene, camera, renderer, nodeMeshes, labelSprites, linkLines } = graph;

// 操作・UI のセットアップ
setupControls(renderer, camera);
setupUI({
  renderer, camera,
  nodeMeshes,
  applyImageToNode: graph.applyImageToNode,
});

// ----- アニメーションループ -----
function animate() {
  requestAnimationFrame(animate);

  // カメラ補間
  cam.rot.x += (cam.targetRot.x - cam.rot.x) * 0.1;
  cam.rot.y += (cam.targetRot.y - cam.rot.y) * 0.1;
  cam.dist += (cam.targetDist - cam.dist) * 0.1;
  cam.pan.lerp(cam.targetPan, 0.1);

  camera.position.x = cam.pan.x + cam.dist * Math.sin(cam.rot.y) * Math.cos(cam.rot.x);
  camera.position.y = cam.pan.y + cam.dist * Math.sin(cam.rot.x);
  camera.position.z = cam.pan.z + cam.dist * Math.cos(cam.rot.y) * Math.cos(cam.rot.x);
  camera.lookAt(cam.pan);

  const sel = selection.index;

  // フィルタ表示判定（右リストと共通の isNodeShown を使用）
  const shown = nodes.map(isNodeShown);

  // 選択ハイライト：選択ノードとその直接の関係先を強調
  const connected = new Set();
  if (sel >= 0) {
    edges.forEach(e => { if (e.a === sel) connected.add(e.b); if (e.b === sel) connected.add(e.a); });
    connected.add(sel);
  }
  nodeMeshes.forEach((m, i) => {
    // フィルタ：非表示ならノードごと隠す
    m.visible = shown[i];
    // ラベルは表示中のキャラすべてに表示（スライダーのレベル連動）。
    labelSprites[i].visible = shown[i];
    if (!shown[i]) return;

    const on = sel < 0 || connected.has(i);
    const isSel = i === sel;
    if (m.userData.hasImage) {
      // 画像ノード：emissive は抑え、明るさは color で調整（白飛び防止）
      m.material.emissiveIntensity = isSel ? 0.35 : 0.05;
      const lum = on ? (isSel ? 1.0 : 0.78) : 0.3;
      m.material.color.setScalar(lum);
    } else {
      m.material.emissiveIntensity = on ? (isSel ? 0.9 : 0.4) : 0.08;
      m.material.color.setScalar(on ? 1 : 0.4);
    }
    m.material.opacity = on ? 1 : 0.3; m.material.transparent = true;
    const sc = isSel ? 1.3 : 1;
    m.scale.lerp(new THREE.Vector3(sc, sc, sc), 0.15);
    labelSprites[i].material.opacity = on ? 1 : 0.15;
  });
  linkLines.forEach(l => {
    const { a, b, type, baseOpacity } = l.userData;
    // フィルタ：関係タイプが有効 かつ 両端ノードが表示中のときだけ線を出す
    const visible = filters.rel[type] && shown[a] && shown[b];
    l.visible = visible;
    if (!visible) return;
    const on = sel < 0 || a === sel || b === sel;
    l.material.opacity = on ? baseOpacity : 0.05;
  });

  // ラベルをノードに追従
  labelSprites.forEach((lbl, i) => {
    lbl.position.copy(nodeMeshes[i].position).add(new THREE.Vector3(0, nodes[i].size + 8, 0));
  });

  renderer.render(scene, camera);
}

// フォント読み込み後に開始（ラベルの描画ズレ防止）
let started = false;
function start() {
  if (started) return;
  started = true;
  document.getElementById('loading').style.display = 'none';
  animate();
}
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(start);
}
// フォント読み込みが遅い／失敗した場合のフォールバック
setTimeout(start, 2000);

// ----- リサイズ -----
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
