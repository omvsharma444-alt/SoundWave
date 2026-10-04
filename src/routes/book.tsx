import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { EVENT_TYPES, SLOT_GRID, todayISO, type Package } from "@/lib/booking";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/book")({
  validateSearch: z.object({ pkg: z.string().optional() }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth" });
  },
  head: () => ({
    meta: [
      { title: "Book Your Sound System — SoundWave Events" },
      { name: "description", content: "Choose your event date, slot and sound system package." },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { pkg } = Route.useSearch();
  const { data: packages, isLoading } = useQuery({
    queryKey: ["packages", "booking"],
    queryFn: async (): Promise<Package[]> => {
      const { data, error } = await supabase.from("packages").select("*").eq("is_active", true).order("price");
      if (error) throw error;
      return (data ?? []) as Package[];
    },
  });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }

    const form = new FormData(event.currentTarget);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      customer_name: String(form.get("customer_name") ?? "").trim(),
      contact_number: String(form.get("contact_number") ?? "").trim(),
      email: String(form.get("email") ?? user.email ?? "").trim() || null,
      event_type: String(form.get("event_type") ?? "Other"),
      event_date: String(form.get("event_date") ?? ""),
      start_time: String(form.get("start_time") ?? ""),
      end_time: String(form.get("end_time") ?? ""),
      venue: String(form.get("venue") ?? "").trim(),
      guests: Number(form.get("guests") ?? 1),
      package_id: String(form.get("package_id") ?? "") || null,
      requirements: String(form.get("requirements") ?? "").trim() || null,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Booking request submitted");
    navigate({ to: "/" });
  }

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">New booking</p>
        <h1 className="mt-3 font-display text-5xl">Lock your date</h1>
        <p className="mt-4 text-muted-foreground">Tell us about your event and our team will confirm the slot.</p>
        <Card className="surface-panel mt-10 p-6 sm:p-8">
          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customer_name">Full name</Label>
                <Input id="customer_name" name="customer_name" defaultValue={profile?.full_name ?? ""} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_number">Phone number</Label>
                <Input id="contact_number" name="contact_number" defaultValue={profile?.phone ?? ""} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={profile?.email ?? user?.email ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event_type">Event type</Label>
                <select id="event_type" name="event_type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" required>
                  {EVENT_TYPES.map((type) => <option key={type}>{type}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event_date">Event date</Label>
                <Input id="event_date" name="event_date" type="date" min={todayISO()} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="package_id">Sound package</Label>
                <select id="package_id" name="package_id" defaultValue={pkg ?? ""} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" required>
                  <option value="" disabled>{isLoading ? "Loading packages..." : "Select a package"}</option>
                  {(packages ?? []).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start_time">Time slot</Label>
                <select id="start_time" name="start_time" className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" required>
                  {SLOT_GRID.map((slot) => <option key={slot.label} value={slot.start}>{slot.label} ({slot.start} - {slot.end})</option>)}
                </select>
                <input type="hidden" name="end_time" value="23:59" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Expected guests</Label>
                <Input id="guests" name="guests" type="number" min="1" defaultValue="50" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Venue and city</Label>
              <Input id="venue" name="venue" placeholder="Venue name, area and city" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements">Additional requirements</Label>
              <textarea id="requirements" name="requirements" rows={4} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Lighting, microphones, stage or other details" />
            </div>
            <Button type="submit" size="lg" className="w-full bg-stage text-primary-foreground hover:opacity-90">
              Submit booking request
            </Button>
          </form>
        </Card>
      </section>
    </PageShell>
  );
}
