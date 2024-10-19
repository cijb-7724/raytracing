import { useEffect, useRef } from "react";
import { dot, setColor, getColorFromPattern } from "./Utilty";

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

export default function DrawStatic({
  patterns, 
  colors
}: DrawStaticProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>(0); // アニメーション制御用のリファレンス
  let cnt = useRef<number>(0); // アニメーションの状態を保持
  
  const yFloor = 400;
  const yCeil = -yFloor;
  const zsc = 300;
  const zeros = [0, 0, 0];
  const Vdsee = zeros.slice();
  const radius = 600;
  const t = 20;
  const theta = Math.PI * 2 / (t * 10);

  let r = 500;
  let midC = [0, 0, 1700];
  let center = [midC[0], midC[1], midC[2] + radius];
  
  // アニメーション関数（初期化し、常に動作し続ける）
  const animate = () => {
    // const ctx = canvasRef.current?.getContext("2d");
    const ctx = canvasRef.current?.getContext("2d", { willReadFrequently: true });
    
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

    const image = ctx.getImageData(0, 0, width, height);// here is 87 row
    const pixels = image.data;

    for (let i = 0; i < 2 * wy; ++i) for (let j = 0; j < 2 * wx; ++j) {
      const ysc = i - wy;
      const xsc = j - wx;
      const Vsee = [xsc, ysc, zsc];
      const norm = Math.sqrt(dot(Vsee, Vsee));
      const Esee = Vsee.map((v) => v / norm);

      const c1 = dot(Esee, center);
      const c2 = dot(center, center) - r * r;

      if (c1 * c1 - c2 < 0) {
        //直接床/天井にぶつかる
        let t = yFloor / Esee[1];
        if (t > 0) setColor(pixels, width, i, j, getColorFromPattern("F", colors, patterns, t * Esee[0], t * Esee[2]));
        t = yCeil / Esee[1];
        if (t > 0) setColor(pixels, width, i, j, getColorFromPattern("C", colors, patterns, t * Esee[0], t * Esee[2]));
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
        if (s > 0) setColor(pixels, width, i, j, getColorFromPattern("F", colors, patterns, t * Esee[0] + s * Vdsee[0], t * Esee[2] + s * Vdsee[2], true));
        else if (s * Vdsee[1] < 0) isFloor = true;

        s = (yCeil - t * Esee[1]) / Vdsee[1];
        if (s > 0) setColor(pixels, width, i, j, getColorFromPattern("C", colors, patterns, t * Esee[0] + s * Vdsee[0], t * Esee[2] + s * Vdsee[2], true));
        else if (s * Vdsee[1] > 0) isCeil = true;

        if (isFloor) setColor(pixels, width, i, j, getColorFromPattern("F", colors, patterns, yFloor / Esee[1] * Esee[0], yFloor / Esee[1] * Esee[2]));
        if (isCeil) setColor(pixels, width, i, j, getColorFromPattern("C", colors, patterns, yCeil/Esee[1]*Esee[0], yCeil/Esee[1] * Esee[2]));
      }
    }

    ctx.putImageData(image, 0, 0);
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

  return (
      <canvas width="250" height="250" ref={canvasRef}
      style={{ width: '500px', height: '500px' }} ></canvas>
  );
}
