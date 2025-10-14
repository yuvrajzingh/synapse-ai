"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { createNewDocument } from "@/actions/actions";
import { PlusCircleIcon } from "lucide-react";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };

  return (
    <div>
      <Button
        className="w-full flex items-center justify-between"
        onClick={handleCreateNewDocument}
        disabled={isPending}
      >
        {isPending ? "Creating" : "New Document"}
        <PlusCircleIcon />
      </Button>
    </div>
  );
}
export default NewDocumentButton;
