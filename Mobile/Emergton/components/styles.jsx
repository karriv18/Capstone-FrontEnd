import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

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
    <View style={styles.container}>{props.children}</View>
);

export const InnerContainer = (props) => (
    <View style={styles.innerContainer}>{props.children}</View>
);

export const PageLogo = (props) => (
    <Image style={styles.logo} source={props.source} resizeMode="cover" />
);

export const PageTitle = ({ children }) => (
    <Text style={styles.pageTitle}>{children}</Text>
);

export const SubTitle = ({ children }) => (
    <Text style={styles.subTitle}>{children}</Text>
);

export const StyledFormArea = (props) => (
    <View style={styles.formArea}>{props.children}</View>
);

export const StyledTextInput = (props) => (
    <TextInput style={styles.textInput} {...props} />
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

export const StyledButton = ({ onPress, children }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
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
    <View style={styles.extraView}>{children}</View>
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
        width: 200,
        height: 200,
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
        height: 60,
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
        top: 38,
        position: 'absolute',
        zIndex: 1,
    },
    rightIcon: {
        right: 15,
        top: 38,
        position: 'absolute',
        zIndex: 1,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.brand,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 5,
        height: 60,

    },
    buttonText: {
        color: primary,
        fontSize: 16,
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
    }
});
