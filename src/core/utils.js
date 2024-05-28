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

function formatTime (date) {
    if(date === null) {
        return '-'
    }
    const now = new Date()
    const s = Math.abs(now - new Date(date)) / 1000
    // Seconds
    if(s<60) {
        return 'now'
    }
    // Minutes
    if( s < 60*60) {
        const m = Math.floor(s / 60)
        return `${m}m ago`
    }
    //hours
    if(s < 60*60*24){
        const h = Math.floor(s/ (60*60))
        return `${h}h ago`
    }
    // Days
    if(s < 60*60*24*7){
        const d = Math.floor(s/ (60*60*24))
        return `${d}d ago`
    }
    // Weeks
    if(s < 60*60*24*7*4){
        const w = Math.floor(s/ (60*60*24*7))
        return `${w}w ago`
    }
    // Year
    if(s < 60*60*24*7*4){
        const y = Math.floor(s/ (60*60*24*365))
        return `${y}y ago`
    }
}

export default {log, thumbnail, formatTime}