import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import { firestoreDB } from "../firebase";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";

const Home = () => {
  // Navigate through webpages on click
  const navigate = useNavigate();
  // Navigates to create page
  const toCreate = () => {
    navigate("/create");
  };

  const [documents, setDocuments] = useState<any[]>([]);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
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

    // Call the fetchDocuments function when the component mounts
    fetchDocuments();
  }, []);

  console.log(documents);

  return (
    <div>
      <div className="flex p-5 align-middle shadow-lg rounded-lg">
        <div className="font-bold text-4xl">Home</div>
        <button
          onClick={toCreate}
          className="border-solid border-gray-600 border rounded p-2 mr-0 ml-auto px-5"
        >
          Create
        </button>
      </div>

      {documents.map((document) => {
        return (
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
        );
      })}
    </div>
  );
};

export default Home;
