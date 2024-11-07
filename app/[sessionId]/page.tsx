import { notFound } from 'next/navigation'
import { getValidSession } from "@/actions/airtable";
import React from 'react';
import FirebaseApp from '@/context/firebase-app';
import FirebaseAuth from '@/context/firebase-auth';
import App from '@/components/app';
import { SessionProvider } from '@/context/session';
import FirebaseDatabase from '@/context/firebase-database';

export default async function Session({ params }: { params: { sessionId: string } }) {

    const { sessionId } = await params;

    if (!sessionId) {
        notFound();
    }

    const { isValid, error } = await getValidSession(sessionId);

    if (!isValid) {
        return <p>{error}</p>
    }

    return (
        <SessionProvider initialState={sessionId}>
            <FirebaseApp>
                <FirebaseAuth>
                    <FirebaseDatabase>
                        <App />
                    </FirebaseDatabase>
                </FirebaseAuth>
            </FirebaseApp>
        </SessionProvider>
    )
}