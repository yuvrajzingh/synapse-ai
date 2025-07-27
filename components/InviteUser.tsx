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
import { TrashIcon, Users } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument, inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";


function InviteUser() {

    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [email, setEmail] = useState("")
    const pathname = usePathname()
    const router = useRouter()


    const handleInvite = async(e: FormEvent)=>{
        e.preventDefault()

        const roomId = pathname.split("/").pop()
        if(!roomId) return 

        startTransition(async ( )=> {
            const { success } = await inviteUserToDocument(roomId, email)

            if(success){
                setIsOpen(false)
                setEmail("")
                toast.success("User Added to Room successfully!")
            }else{
                toast.error("Failed to add user to Room!")
            }
        })
    }

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline" className="cursor-pointer">
            <DialogTrigger><Users /> Invite</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite a user to collaborate!</DialogTitle>
            <DialogDescription>
              Enter the email of the user you want to invite.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInvite} className="flex gap-2">
            <Input
                type="email"
                placeholder="Email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            
            <Button type="submit" disabled={!email || isPending}>
                {isPending ? "Inviting..." : "Invite"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default InviteUser;
