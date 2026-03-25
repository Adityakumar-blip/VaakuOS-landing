const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

let isInitialized = false;
let autoTrackingSetUp = false;
let sessionStartTime = 0;
let lastScrollDepth = 0;

interface MixpanelLib {
  __SV?: number;
  _i?: [string, Record<string, unknown>, string][];
  init: (
    token: string,
    config: Record<string, unknown>,
    name?: string,
  ) => void;
  push: (args: unknown[]) => void;
  people: {
    set: (properties: Record<string, unknown>) => void;
    set_once: (properties: Record<string, unknown>) => void;
    increment: (property: string, value?: number) => void;
    toString?: () => string;
  };
  track: (eventName: string, properties?: Record<string, unknown>) => void;
  register: (properties: Record<string, unknown>) => void;
  time_event: (eventName: string) => void;
  toString: (a?: number | boolean) => string;
  get_distinct_id?: () => string;
  identify?: (id: string) => void;
  [key: string]: unknown;
}

interface BraveNavigator extends Navigator {
  brave?: {
    isBrave: () => Promise<boolean>;
  };
}

const isLocalHost = () => {
  if (typeof window === "undefined") return false;
  return ["localhost", "127.0.0.1"].includes(window.location.hostname);
};

const shouldEnableAnalytics = () => {
  if (typeof window === "undefined") return false;
  return !isLocalHost() && !navigator.webdriver;
};

const loadGoogleAnalytics = () => {
  if (!GA_MEASUREMENT_ID || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

const loadClarity = () => {
  if (!CLARITY_PROJECT_ID || window.clarity) return;
  const clarityWindow = window as Window & {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  };

  clarityWindow.clarity =
    clarityWindow.clarity ||
    function (...args: unknown[]) {
      clarityWindow.clarity!.q = clarityWindow.clarity!.q || [];
      clarityWindow.clarity!.q!.push(args);
    };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode?.insertBefore(script, firstScript);
};

const loadMixpanel = () => {
  if (!MIXPANEL_TOKEN || window.mixpanel?.__SV) return;

  (function (f: Document, b: MixpanelLib) {
    if (b.__SV) return;

    let h: number;
    let i: string[];

    window.mixpanel = b;
    b._i = [];
    b.init = function (e: string, f: Record<string, unknown>, c?: string) {
      function g(a: MixpanelLib, d: string) {
        const split = d.split(".");
        if (split.length === 2) {
          a = a[split[0]] as MixpanelLib;
          d = split[1];
        }
        a[d] = (...args: unknown[]) => {
          a.push([d, ...args]);
        };
      }

      let a: MixpanelLib = b;
      if (typeof c !== "undefined") {
        a = (b[c] = [] as unknown as MixpanelLib);
      } else {
        c = "mixpanel";
      }

      a.people = a.people || ([] as unknown as MixpanelLib["people"]);
      a.toString = function (stub?: number | boolean) {
        let d = "mixpanel";
        if (c !== "mixpanel") d += `.${c}`;
        if (!stub) d += " (stub)";
        return d;
      };
      a.people.toString = () => `${a.toString(1)}.people (stub)`;

      i =
        "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(
          " ",
        );
      for (h = 0; h < i.length; h++) g(a, i[h]);
      b._i?.push([e, f, c]);
    };

    b.__SV = 1.2;
    const script = f.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
    const firstScript = f.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
  })(document, window.mixpanel || ([] as unknown as MixpanelLib));

  window.mixpanel.init(MIXPANEL_TOKEN, {
    debug: false,
    track_pageview: false,
    persistence: "localStorage",
    api_host: "https://api-eu.mixpanel.com",
    loaded: (mixpanel: MixpanelLib) => {
      if (mixpanel.get_distinct_id && mixpanel.identify) {
        const distinctId = mixpanel.get_distinct_id();
        mixpanel.identify(distinctId);
      }
    },
  });

  window.mixpanel.people.set_once({
    $created: new Date().toISOString(),
    "First Landing Page": window.location.pathname,
    "First Referrer": document.referrer || "Direct",
  });

  window.mixpanel.people.set({
    $browser: navigator.userAgent,
    $os: navigator.platform,
    "Screen Resolution": `${window.screen.width}x${window.screen.height}`,
    "Viewport Size": `${window.innerWidth}x${window.innerHeight}`,
    Language: navigator.language,
    "Last Seen": new Date().toISOString(),
  });

  window.mixpanel.register({
    "Screen Resolution": `${window.screen.width}x${window.screen.height}`,
    "Viewport Size": `${window.innerWidth}x${window.innerHeight}`,
    Language: navigator.language,
    Referrer: document.referrer || "Direct",
    "UTM Source":
      new URLSearchParams(window.location.search).get("utm_source") || "",
    "UTM Medium":
      new URLSearchParams(window.location.search).get("utm_medium") || "",
    "UTM Campaign":
      new URLSearchParams(window.location.search).get("utm_campaign") || "",
  });

  window.mixpanel.people.increment("Total Visits");
};

export const initAnalytics = () => {
  if (isInitialized) return;
  isInitialized = true;

  if (!shouldEnableAnalytics()) return;

  loadGoogleAnalytics();
  loadClarity();
  loadMixpanel();
  setupAutoTracking();
};

const setupAutoTracking = () => {
  if (autoTrackingSetUp) return;
  autoTrackingSetUp = true;
  sessionStartTime = Date.now();

  document.addEventListener("click", handleClickTracking, true);

  let scrollTimeout: ReturnType<typeof setTimeout>;
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercent = Math.round(
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
            100,
        );

        for (const milestone of [25, 50, 75, 100]) {
          if (scrollPercent >= milestone && lastScrollDepth < milestone) {
            lastScrollDepth = milestone;
            trackEvent("Scroll Depth", {
              depth: `${milestone}%`,
              page: window.location.pathname,
            });
          }
        }
      }, 200);
    },
    { passive: true },
  );

  window.addEventListener("beforeunload", () => {
    const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000);
    trackEvent("Session End", {
      "Session Duration (seconds)": sessionDuration,
      "Session Duration (formatted)": formatDuration(sessionDuration),
      "Pages Visited": window.history.length,
      "Max Scroll Depth": `${lastScrollDepth}%`,
    });

    if (MIXPANEL_TOKEN && window.mixpanel) {
      window.mixpanel.people.increment(
        "Total Time on Site (seconds)",
        sessionDuration,
      );
    }
  });

  document.addEventListener("visibilitychange", () => {
    trackEvent(document.hidden ? "Tab Hidden" : "Tab Visible", {
      page: window.location.pathname,
    });
  });

  document.addEventListener(
    "click",
    (event) => {
      const link = (event.target as HTMLElement).closest("a");
      if (link && link.hostname !== window.location.hostname && link.href) {
        trackEvent("Outbound Link Click", {
          url: link.href,
          text: link.textContent?.trim()?.substring(0, 100) || "",
          page: window.location.pathname,
        });
      }
    },
    true,
  );
};

