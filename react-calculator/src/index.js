import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.sass';
import SimpleCalculator from "./components/SimpleCalculator";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SimpleCalculator />
  </React.StrictMode>
);
