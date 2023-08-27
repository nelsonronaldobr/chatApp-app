import { AuthResponse, InitialStateAuth } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    sessionStatus: 'checking'
} as InitialStateAuth;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.isLoading = true;
        },
        loginError(state) {
            state.isLoading = false;
            state.sessionStatus = 'not-authenticated';
        },
        loginSuccess(state, { payload }: PayloadAction<AuthResponse>) {
            state.user = payload.user;
            state.isLoading = false;
            state.tokenSession = payload.tokenSession;
            localStorage.setItem('tokenSession', payload.tokenSession);
            state.sessionStatus = 'authenticated';
        },
        registerStart(state) {
            state.isLoading = true;
        },
        registerError(state) {
            state.isLoading = false;
        },
        registerSuccess(state) {
            state.isLoading = false;
        },
        logoutStart(state) {
            state.isLoading = false;
            state.tokenSession = null;
            state.sessionStatus = 'not-authenticated';
            state.user = null;
            localStorage.removeItem('tokenSession');
        }
    }
});

export const {
    loginError,
    loginStart,
    loginSuccess,
    registerError,
    registerStart,
    registerSuccess,
    logoutStart
} = authSlice.actions;
//export const authReducer = authSlice.reducer
