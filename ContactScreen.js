import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailsScreen } from './DetailsScreen';
import { ContactAScreen } from './ContactAScreen';
import { ContactBScreen } from './ContactBScreen';

export function ContactScreen(props: any) {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Contact A"
                component={ContactAScreen} />
            <Stack.Screen
                name="Contact B"
                component={ContactBScreen} />
        </Stack.Navigator>
    );
}