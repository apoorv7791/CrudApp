
'use client'
// Users Listing

import { useEffect, useState, useCallback, SetStateAction } from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from '@mui/material';
import { useUserStore } from '@/store/userStore';
import { Button } from '@mui/material';
import { Pagination } from '@mui/material';
import { TextField } from '@mui/material';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useAuthStore } from '@/store/authStore';

export default function Dashboard() {
    const users = useUserStore((state) => state.users);
    const loading = useUserStore((state) => state.loading);
    const fetchUsers = useUserStore((state) => state.fetchUsers);
    const [page, setPage] = useState(1);
    const [searchQuerry, setSearchQuerry] = useState('');

    const limit = 10;
    const skip = (page - 1) * limit;
    const total = useUserStore((state) => state.total);

    const handleSearch = useCallback((e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchQuerry(e.target.value);
        setPage(1);
    }, [])

    useEffect(() => {
        console.log('Fetching users:', skip, searchQuerry);
        fetchUsers(skip, searchQuerry);
    }, [fetchUsers, skip, searchQuerry]);


    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/login');
        }
    }, [status, router]);
    if (status === 'loading') {
        return <p>Checking Authentication....</p>
    }
    if (status === 'unauthenticated') {
        return <p>Redirecting to Login....</p>
    }
    return (

        <Paper>
            <h1>Welcome to DashBoard</h1>
            {loading && <p>Loading users.....</p>}

            <TextField
                label="Search Users"
                value={searchQuerry}
                onChange={handleSearch}

            />

            <Link href="/products" style={{ textDecoration: 'none' }}>
                <Button variant="contained">
                    View Products
                </Button>
            </Link>
            <Button
                variant="outlined"
                color="error"
                onClick={() => {
                    useAuthStore.getState().logout();
                    localStorage.removeItem('token');
                    signOut({ callbackUrl: '/login' });
                }}
            >
                Logout
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Company</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Link href={`/users/${user.id}`}>
                                    {user.firstName} {user.lastName}
                                </Link>

                            </TableCell>
                            <TableCell>
                                {user.email}
                            </TableCell>
                            <TableCell>
                                {user.gender}
                            </TableCell>
                            <TableCell>
                                {user.phone}
                            </TableCell>
                            <TableCell>{user.company.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination
                count={Math.ceil(total / limit)}
                page={page}
                onChange={(event, value) => setPage(value)}
            />
        </Paper>

    )
}
