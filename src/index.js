import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <div>
    <App foodStartTime='40' foodUndercookedTime='10' foodName='Fish'/>
    <App foodStartTime='60' foodUndercookedTime='10' foodName='Meat'/>
    <App foodStartTime='90' foodUndercookedTime='10' foodName='Trophy Fish'/>
    <App foodStartTime='120' foodUndercookedTime='20' foodName='Beast Meat'/>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
