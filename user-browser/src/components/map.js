import { View, StyleSheet, Button, Image, TouchableOpacity, Dimensions } from "react-native"
import { COLORS } from "../../constants";
import MapView from 'react-native-maps';


const LAT = 48.268591;
const LON = 25.929677;
const DLAT = 0.004;
const DLON = 0.005;
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
                <View style = {styles.buttons}>
                <TouchableOpacity>
                    <Image
                        style = {styles.measureButton}
                        source = {require(`../icons/rangeButton.png`)}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style = {styles.searchButton}
                        source = {require(`../icons/ParkButton.png`)}                
                    />
                </TouchableOpacity>
                </View>
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
        marginTop: 20,
        marginBottom: 90,
        width: 370,
        height:250,
        backgroundColor: COLORS.backgroundColor
    },

    mapview: {
        flex: 1,
        backgroundColor: COLORS.blue,
        justifyContent: 'center',
        minWidth: '50%',
        minHeight: '70%',
        height: 200,
        backgroundColor: COLORS.white,
        borderRadius: 30/2
    },

    map: {
        flex: 1,
        width: "100%",
        height: 200, 
    },

    buttons: {
        width: "95%",
        height: "18%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        position: 'absolute',
        top: 370,
        left: 10,
    },

    measureButton: {
        width: 55,
        height: 55,
        marginTop: 15,
        alignSelf: 'center',
    },

    searchButton: {
        width: 70,
        height: 70,
        alignSelf: 'center',
        borderRadius: 100/2,
    }
});