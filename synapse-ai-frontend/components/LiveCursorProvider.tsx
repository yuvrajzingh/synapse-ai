import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { PointerEvent, useCallback } from "react";
import FollowPointer from "./FollowPointer";

function LiveCursorProvider({ children }: { children: React.ReactNode }) {
  const [, updateMyPresence] = useMyPresence();
  const others = useOthers(); // others presence

  // Wrap in useCallback to prevent recreation on every render
  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      // Update from ClientX and ClientY to PageX and PageY for full page cursor tracking
      // Imagine the collaborator scrolled all the way down the page if we had used the Client version
      // We would see the cursor all the way in the bottom of our page, which doesn't look good.
      const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
      updateMyPresence({ cursor });
    },
    [updateMyPresence]
  );

  // Wrap in useCallback to prevent recreation on every render
  const handlePointerLeave = useCallback(() => {
    updateMyPresence({ cursor: null });
  }, [updateMyPresence]);

  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {/* Filter the users who have a cursor on them and then get their info */}
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer
            key={connectionId}
            info={info}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
          />
        ))}
      {children}
    </div>
  );
}

export default LiveCursorProvider;