import { Dispatch, SetStateAction } from "react";
import TilePattern from "./TilePattern";
import ColorPicker from "./ColorPicker";

type PatternMode = "Floor1" | "Floor2" | "Ceil1" | "Ceil2";

type MenuProps = {
  patternAndColorMode: PatternMode;
  setPatternAndColorMode: Dispatch<SetStateAction<PatternMode>>; // 型を修正
  color1: string;
  onColorChange1: (color: string) => void;
  color2: string;
  onColorChange2: (color: string) => void;
  pattern: string;
  onPatternChange: (mode: string) => void;
};

/**
 * メニューコンポーネント. 床や天井のパターンやカラーを選択・変更できるインターフェース.
 *
 * @param setPatternAndColorMode - 床や天井のモードを設定する関数. ボタンをクリックすることで呼び出され, "Floor1", "Floor2", "Ceil1", "Ceil2"のいずれかを選択する.
 * @param color1 - 現在の模様における内側の色.
 * @param onColorChange1 - 色1を変更するための関数. カラーピッカーで選択された色を親コンポーネントに渡す.
 * @param color2 - 現在の模様における外側の色.
 * @param onColorChange2 - 色2を変更するための関数. カラーピッカーで選択された色を親コンポーネントに渡す.
 * @param pattern - 現在選択されている模様 (e.g.：star, heart...).
 * @param onPatternChange - 模様を変更するための関数. 選択された模様を親コンポーネントに渡す.
 * 
 * @returns パターンや色を選択するためのインターフェースを含む JSX 要素を返す.
 * 
 * このコンポーネントは, 床や天井のパターンや色をインタラクティブに変更できるUIを提供する. 各床や天井に対して異なる設定が可能で, ユーザーが選択したパターンや色に応じてUIが更新される.
 */
export default function Menu({
  setPatternAndColorMode,
  color1,
  onColorChange1,
  color2,
  onColorChange2,
  pattern,
  onPatternChange
}: MenuProps) {
  return (
    <div className="flex">
      <div className="h-80 w-40 bg-blue-600 flex items-center justify-center flex-col">
        <button onClick={() => setPatternAndColorMode("Floor1")}>Floor 1</button>
        <button onClick={() => setPatternAndColorMode("Floor2")}>Floor 2</button>
        <button onClick={() => setPatternAndColorMode("Ceil1")}>Ceil 1</button>
        <button onClick={() => setPatternAndColorMode("Ceil2")}>Ceil 2</button>
      </div>
      <div className="flex flex-col">
        <TilePattern
          color1={color1}
          color2={color2}
          pattern={pattern}
          onPatternChange={onPatternChange}
        />
        <div className="flex">
            <ColorPicker color={color1} onColorChange={onColorChange1} />
            <ColorPicker color={color2} onColorChange={onColorChange2} />
        </div>
      </div>
    </div>
  );
}
