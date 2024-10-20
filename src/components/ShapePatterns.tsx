/**
 * 
 * @param _w - 一辺wの正方形内の図形について.
 * @param _x - 座標平面上のx座標 x in [-w/2, w/2].
 * @param _y - 座標平面上のy座標 y in [-w/2, w/2].
 * @returns 一辺wの正方形内の(x, y)について常にtrue.
 */
export const normal = (_w: number, _x: number, _y: number): boolean => {
  return true;
}

/**
 * 
 * @param w - 一辺wの正方形内の図形について.
 * @param x - 座標平面上のx座標 x in [-w/2, w/2].
 * @param y - 座標平面上のy座標 y in [-w/2, w/2].
 * @returns 一辺wの正方形内の(x, y)が星型の内側ならtrue, 外側ならfalse.
 */
export const star = (w: number, x: number, y: number): boolean => {
  const r = w * 0.8 / 2;
  let ok = true;
  const theta = Math.PI * 4 / 5;
  const base = Math.PI/2;
  const as = Array(5).fill(0);
  const bs = Array(5).fill(0);

  for (let k = 0; k < 5; ++k) {
    const xp = r * Math.cos(base + theta*k);
    const yp = r * Math.sin(base + theta*k);
    const xq = r * Math.cos(base + theta*(k+1));
    const yq = r * Math.sin(base + theta*(k+1));
    const a = (yq-yp) / (xq-xp);
    const b = yp - a*xp; // 直線の傾きと切片を計算
    as[k] = a;
    bs[k] = b;
  }
  x *= -1;

  if (x > as[0]*y + bs[0] && x > as[2]*y + bs[2]) ok = false;
  if (x < as[3]*y + bs[3] && x > as[0]*y + bs[0]) ok = false;
  if (x < as[1]*y + bs[1] && x < as[3]*y + bs[3]) ok = false;
  if (x > as[4]*y + bs[4] && x < as[1]*y + bs[1]) ok = false;
  if (x > as[2]*y + bs[2] && x > as[4]*y + bs[4]) ok = false;

  return ok;
};

import { heartShape } from "./pictureHeart";
/**
 * 
 * @param w - 一辺wの正方形内の図形について.
 * @param x - 座標平面上のx座標 x in [-w/2, w/2].
 * @param y - 座標平面上のy座標 y in [-w/2, w/2].
 * @returns 一辺wの正方形内の(x, y)がハート型の内側ならtrue, 外側ならfalse.
 */
export const heart = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;
  const wPic = heartShape.length;
  const [nx, ny] = getImageIndex(w, wPic, x, y);
  return heartShape[nx][ny];
}

import { diamondShape } from "./pictureDiamond";
/**
 * 
 * @param w - 一辺wの正方形内の図形について.
 * @param x - 座標平面上のx座標 x in [-w/2, w/2].
 * @param y - 座標平面上のy座標 y in [-w/2, w/2].
 * @returns 一辺wの正方形内の(x, y)がダイヤモンド型の内側ならtrue, 外側ならfalse.
 */
export const diamond = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;
  const wPic = diamondShape.length;
  const [nx, ny] = getImageIndex(w, wPic, x, y);
  return diamondShape[nx][ny];
}

import { cloverShape } from "./pictureClover";
/**
 * 
 * @param w - 一辺wの正方形内の図形について.
 * @param x - 座標平面上のx座標 x in [-w/2, w/2].
 * @param y - 座標平面上のy座標 y in [-w/2, w/2].
 * @returns 一辺wの正方形内の(x, y)がクローバー型の内側ならtrue, 外側ならfalse.
 */
export const clover = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;
  const wPic = cloverShape.length;
  const [nx, ny] = getImageIndex(w, wPic, x, y);
  return cloverShape[nx][ny];
}

import { spadeShape } from "./pictureSpade";
/**
 * 
 * @param w - 一辺wの正方形内の図形について.
 * @param x - 座標平面上のx座標 x in [-w/2, w/2].
 * @param y - 座標平面上のy座標 y in [-w/2, w/2].
 * @returns 一辺wの正方形内の(x, y)がスペード型の内側ならtrue, 外側ならfalse.
 */
