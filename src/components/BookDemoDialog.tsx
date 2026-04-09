import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import {
  Loader2,
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { addDays, format } from "date-fns";

type BookDemoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];

const BookDemoDialog = ({ open, onOpenChange }: BookDemoDialogProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    addDays(new Date(), 1),
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    volume: "",
  });

  const resetState = () => {
    setStep(1);
    setIsSubmitting(false);
    setSelectedDate(addDays(new Date(), 1));
    setSelectedTime(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      volume: "",
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) resetState();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/demo-bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      if (!response.ok) throw new Error("Failed to book demo");

      handleOpenChange(false);
      toast.success("Demo Scheduled!", {
        description: `Confirming for ${format(selectedDate!, "PPP")} at ${selectedTime}.`,
      });
    } catch {
      setIsSubmitting(false);
      toast.error("Oops! Something went wrong.", {
        description: "Please try again later or contact support.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl flex flex-col md:flex-row min-h-[500px]">
        <div className="md:w-72 bg-primary p-8 text-primary-foreground relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-8">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20 w-fit mb-4">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Live Demo
              </DialogTitle>
              <DialogDescription className="text-primary-foreground/80 mt-1">
                15-min product walkthrough with our product expert.
              </DialogDescription>
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/90">
                <Clock className="h-4 w-4" />
                <span>15 minutes duration</span>
              </div>
              {selectedDate && (
                <div className="flex items-center gap-3 text-sm text-primary-foreground/90">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{format(selectedDate, "PPP")}</span>
                </div>
              )}
              {selectedTime && (
                <div className="flex items-center gap-3 text-sm text-primary-foreground/90">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{selectedTime} selected</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-background relative overflow-hidden flex flex-col">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <div className="p-8 flex-1">
              {step === 1 ? (
                <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight">
                        Tell us about your brand
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We'll prepare a custom demo based on your scale.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          required
                          className="h-11 rounded-xl"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          required
                          className="h-11 rounded-xl"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                      >
                        Business Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        className="h-11 rounded-xl"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="volume"
                        className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                      >
                        Monthly Orders
                      </Label>
                      <Select
                        required
                        value={formData.volume}
                        onValueChange={(value) =>
                          setFormData({ ...formData, volume: value })
                        }
                      >
                        <SelectTrigger id="volume" className="h-11 rounded-xl">
                          <SelectValue placeholder="Select order volume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-500">0 - 500 orders/mo</SelectItem>
                          <SelectItem value="500-2000">
                            500 - 2,000 orders/mo
                          </SelectItem>
                          <SelectItem value="2000-5000">
                            2,000 - 5,000 orders/mo
                          </SelectItem>
                          <SelectItem value="5000+">5,000+ orders/mo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        size="xl"
                        className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 group"
                      >
                        Next: Select Time
                        <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                </div>
              ) : (
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setStep(1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="text-lg font-bold">Pick a convenient time</h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={{ before: new Date() }}
                          className="rounded-xl border shadow-sm"
                        />
                      </div>
                      <div className="md:w-48">
                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-4">
                          Available slots
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 max-h-[250px] overflow-y-auto pr-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? "hero" : "outline"}
                              className={`h-11 rounded-xl text-sm font-semibold transition-all ${
                                selectedTime === time
                                  ? "border-primary"
                                  : "hover:border-primary/50"
                              }`}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        size="xl"
                        className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20"
                        disabled={isSubmitting || !selectedTime || !selectedDate}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Scheduling...
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
                      </Button>
                    </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-muted/30 border-t border-border mt-auto">
              <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                Step {step} of 2 • Secure your VIP walkthrough
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDemoDialog;
