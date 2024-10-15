// App.tsx
import { useState } from "react";
import Menu from "./components/Menu";
import Canvas from "./components/Canvas";
// import ColorPicker from "./ColorPicker";

type PatternMode = "Floor1" | "Floor2" | "Ceil1" | "Ceil2";

export default function App() {
  const [stateCanvas, setStateCanvas] = useState("Static");
  const [menuOpend, setMenuOpend] = useState(false);
  const [titleColor, setTitleColor] = useState(0);

  
  // const [patternAndColorMode, setPatternAndColorMode] = useState("Floor1");
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

  return (
    <div className="flex w-screen flex-col items-center">
      <p className={`${titleColor === 0 ? "text-red-600" : "text-blue-600"} font-bold text-5xl bg-yellow-100`}>
        Study RayTracing
      </p>
      <div className="flex w-full bg-pink-100">
        <Canvas stateCanvas={stateCanvas} setStateCanvas={setStateCanvas} />

        <div className="flex flex-col">
        <div>
          <button onClick={() => setStateCanvas("Static")} className="mx-2">Static</button>
          <button onClick={() => setStateCanvas("Dynamic")} className="mx-2">Dynamic</button>
          <button onClick={() => setStateCanvas("Polyhedron")} className="mx-2">Polyhedron</button>
        </div>
          <button onClick={() => setMenuOpend(!menuOpend)} className="mx-2">
            setting
          </button>

          {menuOpend && (
            <div>
              {/* <Menu
                patternAndColorMode={patternAndColorMode}
                setPatternAndColorMode={setPatternAndColorMode}
                color1={color}
                onColorChange={handleColorChange}
              /> */}
              <Menu
                patternAndColorMode={patternAndColorMode}
                setPatternAndColorMode={setPatternAndColorMode}
                color1={colors[patternAndColorMode].color1}
                onColorChange1={(color) => handleColorChange("color1", color)}
                color2={colors[patternAndColorMode].color2}
                onColorChange2={(color) => handleColorChange("color2", color)}
              />
            </div>
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