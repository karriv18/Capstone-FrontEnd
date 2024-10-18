import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { StyledTextInput, LeftIcon, StyledInputLabel, RightIcon } from '../styles'
import { Octicons, Ionicons } from '@expo/vector-icons'
import { Colors } from '../styles'
import Icon from 'react-native-vector-icons/MaterialIcons';

const { brand, darkLight } = Colors;
export default function TextInput({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) {
  return (
    <SafeAreaView>
      <LeftIcon>
        {/* <Octicons name={icon} size={30} color={brand} /> */}
        <Icon name={icon} size={25} color="rgb(55, 133, 205)"  />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)} >
          <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={25} color={darkLight} />
        </RightIcon>
      )}
    </SafeAreaView>
  )
}

