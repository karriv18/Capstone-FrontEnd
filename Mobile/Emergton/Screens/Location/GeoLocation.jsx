import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import axios from 'axios';



const GeoLocation = (navigation) => {
    const [location, setLocation] = useState(null);
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();

    useEffect(() => {

        getPermission();
        getlocation();
    }, [location]);

    const getPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log("Please allow to get permission")
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({})
        setLocation(currentLocation);
        // console.log(currentLocation);
    };
    // useEffect(() => {
    //     if (location) {
    //         setLongitude(location["coords"].longitude);
    //         setLatitude(location["coords"].latitude);
    //     }
    // }, [location])
    const getlocation = async () => {
        if (location) {
            setLongitude(location["coords"].longitude);
            setLatitude(location["coords"].latitude);
        }
    }
    const submitGeoLoc = async (loc) => {
        let token = await AsyncStorage.getItem('LogInToken');
        try {
            const response = await axios.post('https://emergeton-api.onrender.com/api/v1/send-alert',
                {
                    "alert_type": "police",
                    "message": "string",
                    "latitude": "37.4220936",
                    "longitude": "-122.083922",
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            console.log(response, "res")
            console.log(longitude, latitude, 'yes')
            const coords = loc.coords;
            if (loc && coords) {
                const { lat, long } = loc.coords;
                setLatitude(coords.latitude);
                setLongitude(coords.longitude);
            } else {
                console.log("Location is not available");
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ScrollView>
            <StatusBar style="auto" />
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider='google'
            >

            </MapView>

                <Button title="Get Coordinates" onPress={() => submitGeoLoc(location)} />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
})
export default GeoLocation;