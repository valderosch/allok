import React from "react"
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { COLORS } from "../../constants";

const LoadStatus = ({statuses}) => {  
    const load = ['легкий', 'середній', 'сильний', 'no information' ];
    const indication = [COLORS.green, COLORS.yellow, COLORS.red, COLORS.uactive]
    
    const calculateMostFrequentStatus = (statuses) => {
        const statusCount = {};
        statuses.forEach((status) => {
          if (statusCount[status]) {
            statusCount[status] += 1;
          } else {
            statusCount[status] = 1;
          }
        });
        
        let mostFrequentStatus = null;
        let maxCount = 0;
        Object.entries(statusCount).forEach(([status, count]) => {
          if (count > maxCount) {
            mostFrequentStatus = status;
            maxCount = count;
          }
        });
        return mostFrequentStatus;
      };


    const loadstatus = calculateMostFrequentStatus(statuses);
    console.log('Cередній рівень завантаженості:',load[loadstatus]);
    

    const styles = StyleSheet.create({
        main: {
        position: 'absolute',
        flexDirection: 'row',
        height: 50,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        top: Dimensions.get('window').height *0.82,
        zIndex: -1,
        },

        indicator_body: {
        width: 30,
        height: 30,
        backgroundColor: COLORS.white,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.black, 
        shadowOffset: {
          width: 0, 
          height: 2, 
        },
        shadowOpacity: 0.2, 
        shadowRadius: 4, 
        elevation: 4, 
        },

        indicator_indication: {
        width: 20,
        height: 20,
        backgroundColor: indication[indication? loadstatus : 3],
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
            <Text style={styles.indicator_text}>Рівень завантаження - {load[load?loadstatus: 3]}</Text>
        </View>
    )
}

export default LoadStatus;