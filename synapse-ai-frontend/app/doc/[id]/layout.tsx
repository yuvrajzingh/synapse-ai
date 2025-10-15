import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return <RoomProvider roomId={params.id}>{children}</RoomProvider>;
}

