import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

interface DocLayoutProps {
  params: { id: string };
  children: React.ReactNode;
}

export default function DocLayout({ children, params }: DocLayoutProps) {
  auth().then((session) => {
    const userId = session.userId;

    if (!userId) {
      // You can redirect or throw here
      throw new Error("Unauthorized access");
    }

    return <RoomProvider roomId={params.id}>{children}</RoomProvider>;
  });
}
