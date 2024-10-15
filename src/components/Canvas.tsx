// Canvas.tsx
type CanvasProps = {
  stateCanvas: string;
  setStateCanvas: (mode: string) => void;
};
//一時的に使わないのでコメントアウト
// export default function Canvas({ stateCanvas, setStateCanvas }: CanvasProps) {
export default function Canvas({ stateCanvas}: CanvasProps) {
  return (
    <div className="w-2/5 aspect-square bg-blue-400 flex items-center justify-center flex-col">
    <p className="text-xl text-white">Current Mode: {stateCanvas}</p> {/* 使用例 */}
    </div>
  );
}