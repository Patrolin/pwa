import logo from './logo.svg';
import './App.css';
import Utils, { BrowserName, OsName } from './utils';
import { AddToHomescreen } from './AddToHomescreen';
import { Button, Dialog, IconButton } from '@material-ui/core';
import AndroidIcon from '@material-ui/icons/Android';
import CloseIcon from '@material-ui/icons/Close';

function App() {
    const flags = {
        isDesktop: Utils.isDesktop(),
    }
    const flagsSet = new Set(Object.entries(flags).filter(([flag, v]) => v).map(([flag, v]) => flag));
    const VERSION = 15;
    return (
        <div className="App">
          <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    App version: {VERSION} <br />
                    {Utils.getOsName()} {Utils.getBrowserName()} {Utils.print(flagsSet)} <br />
                    userAgentData.platform: {Utils.print(window.navigator.userAgentData?.platform)} <br />
                    platform: {Utils.print(window.navigator.platform)} <br />
                    window.chrome: {Utils.print(!!window.chrome)} <br />
                    window.opr: {Utils.print(!!window.opr)} <br />
                    brands: {Utils.print((navigator.userAgentData?.brands ?? []).map(b => b.brand))} <br />
                    userAgent: {Utils.print(window.navigator.userAgent)} <br />
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                    <Button variant="contained" color="primary" onClick={async () => {
                        const nativeInstallPrompt = window.deferredInstallPrompt;
                        alert(`Install prompt: ${Utils.print(nativeInstallPrompt)}`);
                        if (this.isValueMissing(nativeInstallPrompt)) return;
                        nativeInstallPrompt.prompt();
                        const { outcome } = await nativeInstallPrompt.userChoice;
                        alert(`Install outcome: ${Utils.print(outcome)}`);
                        window.deferredInstallPrompt = null;
                    }}>Native install</Button>
                    <Button variant="contained" color="primary" onClick={() => {
                        // eslint-disable-next-line
                        window.location.href = window.location.href;
                    }}>Reload page</Button>
                    <Button variant="contained" color="primary" onClick={() => {
                        localStorage.removeItem("AddToHomeScreen");
                    }}>Reset data</Button>
                </div>
            </header>
            <AddToHomescreen
                defaultData={{ pageVisits: 0, dismissCount: 0, version: VERSION }}
                getShouldShowAdvert={(data) => {
                    if (data.dismissCount >= 20) return false;
                    return data.pageVisits >= (3**(data.dismissCount + 1));
                }}
                getAdvert={(onYes, onNo) => {
                    return <div style={{ boxSizing: "border-box", position: "fixed", bottom: 0, width: "100%", display: "flex", justifyContent: "space-between", padding: "8px 4px 8px 20px", background: "#fff" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <AndroidIcon />
                            <Button color="primary" onClick={onYes}>Přidat aplikaci pwa na plochu</Button>
                        </div>
                        <IconButton onClick={onNo}><CloseIcon /></IconButton>
                    </div>;
                }}
                getGuidancePrompt={(onClose) => {
                    const osName = Utils.getOsName();
                    const browserName = Utils.getBrowserName();
                    switch (osName) {
                        case OsName.Ipad:
                        case OsName.Iphone:
                            switch (browserName) {
                                case BrowserName.Firefox:
                                    return <Dialog open={true}>
                                        {/* TODO: add ios firefox guidance image */}
                                        Ios Firefox guidance prompt
                                        <IconButton onClick={onClose}><CloseIcon /></IconButton>
                                    </Dialog>;
                                case BrowserName.Chrome:
                                    return <Dialog open={true}>
                                        {/* TODO: add ios chrome guidance image */}
                                        Ios Chrome guidance prompt
                                        <IconButton onClick={onClose}><CloseIcon /></IconButton>
                                    </Dialog>;
                                case BrowserName.Safari:
                                    return <Dialog open={true}>
                                        {/* TODO: add ios safari guidance image */}
                                        Ios Safari guidance prompt
                                        <IconButton onClick={onClose}><CloseIcon /></IconButton>
                                    </Dialog>;
                                default:
                                    return undefined;
                            }
                        default:
                            switch (browserName) {
                                case BrowserName.Firefox:
                                    return <Dialog open={true}>
                                        {/* TODO: add android firefox guidance image */}
                                        Android Firefox guidance prompt
                                        <IconButton onClick={onClose}><CloseIcon /></IconButton>
                                    </Dialog>;
                                case BrowserName.Opera:
                                    return <Dialog open={true}>
                                        {/* TODO: add android opera guidance image */}
                                        Android Opera guidance prompt
                                        <IconButton onClick={onClose}><CloseIcon /></IconButton>
                                    </Dialog>;
                                default:
                                    return undefined;
                            }
                    }
                }}
            />
        </div>
    );
}

export default App;
