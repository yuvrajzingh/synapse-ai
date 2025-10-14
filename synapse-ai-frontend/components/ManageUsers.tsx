"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

import { FormEvent, useState, useTransition } from "react";
import { inviteUserToDocument, removeUserFromDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import useOwner from "@/lib/useOwner";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { CrossIcon, XIcon } from "lucide-react";


function ManageUsers() {
    const { user } = useUser()
    const room = useRoom()
    const isOwner = useOwner()
    const [isOpen, setIsOpen] = useState(false)
    const [isRemoveOpen, setIsRemove] = useState(false)
    const [isPending, startTransition] = useTransition()

    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
    )

    const handleDelete = async(userId: string) =>{



        startTransition(async()=>{
            if(!user) return 

            const { success } = await removeUserFromDocument(room.id, userId)

            if(success){
                toast.success("User removed from room successfully!")
            }else{
                toast.error("Failed to remove user from room!")
            }
        })

         
    }
    

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline" className="cursor-pointer">
            <DialogTrigger> Users ({usersInRoom?.docs.length})</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Users with Access</DialogTitle>
            <DialogDescription>
              Enter the email of the user you want to invite.
            </DialogDescription>
          </DialogHeader>

          <Separator />
            <div className="flex flex-col space-y-2">
                {
                    usersInRoom?.docs.map((doc)=> (
                        <div
                            key={doc.data().userId}
                            className="flex items-center justify-between"
                        >
                            <p className="font-light">
                                {doc.data().userId === user?.emailAddresses[0].toString()
                                ? `You (${doc.data().userId})`
                                : doc.data().userId 
                            }
                            </p>

                            <div className="flex items-center gap-2">
                                <Button variant="outline">
                                    {
                                        doc.data().role
                                    }
                                </Button>

                                {
                                    isOwner && 
                                        doc.data().userId !== user?.emailAddresses[0].toString()
                                        && (
                                            <Button
                                                variant="outline"
                                                onClick={() => handleDelete(doc.data().userId)}
                                                disabled={isPending}
                                                size="sm"
                                                className="cursor-pointer text-red-700 border"
                                            >
                                                {isPending ? "Removing..." : <XIcon />  }
                                            </Button>
                                        )
                                }
                            </div>

                        </div>
                    ))
                }
            </div>

        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ManageUsers;
