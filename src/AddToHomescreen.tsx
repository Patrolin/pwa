import { useCallback, useEffect, useMemo, useState } from "react";
import Utils, { BeforeInstallEventPrompt, BeforeInstallEventPromptOutcome } from "./utils";

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
        if (Utils.isValueMissing(__data)) return defaultData;
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
            if (Utils.isDesktop() || Utils.isAppInstalled()) return;
            const newNativePrompt = Utils.getNativeInstallPrompt();
            setNativePrompt(newNativePrompt);
            const canShowNativePrompt = !Utils.isValueMissing(newNativePrompt);
            const canShowGuidancePrompt = !Utils.isValueMissing(guidancePrompt);
            setCanShowPrompt(canShowNativePrompt || canShowGuidancePrompt);
        }, 1000);
    });
    const [shouldShowGuidancePrompt, setShouldShowGuidancePrompt] = useState(false);
    // advert
    const advertYesCallback = useCallback(() => {
        const asyncCallback = async () => {
            let outcome: BeforeInstallEventPromptOutcome|undefined = undefined;
            if (!Utils.isValueMissing(nativePrompt)) {
                outcome = await Utils.showNativeInstallPromptIfExists();
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
