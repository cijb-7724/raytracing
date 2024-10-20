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

/**
 * 運動する球体を模様・色でレンダリングするキャンバスコンポーネント.
 * 
 * @param stateCanvas - 球体の運動の規則.
 * @param patterns - 天井や床に適用される模様.
 * @param colors - 天井や床に適用される色.
 * @returns キャンバスを表すJSX要素.
 */
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
