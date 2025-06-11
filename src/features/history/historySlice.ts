import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryRecord {
    id: string;
    timestamp: number;
    originalCommand: string;
    optimizedCommand: string;
    samplesBefore: Array<{ x: number; y: number }>;
    samplesAfter: Array<{ x: number; y: number }>;
}

interface HistoryState {
    records: HistoryRecord[];
}

const initialState: HistoryState = {
    records: [],
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addRecord(state, action: PayloadAction<Omit<HistoryRecord, 'id' | 'timestamp'>>) {
            state.records.push({
                id: Date.now().toString(),
                timestamp: Date.now(),
                ...action.payload,
            });
        },
    },
});

export const { addRecord } = historySlice.actions;
export default historySlice.reducer;