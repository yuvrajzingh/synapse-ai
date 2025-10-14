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
import { BotIcon, MessageCircleCode, TrashIcon, Users } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument, inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import * as Y from "yjs";
import Markdown, { MarkdownAsync } from "react-markdown";
import { Separator } from "./ui/separator";

function ChatToDocument({ doc }: {doc: Y.Doc}) {

    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [email, setEmail] = useState("")
    const [input, setInput] = useState("")
    const [summary, setSummary] = useState("")
    const [question, setQuestion] = useState("")
    const pathname = usePathname()
    const router = useRouter()


    const handleAskQuestion = async(e: FormEvent)=>{
        e.preventDefault()

        setQuestion(input)
        
        startTransition(async()=>{
            const documentData = doc.get("document-store").toJSON()

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentData, 
                        question: input,
                    }),
                }
            )

            if(res.ok){
                const { answer } = await res.json();
                console.log("The response received -> ", answer)
                setInput("")
                setSummary(answer)
            }
        })
    }

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline" className="cursor-pointer">
            <DialogTrigger><MessageCircleCode />Chat to Document</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader className="text-center">
            <DialogTitle >Chat to the Document!</DialogTitle>
            <DialogDescription>
              Ask a question and chat to the document with AI.
            </DialogDescription>

                <Separator />

                {question && <p className="mt-5 text-gray-500">Q: {question}</p> }

          </DialogHeader>


            {
                summary && (
                    <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 ">
                        <div className="flex">
                            <BotIcon className="w-10 flex-shrink-0"/>
                            <p className="font-bold">
                                GPT {isPending ? "is thinking..." : "Says:"}
                            </p>    
                        </div>
                        <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
                    </div>
                )
            }


          <form onSubmit={handleAskQuestion} className="flex gap-2">
            <Input
                type="text"
                placeholder="Enter you question here..."
                className="w-full"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            
            <Button type="submit" disabled={isPending}>
                {isPending ? "Asking..." : "Ask"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ChatToDocument;
