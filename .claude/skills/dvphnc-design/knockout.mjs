// Cut-out headshot from the light-mode dither: the studio backdrop becomes TRANSPARENT,
// every other pixel is copied unchanged — so one file works on both the white and the navy
// page, and both themes show exactly the same dots.
// The backdrop is found on the source photo: flood fill from the top/left/right edges through
// bright pixels (the shirt's white V touches the bottom edge, so the bottom is not seeded),
// grown by 1px to swallow the bright fringe around the hair.
// Usage: node knockout.mjs <light-dither.gray> <source.gray> <out.ya8> <size> <threshold 0-255>
//   output is raw gray+alpha (2 bytes/pixel); encode with ffmpeg -pix_fmt ya8 ... out.png
import { readFileSync, writeFileSync } from 'fs';

const [, , ditherPath, srcPath, outPath, sizeArg, thrArg] = process.argv;
const N = Number(sizeArg), T = Number(thrArg);
const dither = readFileSync(ditherPath);
const src = readFileSync(srcPath);
for (const [name, buf] of [['dither', dither], ['source', src]]) {
  if (buf.length !== N * N) throw new Error(`${name}: expected ${N * N} bytes, got ${buf.length}`);
}

const bg = new Uint8Array(N * N);
const stack = [];
const push = (i) => { if (!bg[i] && src[i] >= T) { bg[i] = 1; stack.push(i); } };
for (let k = 0; k < N; k++) { push(k); push(k * N); push(k * N + N - 1); }
while (stack.length) {
  const i = stack.pop(), x = i % N, y = (i / N) | 0;
  if (x > 0) push(i - 1); if (x < N - 1) push(i + 1);
  if (y > 0) push(i - N); if (y < N - 1) push(i + N);
}

const out = Buffer.alloc(N * N * 2);
let cut = 0;
for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
  let m = 0;
  for (let dy = -1; dy <= 1 && !m; dy++) for (let dx = -1; dx <= 1; dx++) {
    const xx = x + dx, yy = y + dy;
    if (xx >= 0 && yy >= 0 && xx < N && yy < N && bg[yy * N + xx]) { m = 1; break; }
  }
  const i = y * N + x;
  out[2 * i] = m ? 0 : dither[i];      // gray (value irrelevant where transparent)
  out[2 * i + 1] = m ? 0 : 255;        // alpha
  if (m) cut++;
}
writeFileSync(outPath, out);
console.log(`backdrop ${(100 * cut / (N * N)).toFixed(1)}% transparent; subject pixels copied unchanged`);
