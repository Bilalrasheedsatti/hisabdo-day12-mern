import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Store, Download, ShieldCheck, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Manage your business profile, preferences, and data.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink bg-primary-light text-primary-dark">
              <Store className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-extrabold text-ink">Business Profile</h2>
          </div>
          <form className="mt-6 grid gap-4 sm:grid-cols-2">
            <Input
              label="Business name"
              name="businessName"
              defaultValue="Bilal Traders"
            />
            <Select label="Business category" name="category" defaultValue="general">
              <option value="general">General Store</option>
              <option value="grocery">Grocery</option>
              <option value="wholesale">Wholesale</option>
              <option value="electronics">Electronics</option>
              <option value="other">Other</option>
            </Select>
            <Input label="Phone number" name="phone" defaultValue="0300-1234567" />
            <Input label="City" name="city" defaultValue="Karachi" />
            <Textarea
              label="Address (optional)"
              name="address"
              rows={2}
              placeholder="Shop address"
              className="sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink bg-accent-light text-accent-dark">
                <Download className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-extrabold text-ink">Backup & Export</h2>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Export your full khata to CSV or Excel, or create a backup file.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Button href="#" variant="secondary" size="sm">
                Export to CSV
              </Button>
              <Button href="#" variant="secondary" size="sm">
                Create Backup
              </Button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink bg-danger-light text-danger">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-extrabold text-ink">Security</h2>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Change your password or enable two-factor authentication.
            </p>
            <div className="mt-5">
              <Button href="#" variant="secondary" size="sm">
                Change Password
              </Button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink bg-warn-light text-amber-700">
                <Bell className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-extrabold text-ink">Notifications</h2>
            </div>
            <div className="mt-4 space-y-3">
              {["Due reminders", "Payment received", "Weekly summary"].map((item) => (
                <label key={item} className="flex items-center justify-between text-sm font-medium text-ink">
                  {item}
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                </label>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