export const spade = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;
  const wPic = spadeShape.length;
  const [nx, ny] = getImageIndex(w, wPic, x, y);
  return spadeShape[nx][ny];
}

import { atcoder1Shape } from "./pictureAtcoder1";
/**
 * 
 * @param w - 一辺wの正方形内の図形について.
 * @param x - 座標平面上のx座標 x in [-w/2, w/2].
 * @param y - 座標平面上のy座標 y in [-w/2, w/2].
 * @returns 一辺wの正方形内の(x, y)がAtcoder1型の内側ならtrue, 外側ならfalse.
 */
export const atcoder1 = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;
  const wPic = atcoder1Shape.length;
  const [nx, ny] = getImageIndex(w, wPic, x, y);
  return atcoder1Shape[nx][ny];
}

import { atcoder2Shape } from "./pictureAtcoder2";
/**
 * 
 * @param w - 一辺wの正方形内の図形について.
 * @param x - 座標平面上のx座標 x in [-w/2, w/2].
 * @param y - 座標平面上のy座標 y in [-w/2, w/2].
 * @returns 一辺wの正方形内の(x, y)がAtcoder2型の内側ならtrue, 外側ならfalse.
 */
export const atcoder2 = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;
  const wPic = atcoder2Shape.length;
  const [nx, ny] = getImageIndex(w, wPic, x, y);
  return atcoder2Shape[nx][ny];
}

import { atcoder3Shape } from "./pictureAtcoder3";
/**
 * 
 * @param w - 一辺wの正方形内の図形について.
 * @param x - 座標平面上のx座標 x in [-w/2, w/2].
 * @param y - 座標平面上のy座標 y in [-w/2, w/2].
 * @returns 一辺wの正方形内の(x, y)がAtcoder3型の内側ならtrue, 外側ならfalse.
 */
export const atcoder3 = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;
  const wPic = atcoder3Shape.length;
  const [nx, ny] = getImageIndex(w, wPic, x, y);
  return atcoder3Shape[nx][ny];
}

import { atcoder4Shape } from "./pictureAtcoder4";
/**
 * 
 * @param w - 一辺wの正方形内の図形について.
 * @param x - 座標平面上のx座標 x in [-w/2, w/2].
 * @param y - 座標平面上のy座標 y in [-w/2, w/2].
 * @returns 一辺wの正方形内の(x, y)がAtcoder4型の内側ならtrue, 外側ならfalse.
 */
export const atcoder4 = (w: number, x: number, y: number): boolean => {
  if (isNaN(x) || isNaN(y)) return false;
  const wPic = atcoder4Shape.length;
  const [nx, ny] = getImageIndex(w, wPic, x, y);
  return atcoder4Shape[nx][ny];
}

/**
 * 
 * @param w - 一辺wの正方形内の図形について.
 * @param x - 座標平面上のx座標 x in [-w/2, w/2].
 * @param y - 座標平面上のy座標 y in [-w/2, w/2].
 * @returns 一辺wの正方形内の(x, y)が円形の内側ならtrue, 外側ならfalse.
 */
export const circle = (w: number, x: number, y: number): boolean => {
  return x*x + y*y <= (w/2*0.7) ** 2;
}

/**
 * 
 * @param w 正方形の一辺.
 * @param wPic 正方形の画像の一辺.
 * @param x x座標 x in [-w/2, w/2].
 * @param y y座標 y in [-w/2, w/2].
 * @returns 正方形内の座標(x, y)が対応する画像のインデックス.
 */
const getImageIndex = (w: number, wPic: number, x: number, y: number): [number, number] => {
  x = Math.max(x, -Math.floor(w/2));
  x = Math.min(x, Math.floor(w/2) - 1);
  y = Math.max(y, -Math.floor(w/2));
  y = Math.min(y, Math.floor(w/2) - 1);
  return [
    Math.floor(wPic/w * (x+w/2)),
    Math.floor(wPic/w * (y+w/2))
  ];
}

