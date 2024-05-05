import { Platform } from "react-native"
import ProfileImage from '../assets/user.png'

// import { ADDRESSNOSLASH } from "./api"

function log () {
    for (let i = 0; i < arguments.length; i++) {
        let arg = arguments[i]
        if(typeof arg === 'object'){
            arg = JSON.stringify(arg, null, 2)
        }
        console.log(arg)
    }
}

function thumbnail(url) {

   
    if(!url) {
        return ProfileImage
    }
    return {
        
        uri: 'http://' + '192.168.1.46:8000' + url
    }
}

export default {log, thumbnail}