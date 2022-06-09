import React from 'react';
import { View, Button, Text, StyleSheet, SafeAreaView } from 'react-native';


export function NotificationsScreens(props: any) {

    return (
        <View style={{ ...styles, flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text style={{ fontSize: 40 }}>ACA </Text>
            <Text style={{ fontSize: 20 }}>VAN LAS Notificaciones</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});