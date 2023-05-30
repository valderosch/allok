import { View, Image, StyleSheet, Text } from "react-native";
import { COLORS, SIZES } from "../../constants";

const city = 'City';
const street = 'Grand.Ave.';
const number = '23A';
const time = '5 min ago'

const Location = () => {
    return(
        <View style={styles.main}>
            <Image
                style = {styles.locationIcon}
                source = {require(`../icons/location.png`)}
            />
            <View style = {styles.textBlock} >
                <Text style={styles.locationText}>{city + '.' + street + '.' + number}</Text>
                <Text style={styles.statusText}>{'last updated - ' + time }</Text>
            </View>
        </View>
    )
} 

export default Location;

// Styles
const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        flex: 1,
        height: 80
    },

    locationIcon: {
        width: 35,
        height: 50,
        opacity: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5
    },

    textBlock: {
        flexDirection: 'column',
        backgroundColor: COLORS.secondary,
    },

    locationText: {
        color: COLORS.textSecondary,
        fontSize: SIZES.textPrimary,
        fontWeight: '500',
        
    },

    statusText: {
        fontSize: SIZES.textSecondary,
        color: COLORS.textMuted,
        fontWeight: '700',
        marginLeft: 5,
    } 
});