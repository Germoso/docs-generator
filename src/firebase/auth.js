import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth"
import { firebaseConfig } from "./firebaseConfig"

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export const googleAuth = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
}

export const logOut = () => {
    return signOut(auth)
}

export { auth }
