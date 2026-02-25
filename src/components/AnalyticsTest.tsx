import { trackEvent } from "@/lib/analytics";
import { useEffect, useState } from "react";

export const AnalyticsTest = () => {
    const [status, setStatus] = useState({
        google: false,
        clarity: false,
        mixpanel: false,
    });

    useEffect(() => {
        const checkAnalytics = () => {
            setStatus({
                google: !!window.gtag,
                clarity: !!window.clarity,
                mixpanel: !!window.mixpanel,
            });
        };

        // Check immediately and then every second for 5 seconds
        checkAnalytics();
        const interval = setInterval(checkAnalytics, 1000);
        const timeout = setTimeout(() => clearInterval(interval), 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    const handleTestClick = () => {
        console.log("AnalyticsTest: Triggering test event");
        trackEvent("test_event", {
            source: "analytics_test_component",
            timestamp: new Date().toISOString(),
        });
        alert("Test event triggered! Check console and network tab.");
    };

    return (
        <div className="fixed bottom-4 right-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-w-sm">
            <h3 className="font-bold mb-2">Analytics Status</h3>
            <div className="space-y-1 mb-4 text-sm">
                <div className="flex justify-between">
                    <span>Google Analytics (gtag):</span>
                    <span className={status.google ? "text-green-600 font-bold" : "text-red-500"}>
                        {status.google ? "Active" : "Not Found"}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Microsoft Clarity:</span>
                    <span className={status.clarity ? "text-green-600 font-bold" : "text-red-500"}>
                        {status.clarity ? "Active" : "Not Found"}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Mixpanel:</span>
                    <span className={status.mixpanel ? "text-green-600 font-bold" : "text-red-500"}>
                        {status.mixpanel ? "Active" : "Not Found"}
                    </span>
                </div>
            </div>
            <button
                onClick={handleTestClick}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
            >
                Track Test Event
            </button>
        </div>
    );
};
