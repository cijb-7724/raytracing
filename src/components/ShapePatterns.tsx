/**
 * 
 * @param _w - 一辺wの正方形内の図形について
 * @param _x - 座標平面上のx座標 x in [-w/2, w/2]
 * @param _y - 座標平面上のy座標 y in [-w/2, w/2]
 * @returns 一辺wの正方形内の(x, y)について常にtrue
 */
export const normal = (_w: number, _x: number, _y: number): boolean => {
  return true;
}

/**
 * 
 * @param w - 一辺wの正方形内の図形について
 * @param x - 座標平面上のx座標 x in [-w/2, w/2]
 * @param y - 座標平面上のy座標 y in [-w/2, w/2]
 * @returns 一辺wの正方形内の(x, y)が星型の内側ならtrue, 外側ならfalse
 */
export const star = (w: number, x: number, y: number): boolean => {
  const r = (w / 2) * 0.8;
  let ok = true;
  const theta = Math.PI * 4 / 5;
  const base = Math.PI/2;
  const as = Array(5).fill(0); // 長さ5の配列を初期化
  const bs = Array(5).fill(0); // 長さ5の配列を初期化

  for (let k = 0; k < 5; ++k) {
    const xp = r * Math.cos(base + theta * k);
    const yp = r * Math.sin(base + theta * k);
    const xq = r * Math.cos(base + theta * (k + 1));
    const yq = r * Math.sin(base + theta * (k + 1));
    const a = (yq - yp) / (xq - xp);
    const b = yp - a * xp; // 直線の傾きと切片を計算

    as[k] = a;
    bs[k] = b;
  }
  x *= -1;

  // 複数の条件をチェックして"ok"のフラグを設定
  if (x > as[0] * y + bs[0] && x > as[2] * y + bs[2]) ok = false;
  if (x < as[3] * y + bs[3] && x > as[0] * y + bs[0]) ok = false;
  if (x < as[1] * y + bs[1] && x < as[3] * y + bs[3]) ok = false;
  if (x > as[4] * y + bs[4] && x < as[1] * y + bs[1]) ok = false;
  if (x > as[2] * y + bs[2] && x > as[4] * y + bs[4]) ok = false;

  return ok;
};

import { heartShape } from "./pictureHeart";
export const heart = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;

  const wPic = heartShape.length;
  x = Math.max(x, -Math.floor(w/2));
  x = Math.min(x, Math.floor(w/2)-1);
  y = Math.max(y, -Math.floor(w/2));
  y = Math.min(y, Math.floor(w/2)-1);
  let nx = Math.floor(wPic/w * (x + w/2));
  let ny = Math.floor(wPic/w * (y + w/2));

  return heartShape[nx][ny];
}

import { diamondShape } from "./pictureDiamond";
export const diamond = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;

  const wPic = diamondShape.length;
  x = Math.max(x, -Math.floor(w/2));
  x = Math.min(x, Math.floor(w/2)-1);
  y = Math.max(y, -Math.floor(w/2));
  y = Math.min(y, Math.floor(w/2)-1);
  let nx = Math.floor(wPic/w * (x + w/2));
  let ny = Math.floor(wPic/w * (y + w/2));

  return diamondShape[nx][ny];
}

import { cloverShape } from "./pictureClover";
export const clover = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;

  const wPic = cloverShape.length;
  x = Math.max(x, -Math.floor(w/2));
  x = Math.min(x, Math.floor(w/2)-1);
  y = Math.max(y, -Math.floor(w/2));
  y = Math.min(y, Math.floor(w/2)-1);
  let nx = Math.floor(wPic/w * (x + w/2));
  let ny = Math.floor(wPic/w * (y + w/2));

  return cloverShape[nx][ny];
}

import { spadeShape } from "./pictureSpade";
export const spade = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;

  const wPic = spadeShape.length;
  x = Math.max(x, -Math.floor(w/2));
  x = Math.min(x, Math.floor(w/2)-1);
  y = Math.max(y, -Math.floor(w/2));
  y = Math.min(y, Math.floor(w/2)-1);
  let nx = Math.floor(wPic/w * (x + w/2));
  let ny = Math.floor(wPic/w * (y + w/2));

  return spadeShape[nx][ny];
}

import { atcoder1Shape } from "./pictureAtcoder1";
export const atcoder1 = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;

  const wPic = atcoder1Shape.length;
  x = Math.max(x, -Math.floor(w/2));
  x = Math.min(x, Math.floor(w/2)-1);
  y = Math.max(y, -Math.floor(w/2));
  y = Math.min(y, Math.floor(w/2)-1);
  let nx = Math.floor(wPic/w * (x + w/2));
  let ny = Math.floor(wPic/w * (y + w/2));

  return atcoder1Shape[nx][ny];
}

import { atcoder2Shape } from "./pictureAtcoder2";
export const atcoder2 = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;

  const wPic = atcoder2Shape.length;
  x = Math.max(x, -Math.floor(w/2));
  x = Math.min(x, Math.floor(w/2)-1);
  y = Math.max(y, -Math.floor(w/2));
  y = Math.min(y, Math.floor(w/2)-1);
  let nx = Math.floor(wPic/w * (x + w/2));
  let ny = Math.floor(wPic/w * (y + w/2));

  return atcoder2Shape[nx][ny];
}

import { atcoder3Shape } from "./pictureAtcoder3";
export const atcoder3 = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;

  const wPic = atcoder3Shape.length;
  x = Math.max(x, -Math.floor(w/2));
  x = Math.min(x, Math.floor(w/2)-1);
  y = Math.max(y, -Math.floor(w/2));
  y = Math.min(y, Math.floor(w/2)-1);
  let nx = Math.floor(wPic/w * (x + w/2));
  let ny = Math.floor(wPic/w * (y + w/2));

  return atcoder3Shape[nx][ny];
}

import { atcoder4Shape } from "./pictureAtcoder4";
export const atcoder4 = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;

  const wPic = atcoder4Shape.length;
  x = Math.max(x, -Math.floor(w/2));
  x = Math.min(x, Math.floor(w/2)-1);
  y = Math.max(y, -Math.floor(w/2));
  y = Math.min(y, Math.floor(w/2)-1);
  let nx = Math.floor(wPic/w * (x + w/2));
  let ny = Math.floor(wPic/w * (y + w/2));

  return atcoder4Shape[nx][ny];
}

export const abcd = (w: number, x: number, y: number): boolean => {
  return x*x + y*y <= (w/2*0.7)**2;
}


