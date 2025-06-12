import React, { useState, useEffect } from 'react';
import { Paper, Typography, Slider, Box, Button } from '@mui/material';

interface Position {
    x: number;
    y: number;
}

interface Sample {
    x: number;
    y: number;
    collected: boolean;
}

interface CommandVisualizationProps {
    position: Position;
    samples: Sample[];
    carryingSample: boolean;
    currentStep: number;
    totalSteps: number;
    speed: number;
    isPlaying: boolean;
    onSpeedChange: (speed: number) => void;
    onPlay: () => void;
    onReset: () => void;
}

const GRID_SIZE = 10;
const CELL_SIZE = 50;

const CommandVisualization: React.FC<CommandVisualizationProps> = ({
    position,
    samples,
    carryingSample,
    currentStep,
    totalSteps,
    speed,
    isPlaying,
    onSpeedChange,
    onPlay,
    onReset,
}) => {
    const [visibleSamples, setVisibleSamples] = useState<Sample[]>(samples);

    useEffect(() => {
        setVisibleSamples(samples);
    }, [samples]);

    return (
        <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Визуализация манипулятора
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Скорость анимации</Typography>
                <Slider
                    value={speed}
                    onChange={(_, value) => onSpeedChange(value as number)}
                    min={1}
                    max={10}
                    valueLabelDisplay="auto"
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    onClick={onPlay}
                    disabled={isPlaying || !totalSteps}
                >
                    {isPlaying ? 'Выполняется...' : 'Запуск'}
                </Button>
                <Button
                    variant="outlined"
                    onClick={onReset}
                    disabled={!totalSteps}
                >
                    Сброс
                </Button>
            </Box>

            <Box
                sx={{
                    width: GRID_SIZE * CELL_SIZE,
                    height: GRID_SIZE * CELL_SIZE,
                    border: '1px solid #ccc',
                    position: 'relative',
                    backgroundColor: '#f5f5f5',
                }}
            >
                {Array.from({ length: GRID_SIZE }).map((_, row) =>
                    Array.from({ length: GRID_SIZE }).map((_, col) => (
                        <Box
                            key={`${row}-${col}`}
                            sx={{
                                position: 'absolute',
                                left: col * CELL_SIZE,
                                top: row * CELL_SIZE,
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                border: '1px solid #e0e0e0',
                                boxSizing: 'border-box',
                            }}
                        />
                    ))
                )}

                {visibleSamples.map((sample, index) => (
                    !sample.collected && (
                        <Box
                            key={index}
                            sx={{
                                position: 'absolute',
                                left: sample.x * CELL_SIZE + CELL_SIZE / 4,
                                top: sample.y * CELL_SIZE + CELL_SIZE / 4,
                                width: CELL_SIZE / 2,
                                height: CELL_SIZE / 2,
                                borderRadius: '50%',
                                backgroundColor: 'primary.main',
                            }}
                        />
                    )
                ))}

                <Box
                    sx={{
                        position: 'absolute',
                        left: position.x * CELL_SIZE,
                        top: position.y * CELL_SIZE,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        backgroundColor: 'secondary.main',
                        opacity: 0.7,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                    }}
                >
                    {carryingSample && (
                        <Box
                            sx={{
                                width: CELL_SIZE / 3,
                                height: CELL_SIZE / 3,
                                borderRadius: '50%',
                                backgroundColor: 'error.main',
                            }}
                        />
                    )}
                </Box>
            </Box>

            <Typography sx={{ mt: 2 }}>
                Текущая позиция: ({position.x}, {position.y}) |
                Шаг: {currentStep}/{totalSteps} |
                Образцы: {visibleSamples.filter(s => !s.collected).length}
            </Typography>
        </Paper>
    );
};

export default CommandVisualization;