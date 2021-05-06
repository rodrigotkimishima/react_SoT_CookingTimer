import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <div>
    <App foodTime='40' foodName='Fish'/>
    <App foodTime='60' foodName='Meat'/>
    <App foodTime='90' foodName='Trophy Fish'/>
    <App foodTime='120' foodName='Beast Meat'/>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
