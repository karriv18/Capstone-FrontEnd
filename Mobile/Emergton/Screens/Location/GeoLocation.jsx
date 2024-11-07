import React, { useEffect, useState, useCallback } from 'react'
import * as Location from 'expo-location';
import { View, Text, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


const GeoLocation = ({navigation}) => {
    // const [longitude, setLongitude] = useState();
    // const [latitude, setLatitude] = useState();

    const [pin, setPin] = useState({});
    const local = {
        latitude: '37.78825',
        longitude: '-122.4324'
    }
    const initialLocation = {
        latitude: 37.78825,
        longitude: -122.4324
    }
    const [myLocation, setMyLocation] = useState(initialLocation);

    useEffect(() => {
        setPin(local)
    }, [])
    useFocusEffect(
        useCallback(() => {
            _getLocation();
        }, [])
    );
    const _getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync()
            console.log(Location)
            if (status !== 'granted'){ 
                Alert.alert('Error','Permission to access location was denied');
                navigation.navigate('Dashboard')
                return;
            } 
            let location = await Location.getCurrentPositionAsync();
            setMyLocation(location.coords)
        } catch (err) {
            console.error(err)
        }
    }

    const focusOnLocation = () => { 

    }
        return (
        <ScrollView>
            <StatusBar style="auto" />
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.4220936,
                    longitude: -122.083922,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider='google'
            >
                {myLocation.latitude && myLocation.longitude && 
                <Marker 
                    coordinate={{
                        latitude: myLocation.latitude,
                        longitude: myLocation.longitude
                    }}
                    title='Default location'
                    description='I am here'
                />}
               {/*  {pin.latitude && pin.longitude && 
                <Marker 
                    coordinate={{
                        latitude: parseFloat(pin.latitude),
                        longitude: parseFloat(pin.longitude)
                    }}
                    title='Default location'
                    description='I am here'
                />
                
                }  */}
            </MapView>
                <View>

                </View>
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
    }, 
    buttonContainer{ 
        
    }
})
export default GeoLocation;