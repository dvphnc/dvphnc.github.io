// Dark-mode headshot from the LIGHT-mode dither, so both themes share the exact same dots.
// The studio backdrop is found on the source photo (flood fill from the top/left/right edges
// through bright pixels, grown 1px to swallow the hair fringe) and those pixels of the light
// dither are set to black. Every other pixel is copied unchanged.
// Usage: node knockout.mjs <light-dither.gray> <source.gray> <out.gray> <size> <threshold 0-255>
import { readFileSync, writeFileSync } from 'fs';

const [, , ditherPath, srcPath, outPath, sizeArg, thrArg] = process.argv;
const N = Number(sizeArg), T = Number(thrArg);
const dither = readFileSync(ditherPath);
const src = readFileSync(srcPath);
for (const [name, buf] of [['dither', dither], ['source', src]]) {
  if (buf.length !== N * N) throw new Error(`${name}: expected ${N * N} bytes, got ${buf.length}`);
}

// flood fill from top, left and right edges (the shirt's white V touches the bottom edge)
const bg = new Uint8Array(N * N);
const stack = [];
const push = (i) => { if (!bg[i] && src[i] >= T) { bg[i] = 1; stack.push(i); } };
for (let k = 0; k < N; k++) { push(k); push(k * N); push(k * N + N - 1); }
while (stack.length) {
  const i = stack.pop(), x = i % N, y = (i / N) | 0;
  if (x > 0) push(i - 1); if (x < N - 1) push(i + 1);
  if (y > 0) push(i - N); if (y < N - 1) push(i + N);
}

// grow by 1px, then black out the backdrop in the light dither; copy everything else
const out = Buffer.from(dither);
let changed = 0, bgCount = 0;
for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
  let m = 0;
  for (let dy = -1; dy <= 1 && !m; dy++) for (let dx = -1; dx <= 1; dx++) {
    const xx = x + dx, yy = y + dy;
    if (xx >= 0 && yy >= 0 && xx < N && yy < N && bg[yy * N + xx]) { m = 1; break; }
  }
  if (m) { bgCount++; if (out[y * N + x] !== 0) { out[y * N + x] = 0; changed++; } }
}
writeFileSync(outPath, out);
console.log(`backdrop ${(100 * bgCount / (N * N)).toFixed(1)}% of frame, ${changed} px changed, all other pixels identical to the light version`);
