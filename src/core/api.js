import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: 'http://192.168.1.46:8000/',
    headers: {
        'Content-Type': 'application/json'
    } 
})

export default api
