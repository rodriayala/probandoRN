import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { DetailsScreen } from '../DetailsScreen';
import { HomeScreen } from  '../screens/HomeScreen';
//import Root from '../Roots';
import { NotificationsScreens } from  '../screens/NotificationsScreens';


export function customTab() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName = "ios-home";

                    if(route.name === 'Home') {
                    }
                    else if (route.name === 'Details') {
                        iconName = 'ios-list';
                    } else if (route.name === 'Contact') {
                        iconName = 'ios-call';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                

            })}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} 
            			options={{
							headerShown: false, 
                            title: 'Inicio',               
							}}    />
            <Tab.Screen name="DetailsScreen" component={DetailsScreen} options={{ title: 'Pasos Anteriores' }} />
            <Tab.Screen name="NotificationsScreens" component={NotificationsScreens} options={{ title: 'Notificaciones' }} />
        </Tab.Navigator>

    );
}