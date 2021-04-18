import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'jquery/dist/jquery.min.js';//jquert for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";//bootstrap css
import "bootstrap/dist/js/bootstrap.min.js";//bootstrap js

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);