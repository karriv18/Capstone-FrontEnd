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
    TextLinkContent
} from '../../components/styles';
import TextInput from '@/components/UserInputs/TextInput';

const Signup = () => {
    const [hidePassword, setHidePassword] = useState(true);
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo source={require('../../assets/images/logo/EmergtonAuth.png')} />
                <PageTitle>EMERGTON</PageTitle>
                <SubTitle>EMERGENCY APP</SubTitle>

                <Formik
                    initialValues={{ fullname: '', email: '', password: '' }}
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
                                label="Full Name"
                                icon="name"
                                placeholder="Full Name"
                                onChangeText={handleChange('fullname')}
                                onBlur={handleBlur('fullname')}
                                value={values.fullname}
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
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Login
                                </ButtonText>
                            </StyledButton>
                            <ExtraView>
                                <ExtraText>Don't have an account? </ExtraText>
                                <TextLink>
                                    Signup
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}


export default Signup;