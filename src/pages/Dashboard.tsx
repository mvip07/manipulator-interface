import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import {
    setInitialSamples,
    executeCommand,
    resetPosition,
    showNotification,
} from '../features/commands/commandsSlice';
import CommandInput from '../components/Command/CommandInput';
import CommandVisualization from '../components/Command/CommandVisualization';
import { Container, Box } from '@mui/material';
import { addRecord } from '../features/history/historySlice';
import { optimizeCommand } from '../utils/commandOptimizer';

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const { currentPosition, samples, carryingSample } = useSelector(
        (state: RootState) => state.commands
    );
    const [speed, setSpeed] = useState<number>(5);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentCommand, setCurrentCommand] = useState<string>('');
    const [commandIndex, setCommandIndex] = useState<number>(0);

    useEffect(() => {
        const initialSamples = Array.from({ length: 5 }, () => ({
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10),
        }));
        dispatch(setInitialSamples(initialSamples));
    }, [dispatch]);

    const handleCommandSubmit = (command: string) => {
        const optimized = optimizeCommand(command);
        setCurrentCommand(command);
        setCommandIndex(0);
        dispatch(resetPosition());

        dispatch(addRecord({
            originalCommand: command,
            optimizedCommand: optimized,
            samplesBefore: samples.filter(s => !s.collected).map(s => ({ x: s.x, y: s.y })),
            samplesAfter: [],
        }));

        dispatch(showNotification({
            type: 'success',
            message: 'Команда принята и оптимизирована',
        }));
    };

    useEffect(() => {
        if (!isPlaying || !currentCommand || commandIndex >= currentCommand.length) {
            if (isPlaying && currentCommand && commandIndex >= currentCommand.length) {
                setIsPlaying(false);
                const updatedSamples = samples.map(s => ({ x: s.x, y: s.y }));
                dispatch(addRecord({
                    originalCommand: currentCommand,
                    optimizedCommand: optimizeCommand(currentCommand),
                    samplesBefore: samples.filter(s => !s.collected).map(s => ({ x: s.x, y: s.y })),
                    samplesAfter: updatedSamples,
                }));
                dispatch(showNotification({
                    type: 'success',
                    message: 'Команда успешно выполнена',
                }));
            }
            return;
        }

        const timer = setTimeout(() => {
            dispatch(executeCommand(currentCommand[commandIndex]));
            setCommandIndex(prev => prev + 1);
        }, 1000 / speed);

        return () => clearTimeout(timer);
    }, [isPlaying, currentCommand, commandIndex, speed, dispatch, samples]);

    const handlePlay = () => {
        if (!currentCommand) return;

        if (commandIndex >= currentCommand.length) {
            setCommandIndex(0);
            dispatch(resetPosition());
        }
        setIsPlaying(true);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCommandIndex(0);
        dispatch(resetPosition());
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <CommandInput onSubmit={handleCommandSubmit} />

                {currentCommand && (
                    <CommandVisualization
                        position={currentPosition}
                        samples={samples}
                        carryingSample={carryingSample}
                        currentStep={commandIndex}
                        totalSteps={currentCommand.length}
                        speed={speed}
                        isPlaying={isPlaying}
                        onSpeedChange={setSpeed}
                        onPlay={handlePlay}
                        onReset={handleReset}
                    />
                )}
            </Box>
        </Container>
    );
};

export default Dashboard;