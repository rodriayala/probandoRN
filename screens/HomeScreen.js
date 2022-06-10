import React,{useState,useRef,useEffect} from 'react'
import { StyleSheet,Button, Text, View,Dimensions ,ScrollView,Image,FlatList,TouchableOpacity,Animated,TextInput} from 'react-native'

import MapView, { PROVIDER_GOOGLE,} from 'react-native-maps'; 
import * as Location from 'expo-location';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { State } from 'react-native-gesture-handler';

import { useTheme } from '@react-navigation/native';

//Tamaño para las cards
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
import { markers } from '../global/data';

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

    ///////////////////
    const theme = useTheme();
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);
    ///////////////////

    const _map = useRef(1);
    

    useEffect(()=>{
        checkPermission();//Verifico los permisos
        getLocation()//Obtengo la localización actual del usuario
        //console.log(latlng)
    ,[]

    ///////////////////    
    mapAnimation.addListener(({ value }) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= markers.length) {
          index = markers.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }
  
        clearTimeout(regionTimeout);
  
        const regionTimeout = setTimeout(() => {
          if( mapIndex !== index ) {
            mapIndex = index;
            const { coordinate } = markers[index];
            _map.current.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: coordinate.latitudeDelta,
                longitudeDelta: coordinate.longitudeDelta,
              },
              350
            );
          }
        }, 10);
      });
      ///////////////////
    })

///////////////////
    const interpolations = markers.map((marker, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          ((index + 1) * CARD_WIDTH),
        ];
    
        const scale = mapAnimation.interpolate({
          inputRange,
          outputRange: [1, 1.5, 1],
          extrapolate: "clamp"
        });
    
        return { scale };
      });
    
      const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;
    
        let x = (markerID * CARD_WIDTH) + (markerID * 20); 
        if (Platform.OS === 'ios') {
          x = x - SPACING_FOR_CARD_INSET;
        }
    
        _scrollView.current.scrollTo({x: x, y: 0, animated: true});
      }

      const _scrollView = React.useRef(null);
///////////////////

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

        {markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../assets/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
   <View style={styles.searchBox}>
        <TextInput 
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex:1,padding:0}}
        />
        
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{ // iOS only
          top:0,
          left:0,
          bottom:0,
          right:20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
   
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
      >
        {markers.map((marker, index) =>(
          <View style={styles.card} key={index}>
            <Image 
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
              
              <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.signIn, {
                    borderColor: '#FF6347',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[styles.textSign, {
                    color: '#FF6347'
                  }]}>Order Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
        

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
    },


    searchBox: {
        position:'absolute', 
        marginTop: Platform.OS === 'ios' ? 40 : 20, 
        flexDirection:"row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf:'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
      },
      chipsScrollView: {
        position:'absolute', 
        top:Platform.OS === 'ios' ? 90 : 80, 
        paddingHorizontal:10
      },
      chipsIcon: {
        marginRight: 5,
      },
      chipsItem: {
        flexDirection:"row",
        backgroundColor:'#fff', 
        borderRadius:20,
        padding:8,
        paddingHorizontal:20, 
        marginHorizontal:10,
        height:35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
      },
      scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
      },
      endPadding: {
        paddingRight: width - CARD_WIDTH,
      },
      card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
      },
      cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
      },
      textContent: {
        flex: 2,
        padding: 10,
      },
      cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
      },
      cardDescription: {
        fontSize: 12,
        color: "#444",
      },
      markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
      },
      marker: {
        width: 30,
        height: 30,
      },
      button: {
        alignItems: 'center',
        marginTop: 5
      },
      signIn: {
          width: '100%',
          padding:5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 3
      },
      textSign: {
          fontSize: 14,
          fontWeight: 'bold'
      }
});