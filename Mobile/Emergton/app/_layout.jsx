import Login from '../Screens/Authentication/Login';
import SignUp from '../Screens/Authentication/SignUp';
import Dashboard from '../Screens/Dashboard/Dashboard';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import  GeoLocation  from '../Screens/Location/GeoLocation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

const RootLayout = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Your Emergency',
            headerRight: () =>
              <Icon name="menu" size={30} 
              />,
            
            headerLeft: null
          }} />
          <Stack.Screen name="GeoLocation" component={GeoLocation}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootLayout;
