import React, { useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../utils/Colors";
import { scale } from "react-native-size-matters";
const MapComponent = ({ location, radius, fetchAddress, setLocation }) => {
  const mapRef = useRef(null);
  const initialRegion = {
    latitude: 0, // Replace with your initial latitude
    longitude: 0, // Replace with your initial longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const moveToCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: initialRegion.latitudeDelta,
          longitudeDelta: initialRegion.longitudeDelta,
        };
        mapRef.current.animateToRegion(newRegion, 1000);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: initialRegion.latitudeDelta,
          longitudeDelta: initialRegion.longitudeDelta,
        };
        mapRef.current.animateToRegion(newRegion, 0);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} initialRegion={initialRegion} ref={mapRef}>
        <Circle
          center={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          radius={radius}
          strokeColor="red"
          fillColor={"rgba(200,100,100,0.5)"}
          strokeWidth={2}
        />

        <Marker
          draggable
          onDragEnd={(e) => {
            fetchAddress(e.nativeEvent.coordinate);
            setLocation(e.nativeEvent.coordinate);
            console.log("dragEnd", e.nativeEvent.coordinate);
          }}
          pinColor="blue"
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </MapView>
      <TouchableOpacity
        onPress={moveToCurrentLocation}
        style={styles.LocationBox}
      >
        <MaterialIcons
          name="location-searching"
          color={Colors.Grey}
          size={scale(24)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  LocationBox: {
    position: "absolute",
    bottom: scale(14),
    right: scale(14),
    elevation: 3,
    borderRadius: scale(100),
    backgroundColor: Colors.White,
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
});
export default MapComponent;
