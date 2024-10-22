import { useRef } from "react";
import { IoWaterSharp } from "react-icons/io5";

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
    <div>
      <div
        className="icon-color-picker"
        onClick={handleClick}
        style={{ color: color }} // アイコンの色を動的に変更
      >
        <IoWaterSharp />
      </div>

      <input
        type="color"
        ref={inputRef}
        value={color}
        className="overlay-input"
        onChange={handleChange}
      />
      
    </div>
  );
}
