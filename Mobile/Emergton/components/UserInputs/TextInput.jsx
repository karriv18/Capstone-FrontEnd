import { View, Text } from 'react-native'
import React from 'react'
import { StyledTextInput, LeftIcon, StyledInputLabel, RightIcon } from '../styles'
import { Octicons, Ionicons } from '@expo/vector-icons'
import { Colors } from '../styles'

const { brand, darkLight } = Colors;
export default function TextInput({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {/* {isPassword && (
          <RightIcon onPress={() => setHidePassword(!hidePassword)} style={{ position: 'absolute', right: 15, top: 15 }}>
            <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight} />
          </RightIcon>
        )} */}
    </View>
  )
}