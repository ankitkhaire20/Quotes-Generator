import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#5dade2',             // Accent color for active tab icons
                tabBarInactiveTintColor: '#b0b0b5',           // Color for inactive tab icons
                tabBarStyle: { backgroundColor: '#1e1e22' },  // Dark background color for the tab bar
                headerStyle: { backgroundColor: '#2a2a2e' },  // Dark gray-blue for header background
                headerTintColor: '#f0f0f3',                   // Light color for header text and icons
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'HomeScreen',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={20} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="QuotesList"
                options={{
                    title: 'Quotes List',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={20} name="list" color={color} />
                }}
            />

            <Tabs.Screen
                name="SettingsScreen"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={20} name="cogs" color={color} />
                }}
            />

        </Tabs>
    )
}
