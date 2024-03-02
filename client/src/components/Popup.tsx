import "./Popup.css";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const Popup = ({ onClose, children }: Props) => {
  return (
    <div className="popup">
      <div className="popup-inner rounded-lg">
        <button
          onClick={() => {
            onClose();
          }}
          className="close-button"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
