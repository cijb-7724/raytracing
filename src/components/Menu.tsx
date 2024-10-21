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
  patternAndColorMode,
  setPatternAndColorMode,
  color1,
  onColorChange1,
  color2,
  onColorChange2,
  pattern,
  onPatternChange
}: MenuProps) {
  return (
    <div className="setting-pattern-and-color">
      <div className="segmented-control-surface">
        <input
          type="radio"
          name="radio3"
          value="Floor1"
          id="tab-1s"
          checked={patternAndColorMode === "Floor1"} onChange={() => setPatternAndColorMode("Floor1")} />
        <label htmlFor="tab-1s" className= "segmented-control-surface__1">
          <p>Floor1</p></label>
        
          <input
          type="radio"
          name="radio3"
          value="Floor2"
          id="tab-2s"
          checked={patternAndColorMode === "Floor2"} onChange={() => setPatternAndColorMode("Floor2")} />
        <label htmlFor="tab-2s" className= "segmented-control-surface__2">
          <p>Floor2</p></label>
        
        <input
          type="radio"
          name="radio3"
          value="Ceil1"
          id="tab-3s"
          checked={patternAndColorMode === "Ceil1"} onChange={() => setPatternAndColorMode("Ceil1")} />
        <label htmlFor="tab-3s" className= "segmented-control-surface__3">
          <p>Ceil1</p></label>
        
        <input
          type="radio"
          name="radio3"
          value="Ceil2"
          id="tab-4s"
          checked={patternAndColorMode === "Ceil2"} onChange={() => setPatternAndColorMode("Ceil2")} />
        <label htmlFor="tab-4s" className= "segmented-control-surface__4">
          <p>Ceil2</p></label>
        
        <div className="segmented-control-surface__color"></div>
      </div>

      <div className="test-tile-and-colorpicker">
        <TilePattern
          color1={color1}
          color2={color2}
          pattern={pattern}
          onPatternChange={onPatternChange}
        />
        <div className="colorpickers">
          <div className="colorpicker1">
            <ColorPicker color={color1} onColorChange={onColorChange1} />
          </div>
          <div className="colorpicker2">
            <ColorPicker color={color2} onColorChange={onColorChange2} />
          </div>
        </div>
      </div>
    </div>
  );
}
