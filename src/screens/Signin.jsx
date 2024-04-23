
import { useLayoutEffect, useState } from "react";
import { Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, KeyboardAvoidingView } from "react-native";
import Title from "../common/Title";
import { useFonts } from 'expo-font';
import Input from "../common/Input";
import Button from "../common/Button";
import api from "../core/api";

import  utils from '../core/utils'; 




function SignInScreen ({navigation}) {

    const [username, setUsername] = useState('')
    const [password, setpassword] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setpasswordError] = useState('')
 
    useLayoutEffect(() =>{
        navigation.setOptions(
            {
                headerShown: false
            }
        )
    },[])

    const [fontsLoaded] = useFonts({
        'LeckerliOne-Regular': require('../assets/fonts/LeckerliOne-Regular.ttf'),
    });
    if (!fontsLoaded) {        
        return null;     
    }   
    

    function onSignIn() {
        console.log('Onsign', username, password)

        const failUsername = !username
        if (failUsername) {
            setUsernameError('UserName not provided')
        }
    
        const failPassword = !password
        if (failPassword) {
            setpasswordError('Password not provided')
        }
    
        if (failUsername || failPassword) {
            return
        }      
        

        api({
            method: 'POST',     
            url: "api/signin/",       
            data: {
                username: username,
                password: password
            }            
        })
        .then(response => {
            utils.log('Sign in', response.data)
        })
        .catch(error => {
            console.log(error)
            if (error.response) {               
                console.log(error.response.data);              
              } else if (error.request) {               
                console.log(error.request);
              } else {               
                console.log('Error', error.message);
              }
        })
    }

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
                <Title text='RealtimeChat' color='#202020' />

                <Input title='Username' value={username} setValue={setUsername} error={usernameError} setError={setUsernameError}/>
                <Input secureTextEntry={true} title='Password' value={password} setValue={setpassword} error={passwordError} setError={setpasswordError}/>

                {/* <Button title='Sign in' /> */}
                <Button title='Sign in' onPress ={onSignIn}/>

                <Text style ={{textAlign: 'center', marginTop: 40}}>
                    У Вас нету аккаунта? <Text style={{color: 'blue'}} onPress={()=>{navigation.navigate('SignUp')}}>Sign Up</Text>

                </Text>
               
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignInScreen;