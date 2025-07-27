"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Trash2, Trash2Icon, TrashIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument } from "@/actions/actions";
import { toast } from "sonner";
import DeleteButton from "./DeleteButton"


function DeleteDocument() {

    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const pathname = usePathname()
    const router = useRouter()


    const handleDelete = async()=>{
        const roomId = pathname.split("/").pop()
        if(!roomId) return 

        startTransition(async ( )=> {
            const { success } = await deleteDocument(roomId)

            if(success){
                setIsOpen(false)
                router.replace("/") 
                toast.success("Room Deleted Successfully!")
            }else{
                toast.error("Failed to delete room!")
            }
        })
    }

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        
            <DialogTrigger ><DeleteButton /></DialogTrigger>
    
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This will delete the document and all it's contents, removing all users from the document.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2">
            <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isPending}
                className="cursor-pointer"
            >
                {isPending ? "Deleting..." : "Yes, Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default DeleteDocument;
