import * as React from 'react'
import ReactDOM from "react-dom/client"
import {Provider} from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import store from './ducks/store';

const app = ReactDOM.createRoot(document.getElementById("app"))
app.render(
  <Provider store={store}>
    <App />
    <ToastContainer
      autoClose={5000}
      theme='dark'
      position='top-center'
    />
  </Provider>
);