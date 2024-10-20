import { useRef } from "react";

type ColorPickerProps = {
  color: string;
  onColorChange: (color: string) => void;
};

/**
 * ColorPicker コンポーネント.
 * ユーザーが色を選択できる円形のカラーピッカーを提供する.
 * 円形ボタンをクリックすると隠された `<input type="color">` が開き色の変更が可能.
 * 
 * @param color - 現在選択されている色. #RRGGBB形式.
 * @param onColorChange - 色を変更するために呼び出す関数.
 * @returns カラーピッカーのJSX要素.
 */
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
      {/* 円形ボタン */}
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
