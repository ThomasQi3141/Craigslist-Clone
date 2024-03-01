import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event: any) => {
    setImageUpload(event.target.files![0]);
  };

  const submit = () => {
    if (name === "") {
      alert("Missing Name");
      return;
    }
    if (description === "") {
      alert("Missing Description");
      return;
    }
    if (imageUpload === null) {
      // No image selected
      alert("No Image Selected");
      return;
    }

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload);
    const nameRef = ref(storage, `names/${name + v4()}`);
    uploadString(nameRef, name);
    const descriptionRef = ref(storage, `descriptions/${description + v4()}`);
    uploadString(descriptionRef, description);
    alert("Submission Successful");
    navigate("/");
  };
  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-xl">Create a listing</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>Name</div>
          <input
            type="text"
            placeholder="School Name"
            onChange={handleNameChange}
            value={name}
            className="schoolNameInput border-solid border-gray-600 border rounded"
          />
          <div>About</div>
          <textarea
            placeholder="Description"
            onChange={handleDescriptionChange}
            value={description}
            className="descriptionInput border-solid border-gray-600 border rounded"
          />
          <div>Image</div>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div className="flex items-end">
          <button
            onClick={submit}
            className="border-solid border-gray-600 border rounded p-2 mr-0 ml-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
