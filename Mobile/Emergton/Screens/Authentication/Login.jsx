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
import KeyboardAvoid from '../../components/KeyboardAvoid'
const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    return (
        <KeyboardAvoid>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo name="phone-in-talk" />
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
                                    icon="email"
                                    placeholder="john@example.com"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
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
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Login
                                    </ButtonText>
                                </StyledButton>
                                <ExtraView>
                                    <ExtraText>Don't have an account? </ExtraText>
                                    <TextLink onPress={() => navigation.push('SignUp')}>
                                        <TextLinkContent>
                                            Signup
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
