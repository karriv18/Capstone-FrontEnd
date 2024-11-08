import React from 'react';
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const StatusBarWeight = Constants.statusBarHeight;

// colors
export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#6D28D9',
    green: '#108981',
    red: '#EF4444',
    dark: '#000',
    transparent: '#ffffff00'
};

const { primary, secondary, tertiary, dark, transparent } = Colors;

export const StyledContainer = (props) => (
    <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>
);

export const InnerContainer = (props) => (
    <SafeAreaView style={styles.innerContainer}>{props.children}</SafeAreaView>
);

export const PageLogo = (props) => (

    <View style={{ borderRadius: wp('100%'), borderWidth: 5, padding: 5, color: 'black' }}>
        <Icon size={100} style={{ padding: 20, color: 'black' }} name={props.name} />
    </View>
);
export const PageLogoMui = (props) => (
    <View style={{ backgroundColor: 'rgba(255, 0, 0, .4);', borderColor: 'rgba(255, 0, 0, 0.6);', borderRadius: wp('100%'), borderWidth: 10, padding: 20, }}>
        <Icon size={100} style={{ backgroundColor: 'transparent', color: 'white' }} name={props.name} />
    </View>
);
export const PageTitle = ({ children }) => (
    <Text style={styles.pageTitle}>{children}</Text>
);
export const SubTitle = ({ children }) => (
    <Text style={styles.subTitle}>{children}</Text>
);

export const StyledFormArea = (props) => (
    <SafeAreaView style={styles.formArea}>{props.children}</SafeAreaView>
);

export const StyledTextInput = (props) => (
    <TextInput autoCapitalize={false} style={styles.textInput} {...props} />
);
export const StyledText = ({ children }) => (
    <Text style={{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    }}>{children}</Text>
);
export const StyledName = ({ children }) => (
    <Text style={{
        fontSize: 50,
        color: 'black',
        fontWeight: 'bold',

    }}>{children}</Text>

);
export const StyledInputLabel = ({ children }) => (
    <Text style={styles.inputLabel}>{children}</Text>
);

export const LeftIcon = (props) => (
    <View style={styles.leftIcon}>{props.children}</View>
);

export const RightIcon = (props) => (
    <TouchableOpacity style={styles.rightIcon}>{props.children}</TouchableOpacity>
);

export const StyledButton = ({ onPress, children, disabled }) => (
    <TouchableOpacity style={!disabled ? styles.button : styles.disabledButton} onPress={onPress} disabled={disabled}>
        {children}
    </TouchableOpacity>
);

export const ButtonText = ({ children }) => (
    <Text style={styles.buttonText}>{children}</Text>
);
export const MsgBox = ({ children }) => (
    <Text style={styles.msgBox}>{children}</Text>
);
export const ExtraView = ({ children }) => (
    <SafeAreaView style={styles.extraView}>{children}</SafeAreaView>
);
export const ExtraText = ({ children }) => (
    <Text style={styles.extraText}>{children}</Text>
);
export const TextLink = ({ onPress, children }) => (
    <TouchableOpacity style={styles.textLink} onPress={onPress} >
        {children}
    </TouchableOpacity>
);
export const TextLinkContent = ({ children }) => (
    <Text style={styles.textLinkContent}>{children}</Text>
);

export const TextError = ({ children }) => (
    <Text style={styles.textErrorMessage}>{children}</Text>
);

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        paddingTop: StatusBarWeight + 30,
        backgroundColor: transparent,
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: wp('20%'),
        height: hp('20%'),
    },
    pageTitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: dark,
        padding: 10,
    },
    subTitle: {
        fontSize: 18,
        marginBottom: 20,
        letterSpacing: 1,
        color: tertiary,
    },
    formArea: {
        width: '90%',
    },
    textInput: {
        backgroundColor: secondary,
        padding: 15,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 5,
        fontSize: 16,
        height: 50,
        marginVertical: 3,
        marginBottom: 10,
        color: tertiary,
        borderRadius: 50,
    },
    inputLabel: {
        color: tertiary,
        fontSize: 14,
        textAlign: 'left',
    },
    leftIcon: {
        left: 15,
        top: 33,
        position: 'absolute',
        zIndex: 1,
    },
    rightIcon: {
        right: 15,
        top: 33,
        position: 'absolute',
        zIndex: 1,
    },
    button: {
        padding: 10,
        backgroundColor: 'rgb(55, 133, 205)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 5,
        height: 50,
    },
    disabledButton: { 
        padding: 10,
        backgroundColor: 'rgb(0, 0, 0)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 5,
        height: 50,
    },
    buttonText: {
        color: primary,
        fontSize: 16,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    msgBox: {
        textAlign: 'center',
        fontSize: 13,
    },
    extraView: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    extraText: {
        justifyContent: 'center',
        alignContent: 'center',
        color: Colors.tertiary,
        fontSize: 15,
    },
    textLink: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLinkContent: {
        color: Colors.brand,
        fontSize: 15,
    },
    styledText: {
        color: 'black',
        fontSize: 20,
    },
    textErrorMessage: {
        color: 'red',
        fontSize: 17,
    },
});
