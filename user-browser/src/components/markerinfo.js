import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import moment from 'moment';


const colors = [COLORS.green, COLORS.yellow, COLORS.red, COLORS.uactive]
const statuses = ['light', 'medium', 'hard', 'no data']

const MarkerInfo = ({ latitude, longitude, allSpaces, freeSpaces, status, updatedAt, onShowRoute }) => {
    const [pointAddres, setPointAdress] = useState('Street');
    let responce = '';
    const now = moment();
    const updated = moment(updatedAt);
    const diffInMinutes = now.diff(updated, 'minutes');
    const diffInHours = now.diff(updated, 'hours');
    if (diffInMinutes < 60) {
        responce = `${diffInMinutes} min ago`;
      } else if (diffInHours < 24) {
        responce = `${diffInHours} hrs ago`;
      } else {
        responce = 'few days'
    };

    const reverseGeocode = async () => {
        try {
            const reversedGeocodeAddress = await Location.reverseGeocodeAsync({
              latitude,
              longitude,
            });     
            if (reversedGeocodeAddress.length > 0) {
              const { street, streetNumber } = reversedGeocodeAddress[0];
              const formattedAddress = `${street? street : 'Not located at the street'} ${streetNumber? streetNumber: ''}`;
              console.log('Picked:', formattedAddress);
              setPointAdress(formattedAddress);
            }
          } catch (error) {
            console.log('Reverse geocoding error:', error);
          }
        
          return '';
    }
    reverseGeocode(latitude, longitude);

    const back = StyleSheet.create({
        main: {
            flex: 1,
            position: 'absolute',
            top: Dimensions.get('window').height * 0.53,
            width: "100%",
            height: Dimensions.get('window').height * 0.5,
            zIndex: 2,
            backgroundColor: colors[colors ? status : 3],
            display: 'flex',
            flexDirection: 'column', 
        },
    })

    return (
        <View style = {back.main}>
            <View style={styles.location_block}>
                <View style={styles.logo}>
                    <View style = {styles.logo_sub}>
                        <Text style={styles.logo_text}>P</Text>
                    </View>
                </View>
                    <Text style = {styles.location_text}>{pointAddres}</Text>
            </View>
            <View style = {styles.content}>
                <View style = {styles.text_block}>
                    <Text style={styles.point_info}>load status : {statuses[status]}</Text>
                    <Text style={styles.point_info}>free : {freeSpaces} / {allSpaces}</Text>
                    <Text style={styles.point_info}>opened : yes</Text>
                    <Text style={styles.point_info}>closes at : 22:00</Text>
                </View>
                <View style = {styles.right}>
                    <Text style = {styles.updated}>{responce}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => onShowRoute(latitude, longitude)}>
                        <View style = {styles.pin}>
                            <View style = {styles.pin_head}></View>
                            <View style = {styles.pin_body}></View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>   
        </View>
    );
};

export default MarkerInfo;

const styles = StyleSheet.create({
    location_block: {
        width: '90%',
        height: 50,
        marginTop: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    logo: {
        width: 45,
        height: 45,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0, 
            height: 2, 
            },
        shadowOpacity: 0.2, 
        shadowRadius: 4, 
        elevation: 4, 
    },

    logo_sub: {
        width: 35,
        height: 35,
        borderRadius: 3,        
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo_text: {
        fontSize: 20,
        fontWeight: 700,
        color: COLORS.white
    },

    location_text: {
        width: "85%",
        height: 35,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        color: COLORS.white,
        fontSize: 25,
        fontWeight: 700,
        textShadowColor: COLORS.uactive,
        textShadowOffset: {width: -0.5, height: 0.7},
        textShadowRadius: 5,
        paddingTop: 5,
    },

    content:{
        width: '90%',
        height: 150,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    text_block: {
        width: '70%',
        height: 150,
        alignSelf: 'center',
        justifyContent: 'flex-end',
    },

    point_info: {
        width: '95%',
        height: 30,
        marginBottom: 3,
        fontSize: 20,
        fontWeight: 700,
        color: COLORS.white,
        textShadowColor: COLORS.uactive,
        textShadowOffset: {width: -0.5, height: 0.7},
        textShadowRadius: 5,
        paddingTop: 5,

    },

    right: {
        width: '25%',
        height: 150,
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },

    updated: {
        width: 90,
        height: 30,
        marginBottom: 10,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        color: COLORS.uactive,
        textAlign: 'center',
        paddingTop: 5,
        fontSize: 16,
        fontWeight: 700,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0, 
            height: 2, 
            },
        shadowOpacity: 0.1, 
        shadowRadius: 2, 
        elevation: 2, 
    },

    button:{
        width: 90,
        height: 90,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 1, 
            height: 2, 
            },
        shadowOpacity: 0.2, 
        shadowRadius: 5, 
        elevation: 5, 
    },

    pin: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        borderColor: COLORS.black,
        borderWidth: 7,
        justifyContent: 'flex-end',
        alignContent: 'center'        
    },

    pin_head: {
        width: 25,
        height: 25,
        borderRadius: 15,
        backgroundColor: COLORS.red,
        borderColor: COLORS.black,
        borderWidth: 5,
        alignSelf: 'center'
    },

    pin_body: {
        width: 5,
        height: 15,
        backgroundColor: COLORS.black,
        alignSelf: 'center'
    },

})