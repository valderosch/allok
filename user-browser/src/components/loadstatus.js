import React from "react"
import { View, Image, StyleSheet, Text } from "react-native";
import { COLORS, SIZES } from "../../constants";

export const LoadStatus = () => {
    const load = ['light', 'middle', 'heavy' ];
    const indication = [COLORS.green, COLORS.yellow, COLORS.red]
    const index = 0;
    
    
    const styles = StyleSheet.create({
        main: {
        flexDirection: 'row',
        height: 50,
        width: 340,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 140,
        },

        indicator_body: {
        width: 30,
        height: 30,
        backgroundColor: COLORS.white,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center',
         shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowRadius: 35,
        shadowOpacity: 1.0,
        shadowColor: COLORS.black,
        },

        indicator_indication: {
        width: 20,
        height: 20,
        backgroundColor: indication[index],
        borderRadius: 25 / 2,
        },

        indicator_text: {
            color: COLORS.black,
            fontSize: 18,
            fontWeight: 700,
            marginLeft: 10
        },
    });

    return(
        <View style={styles.main}>
            <View style={styles.indicator_body}>
                <View style={styles.indicator_indication}></View>
            </View>
            <Text style={styles.indicator_text}>Average load - {load[index]}</Text>
        </View>
    )
}
