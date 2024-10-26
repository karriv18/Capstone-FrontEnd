import * as Yup from 'yup';
import { Formik } from 'formik';
import React, { useState } from 'react';
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
import { StatusBar } from 'expo-status-bar';
import TextInput from '@/components/UserInputs/TextInput';
import KeyboardAvoid from '../../components/KeyboardAvoid'

const SignupSchema = Yup.object().shape({
    Email: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Enter your email'),
    Password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });
  
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
                            password: '' }}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                        validationSchema={SignupSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
                                <StyledButton onPress={() => navigation.push('Dashboard')}>
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
