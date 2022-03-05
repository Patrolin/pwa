export type BeforeInstallEventPrompt = {
    prompt: () => void,
    userChoice: Promise<{ outcome: string }>;
}

declare global {
    interface Window {
        chrome: any | undefined,
        opr: any | undefined,
        deferredInstallPrompt: BeforeInstallEventPrompt|null|undefined;
    }
    interface Navigator {
        userAgentData: { brands: { brand: string }[] } | undefined,
    }
}

window.deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  alert(`beforeinstallprompt ${Utils.print(event)}`);
  event.preventDefault();
  // @ts-ignore
  window.deferredInstallPrompt = event;
});
window.addEventListener("appinstalled", () => {
  alert("appinstalled");
  window.deferredInstallPrompt = null;
});

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
    public static isValueMissing(value: any): boolean {
        return (value === undefined) || (value === null);
    }

    // Add to homescreen
    public static getNativeInstallPrompt() {
        return window.deferredInstallPrompt;
    }
    public static async showNativeInstallPromptIfExists(verbose: boolean = false) {
        const nativeInstallPrompt = this.getNativeInstallPrompt();
        alert(`Install prompt: ${Utils.print(nativeInstallPrompt)}`);
        if (this.isValueMissing(nativeInstallPrompt)) return;
        nativeInstallPrompt!.prompt();
        const { outcome } = await nativeInstallPrompt!.userChoice;
        if (verbose) alert(`Install outcome: ${Utils.print(outcome)}`);
        window.deferredInstallPrompt = null;
    }

    public static isDesktop(): boolean {
        return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }
    public static isChromium(): boolean {
        return Boolean(window.chrome || (navigator.userAgentData?.brands ?? []).some(b => b.brand === "Google Chrome"));
    }
    public static isIos(): boolean {
        return Boolean(/iPad|iPhone|iPod/i.test(window.navigator.userAgent));
    }
    public static isIpad(): boolean {
        return Boolean(/iPad/i.test(window.navigator.userAgent));
    }
    public static isIphone(): boolean {
        return Boolean(/iPhone|iPod/i.test(window.navigator.userAgent));
    }
    public static isAndroid(): boolean {
        return Boolean(/Android/i.test(window.navigator.userAgent));
    }
    public static isSamsung(): boolean {
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

    // formatting
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
            case "boolean":
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
