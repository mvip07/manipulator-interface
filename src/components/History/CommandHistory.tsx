import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';

const CommandHistory: React.FC = () => {
    const { records } = useSelector((state: RootState) => state.history);

    if (!records || records.length === 0) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    История выполненных команд
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    На данный момент в истории нет записей
                </Typography>
            </Box>
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
                        {records.map((record) => (
                            <TableRow key={record.id}>
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