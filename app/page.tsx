import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftIcon className="w-10 h-10"/>
      <h1 className="font-bold">Get started with creating a New Document</h1>
    </main>
  );
}
