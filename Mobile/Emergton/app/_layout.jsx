import Login from "../Screens/Authentication/Login";
import SignUp from "../Screens/Authentication/SignUp";
import Dashboard from "../Screens/Dashboard/Dashboard";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import GeoLocation from "../Screens/Location/GeoLocation";
import ListEmergency from '../Screens/Emergency/ListEmergency';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


const Stack = createStackNavigator();
const RootLayout = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const getData = async () => {
    const data = await AsyncStorage.getItem("KeepLoggedIn");
    setIsLoggedIn(data === true)
    console.log(data)
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName= {isLoggedIn != true ? "Login" : "Dashboard"}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: "Your Emergency",
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="GeoLocation"
            component={GeoLocation}
            options={{
              title: "Your Location",
            }}
          />
          <Stack.Screen
            name="ListEmergency"
            component={ListEmergency}
            options={{
              title: "List of Emergency"
            }}
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootLayout;
