import type { Metadata } from "next";
import KhataClient from "@/components/app/KhataClient";
import { ArrowLeft } from "lucide-react";

interface KhataPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: KhataPageProps): Metadata {
  return {
    title: "Khata",
  };
}

export default function KhataPage({ params }: KhataPageProps) {
  return <KhataClient customerId={params.id} />;
}
