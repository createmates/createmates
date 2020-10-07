import React, { useState } from "react";
// import { fetchWeather } from "./api/fetchWeather";
import Form from "./Form";
import "./App.css";

const App = () => {
  // const [query, setQuery] = useState("");
  // const [weather, setWeather] = useState({});

  // const search = async (e) => {
  //   if (e.key === "Enter") {
  //     const data = await fetchWeather(query);
  //     setWeather(data);
  //     setQuery("");
  //   }
  // };

  return (
    <div className="main-container">
      <header>What would you like to make today?</header>
      <Form />
    </div>
  );
};

export default App;
