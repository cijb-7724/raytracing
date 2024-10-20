import {
  normal,
  star,
  heart,
  diamond,
  clover,
  spade,
  abcd,
  atcoder1,
  atcoder2,
  atcoder3,
  atcoder4,
} from "./ShapePatterns";

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
  const base = (i * w + j) * 4;
  for (let k = 0; k < 4; ++k) pixels[base + k] = color[k];
};


export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  // 先頭が "#" の場合は除去
  const validHex = hex.startsWith('#') ? hex.slice(1) : hex;
  let r, g, b;
  // 16進数コードが正しい形式か確認
  if (validHex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(validHex)) {
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

/**
 * 
 * @param floorOrCeil :"F" / "C"
 * @param colors      :各床や天井の色1, 2
 * @param patterns    :各床や天井の模様
 * @param x           :空間内で床や天井に光線が到達したx座標
 * @param z           :空間内で床や天井に光線が到達したz座標
 * @param refrect     :反射後に到達したらtrue, 直接ならfalse
 * @returns [r, g, b, alpha]
 */
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

  x = Math.floor(x);
  z = Math.floor(z);
  let nz = ((x%wid)+wid)%wid - wid/2;
  let nx = ((z%wid)+wid)%wid - wid/2;
  nx *= -1;

  let patternMode: PatternMode;

  // xとzのパターンのチェックに基づいてFloor/Ceilの判定
  const isSurface1 = Math.abs(Math.floor(x/wid) % 2) === Math.abs(Math.floor(z/wid) % 2);
  // Floor/Ceilの判定をシンプルに
  patternMode = isSurface1
    ? (floorOrCeil === "F" ? "Floor1" : "Ceil1")
    : (floorOrCeil === "F" ? "Floor2" : "Ceil2");

  const isInsidePattern = getShapeFunction(patterns[patternMode].pattern);

  if (isInsidePattern(wid, nx, nz)) {
    ({ r, g, b } = hexToRgb(colors[patternMode].color1));
  } else {
    ({ r, g, b } = hexToRgb(colors[patternMode].color2));
  }

  const d = (x*x + z*z) / 1000000;
  [r, g, b] = [r, g, b].map(v => Math.min(v, v / d));
  if (refrect) alpha *= 0.85;
  return [r, g, b, alpha];
};

type ShapeFunction = (w: number, x: number, y: number) => boolean;
export const getShapeFunction = (pattern: string): ShapeFunction => {
  const patternsFunc: { [key: string]: ShapeFunction } = {
    star: star,
    heart: heart,
    diamond: diamond,
    clover: clover,
    spade: spade,
    abcd: abcd,
    atcoder1: atcoder1,
    atcoder2: atcoder2,
    atcoder3: atcoder3,
    atcoder4: atcoder4,
    default: normal,
  };

  return patternsFunc[pattern] || patternsFunc.default;
};