const handleClickTracking = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target) return;

  const clickable = target.closest(
    "button, a, [role='button'], input[type='submit'], [data-track]",
  );
  if (!clickable) return;

  const element = clickable as HTMLElement;
  const tagName = element.tagName.toLowerCase();
  const text = (
    element.getAttribute("aria-label") ||
    element.textContent?.trim() ||
    element.getAttribute("title") ||
    ""
  ).substring(0, 150);

  let elementType = tagName;
  if (tagName === "a") elementType = "link";
  if (tagName === "button" || element.getAttribute("role") === "button") {
    elementType = "button";
  }
  if (tagName === "input") {
    elementType = (element as HTMLInputElement).type || "input";
  }

  trackEvent("Element Click", {
    "Element Type": elementType,
    "Element Text": text,
    "Element ID": element.id || undefined,
    "Element Classes":
      element.className?.toString()?.substring(0, 100) || undefined,
    "Link URL": element.getAttribute("href") || undefined,
    "Data Track": element.getAttribute("data-track") || undefined,
    Page: window.location.pathname,
    Section: findSection(element),
  });
};

const findSection = (element: HTMLElement): string => {
  let current: HTMLElement | null = element;

  while (current) {
    if (current.getAttribute("data-section")) {
      return current.getAttribute("data-section") || "";
    }

    if (current.id && current.tagName.toLowerCase() !== "root") {
      return current.id;
    }

    if (
      ["section", "nav", "footer", "header"].includes(
        current.tagName.toLowerCase(),
      )
    ) {
      return (
        current.getAttribute("aria-label") ||
        current.className?.toString()?.split(" ")[0] ||
        current.tagName.toLowerCase()
      );
    }

    current = current.parentElement;
  }

  return "unknown";
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
};

export const trackPageView = (path: string) => {
  if (!shouldEnableAnalytics()) return;

  lastScrollDepth = 0;

  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }

  if (MIXPANEL_TOKEN && window.mixpanel) {
    const braveNavigator = navigator as BraveNavigator;
    if (braveNavigator.brave?.isBrave) {
      braveNavigator.brave.isBrave().then((isBrave: boolean) => {
        if (isBrave) {
          window.mixpanel.register({ $browser: "Brave" });
        }
      });
    }

    window.mixpanel.track("Page View", {
      path,
      title: document.title,
      referrer: document.referrer || "Direct",
      URL: window.location.href,
    });

    window.mixpanel.time_event("Page Exit");
  }
};

export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>,
) => {
  if (!shouldEnableAnalytics()) return;

  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag("event", eventName, properties);
  }

  if (CLARITY_PROJECT_ID && window.clarity) {
    window.clarity("event", eventName);
  }

  if (MIXPANEL_TOKEN && window.mixpanel) {
    window.mixpanel.track(eventName, properties);
  }
};

export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent("CTA Click", {
    "CTA Name": ctaName,
    "CTA Location": location,
    Page: window.location.pathname,
  });

  if (MIXPANEL_TOKEN && window.mixpanel) {
    window.mixpanel.people.increment("Total CTA Clicks");
  }
};

export const trackFormStart = (formName: string) => {
  trackEvent("Form Start", {
    "Form Name": formName,
    Page: window.location.pathname,
  });

  if (MIXPANEL_TOKEN && window.mixpanel) {
    window.mixpanel.time_event("Form Submit");
  }
};

export const trackFormSubmit = (
  formName: string,
  properties?: Record<string, unknown>,
) => {
  trackEvent("Form Submit", {
    "Form Name": formName,
    Page: window.location.pathname,
    ...properties,
  });

  if (MIXPANEL_TOKEN && window.mixpanel) {
    window.mixpanel.people.increment("Total Form Submissions");
  }
};

export const trackPricingView = (plan: string) => {
  trackEvent("Pricing View", {
    Plan: plan,
    Page: window.location.pathname,
  });
};

export const trackFeatureInteraction = (
  featureName: string,
  action: string,
) => {
  trackEvent("Feature Interaction", {
    "Feature Name": featureName,
    Action: action,
    Page: window.location.pathname,
  });
};
