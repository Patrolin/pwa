declare global {
    interface Window {
        chrome: any | undefined,
        opr: any | undefined,
    }
    interface Navigator {
        userAgentData: { brands: { brand: string }[] } | undefined,
    }
}

class Utils {
    public static isDesktop(): Boolean {
        return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }
    public static isChromium(): Boolean {
        return Boolean(window.chrome || navigator.userAgentData?.brands?.some(b => b.brand === "Google Chrome"));
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
    public static getBrowserName() {
        const userAgent = window.navigator.userAgent;
        const vendor = window.navigator.vendor;
        switch (true) {
            case /Edge|Edg|EdgiOS/i.test(userAgent):
                return "Edge";
            case /OPR|Opera/i.test(userAgent) && Boolean(window.opr):
                return "Opera";
            case /CriOS/i.test(userAgent):
            case /Chrome/i.test(userAgent) && vendor === "Google Inc." && this.isChromium():
                return "Chrome";
            case /Vivaldi/i.test(userAgent):
                return "Vivaldi";
            case /YaBrowser/i.test(userAgent):
                return "Yandex";
            case /Firefox|FxiOS/i.test(userAgent):
                return "Firefox";
            case /Safari/i.test(userAgent):
                return "Safari";
            case /MSIE|Trident|IEMobile|WPDesktop/i.test(userAgent):
                return "Internet Explorer";
            case /SAMSUNG|Samsung|SGH-[I|N|T]|GT-[I|N]|SM-[A|N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i.test(userAgent):
                return "Samsung Internet";
            default:
                return "Unknown";
        }
    }
    public static format(str: string, values: any[]): string {
        return str.replace(/%(\d+)/g, (match: string, group1: string) => {
            return String(values?.[+group1] ?? "");
        });
    }
}
export default Utils;
