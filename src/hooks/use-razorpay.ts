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
