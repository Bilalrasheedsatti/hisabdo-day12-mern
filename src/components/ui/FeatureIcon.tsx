import { BookOpen, BarChart3, Bell, History, ShieldCheck, Users } from "lucide-react";

const iconMap = {
  book: BookOpen,
  chart: BarChart3,
  bell: Bell,
  history: History,
  shield: ShieldCheck,
  users: Users,
} as const;

type FeatureIconName = keyof typeof iconMap;

interface FeatureIconProps {
  name: string;
  className?: string;
}

export default function FeatureIcon({ name, className = "" }: FeatureIconProps) {
  const Icon = iconMap[name as FeatureIconName] ?? BookOpen;
  return <Icon className={className} aria-hidden="true" />;
}
