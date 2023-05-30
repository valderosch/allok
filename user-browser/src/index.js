import { View, StyleSheet } from 'react-native';
import Location from './components/locationBar';
import Map from './components/map';
import Searchbar from './components/searchbar';



const Allok = () => {

    return(
        <View style={styles.main}>
            <Location/>
            <Map/>
            <Searchbar/>
        </View>
    )
}

export default Allok;

const styles = StyleSheet.create({
    main: {
        marginTop: 60,
        flexDirection: 'column',
    },
});