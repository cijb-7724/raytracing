import DrawTilePattern from "./DrawTitlePattern";

type ModalProps = {
  color1: string;
  color2: string;
  onClose: () => void;
  onPatternChange: (pattern: string) => void;
};

/**
 * 模様選択用のモーダルウィンドウを表示するコンポーネント.
 * モーダル内でユーザーが選択した模様に基づいて `onPatternChange` 関数を呼び出し, 選択内容を親コンポーネントに通知する.
 * モーダル外のクリックでウィンドウを閉じる機能も持っている.
 * 
 * @param color1 - 模様の内側の色
 * @param color2 - 模様の外側の色
 * @param onClose - モーダルを閉じるための関数. モーダル外をクリックすると呼び出される.
 * @param onPatternChange - 模様を変更するための関数. ユーザーが模様を選択した際に呼び出される.
 * 
 * @returns モーダルウィンドウとして表示される JSX 要素.
 */
export default function Modal({ color1, color2, onClose, onPatternChange}: ModalProps) {
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // モーダル外のクリックを検知して閉じる
    if ((event.target as HTMLDivElement).id !== "buttonInModal") {
      onClose();
    }
  };
  const patterns = ["normal", "star", "heart", "circle", "diamond", "clover", "spade", "atcoder1", "atcoder2", "atcoder3", "atcoder4"];
  return (
    <div
      id="modal-overlay"
      className="modal-overlay"
      onClick={handleOutsideClick}
    >
      <div className="">
        <button
          onClick={onClose}
        >
          &times;
        </button>
        <div className="grid grid-cols-3 gap-4">
          {patterns.map((pattern) => (
            <div
              key={pattern}
              onClick={() => {
                onClose();
                onPatternChange(pattern);
              }}
              id="buttonInModal"
            >
              <DrawTilePattern
                color1={color1}
                color2={color2}
                pattern={pattern}
                width={100}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
