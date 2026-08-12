import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { customers } from "@/lib/data";
import KhataClient from "@/components/app/KhataClient";
import { ArrowLeft } from "lucide-react";

interface KhataPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return customers.map((customer) => ({ id: customer.id }));
}

export function generateMetadata({ params }: KhataPageProps): Metadata {
  const customer = customers.find((c) => c.id === params.id);
  return {
    title: customer ? `${customer.name} Khata` : "Khata",
  };
}

export default function KhataPage({ params }: KhataPageProps) {
  const customer = customers.find((c) => c.id === params.id);
  if (!customer) {
    notFound();
  }

  return (
    <KhataClient customerId={params.id} />
  );
}
