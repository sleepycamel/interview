import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import CalculatorApp from "./components/CalculatorApp";

ReactDOM.render(
  <React.StrictMode>
    <CalculatorApp />
  </React.StrictMode>,
  document.getElementById('root')
);
