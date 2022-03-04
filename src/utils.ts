declare global {
    interface Window {
        chrome: any | undefined,
        opr: any | undefined,
    }
    interface Navigator {
        userAgentData: { brands: { brand: string }[] } | undefined,
    }
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
    Unknown = "Unknown",
}

class Utils {
    public static isDesktop(): Boolean {
        return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }
    public static isChromium(): Boolean {
        return Boolean(window.chrome || (navigator.userAgentData?.brands ?? []).some(b => b.brand === "Google Chrome"));
    }
    public static isIpad(): Boolean {
        return Boolean(/iPad/i.test(window.navigator.userAgent));
    }
    public static isIphone(): Boolean {
        return Boolean(/iPhone|iPod/i.test(window.navigator.userAgent));
    }
    public static isAndroid(): Boolean {
        return Boolean(/Android/i.test(window.navigator.userAgent));
    }
    public static isSamsung(): Boolean {
        return Boolean(/SAMSUNG|Samsung|SGH-[I|N|T]|GT-[I|N]|SM-[A|N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i.test(window.navigator.userAgent));
    }
    public static getBrowserName(): BrowserName {
        const userAgent = window.navigator.userAgent;
        const vendor = window.navigator.vendor;
        switch (true) {
            case /Edge|Edg|EdgiOS/i.test(userAgent):
                return BrowserName.Edge;
            case /OPR|Opera/i.test(userAgent) && Boolean(window.opr):
                return BrowserName.Opera;
            case /SamsungBrowser/i.test(userAgent):
                return BrowserName.SamsungInternet;
            case /CriOS/i.test(userAgent):
            case /Chrome/i.test(userAgent) && vendor === "Google Inc." && this.isChromium():
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
            default:
                return BrowserName.Unknown;
        }
    }
    public static format(str: string, values: any[]): string {
        return str.replace(/%(\d+)/g, (match: string, group1: string) => {
            return String(values?.[+group1] ?? "");
        });
    }
    public static print(value: any, depth = 1): string {
        if (depth >= 3) return "";
        switch (value?.constructor?.name) {
            case "String":
                return this.format("\"%0\"", [value]);
            case "Number":
            case "Boolean":
            case undefined:
                return String(value);
            case "Array":
                return this.format("[%0]", [value.map((v: any) => this.print(v, depth+1)).join(", ")]);
            case "Set":
                const valuesString = Array.from(value as Set<any>).map(v => this.print(v, depth+1)).join(", ");
                return this.format("{%0}", [valuesString]);
            default:
                if (value === window || value === document) return "";
                const entriesString = Object.keys(value).map((k) => this.format("%0: %1", [this.print(k, depth+1), this.print(value[k], depth+1)])).join(", ")
                return this.format("{%0}", [entriesString]);
        }
    }
}
export default Utils;
