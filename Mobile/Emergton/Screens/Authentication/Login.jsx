import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import React, { useState, Text } from 'react';
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
import { StatusBar } from 'expo-status-bar';
import user_login from '../../src/users/user_api';
import TextInput from '@/components/UserInputs/TextInput';
import KeyboardAvoid from '../../components/KeyboardAvoid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too long')
        .email('Invalid Email!')
        .required('Email is Required!'),
    password: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too long')
        .required('Password is Required!'),
});
const dataToStore = async (data) => {
    id = data.id
    user_type = data.user_type
    email = data.email
    first_name = data.first_name
    last_name = data.last_name
    token = data.token
}
const handleLogin = async (navigation, data) => {
    try {
        let token = null
        let email = null
        let first_name = null
        let id = null
        const response = await axios.post('https://emergeton-api.onrender.com/api/v1/auth/login', {
            // email: 'test@gmail.com',
            email: 'nigers@gmail.com',
            // password: 'admin123'
            password: 'happyHalloween',
        }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })

        token = response.data.data.token

        if (token) {
            await AsyncStorage.setItem('LogInToken', token);
            console.log(JSON.stringify(response.data.data))
            navigation.push('Dashboard')
        }
    }
    catch (error) {
        console.log(error, "Tanga")
    }
}
const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPaswsword] = useState("");

    return (
        <KeyboardAvoid>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo name="phone-in-talk" />
                    <PageTitle>EMERGTON</PageTitle>
                    <SubTitle>EMERGENCY APP</SubTitle>

                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                        validationSchema={SignupSchema}
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
                                    label="Password"
                                    icon="lock-person"
                                    placeholder="********"
                                    onChangeText={handleChange('password')}
                                    onBlur={() => setFieldTouched('password')}
                                    value={values.password}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                    secureTextEntry={hidePassword}
                                />
                                {errors.password && (
                                    <TextError>{errors.password}</TextError>
                                )}
                                <StyledButton onPress={() => handleLogin(navigation, SignupSchema)}>
                                    <ButtonText>
                                        Login
                                    </ButtonText>
                                </StyledButton>
                                <ExtraView>
                                    <ExtraText>Don't have an account? </ExtraText>
                                    <TextLink onPress={() => navigation.push('SignUp')}>
                                        <TextLinkContent>
                                            Sign Up
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

export default Login;
