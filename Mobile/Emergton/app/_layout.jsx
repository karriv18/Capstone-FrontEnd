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
import ListEmergency from '../Screens/Emergency/ListEmergency';


const RootLayout = () => {


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
              <TouchableOpacity >
                <Icon name="clipboard-list-outline" size={30} />
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
