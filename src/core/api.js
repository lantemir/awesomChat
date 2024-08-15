import axios from 'axios'

//export const ADDRESS = '192.168.1.46:8000/'
export const ADDRESS = 'lan888developer.kz/'


// export const ADDRESSNOSLASH = '192.168.1.46:8000'
export const ADDRESSNOSLASH = 'lan888developer.kz'



const api = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: 'https://' + ADDRESS,
    headers: {
        'Content-Type': 'application/json'
    } 
})

export default api
