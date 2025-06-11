import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { useForm } from 'react-hook-form';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
} from '@mui/material';

interface LoginFormData {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const [loading, setLoading] = React.useState(false);

    const onSubmit = (data: LoginFormData) => {
        setLoading(true);
        setTimeout(() => {
            if (data.username === 'admin' && data.password === 'admin') {
                dispatch(loginSuccess(data.username));
                navigate('/dashboard');
            } else {
                alert('Неверное имя пользователя или пароль');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Вход
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Имя пользователя"
                        margin="normal"
                        {...register('username', { required: 'Имя пользователя обязательно' })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        fullWidth
                        label="Пароль"
                        type="password"
                        margin="normal"
                        {...register('password', { required: 'Пароль обязателен' })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Вход'}
                    </Button>
                    <Typography align="center">
                        Пользователь: admin | Пароль: admin
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;