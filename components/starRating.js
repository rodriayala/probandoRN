import React from 'react';
import { StyleSheet, View, Text,Image } from 'react-native';


const StarRating = (props) => {

    // This array will contain our star tags. We will include this
    // array between the view tag.
    let stars = [];

    //console.log(props.ratings); 
    // Loop 5 times
    for (var i = 1; i <= props.ratings; i++) {

        stars.push((<Image source={require('../assets/star_full.png')}  style={styles.tinyLogo} key={i} />));
    }

    return (
        <View style={ styles.container }>
            { stars }
            <Text style={styles.text}>({props.reviews})</Text>
        </View>
    );
	
}

export default StarRating;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	star: {
		color: '#FF8C00'
	},
	text: {
		fontSize: 12,
        marginLeft: 5,
        color: '#444',
	},
    tinyLogo: {
        width: 10,
        height: 10,
      }
});