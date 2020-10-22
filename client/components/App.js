import React from "react";
import "../App.css";
import Routes from "../routes";
import Navbar from "./navbar";
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";





const App = () => {


  // toast.error("Oh No Error");
  // toast.success("Success!")
  // toast.info("Here's some info for you")
  // toast.warn("You have been warned")

    return (
      <div>
      <ToastContainer
        draggable={false}
        transition={Zoom}
      />
        <Navbar />
        <Routes />
      </div>
    );
}

export default App;


