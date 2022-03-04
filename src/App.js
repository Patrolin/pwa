import logo from './logo.svg';
import './App.css';
import Utils from './utils';

function App() {
    const flags = window.flags = {
        isDesktop: Utils.isDesktop(),
        isChromium: Utils.isChromium(),
        isIpad: Utils.isIpad(),
        isIphone: Utils.isIphone(),
        isAndroid: Utils.isAndroid(),
    }
    const flagsString = Object.entries(flags).filter(([flag, v]) => v).map(([flag, v]) => flag).join(", ");
    const brandsString = (navigator.userAgentData?.brands ?? []).map(b => Utils.format("\"%0\"", [b.brand])).join(", ");
    return (
        <div className="App">
          <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Version 1, {String(!!(window.chrome))} {Utils.format("[%0]", [brandsString])} <br />
                    {Utils.getBrowserName()} {Utils.format("{%0}", [flagsString])}
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
