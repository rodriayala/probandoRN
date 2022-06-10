import React,{useState,useRef,useEffect} from 'react'
import { StyleSheet,Button, Text, View,Dimensions ,ScrollView,Image,FlatList,TouchableOpacity} from 'react-native'

import MapView, { PROVIDER_GOOGLE,} from 'react-native-maps'; 
import * as Location from 'expo-location';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { State } from 'react-native-gesture-handler';

//Tamaño para las cards
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

//export function HomeScreen(props: any) {

export function HomeScreen(props: any) {

    const [latlng,setLatLng] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    })


      /*function region( latitude, longitude, latitudeDelta, longitudeDelta )
      {
          this.latitude      = latitude;
          this.longitude     = longitude;
          this.latitudeDelta = latitudeDelta;
          this.longitudeDelta= longitudeDelta;
      }*/

      
    //Verifico si están los permisos necesarios para usar la geolocalización y el mapa
    const checkPermission =async()=>{
        const hasPermission = await Location.requestForegroundPermissionsAsync();
        if(hasPermission.status === 'granted') {
            const permission = await askPermission();
            return permission
        }
        return true
    };
    
    //Pregunto por los permisos
    const askPermission = async()=>{
        const permission = await Location.requestForegroundPermissionsAsync()
        return permission.status === 'granted';
    };
    
    
    const getLocation = async()=>{
        try{
            const {granted} =await Location.requestForegroundPermissionsAsync();

            if(!granted)return;

            const {
                coords:{latitude,longitude},
            } = await Location.getCurrentPositionAsync();
            //lat = latitude;
           
           //var objregion = new region( latitude, longitude, 0.04, 0.04 );
            //console.log(objregion);

            setLatLng({latitude:latitude,longitude:longitude,latitudeDelta: 0.04,
                longitudeDelta: 0.04,})

        }catch(err){
    
        }
    }


    const _map = useRef(1);

    useEffect(()=>{
        checkPermission();//Verifico los permisos
        getLocation()//Obtengo la localización actual del usuario

        //console.log(latlng)
    ,[]})

    //console.log(objregion);
    
    return (
        <View style={{ ...styles, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    
            <MapView 
         
                ref = {_map}
                provider ={PROVIDER_GOOGLE}
                style = {styles.map}
                initialRegion={latlng}
                region={latlng}
                showsUserLocation ={true}
                followsUserLocation = {true}
            />
            <View style={styles.walker}>
                <Text>HOLA JUAN CARLOS</Text>
            </View>
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
    map:{
        width:'100%',
        height:'100%',
       
    },
    walker:{
        position: 'absolute',
        left:     0,
        bottom:      0,
        height: 300, 
        width:'90%', 
        backgroundColor: 'steelblue'     
    }
});