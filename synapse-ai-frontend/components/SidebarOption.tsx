"use client";

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocument } from "react-firebase-hooks/firestore";

function SidebarOption({ href, id }: { href: string; id: string }) {
  const [data, loading, error] = useDocument(doc(db, "documents", id));
  const pathname = usePathname()
  const isActive = href.includes(pathname) && pathname !== "/";

  if(!data) return null

  return (
    <Link href={href} className={`border-b p-2 rounded-sm border-zinc-500 ${isActive && "font-semibold bg-zinc-200 dark:bg-zinc-900" }`}>
      <p className="truncate">{data?.data()?.title}</p>
    </Link>
  );
}
export default SidebarOption;
