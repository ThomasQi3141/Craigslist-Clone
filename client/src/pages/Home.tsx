import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { firestoreDB } from "../firebase";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import Popup from "../components/Popup";

const Home = () => {
  // Navigate through webpages on click
  const navigate = useNavigate();
  // Navigates to create page
  const toCreate = () => {
    navigate("/create");
  };

  const edit = () => {};

  const [documents, setDocuments] = useState<any[]>([]);
  // const [trigger, setTrigger] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<any>(null);
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

  useEffect(() => {
    // Call the fetchDocuments function when the component mounts
    fetchDocuments();
    console.log("Fetched");
  }, []);

  return (
    <div>
      <div className="flex p-5 shadow-lg rounded-lg">
        <div className="font-bold text-4xl">Home</div>
        <div className="flex ml-auto">
          <button
            className="border-solid border-gray-600 border rounded p-2 mr-5 ml-auto px-5"
            onClick={edit}
          >
            Edit
          </button>
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
            <a
              onClick={() => {
                setCurrentDocument(document);
              }}
            >
              <div className="image-div flex">
                <div className="absolute translate-x-80">
                  <h2 className="text-2xl ml-auto">{document.name}</h2>
                  <p className="mr-5">{document.description}</p>
                </div>
                <img
                  src={document.imageURL}
                  width="200"
                  className="thumbnail-image rounded-lg"
                />
              </div>
            </a>
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
    </div>
  );
};

export default Home;
