import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity,Text, TouchableWithoutFeedback, Dimensions } from "react-native"
import { COLORS } from "../../constants";
import MapView, { Marker, Polyline } from 'react-native-maps';
import MarkerInfo from './markerinfo';
import Measure from './measure';
import RouteInfo from './route-info';
import LocationBar from './locationBar';
import LoadStatus from './loadstatus';
import RefreshAll from './refresh';
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';
import { decode } from "@mapbox/polyline";
import {apiKey} from './app-info'
import axios from 'axios';


//Default consts
const LAT = 48.268591;
const LON = 25.929677;
const DLAT = 0.007;
const DLON = 0.008;
const mapSettings = require('../../map-settings.json');
const colors = [COLORS.green, COLORS.yellow, COLORS.red, COLORS.uactive];
const distanceValues = [250, 500, 750, 1000, 2000];
const ScreenHeight = Dimensions.get('screen').height;
const PORT2 = '10.0.2.2';
const PORT = '192.168.0.110';

//block user scroll , REDUX and Component MapBOX 
const MapBox = () => {
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [routeData, setRouteData] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [searchDistance, setSearchDistance] = useState(2);
  const [noParkingMessage, setNoParkingMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [region, setRegion] = useState({
    latitude: LAT,
    longitude: LON,
    latitudeDelta: DLAT,
    longitudeDelta: DLON,
  });
    
    // init component
  useEffect(() => {
    fetchMarkers();
  }, []);

    // check location
  useEffect(() => {
        getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1500,
          distanceInterval: 10,
        },
        (location) => {
          setCurrentLocation(location.coords);
          updateRegion(location.coords);
        }
      );
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const updateRegion = (coords) => {
      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: DLAT,
        longitudeDelta: DLON,
      });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMarkers();
    getLocation();
    setRefreshing(false);
  };
    
    // Load markers from server
  const fetchMarkers = async () => {
        try {
            const response = await axios.get(`http://${PORT}:8000/parking-points/`);
            const data = await response.data;
            setMarkers(data);
        } catch (error) {
            console.warn('Markers | GET Request Error:', error);
        }
  };

    //Marker Data binding from server
  const handleMarkerPress = async (markerId, markerLatitude, markerLongitude) => {
        try {
            const response = await axios.get(`http://${PORT}:8000/api/parking-points/${markerId}/point-data/`);
            const data = response.data;
            const currentMarker = {
                ...data,
                latitude: markerLatitude,
                longitude: markerLongitude
            };
            setSelectedMarker(currentMarker);
        } catch (error) {
            console.warn('GET Request Error:', error);
        }
    };

    //Clean screen
    const handleOutsidePress = () => {
      setSelectedMarker(null);
      setNoParkingMessage('');
      // setShowRoute(false);
    };

    // Routes Visibility
    const handleShowRoute = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${latitude},${longitude}&key=${apiKey}`
        );
        const data = response.data;
        setRouteData(data);
        setSelectedMarker(false);
        setShowRoute(true);
        console.log("ROUTE | Getting info \n", data);
        return data;
      } catch (error) {
        console.log('Error getting directions:', error);
        return null;
      }
    };
    // Decode Route Daata
    function decodePolyline(polyline) {
      return decode(polyline);
    }

    const handleCancelRoute = () => {
      setShowRoute(false);
      setRouteData(null);
    };

    //Find nearest
    const handleSearchButtonPress = async () => {
      try {
        const response = await axios.get(
          `http://${PORT}:8000/nearest-parking-point/?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&search_distance=${distanceValues[searchDistance]}`
        );
    
        const data = response.data;
        console.log("GETTED DATA\n", data);
        if (data && Object.keys(data).length > 0) {
          setRouteData(data);
          handleShowRoute(data.latitude, data.longitude);
        } else {
          console.log("Data is Empty...");
          setNoParkingMessage("Поблизу немає парковок...");
        }
      } catch (error) {
        setNoParkingMessage("Поблизу немає парковок...");
        console.log("Error getting nearest parking point:", error);
      }
    };

    // MeasureModal
    const toggleModal = (value) => {
      console.log("Зміна стану модального вікна");
      setModalVisible(!modalVisible);
      setSearchDistance(value);
    };
    // DYnamic styles
    const map_styles = StyleSheet.create({
        mapBox: {
            flex: 1,
            width: "100%",
            height: 450,
        },
        
        marker: {
            width: 25,
            height: 25,
            backgroundColor: colors[selectedMarker ? selectedMarker.status : 3],
            borderRadius: 15 /2,
            display: 'flex',
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
        
        markerText: {
            fontSize: 18,
            fontWeight: '700',
            color: COLORS.white
        },
    })
  
    
  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.main}>
          <LocationBar 
                  latitude={currentLocation?.latitude}
                  longitude={currentLocation?.longitude}
              />
              <View style={styles.mapview}>
                  <MapView style={map_styles.mapBox}
                      customMapStyle={mapSettings} 
                      showsUserLocation
                      followsUserLocation
                      region={region}>
                      {markers.map(marker => (
                          <Marker
                          key={marker.id}
                          coordinate={{
                              latitude: marker.latitude,
                              longitude: marker.longitude
                          }}
                          onPress={() => handleMarkerPress(marker.id, marker.latitude, marker.longitude)}
                          >
                          <View style={[map_styles.marker, { backgroundColor: marker? colors[marker.status] : colors[3] }]}>
                              <Text style={map_styles.markerText}>P</Text>
                          </View>
                          </Marker>
                      ))}
                      {showRoute && routeData && (
                          <Polyline
                          coordinates={decodePolyline(routeData.routes[0].overview_polyline.points).map(point => ({
                            latitude: point[0],
                            longitude: point[1],
                          }))}
                            strokeWidth={4}
                            strokeColor={COLORS.blue}
                          />
                          )}
                  </MapView>
                  {showRoute && (
                    <RouteInfo routeData={routeData} onCancelRoute={handleCancelRoute} />
                  )}
                  <TouchableOpacity activeOpacity={1.0} style={styles.button1} onPress={() =>toggleModal(searchDistance)}>
                          <Image
                          style={styles.measureButton}
                          source={require(`../icons/rangeButton.png`)}
                          />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1.0} style = {styles.button2} onPress={handleSearchButtonPress}>
                          <Image
                          style={styles.searchButton}
                          source={require(`../icons/ParkButton.png`)}
                          />
                    </TouchableOpacity>
                    {/* Повідомлення */}
                    {noParkingMessage ? (
                      <View style={styles.noParkingMessage}>
                        <Text style ={styles.noParkingTitle}>{noParkingMessage}</Text>
                        <Text style = {styles.noParkingSubTitle}>Спробуйте збільшити область видимості 👀</Text>
                        <Text style = {styles.noParkingTitle}>OK</Text>
                      </View>
                    ) : null}
                    <Measure
                      searchDistance={searchDistance}
                      toggleModal={toggleModal}
                      modalVisible={modalVisible}
                    />
                      {selectedMarker && (
                          <MarkerInfo
                              selectedMarker={selectedMarker}
                              latitude={selectedMarker.latitude}
                              longitude={selectedMarker.longitude}
                              allSpaces={selectedMarker.all_spaces}
                              freeSpaces={selectedMarker.free_spaces}
                              status={selectedMarker.status}
                              updatedAt={selectedMarker.updated_at}
                              onShowRoute={handleShowRoute}
                          />
                      )}
              </View>
              <LoadStatus statuses={markers.map((marker) => marker.status)} />
              <RefreshAll onRefresh={onRefresh} />
          </View>
      </TouchableWithoutFeedback>
  )
}

