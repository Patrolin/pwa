import logo from './logo.svg';
import './App.css';
import Utils from './utils';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Version 1, browser: {Utils.getBrowserName()}, isChromium: {String(Utils.isChromium())}, isDesktop: {String(Utils.isDesktop())}
        </p>
        <button onClick={async () => {
          if (window.deferredInstallPrompt === null) return;
          console.log("button");
          window.deferredInstallPrompt.prompt();
          const { outcome } = await window.deferredInstallPrompt.userChoice;
          console.log(`button: ${outcome}`);
          window.deferredInstallPrompt = null;
        }}>Install</button>
      </header>
    </div>
  );
}

export default App;
