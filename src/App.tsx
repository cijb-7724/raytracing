import { useState } from "react";
import Menu from "./components/Menu";
import Canvas from "./components/Canvas";
import { IoSettingsSharp } from 'react-icons/io5';  // Ioniconsから設定のアイコンをインポート



type PatternMode = "Floor1" | "Floor2" | "Ceil1" | "Ceil2";

export default function App() {
  const [stateCanvas, setStateCanvas] = useState("Static");
  const [menuOpend, setMenuOpend] = useState(false);
  
  const [patternAndColorMode, setPatternAndColorMode] = useState<PatternMode>("Floor1");
  const [colors, setColors] = useState({
    Floor1: { color1: "#ffffff", color2: "#ff0000" },
    Floor2: { color1: "#00C0C0", color2: "#D4B389" },
    Ceil1: { color1: "#B8C671", color2: "#F7F06D" },
    Ceil2: { color1: "#ACA9ED", color2: "#ffffff" },
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
    Floor1: { pattern: "normal" },
    Floor2: { pattern: "atcoder2" },
    Ceil1: { pattern: "star"},
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


  const IconComponent = () => {
    return (
      <div className="icon__settings">
        <IoSettingsSharp />
      </div>
    );
  };

  return (
    <div>
      <div className="container_title">
        <div className="components_title">
          <p>RayTracing</p>
        </div>
        
      </div>

      <div className="container">
        <div className="components">
          <div>
            <Canvas
              stateCanvas={stateCanvas}
              patterns={patterns}
              colors={colors}
            />
          </div>
          
          <div className="menu">
            <div className="segmented-control">

              <input type="radio" name="radio2" value="Static" id="tab-1" checked={stateCanvas === 'Static'} onChange={() => setStateCanvas('Static')} />
              <label htmlFor="tab-1" className= "segmented-control__1">
                <p>Static</p></label>
              
              <input type="radio" name="radio2" value="Linear" id="tab-2" checked={stateCanvas === 'Linear'} onChange={() => setStateCanvas('Linear')} />
              <label htmlFor="tab-2" className= "segmented-control__2">
                <p>Linear</p></label>
              
              <input type="radio" name="radio2" value="Gravity" id="tab-3" checked={stateCanvas === 'Gravity'} onChange={() => setStateCanvas('Gravity')} />
              <label htmlFor="tab-3" className= "segmented-control__3">
                <p>Gravity</p></label>
              
              <div className="segmented-control__color"></div>
            </div>
            
            <div className="icon">
              <div className={`icon__settings ${menuOpend ? 'icon__settings--open' : ''}`} onClick={() => setMenuOpend(!menuOpend)}>
                <IconComponent />
              </div>
            </div>

            
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
        
      </div>
    </div>
  );
}
