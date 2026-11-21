
'use client'

import { useEffect, useState } from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from '@mui/material';
import { useUserStore } from '@/store/userStore';

import { Pagination } from '@mui/material';
import { TextField } from '@mui/material';


export default function Dashboard() {
    const users = useUserStore((state) => state.users);
    const loading = useUserStore((state) => state.loading);
    const fetchUsers = useUserStore((state) => state.fetchUsers);
    const [page, setPage] = useState(1);
    const [searchQuerry, setSearchQuery] = useState('');

    const limit = 10;
    const skip = (page - 1) * limit;
    const total = useUserStore((state) => state.total);

    useEffect(() => {
        fetchUsers(skip, searchQuerry);
    }, [fetchUsers, skip, searchQuerry]);
    return (

        <Paper>
            <h1>Welcome to DashBoard</h1>
            {loading && <p>Loading users.....</p>}
            <TextField
                label="Search Users"
                value={searchQuerry}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                }}

            />
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
            <Pagination
                count={Math.ceil(total / limit)}
                page={page}
                onChange={(event, value) => setPage(value)}
            />
        </Paper>

    )
}
