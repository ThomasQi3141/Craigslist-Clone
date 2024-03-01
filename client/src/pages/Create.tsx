import { useState } from "react";
import { storage } from "../firebase";

const Create = () => {
  const [val, setVal] = useState("");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const handleChange = (event: any) => {
    setVal(event.target.value);
  };
  const submit = () => {
    if (imageUpload == null) {
      //Didn't select images
      return;
    }
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
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files![0]);
        }}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default Create;
