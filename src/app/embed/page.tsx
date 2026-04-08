export const dynamic = "force-dynamic";
import EmbedClient from '@/components/EmbedClient'; // Added missing slash
import { getSession } from '@/lib/getSession';
import React from 'react';

// Make the component async to handle the session fetch
async function Page() {
    // Await the session to ensure you get the user data
    const session = await getSession();

    return (
        <> 
            <EmbedClient ownerId={session?.user?.id as string} /> 
        </>
    );
}

export default Page;
