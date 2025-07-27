"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import useOwner from "@/lib/useOwner";
import { Separator } from "./ui/separator";
import Editor from "./Editor";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";

function Document({ id }: { id: string }) {
  const [data, loading, error] = useDocument(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();

  useEffect(() => {
    if (data) {
      setInput(data?.data()?.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div>
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form onSubmit={updateTitle} className="flex flex-1 space-x-2 justify-center items-center">
          {/* update this */}
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-0 border-b-2 border-b-neutral-400 h-auto !text-[2.25rem] focus:!border-neutral-600 focus-visible:ring-0  rounded-none p-0 font-semibold" 
          />

          <Button className="cursor-pointer" onClick={updateTitle}>{isUpdating ? "Renaming" : "Rename"}</Button>


          {isOwner && (
            <>
              {/* Invite User  */}
              <InviteUser />


              {/* Delete Doc  */}
              <DeleteDocument /> 
            </>
          )}
          {/* isOwner && inviteMember && deleteDocument */}
        </form>
      </div>

      <div className="">
        {/* ManageUsers */}

        {/* Avatar  */}
      </div>

      <Separator />

      {/* Collaborative Editor  */}
      <Editor />
    </div>
  );
}
export default Document;
