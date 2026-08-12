"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import type { Customer } from "@/types";

interface FormErrors {
  name?: string;
  phone?: string;
  business?: string;
}

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (data: Omit<Customer, "id">) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export default function CustomerForm({
  customer,
  onSubmit,
  onCancel,
  submitLabel = "Save Customer",
}: CustomerFormProps) {
  const [name, setName] = useState(customer?.name ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [business, setBusiness] = useState(customer?.business ?? "");
  const [tags, setTags] = useState(customer?.tags?.join(", ") ?? "");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Customer name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneDigits.length < 11) {
      newErrors.phone = "Phone number must be at least 11 digits";
    } else if (!/^03\d{9}$/.test(phoneDigits)) {
      newErrors.phone = "Enter a valid Pakistani phone number (e.g. 0300-1234567)";
    }

    if (!business.trim()) {
      newErrors.business = "Business name is required";
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

    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    await onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      business: business.trim(),
      tags: tagList.length > 0 ? tagList : undefined,
      totalCredit: customer?.totalCredit ?? 0,
      totalDebit: customer?.totalDebit ?? 0,
      outstanding: customer?.outstanding ?? 0,
      lastEntry: customer?.lastEntry ?? "Never",
    });

    setName("");
    setPhone("");
    setBusiness("");
    setTags("");
    setErrors({});
    setSubmitted(false);
    onCancel();
  };

  return (
    <Card className="border-0 p-0 shadow-none">
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Input
          label="Customer Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ahmed Traders"
          className={errors.name ? "border-danger" : ""}
        />
        {errors.name && (
          <p className="text-xs font-semibold text-danger -mt-2">{errors.name}</p>
        )}

        <Input
          label="Phone Number"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 0300-1234567"
          className={errors.phone ? "border-danger" : ""}
        />
        {errors.phone && (
          <p className="text-xs font-semibold text-danger -mt-2">{errors.phone}</p>
        )}

        <Input
          label="Business / Shop Name"
          name="business"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          placeholder="e.g. General Store"
          className={errors.business ? "border-danger" : ""}
        />
        {errors.business && (
          <p className="text-xs font-semibold text-danger -mt-2">{errors.business}</p>
        )}

        <Textarea
          label="Tags (optional, comma separated)"
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. High Value, Regular"
          rows={2}
        />

        {submitted && Object.keys(errors).length === 0 && (
          <p className="text-xs font-semibold text-accent-dark">
            Customer saved successfully!
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
