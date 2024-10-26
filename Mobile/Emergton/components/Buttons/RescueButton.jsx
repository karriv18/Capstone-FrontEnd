import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyledContainer } from '../styles';

const RescueButton = ({ label, icon, iconDpt, department, onPress,...props }) => {
    return (
        <SafeAreaView style={{ padding: 4 }}>
            <TouchableOpacity style={styles.button} {...props} onPress={onPress}>
                <View style={styles.icon}>
                    <Icon name={icon} size={75} style={{ color: 'rgba(0, 0, 0, 0.8)' }} />
                </View>
                <View style={styles.view}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
                        {label}
                    </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        height: hp('20%'),
        width: wp('40%'),
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.4)',
        borderWidth: 1,
    },
    view: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
        margin: 0
    },
    icon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(0, 0, 0, 0.4)'
    }

})

export default RescueButton