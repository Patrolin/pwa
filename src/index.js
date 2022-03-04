import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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
  console.log("beforeinstallprompt");
  event.preventDefault();
  window.deferredInstallPrompt = event;
  //showInstallPrompt();
});
window.addEventListener("appinstalled", () => {
  console.log("appinstalled");
  //hideInstallPrompt();
  window.deferredInstallPrompt = null;
});
