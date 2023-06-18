import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import * as Location from 'expo-location';
import { useState } from "react";

const city = 'City';
const street = 'Grand.Ave.';
const number = '23A';
const time = 'зараз'
const ScreenHeight = Dimensions.get('screen').height;


const LocationBar = ({ latitude, longitude }) => {
    const [userAddres, setUserAdress] = useState('Street');
    const reverseGeocode = async () => {
        try {
            const reversedGeocodeAddress = await Location.reverseGeocodeAsync({
              latitude,
              longitude,
            });     
            if (reversedGeocodeAddress.length > 0) {
              const { street, streetNumber } = reversedGeocodeAddress[0];
              const formattedAddress = `${street? street : 'on Street'}, ${streetNumber? streetNumber : ''}`;
              console.log('User now at:', formattedAddress);
              setUserAdress(formattedAddress);
            }
          } catch (error) {
            console.log('Reverse geocoding error:', error);
          }
        
          return '';
    }
    reverseGeocode(latitude, longitude);
    
    return(
        <View style={styles.main}>
            <Image
                style = {styles.locationIcon}
                source = {require(`../icons/location.png`)}
            />
            <View style = {styles.textBlock} >
                <Text style={styles.locationText}>{userAddres}</Text>
                <Text style={styles.statusText}>{'Оновлено - ' + time }</Text>
            </View>
        </View>
    )
} 

export default LocationBar;

// Styles
const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        height: ScreenHeight * 0.075,
        top: ScreenHeight * 0.02,
        width: '90%',
        alignSelf: 'center',
    },

    locationIcon: {
        width: 29,
        height: 40,
        opacity: 1,
        marginLeft: 5,
        marginRight: 15,
        marginTop: 5,
    },

    textBlock: {
        flexDirection: 'column',
        height: ScreenHeight *0.075
    },

    locationText: {
        color: COLORS.textSecondary,
        fontSize: SIZES.textPrimary,
        fontWeight: '700',
        
    },

    statusText: {
        fontSize: SIZES.textSecondary,
        color: COLORS.textMuted,
        fontWeight: '700',
        marginLeft: 5,
    } 
});