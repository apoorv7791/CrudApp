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

export default function LoginPage() {
    // states 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Login functionality
    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Temporary: authentication will be added next.
        console.log('Login form submitted');
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
                        label="Email Address"
                        type="email"
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

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                    >
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

