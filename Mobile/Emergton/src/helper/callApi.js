import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/';

export const callApi = async (method, url, data) => {
    const token = await AsyncStorage.getItem('token');

    const headers = { 
        'Authorization': `Token ${token}`, 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    return axios({ 
        method,
        url, 
        data,
        headers
    })
}