"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function Avatars() {
  const others = useOthers();
  const self = useSelf();

  // to get all of the users in the current doc we can combine the "others" and "self"
  const all = [self, ...others];

  return (
    <div className="flex gap-2 items-center">
      <p className="text-sm font-medium">Users currently editing this page</p>

      <div className="flex -space-x-5">
        {all.map((other, i) => (
          <TooltipProvider key={other.id}>
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="border-2 hover:z-50">
                  <AvatarImage src={other?.info.avatar} />
                  <AvatarFallback>{other?.info.name}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{self?.id === other?.id ? "You" : other?.info.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
export default Avatars;
