// components/ColorPicker.tsx
import { useRef } from "react";

type ColorPickerProps = {
  color: string;
  onColorChange: (color: string) => void;
};

export default function ColorPicker({ color, onColorChange }: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click(); // カスタムボタンをクリックしたときに input を開く
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(event.target.value); // 選択された色を親に渡す
  };

  return (
    <div className="relative">
      {/* カスタム円形ボタン */}
      <div
        className="h-14 w-14 rounded-full border-4 border-white cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={handleClick}
      />

      {/* 見えない input タグ */}
      <input
        type="color"
        ref={inputRef}
        value={color}
        onChange={handleChange}
        className="hidden" // input を隠す
      />
    </div>
  );
}