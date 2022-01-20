import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { WsProvider } from "./app/contexts/WsContext";

ReactDOM.render(
  <Provider store={store}>
    <WsProvider>
      <App />
    </WsProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
