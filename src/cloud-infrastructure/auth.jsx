import React, { useContext, useState, useEffect } from "react";
import auth from "./firebase";
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [current_user, setCurrentUser] = useState();

    const auth_user = auth.currentUser;

    function signIn(email, password, success_callback, failed_callback) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                console.log("signed in ")
                console.log(auth_user);
                success_callback();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                failed_callback(errorCode, errorMessage);
            });
    }

    function signOutUser(signedOutSuccessful) {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log("signed out");
                signedOutSuccessful();
            })
            .catch((error) => {
                // An error happened.
                console.log(`${error} - sign out failed`);
            });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser();
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        current_user,
        signIn,
        signOutUser,
        auth_user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
