import axios from 'axios'
import Constants from 'expo-constants';

const { devBaseUrl, prodBaseUrl } = Constants.expoConfig.extra;

const baseURL = __DEV__ ? devBaseUrl : prodBaseUrl;

const http = __DEV__ ? 'http://' : 'https://';


export const ADDRESS = baseURL
//export const ADDRESS = '192.168.1.46:8000/'
//export const ADDRESS = 'lan888developer.kz/'


export const ADDRESSNOSLASH = '192.168.1.46:8000'
//export const ADDRESSNOSLASH = 'lan888developer.kz'



const api = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: http + ADDRESS,
    headers: {
        'Content-Type': 'application/json'
    } 
})

export default api
