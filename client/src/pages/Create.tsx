import { useState } from "react";
import { storage, firestoreDB } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
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

    // add image url to JSON
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((item) => {
      getDownloadURL(item.ref).then((url) => {
        uploadData(url);
      });
    });

    const uploadData = async (url: string) => {
      const dataToUpload = {
        name: name,
        description: description,
        imageURL: url,
      };
      try {
        const document = doc(firestoreDB, "Items", v4());
        let dataUpdated = await setDoc(document, dataToUpload);
        console.log("success");
      } catch (error) {
        console.log(error);
      }
    };

    alert("Submission Successful");
    navigate("/");
  };

  return (
    <>
      <div className="p-5">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="border-solid border-gray-600 border rounded p-2 mr-0 ml-auto "
        >
          Back
        </button>
      </div>
      <div className="flex justify-center">
        <div>
          <h1 className="text-2xl text-blue-900 my-10 font-bold">
            Create a listing
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div>Name</div>
            <input
              type="text"
              placeholder="Name"
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
            <input type="file" onChange={handleImageChange} className="" />
          </div>
          <div className="flex items-end">
            <button
              onClick={submit}
              className="border-solid border-gray-600 border rounded p-2 mr-0 ml-auto my-3"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
