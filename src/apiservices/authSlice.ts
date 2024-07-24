import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User type
export interface User {
    id: string;
    username: string;
    email: string;
    contact_phone: string;
    email_verified: boolean;
    role: string;
}

// Define the AuthResponse type
export interface AuthResponse {
    user: User;
    token: string;
}

// Define the AuthState type
export interface AuthState {
    user: User | null;
    token: string | null;
}

// Initial state
const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            { payload: { token, user } }: PayloadAction<AuthState>
        ) => {
            state.token = token;
            state.user = user;
            localStorage.setItem('token', token || '');
            localStorage.setItem('user', JSON.stringify(user)); // Store user data
        },
        updateUserProfile: (
            state,
            { payload: user }: PayloadAction<Partial<User>>
        ) => {
            if (state.user) {
                state.user = { ...state.user, ...user };
                localStorage.setItem('user', JSON.stringify(state.user)); // Update user data
            }
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user'); // Clear user data
        },
    },
});

export const { setCredentials, updateUserProfile, logout } = authSlice.actions;

export default authSlice.reducer;
