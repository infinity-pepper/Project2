import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

export const CreateUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const SignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const SignOut = () => {
    return auth.signOut();
};