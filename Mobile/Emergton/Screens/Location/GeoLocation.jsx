import React, { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Dimensions,
    Alert,
    TouchableOpacity,
    Modal
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import {
    ButtonText, StyledButton, StyledFormArea, TextError,
} from "@/components/styles";
import Icon from "react-native-vector-icons/FontAwesome6";
import SendAlert from '../../src/modal/SendAlert';
import { Formik } from "formik";
import TextInput from "@/components/UserInputs/TextInput";
import * as Yup from "yup";


const MessageSchema = Yup.object().shape({
    message: Yup.string()
        .min(3, "Too Short")
        .max(50, "Too long")
        .required("Message is Required!"),
})
const GeoLocation = ({ navigation, route }) => {

    const mapRef = React.useRef();
    const [pin, setPin] = useState({});
    const [location, setLocation] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

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

    const sendLocation = async (navigation, values) => {
        if (myLocation) {
            try {
                const token = await AsyncStorage.getItem("token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                };
                const data = {
                    alert_type: route.params,
                    message: values.message,
                    latitude: myLocation.latitude,
                    longitude: myLocation.longitude,
                };

                const url = "https://emergeton-api.onrender.com/api/v1/send-alert";

                const response = await axios.post(url, data, { headers });

                console.log(response);

                navigation.push("Dashboard");

            } catch (e) {
                console.error(e.response.data);
            }
            finally{
                setShowMessage(false)
            }
        }

    };

    const focusOnLocation = () => {
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
            <View style={styles.bodyModal}>
                <Modal visible={showMessage} onRequestClose={() => setShowMessage(false)} transparent>
                    <View style={styles.centered_modal}>
                        <View style={styles.modal}>
                            <View style={styles.warning_style}>
                                <Text style={styles.textColor}>Send a Message</Text>
                            </View>
                            <View style={styles.warning_body}>
                                <Formik
                                    initialValues={{ message: '' }}
                                    onSubmit={(values) => {
                                        console.log(route.params)
                                        sendLocation(navigation, values);
                                    }}
                                    validationSchema={MessageSchema}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                        <StyledFormArea>
                                            <TextInput
                                                label="Message"
                                                icon="message"
                                                placeholder="Send alert"
                                                onChangeText={handleChange('message')}
                                                onBlur={handleBlur('message')}
                                                value={values.message}
                                                keyboardType="default"
                                            />
                                            {errors.message && touched.message && (
                                                <TextError>{errors.message}</TextError>
                                            )}
                                            <StyledButton onPress={handleSubmit}>
                                                <ButtonText>Send</ButtonText>
                                            </StyledButton>
                                        </StyledFormArea>
                                    )}
                                </Formik>
                            </View>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setShowMessage(false)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>


            <View style={styles.buttonContainer}>
                <StyledButton onPress={focusOnLocation}>
                    <ButtonText style={{ borderRadius: "100%" }}>
                        <Icon name="location-crosshairs" size={25} />
                    </ButtonText>
                </StyledButton>
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
                {/* <Button title="Submit Alert" onPress={sendLocation} /> */}
                {/* <TouchableOpacity onPress={() => setShowMessage(true)} style={styles.sendAlertBtn}>
                    <Text>Submit Alert</Text>
                </TouchableOpacity> */}
                <StyledButton onPress={() => setShowMessage(true)}>
                    <ButtonText style={{ borderRadius: "100%" }}>
                        Submit Alert
                    </ButtonText>
                </StyledButton>
                {/* <Button style={styles.sendAlertBtn} title="Submit Alert" onPress={() => setShowMessage(true)} /> */}
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
    bodyModal: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centered_modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    modal: {
        width: 300,
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        overflow: 'hidden'
    },
    textColor: {
        color: '#000000',
        fontSize: 20,
        margin: 10,
    },
    warning_body: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    warning_title: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    warning_style: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    warning_body: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    sendButtonText: {
        color: '#000',
        fontSize: 20,
        margin: 10,
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#000',
        alignItems: 'center'
    }, 
    closeButtonText: {
        color: '#000',
        fontSize: 16,
    },
});

export default GeoLocation;
