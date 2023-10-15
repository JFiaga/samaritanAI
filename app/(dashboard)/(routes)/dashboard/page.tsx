"use client";

import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-700",
    bgColor: "bg-violet-700/10",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-blue-700",
    bgColor: "bg-blue-700/10",
  },
];

export default function DashboardPage() {

  const router =useRouter()

  return (
    <div >
      <div className="my-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
           Samaritan can help you!
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with a smart AI - Experience the Powe of AI
        </p>
      </div>
      <div className="px- md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
          onClick={()=> router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor )}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="h-5 w-5"/>
          </Card>
        ))}
      </div>
    </div>
  );
}
