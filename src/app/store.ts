import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import commandsReducer from '../features/commands/commandsSlice';
import historyReducer from '../features/history/historySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        commands: commandsReducer,
        history: historyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;