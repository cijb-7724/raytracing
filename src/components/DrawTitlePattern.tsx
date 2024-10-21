import { useRef, useEffect } from "react";
import { hexToRgb, setColor, getShapeFunction } from "./Utilty";

type DrawTilePatternProps = {
  color1: string;
  color2: string;
  pattern: string;
  width: number;
};

/**
 * 
 * @param color1 - タイルに使用する模様の内側の色.
 * @param color2 - タイルに使用する模様の外側の色.
 * @param pattern - タイルの模様.
 * @param width - タイルの幅.
 * @returns 模様を描画したタイルを描画したキャンバスのJSX要素.
 */
export default function DrawTilePattern({
  color1,
  color2,
  pattern,
  width,
}: DrawTilePatternProps) {
  const canvasRef_pattern = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvasRef_pattern.current) return;
    const ctx = canvasRef_pattern.current.getContext("2d");
    if (!ctx) return;
    render(ctx);
  }, [color1, color2, pattern, width]);

  const render = (ctx: CanvasRenderingContext2D) => {
    const image = ctx.getImageData(0, 0, width, width);
    const pixels = image.data;

    const isInsidePattern = getShapeFunction(pattern);

    let r, g, b;
    for (let i = 0; i < width; ++i) for (let j = 0; j < width; ++j) {
      if (isInsidePattern(width, i - width/2, j - width/2)) {
        ({ r, g, b } = hexToRgb(color1));
      } else {
        ({ r, g, b } = hexToRgb(color2));
      }
      setColor(pixels, width, i, j, [r, g, b, 255]);
    }
    ctx.putImageData(image, 0, 0);
  }

  return (
      <canvas width={width} height={width} ref={canvasRef_pattern} className="test-tile"></canvas>
  );
}
