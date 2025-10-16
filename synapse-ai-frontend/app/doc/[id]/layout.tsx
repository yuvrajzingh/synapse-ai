import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface DocLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>; //this must be typed as a Promise for Next 15 async layouts
}

export default async function DocLayout({ children, params }: DocLayoutProps) {
  const { id } = await params; //properly awaited since Next.js passes it as a promise in async layout
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}
