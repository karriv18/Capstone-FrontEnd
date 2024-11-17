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
import * as Yup from 'yup';

// Update handleRegister to log data and potential errors
const handleRegister = async (navigation, data) => {
    console.log("Form Data: ", data);
    try {
        const response = await axios.post('https://emergeton-api.onrender.com/api/v1/auth/register/resident', {
            first_name: data.first_name,
            last_name: data.last_name,
            contact_number: data.contact_number,
            address: data.address,
            landmark: data.landmark,
            email: data.email,
            password: data.password,
        }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);
        navigation.push('Login')
    } catch (error) {
        console.error("Registration Error: ", error);
    }
};

const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too long')
        .email('Invalid Email!')
        .required('Email is Required!'),
    password: Yup.string()
        .min(8, 'Too Short')
        .max(50, 'Too long')
        .required('Password is Required!'),
    /*     confPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .min(3, 'Too Short')
            .max(50, 'Too long')
            .required('Confirm your Password!'), */
    first_name: Yup.string()
        .min(2, 'Too Short')
        .max(50, 'Too Long')
        .required('First name is Required!'),
    last_name: Yup.string()
        .min(2, 'Too Short')
        .max(50, 'Too Long')
        .required('Last name is Required!'),
    address: Yup.string()
        .min(2, 'Too Short')
        .max(50, 'Too Long')
        .required('Address is Required!'),
    contact_number: Yup.string()
        .matches(/^[0-9]+$/, 'Contact Number must be a number')
        .length(11, 'Contact Number must be valid!')
        .required('Contact Number is Required!'),
});


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
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            contact_number: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            address: '',
                            landmark: ''
                        }}
                        onSubmit={(values) => {
                            // setLoader(true);
                            handleRegister(navigation, values);
                        }}
                        validationSchema={SignUpSchema}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldTouched,
                            values,
                            errors,
                            touched
                        }) => (
                            <StyledFormArea>
                                <TextInput
                                    label="Email Address"
                                    icon="email"
                                    placeholder="john@example.com"
                                    onChangeText={handleChange('email')}
                                    autoCapitalize="none"
                                    onBlur={() => setFieldTouched('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                {errors.email && touched.email && (
                                    <TextError>{errors.email}</TextError>
                                )}
                                <TextInput
                                    label="First Name"
                                    icon="drive-file-rename-outline"
                                    placeholder="First Name"
                                    onChangeText={handleChange('first_name')}
                                    onBlur={handleBlur('first_name')}
                                    value={values.first_name}
                                />
                                {errors.firstname && touched.firstname && (
                                    <TextError>{errors.firstname}</TextError>
                                )}
                                <TextInput
                                    label="Last Name"
                                    icon="drive-file-rename-outline"
                                    placeholder="Last Name"
                                    onChangeText={handleChange('last_name')}
                                    onBlur={handleBlur('last_name')}
                                    value={values.last_name}
                                />
                                {errors.lastname && touched.last_name && (
                                    <TextError>{errors.last_name}</TextError>
                                )}
                                <TextInput
                                    label="Contact Number"
                                    icon="speaker-phone"
                                    placeholder="Contact Number"
                                    onChangeText={handleChange('contact_number')}
                                    onBlur={handleBlur('contact_number')}
                                    value={values.contact_number}
                                    keyboardType="numeric"
                                />
                                {errors.contact_number && touched.contact_number && (
                                    <TextError>{errors.contact_number}</TextError>
                                )}
                                <TextInput
                                    label="Password"
                                    icon="lock-person"
                                    placeholder="********"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    isPassword={true}
                                    hidePassword={!hidePassword}
                                    setHidePassword={setHidePassword}
                                    secureTextEntry={hidePassword}
                                />
                                {errors.password && touched.password && (
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
                                    hidePassword={!hideConfirmPassword}
                                    setHidePassword={setHideConfirmPassword}
                                    secureTextEntry={hideConfirmPassword}
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <TextError>{errors.confirmPassword}</TextError>
                                )}
                                <TextInput
                                    label="Landmark"
                                    icon="landscape"
                                    placeholder="Landmark"
                                    onChangeText={handleChange('landmark')}
                                    onBlur={handleBlur('landmark')}
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
                                {errors.address && touched.address && (
                                    <TextError>{errors.address}</TextError>
                                )}
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Sign up</ButtonText>
                                </StyledButton>
                                <ExtraView>
                                    <ExtraText>Already have an Account? </ExtraText>
                                    <TextLink onPress={() => navigation.push('Login')}>
                                        <TextLinkContent>Login</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoid>
    );
};

export default Signup;
