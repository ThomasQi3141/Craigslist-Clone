import { useState } from "react";

const Create = () => {
  const [val, setVal] = useState("");
  const handleChange = (event: any) => {
    setVal(event.target.value);
  };
  const submit = () => {};
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
      <input type="file" />
      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default Create;
