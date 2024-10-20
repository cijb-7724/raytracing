import DrawSphere from "./DrawSphere";

// 型定義
type Pattern = {
  pattern: string;
};

type Patterns = {
  Floor1: Pattern;
  Floor2: Pattern;
  Ceil1: Pattern;
  Ceil2: Pattern;
};

type ColorPair = {
  color1: string;
  color2: string;
};

type Colors = {
  Floor1: ColorPair;
  Floor2: ColorPair;
  Ceil1: ColorPair;
  Ceil2: ColorPair;
};

type CanvasProps = {
  stateCanvas: string;
  patterns: Patterns;
  colors: Colors;
};

export default function Canvas({ stateCanvas, patterns, colors }: CanvasProps) {
  return (
    <div className="w-2/5 aspect-square bg-blue-100 flex items-center justify-center flex-col">
      <DrawSphere
          patterns={patterns}
          colors={colors}
          motion={stateCanvas}
        />
    </div>
  );
}
