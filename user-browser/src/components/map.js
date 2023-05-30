import { View, StyleSheet, Button, Image, TouchableOpacity } from "react-native"
import { COLORS } from "../../constants";


const Map = () => {
    return(
        <View style = {styles.main}>
            <TouchableOpacity>
                <Image
                    style = {styles.measudeButton}
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
    )
}

export default Map; 

const styles = StyleSheet.create({
    main: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 90,
        marginTop: -150,
        width: 350,
        backgroundColor: COLORS.primary,
    },

    measudeButton: {
        width: 55,
        height: 55,
        marginLeft: 10,
        marginTop: 380
        
    },

    searchButton: {
        width: 70,
        height: 70,
        alignSelf: 'center',
        marginRight: 10,
        marginTop: 370
    }
});