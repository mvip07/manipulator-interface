import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../api/authApi';
import {
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
} from '@mui/material';

interface LoginFormData {
    username: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [login, { isLoading }] = useLoginMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data).unwrap();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                Авторизация
            </Typography>
            <TextField
                label="Имя пользователя"
                fullWidth
                margin="normal"
                {...register('username', { required: 'Обязательное поле' })}
                error={!!errors.username}
                helperText={errors.username?.message}
            />
            <TextField
                label="Пароль"
                type="password"
                fullWidth
                margin="normal"
                {...register('password', { required: 'Обязательное поле' })}
                error={!!errors.password}
                helperText={errors.password?.message}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Войти'}
            </Button>
        </Box>
    );
};

export default LoginForm;