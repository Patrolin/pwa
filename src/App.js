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
        isSamsung: Utils.isSamsung(),
    }
    const flagsString = Object.entries(flags).filter(([flag, v]) => v).map(([flag, v]) => flag).join(", ");
    const brandsString = (navigator.userAgentData?.brands ?? []).map(b => Utils.format("\"%0\"", [b.brand])).join(", ");
    return (
        <div className="App">
          <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Version 2, {Utils.getBrowserName()} {Utils.format("{%0}", [flagsString])} <br />
                    {Utils.format("window.chrome: %0", [Boolean(window.chrome)])} <br />
                    {Utils.format("window.opr: %0", [Boolean(window.opr)])} <br />
                    {Utils.format("brands: [%0]", [brandsString])} <br />
                    {Utils.format("vendor: \"%0\"", [window.navigator.vendor])} <br />
                    {Utils.format("userAgent: \"%0\"", [window.navigator.userAgent])} <br />
                </p>
                <button onClick={async () => {
                    if (window.deferredInstallPrompt === null) return;
                    alert("button");
                    window.deferredInstallPrompt.prompt();
                    const { outcome } = await window.deferredInstallPrompt.userChoice;
                    alert(`button: ${outcome}`);
                    window.deferredInstallPrompt = null;
                }}>Install</button>
          </header>
        </div>
    );
}

export default App;
