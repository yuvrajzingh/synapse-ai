import RoomProvider from "@/components/RoomProvider"
import { auth } from "@clerk/nextjs/server"

interface DocLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

const DocLayout = async ({ children, params }: DocLayoutProps) => {
  const id = params.id;

  // This will throw if user is not authenticated
  await auth.protect();

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
};

export default DocLayout;
