import { useState } from "react";
import Modal from "./Modal";
import DrawTilePattern from "./DrawTitlePattern";

type TilePatternProps = {
  color1: string;
  color2: string;
  pattern: string;
  onPatternChange: (pattern: string) => void;
};

/**
 * タイルの模様を表示し, ユーザーがクリックするとパターン選択用のモーダルを開くコンポーネント.
 * モーダル内でパターンが選択されると, そのパターンが親コンポーネントに通知される.
 * 
 * @param color1 - 模様の内側の色.
 * @param color2 - 模様の外側の色.
 * @param pattern - 現在選択されている模様の名前.
 * @param onPatternChange - 模様が変更されたときに呼び出される関数. 選択された模様を親コンポーネントに通知する.
 * 
 * @returns タイルの模様およびモーダル表示を含む JSX 要素.
 * 
 * タイルの模様がクリックされると, 模様選択用のモーダルが表示されます. モーダル内でユーザーが新しい模様を選択すると, その変更は `onPatternChange` を通じて親に通知される. モーダルは `isModalOpen` の状態で開閉を制御する.
 */
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
        className="test-tile-wrap"
        // onClick={() => setIsModalOpen(true)}
      >
        <DrawTilePattern
          color1={color1}
          color2={color2}
          pattern={pattern}
          width={100}
          onClick={() => setIsModalOpen(true)}
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
