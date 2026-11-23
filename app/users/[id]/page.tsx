// Single User 
import Link from 'next/link'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Divider
} from '@mui/material';
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
        <Box
            sx={{
                maxWidth: 600,
                mx: 'auto',
                px: 2,
                py: 4
            }}
        >
            <Card elevation={3}>
                <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                    <Typography variant='h5' gutterBottom>
                        User Details
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        User ID: {id}
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        {result.firstName} {result.lastName}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography sx={{ mb: 1 }}>
                        <strong>Gender:</strong> {result.gender}
                    </Typography>

                    <Typography sx={{ mb: 1 }}>
                        <strong>Phone:</strong> {result.phone}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Email:</strong> {result.email}
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Company Information
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Company:</strong> {result.company.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Title:</strong> {result.company.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        <strong>Department:</strong>{result.company.department}
                    </Typography>

                    <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                        <Button variant="contained">
                            Back to Users
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </Box>
    )
}

export default SingleUser;