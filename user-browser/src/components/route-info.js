import { TouchableOpacity, Image, Modal, View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants';

const ScreenHeight = Dimensions.get('window').height;

const RouteInfo = ({ routeData, onCancelRoute }) => {
    if (!routeData) {
      return null;
    }
  
    const distance = routeData.routes[0].legs[0].distance.text;
    const duration = routeData.routes[0].legs[0].duration.text;

    return (
      <View style = {styles.main}>
        <View style = {styles.infobar}>
            <View style={styles.point_body}>
                <View style={styles.poind}></View>
            </View>
            <Text style = {styles.info_text} numberOfLines={1}> ~ {distance} {duration}</Text>
        </View>
        <TouchableOpacity style={styles.closeblock} onPress={onCancelRoute}>
            <Text style = {styles.closetext}>Cкасувати</Text>
            <View style = {styles.closeButton}>
                <View style={[styles.line, { transform: [{ rotate: '45deg' }] }]} />
                <View style={[styles.line, { transform: [{ rotate: '-45deg' }] }]} />
            </View>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        width: '60%',
        alignSelf: 'center',
        backgroundColor: COLORS.transparent,
        flexDirection: 'column',
        zIndex: 2,
        position: 'absolute',
        top: ScreenHeight * 0.012,
        justifyContent: 'space-between'
    },

    infobar: {
        position: 'absolute',
        width: Dimensions.get('screen').width * 0.45,
        flexDirection: 'row',
        height: Dimensions.get('screen').width * 0.09,
        borderRadius: 20,
        padding: Dimensions.get('screen').width * 0.008,
        backgroundColor: COLORS.halfblacked,
        alignItems: 'center',
        justifyContent: 'center',
    },

    point_body: {
        width: Dimensions.get('screen').width * 0.07,
        height:  Dimensions.get('screen').width * 0.07,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderRadius: 20,
        borderColor: COLORS.white,
        borderWidth: 3,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
    },

    poind : {
        width: '60%',
        height: '60%',
        backgroundColor: COLORS.white,
        borderRadius: 10
    },

    info_text: {
        flex: 1,
        width: '80%',
        height: '90%',
        paddingLeft: '1%',
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 500, 
    },

    closeblock: {
        width: '60%',
        height: ScreenHeight * 0.05,
        backgroundColor: COLORS.halfblacked,
        top: ScreenHeight * 0.65,
        padding: 3,
        borderRadius: ScreenHeight * 0.1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    closetext: {
        width: '75%',
        textAlign: 'center',
        color: COLORS.white,
        fontSize: 17,
        fontWeight: '500',
    },

    closeButton: {
        width: ScreenHeight * 0.04,
        height: ScreenHeight * 0.04,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.transparent,
        shadowColor: COLORS.black,
        shadowOffset: { width: 5, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    line: {
        width: '75%',
        height: 3,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        position: 'absolute',
        transformOrigin: 'center',
    },

});

export default RouteInfo;