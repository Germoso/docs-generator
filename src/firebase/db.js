import { initializeApp } from "firebase/app"
import { doc, getFirestore, getDoc, setDoc, updateDoc } from "firebase/firestore"

import "firebase/firestore"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDQI0cZ17eGqLAcawO4N5ISE9oK_4FIt60",
    authDomain: "edu-ai-275af.firebaseapp.com",
    projectId: "edu-ai-275af",
    storageBucket: "edu-ai-275af.appspot.com",
    messagingSenderId: "951499473564",
    appId: "1:951499473564:web:8042eeb1b607ab8b6ea359",
    measurementId: "G-7VZ97LY90S",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

export const createUserIfDontExist = async (id, data) => {
    const docRef = doc(db, "users", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return false
    } else {
        console.log("usuario creado")
        return await createUser(data)
    }
}

export const createUser = async (data) => {
    try {
        await setDoc(doc(db, "users", data.uid), data)
        return true
    } catch (e) {
        console.error("Error adding document: ", e)
        return false
    }
}

export const updateUserDisplayName = async (id, displayName) => {
    try {
        await updateDoc(doc(db, "users", id), {
            displayName,
        })
        return true
    } catch (e) {
        console.error("Error updating document: ", e)
        return false
    }
}
