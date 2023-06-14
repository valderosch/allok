import {View, Text, Alert, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, useColorScheme} from 'react-native';
import React, { useState, useEffect } from 'react';
import Location from './components/locationBar';
import Map from './components/map';
import Searchbar from './components/searchbar';
import { LoadStatus } from './components/loadstatus';



const Allok = () => {

    const loadData = async() => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted'){
            Alert.alert('Location Error','Location Permission denied! \nPlease give this app permission.');
            await Location.requestForegroundPermissionsAsync();
        }

        const location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    }

    return(
        <View style={styles.main}>
            <Location/>
            <Map/>
            <LoadStatus/>
            <Searchbar/>
        </View>
    )
}

export default Allok;

const styles = StyleSheet.create({
    main: {
        height: "93%",
        width: 380,
        marginTop: 30,
        flexDirection: 'column',
    },
});