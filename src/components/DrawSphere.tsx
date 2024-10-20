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

type DrawSphereProps = {
  patterns: Patterns;
  colors: Colors;
  motion: string;
};

export default function DrawSphere({
  patterns, 
  colors,
  motion
}: DrawSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>(0); // アニメーション制御用のリファレンス
  let cnt = useRef<number>(0); // アニメーションの状態を保持
  
  const yFloor = 400;
  const yCeil = -yFloor;
  const zsc = 230;
  const zeros = [0, 0, 0];
  const Vdsee = zeros.slice();
  const t = 20;
  const theta = Math.PI*2 / (t*10);
  let r = 0;
  let center = [0, 0, 0];
  let midC = [0, 0, 0];
  let tx: number, ty: number, tz: number, tyv: number;
  console.log(motion);

  //球の動かし方ごとに異なる初期値の設定
  if (motion === "Static") {
    r = 500;
    midC = [0, 0, 1700];
    center = [midC[0], midC[1], midC[2] + 600];
  }
  if (motion === "Gravity") {
  r = 230;    //球の半径
    center = [-300, 200, 1600];
    tx = 17;  //x軸(右)方向の速度
    ty = -60; //y軸(下)方向の速度
    tz = 32;  //z軸(奥)方向の速度
    tyv = 3.2;  //y軸方向の加速度
  }
  if (motion === "Linear") {
    r = 250;  //球の半径
    center = [-300, 100, 1600];
    tx = 13;  //x軸(右)方向の速度
    ty = 8;   //y軸(下)方向の速度
    tz = -17; //z軸(奥)方向の速度
  }
  
  // アニメーション関数（初期化し、常に動作し続ける）
  const animate = () => {
    const ctx = canvasRef.current?.getContext("2d", { willReadFrequently: true });
    
    // ctx が null または undefined でないことを確認
    if (ctx) {
      // 球の位置を更新
      if (motion === "Static") updateCenterPositionStatic();
      if (motion === "Linear") updateCenterPositionLinear();
      if (motion === "Gravity") updateCenterPositionGravity();
      render(ctx); // 現在の色で描画
      cnt.current = (cnt.current+1) % 600;
      requestRef.current = requestAnimationFrame(animate); // 次のフレームをリクエスト
    }
  };

  const updateCenterPositionStatic = () => {
    const switchMode = Math.floor(cnt.current/300) % 2 === 0;
    r = switchMode ? 500 : 250;
    midC = switchMode ? [0, 0, 1700] : [0, 150, 1700];

    const x = center[0] - midC[0];
    const z = center[2] - midC[2];
    const nx = Math.cos(theta)*x - Math.sin(theta)*z;
    const nz = Math.sin(theta)*x + Math.cos(theta)*z;

    center[0] = nx + midC[0];
    center[2] = nz + midC[2];
  };

  const updateCenterPositionLinear = () => {
    let x, y, z;
    [x, y, z] = center;
    //速度から位置を更新
    x += tx;
    y += ty;
    z += tz;
    //球の中心座標の更新
    center = [x, y, z];
    //横の壁の反射
    if (x > 500 || x < -500) tx *= -1;
    //手前・奥の壁の反射
    if (z > 2000 || z < 800) tz *= -1;
    //上下の壁の反射
    if (y > yFloor - r || y < yCeil + r) ty *= -1;
  };

  const updateCenterPositionGravity = () => {
    let x, y, z;
    [x, y, z] = center;
    //速度から位置を更新
    x += tx;
    y += ty;
    z += tz;
    //加速度から速度を更新
    ty += tyv;
    //球の中心座標の更新
    center = [x, y, z];
    //横の壁の反射
    if (x > 500 || x < -500) tx *= -1;
    //手前・奥の壁の反射
    if (z > 2000 || z < 500) tz *= -1;
    //次のフレームで床面に球がめり込む場合
    if (y + ty > yFloor - r) {
      //反発係数 
      ty *= -0.75;
      //y座標を床面に接触させる
      y = yFloor - r;
      //y軸方向の速度を0に収束させる
      if (Math.abs(ty) < 10) ty = 0;
    }
    //次のフレームで天井面に球がめり込む場合
    if (y + ty < yCeil + r) {
      //反発係数 
      ty *= -1;
      //y座標を天井面に接触させる
      y = yCeil + r;
    }
    //床に摩擦がある
    //床を転がっているときx, z軸方向の速度を減少させる
    if (y === yFloor - r && ty === 0 && cnt.current % 10 === 0) {
      tx *= 0.9;
      tz *= 0.9;
    }
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    if (!ctx || !canvasRef.current) return;
    const { width, height } = canvasRef.current;
    const wx = width / 2;
    const wy = height / 2;

    const image = ctx.getImageData(0, 0, width, height);
    const pixels = image.data;

    for (let i = 0; i < 2 * wy; ++i) for (let j = 0; j < 2 * wx; ++j) {
      const ysc = i - wy;
      const xsc = j - wx;
      const Vsee = [xsc, ysc, zsc];
      const norm = Math.sqrt(dot(Vsee, Vsee));
      const Esee = Vsee.map((v) => v / norm);

      const c1 = dot(Esee, center);
      const c2 = dot(center, center) - r*r;

      if (c1*c1 - c2 < 0) {
        //直接床/天井にぶつかる
        let t = yFloor / Esee[1];
        if (t > 0) setColor(pixels, width, i, j, getColorFromPattern("F", colors, patterns, t * Esee[0], t * Esee[2]));
        t = yCeil / Esee[1];
        if (t > 0) setColor(pixels, width, i, j, getColorFromPattern("C", colors, patterns, t * Esee[0], t * Esee[2]));
      } else {
        //球で反射
        let isFloor = false
        let isCeil = false;
        let t = c1 - Math.sqrt(c1*c1-c2);
        let n = [...zeros];
        for (let k = 0; k < 3; ++k) {
          n[k] = t*Esee[k] - center[k];
        }
        const norm = Math.sqrt(n.reduce((sum, val) => sum + val*val, 0)); // ノルムの計算
        for (let k = 0; k < 3; ++k) {
          n[k] /= norm;
        }

        let coef = -2 * dot(Esee, n);
        for (let k=0; k<3; ++k) {
          Vdsee[k] = Esee[k] + coef*n[k];
        }

        let s = (yFloor-t*Esee[1]) / Vdsee[1];
        if (s > 0) setColor(pixels, width, i, j, getColorFromPattern("F", colors, patterns, t*Esee[0] + s*Vdsee[0], t*Esee[2] + s*Vdsee[2], true));
        else if (s * Vdsee[1] < 0) isFloor = true;

        s = (yCeil-t*Esee[1]) / Vdsee[1];
        if (s > 0) setColor(pixels, width, i, j, getColorFromPattern("C", colors, patterns, t*Esee[0] + s*Vdsee[0], t*Esee[2] + s*Vdsee[2], true));
        else if (s * Vdsee[1] > 0) isCeil = true;

        if (isFloor) setColor(pixels, width, i, j, getColorFromPattern("F", colors, patterns, yFloor / Esee[1] * Esee[0], yFloor / Esee[1] * Esee[2]));
        if (isCeil) setColor(pixels, width, i, j, getColorFromPattern("C", colors, patterns, yCeil / Esee[1] * Esee[0], yCeil / Esee[1] * Esee[2]));
      }
    }

    ctx.putImageData(image, 0, 0);
  };


  // 初回マウント時にアニメーションを開始
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate); // アニメーションを開始
    return () => cancelAnimationFrame(requestRef.current); // クリーンアップで停止
  }, [motion]);

  // colorsが変わった時に即座に色を反映
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      render(ctx);
    }
  }, [colors, patterns]);

  return (
      <canvas width="250" height="250" ref={canvasRef}
      style={{ width: '500px', height: '500px' }} ></canvas>
  );
}
