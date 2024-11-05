import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Formik } from 'formik';
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
    TextError

} from '../../components/styles';
import TextInput from '@/components/UserInputs/TextInput';
import KeyboardAvoid from '@/components/KeyboardAvoid';
import axios from 'axios';
import * as Yup from 'yup'
const handleRegister = async (data) => {
    console.log(data)
    // try {
    //     const response = axios.post('https://emergeton-api.onrender.com/api/v1/auth/register/resident',
    //         {
    //             'first_name': 'javo',
    //             'last_name': 'line',
    //             'contact_number': '09999999900',
    //             'address': 'malabon tity',
    //             'landmark': 'kila bonbon',
    //             'email': 'nigers@gmail.com',
    //             'password': 'happyHalloween',
    //         }, {
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     console.log(response)
    // } catch (error) {
    //     console.log(error)
    // }
}

const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too long')
        .email('Invalid Email!')
        .required('Email is Required!'),
    password: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too long')
        .required('Password is Required!'),
    confPassword: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too long')
        .required('Confirm you Password!'),
    firstname: Yup.string()
        .min(2, 'Too Short')
        .max(50, 'Too Long')
        .required('First name is Required!'),
    lastname: Yup.string()
        .min(2, 'Too Short')
        .max(50, 'Too Long')
        .required('Last name is Required!'),
    address: Yup.string()
        .min(2, 'Too Short')
        .max(50, 'Too Long')
        .required('Address is Required!'),
})
const Signup = ({ navigation }) => {
    
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    return (
        <KeyboardAvoid>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>SIGN UP </PageTitle>
                    <SubTitle>Create an Account</SubTitle>

                    <Formik
                        initialValues={{ firstname: '', lastname: '', email: '', password: '', confirmPassword: '', address: '', landmark: '' }}
                        onSubmit={(values) => {
                            // console.log(values)
                            handleRegister(values)
                        }}
                        validationSchema={SignUpSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, setFieldTouched, values, errors, touched }) => (
                            <StyledFormArea>
                                <TextInput
                                    label="Email Address"
                                    icon="email"
                                    placeholder="john@example.com"
                                    onChangeText={handleChange('email')}
                                    autoCapitalize={false}
                                    onBlur={() => setFieldTouched('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                {errors.email && (
                                    <TextError>{errors.email}</TextError>
                                )}
                                <TextInput
                                    label="First Name"
                                    icon="drive-file-rename-outline"
                                    placeholder="First Name"
                                    onChangeText={handleChange('firstname')}
                                    onBlur={handleBlur('firstname')}
                                    value={values.firstname}
                                />
                                {errors.firstname && (
                                    <TextError>{errors.firstname}</TextError>
                                )}
                                <TextInput
                                    label="Last Name"
                                    icon="drive-file-rename-outline"
                                    placeholder="Last Name"
                                    onChangeText={handleChange('lastname')}
                                    onBlur={handleBlur('lastname')}
                                    value={values.lastname}
                                />
                                {errors.lastname && (
                                    <TextError>{errors.lastname}</TextError>
                                )}
                                <TextInput
                                    label="Password"
                                    icon="lock-person"
                                    placeholder="********"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                    secureTextEntry={hidePassword}
                                />
                                {errors.password && (
                                    <TextError>{errors.password}</TextError>
                                )}
                                <TextInput
                                    label="Confirm password"
                                    icon="lock-person"
                                    placeholder="********"
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    isPassword={true}
                                    hidePassword={hideConfirmPassword}
                                    setHidePassword={setHideConfirmPassword}
                                    secureTextEntry={hideConfirmPassword}
                                />
                                {errors.confirmPassword && (
                                    <TextError>{errors.confirmPassword}</TextError>
                                )}
                                <TextInput
                                    label="Landmark"
                                    icon="landscape"
                                    placeholder="Landmark"
                                    onChangeText={handleChange('landmark')}
                                    onBlur={handleBlur('fullname')}
                                    value={values.landmark}
                                />
                                <TextInput
                                    label="Address"
                                    icon="place"
                                    placeholder="Address"
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}
                                    value={values.address}
                                />
                                {errors.address && (
                                    <TextError>{errors.address}</TextError>
                                )}
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Sign Up
                                    </ButtonText>
                                </StyledButton>
                                <ExtraView>
                                    <ExtraText>Already have an Account? </ExtraText>
                                    <TextLink onPress={() => navigation.push('Login')}>
                                        <TextLinkContent>
                                            Login
                                        </TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoid>

    );
}


export default Signup;
