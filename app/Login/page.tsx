import React from 'react';
import Link from 'next/link';

const Page = () => {
    return (
        <div>
            <main>
                Welcome to Login
            </main>
            <Link href="/">
                Go Back
            </Link>
        </div>
    );
}

export default Page;
