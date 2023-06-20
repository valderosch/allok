import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const icons = ['🔼⏏️⬆️🔄⤴️🔁⏫'];
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const RefreshAll = ({ onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [refreshText, setRefreshText] = useState('Вгору щоб оновити');

  const handlePressIn = () => {
    setRefreshText('Відпустіть для оновлення');
  };

  const handlePressOut = () => {
    setRefreshText('Вгору щоб оновити');
  };

  const handleLayout = (event) => {
    setContainerHeight(event.nativeEvent.layout.height);
  };

  const handleRefresh = () => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      setRefreshText('Оновлення...');
      // Викликати функцію оновлення данних
      onRefresh().then(() => {
        setIsRefreshing(false);
        setRefreshText('Вгору щоб оновити');
      });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handleRefresh}
    >
      <View onLayout={handleLayout} style={styles.main}>
        <Text style = {styles.arrow}>⬆️</Text>
        <Text style = {styles.refreshText}>{refreshText}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        alignSelf: 'center',
        height: ScreenHeight * 0.1,
        width: ScreenWidth * 0.9,
        backgroundColor: COLORS.transparent,
        bottom: -ScreenHeight * 0.17,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: -1,
    },
    arrow: {
        width: ScreenWidth * 0.1,
        height: ScreenWidth * 0.1,
        padding: ScreenWidth * 0.005, 
        fontSize: 25,
        fontWeight: 700,
        textAlign: 'center'
    },
    refreshText: {
        fontSize: 16,
        fontWeight: '500'
    }
});

export default RefreshAll;