import { useRef, useEffect, useState } from "react";

type PatternCanvasProps = {
  color1: string;
  color2: string;
  pattern: string;
  onPatternSelect: (pattern: string) => void;
};

export default function PatternCanvas({
  color1,
  color2,
  pattern,
  onPatternSelect,
}: PatternCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // ポップアップの状態

  // キャンバスに模様を描画する関数
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア

    // 選択された模様に応じた描画
    if (pattern === "stripes") {
      for (let i = 0; i < canvas.height; i += 10) {
        ctx.fillStyle = i % 20 === 0 ? color1 : color2;
        ctx.fillRect(0, i, canvas.width, 10);
      }
    } else if (pattern === "dots") {
      ctx.fillStyle = color1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color2;
      for (let y = 10; y < canvas.height; y += 20) {
        for (let x = 10; x < canvas.width; x += 20) {
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }, [color1, color2, pattern]);

  return (
    <div className="relative">
      {/* キャンバス */}
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="border border-black"
        onClick={() => setIsPopupOpen(true)}
      />

      {/* 模様選択のポップアップ */}
      {isPopupOpen && (
        <div className="absolute top-0 left-0 bg-white border shadow-lg p-4">
          <h2 className="text-lg mb-2">Select a Pattern</h2>
          <button onClick={() => { onPatternSelect("stripes"); setIsPopupOpen(false); }}>
            Stripes
          </button>
          <button onClick={() => { onPatternSelect("dots"); setIsPopupOpen(false); }}>
            Dots
          </button>
        </div>
      )}
    </div>
  );
}