'use server';

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";


export async function createNewDocument(){
    await auth.protect()

    const { sessionClaims, userId, redirectToSignIn } = await auth(); //extracting the custom sessionClaims that we had set in clerk in order to get the user 
    
    

    const docCollectionRef = adminDb.collection("documents")
    const docRef = await docCollectionRef.add({
        title: "New Doc"
    })

    await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
         userId: sessionClaims?.email!,
         role: "owner",
         createdAt: new Date(),
         roomId: docRef.id, //having roomId here again for DB Index queries
    }) //once the doc has been created, based on the doc ID we need to add the user who is logged In, to the room.


    return { docId: docRef.id }
}

export async function deleteDocument(roomId: string){
    await auth.protect()

    console.log("deleteDocument", roomId)

    try{

        //delete the document itself
        await adminDb.collection("documents").doc(roomId).delete()

        const query = await adminDb
            .collectionGroup("rooms")
            .where("roomId", "==", roomId)
            .get()
        
        const batch = adminDb.batch();

        //delete the room reference in the user's collection for every user in the room 
        query.docs.forEach((doc) => {
            batch.delete(doc.ref)
        })

        await batch.commit()

        // delete the room in liveblocks  
        await liveblocks.deleteRoom(roomId)

        return { success: true }

    }catch(error){
        console.error(error)
        return {success: false}
    }

}


export async function inviteUserToDocument(roomId: string, email: string){
    await auth.protect()

    console.log("invited user to doc ->", roomId, email)


    //everything same as when we create a new doc except the role is set to "editor"
    try{
        await adminDb
            .collection("users")
            .doc(email)
            .collection("rooms")
            .doc(roomId)
            .set({
                userId: email,
                role: "editor",
                createdAt: new Date(),
                roomId,
            })

        return { success: true }

    }catch(error){
        console.error(error)
        return { success: false }
    }
}


export async function removeUserFromDocument(roomId: string, email: string ){

    await auth.protect()

    console.log("removed user from document!", roomId, email)

    try{
        await adminDb 
        .collection("users")
        .doc(email)
        .collection("rooms")
        .doc(roomId)
        .delete()

        return { success: true }
    }catch(error){
        console.error(error)
        return { success: false }
    }



}