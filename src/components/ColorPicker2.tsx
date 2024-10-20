import { useRef, useState } from "react";

type ColorPickerProps = {
  color: string;
  onColorChange: (color: string) => void;
};

/**
 * ColorPicker コンポーネント
 * プリセットの色を選択可能
 * 
 * @param color - 現在選択されている色. #RRGGBB形式.
 * @param onColorChange - 色を変更するために呼び出す関数.
 * @returns カラーピッカーのJSX要素.
 */
export default function ColorPicker({ color, onColorChange }: ColorPickerProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // ポップアップの状態
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsPopupOpen((prev) => !prev); // ポップアップの表示/非表示を切り替え
  };

  const handleColorSelect = (selectedColor: string) => {
    onColorChange(selectedColor); // 親コンポーネントに色を渡す
    setIsPopupOpen(false); // 選択後にポップアップを閉じる
  };

  return (
    <div className="relative" ref={pickerRef}>
      {/* カスタム円形ボタン */}
      <div
        className="h-14 w-14 rounded-full border-4 border-white cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={handleClick}
      />

      {/* カラーピッカーのポップアップ */}
      {isPopupOpen && (
        <div
          className="absolute top-16 left-0 bg-white border border-gray-300 shadow-lg rounded-lg p-2"
          style={{ zIndex: 10 }} // ポップアップが前面に出るように
        >
          <div className="flex gap-2">
            {["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"].map((preset) => (
              <div
                key={preset}
                className="h-8 w-8 rounded-full cursor-pointer border-2 border-gray-300"
                style={{ backgroundColor: preset }}
                onClick={() => handleColorSelect(preset)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
