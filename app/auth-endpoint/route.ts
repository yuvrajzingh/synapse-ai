import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import liveblocks from "@/lib/liveblocks";
import { adminDb } from "@/firebase-admin";


export async function POST(req: NextRequest){
    await auth.protect()

    const { sessionClaims } = await auth()
    const { room }  = await req.json()


    const session = liveblocks.prepareSession(sessionClaims?.email!, {
        userInfo: {
            name: sessionClaims?.fullName!,
            email: sessionClaims?.email!,
            avatar: sessionClaims?.image!,
        }
    })

    const usersInRoom = await adminDb
        .collectionGroup("rooms")
        .where("userId", "==", sessionClaims?.email)
        .get()

    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room)

    if(userInRoom?.exists){
        session.allow(room, session.FULL_ACCESS);
        const { body, status } = await session.authorize()
        console.log("You are authorized")
        return new Response(body, {status})
    }else{
        console.log("Authentication failed")
        return NextResponse.json(
            { message: "You are not in this room" },
            { status: 403 }
        )
    }

}