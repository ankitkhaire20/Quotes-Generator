"use client";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import React from 'react';
import AppProvider from './AppProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Montserrat_Bold: require('../assets/fonts/Montserrat-Bold.ttf'),
    Montserrat_Regular: require('../assets/fonts/Montserrat-Regular.ttf'),
    Montserrat_SemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    OpenSans_Bold: require('../assets/fonts/OpenSans-Bold.ttf'),
    OpenSans_Regular: require('../assets/fonts/OpenSans-Regular.ttf'),
    OpenSans_SemiBold: require('../assets/fonts/OpenSans-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
    }
  }, [loaded]);

  if (!loaded) {
    return null; // You can return a loading indicator here if needed
  }

  return <AppProvider />; // Render the AppProvider which provides the Redux store to App
}
