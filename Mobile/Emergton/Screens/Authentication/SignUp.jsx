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
import KeyboardAvoid from '@/components/KeyboardAvoid';
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
                        initialValues={{ fullname: '', email: '', password: '', confirmPassword: '', address: '', landmark: '' }}
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
                                    label="Full Name"
                                    icon="drive-file-rename-outline"
                                    placeholder="Full Name"
                                    onChangeText={handleChange('fullname')}
                                    onBlur={handleBlur('fullname')}
                                    value={values.fullname}
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
