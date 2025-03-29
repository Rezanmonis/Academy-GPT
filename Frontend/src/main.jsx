import React from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom/client" in React 18
import { Provider } from "react-redux";
import { store } from "./app/store"; // Import your Redux store
import "./index.css";
import App from "./App";
import "./i18n";
import { ToastContainer } from 'react-toastify';

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); // Create the root

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
        <ToastContainer />

    </Provider>
  </React.StrictMode>
);
