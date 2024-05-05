import axios from 'axios'

export const ADDRESS = '192.168.1.46:8000/'

export const ADDRESSNOSLASH = '192.168.1.46:8000'

const api = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: 'http://' + ADDRESS,
    headers: {
        'Content-Type': 'application/json'
    } 
})

export default api
