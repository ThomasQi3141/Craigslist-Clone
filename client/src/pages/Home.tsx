import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { firestoreDB, storage } from "../firebase";
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { v4 } from "uuid";
import Popup from "../components/Popup";
import EditPopup from "../components/EditPopup";

const Home = () => {
  // Navigate through webpages on click
  const navigate = useNavigate();
  // Navigates to create page
  const toCreate = () => {
    navigate("/create");
  };

  const [documents, setDocuments] = useState<any[]>([]);
  const [editDoc, setEditDoc] = useState<any>(null);
  const [currentDocument, setCurrentDocument] = useState<any>(null);
  const [editImage, setEditImage] = useState<File | null>(null);
  // Define a function to fetch documents
  const fetchDocuments = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestoreDB, "Items"));
      const documentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(documentsData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  const updateData = async (dataToUpload: any) => {
    const document = doc(firestoreDB, "Items", editDoc.id);
    try {
      await updateDoc(document, dataToUpload);
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = () => {
    if (editImage === null) {
      // Keep current image
      updateData(editDoc).then(() => {
        fetchDocuments();
        setEditDoc(null);
      });
    } else {
      // Change image
      const currentImageRef = ref(storage, editDoc.imageURL);
      const editImageRef = ref(storage, `images/${editImage.name + v4()}`);
      deleteObject(currentImageRef).then(() => {
        uploadBytes(editImageRef, editImage).then((item) => {
          getDownloadURL(item.ref).then((url) => {
            updateData({ ...editDoc, imageURL: url }).then(() => {
              fetchDocuments();
              setEditDoc(null);
            });
          });
        });
      });
    }
  };

  const handleDelete = () => {
    const imageRef = ref(storage, editDoc.imageURL);
    const documentRef = doc(firestoreDB, "Items", editDoc.id);

    deleteObject(imageRef)
      .then(() => {
        console.log("Image Deleted Successfully");
        // Delete document
        deleteDoc(documentRef).then(() => {
          setEditDoc(null);
          fetchDocuments().then(() => {
            alert("Listing Deleted");
          });
        });
      })
      .catch(() => {
        alert("An error occured");
      });
  };

  const handleImageChange = (event: any) => {
    setEditImage(event.target.files![0]);
  };

  useEffect(() => {
    // Call the fetchDocuments function when the component mounts
    fetchDocuments();
    console.log("Documents Fetched");
  }, []);

  return (
    <div>
      <div className="flex p-5 shadow-lg rounded-lg">
        <div className="font-bold text-4xl">Home</div>
        <div className="flex ml-auto">
          <button
            onClick={toCreate}
            className="border-solid border-gray-600 border rounded p-2 mr-0 ml-auto px-5"
          >
            Create
          </button>
        </div>
      </div>
      {documents.map((document) => {
        return (
          <div>
            <div className="image-div flex">
              <div className="absolute translate-x-80">
                <h2 className="text-2xl ml-auto">{document.name}</h2>
                <p className="mr-5">{document.description}</p>
              </div>
              <a
                onClick={() => {
                  setCurrentDocument(document);
                }}
              >
                <img
                  src={document.imageURL}
                  width="200"
                  className="thumbnail-image rounded-lg"
                />
              </a>
              <div className="ml-auto mr-20 py-1">
                <button
                  className="border-solid border-gray-600 border rounded p-2 px-5 absolute"
                  onClick={() => {
                    setEditDoc(document);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {currentDocument && (
        <Popup
          onClose={() => {
            setCurrentDocument(null);
          }}
        >
          <h3 className="font-bold">{currentDocument.name}</h3>
          <p>{currentDocument.description}</p>
        </Popup>
      )}
      {editDoc && (
        <EditPopup
          onClose={() => {
            setEditDoc(null);
          }}
        >
          <h1 className="font-bold">Edit Listing</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>Name</div>
            <input
              type="text"
              placeholder="Name"
              onChange={(event: any) => {
                setEditDoc({ ...editDoc, name: event.target.value });
              }}
              value={editDoc.name}
              className="schoolNameInput border-solid border-gray-600 border rounded"
            />
            <div>About</div>
            <textarea
              placeholder="Description"
              onChange={(event: any) => {
                setEditDoc({ ...editDoc, description: event.target.value });
              }}
              value={editDoc.description}
              className="descriptionInput border-solid border-gray-600 border rounded"
            />
            <div>Image</div>
            <input type="file" onChange={handleImageChange} className="" />
            <button
              onClick={handleDelete}
              className="border-solid border-gray-600 border rounded p-2 mr-0 ml-auto my-3 bg-red-500"
            >
              Delete Listing
            </button>
            <button
              onClick={handleSubmit}
              className="border-solid border-gray-600 border rounded p-2 mr-0 ml-auto my-3"
            >
              Submit
            </button>
          </div>
        </EditPopup>
      )}
    </div>
  );
};

export default Home;
