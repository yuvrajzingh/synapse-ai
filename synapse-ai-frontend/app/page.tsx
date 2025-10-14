import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRight, Brain, ChevronRight, MessageSquare, Play, Sparkle, Sparkles, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {

  const features = [
    { icon: Users, title: "Real-time Collaboration", desc: "Work together seamlessly with live cursors and instant updates" },
    { icon: Brain, title: "AI-Powered Summaries", desc: "Generate intelligent summaries of your documents instantly" },
    { icon: MessageSquare, title: "Chat with Documents", desc: "Ask questions and get insights from your notes using AI" }
  ];


  return (
    <main className="flex space-x-2 items-center ">
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-lg border mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">AI-Powered Note Taking Revolution</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight dark:text-white text-gray-900">
            Think Together,
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Create Faster
            </span>
          </h1>

        <p className="mt-5 max-w-prose text-zinc-500 sm:text-lg">
          The ultimate collaborative workspace where ideas flow freely and AI amplifies your creativity. Real-time collaboration meets intelligent insights.
        </p>
        <Button
          className={buttonVariants({ size: "lg", className: "mt-5" })}
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </MaxWidthWrapper>
    </main>
  );
}
