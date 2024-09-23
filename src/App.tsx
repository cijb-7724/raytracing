import { useState } from "react"

export default function App() {
  const [stateCanvas, setStateCanvas] = useState("Dynamic");
  const [menuOpend, setMenuOpend] = useState(false);
  const [titleColor, setTitleColor] = useState(0);
  
  return(
    <>
      <div className="flex w-screen justify-center">
        <h1>{stateCanvas}</h1>
        <h1>{String(menuOpend)}</h1>
        <p className={`${titleColor == 0 ? "text-red-600" : "text-blue-600"} font-bold text-5xl`}>
          Hello Tailwind
        </p>
        <button onClick={() => setMenuOpend(!menuOpend)} className="mx-2">
          O
        </button>
        <button onClick={() => setStateCanvas("Dynamic")} className="mx-2">
          Dynamic
        </button>
        <button onClick={() => setStateCanvas("Static")} className="mx-2">
          Static
        </button>
        {menuOpend && (<div className="h-60 w-60 bg-blue-400 flex items-center justify-center flex-col">
          Hello
          <button onClick={() => setTitleColor(0)} className="my-2">RED</button>
          <button onClick={() => setTitleColor(1)} className="my-2">BLUE</button>
        </div>)}
      </div>
      
    </>
  )
}
