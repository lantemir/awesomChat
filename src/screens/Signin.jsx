
import { useLayoutEffect, useState } from "react";
import { Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, KeyboardAvoidingView } from "react-native";
import Title from "../common/Title";
import { useFonts } from 'expo-font';
import Input from "../common/Input";
import Button from "../common/Button";
import api from "../core/api";

import  utils from '../core/utils'; 
import useGlobal from "../core/global";




function SignInScreen ({navigation}) {

    const [username, setUsername] = useState('')
    const [password, setpassword] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setpasswordError] = useState('')

    const login = useGlobal(state => state.login)
 
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

        const failUsername = !username
        if (failUsername) {
            setUsernameError('Имя пользователя не указано')
        }
    
        const failPassword = !password
        if (failPassword) {
            setpasswordError('Пароль не указан')
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
            const credentials = {
                username: username,
                password: password
            }
     
            login(
                credentials, 
                response.data,
                response.data.tokens
            )
        })
        .catch(error => {
            console.log("sign in", error)
            if (error.response) {               
                console.log(error.response.data);
                
                if(error.response.status === 401) {
                    setpasswordError("Неверный логин или пароль")
                    setUsernameError("Неверный логин или пароль")
                } else {
                    setUsernameError("Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.")
                }

              } else if (error.request) {               
                console.log(error.request);
                setUsernameError("Не удалось подключиться к серверу. Пожалуйста, проверьте ваше соединение.")
              } else {               
                console.log('Error', error.message);
                setUsernameError("Произошла ошибка. Пожалуйста, попробуйте еще раз.")
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