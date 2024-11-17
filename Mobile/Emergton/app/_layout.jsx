import Login from "../Screens/Authentication/Login";
import SignUp from "../Screens/Authentication/SignUp";
import Dashboard from "../Screens/Dashboard/Dashboard";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import GeoLocation from "../Screens/Location/GeoLocation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
const Stack = createStackNavigator();
import { removeData } from "@/src/storeData";



const RootLayout = () => {
  let remove = async () => { 
    try{ 
      await removeData();
    } catch(error){ 
      console.log(error);
    }

  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
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
            headerRight: () => (
              <TouchableOpacity onPress={() => remove()}>
                <Icon name="logout" size={30} />
              </TouchableOpacity>
            ),

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootLayout;
