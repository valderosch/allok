import { Button, TextInput, View, Image, StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../constants";


const Searchbar = () => {
    return(
        <View style={styles.main}>
           <View style = {styles.subBlock} elevation={5}>
                <Image
                    style = {styles.searchIcon}
                    source = {require(`../icons/search-icon.png`)}
                />
                <TextInput placeholder="Search" style = {styles.searchBar}/>
           </View>
            <Button 
                title="MENU"
                style = {styles.menuButton}
            />
        </View>
    )
}
// <Button> <Image/> <Button/> ^^^

export default Searchbar;

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5, 
        marginTop: -70, 
        marginBottom: 20,
        height: 35,
        width: 350,
        
    },

    subBlock: {
        flexDirection: 'row',
        backgroundColor: COLORS.textPrimary,
        borderRadius: 22 / 2,
        width: 280,

        shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 5,
          shadowOpacity: 1.0
    },

    searchIcon: {
        width: 20,
        height: 20,
        opacity: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 8
    },

    searchBar: {
        fontSize: 23,
        fontWeight: '300',
        color: COLORS.textMuted,
    },

    menuButton: {
        width: 50,
        height: 50,
        fontSize: 50,
        color: COLORS.black,
        backgroundColor: COLORS.secondary,
        border: 1,
    }
});