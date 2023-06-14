import { Button, TextInput, View, Image, StyleSheet, TouchableOpacity } from "react-native"
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5, 
        marginTop: 10, 
        marginBottom: 20,
        height: 35,
        width: 350,
        
    },

    subBlock: {
        flexDirection: 'row',
        backgroundColor: COLORS.textPrimary,
        borderRadius: 22 / 2,
        width: 290,
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
        width: 42,
        height: 32,
        marginRight: 5,
    }
});