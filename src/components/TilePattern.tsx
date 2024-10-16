import { useState } from "react";
import Modal from "./Modal";
import DrawTilePattern from "./DrawTitlePattern";

type TilePatternProps = {
  color1: string;
  color2: string;
  pattern: string;
  onPatternChange: (pattern: string) => void;
};

export default function TilePattern({
  color1,
  color2,
  pattern,
  onPatternChange,
}: TilePatternProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダル開閉状態
  return (
    <div>
      {/* TilePattern をクリックしたときにモーダルを開く */}
      <div
        className="w-full aspect-square bg-blue-400 flex items-center justify-center flex-col cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <DrawTilePattern
          color1={color1}
          color2={color2}
          pattern={pattern}
        />
      </div>

      {/* モーダルが開いているときに表示 */}
      {isModalOpen && <Modal
        color1={color1}
        color2={color2}
        onClose={() => setIsModalOpen(false)} 
        onPatternChange={onPatternChange}
      />}
    </div>
  );
}
