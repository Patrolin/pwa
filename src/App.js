import logo from './logo.svg';
import './App.css';
import Utils from './utils';

function App() {
    const flags = {
        isDesktop: Utils.isDesktop(),
        isChromium: Utils.isChromium(),
        isIpad: Utils.isIpad(),
        isIphone: Utils.isIphone(),
        isAndroid: Utils.isAndroid(),
        isSamsung: Utils.isSamsung(),
    }
    const flagsSet = new Set(Object.entries(flags).filter(([flag, v]) => v).map(([flag, v]) => flag));
    return (
        <div className="App">
          <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Version 4, {Utils.getBrowserName()} {Utils.print(flagsSet)} <br />
                    window.chrome: {Utils.print(Boolean(window.chrome))} <br />
                    window.opr: {Utils.print(Boolean(window.opr))} <br />
                    brands: {Utils.print(navigator.userAgentData?.brands ?? [])} <br />
                    vendor: {Utils.print(window.navigator.vendor)} <br />
                    userAgent: {Utils.print(window.navigator.userAgent)} <br />
                </p>
                <button onClick={async () => {
                    alert(`Install prompt: ${window.deferredInstallPrompt}`);
                    if (window.deferredInstallPrompt === null) {
                        return;
                    }
                    window.deferredInstallPrompt.prompt();
                    const { outcome } = await window.deferredInstallPrompt.userChoice;
                    alert(`Install outcome: ${outcome}`);
                    window.deferredInstallPrompt = null;
                }}>Install</button>
          </header>
        </div>
    );
}

export default App;
