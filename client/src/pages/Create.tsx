import { useState } from "react";

const Create = () => {
  const [val, setVal] = useState("");
  const handleChange = (event: any) => {
    setVal(event.target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="School Name"
        onChange={handleChange}
        value={val}
        className="schoolNameInput"
      />
      <input
        type="text"
        placeholder="Description"
        className="descriptionInput"
      />
      <button>Bruh</button>
    </div>
  );
};

export default Create;
