'use client';

import Document from "@/components/Document";

export default function DocumentPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-200 dark:bg-zinc-900">
      <Document id={params.id} />
    </div>
  );
}
