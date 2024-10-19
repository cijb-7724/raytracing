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
          if (isInsidePattern(width, i-width/2, j-width/2)) {
            ({ r, g, b } = hexToRgb(color1));
          } else {
            ({ r, g, b } = hexToRgb(color2));
          }
          setColor(pixels, width, i, j, [r, g, b, 255]);
        }
        ctx.putImageData(image, 0, 0);
      }
    }
  }, [color1, color2, pattern, width]);

  return (
      <canvas width={width} height={width} ref={canvasRef_pattern} ></canvas>
  );
}
