import { initializeApp } from "firebase/app"
import { doc, getFirestore, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"

import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDQI0cZ17eGqLAcawO4N5ISE9oK_4FIt60",
    authDomain: "edu-ai-275af.firebaseapp.com",
    projectId: "edu-ai-275af",
    storageBucket: "edu-ai-275af.appspot.com",
    messagingSenderId: "951499473564",
    appId: "1:951499473564:web:8042eeb1b607ab8b6ea359",
    measurementId: "G-7VZ97LY90S",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const createUserIfDontExist = async (id, data) => {
    const res = await userExist(id)
    if (res.exist) {
        return false
    } else {
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

export const userExist = async (id) => {
    try {
        const docRef = doc(db, "users", id)
        const docSnap = await getDoc(docRef)
        return { exist: docSnap.exists(), user: docSnap.data() }
    } catch (error) {
        return error
    }
}

export const debit = async (id, tokens = 0) => {
    console.log(id)
    try {
        const docSnap = await getDoc(doc(db, "users", id))
        if (docSnap.exists()) {
            const currentAmountOfTokens = docSnap.data().tokens
            return await updateDoc(doc(db, "users", id), {
                tokens: currentAmountOfTokens - tokens,
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const addDocument = async ({ id, prompt, details, type, total_tokens, content }) => {
    console.log(id)
    console.log(prompt)
    console.log(details)
    console.log(type)
    console.log(total_tokens)
    console.log(content)
    try {
        await updateDoc(doc(db, "users", id), {
            documents: arrayUnion({
                prompt,
                details,
                type,
                usage: {
                    total_tokens,
                },
                content: {
                    blocks: content,
                },
            }),
        })
    } catch (error) {
        console.log(error)
    }
}

export const getDocuments = async ({ id }) => {
    console.log(id)
    try {
        const docRef = doc(db, "users", id)
        const docSnap = await getDoc(docRef)
        return docSnap.data().documents
    } catch (error) {
        return error
    }
}

export const getDocument = async ({ id, index }) => {
    console.log(id)
    try {
        const docRef = doc(db, "users", id)
        const docSnap = await getDoc(docRef)
        return docSnap.data().documents[index]
    } catch (error) {
        return error
    }
}

export const updateDocumentBlocks = async ({ id, documents }) => {
    try {
        await updateDoc(
            doc(db, "users", id),
            {
                documents,
            },
            { merge: true }
        )
    } catch (error) {
        console.log(error)
    }
}
