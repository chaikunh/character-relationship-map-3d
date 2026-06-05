// ============================================================
//  layout.js — 3D 力学レイアウト（force-directed layout）
//  ノードの初期座標を物理シミュレーションで決める。
//
//  反発力は本来「全ノード対」の O(N^2)。ノードが増えると重いので、
//  空間を一辺 CUTOFF の立方体セルに区切る「セルリスト法（均一グリッド）」で
//  近傍セル内のペアだけを計算する。距離 CUTOFF を超える反発は
//  9000/d^2 がごく小さくなるため無視してよい。これで概ね O(N) になる。
//  またホットループでは THREE.Vector3 を生成せず、成分をスカラーで扱って
//  毎ステップのメモリ確保（GC 負荷）をなくしている。
// ============================================================
import * as THREE from 'three';
import { nodes, links } from './data.js';

// id → 配列インデックスの対応表
const idx = {};
nodes.forEach((n, i) => { idx[n.id] = i; });

// リンクをインデックス参照に変換: {a, b, type}
export const edges = links.map(l => ({ a: idx[l[0]], b: idx[l[1]], type: l[2] }));

// 各ノードの座標・速度（pos は graph.js から Vector3 として参照される）
export const pos = nodes.map(() => new THREE.Vector3(
  (Math.random() - 0.5) * 200,
  (Math.random() - 0.5) * 200,
  (Math.random() - 0.5) * 200));
const vel = nodes.map(() => new THREE.Vector3());

const N = nodes.length;

// 反発の打ち切り半径＝グリッドのセル一辺。これを超えるペアは無視する。
const CUTOFF = 220;
const CUTOFF2 = CUTOFF * CUTOFF;

// セル座標 → そのセルに属するノード番号の配列
const grid = new Map();
const cellKey = (cx, cy, cz) => cx + ',' + cy + ',' + cz;

// 物理シミュレーションを steps 回まわす
//  - 近傍ノード間に反発力（セルリストで近傍のみ）
//  - リンクでつながったノード間にバネ力
//  - 中心への引力 + 速度減衰
export function simulate(steps) {
  for (let s = 0; s < steps; s++) {
    // --- グリッド再構築（毎ステップ座標が動くため） ---
    grid.clear();
    for (let i = 0; i < N; i++) {
      const k = cellKey(
        Math.floor(pos[i].x / CUTOFF),
        Math.floor(pos[i].y / CUTOFF),
        Math.floor(pos[i].z / CUTOFF));
      let arr = grid.get(k);
      if (!arr) { arr = []; grid.set(k, arr); }
      arr.push(i);
    }

    // --- 反発（自セル＋隣接26セルのみ走査） ---
    for (let i = 0; i < N; i++) {
      const xi = pos[i].x, yi = pos[i].y, zi = pos[i].z;
      const cx = Math.floor(xi / CUTOFF), cy = Math.floor(yi / CUTOFF), cz = Math.floor(zi / CUTOFF);
      for (let ox = -1; ox <= 1; ox++)
        for (let oy = -1; oy <= 1; oy++)
          for (let oz = -1; oz <= 1; oz++) {
            const arr = grid.get(cellKey(cx + ox, cy + oy, cz + oz));
            if (!arr) continue;
            for (let m = 0; m < arr.length; m++) {
              const j = arr[m];
              if (j <= i) continue; // 各ペアは一度だけ処理
              let dx = xi - pos[j].x, dy = yi - pos[j].y, dz = zi - pos[j].z;
              const d2 = dx * dx + dy * dy + dz * dz;
              if (d2 > CUTOFF2) continue;
              const dist = Math.sqrt(d2) || 0.1;
              // f = 9000 / dist^2、方向ベクトルへ反映するため /dist でまとめる
              const inv = 9000 / (dist * dist * dist);
              dx *= inv; dy *= inv; dz *= inv;
              vel[i].x += dx; vel[i].y += dy; vel[i].z += dz;
              vel[j].x -= dx; vel[j].y -= dy; vel[j].z -= dz;
            }
          }
    }

    // --- バネ（リンク） ---
    for (let k = 0; k < edges.length; k++) {
      const e = edges[k];
      const a = e.a, b = e.b;
      let dx = pos[b].x - pos[a].x, dy = pos[b].y - pos[a].y, dz = pos[b].z - pos[a].z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.1;
      const f = (dist - 60) * 0.015 / dist;
      dx *= f; dy *= f; dz *= f;
      vel[a].x += dx; vel[a].y += dy; vel[a].z += dz;
      vel[b].x -= dx; vel[b].y -= dy; vel[b].z -= dz;
    }

    // --- 中心引力 + 減衰 + 位置更新 ---
    for (let i = 0; i < N; i++) {
      vel[i].x = (vel[i].x - pos[i].x * 0.002) * 0.82;
      vel[i].y = (vel[i].y - pos[i].y * 0.002) * 0.82;
      vel[i].z = (vel[i].z - pos[i].z * 0.002) * 0.82;
      pos[i].x += vel[i].x; pos[i].y += vel[i].y; pos[i].z += vel[i].z;
    }
  }
}
