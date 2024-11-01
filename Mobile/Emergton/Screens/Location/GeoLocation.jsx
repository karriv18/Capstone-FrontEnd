import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
const GeoLocation = () => {
    const [location, setLocation] = useState(null);
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();

    useEffect(() => {
        const getPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                console.log("Please allow to get permission")
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({})
            setLocation(currentLocation);
            console.log(currentLocation);
        };
        getPermission();
    }, []);

    useEffect(() => {
        if (location) {
            setLongitude(location["coords"].longitude);
            setLatitude(location["coords"].latitude);
        }
    }, [location])

    const submitGeoLoc = async (loc) => {
        let token = await AsyncStorage.getItem('LogInToken');
        try {
            const response = axios.post('https://emergeton-api.onrender.com/api/v1/send-alert',
                {
                    data: {
                        "alert_type": "police",
                        "message": "string",
                        "latitude": "37.4220936",
                        "longitude": "-122.083922",
                    }
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(response, "res")
        } catch (error) {
            console.log(error)
        }
        // const coords = loc.coords;
        // if (loc && coords) {
        //     const { lat, long } = loc.coords;
        //     setLatitude(coords.latitude);
        //     setLongitude(coords.longitude);
        // } else {
        //     console.log("Location is not available");
        // }
    }
    return (
        <ScrollView>
            <StatusBar style="auto" />
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
    }
})
export default GeoLocation;