import * as React from 'react'
import ReactDOM from "react-dom/client"
import {Provider} from 'react-redux'

import App from './App';
import store from './ducks/store';

import "./reset.css"
// import './custom.css'
import "./index.css"

const app = ReactDOM.createRoot(document.getElementById("app"))
app.render(
  <Provider store={store}>
    <App />
  </Provider>
);