import { View, Text, ScrollView } from 'react-native'
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

const Dashboard = ({ navigation }) => {
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token")
      
      if (token === null){ 
        navigation.push("Login")
        // console.log(token === null)
      }
    }
    getToken()
  }, [])
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
          </View>
        </InnerContainer>
      </StyledContainer>
    </ScrollView>
  )
}

export default Dashboard;