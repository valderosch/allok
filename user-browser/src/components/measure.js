import React, { useState } from 'react';
import { TouchableOpacity, Image, Modal, View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants';
import Slider from '@react-native-community/slider';

const ScreenHeight = Dimensions.get('screen').height;

const Measure = ({ searchDistance, toggleModal, modalVisible }) => {
    const [sliderValue, setSliderValue] = useState(searchDistance);

    const handleSliderChange = (value) => {
        setSliderValue(value);
    };

    const handleModalClose = () => {
        toggleModal(sliderValue);
    };

    const formatDistanceText = (value) => {
        if (value < 1000) {
          return `${value}м`;
        } else {
          const km = value / 1000;
          return `${km}км`;
        }
    };

    const renderCustomTicks = () => {
        return (
          <View style={styles.customTicksContainer}>
            <View style={styles.tick} />
            <View style={styles.tick} />
            <View style={styles.tick} />
            <View style={styles.tick} />
            <View style={styles.tick} />
          </View>
        );
      };

    return (
        <View>
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style = {styles.titleBar}>
                            <View style ={styles.modalText}>
                                <Text style={styles.modalTitle}>Відстань пошуку</Text>
                                <Text style={styles.modalSubtext}>Радіус зони пошуку</Text>
                            </View>
                            <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
                                <View style={[styles.line, { transform: [{ rotate: '45deg' }] }]} />
                                <View style={[styles.line, { transform: [{ rotate: '-45deg' }] }]} />
                            </TouchableOpacity>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={4}
                            step={1}
                            value={sliderValue}
                            onValueChange={handleSliderChange}
                            minimumTrackTintColor="#007bff"
                            maximumTrackTintColor="#000000"
                            thumbTintColor="#007bff"
                            renderTicks={renderCustomTicks}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{formatDistanceText(250)}</Text>
                            <Text style={styles.text}>{formatDistanceText(500)}</Text>
                            <Text style={styles.text}>{formatDistanceText(750)}</Text>
                            <Text style={styles.text}>{formatDistanceText(1000)}</Text>
                            <Text style={styles.text}>{formatDistanceText(2000)}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        height: ScreenHeight * 1.2,
        width: Dimensions.get('window').width,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: -ScreenHeight * 0.2,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    modalContent: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 15,
        width: '80%',
        height: ScreenHeight * 0.2,
    },


    titleBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '36%',
    },

    modalText: {
        width: '75%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: 500,
        color: COLORS.textSecondary
    },

    modalSubtext: {
        fontSize: 14,
        fontWeight: 400,
        marginBottom: 3,
        color: COLORS.textMuted,
    },

    closeButton: {
        right: 0,
        top: 0,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        width: '90%',
        height: 3,
        borderRadius: 3,
        backgroundColor: COLORS.textMuted,
        position: 'absolute',
        transformOrigin: 'center',
    },

    sliderContainer: {
        marginTop: 20,
        backgroundColor: COLORS.blue
    },
    sliderLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    slider: {
        width: '100%',
        height: '30%',
        marginTop: '5%', 
    },

    customTicksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:0,
    },
    tick: {
        width: 5,
        height: 10,
        backgroundColor: COLORS.textMuted,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '30%',
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        color: COLORS.textMuted,
        fontWeight: 500
    },

    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: '#007bff',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Measure;











