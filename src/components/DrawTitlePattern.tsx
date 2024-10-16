type DrawTilePatternProps = {
  color1: string;
  color2: string;
  pattern: string;
};

export default function DrawTilePattern({
  color1,
  color2,
  pattern,
}: DrawTilePatternProps) {
  return (
    <div>
      <div className="w-full aspect-square bg-blue-400 flex items-center justify-center flex-col cursor-pointer">
        <p className="text-xl text-white">c1: {color1}</p>
        <p className="text-xl text-white">c2: {color2}</p>
        <p className="text-xl text-white">pt: {pattern}</p>
      </div>
    </div>
  );
}
