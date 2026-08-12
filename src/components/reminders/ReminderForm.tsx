"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { useCustomers } from "@/context/CustomerContext";
import type { Reminder, ReminderMethod } from "@/types";

interface FormErrors {
  customerId?: string;
  amount?: string;
  method?: string;
  scheduledDate?: string;
}

interface ReminderFormProps {
  reminder?: Reminder;
  onSubmit: (data: Omit<Reminder, "id">) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export default function ReminderForm({
  reminder,
  onSubmit,
  onCancel,
  submitLabel = "Save Reminder",
}: ReminderFormProps) {
  const { customers } = useCustomers();
  const [customerId, setCustomerId] = useState(reminder?.customerId ?? "");
  const [amount, setAmount] = useState(
    reminder?.amount ? String(reminder.amount) : "",
  );
  const [method, setMethod] = useState<ReminderMethod>(
    reminder?.method ?? "sms",
  );
  const [scheduledDate, setScheduledDate] = useState(
    reminder?.scheduledDate ? reminder.scheduledDate.slice(0, 10) : "",
  );
  const [note, setNote] = useState(reminder?.note ?? "");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!customerId || customerId === "") {
      newErrors.customerId = "Please select a customer";
    }

    const amountNum = Number(amount);
    if (!amount || amount.trim() === "") {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = "Amount must be a positive number";
    } else if (amountNum > 10000000) {
      newErrors.amount = "Amount seems too large";
    }

    if (!method) {
      newErrors.method = "Please select a method";
    }

    if (!scheduledDate || scheduledDate.trim() === "") {
      newErrors.scheduledDate = "Scheduled date is required";
    }

    return newErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload: Omit<Reminder, "id"> = {
      customerId,
      amount: Number(amount),
      method,
      scheduledDate,
      note: note.trim(),
      status: reminder?.status ?? "scheduled",
      sentAt: reminder?.sentAt ?? null,
    };

    await onSubmit(payload);

    setCustomerId("");
    setAmount("");
    setMethod("sms");
    setScheduledDate("");
    setNote("");
    setErrors({});
    setSubmitted(false);
    onCancel();
  };

  return (
    <Card className="border-0 p-0 shadow-none">
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <Select
            label="Customer"
            name="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className={errors.customerId ? "border-danger" : ""}
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Select>
          {errors.customerId && (
            <p className="mt-1 text-xs font-semibold text-danger">
              {errors.customerId}
            </p>
          )}
        </div>

        <Input
          label="Amount (Rs)"
          name="amount"
          type="number"
          min="1"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={errors.amount ? "border-danger" : ""}
        />
        {errors.amount && (
          <p className="mt-1 text-xs font-semibold text-danger">{errors.amount}</p>
        )}

        <Select
          label="Delivery method"
          name="method"
          value={method}
          onChange={(e) => setMethod(e.target.value as ReminderMethod)}
          className={errors.method ? "border-danger" : ""}
        >
          <option value="sms">SMS</option>
          <option value="whatsapp">WhatsApp</option>
        </Select>
        {errors.method && (
          <p className="mt-1 text-xs font-semibold text-danger">{errors.method}</p>
        )}

        <div>
          <Input
            label="Scheduled date"
            name="scheduledDate"
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className={errors.scheduledDate ? "border-danger" : ""}
          />
          {errors.scheduledDate && (
            <p className="mt-1 text-xs font-semibold text-danger">
              {errors.scheduledDate}
            </p>
          )}
        </div>

        <Textarea
          label="Note (optional)"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="What is this reminder for?"
        />

        {submitted && Object.keys(errors).length === 0 && (
          <p className="text-xs font-semibold text-accent-dark">
            Reminder saved successfully!
          </p>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </Card>
  );
}
