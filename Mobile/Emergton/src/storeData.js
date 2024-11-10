import AsyncStorage from "@react-native-async-storage/async-storage";

export const dataStore = async (data) => {
  await AsyncStorage.setItem("token", data.token);
  await AsyncStorage.setItem("email", data.email);
  await AsyncStorage.setItem("firstName", data.first_name);
  await AsyncStorage.setItem("lastName", data.last_name);
  await AsyncStorage.setItem("id", data.id);
  await AsyncStorage.setItem("landmark", data.landmark);
};

export const getData = async () => {
  await AsyncStorage.getItem("token");
  await AsyncStorage.getItem("email");
  await AsyncStorage.getItem("firstName");
  await AsyncStorage.getItem("lastName");
  await AsyncStorage.getItem("id");
  await AsyncStorage.getItem("landmark");
};

export const removeData = async () => { 
    AsyncStorage.removeItem('token')
    AsyncStorage.getItem("email");
    AsyncStorage.getItem("firstName");
    AsyncStorage.getItem("lastName");
    AsyncStorage.getItem("id");
    AsyncStorage.getItem("landmark");
}