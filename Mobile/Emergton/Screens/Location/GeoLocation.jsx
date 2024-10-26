import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';

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
        console.log(location, "25")
    }, []);

    useEffect(() => {
        if (location) {
            setLongitude(location.coords.longitude);
            setLatitude(location.coords.latitude);
            console.log(location, "eto")
            console.log(latitude, longitude);
        }
    }, [location])

    const submitGeoLoc =  (loc) => {
        const coords = loc.coords;
        if (loc && coords) {
            const { lat, long } = loc.coords;
            console.log(lat)
            setLatitude(coords.latitude);
            setLongitude(coords.longitude);

        } else {
            console.log("Location is not available");
        }
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