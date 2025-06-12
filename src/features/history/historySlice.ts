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

const loadHistoryFromLocalStorage = (): HistoryRecord[] => {
    const savedHistory = localStorage.getItem('history');
    return savedHistory ? JSON.parse(savedHistory) : [];
};

const initialState: HistoryState = {
    records: loadHistoryFromLocalStorage(),
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addRecord(state, action: PayloadAction<Omit<HistoryRecord, 'id' | 'timestamp'>>) {
            const newRecord = {
                id: Date.now().toString(),
                timestamp: Date.now(),
                ...action.payload,
            };
            state.records.push(newRecord);
            localStorage.setItem('history', JSON.stringify(state.records));
        },
    },
});

export const { addRecord } = historySlice.actions;
export default historySlice.reducer;