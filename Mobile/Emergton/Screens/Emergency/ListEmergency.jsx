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


    return (
        <ScrollView style={styles.container}>
            {alerts
                .sort((a, b) => b.created_at - a.created_at)
                .map((alert, index) => {

                    let alertBackground = ' ';
                    let iconBg = '';
                    console.log(alert)
                    if (alert.alert_type == 'police') {
                        alertBackground = 'rgb(55, 133, 205)'
                        iconBg = 'rgb(29, 78, 216)'
                    }
                    if (alert.alert_type == 'health') {
                        alertBackground = 'rgba(22, 163, 74, 0.8)'
                        iconBg = 'rgb(21, 128, 61)'
                    }
                    if (alert.alert_type == 'fire') {
                        alertBackground = 'rgba(220, 38, 38, 0.8)'
                        iconBg = 'rgb(185, 28, 28)'
                    }
                    return (
                        <View key={index} style={styles.alertContainer}>
                            <View style={styles.containerTitle}>
                                <View style={styles.containerAlertType}>

                                    <Text style={{fontWeight: 'bold'}}>
                                        Message:
                                    </Text>
                                    <Text style={styles.alertMessage}>{alert.message.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.alertMessage}> {new Date(alert.created_at * 1000).toLocaleDateString()}</Text>
                            </View>
                            <View style={styles.containerAlertType}>
                                <Text style={{fontWeight: 'bold'}}>
                                    Alert type:
                                </Text>
                                <Text style={[styles.alertTitle, { backgroundColor: iconBg, }]}>{alert.alert_type.toUpperCase()}</Text>
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={[styles.alertDescription, { backgroundColor: 'rgb(22, 163, 74)' }]}>{alert.alert_status.toUpperCase()}</Text>
                            </View>
                        </View>
                    )
                })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    alertContainer: {
        margin: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '90%',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 },  
        shadowOpacity: 0.1,
        shadowRadius: 6, 
        elevation: 5,
    },
    alertTitle: {
        fontSize: 15,
        color: 'white',
        borderRadius: 4,
        fontWeight: 'bold',
        padding: 5,
        marginLeft: 10
    },
    alertMessage: {
        fontSize: 15,
        color: 'black',
        marginLeft: 10,

    },
    alertDescription: {
        fontSize: 12,
        marginTop: 5,
        color: '#fff',
        display: 'flex',
        padding: 10,
        borderRadius: 10
    },
    containerDescription: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerAlertType: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default ListEmergency;
