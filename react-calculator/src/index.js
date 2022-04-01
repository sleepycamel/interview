import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import SimpleCalculator from "./components/SimpleCalculator";

ReactDOM.render(
  <React.StrictMode>
    <SimpleCalculator />
  </React.StrictMode>,
  document.getElementById('root')
);
