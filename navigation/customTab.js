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
                    else if (route.name === 'Dog') {
                        iconName = 'walk';
                    } else if (route.name === 'Notifications') {
                        iconName = 'notifications-outline';
                    } else if (route.name === 'messages') {
                        iconName = 'mail-unread-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                
            })} >
            <Tab.Screen name="Home" component={HomeScreen} 
            			options={{
							headerShown: false, 
                            title: 'Inicio',               
							}}    
                            />
                            
            <Tab.Screen name="Dog" component={DetailsScreen} options={{ title: 'Paseos Anteriores' }} />
            <Tab.Screen name="Notifications" component={NotificationsScreens} options={{ title: 'Notificaciones' }} />
            <Tab.Screen name="messages" component={NotificationsScreens} options={{ title: 'Mensajes' }} />
        </Tab.Navigator>

    );
}