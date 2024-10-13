import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Formik } from 'formik';
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea
} from '../../components/styles';
import TextInput from '@/components/UserInputs/TextInput';

const Login = () => {
    const [hidePassword, setHidePassword]= useState(true);
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo source={require('../../assets/images/logo/EmergtonAuth.png')} />
                <PageTitle>EMERGTON</PageTitle>
                <SubTitle>EMERGENCY APP</SubTitle>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <StyledFormArea>
                            <TextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="john@example.com"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                                />
                            <TextInput
                                label="Password"
                                icon="lock"
                                placeholder="********"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                                secureTextEntry={hidePassword}
                            />

                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}


export default Login;
