import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ListEmergency = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Fetch emergency alerts when the component mounts
        const fetchAlerts = async () => {
            const emergency = await getAllEmergency();
            setAlerts(emergency); // Update the state with the fetched alerts
        };
        fetchAlerts();
    }, []);

    // Function to fetch all emergency alerts
    const getAllEmergency = async () => {
        let emergencies = [];
        try {
            const token = await AsyncStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            };
            const response = await axios.get("https://emergeton-api.onrender.com/api/v1/resident-alerts", { headers });
            emergencies = response.data.data; // Store the alert data
        } catch (e) {
            console.log(e);
        }
        return emergencies;
    };

    // Map over the alerts array to render them
    const renderAlerts = () => {
        return alerts.map((alert, index) => (
            <View key={index} style={styles.alertContainer}>
                <Text style={styles.alertTitle}>{alert.alert_status}</Text>
                <Text style={styles.alertDescription}>{alert.alert_type}</Text>
            </View>
        ));
    };

    return (
        <ScrollView style={styles.container}>
           {alerts.map((alert, index) => (
            <View key={index} style={styles.alertContainer}>
                <Text style={styles.alertTitle}>{alert.alert_status}</Text>
                <Text style={styles.alertDescription}>{alert.alert_type}</Text>
            </View>
        ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
  
    },
    alertContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        width: '90%',
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    alertDescription: {
        fontSize: 14,
        marginTop: 5,
        color: '#333',
    },
});

export default ListEmergency;
