
/**
 * 
 * @param a 多次元ベクトル
 * @param b 多次元ベクトル
 * @returns a, bの内積の実数
 */
export const dot = (a: number[], b: number[]) =>
  a.reduce((sum, v, i) => sum + v * b[i], 0);

/**
 * 
 * @param pixels キャンバスを表す1次元配列
 * @param w キャンバスの一辺
 * @param i キャンバスの上からi行目
 * @param j キャンバスの左からj列目
 * @param color [r, g, b, alpha]
 */
export const setColor = (
  pixels: Uint8ClampedArray,
  w: number,
  i: number,
  j: number,
  color: number[]
) => {
  const base = (i * 2 * w + j) * 4;
  for (let k = 0; k < 4; ++k) pixels[base + k] = color[k];
};


export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  // 先頭が "#" の場合は除去
  const validHex = hex.startsWith('#') ? hex.slice(1) : hex;
  let r, g, b;
  // 16進数コードが正しい形式か確認
  if (validHex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(validHex)) {
    //dame
    r = 0;
    g = 0;
    b = 0;
  } else {
    // 16進数をそれぞれの色の値に変換
    r = parseInt(validHex.slice(0, 2), 16);
    g = parseInt(validHex.slice(2, 4), 16);
    b = parseInt(validHex.slice(4, 6), 16);
  }
  return { r, g, b };
};

