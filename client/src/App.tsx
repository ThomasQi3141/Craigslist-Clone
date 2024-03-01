import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  //Navigate through webpages on click
  const navigate = useNavigate();
  const toCreate = () => {
    navigate("/create");
  };

  return (
    <>
      <button
        onClick={() => {
          toCreate();
        }}
      >
        Create
      </button>
    </>
  );
}

export default App;
