"use client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    PayloadAction,
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import authSlice from '../state/auth/authSlice';
import QuotesSlice from '../state/auth/quotesSlice';



const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'quotes'],
}


const rootReducer = combineReducers({
    auth: authSlice,
    quotes: QuotesSlice,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

