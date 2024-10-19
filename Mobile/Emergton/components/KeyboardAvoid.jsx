import { View, Text, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

const KeyboardAvoid = ({ children }) => {
    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoid;