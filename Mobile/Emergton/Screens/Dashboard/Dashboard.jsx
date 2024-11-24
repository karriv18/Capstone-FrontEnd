import { View, Text, ScrollView, Button, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import RescueButton from '../../components/Buttons/RescueButton'

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  PageLogoMui
} from '../../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataStore, getData, removeData } from "../../src/storeData";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const Dashboard = ({ navigation }) => {
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token")
    }
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem("KeepLoggedIn");
        console.log(data, "tanga")
        if (data == null) {
          navigation.navigate("Login");
          return;
        }
      } catch (e) {
        console.log(e)
      }
    }
    const setPermission = async () => { 
      await AsyncStorage.setItem("Permission", JSON.stringify(true));
    }
    getToken();
    getData();
    setPermission();
    
  }, [])


  const Logout = async (navigation) => {
    try {
      await AsyncStorage.setItem("KeepLoggedIn", '');
      console.log(await AsyncStorage.getItem("KeepLoggedIn"))
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      }); 
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("KeepLoggedIn");
      console.log(data == false, "tanga")
      if (data == false) {
        navigation.navigate("Login");
        return;
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <ScrollView>
      <StyledContainer>
        <InnerContainer>
          <PageLogoMui name="alarm-light" />
          <PageTitle>EMERGTON</PageTitle>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RescueButton icon="fire-truck" label="Fire District" onPress={() => navigation.navigate('GeoLocation', "fire")} />
            <RescueButton icon="local-police" label="Police" onPress={() => navigation.navigate('GeoLocation', "police")} />
            <RescueButton icon="medical-services" label="Medical" onPress={() => navigation.navigate('GeoLocation', "health")} />
            <RescueButton icon="logout" label="Logout" onPress={() => Logout(navigation)} />
          </View>
          <TouchableOpacity style={styles.alert_container} onPress={() => navigation.navigate("ListEmergency")}>
            <Text style={{ color: 'white' }}><Icon icon="clipboard-list-outline" ize={75} style={{ color: 'rgba(0, 0, 0, 0.8)' }} /> LIST OF ALERTS</Text>
          </TouchableOpacity>
        </InnerContainer>
      </StyledContainer>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  alert_container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    width: heightPercentageToDP('35%')
  },
})
export default Dashboard;