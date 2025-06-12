import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
}

const loadAuthFromLocalStorage = (): AuthState => {
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false, user: null };
};

const initialState: AuthState = loadAuthFromLocalStorage();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('auth', JSON.stringify(state));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('auth');
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;