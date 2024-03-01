import { useNavigate } from "react-router-dom";

const Home = () => {
  //Navigate through webpages on click
  const navigate = useNavigate();
  const toCreate = () => {
    navigate("/create");
  };
  return (
    <div>
      <button onClick={toCreate}>Create</button>
    </div>
  );
};

export default Home;
