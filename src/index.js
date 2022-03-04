import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Utils from './utils';

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

window.deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  alert(`beforeinstallprompt ${Utils.print(event)}`);
  event.preventDefault();
  window.deferredInstallPrompt = event;
  //showInstallPrompt();
});
window.addEventListener("appinstalled", () => {
  alert("appinstalled");
  //hideInstallPrompt();
  window.deferredInstallPrompt = null;
});
