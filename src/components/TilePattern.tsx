// Canvas.tsx
type TilePatternProps = {
  color1: string;
  color2: string;
  pattern: string;
  onPatternChange: (pattern: string) => void;
};
    
export default function TilePattern({
  color1,
  color2,
  pattern,
  onPatternChange,
}: TilePatternProps) {
  return (
    <div className="w-full aspect-square bg-blue-400 flex items-center justify-center flex-col">
      <p className="text-xl text-white">c1: {color1}</p>
      <p className="text-xl text-white">c2: {color2}</p>
      <p className="text-xl text-white">pt: {pattern}</p>
    </div>
  );
}