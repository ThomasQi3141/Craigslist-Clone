import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const Home = () => {
  //Navigate through webpages on click
  const navigate = useNavigate();
  const toCreate = () => {
    navigate("/create");
  };

  const imageListRef = ref(storage, "images/");

  const [nameList, setNameList] = useState([]);
  const [descriptionList, setDescriptionList] = useState([]);
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList([...imageList, url]);
        });
      });
    });
  }, []);

  return (
    <div>
      <button
        onClick={toCreate}
        className="border-solid border-gray-600 border rounded p-2 mr-0 ml-auto"
      >
        Create
      </button>
      {imageList.map((url) => {
        return <img src={url} />;
      })}
    </div>
  );
};

export default Home;
