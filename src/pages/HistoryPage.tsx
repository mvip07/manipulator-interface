import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
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
    Chip,
} from '@mui/material';
import { format } from 'date-fns';

const HistoryPage: React.FC = () => {
    const { records } = useSelector((state: RootState) => state.history);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                История выполненных команд
            </Typography>

            {records.length === 0 ? (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    На данный момент в истории нет записей
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Дата</TableCell>
                                <TableCell>Исходная команда</TableCell>
                                <TableCell>Оптимизированная</TableCell>
                                <TableCell>Образцы (до)</TableCell>
                                <TableCell>Образцы (после)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>
                                        {format(new Date(record.timestamp), 'dd.MM.yyyy HH:mm')}
                                    </TableCell>
                                    <TableCell>{record.originalCommand}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={record.optimizedCommand}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {record.samplesBefore.map((sample, i) => (
                                            <div key={i}>({sample.x}, {sample.y})</div>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        {record.samplesAfter.map((sample, i) => (
                                            <div key={i}>({sample.x}, {sample.y})</div>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default HistoryPage;