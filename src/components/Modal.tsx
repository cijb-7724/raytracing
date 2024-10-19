import DrawTilePattern from "./DrawTitlePattern";

type ModalProps = {
  color1: string;
  color2: string;
  onClose: () => void;
  onPatternChange: (pattern: string) => void;
};
  
export default function Modal({ color1, color2, onClose, onPatternChange}: ModalProps) {
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // モーダル外のクリックを検知して閉じる
    if ((event.target as HTMLDivElement).id === "modal-overlay") {
      onClose();
    }
  };
  const width = 100;
  return (
    <div
      id="modal-overlay"
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-60">
        <button
          className="absolute top-2 right-2 text-xl bg-black text-white rounded-full p-2"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl mb-4">Select a Pattern</h2>

        <div className="grid grid-cols-2 gap-4">

          {/* nomal tile pattern */}
          <div onClick={() => {
            onClose();
            onPatternChange("normal");
          }}>
            <DrawTilePattern
              color1={color1}
              color2={color2}
              pattern="nomal"
              width={width}
            />
          </div>
          
          <div onClick={() => {
            onClose();
            onPatternChange("star");
          }}>
            <DrawTilePattern
              color1={color1}
              color2={color2}
              pattern="star"
              width={width}
            />
          </div>
          <div onClick={() => {
            onClose();
            onPatternChange("apple");
          }}>
            <DrawTilePattern
              color1={color1}
              color2={color2}
              pattern="apple"
              width={width}
            />
          </div>
          <div onClick={() => {
            onClose();
            onPatternChange("abcd");
          }}>
            <DrawTilePattern
              color1={color1}
              color2={color2}
              pattern="abcd"
              width={width}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
