import "./EditPopup.css";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const EditPopup = ({ onClose, children }: Props) => {
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

export default EditPopup;
