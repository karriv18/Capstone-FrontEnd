import React, { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { ButtonText, StyledButton } from "@/components/styles";
import Icon from "react-native-vector-icons/FontAwesome6";

const GeoLocation = ({ navigation, route }) => {
  // const [longitude, setLongitude] = useState();
  // const [latitude, setLatitude] = useState();
  const mapRef = React.useRef();
  const [pin, setPin] = useState({});
  const [location, setLocation] = useState(null);

  const local = {
    latitude: "37.78825",
    longitude: "-122.4324",
  };
  const initialLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };
  const [region, setRegion] = useState(null);
  const [myLocation, setMyLocation] = useState(initialLocation);

  useEffect(() => {
    setPin(local);
    focusOnLocation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      _getLocation();
    }, [])
  );

  const _getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(Location);
      if (status !== "granted") {
        Alert.alert("Error", "Permission to access location was denied");
        navigation.navigate("Dashboard");
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setMyLocation(location.coords);
      setLocation(location.coords);
    } catch (err) {
      console.error(err);
    }
  };

  const sendLocation = async () => {
    if (myLocation) {
      try {
        const token = await AsyncStorage.getItem("token");
        let department = String(route.params);
        console.log(token, department);
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        };
        console.log(typeof department)
        const data = {
          alert_type: route.params,
          message: "health test",
          latitude: myLocation.latitude,
          longitude: myLocation.longitude,
        };

        const url = "https://emergeton-api.onrender.com/api/v1/send-alert";

        const response = await axios.post(url, data, { headers });

        console.log(response);
      } catch (e) {
        console.error(e.response.data, "Boto");
      }
    }

    return null;
  };

  const focusOnLocation = () => {
    console.log(route.params, "eto yon");

    if (myLocation.latitude && myLocation.longitude) {
      console.log(myLocation);
      const newRegion = {
        latitude: parseFloat(myLocation.latitude),
        longitude: parseFloat(myLocation.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <StyledButton onPress={focusOnLocation}>
          <ButtonText style={{ borderRadius: "100%" }}>
            <Icon name="location-crosshairs" size={25} />
          </ButtonText>
        </StyledButton>
        {/* <Button title="Submit Alert" onPress={sendLocation} /> */}
      </View>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        ref={mapRef}
        provider="google"
      >
        {myLocation.latitude && myLocation.longitude && (
          <Marker
            coordinate={{
              latitude: myLocation.latitude,
              longitude: myLocation.longitude,
            }}
            title="Default location"
            description="I am here"
          />
        )}
      </MapView>
      <View style={styles.sendAlert}>
        {/* <Button title="Get Location" onPress={focusOnLocation} /> */}
        <Button title="Submit Alert" onPress={sendLocation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100, // Adjust height to ensure button is visible
  },
  buttonContainer: {
    position: "absolute",
    top: 30,
    right: 10,
    zIndex: 1,
  },
  sendAlert: {
    position: "absolute",
    bottom: 20,
    width: "100",
    alignItems: "center",
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default GeoLocation;
