// Google Analytics 4
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Microsoft Clarity
const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

// Mixpanel
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

let isInitialized = false;

export const initAnalytics = () => {
  if (isInitialized) return;
  isInitialized = true;

  // Initialize Google Analytics
  if (GA_MEASUREMENT_ID) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `/lib/ga?id=${GA_MEASUREMENT_ID}`; // Proxy script load
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      transport_url: window.location.origin + "/gx",
      first_party_collection: true,
    });
    console.log("GA4 Initialized");
  }

  // Initialize Microsoft Clarity
  if (CLARITY_PROJECT_ID) {
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function (...args: unknown[]) {
          (c[a].q = c[a].q || []).push(args);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "/c/tag/" + i; // Proxy script load
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
    console.log("Clarity Initialized");
  }

  // Initialize Mixpanel
  if (MIXPANEL_TOKEN) {
    interface MixpanelLib {
      __SV?: number;
      _i?: [string, Record<string, unknown>, string][];
      init: unknown;
      push: (args: unknown[]) => void;
      people?: unknown;
      toString: (a?: number | boolean) => string;
      [key: string]: unknown;
    }
    (function (f: Document, b: MixpanelLib) {
      if (!b.__SV) {
        let h: number, i: string[];
        let a: unknown;
        window.mixpanel = b;
        b._i = [];
        b.init = function (e: string, f: Record<string, unknown>, c: string) {
          function g(a: MixpanelLib, d: string) {
            const b = d.split(".");
            if (b.length === 2) {
              a = a[b[0]] as MixpanelLib;
              d = b[1];
            }
            a[d] = function (...args: unknown[]) {
              a.push([d, ...args]);
            };
          }
          let a: MixpanelLib = b;
          if (typeof c !== "undefined") {
            a = b[c] = [] as unknown as MixpanelLib;
          } else {
            c = "mixpanel";
          }
          a.people = a.people || [];
          a.toString = function (a?: number | boolean) {
            let d = "mixpanel";
            if ("mixpanel" !== c) {
              d += "." + c;
            }
            if (!a) {
              d += " (stub)";
            }
            return d;
          };
          a.people.toString = function () {
            return a.toString(1) + ".people (stub)";
          };
          i =
            "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(
              " "
            );
          for (h = 0; h < i.length; h++) g(a, i[h]);
          b._i.push([e, f, c]);
        };
        b.__SV = 1.2;
        const e = f.createElement("script");
        e.type = "text/javascript";
        e.async = true;
        e.src = "/lib/m.js"; // Proxy script load
        const g = f.getElementsByTagName("script")[0];
        if (g.parentNode) {
          g.parentNode.insertBefore(e, g);
        }
      }
    })(document, window.mixpanel || []);

    window.mixpanel.init(MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: false, // We will track manually
      persistence: "localStorage",
      api_host: "/mx", // Proxy through our own domain to bypass ad-blockers
    });
    console.log("Mixpanel Initialized");
  }
};

interface BraveNavigator extends Navigator {
  brave?: {
    isBrave: () => Promise<boolean>;
  };
}

export const trackPageView = (path: string) => {
  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }

  // Clarity tracks page views automatically, but we can add custom tags if needed
  // if (CLARITY_PROJECT_ID && window.clarity) {
  //     window.clarity("set", "page", path);
  // }

  if (MIXPANEL_TOKEN && window.mixpanel) {
    // Detect Brave browser
    const braveNavigator = navigator as BraveNavigator;
    if (braveNavigator.brave && braveNavigator.brave.isBrave) {
      braveNavigator.brave.isBrave().then((isBrave: boolean) => {
        if (isBrave) {
          window.mixpanel.register({ $browser: "Brave" });
        }
      });
    }
    
    window.mixpanel.track("Page View", {
      path: path,
    });
  }
};

export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>
) => {
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
