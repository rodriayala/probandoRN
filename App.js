import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/*
import { MainScreen } from './MainScreen';

import Root from './Roots';


const Stack = createNativeStackNavigator();


export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={MainScreen} />
				<Stack.Screen name="Root" component={Root} />
			</Stack.Navigator>
		</NavigationContainer>

	);
}
*/
const Drawer = createDrawerNavigator();
import { ProfileScreen } from './ProfileScreen';
import { SettingsScreen } from './SettingsScreen';
import { customTab } from './navigation/customTab';


export default function App() {
	
	return ( //Tengo que modificar el titulo de la app, agregar logo, poner imagen del usuario y nombre
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Inicio">
				<Drawer.Screen name="Inicio" component={customTab} 
				/>
				<Drawer.Screen name="Mi Perfil" component={SettingsScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
