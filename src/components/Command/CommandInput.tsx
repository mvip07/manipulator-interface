import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { optimizeCommand } from '../../utils/commandOptimizer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addRecord } from '../../features/history/historySlice';
import { showNotification } from '../../features/commands/commandsSlice';
import { TextField, Button, Box, Typography, Paper, CircularProgress, Grid } from '@mui/material';

interface CommandFormData {
    command: string;
}

interface Sample {
    x: number;
    y: number;
}

const CommandInput: React.FC<{ onSubmit: (command: string) => void }> = ({ onSubmit }) => {
    const dispatch = useDispatch();
    const { samples } = useSelector((state: RootState) => state.commands);
    const [isLoading] = useState(false); 
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CommandFormData>();
    const [optimizedCommand, setOptimizedCommand] = useState('');

    const generateRandomSamples = (): Sample[] => {
        return Array.from({ length: 5 }, () => ({
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10)
        }));
    };

    const onFormSubmit = (data: CommandFormData) => {
        const samplesBefore = generateRandomSamples();
        const optimized = optimizeCommand(data.command);
        dispatch(addRecord({
            originalCommand: data.command,
            optimizedCommand: optimized,
            samplesBefore: samplesBefore,
            samplesAfter: samplesBefore,
        }));
        dispatch(showNotification({
            type: 'success',
            message: 'Команда принята и оптимизирована',
        }));
        onSubmit(data.command);
        reset();
        setOptimizedCommand('');
    };

    const handleOptimize = (command: string) => {
        setOptimizedCommand(optimizeCommand(command));
    };

    return (
        <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Ввод команд
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <TextField
                            label="Команды манипулятора"
                            fullWidth
                            multiline
                            rows={4}
                            {...register('command', {
                                required: 'Введите команды',
                                pattern: {
                                    value: /^[ЛПВНОБ]+$/,
                                    message: 'Только команды: Л, П, В, Н, О, Б',
                                },
                            })}
                            error={!!errors.command}
                            helperText={errors.command?.message}
                            onChange={(e) => handleOptimize(e.target.value)}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <TextField
                            label="Оптимизированные команды"
                            fullWidth
                            multiline
                            rows={4}
                            value={optimizedCommand}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading || !optimizedCommand}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Выполнить команды'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default CommandInput;