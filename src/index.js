//connect our app to our root folder
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import store from './store'
import App from "./App";
import {Router} from 'react-router-dom'
import history from './history'

//so both broadcaster and watcher can not be on at the same time :(
//i am thinking that this is only really one person prodcasting out to others.

import './socket'
import './broadcaster'
// import './watcher'

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>    
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);
