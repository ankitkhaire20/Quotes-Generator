import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state interface
interface AuthState {
    isIntroCompleted: boolean;
    isLoggedIn: boolean;
    loginData: Object,
}

const initialState: AuthState = {
    isIntroCompleted: false,
    isLoggedIn: false,
    loginData: {},
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        completeIntroduction: (state, action) => {
            state.isIntroCompleted = action.payload;
        },
        // Action to log the user in or out
        userLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        login: (state, action) => {
            state.loginData = action.payload
        }
    },
});

// Export actions for dispatching
export const { completeIntroduction,
    userLoggedIn, login } = authSlice.actions;

// Export the reducer for use in the store
export default authSlice.reducer;
