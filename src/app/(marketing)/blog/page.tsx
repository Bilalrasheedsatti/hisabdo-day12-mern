import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CalendarDays, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips and resources for shopkeepers and small businesses in Pakistan — khata management, dues recovery, and growing your business.",
};

const posts = [
  {
    id: "p-1",
    title: "5 habits of shopkeepers who never lose money",
    excerpt:
      "From recording entries daily to reviewing dues weekly, these simple habits keep your khata healthy and your cash flowing.",
    date: "Aug 10, 2026",
    readTime: "4 min read",
    tag: "Khata Tips",
  },
  {
    id: "p-2",
    title: "How to recover overdue payments without awkwardness",
    excerpt:
      "Payment reminders don't have to feel rude. Here's how polite, automatic follow-ups bring your money back faster.",
    date: "Aug 3, 2026",
    readTime: "5 min read",
    tag: "Dues Recovery",
  },
  {
    id: "p-3",
    title: "From paper bahi to digital khata: a 3-step switch",
    excerpt:
      "Making the move is easier than you think. Copy your balances, add customers, and start recording — today.",
    date: "Jul 28, 2026",
    readTime: "3 min read",
    tag: "Getting Started",
  },
  {
    id: "p-4",
    title: "Reading your monthly khata report like a pro",
    excerpt:
      "Receivable, payable, recovery rate — what do these numbers really mean for your shop? A simple guide.",
    date: "Jul 20, 2026",
    readTime: "6 min read",
    tag: "Reports",
  },
];

export default function BlogPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="border-b-2 border-ink bg-[#FFF7E6] py-16 lg:py-20">
        <div className="container-page mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            The HisabDo <span className="text-primary">Blog</span>
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            Practical advice for shopkeepers and small businesses in Pakistan.
          </p>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col transition-transform hover:-translate-y-1">
              <Badge variant="primary" className="self-start">
                {post.tag}
              </Badge>
              <h2 className="mt-3 text-xl font-extrabold text-ink">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-4 border-t-2 border-gray-100 pt-3 text-xs text-ink-faint">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
                <Button href="#" variant="ghost" size="sm" className="ml-auto">
                  Read →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
