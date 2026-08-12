"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { useTransactions } from "@/context/TransactionContext";
import type { TransactionType } from "@/types";

interface FormErrors {
  customerId?: string;
  amount?: string;
  date?: string;
}

export default function TransactionForm() {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<TransactionType>("credit");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (formData: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    const customerId = formData.get("customerId")?.toString();
    if (!customerId || customerId === "") {
      newErrors.customerId = "Please select a customer";
    }

    const amount = formData.get("amount")?.toString();
    const amountNum = Number(amount);
    if (!amount || amount.trim() === "") {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = "Amount must be a positive number";
    } else if (amountNum > 10000000) {
      newErrors.amount = "Amount seems too large";
    }

    const date = formData.get("date")?.toString();
    if (!date || date.trim() === "") {
      newErrors.date = "Date is required";
    }

    return newErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const customerId = formData.get("customerId")!.toString();
    const amount = Number(formData.get("amount")!.toString());
    const date = formData.get("date")!.toString();
    const note = formData.get("note")!.toString();

    addTransaction({
      customerId,
      type,
      amount,
      note,
      date,
    });

    event.currentTarget.reset();
    setType("credit");
    setSubmitted(false);
    setErrors({});
  };

  return (
    <Card>
      <h2 className="text-lg font-extrabold text-ink">New Entry</h2>
      <form
        className="mt-5 space-y-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <Select
          label="Entry type"
          name="type"
          value={type}
          onChange={(event) => setType(event.target.value as TransactionType)}
        >
          <option value="credit">Credit (udhaar received)</option>
          <option value="debit">Debit (payment given)</option>
        </Select>

        <div>
          <Select
            label="Customer"
            name="customerId"
            defaultValue="c-1"
            className={errors.customerId ? "border-danger" : ""}
          >
            <option value="">Select a customer</option>
            <option value="c-1">Ahmed Traders</option>
            <option value="c-2">Bismillah Store</option>
            <option value="c-3">Rashid General Store</option>
            <option value="c-4">Al-Noor Mart</option>
            <option value="c-5">Sabir & Sons</option>
            <option value="c-6">Madina Cosmetics</option>
          </Select>
          {errors.customerId && (
            <p className="mt-1 text-xs font-semibold text-danger">{errors.customerId}</p>
          )}
        </div>

        <div>
          <Input
            label="Amount (Rs)"
            name="amount"
            type="number"
            min="1"
            placeholder="0"
            className={errors.amount ? "border-danger" : ""}
          />
          {errors.amount && (
            <p className="mt-1 text-xs font-semibold text-danger">{errors.amount}</p>
          )}
        </div>

        <div>
          <Input
            label="Date"
            name="date"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            className={errors.date ? "border-danger" : ""}
          />
          {errors.date && (
            <p className="mt-1 text-xs font-semibold text-danger">{errors.date}</p>
          )}
        </div>

        <Textarea
          label="Note (optional)"
          name="note"
          rows={3}
          placeholder="What was this entry for?"
        />

        {submitted && Object.keys(errors).length === 0 && (
          <p className="text-xs font-semibold text-accent-dark">Entry saved successfully!</p>
        )}

        <Button type="submit" className="w-full" size="lg">
          Save Entry
        </Button>
      </form>
    </Card>
  );
}
