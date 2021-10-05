import React from 'react';
import ReactDOM from 'react-dom';
import _service from '@netuno/service-client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import config from './config.json';

import './index.css';

_service.config({
    prefix: config.api.endpoint
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
