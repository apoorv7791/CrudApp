'use client';
// imports 
import { useState } from 'react';
import type { FormEvent } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getSession } from 'next-auth/react';
import { useAuthStore } from '@/store/authStore';


export default function LoginPage() {
    const router = useRouter();
    // states 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);




    // Login functionality
    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });
            if (result?.error) {
                setError('Ivlaid username and password');
                return;
            }
            const session = await getSession();
            if (!session?.accessToken) {
                setError('Somthing is wrong please try again');
                return;
            }
            useAuthStore.getState().setSession(session);
            localStorage.setItem('token', session.accessToken);
            router.push('/dashboard');
            router.refresh();
        } catch {
            setError('Somthing is wrong please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        // UI rendering 
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#F5F6FA',
                p: 2
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: '100%',
                    maxWidth: 420,
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2.5
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Welcome Back
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            Sign in to your account
                        </Typography>
                    </Box>

                    <TextField
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        fullWidth
                        required
                    />

                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        fullWidth
                        required
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword((previous) => !previous)
                                            }
                                            edge="end"
                                            aria-label="Toggle password visibility"
                                        >
                                            {showPassword
                                                ? <VisibilityOff />
                                                : <Visibility />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? "Signing in...." : "Sign in"}
                    </Button>
                </Box>
            </Paper >
        </Box >
    );
}

