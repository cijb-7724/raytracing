import { useState } from "react";
import Menu from "./components/Menu";
import Canvas from "./components/Canvas";

type PatternMode = "Floor1" | "Floor2" | "Ceil1" | "Ceil2";

export default function App() {
  const [stateCanvas, setStateCanvas] = useState("Static");
  const [menuOpend, setMenuOpend] = useState(false);
  const [titleColor, setTitleColor] = useState(0);
  
  const [patternAndColorMode, setPatternAndColorMode] = useState<PatternMode>("Floor1");
  const [colors, setColors] = useState({
    Floor1: { color1: "#ff0000", color2: "#00ff00" },
    Floor2: { color1: "#0000ff", color2: "#ffff00" },
    Ceil1: { color1: "#ff00ff", color2: "#00ffff" },
    Ceil2: { color1: "#ffffff", color2: "#000000" },
  });
  // カラーピッカーの色が変更されたときに状態を更新する関数
  const handleColorChange = (key: string, color: string) => {
    setColors((prevColors) => ({
      ...prevColors,
      [patternAndColorMode]: {
        ...prevColors[patternAndColorMode],
        [key]: color,
      },
    }));
  };

  const [patterns, setPatterns] = useState({
    Floor1: { pattern: "star" },
    Floor2: { pattern: "star" },
    Ceil1: { pattern: "normal"},
    Ceil2: { pattern: "normal"},
  });
  // patternが変更されたときに状態を更新する関数
  const handlePatternChange = (key: string, pattern: string) => {
    setPatterns((prevPattern) => ({
      ...prevPattern,
      [patternAndColorMode]: {
        ...prevPattern[patternAndColorMode],
        [key]: pattern,
      },
    }));
  };

  return (
    <div className="flex w-screen flex-col items-center">
      <p className={`${titleColor === 0 ? "text-red-600" : "text-blue-600"} font-bold text-5xl bg-yellow-100`}>
        Study RayTracing
      </p>
      <div className="flex w-full bg-pink-100">
        <Canvas
          stateCanvas={stateCanvas}
          patterns={patterns}
          colors={colors}
        />

        <div className="flex flex-col">
        <div>
          <button onClick={() => setStateCanvas("Static")} className="mx-2">Static</button>
          <button onClick={() => setStateCanvas("Linear")} className="mx-2">Linear</button>
          <button onClick={() => setStateCanvas("Gravity")} className="mx-2">Gravity</button>
        </div>
          <button onClick={() => setMenuOpend(!menuOpend)} className="mx-2">
            setting
          </button>

          {menuOpend && (
            <Menu
              patternAndColorMode={patternAndColorMode}
              setPatternAndColorMode={setPatternAndColorMode}
              color1={colors[patternAndColorMode].color1}
              onColorChange1={(color) => handleColorChange("color1", color)}
              color2={colors[patternAndColorMode].color2}
              onColorChange2={(color) => handleColorChange("color2", color)}
              pattern={patterns[patternAndColorMode].pattern}
              onPatternChange={(pattern) => handlePatternChange("pattern", pattern)}
            />
          )}
        </div>
      </div>

      <h1>mode is {stateCanvas}</h1>
      <h1>{String(menuOpend)}</h1>

      <div className="h-40 w-40 bg-blue-400 flex items-center justify-center flex-col">
        Hello
        <button onClick={() => setTitleColor(0)} className="my-2">RED</button>
        <button onClick={() => setTitleColor(1)} className="my-2">BLUE</button>
      </div>

    </div>
  );
}
