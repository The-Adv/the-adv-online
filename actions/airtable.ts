"use server";

export async function getValidSession(sessionId: string): Promise<{ isValid: boolean; error: string }> {

    // check if a sessionId is provided
    if (!sessionId) {
        return {
            isValid: false,
            error: 'No session ID provided'
        };
    }

    const airtableResponse = await fetch('https://api.airtable.com/v0/appf02mGrGJ8nU4Ch/tbllWioxdGbOzMGcw/listRecords', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
        },
        method: 'POST',
        body: JSON.stringify({
            "filterByFormula": `ID='${sessionId}'`,
            "fields": ["ID", "Locked", "Date"]
        })
    });

    // check if the response is ok
    if (!airtableResponse.ok) {
        return {
            isValid: false,
            error: 'Error fetching session from Airtable: ' + airtableResponse.statusText
        };
    }

    const airtableJson = await airtableResponse.json();

    // check if the response has records
    if (!airtableJson.records || airtableJson.records.length === 0) {
        return {
            isValid: false,
            error: 'No session found with ID: ' + sessionId
        };
    }

    // check if the session is locked
    if (airtableJson.records[0].fields.Locked) {
        return {
            isValid: false,
            error: 'Session is locked'
        };
    }

    // check the session date is in the future (means it's not available yet)
    if (new Date(airtableJson.records[0].fields.Date).getTime() > new Date().getTime()) {
        return {
            isValid: false,
            error: 'Session is not available until ' + airtableJson.records[0].fields.Date
        };
    }

    // return the first record (should only be one)
    return {
        isValid: true,
        error: ''
    };
}

type UserRole = 'operator' | 'user' | null;

export async function getUserRole(sessionId: string, passcode: string): Promise<UserRole> {

    const airtableResponse = await fetch('https://api.airtable.com/v0/appf02mGrGJ8nU4Ch/tbllWioxdGbOzMGcw/listRecords', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
        },
        method: 'POST',
        body: JSON.stringify({
            "filterByFormula": `ID='${sessionId}'`,
            "fields": ["OperatorCode", "ParticipantCode"]
        })
    });

    // check if the response is ok
    if (!airtableResponse.ok) {
        throw Error('Error fetching user role from Airtable: ' + airtableResponse.statusText);
    }

    const airtableJson = await airtableResponse.json();

    // check if the response has records
    if (!airtableJson.records || airtableJson.records.length === 0) {
        throw Error('No session found with ID: ' + sessionId);
    }

    // return the type of user by validating the passcode
    // return null if the passcode is invalid
    if (airtableJson.records[0].fields.OperatorCode === passcode) {
        return 'operator';
    } else if (airtableJson.records[0].fields.ParticipantCode === passcode) {
        return 'user';
    } else {
        return null;
    }
}