import { create } from 'zustand'
import secure from './secure'
import api, { ADDRESS } from './api'
import  utils from '../core/utils'; 

// Socker receive message handler

function responseRequestAccept(set, get, connection) {
    const user = get().user
    // If I was the one that accepted the request, remove
    // request from the requestList
    console.log("responseRequestAcceptUser@@@", user)
    console.log("responseRequestAcceptconnection@@@", connection)
    if(user.user.username === connection.receiver.username) {
        const requestList = [...get().requestList]
        const requestIndex = requestList.findIndex(
            request => request.id === connection.id
        )
        if(requestIndex >=0) {
            requestList.splice(requestIndex, 1)
            set((state) => ({
                requestList: requestList
            }))
        }
    }
}

function responseRequestConnect(set, get, connection) {

    const userdata = get().user
    console.log("responseRequestConnectUSER@", userdata)
    //If i was the one that made the connect request, update the search list now    
    if(userdata.user.username === connection.sender.username){
        const searchList = [...get().searchList]
        const searchIndex = searchList.findIndex( 
            request => request.username === connection.receiver.username
        )
        console.log("searchList!@", searchList)
        console.log("searchIndex@@", searchIndex)
        if(searchIndex >=0) {
            searchList[searchIndex].status = 'pending-them'
            set((state) => ({
                searchList: searchList
            }))
        }

    //If they were the one that sent the connect request add request to request list
    } else {
        const requestList = [...get().requestList]
        const requestIndex = requestList.findIndex(
            request => request.sender.username === connection.sender.username
        )
        if(requestIndex === -1) {
            requestList.unshift(connection)
            set((state) => ({
                requestList: requestList
            }))
        }
    }
}

function responseRequestList(set,get, requestList) {
    
    set((state) => ({
        requestList: requestList
    }))
}

function responseSearch(set, get, data) {
    set((state) => ({
        searchList:data
    }))
}


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
            socket.send(JSON.stringify({
                source: 'request.list',
                type: 'request.list'
            }))
        }
        socket.onmessage = (event) => {
            //utils.log('socket.onmessage')
            //conver data  to javascript object
            const parsed = JSON.parse(event.data)

            //debug log formated data
            utils.log('onmessage:', parsed)
            const response = {
                'request.accept': responseRequestAccept,
                'request.connect': responseRequestConnect,
                'request.list': responseRequestList,
                'search': responseSearch,
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

    //Search
    searchList: null,

    searchUsers: (query) => {
        if(query) {
            const socket = get().socket
            socket.send(JSON.stringify({
                source: 'search',
                query: query,
                type: 'search'
            }))
        } else {
            set((state)=>({
                searchList: null
            }))
        }
    },

     //Requests
     requestList: null,

     requestAccept: (username) => {
        const socket = get().socket
        socket.send(JSON.stringify({
            source: 'request.accept',
            username: username,
            type: 'request.accept',            
        }))
     },

     requestConnect: (username) => {
        const socket = get().socket
        socket.send(JSON.stringify({
            source: 'request.connect',
            username: username,
            type: 'request.connect'            
        }))
     },

    //Thumbnail
    uploadThumbnail: (file) => {
        const socket = get().socket
        socket.send(JSON.stringify({
            source: 'thumbnail',
            base64: file.base64,
            filename: file.fileName,
            type: 'thumbnail'
        }))

    }

}))

export default useGlobal;