import { View, Text, ScrollView } from 'react-native'
import React from 'react'
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

const Dashboard = ({ navigation }) => {

  return (
    <ScrollView>
      <StyledContainer>
        <InnerContainer>
          <PageLogoMui name="alarm-light"/>
          <PageTitle>EMERGTON</PageTitle>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RescueButton icon="fire-truck" label="Fire District" onPress={() => navigation.navigate('GeoLocation', "fire")}/>
            <RescueButton icon="local-police" label="Police" onPress={() => navigation.navigate('GeoLocation', "police")}/>
            <RescueButton icon="medical-services" label="Medical" onPress={() => navigation.navigate('GeoLocation', "health")} />
          </View>
        </InnerContainer>
      </StyledContainer>
    </ScrollView>
  )
}

export default Dashboard;