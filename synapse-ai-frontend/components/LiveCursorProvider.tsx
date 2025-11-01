import { useMyPresence, useOthers } from "@liveblocks/react"
import { PointerEvent } from "react"
import FollowPointer from "./FollowPointer"

function LiveCursorProvider({children}: {children: React.ReactNode}) {
  
    const [myPresence, updateMyPresence] = useMyPresence()
    const others = useOthers() // others presence
    
    function handlePointerMove(e: PointerEvent<HTMLDivElement>){
        //update from ClientX and ClientY to PageX and PageY for full page cursor tracking
        //imagine the collaborator scrolled all the way down the page if we had used the Client version
        //we would see the cursor all the way in the bottom of our page, which doesn't look good.
        const cursor = {x: Math.floor(e.pageX), y: Math.floor(e.pageY)}
        updateMyPresence({ cursor })
    }

    //when i leave the page, my cursor gets removed
    function handlePointerLeave(e: PointerEvent<HTMLDivElement>){
        updateMyPresence({cursor: null})
    }

    return (
    <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
    >
        
            {// filter the users who have a cursor on them and then get their info 
            others 
                .filter((other) => other.presence.cursor !== null)
                .map(({connectionId, presence, info})=>(
                <FollowPointer 
                    key={connectionId}
                    info={info}
                    x={presence.cursor!.x}
                    y={presence.cursor!.y}
                />
            ))}        
            {children}
    </div>
  )
}
export default LiveCursorProvider