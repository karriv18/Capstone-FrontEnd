import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ApiManager = axios.create({ 
    baseURL: 'http://127.0.0.1:8000/api/v1', 
    responseType: 'json', 
    withCredentials: true,
})

export default ApiManager;