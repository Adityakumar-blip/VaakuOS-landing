// Google Analytics 4
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Microsoft Clarity
const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

// Mixpanel
const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

let isInitialized = false;
let autoTrackingSetUp = false;
let sessionStartTime = 0;
let lastScrollDepth = 0;

export const initAnalytics = () => {
  if (isInitialized) return;
  isInitialized = true;

  // Google Analytics — loaded directly from index.html (static script tag)
  // The gtag config is set in index.html, trackPageView handles route changes
  if (GA_MEASUREMENT_ID && window.gtag) {
    console.log("GA4 Active (loaded from index.html)");
  }

  // Initialize Microsoft Clarity
  if (CLARITY_PROJECT_ID) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (function (c: any, l: Document, a: string, r: string, i: string, t: HTMLScriptElement | null, y: HTMLScriptElement | null) {
      c[a] =
        c[a] ||
        function (...args: unknown[]) {
          (c[a].q = c[a].q || []).push(args);
        };
      t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0] as HTMLScriptElement;
      y.parentNode!.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID, null, null);
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
      get_distinct_id?: () => string;
      identify?: (id: string) => void;
      [key: string]: unknown;
    }
    (function (f: Document, b: MixpanelLib) {
      if (!b.__SV) {
        let h: number, i: string[];
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
              " ",
            );
          for (h = 0; h < i.length; h++) g(a, i[h]);
          b._i.push([e, f, c]);
        };
        b.__SV = 1.2;
        const e = f.createElement("script");
        e.type = "text/javascript";
        e.async = true;
        e.src = "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
        const g = f.getElementsByTagName("script")[0];
        if (g.parentNode) {
          g.parentNode.insertBefore(e, g);
        }
      }
    })(document, window.mixpanel || []);

    window.mixpanel.init(MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: true, // Auto-track page views
      persistence: "localStorage",
      api_host: "https://api-eu.mixpanel.com", // EU datacenter
      loaded: function (mixpanel: MixpanelLib) {
        // Identify anonymous visitor so they appear in Users tab
        if (mixpanel.get_distinct_id && mixpanel.identify) {
          const distinctId = mixpanel.get_distinct_id();
          mixpanel.identify(distinctId);
        }
      }
    });

    // Create / update user profile
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

    // Register super properties (sent with every event)
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

    // Increment visit count
    window.mixpanel.people.increment("Total Visits");

    console.log("Mixpanel Initialized with full tracking");
  }

  // Set up auto-tracking (once)
  setupAutoTracking();
};

// ─── AUTO-TRACKING SETUP ─────────────────────────────────────────────────────

const setupAutoTracking = () => {
  if (autoTrackingSetUp) return;
  autoTrackingSetUp = true;

  sessionStartTime = Date.now();

  // 1. Auto-track all button clicks
  document.addEventListener("click", handleClickTracking, true);

  // 2. Track scroll depth
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
        // Track at 25%, 50%, 75%, 100% milestones
        const milestones = [25, 50, 75, 100];
        for (const milestone of milestones) {
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

  // 3. Track session duration on page unload
  window.addEventListener("beforeunload", () => {
    const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000);
    trackEvent("Session End", {
      "Session Duration (seconds)": sessionDuration,
      "Session Duration (formatted)": formatDuration(sessionDuration),
      "Pages Visited": window.history.length,
      "Max Scroll Depth": `${lastScrollDepth}%`,
    });

    // Update user profile with session data
    if (MIXPANEL_TOKEN && window.mixpanel) {
      window.mixpanel.people.increment(
        "Total Time on Site (seconds)",
        sessionDuration,
      );
    }
  });

  // 4. Track page visibility (tab switches)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      trackEvent("Tab Hidden", { page: window.location.pathname });
    } else {
      trackEvent("Tab Visible", { page: window.location.pathname });
    }
  });

  // 5. Track outbound link clicks
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

  console.log(
    "Auto-tracking set up: clicks, scroll, session, visibility, outbound links",
  );
};

// ─── CLICK TRACKING ──────────────────────────────────────────────────────────

const handleClickTracking = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target) return;

  // Find the clickable element (button, link, or element with onClick)
  const clickable = target.closest(
    "button, a, [role='button'], input[type='submit'], [data-track]",
  );
  if (!clickable) return;

  const element = clickable as HTMLElement;
  const tagName = element.tagName.toLowerCase();

  // Get descriptive text
  const text = (
    element.getAttribute("aria-label") ||
    element.textContent?.trim() ||
    element.getAttribute("title") ||
    ""
  ).substring(0, 150);

  // Get element location info
  const elementId = element.id || undefined;
  const classes = element.className?.toString()?.substring(0, 100) || undefined;
  const href = element.getAttribute("href") || undefined;
  const dataTrack = element.getAttribute("data-track") || undefined;

  // Determine element type
  let elementType = tagName;
  if (tagName === "a") elementType = "link";
  if (tagName === "button" || element.getAttribute("role") === "button")
    elementType = "button";
  if (tagName === "input")
    elementType = (element as HTMLInputElement).type || "input";

  // Track the click
  trackEvent("Element Click", {
    "Element Type": elementType,
    "Element Text": text,
    "Element ID": elementId,
    "Element Classes": classes,
    "Link URL": href,
    "Data Track": dataTrack,
    Page: window.location.pathname,
    Section: findSection(element),
  });
};

// Find the nearest section or identifiable parent
const findSection = (el: HTMLElement): string => {
  let current: HTMLElement | null = el;
  while (current) {
    // Check for section, id, or data-section attribute
    if (current.getAttribute("data-section")) {
      return current.getAttribute("data-section") || "";
    }
    if (current.id && current.tagName.toLowerCase() !== "root") {
      return current.id;
    }
    if (
      current.tagName.toLowerCase() === "section" ||
      current.tagName.toLowerCase() === "nav" ||
      current.tagName.toLowerCase() === "footer" ||
      current.tagName.toLowerCase() === "header"
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

// ─── FORMAT HELPERS ──────────────────────────────────────────────────────────

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
};

// ─── PAGE VIEW TRACKING ─────────────────────────────────────────────────────

interface BraveNavigator extends Navigator {
  brave?: {
    isBrave: () => Promise<boolean>;
  };
}

export const trackPageView = (path: string) => {
  // Reset scroll depth for new page
  lastScrollDepth = 0;

  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }

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
      title: document.title,
      referrer: document.referrer || "Direct",
      URL: window.location.href,
    });

    // Start timing this page
    window.mixpanel.time_event("Page Exit");
  }
};

// ─── EVENT TRACKING ──────────────────────────────────────────────────────────

export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>,
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

// ─── CTA / FORM TRACKING HELPERS ────────────────────────────────────────────

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
