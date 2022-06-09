import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailsScreen } from './DetailsScreen';

export function ContactAScreen(props: any) {

    return (
        <View style={{ ...styles, flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text style={{ fontSize: 40 }}>Contact A Screen</Text>
            <Text style={{ fontSize: 20 }}>Welcome to the Contact A screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});