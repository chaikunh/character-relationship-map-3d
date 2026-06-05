// ============================================================
//  controls.js — カメラ操作（簡易 OrbitControls）
//  マウス／タッチでの回転・ズーム・パンを扱う。
//  カメラの目標状態（cam）を保持し、animate ループから参照する。
// ============================================================
import * as THREE from 'three';

// カメラの状態。targetXxx に向かって animate ループ側で補間する。
export const cam = {
  rot: { x: 0.2, y: 0.4 }, targetRot: { x: 0.2, y: 0.4 },
  dist: 420, targetDist: 420,
  pan: new THREE.Vector3(), targetPan: new THREE.Vector3(),
};

// 操作イベントを登録する。renderer / camera を受け取る。
export function setupControls(renderer, camera) {
  let isDrag = false, isPan = false, px = 0, py = 0;
  const dom = renderer.domElement;

  dom.addEventListener('mousedown', e => {
    // 中ボタン(ホイール押し込み) / 右ボタン ＝ 平行移動、左ボタン ＝ 回転
    if (e.button === 1 || e.button === 2) { isPan = true; if (e.button === 1) e.preventDefault(); }
    else if (e.button === 0) { isDrag = true; }
    px = e.clientX; py = e.clientY;
  });
  addEventListener('mouseup', () => { isDrag = false; isPan = false; });
  addEventListener('mousemove', e => {
    const dx = e.clientX - px, dy = e.clientY - py; px = e.clientX; py = e.clientY;
    if (isDrag) {
      cam.targetRot.y -= dx * 0.005; cam.targetRot.x += dy * 0.005;
      cam.targetRot.x = Math.max(-1.5, Math.min(1.5, cam.targetRot.x));
    }
    if (isPan) {
      const right = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0);
      const up = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1);
      cam.targetPan.add(right.multiplyScalar(-dx * cam.dist * 0.0012));
      cam.targetPan.add(up.multiplyScalar(dy * cam.dist * 0.0012));
    }
  });
  dom.addEventListener('wheel', e => {
    e.preventDefault();
    cam.targetDist *= (1 + Math.sign(e.deltaY) * 0.1);
    cam.targetDist = Math.max(80, Math.min(1200, cam.targetDist));
  }, { passive: false });
  dom.addEventListener('contextmenu', e => e.preventDefault());

  // タッチ操作：1本指＝回転、2本指＝ピンチでズーム＋ドラッグで平行移動
  let lastTouch = null, lastPinch = 0, lastMid = null;
  const midpoint = t => ({
    x: (t[0].clientX + t[1].clientX) / 2,
    y: (t[0].clientY + t[1].clientY) / 2,
  });
  dom.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinch = Math.hypot(dx, dy);
      lastMid = midpoint(e.touches);
    }
  }, { passive: false });
  dom.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 1 && lastTouch) {
      const dx = e.touches[0].clientX - lastTouch.x, dy = e.touches[0].clientY - lastTouch.y;
      cam.targetRot.y -= dx * 0.005; cam.targetRot.x += dy * 0.005;
      cam.targetRot.x = Math.max(-1.5, Math.min(1.5, cam.targetRot.x));
      lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const p = Math.hypot(dx, dy);
      if (lastPinch) cam.targetDist *= lastPinch / p; // ピンチ＝ズーム
      cam.targetDist = Math.max(80, Math.min(1200, cam.targetDist));
      lastPinch = p;
      // 2本指の中点の移動＝平行移動
      const mid = midpoint(e.touches);
      if (lastMid) {
        const mx = mid.x - lastMid.x, my = mid.y - lastMid.y;
        const right = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0);
        const up = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1);
        cam.targetPan.add(right.multiplyScalar(-mx * cam.dist * 0.0012));
        cam.targetPan.add(up.multiplyScalar(my * cam.dist * 0.0012));
      }
      lastMid = mid;
    }
  }, { passive: false });
  dom.addEventListener('touchend', () => { lastTouch = null; lastPinch = 0; lastMid = null; });
}
