import { useEffect, useRef } from "react";

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

type DrawStaticProps = {
  patterns: Patterns;
  colors: Colors;
};

export default function DrawStatic({ patterns, colors }: DrawStaticProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // let animationFrameId: number;
  const requestRef = useRef<number>(0); // アニメーション制御用のリファレンス
  let cnt = useRef<number>(0); // アニメーションの状態を保持
  
  

  let yFloor = 400;
  let yCeil = -yFloor;
  let zsc = 300;
  let r = 500;
  let zeros = [0, 0, 0];
  let Vdsee = zeros.slice();
  let midC = [0, 0, 1700];
  let radius = 600;
  let center = [midC[0], midC[1], midC[2] + radius];
  let t = 20;
  const theta = Math.PI * 2 / (t * 10);

  //sita2tu fuyou
  const floor1color1 = colors["Floor1"].color1;
  const floor1color2 = colors["Floor1"].color2;
  // const floor2color1 = colors["Floor2"].color1;
  // const floor2color2 = colors["Floor2"].color2;
  // const ceil1color1 = colors["Ceil1"].color1;
  // const ceil1color2 = colors["Ceil1"].color2;
  // const ceil2color1 = colors["Ceil2"].color1;
  // const ceil2color2 = colors["Ceil2"].color2;
    

  // const draw = () => {
  //   updateCenterPosition();
  //   render(context);
  //   cnt = (cnt + 1) % 600;
  //   animationFrameId = requestAnimationFrame(draw); // 次のフレームをリクエスト
  // };
  // アニメーション関数（初期化し、常に動作し続ける）
  const animate = () => {
    const ctx = canvasRef.current?.getContext("2d");
    
    // ctx が null または undefined でないことを確認
    if (ctx) {
      updateCenterPosition(); // 球の位置を更新
      render(ctx); // 現在の色で描画
      cnt.current = (cnt.current + 1) % 600;
      requestRef.current = requestAnimationFrame(animate); // 次のフレームをリクエスト
    }
  };

  const updateCenterPosition = () => {
    const switchMode = Math.floor(cnt.current / 300) % 2 === 0;
    r = switchMode ? 500 : 250;
    midC = switchMode ? [0, 0, 1700] : [0, 150, 1700];

    const x = center[0] - midC[0];
    const z = center[2] - midC[2];
    const nx = Math.cos(theta) * x - Math.sin(theta) * z;
    const nz = Math.sin(theta) * x + Math.cos(theta) * z;

    center[0] = nx + midC[0];
    center[2] = nz + midC[2];
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    if (!ctx || !canvasRef.current) return;
    const { width, height } = canvasRef.current;
    const wx = width / 2;
    const wy = height / 2;

    const image = ctx.getImageData(0, 0, width, height);
    const pixels = image.data;

    for (let i = 0; i < 2 * wy; ++i) {
      for (let j = 0; j < 2 * wx; ++j) {
        const ysc = i - wy;
        const xsc = j - wx;
        const Vsee = [xsc, ysc, zsc];
        const norm = Math.sqrt(dot(Vsee, Vsee));
        const Esee = Vsee.map((v) => v / norm);

        const c1 = dot(Esee, center);
        const c2 = dot(center, center) - r * r;

        if (c1 * c1 - c2 < 0) {
          //直接床/天井にぶつかる
          setColor(pixels, wx, i, j, [255, 255, 255, 255]); // 簡単な色設定
          let t = yFloor / Esee[1];
          if (t > 0) setColor(pixels, wx, i, j, floorColor(t * Esee[0], t * Esee[2]));
          t = yCeil / Esee[1];
          if (t > 0) setColor(pixels, wx, i, j, ceilColor(t * Esee[0], t * Esee[2]));
        } else {
          //球で反射
          let isFloor = false
          let isCeil = false;
          let t = c1 - Math.sqrt(c1 * c1 - c2);
          let n = [...zeros]; // 配列のコピーを作成
          for (let k = 0; k < 3; ++k) {
            n[k] = t * Esee[k] - center[k];
          }
          const norm = Math.sqrt(n.reduce((sum, val) => sum + val * val, 0)); // ノルムの計算
          for (let k = 0; k < 3; ++k) {
            n[k] /= norm;
          }

          let coef = -2 * dot(Esee, n);
          for (let k=0; k<3; ++k) {
            Vdsee[k] = Esee[k] + coef * n[k];
          }

          let s = (yFloor - t * Esee[1]) / Vdsee[1];
          if (s > 0) setColor(pixels, wx, i, j, floorColor(t * Esee[0] + s * Vdsee[0], t * Esee[2] + s * Vdsee[2], true));
          else if (s * Vdsee[1] < 0) isFloor = true;

          s = (yCeil - t * Esee[1]) / Vdsee[1];
          if (s > 0) setColor(pixels, wx, i, j, ceilColor(t * Esee[0] + s * Vdsee[0], t * Esee[2] + s * Vdsee[2], true));
          else if (s * Vdsee[1] > 0) isCeil = true;

          if (isFloor) setColor(pixels, wx, i, j, floorColor(yFloor / Esee[1] * Esee[0], yFloor / Esee[1] * Esee[2]));
          if (isCeil) setColor(pixels, wx, i, j, ceilColor(yCeil/Esee[1]*Esee[0], yCeil/Esee[1] * Esee[2]));
        }
      }
    }

    ctx.putImageData(image, 0, 0);
  };

  const dot = (a: number[], b: number[]) =>
    a.reduce((sum, v, i) => sum + v * b[i], 0);

  const setColor = (
    pixels: Uint8ClampedArray,
    wx: number,
    i: number,
    j: number,
    color: number[]
  ) => {
    const base = (i * 2 * wx + j) * 4;
    for (let k = 0; k < 4; ++k) pixels[base + k] = color[k];
  };

  const floorColor = (
    x: number, 
    z: number, 
    refrect: boolean = false
  ): [number, number, number, number] => {
    const wid = 400;
    let alpha = 255;
    let r = 0, g = 0, b = 0;
  
    if (Math.abs(Math.floor(x / wid) % 2) === Math.abs(Math.floor(z / wid) % 2)) {
      let nx = Math.abs(x) % wid;
      let nz = Math.abs(z) % wid;
      nx -= wid / 2;
      nz -= wid / 2;
      if (starIn(nx, nz, (wid / 2) * 0.8)) {
        let rgb = hexToRgb(floor1color1);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      } else {
        let rgb = hexToRgb(floor1color2);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      }
    } else {
      let nx = Math.abs(x) % wid;
      let nz = Math.abs(z) % wid;
      nx -= wid / 2;
      nz -= wid / 2;
      if (starIn(nx, nz, (wid / 2) * 0.8)) {
        let rgb = hexToRgb(floor1color2);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      } else {
        let rgb = hexToRgb(floor1color1);
        r = rgb.r;
        g = rgb.g;
        b = rgb.b;
      }
    }
  
    const d = (x * x + z * z) / 1000000;
    r = Math.min(r, r / d);
    g = Math.min(g, g / d);
    b = Math.min(b, b / d);
  
    if (refrect) alpha *= 0.9;
  
    return [r, g, b, alpha];
  };

  const ceilColor = (
    x: number, 
    z: number, 
    refrect: boolean = false
  ): [number, number, number, number] => {
    const wid = 400;
    let alpha = 255;
    let r = 0, g = 0, b = 0;
  
    // チェッカーボードのパターンに基づいて色を決定
    if (Math.abs(Math.floor(x / wid) % 2) === Math.abs(Math.floor(z / wid) % 2)) {
      r = 160;
      g = 160;
      b = 234;
    } else {
      r = 243;
      g = 239;
      b = 96;
    }
  
    // 距離に基づいて色を調整
    const d = (x * x + z * z) / 1000000;
    r = Math.min(r, r / d);
    g = Math.min(g, g / d);
    b = Math.min(b, b / d);
  
    // 反射の影響を考慮
    if (refrect) alpha *= 0.9;
  
    return [r, g, b, alpha];
  };
  
  //星の内側判定
  const starIn = (x: number, y: number, r: number): boolean => {
    let ok = true;
    const theta = Math.PI * 4 / 5;
    const as = Array(5).fill(0); // 長さ5の配列を初期化
    const bs = Array(5).fill(0); // 長さ5の配列を初期化
  
    for (let k = 0; k < 5; ++k) {
      const xp = r * Math.cos(Math.PI / 2 + theta * k);
      const yp = r * Math.sin(Math.PI / 2 + theta * k);
      const xq = r * Math.cos(Math.PI / 2 + theta * (k + 1));
      const yq = r * Math.sin(Math.PI / 2 + theta * (k + 1));
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

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
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


  // 初回マウント時にアニメーションを開始
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate); // アニメーションを開始
    return () => cancelAnimationFrame(requestRef.current); // クリーンアップで停止
  }, []);

  // colorsが変わった時に即座に色を反映
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      render(ctx);
    }
    console.log("aaaaaaaaaaaaaaaaaa");
  }, [colors]);

  // return () => {
  //   // クリーンアップ処理（必要に応じて）
  //   cancelAnimationFrame(animationFrameId);
  //   <canvas width="420" height="420" ref={canvasRef}></canvas>
  // };


  return (
    // <div className="w-2/5 aspect-square bg-blue-400 flex items-center justify-center flex-col">
      // <canvas width="420" height="420" ref={canvasRef}></canvas>
      // <canvas width="280" height="280" ref={canvasRef}></canvas>
      <canvas width="250" height="250" ref={canvasRef}
      style={{ width: '500px', height: '500px' }} ></canvas>
    // </div>
  );
}