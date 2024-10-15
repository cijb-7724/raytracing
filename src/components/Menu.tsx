// components/Menu.tsx
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

export default function Menu({
  //一時的に使わないのでコメントアウト
  // patternAndColorMode,
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
        {/* <Canvas stateCanvas={stateCanvas} setStateCanvas={setStateCanvas} /> */}
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