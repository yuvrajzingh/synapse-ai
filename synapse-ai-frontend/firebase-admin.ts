import {
    initializeApp,
    getApps,
    App,
    getApp,
    cert,
} from "firebase-admin/app"

import { getFirestore } from "firebase-admin/firestore"



let app: App;

if (getApps().length===0){
    app = initializeApp({
        credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)),
    })
}else{
    app = getApp();
}

const adminDb = getFirestore(app)

export { app as adminApp, adminDb }