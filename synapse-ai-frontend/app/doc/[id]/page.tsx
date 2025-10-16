'use client';

import Document from "@/components/Document";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; //await it, since Next marks it as Promise as the Layout is async.

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-200 dark:bg-zinc-900">
      <Document id={id} />
    </div>
  );
}

