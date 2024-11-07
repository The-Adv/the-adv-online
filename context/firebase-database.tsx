"use client"

import { getDatabase } from "firebase/database";
import { DatabaseProvider, useFirebaseApp } from "reactfire";

export default function FirebaseDatabase({ children }: { children: React.ReactNode }) {

    const app = useFirebaseApp();
    const database = getDatabase(app);
    
    return (
        <DatabaseProvider sdk={database}>
            {children}
        </DatabaseProvider>
    )
}