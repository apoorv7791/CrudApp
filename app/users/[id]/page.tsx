// Single User 
import Link from 'next/link'

interface SingleUserProps {
    params: Promise<{
        id: string;
    }>;
}

const SingleUser = async ({ params }: SingleUserProps) => {

    const { id } = await params;
    const response = await fetch(`https://dummyjson.com/users/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    const result = await response.json();

    console.log(result);

    return (
        <div>
            <h1>Welcome User: {id}</h1>
            <h2>Name: {result.firstName} {result.lastName}</h2>
            <h2>Emailt: {result.email}</h2>
            <h2>Gender: {result.gender}</h2>
            <h2>Phone-Number: {result.phone}</h2>
            <h2>Company: {result.company.name}</h2>
            <h2>Title: {result.company.title}</h2>
            <h2>Department: {result.company.department}</h2>

            <Link href={'/dashboard'}>Go Back </Link>
        </div>
    )
}

export default SingleUser;