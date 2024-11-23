import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'; // Use Redux state
import { Stack, useRouter } from 'expo-router'; // Use expo-router for navigation
import { RootState } from './state/store';

export default function RootLayout() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);
    console.log("isAuthenticated--", isAuthenticated);

    const router = useRouter();  // Use router for navigation


    // Log the authentication status
    useEffect(() => {
        console.log("Authentication Status: ", isAuthenticated);

        if (isAuthenticated) {
            router.replace('/(tabs)');  // Navigate to the tabs if authenticated
        } else {
            router.replace('/(auth)');  // Navigate to auth screens if not authenticated
        }
    }, [isAuthenticated, router]);


    return (
        <Stack screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="(tabs)"
                    options={{ headerShown: false }}
                />
            ) : (
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            )}
        </Stack>
    );
}
