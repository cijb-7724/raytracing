/**
 * 
 * @param _w - 一辺wの正方形内の図形について
 * @param _x - 座標平面上のx座標 x in [-w/2, w/2]
 * @param _y - 座標平面上のy座標 y in [-w/2, w/2]
 * @returns 一辺wの正方形内の(x, y)について常にtrue
 */
export const nomal = (_w: number, _x: number, _y: number): boolean => {
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
  const as = Array(5).fill(0); // 長さ5の配列を初期化
  const bs = Array(5).fill(0); // 長さ5の配列を初期化

  for (let k = 0; k < 5; ++k) {
    const xp = r * Math.cos(Math.PI/2 + theta * k);
    const yp = r * Math.sin(Math.PI/2 + theta * k);
    const xq = r * Math.cos(Math.PI/2 + theta * (k + 1));
    const yq = r * Math.sin(Math.PI/2 + theta * (k + 1));
    const a = (yq - yp) / (xq - xp);
    const b = yp - a * xp; // 直線の傾きと切片を計算

    as[k] = a;
    bs[k] = b;
  }

  // 複数の条件をチェックして"ok"のフラグを設定
  if (y > as[0] * x + bs[0] && y > as[2] * x + bs[2]) ok = false;
  if (y < as[3] * x + bs[3] && y > as[0] * x + bs[0]) ok = false;
  if (y < as[1] * x + bs[1] && y < as[3] * x + bs[3]) ok = false;
  if (y > as[4] * x + bs[4] && y < as[1] * x + bs[1]) ok = false;
  if (y > as[2] * x + bs[2] && y > as[4] * x + bs[4]) ok = false;

  return ok;
};

