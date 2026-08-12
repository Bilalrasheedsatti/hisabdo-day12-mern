import type { Metadata } from "next";
import RemindersClient from "@/components/reminders/RemindersClient";

export const metadata: Metadata = {
  title: "Reminders",
};

export default function RemindersPage() {
  return <RemindersClient />;
}
