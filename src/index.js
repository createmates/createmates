//connect our app to our root folder

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";


//so both broadcaster and watcher can not be on at the same time :(
//i am thinking that this is only really one person prodcasting out to others.

import './socket'
import './broadcaster'
// import './watcher'

ReactDOM.render(<App />, document.getElementById("root"));
