import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import React, { useState, Text, useEffect } from "react";
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
  TextError,
} from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import user_login from "../../src/users/user_api";
import TextInput from "@/components/UserInputs/TextInput";
import KeyboardAvoid from "../../components/KeyboardAvoid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Alert } from "react-native";
import { dataStore, getData } from "../../src/storeData";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, "Too Short")
    .max(50, "Too long")
    .email("Invalid Email!")
    .required("Email is Required!"),
  password: Yup.string()
    .min(3, "Too Short")
    .max(50, "Too long")
    .required("Password is Required!"),
});

const handleLogin = async (navigation, values, setLoader) => {
  try {
    let token = null;

    const response = await axios.post(
      "https://emergeton-api.onrender.com/api/v1/auth/login",
      {
        email: values.email,
        password: values.password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    token = response.data.data.token;
    let data = response.data.data;

    if (token && response.status == 200) {

      AsyncStorage.setItem("KeepLoggedIn", JSON.stringify(true));

      navigation.push("Dashboard");

      dataStore(data);

      return true;
    }
  } catch (error) {

    Alert.alert("Error!", error.response.data.message);

  } finally {

    setLoader(false)

  }
  return false;
};

const Login = ({ navigation }) => {

  useEffect(() => {
    const checkToken = async () => {
      const token = AsyncStorage.getItem("token");
      if (token._k !== null) {
        navigation.push("Dashboard");
        return;
      }
    };
    checkToken();
  }, [])


  const [hidePassword, setHidePassword] = useState(true);
  const [loader, setLoader] = useState(false);

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
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              setLoader(true);
              handleLogin(navigation, values, setLoader);
            }}
            validationSchema={LoginSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldTouched,
              values,
              errors,
              touched,
            }) => (
              <StyledFormArea>
                <TextInput
                  label="Email Address"
                  icon="email"
                  placeholder="john@example.com"
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors.email && <TextError>{errors.email}</TextError>}
                <TextInput
                  label="Password"
                  icon="lock-person"
                  placeholder="********"
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  value={values.password}
                  isPassword={true}
                  hidePassword={!hidePassword}
                  setHidePassword={setHidePassword}
                  secureTextEntry={hidePassword}
                />
                {errors.password && <TextError>{errors.password}</TextError>}
                <StyledButton onPress={handleSubmit} disabled={loader}>
                  {loader ? (
                    <ActivityIndicator size="small" />
                  ) : (
                    <ButtonText>Login</ButtonText>
                  )}
                </StyledButton>

                <ExtraView>
                  <ExtraText>Don't have an account? </ExtraText>
                  <TextLink onPress={() => navigation.push("SignUp")}>
                    <TextLinkContent>Sign Up</TextLinkContent>
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

export default Login;
