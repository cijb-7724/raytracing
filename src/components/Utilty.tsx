import { star, nomal } from "./ShapePatterns";

type PatternMode = "Floor1" | "Floor2" | "Ceil1" | "Ceil2";
// 型定義
type Pattern = {
  pattern: string;
};

type Patterns = {
  Floor1: Pattern;
  Floor2: Pattern;
  Ceil1: Pattern;
  Ceil2: Pattern;
};

type ColorPair = {
  color1: string;
  color2: string;
};

type Colors = {
  Floor1: ColorPair;
  Floor2: ColorPair;
  Ceil1: ColorPair;
  Ceil2: ColorPair;
};


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

export const getColorFromPattern = (
  floorOrCeil: string,
  colors: Colors,
  patterns: Patterns,
  x: number, 
  z: number, 
  refrect: boolean = false
): [number, number, number, number] => {
  const wid = 400;
  let alpha = 255;
  let r = 0, g = 0, b = 0;
  
  let nx = Math.abs(x) % wid;
  let nz = Math.abs(z) % wid;
  nx -= wid / 2;
  nz -= wid / 2;
  let patternMode: PatternMode;

  // xとzのパターンのチェックに基づいてFloor/Ceilの判定
  const isSurface1 = Math.abs(Math.floor(x / wid) % 2) === Math.abs(Math.floor(z / wid) % 2);
  // Floor/Ceilの判定をシンプルに
  patternMode = isSurface1
    ? (floorOrCeil === "F" ? "Floor1" : "Ceil1")
    : (floorOrCeil === "F" ? "Floor2" : "Ceil2");

  type ShapeFunction = (w: number, x: number, y: number) => boolean;
  let isInsidePattern: ShapeFunction;

  if (patterns[patternMode].pattern === "star") {
    isInsidePattern = star;
  } else {
    isInsidePattern = nomal;
  }

  if (isInsidePattern(wid, nx, nz)) {
    ({ r, g, b } = hexToRgb(colors[patternMode].color1));
  } else {
    ({ r, g, b } = hexToRgb(colors[patternMode].color2));
  }

  const d = (x * x + z * z) / 1000000;
  [r, g, b] = [r, g, b].map(v => Math.min(v, v / d));
  if (refrect) alpha *= 0.9;
  return [r, g, b, alpha];
};
