import { Stack } from "expo-router";
// import { createStackNavigator } from '@react-navigation/stack';

//const Stack = createStackNavigator();

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
export default RootLayout;
