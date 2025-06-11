import React from 'react';
import { useGetHistoryQuery } from '../../api/commandsApi';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Box,
} from '@mui/material';

const CommandHistory: React.FC = () => {
    const { data: history, isLoading, isError } = useGetHistoryQuery();

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Typography color="error" sx={{ mt: 4 }}>
                Ошибка загрузки истории
            </Typography>
        );
    }

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                История выполненных команд
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Дата</TableCell>
                            <TableCell>Исходная команда</TableCell>
                            <TableCell>Оптимизированная команда</TableCell>
                            <TableCell>Образцы до</TableCell>
                            <TableCell>Образцы после</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history?.map((record, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{new Date(record.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{record.originalCommand}</TableCell>
                                <TableCell>{record.optimizedCommand}</TableCell>
                                <TableCell>
                                    {record.samplesBefore.map((s, i) => (
                                        <div key={i}>({s.x},{s.y})</div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {record.samplesAfter.map((s, i) => (
                                        <div key={i}>({s.x},{s.y})</div>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default CommandHistory;