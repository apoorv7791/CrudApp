import React from 'react';
import Link from 'next/link';
const Page = () => {
  return (
    <div>
      <main>
        hello world
      </main>
      <Link href={"/Login"}>
        Login
      </Link>
    </div>
  );
}

export default Page;
