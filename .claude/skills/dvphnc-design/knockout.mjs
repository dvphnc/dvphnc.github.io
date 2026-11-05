// Knock the plain studio background out of a grayscale raw frame: flood-fill from the
// image border through bright pixels, soften the mask, and paint the background black.
// Usage: node knockout.mjs <in.gray> <out.gray> <size> <threshold 0-255>
import { readFileSync, writeFileSync } from 'fs';

const [, , inPath, outPath, sizeArg, thrArg] = process.argv;
const N = Number(sizeArg), T = Number(thrArg);
const px = readFileSync(inPath);
if (px.length !== N * N) throw new Error(`expected ${N * N} bytes, got ${px.length}`);

// 1) flood fill (4-connected) from every border pixel brighter than T
const bg = new Uint8Array(N * N);
const stack = [];
const push = (i) => { if (!bg[i] && px[i] >= T) { bg[i] = 1; stack.push(i); } };
// seed from top, left and right edges only — the shirt's white V touches the bottom edge
// and must not be treated as backdrop
for (let k = 0; k < N; k++) { push(k); push(k * N); push(k * N + N - 1); }
while (stack.length) {
  const i = stack.pop(), x = i % N, y = (i / N) | 0;
  if (x > 0) push(i - 1); if (x < N - 1) push(i + 1);
  if (y > 0) push(i - N); if (y < N - 1) push(i + N);
}

// 2) grow the mask by 1px to swallow the bright fringe around hair, then box-blur it
const grown = new Float32Array(N * N);
for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
  let m = 0;
  for (let dy = -1; dy <= 1 && !m; dy++) for (let dx = -1; dx <= 1; dx++) {
    const xx = x + dx, yy = y + dy;
    if (xx >= 0 && yy >= 0 && xx < N && yy < N && bg[yy * N + xx]) { m = 1; break; }
  }
  grown[y * N + x] = m;
}
const R = Math.max(1, Math.round(N / 160));
const soft = new Float32Array(N * N);
for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
  let s = 0, c = 0;
  for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
    const xx = x + dx, yy = y + dy;
    if (xx >= 0 && yy >= 0 && xx < N && yy < N) { s += grown[yy * N + xx]; c++; }
  }
  soft[y * N + x] = s / c;
}

// 3) background -> black, subject unchanged, soft edge between
const out = Buffer.alloc(N * N);
let bgCount = 0;
for (let i = 0; i < N * N; i++) { out[i] = Math.round(px[i] * (1 - soft[i])); if (bg[i]) bgCount++; }
writeFileSync(outPath, out);
console.log(`background ${(100 * bgCount / (N * N)).toFixed(1)}% of frame`);
