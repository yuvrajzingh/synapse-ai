'use client'
import { YDocUpdatedEvent } from "@liveblocks/node"
import * as Y from "yjs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import React, { useState, useTransition } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BotIcon, LanguagesIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import Markdown, { MarkdownAsync } from "react-markdown"

type Language = 
 | "english"
 | "hindi"
 | "spanish"
 | "portugese"
 | "french"
 | "german"
 | "chinese"
 | "russian"
 | "japanese"
 | "arabic"


const languages: Language[] = [
    "english",
    "hindi",
    "spanish",
    "portugese",
    "french",
    "german",
    "chinese",
    "russian",
    "japanese",
    "arabic"
]


function TranslateDocument({doc} : { doc: Y.Doc}) {


    const[isOpen, setIsOpen] = useState(false)
    const [language, setLanguage] = useState<string>("")
    const [summary, setSummary] = useState("")
    const [question, setQuestion] = useState("")
    const [isPending, startTransition] = useTransition()
   

    const handleAskQuestion = async(e: React.FormEvent)=>{

        e.preventDefault()

      startTransition(async ()=>{
          const documentData = doc.get("document-store").toJSON()

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,{
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                documentData, 
                targetLang: language
              })
            }
          )

          if(res.ok){
            const { translated_text } = await res.json()
            console.log(translated_text)
            setSummary(`## Translation\n\n${translated_text}`)
            toast.success("Translated Summary successfully!")
          }
      })

    }

  return (
    <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline" className="cursor-pointer">
            <DialogTrigger>
              <LanguagesIcon />
              Translate
            </DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Translate the Document</DialogTitle>
            <DialogDescription>
              Select the language and AI will translate a summary of the document in the selected language.
            </DialogDescription>
            <Separator />
          </DialogHeader>


          {
            summary && (
              <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 ">
                <div className="flex">
                  <BotIcon className="w-10 flex-shrink-0"/>
                  <p className="font-bold">
                    Synapse { isPending ? "is thinking..." : "Says:" }
                  </p>
                </div>
                <span>{isPending ? "Thinking..." : <MarkdownAsync>{summary}</MarkdownAsync>}</span>
              </div>
            )
          }


          <form onSubmit={handleAskQuestion} className="flex gap-2">
            <Select
              value={language}
              onValueChange={(value)=> setLanguage(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Language"/>
              </SelectTrigger>

              <SelectContent>
                {languages.map((language)=>(
                  <SelectItem key={language} value={language}>
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>

            </Select>
            
            <Button type="submit" disabled={!language || isPending} className="cursor-pointer">
                {isPending ? "Translating..." : "Translate"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  )
}
export default TranslateDocument