
'use client'
import React from 'react'
import { useEffect, useState } from 'react';

type User = {
    id: number;
    firstName: string;
    lastName: string;
}



export default function dashboard() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch(
                'https://dummyjson.com/users?limit=10'
            );

            const data = await response.json();

            setUsers(data.users);
            console.log(data.users);
        }
        fetchUsers();

    }, []);
    return (

        <div>
            <h1>Welcome to the Dashboard</h1>
            {users.map((user) => (
                <p key={user.id}>{user.firstName}</p>
            ))}
        </div>

    )
}
