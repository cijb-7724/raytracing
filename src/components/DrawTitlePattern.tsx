import { useRef, useEffect } from "react";
import { hexToRgb, setColor } from "./Utilty";
import { star, nomal } from "./ShapePatterns";

type DrawTilePatternProps = {
  color1: string;
  color2: string;
  pattern: string;
  width: number;
};

export default function DrawTilePattern({
  color1,
  color2,
  pattern,
  width,
}: DrawTilePatternProps) {
  const canvasRef_pattern = useRef<HTMLCanvasElement | null>(null);
  console.log(canvasRef_pattern);
  useEffect(() => {
    if (canvasRef_pattern.current) {
      const ctx = canvasRef_pattern.current.getContext("2d");
      if (ctx) {
        const image = ctx.getImageData(0, 0, width, width);
        const pixels = image.data;

        type ShapeFunction = (w: number, x: number, y: number) => boolean;
        let isInsidePattern: ShapeFunction;

        if (pattern === "star") {
          isInsidePattern = star;
        } else {
          isInsidePattern = nomal;
        }

        let r, g, b;
        for (let i = 0; i < width; ++i) for (let j = 0; j < width; ++j) {
          const x = i - width/2;
          const y = j - width/2;
          if (isInsidePattern(width, x, y)) {
            ({ r, g, b } = hexToRgb(color1));
          } else {
            ({ r, g, b } = hexToRgb(color2));
          }
          setColor(pixels, width, i, j, [r, g, b, 255]);
        }
        ctx.putImageData(image, 0, 0);
      }
    }
  }, [color1, color2, pattern, width]); // これらの値が変更されたときに再描画

  return (
    // <div className="w-full aspect-square bg-black flex items-center justify-center flex-col cursor-pointer">
    //   <p className="text-xl text-red-400">c1: {color1}</p>
    //   <p className="text-xl text-red-400">c2: {color2}</p>
    //   <p className="text-xl text-red-400">pt: {pattern}</p>
    //   <p className="text-xl text-red-400">wid: {width}</p>
    // </div>
      <canvas width={width} height={width} ref={canvasRef_pattern} ></canvas>
  );
}
