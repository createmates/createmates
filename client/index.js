//connect our app to our root folder

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import store from './store'
import {Router} from 'react-router-dom'
import history from './history'
import App from "./App";

import './socket'


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>    
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);