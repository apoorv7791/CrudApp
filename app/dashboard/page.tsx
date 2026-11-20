
'use client'

import { useEffect, } from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from '@mui/material';
import { useUserStore } from '@/store/userStore';




export default function dashboard() {
    const users = useUserStore((state) => state.users);
    const loading = useUserStore((state) => state.loading);
    const fetchUsers = useUserStore((state) => state.fetchUsers);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    return (

        <Paper>
            <h1>Welcome to DashBoard</h1>
            {loading && <p>Loading users.....</p>}
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
                                {user.firstName} {user.lastName}
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
        </Paper>

    )
}
