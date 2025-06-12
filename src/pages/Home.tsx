import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Container, Box, Typography, Button, Paper } from '@mui/material';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: 'center' }}>
                <img src={"./logo.png"} width={150} height={150} className="img-fluid rounded-top" alt="Manipulation Interface Logo" />

                <Typography variant="h4" gutterBottom>
                    Система управления манипулятором
                </Typography>
                <Typography variant="subtitle1" paragraph>
                    Интерфейс для управления манипулятором в лаборатории
                </Typography>

                <Box sx={{ mt: 4 }}>
                    {isAuthenticated ? (
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/dashboard')}
                        >
                            Перейти на панель управления
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/login')}
                        >
                            Вход в систему
                        </Button>
                    )}
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Инструкция по использованию
                    </Typography>
                    <Typography variant="body1" align="left" paragraph>
                        <strong>Л</strong> - Движение влево<br />
                        <strong>П</strong> - Движение вправо<br />
                        <strong>В</strong> - Движение вверх<br />
                        <strong>Н</strong> - Движение вниз<br />
                        <strong>О</strong> - Взять образец<br />
                        <strong>Б</strong> - Отпустить образец
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Home;