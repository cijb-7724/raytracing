import { useEffect, useRef } from "react";
import { dot, setColor, getColorFromPattern } from "./Utility";

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

let globalInfo: DrawSphereProps = {
  patterns: {
    Floor1: { pattern: "normal" },
    Floor2: { pattern: "normal" },
    Ceil1: { pattern: "normal" },
    Ceil2: { pattern: "star" },
  },
  colors: {
    Floor1: { color1: "#ffffff", color2: "#000000" }, // 白と黒
    Floor2: { color1: "#ff0000", color2: "#00ff00" }, // 赤と緑
    Ceil1: { color1: "#0000ff", color2: "#ffff00" }, // 青と黄色
    Ceil2: { color1: "#ff00ff", color2: "#00ffff" }, // 紫と水色
  },
  motion: "Static",
};

/**
 * 
 * @param patterns - 各床や天井の模様.
 * @param colors - 各床や天井の色.
 * @param motion - 球の運動の規則.
 * @returns 球の運動を描画したキャンバスのJSX要素.
 */
export default function DrawSphere({
  patterns, 
  colors,
  motion,
}: DrawSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>(0); // アニメーション制御用のリファレンス
  const previousMotionRef = useRef<string>("Static"); // 前の motion を保持
  let rSwitch = 0;

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

  const setInitialValues = () => {
    //球の動かし方ごとに異なる初期値の設定
    if (globalInfo.motion === "Static") {
      r = 500;
      midC = [0, 0, 1700];
      center = [midC[0], midC[1], midC[2] + 600];
    }
    if (globalInfo.motion === "Gravity") {
      r = 230;    //球の半径
      center = [-300, 200, 1600];
      tx = 17;  //x軸(右)方向の速度
      ty = -60; //y軸(下)方向の速度
      tz = 32;  //z軸(奥)方向の速度
      tyv = 3.2;  //y軸方向の加速度
    }
    if (globalInfo.motion === "Linear") {
      r = 250;  //球の半径
      center = [-300, 100, 1600];
      tx = 13;  //x軸(右)方向の速度
      ty = 8;   //y軸(下)方向の速度
      tz = -17; //z軸(奥)方向の速度
    }
  };
  setInitialValues();

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
      rSwitch = (rSwitch+1) % 400;
      requestRef.current = requestAnimationFrame(animate); // 次のフレームをリクエスト
    }
  };
  
  /**
   * Staticな運動の次の球の中心座標と半径を計算.
   */
  const updateCenterPositionStatic = () => {
    const switchMode = Math.floor(rSwitch/200) % 2 === 0;
    r = switchMode ? 500 : 250;
    midC = switchMode ? [0, 0, 1700] : [0, 150, 1700];

    const x = center[0] - midC[0];
    const z = center[2] - midC[2];
    const nx = Math.cos(theta)*x - Math.sin(theta)*z;
    const nz = Math.sin(theta)*x + Math.cos(theta)*z;

    center[0] = nx + midC[0];
    center[2] = nz + midC[2];
  };

  /**
   * Linearな運動の次の球の中心座標を計算.
   */
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

  /**
   * Gravityな運動の次の球の中心座標を計算.
   */
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
    if (y === yFloor - r && ty === 0 && rSwitch % 10 === 0) {
      tx *= 0.9;
      tz *= 0.9;
    }
  };

  /**
   * 提供されたキャンバスのコンテキストに対してシーンを描画し, 球体からの反射や床・天井との交差を含むレイトレーシングの計算をする
   *
   * @param ctx - キャンバスのレンダリングコンテキスト
   * @returns void
   *
   * 関数内で実行される主な操作：
   * - 光線計算: キャンバスの各ピクセルに対して, ピクセルの位置とカメラの視線ベクトルを使って光線の方向を決定する.
   * - 交差判定: 光線が床, 天井, 球体と交差するかどうかを計算する.
   * - 反射処理: 光線が球体に当たった場合, 反射ベクトルを計算し, 新しい方向で床や天井とのさらなる交差を計算する.
   * - 色付け: 光線が交差した場所や反射したかどうかに基づいてピクセルに色を決定する.
   */
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
        if (t > 0) setColor(pixels, width, i, j, getColorFromPattern("F", globalInfo.colors, globalInfo.patterns, t * Esee[0], t * Esee[2]));
        t = yCeil / Esee[1];
        if (t > 0) setColor(pixels, width, i, j, getColorFromPattern("C", globalInfo.colors, globalInfo.patterns, t * Esee[0], t * Esee[2]));
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
        if (s > 0) setColor(pixels, width, i, j, getColorFromPattern("F", globalInfo.colors, globalInfo.patterns, t*Esee[0] + s*Vdsee[0], t*Esee[2] + s*Vdsee[2], true));
        else if (s * Vdsee[1] < 0) isFloor = true;

        s = (yCeil-t*Esee[1]) / Vdsee[1];
        if (s > 0) setColor(pixels, width, i, j, getColorFromPattern("C", globalInfo.colors, globalInfo.patterns, t*Esee[0] + s*Vdsee[0], t*Esee[2] + s*Vdsee[2], true));
        else if (s * Vdsee[1] > 0) isCeil = true;

        if (isFloor) setColor(pixels, width, i, j, getColorFromPattern("F", globalInfo.colors, globalInfo.patterns, yFloor / Esee[1] * Esee[0], yFloor / Esee[1] * Esee[2]));
        if (isCeil) setColor(pixels, width, i, j, getColorFromPattern("C", globalInfo.colors, globalInfo.patterns, yCeil / Esee[1] * Esee[0], yCeil / Esee[1] * Esee[2]));
      }
    }

    ctx.putImageData(image, 0, 0);
  };

  // 初回マウント時にアニメーションを開始
  useEffect(() => {
    Object.assign(globalInfo, { motion, patterns, colors });
    requestRef.current = requestAnimationFrame(animate); // アニメーションを開始
    return () => cancelAnimationFrame(requestRef.current); // クリーンアップで停止
  }, []);

  // colorsが変わった時に即座に色を反映
  useEffect(() => {
    Object.assign(globalInfo, { motion, patterns, colors });
  }, [motion, patterns, colors]);

  useEffect(() => {
    Object.assign(globalInfo, { motion, patterns, colors });
    if (previousMotionRef.current !== motion) {
      // アニメーションをリセットする
      cancelAnimationFrame(requestRef.current);
      setInitialValues(); // 初期値設定
      requestRef.current = requestAnimationFrame(animate); // 新しいアニメーションを開始
      previousMotionRef.current = motion;
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current); // クリーンアップで停止
      }
    };
  }, [motion]);

  return (
    <canvas 
      width="250" 
      height="250" 
      ref={canvasRef}
      style={{ width: '500px', aspectRatio: '1 / 1' }}
      className="main-canvas" 
    ></canvas>
  );
}
