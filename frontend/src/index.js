import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// react-alert
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

//react alert options
var options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
  transition: transitions.SCALE,
  offset:'70px'
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
