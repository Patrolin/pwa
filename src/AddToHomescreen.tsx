import { useCallback, useEffect, useMemo, useState } from "react";
import Utils, { BeforeInstallEventPrompt } from "./utils";

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
    const [shouldShowAdvert, shouldIncrementPageVisits] = useMemo(() => {
        const currentShouldShowAdvert = getShouldShowAdvert(_data);
        if (currentShouldShowAdvert) {
            return [true, false];
        } else {
            const nextShouldShowAdvert = getShouldShowAdvert({ ..._data, pageVisits: _data.pageVisits + 1 });
            return [nextShouldShowAdvert, true];
        }
    }, [getShouldShowAdvert, _data]);
    const [data, setData] = useState({ ..._data, pageVisits: _data.pageVisits + (shouldIncrementPageVisits ? 1 : 0) });
    useEffect(() => {
        console.log("AddToHomeScreen", data);
        alert(Utils.print(data));
        localStorage.setItem("AddToHomeScreen", JSON.stringify(data));
    }, [data]);
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
            const newNativePrompt = Utils.getNativeInstallPrompt();
            setNativePrompt(newNativePrompt);
            const canShowNativePrompt = !Utils.isValueMissing(newNativePrompt);
            const canShowGuidancePrompt = !Utils.isValueMissing(guidancePrompt);
            const newCanShowPrompt = !Utils.isDesktop() && (canShowNativePrompt || canShowGuidancePrompt);
            setCanShowPrompt(newCanShowPrompt);
        }, 1000);
    })
    const [shouldShowGuidancePrompt, setShouldShowGuidancePrompt] = useState(false);
    // advert
    const advertYesCallback = useCallback(() => {
        if (!Utils.isValueMissing(nativePrompt)) {
            Utils.showNativeInstallPromptIfExists();
        } else {
            setShouldShowGuidancePrompt(true);
        }
        setData({ ...data, dismissCount: data.dismissCount + 1 });
    }, [data, setData, nativePrompt]);
    const advertNoCallback = useCallback(() => {
        setData({ ...data, dismissCount: data.dismissCount + 1 });
    }, [data, setData]);

    return <>
        {((canShowPrompt && shouldShowAdvert) || forceShowAdvert) && getAdvert(advertYesCallback, advertNoCallback)}
        {canShowPrompt && shouldShowGuidancePrompt && guidancePrompt}
    </>;
}
