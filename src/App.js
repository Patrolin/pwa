import logo from './logo.svg';
import './App.css';
import Utils, { BrowserName, OsName } from './utils';
import { AddToHomescreen } from './AddToHomescreen';
import { Button, Dialog, IconButton, Typography } from '@material-ui/core';
import AndroidIcon from '@material-ui/icons/Android';
import CloseIcon from '@material-ui/icons/Close';

const GuidancePrompt = ({ title, onClose, children }) => {
    return <Dialog open={true}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 8px 8px 20px", gap: 8 }}>
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </div>
        <div style={{ padding: "0px 16px 16px 20px" }}>
            {children}
        </div>
    </Dialog>;
}

function App() {
    const VERSION = 18;
    return (
        <div className="App">
          <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    App version: {VERSION}, {Utils.getOsName()} {Utils.getBrowserName()} <br />
                    isDesktop(): {Utils.print(Utils.isDesktop())}, window.chrome: {Utils.print(!!window.chrome)}, window.opr: {Utils.print(!!window.opr)} <br />
                    userAgentData: {Utils.print({
                        platform: window.navigator.userAgentData?.platform,
                        mobile: window.navigator.userAgentData?.mobile,
                        brands: (window.navigator.userAgentData?.brands ?? []).map(b => b.brand),
                    })} <br />
                    navigator: {Utils.print({
                        platform: window.navigator.platform,
                        userAgent: window.navigator.userAgent,
                    })} <br />
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
                        localStorage.removeItem("AddToHomescreen");
                    }}>Reset data</Button>
                </div>
            </header>
            <AddToHomescreen
                defaultData={{ pageVisits: 0, dismissCount: 0, version: VERSION }}
                getShouldShowAdvert={(data) => {
                    if (Utils.isDesktop() || data.dismissCount >= 20) return false;
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
                                    return <GuidancePrompt title="Ios Firefox guidance prompt" onClose={onClose}>
                                        <Typography>TODO</Typography>
                                    </GuidancePrompt>;
                                case BrowserName.Chrome:
                                    return <GuidancePrompt title="Ios Chrome guidance prompt" onClose={onClose}>
                                        <Typography>TODO</Typography>
                                    </GuidancePrompt>;
                                case BrowserName.Safari:
                                    return <GuidancePrompt title="Ios Safari guidance prompt" onClose={onClose}>
                                        <Typography>TODO</Typography>
                                    </GuidancePrompt>;
                                default:
                                    return undefined;
                            }
                        default:
                            switch (browserName) {
                                case BrowserName.Firefox:
                                    return <GuidancePrompt title="Android Firefox guidance prompt" onClose={onClose}>
                                        <Typography>TODO</Typography>
                                    </GuidancePrompt>;
                                case BrowserName.Opera:
                                    return <GuidancePrompt title="Android Opera guidance prompt" onClose={onClose}>
                                        <Typography>TODO</Typography>
                                    </GuidancePrompt>;
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
