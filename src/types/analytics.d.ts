export {};

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
    MIXPANEL_CUSTOM_LIB_URL?: string;
    mixpanel: any;
  }
}
