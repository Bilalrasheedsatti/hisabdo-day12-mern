"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Input, Select, Textarea } from "@/components/ui/Input";
import type { TransactionType } from "@/types";

export default function TransactionForm() {
  const [type, setType] = useState<TransactionType>("credit");

  return (
    <Card>
      <h2 className="text-lg font-extrabold text-ink">New Entry</h2>
      <form
        className="mt-5 space-y-4"
        onSubmit={(event: FormEvent) => event.preventDefault()}
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
        <Select label="Customer" name="customerId" defaultValue="c-1">
          <option value="c-1">Ahmed Traders</option>
          <option value="c-2">Bismillah Store</option>
          <option value="c-3">Rashid General Store</option>
          <option value="c-4">Al-Noor Mart</option>
          <option value="c-5">Sabir & Sons</option>
          <option value="c-6">Madina Cosmetics</option>
        </Select>
        <Input
          label="Amount (Rs)"
          name="amount"
          type="number"
          min="1"
          placeholder="0"
          required
        />
        <Input
          label="Date"
          name="date"
          type="date"
          defaultValue={new Date().toISOString().slice(0, 10)}
        />
        <Textarea
          label="Note (optional)"
          name="note"
          rows={3}
          placeholder="What was this entry for?"
        />
        <Button type="submit" className="w-full" size="lg">
          Save Entry
        </Button>
      </form>
    </Card>
  );
}
