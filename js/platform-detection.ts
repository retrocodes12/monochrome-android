/** The original user agent string before spoofing. */
export const originalUserAgent = navigator.userAgent;

/** A lowercase version of the original user agent string. */
const lowerCaseOriginalUserAgent = originalUserAgent.toLowerCase();

const capacitorBridge = globalThis as typeof globalThis & {
    Capacitor?: {
        isNativePlatform?: () => boolean;
        getPlatform?: () => string;
    };
};

/** If the app is running inside a native Capacitor shell. */
export const isNativePlatform = !!capacitorBridge.Capacitor?.isNativePlatform?.();

/** Native platform name when running in Capacitor, otherwise `web`. */
export const nativePlatform = isNativePlatform ? capacitorBridge.Capacitor?.getPlatform?.() || 'web' : 'web';

/** If the app is running inside the Android Capacitor shell. */
export const isNativeAndroid = nativePlatform === 'android';

/** If the device is an iOS device. (iPhone, iPad, iPod, or Apple Vision) */
export const isIos =
    /iphone|ipad|ipod|applevision/.test(lowerCaseOriginalUserAgent) ||
    (lowerCaseOriginalUserAgent.includes('mac') && navigator.maxTouchPoints > 1);

/** If the browser is Safari (excluding Chrome, Chromium-based browsers, and Android browsers). */
export const isSafari =
    lowerCaseOriginalUserAgent.includes('safari') &&
    !lowerCaseOriginalUserAgent.includes('chrome') &&
    !lowerCaseOriginalUserAgent.includes('crios') &&
    !lowerCaseOriginalUserAgent.includes('android');
