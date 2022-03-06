declare global {
    interface Window {
        chrome: any | undefined,
        opr: any | undefined,
    }
    interface Navigator {
        userAgentData: {
            brands: { brand: string }[],
            mobile: boolean,
            platform: string,
        } | undefined,
    }
}

export enum OsName {
    Android = "Android",
    Ipad = "Ipad",
    Iphone = "Iphone",
    Blackberry = "Blackberry",
    Windows = "Windows",
    Mac = "Mac",
    // generic
    Linux = "Linux",
    Unknown = "Unknown",
}
export enum BrowserName {
    Edge = "Edge",
    Opera = "Opera",
    SamsungInternet = "Samsung Internet",
    Chrome = "Chrome",
    Vivaldi = "Vivaldi",
    Yandex = "Yandex",
    Firefox = "Firefox",
    Safari = "Safari",
    InternetExplorer = "Internet Explorer",
    // generic
    Chromium = "Chromium",
    Unknown = "Unknown",
}

class Utils {
    public static isValueMissing(value: any): boolean {
        return (value === undefined) || (value === null);
    }

    // Add to homescreen
    public static isDesktop(): boolean {
        return (window.navigator.userAgentData?.mobile === false) || window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }
    public static getOsName(): OsName {
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.userAgentData?.platform || window.navigator.platform;
        switch (true) {
            case [userAgent, platform].some(v => /Android/i.test(v)):
                return OsName.Android;
            case [userAgent, platform].some(v => /iPad/i.test(v)):
                return OsName.Ipad;
            case [userAgent, platform].some(v => /iPhone|iPod/i.test(v)):
                return OsName.Iphone;
            case [userAgent, platform].some(v => /BlackBerry/i.test(v)):
                return OsName.Blackberry;
            case [userAgent, platform].some(v => /Win32|Win64|WinCE|Windows/i.test(v)):
                return OsName.Windows;
            case [userAgent, platform].some(v => /Macintosh|MacIntel|MacPPC|Mac68K|Darwin/i.test(v)):
                return OsName.Mac;
            // generic
            case [userAgent, platform].some(v => /Linux/i.test(v)):
                return OsName.Linux;
            default:
                return OsName.Unknown;
        }
    }
    public static getBrowserName(): BrowserName {
        const userAgent = window.navigator.userAgent;
        switch (true) {
            case /Edge|Edg|EdgiOS/i.test(userAgent):
                return BrowserName.Edge;
            case /OPR|Opera/i.test(userAgent) || Boolean(window.opr):
                return BrowserName.Opera;
            case /SamsungBrowser/i.test(userAgent):
                return BrowserName.SamsungInternet;
            case /CriOS/i.test(userAgent): // Chrome iOS
            case /Chrome/i.test(userAgent) && (navigator.userAgentData?.brands ?? []).some(b => b.brand === "Google Chrome"):
                return BrowserName.Chrome;
            case /Vivaldi/i.test(userAgent):
                return BrowserName.Vivaldi;
            case /YaBrowser/i.test(userAgent):
                return BrowserName.Yandex;
            case /Firefox|FxiOS/i.test(userAgent):
                return BrowserName.Firefox;
            case /Safari/i.test(userAgent):
                return BrowserName.Safari;
            case /MSIE|Trident|IEMobile|WPDesktop/i.test(userAgent):
                return BrowserName.InternetExplorer;
            // generic
            case Boolean(window.chrome):
                return BrowserName.Chromium;
            default:
                return BrowserName.Unknown;
        }
    }

    // formatting
    public static format(str: string, values: any[]): string {
        return str.replace(/%(\d+)/g, (match: string, group1: string) => {
            return String(values?.[+group1] ?? "");
        });
    }
    public static print(value: any, depth = 1): string {
        const MAX_DEPTH = 3;
        switch (value?.constructor?.name) {
            case "String":
                return this.format("\"%0\"", [value]);
            case "Number":
            case "Boolean":
            case undefined:
                return String(value);
            case "Array":
                if (depth >= MAX_DEPTH) return "[...]";
                return this.format("[%0]", [value.map((v: any) => this.print(v, depth+1)).join(", ")]);
            case "Set":
                if (depth >= MAX_DEPTH) return "{...}";
                const valuesString = Array.from(value as Set<any>).map(v => this.print(v, depth+1)).join(", ");
                return this.format("{%0}", [valuesString]);
            default:
                if (depth >= MAX_DEPTH || value === window || value === document) return "{...}";
                const keys = [
                    ...Object.entries(Object.getOwnPropertyDescriptors(value)).filter(([k, d]) => d.enumerable).map(([k, d]) => k),
                    ...Object.entries(Object.getOwnPropertyDescriptors(value.constructor?.prototype ?? {})).filter(([k, d]) => d.enumerable).map(([k, d]) => k),
                ].flat();
                const entriesString = keys.map((k) => this.format("%0: %1", [this.print(k, depth+1), this.print(value[k], depth+1)])).join(", ");
                return this.format("{%0}", [entriesString]);
        }
    }
}
export default Utils;
