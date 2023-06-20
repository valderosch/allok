import { View,  StyleSheet,  Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import Searchbar from './components/searchbar';
import MapBox from './components/map';



const Allok = () => {
    return(
        <View style={styles.main}>
            <MapBox />
        </View>
    )
}

export default Allok ;

const styles = StyleSheet.create({
    main: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        marginTop: 35,
        flexDirection: 'column',
    },
});


