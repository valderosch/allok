import { View, StyleSheet, Button, Image, TouchableOpacity, Dimensions } from "react-native"
import { COLORS } from "../../constants";
import MapView from 'react-native-maps';


const LAT = 48.268591;
const LON = 25.929677;
const DLAT = 0.0072;
const DLON = 0.0070;
// block user scroll and area of view. REFRESH
const Map = () => {
    return(
        <View style = {styles.main}>
            <View style={styles.mapview}>
                <MapView style={styles.map}
                    showsUserLocation
                    followsUserLocation
                    initialRegion={{
                        latitude: LAT,
                        longitude: LON,
                        latitudeDelta: DLAT,
                        longitudeDelta: DLON,
                    }}
                />
            </View>
           
        </View>
    )
}

export default Map; 

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 30,
        marginBottom: 90,
        width: 370,
        height:200,
        backgroundColor: COLORS.primary
    },

    mapview: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        justifyContent: 'center',
        minWidth: '50%',
        minHeight: '70%',
        height: 250,
    },

    map: {
        width: "100%",
        height: "100%"   
    },

    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between"
    },

    measudeButton: {
        width: 55,
        height: 55,
        marginLeft: 10,
        marginTop: 380,
    },

    searchButton: {
        width: 70,
        height: 70,
        alignSelf: 'center',
        marginRight: 10,
        marginTop: 370,
        // borderRadius: 50/2,
    }
});