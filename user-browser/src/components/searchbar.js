import { Button, TextInput, View, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { COLORS, SIZES } from "../../constants";

const ScreenHeight = Dimensions.get('window').height;
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
           <TouchableOpacity>
                    <Image
                        style = {styles.menuButton}
                        source = {require(`../icons/menu_btn.png`)}                
                    />
            </TouchableOpacity>
        </View>
    )
}
// <Button> <Image/> <Button/> ^^^

export default Searchbar;

const styles = StyleSheet.create({
    main: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: ScreenHeight * 0.08,
        width: '90%',
        position: 'absolute',
        bottom: 0,
        zIndex: -1       
    },

    subBlock: {
        flexDirection: 'row',
        backgroundColor: COLORS.textPrimary,
        borderRadius: 22 / 2,
        width: '84%',
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
        fontWeight: '400',
        width: '80%',
        color: COLORS.textMuted,
    },

    menuButton: {
        width: 42,
        height: 32,
        marginRight: 5,
    }
});