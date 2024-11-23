import React, { useEffect } from 'react';
import { Stack, router, useFocusEffect } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

export default function AuthLayout() {
    const isIntroCompleted = useSelector((state: RootState) => state.auth.isIntroCompleted);

    // Use useFocusEffect and depend on `isIntroCompleted` so the effect runs every time it changes
    useFocusEffect(
        React.useCallback(() => {
            if (isIntroCompleted) {
                router.replace('/login');  // Full path required for Expo Router
            }
        }, [isIntroCompleted]) // Dependency on `isIntroCompleted`
    );

    // If the intro is not completed, render the stack screens for intro and other auth-related screens
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#6200EE',
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{
                title: 'Login',
                headerShown: false
            }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    );
}