export default MapBox;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  main: {
    flexDirection: 'column',
    marginBottom: 90,
    width: '100%',
    height: ScreenHeight * 0.75,
    top: 0,
    alignSelf: 'center',
    backgroundColor: COLORS.backgroundColor
  },

  mapview: {
    flex: 1,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    minWidth: '50%',
    minHeight: '70%',
    width: '100%',
    top: 10,
    height: ScreenHeight * 0.5,
    backgroundColor: COLORS.white,
  },


  buttons: {
    width: "95%",
    height: "18%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    position: 'absolute',
    top: 370,
    left: 10,
  },

  button1: {
    position: 'absolute',
    left: 20,
    bottom: 10,
  },

  measureButton: {
    width: 55,
    height: 55,
  },

  button2: {
    position: 'absolute',
    right: 20,
    bottom: 20
 },

  searchButton: {
    width: 70,
    height: 70,
    borderRadius: 100 / 2,
  },

  noParkingMessage: {
    position: 'absolute',
    width: '80%',
    height: ScreenHeight * 0.18,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: Dimensions.get('screen').width * 0.05,
    textAlign: "center",
    alignItems: 'center',
    alignSelf: 'center',
    color: "red",
    fontWeight: "bold",
    zIndex: +1,
    justifyContent: 'space-between',
    shadowColor: COLORS.black, 
        shadowOffset: {
          width: 0, 
          height: 2, 
        },
        shadowOpacity: 0.2, 
        shadowRadius: 4, 
        elevation: 4, 
  },
  noParkingTitle: {
    width: '90%',
    height: '30%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  noParkingSubTitle: {
    fontSize: 16,
    height: '45%',
    fontWeight: '400',
    color: COLORS.textMuted
  }

});


