import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Plan {
    id: string;
    name: string;
    amount: number;
    currency: string;
    billing_cycle: string;
}

let razorpayScriptPromise: Promise<void> | null = null;

const loadRazorpayScript = () => {
    if (typeof window === "undefined") {
        return Promise.reject(new Error("Razorpay is only available in the browser"));
    }

    if ((window as any).Razorpay) {
        return Promise.resolve();
    }

    if (!razorpayScriptPromise) {
        razorpayScriptPromise = new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Razorpay checkout"));
            document.head.appendChild(script);
        });
    }

    return razorpayScriptPromise;
};

export const useRazorpay = () => {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const initiatePurchase = async (plan: Plan) => {
        if (plan.amount === 0 || plan.name.toLowerCase() === "free") {
            navigate("/register-interest");
            return;
        }

        setIsProcessing(true);
        try {
            const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
            const token = localStorage.getItem("auth_token");

            if (!token) {
                toast.error("Please login to purchase a plan");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
                return;
            }

            const response = await fetch(`${baseUrl}/subscriptions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    plan_id: plan.id,
                    billing_cycle: plan.billing_cycle
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to initiate subscription");
            }

            const subscription = await response.json();

            await loadRazorpayScript();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                subscription_id: subscription.razorpay_subscription_id,
                name: "Vaakuos",
                description: `${plan.name} Subscription`,
                handler: () => {
                    toast.success("Subscription successful!");
                    window.location.href = "https://app.vaakuos.com/dashboard";
                },
            };


            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return { initiatePurchase, isProcessing };
};
