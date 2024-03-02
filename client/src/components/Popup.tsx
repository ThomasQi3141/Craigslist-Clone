import "./Popup.css";

const Popup = (props: any) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner rounded-lg">
        <button
          onClick={() => {
            props.setTrigger(false);
          }}
          className="close-button"
        >
          X
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
