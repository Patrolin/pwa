import { useCallback, useEffect, useMemo, useState } from "react";
import Utils from "./utils";

export type BeforeInstallEventPromptOutcome = "accepted"|"dismissed";
export type BeforeInstallEventPrompt = {
    prompt: () => void,
    userChoice: Promise<{ outcome: BeforeInstallEventPromptOutcome }>;
}
declare global {
    interface Window {
        deferredInstallPrompt: BeforeInstallEventPrompt|null|undefined,
    }
    interface Navigator {
        standalone: any,
    }
}

window.deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", (event) => {
  alert(`beforeinstallprompt ${Utils.print(event)}`);
  event.preventDefault();
  // @ts-ignore
  window.deferredInstallPrompt = event;
});
async function showNativeInstallPromptIfExists(): Promise<BeforeInstallEventPromptOutcome|undefined> {
    const nativeInstallPrompt = window.deferredInstallPrompt;
    if (isValueMissing(nativeInstallPrompt)) return;
    nativeInstallPrompt!.prompt();
    const { outcome } = await nativeInstallPrompt!.userChoice;
    window.deferredInstallPrompt = null;
    return outcome;
}

function isValueMissing(value: any): boolean {
    return (value === undefined) || (value === null);
}
function isDesktop(): boolean {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
function isAppInstalled(): boolean {
    // iOS
    if (window.navigator.standalone) return true;
    // Android
    if (window.matchMedia('(display-mode: standalone)').matches) return true;
    return false;
}

type AddToHomescreenData = {
    pageVisits: number,
    dismissCount: number,
    version: number,
}
function useAddToHomeScreenData(
    defaultData: AddToHomescreenData,
    getShouldShowAdvert: (data: AddToHomescreenData) => boolean,
): [AddToHomescreenData, (data: AddToHomescreenData) => void, boolean] {
    const _data = useMemo<AddToHomescreenData>(() => {
        const __data = localStorage.getItem("AddToHomeScreen");
        if (isValueMissing(__data)) return defaultData;
        try {
            const _parsed_data = JSON.parse(__data!);
            if (_parsed_data.version !== defaultData.version) return defaultData;
            return { ...defaultData, ..._parsed_data };
        } catch (error) {
            return defaultData;
        }
    // eslint-disable-next-line
    }, []);
    const shouldIncrementPageVisits = !getShouldShowAdvert(_data);
    const [data, setData] = useState({ ..._data, pageVisits: _data.pageVisits + (shouldIncrementPageVisits ? 1 : 0) });
    const [shouldShowAdvert, setShouldShowAdvert] = useState(false);
    useEffect(() => {
        console.log("AddToHomeScreen", data);
        alert(`AddToHomeScreenData: ${Utils.print(data)}`);
        localStorage.setItem("AddToHomeScreen", JSON.stringify(data));
        setShouldShowAdvert(getShouldShowAdvert(data));
    }, [data, getShouldShowAdvert]);
    return [data, setData, shouldShowAdvert];
}

type Props = {
    defaultData: AddToHomescreenData,
    maxDismissCount?: number,
    getShouldShowAdvert: (data: AddToHomescreenData) => boolean,
    getGuidancePrompt: (closeCallback: () => void) => JSX.Element|undefined|null,
    getAdvert: (yesCallback: () => void, noCallback: () => void) => JSX.Element,
    forceShowAdvert?: boolean,
}
export const AddToHomescreen: React.FC<Props> = ({ defaultData, getShouldShowAdvert, getAdvert, getGuidancePrompt, forceShowAdvert = false }) => {
    const [data, setData, shouldShowAdvert] = useAddToHomeScreenData(defaultData, getShouldShowAdvert);
    // prompts
    const [nativePrompt, setNativePrompt] = useState<BeforeInstallEventPrompt|null|undefined>(undefined);
    const guidancePromptCloseCallback = useCallback(() => {
        setShouldShowGuidancePrompt(false);
    }, []);
    const guidancePrompt = useMemo(() => getGuidancePrompt(guidancePromptCloseCallback), [getGuidancePrompt, guidancePromptCloseCallback]);
    const [canShowPrompt, setCanShowPrompt] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            if (isDesktop() || isAppInstalled()) return;
            const newNativePrompt = window.deferredInstallPrompt;
            setNativePrompt(newNativePrompt);
            const canShowNativePrompt = !isValueMissing(newNativePrompt);
            const canShowGuidancePrompt = !isValueMissing(guidancePrompt);
            setCanShowPrompt(canShowNativePrompt || canShowGuidancePrompt);
        }, 1000);
    });
    const [shouldShowGuidancePrompt, setShouldShowGuidancePrompt] = useState(false);
    // advert
    const advertYesCallback = useCallback(() => {
        const asyncCallback = async () => {
            let outcome: BeforeInstallEventPromptOutcome|undefined = undefined;
            if (!isValueMissing(nativePrompt)) {
                outcome = await showNativeInstallPromptIfExists();
            } else {
                setShouldShowGuidancePrompt(true);
                outcome = "dismissed";
            }
            if (outcome === "accepted") {
                setData({ ...data, dismissCount: data.dismissCount + 1 });
            }
        };
        asyncCallback();
    }, [data, setData, nativePrompt]);
    const advertNoCallback = useCallback(() => {
        setData({ ...data, dismissCount: data.dismissCount + 1 });
    }, [data, setData]);

    return <>
        {((canShowPrompt && shouldShowAdvert) || forceShowAdvert) && getAdvert(advertYesCallback, advertNoCallback)}
        {canShowPrompt && shouldShowGuidancePrompt && guidancePrompt}
    </>;
}
