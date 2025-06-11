import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommandState {
    currentPosition: { x: number; y: number };
    samples: Array<{ x: number; y: number; collected: boolean }>;
    carryingSample: boolean;
    notification: { type: 'success' | 'error' | 'info'; message: string } | null;
}

const initialState: CommandState = {
    currentPosition: { x: 0, y: 0 },
    samples: [],
    carryingSample: false,
    notification: null,
};

const commandsSlice = createSlice({
    name: 'commands',
    initialState,
    reducers: {
        setInitialSamples(state, action: PayloadAction<Array<{ x: number; y: number }>>) {
            state.samples = action.payload.map(sample => ({
                ...sample,
                collected: false,
            }));
        },
        executeCommand(state, action: PayloadAction<string>) {
            const command = action.payload;
            let newPosition = { ...state.currentPosition };
            let newCarrying = state.carryingSample;
            let newSamples = [...state.samples];

            switch (command) {
                case 'Л':
                    newPosition.x = Math.max(0, state.currentPosition.x - 1);
                    break;
                case 'П':
                    newPosition.x = Math.min(9, state.currentPosition.x + 1);
                    break;
                case 'В':
                    newPosition.y = Math.max(0, state.currentPosition.y - 1);
                    break;
                case 'Н':
                    newPosition.y = Math.min(9, state.currentPosition.y + 1);
                    break;
                case 'О':
                    if (!state.carryingSample) {
                        const sampleIndex = state.samples.findIndex(
                            s => s.x === state.currentPosition.x &&
                                s.y === state.currentPosition.y &&
                                !s.collected
                        );
                        if (sampleIndex >= 0) {
                            newSamples[sampleIndex].collected = true;
                            newCarrying = true;
                        }
                    }
                    break;
                case 'Б':
                    if (state.carryingSample) {
                        newSamples.push({
                            x: state.currentPosition.x,
                            y: state.currentPosition.y,
                            collected: false,
                        });
                        newCarrying = false;
                    }
                    break;
            }

            state.currentPosition = newPosition;
            state.carryingSample = newCarrying;
            state.samples = newSamples;
        },
        resetPosition(state) {
            state.currentPosition = { x: 0, y: 0 };
            state.carryingSample = false;
        },
        showNotification(
            state,
            action: PayloadAction<{ type: 'success' | 'error' | 'info'; message: string }>
        ) {
            state.notification = action.payload;
        },
        clearNotification(state) {
            state.notification = null;
        },
    },
});

export const {
    setInitialSamples,
    executeCommand,
    resetPosition,
    showNotification,
    clearNotification,
} = commandsSlice.actions;

export default commandsSlice.reducer;