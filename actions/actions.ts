'use server';

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";


export async function createNewDocument(){
    // auth().protect()

    const { sessionClaims, userId, redirectToSignIn } = await auth();
    
    if (!userId) return redirectToSignIn()

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