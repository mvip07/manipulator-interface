import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import commandsReducer from '../features/commands/commandsSlice';
import historyReducer from '../features/history/historySlice';
import { authApi } from '../api/authApi';
import { commandsApi } from '../api/commandsApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        commands: commandsReducer,
        history: historyReducer,
        [authApi.reducerPath]: authApi.reducer,
        [commandsApi.reducerPath]: commandsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, commandsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;