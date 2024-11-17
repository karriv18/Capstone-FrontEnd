import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyledTextInput, LeftIcon, StyledInputLabel, RightIcon, StyledButton, ButtonText } from '../styles'
import { Octicons, Ionicons } from '@expo/vector-icons'
import { Colors } from '../styles'
import Icon from 'react-native-vector-icons/MaterialIcons';

const { brand, darkLight } = Colors;
const TextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {

  let checkPassword = (hidePassword) => {
    console.log(hidePassword)
  }
  const togglePasswordVisibility = () => {
    setHidePassword(hidePassword);
  };
  return (
    <SafeAreaView>
      <LeftIcon>
        <Icon name={icon} size={25} color="rgb(55, 133, 205)" />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.rightIcon}>
          <Ionicons name={hidePassword ? 'eye' : 'eye-off'} size={25} color={darkLight} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  rightIcon: {
    right: 15,
    top: 33,
    position: 'absolute',
    zIndex: 1,
},
})
export default TextInput;