"use client"

import { getAuth } from "firebase/auth";
import { AuthProvider, useFirebaseApp } from "reactfire";

export default function FirebaseAuth({ children }: { children: React.ReactNode }) {

    const app = useFirebaseApp();
    const auth = getAuth(app);

    return (
        <AuthProvider sdk={auth}>
            {children}
        </AuthProvider>
    )
}