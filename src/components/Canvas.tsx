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
    <div className="w-2/5 aspect-square bg-blue-400 flex items-center justify-center flex-col">
      <div className="text-xl text-white">
        <p>Current Mode: {stateCanvas}</p>

        {/* patternsの内容を全て表示 */}
        <div className="mt-4">
          <h2 className="text-lg">Patterns:</h2>
          <ul>
            {Object.entries(patterns).map(([key, value]) => (
              <li key={key}>
                {key}: {value.pattern}
              </li>
            ))}
          </ul>
        </div>

        {/* colorsの内容を全て表示 */}
        <div className="mt-4">
          <h2 className="text-lg">Colors:</h2>
          <ul>
            {Object.entries(colors).map(([key, value]) => (
              <li key={key}>
                {key}: color1 = {value.color1}, color2 = {value.color2}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
