import { create } from 'zustand'
import secure from './secure'
import api, { ADDRESS } from './api'
import  utils from '../core/utils'; 

// Socker receive message handler

function responseThumbnail(set,get, data) {
    set((state) => ({
        user:data
    }))
}


const useGlobal = create((set, get) => ({
 
    //Initializacion
    initialized: false,

    init: async () => {
        const credentials  = await secure.get('credentials')
        if(credentials){

            try{
                const response = await api({
                    method: 'POST',     
                    url: "api/signin/",       
                    data: {
                        username: credentials.username,
                        password: credentials.password
                    }            
                })  
                
                if(response.status !== 200){
                    throw 'Authentification error'
                }

                const user =response.data
                console.log("response.data@@@" , response.data)
                console.log("userINIT@@@" , user)
                const tokens = response.data.tokens

                secure.set('tokens', tokens)
                
                set((state) =>  ({
                    initialized: true,
                    authenticated: true,
                    user: user
                }))           
                return

            } catch (error) {
                console.log('UseGlobal.init', error)
            }        
        }
        set((state) =>({
            initialized: true,
            
        }))

    },



    //Authentication
    authenticated: false,
    user: {},

    login: (credentials, user, tokens) => {
        secure.set('credentials', credentials)
        secure.set('tokens', tokens)
        set((state) =>  ({
            authenticated: true,
            user: user
        }))
    },

    logout: () => {
        //secure.wipe()
        secure.remove('credentials')
        set((state) => ({
            authenticated: false,
           
            user: {}
        }))
    },

    // Websocket
    socket: null,

    socketConnect: async () => {
        const tokens = await secure.get('tokens')

        const socket = new WebSocket(
            `ws://${ADDRESS}chat/?token=${tokens.access}`
        )
        socket.onopen = () => {
            utils.log('socket.onopen')
        }
        socket.onmessage = (event) => {
            //utils.log('socket.onmessage')
            //conver data  to javascript object
            const parsed = JSON.parse(event.data)

            //debug log formated data
            utils.log('onmessage:', parsed)
            const response = {
                'thumbnail': responseThumbnail
            }
            const resp = response[parsed.source]
            if(!resp){
                utils.log('parsed.source "' + parsed.source + ' " not found')
                return
            }
            // call response function
            resp(set, get, parsed.data)
        }
        socket.onerror = () => {
            utils.log('socket.onerror')
        }
        socket.onclose = () => {
            utils.log('socket.onclose')
        }
        set((state) => ({
            socket: socket
        }))



        utils.log('TOKENS', tokens)
    },

    socketClose: () => {
        const socket = get().socket
        if(socket) {
            socket.close()
        }
        set((state) => ({
            socket: null
        }))
    },

    //Thumbnail
    uploadThumbnail: (file) => {
        const socket = get().socket
        socket.send(JSON.stringify({
            source: 'thumbnail',
            base64: file.base64,
            filename: file.fileName
        }))

    }

}))

export default useGlobal;