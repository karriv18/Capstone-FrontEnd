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

const Dashboard = ({ navigation }) => {
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token")
      console.log(token)
    }
    getToken()
  }, [])
  let logout = async (navigation) => {
    try {
      console.log(await AsyncStorage.getItem("token"))
      navigation.push("Login")
    } catch (error) {
      console.log(error)
    }
  }

  let getRequest = () => {

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
            <RescueButton icon="logout" label="Logout" onPress={() => logout(navigation)} />
          </View>
        </InnerContainer>
          <TouchableOpacity style={styles.alert_container} onPress={() => navigation.navigate("ListEmergency")}>
            <Text style={{color: 'white'}}><Icon icon="clipboard-list-outline" ize={75} style={{ color: 'rgba(0, 0, 0, 0.8)' }} /> LIST OF ALERTS</Text>
          </TouchableOpacity>
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
    borderRadius: 20,
    padding: 10
  },
})
export default Dashboard;