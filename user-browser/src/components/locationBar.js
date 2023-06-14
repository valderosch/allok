import { View, Image, StyleSheet, Text } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

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
        height: 50,
        width: 370,
        alignSelf: 'center',
    },

    locationIcon: {
        width: 29,
        height: 40,
        opacity: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },

    textBlock: {
        flexDirection: 'column',
        height: 50
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