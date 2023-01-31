import { initializeApp } from "firebase/app"
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore"
import { firebaseConfig } from "./firebaseConfig"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const addTokensToUser = async (id, amountOfTokens) => {
    try {
        const docSnap = await getDoc(doc(db, "users", id))
        if (docSnap.exists()) {
            const currentAmountOfTokens = docSnap.data().tokens
            await updateDoc(doc(db, "users", id), {
                tokens: amountOfTokens + currentAmountOfTokens,
            })
        }
    } catch (error) {
        console.log(error)
    }
}
