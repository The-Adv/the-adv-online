"use client"

import { log } from "console";
import { createContext, useContext, useState } from "react";

type sessionContextType = {
    sessionId: string;
};

const sessionContextDefaultValues: sessionContextType = {
    sessionId: ''
};

const SessionContext = createContext<sessionContextType>(sessionContextDefaultValues);

export function useSession() {
    return useContext(SessionContext);
}

type Props = { children: React.ReactNode; initialState: string; };

export function SessionProvider({ children, initialState }: Props) {

    const [sessionId] = useState<string>(initialState);

    const value = {
        sessionId
    }
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
}
