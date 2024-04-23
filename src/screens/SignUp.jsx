import { useLayoutEffect, useState } from "react";
import { SafeAreaView, Text, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";
import Input from "../common/Input";
import Button from "../common/Button";
import api from "../core/api";
import utils from "../core/utils";

function SignUpScreen ({navigation}) {

    const [username, setUsername] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password1, setpassword1] = useState('')
    const [password2, setpassword2] = useState('')


    const [usernameError, setUsernameError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [password1Error, setPassword1Error] = useState('')
    const [password2Error, setPassword2Error] = useState('')

    useLayoutEffect(() =>{
        navigation.setOptions({
                headerShown: false
            })
    },[])

    const onSignUp = () => {

        const failUsername = !username || username.length < 5
        if (failUsername) {
            setUsernameError('Username must be > 5 charecters')
        }

        const failFirstName = !firstName 
        if (failFirstName) {
            setFirstNameError('First name was not provided')
        }

        const failLastName = !lastName 
        if (failLastName) {
            setLastNameError('Last name was not provided')
        }

        const failPassword1 = !password1 || password1.length < 8
        if (failPassword1) {
            setPassword1Error('Password is too short')
        }

        const failPassword2 = password1 !== password2 
        if (failPassword2) {
            setPassword2Error('Password1 don\'t match')
        }

        if(failUsername, failFirstName, failLastName, failPassword1, failPassword2){
            return 
        }

        api({
            method: 'POST',     
            url: "api/signup/",       
            data: {
                username: username,
                first_name: firstName,
                last_name: lastName,
                password: password1  
            }            
        })
        .then(response => {
            utils.log('Sign up', response.data)
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
        <SafeAreaView style={{flex: 1}}> 
        <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           <View style={{flex:1, justifyContent: 'center', paddingHorizontal: 16}}>
                <Text style={{textAlign:'center', marginBottom: 24, fontSize:36, fontWeight: 'bold'}}>
                    Sign Up
                </Text>
                <Input title='Username' value={username} error={usernameError} setValue={setUsername} setError={setUsernameError}/>
                <Input title='First Name' value={firstName} error={firstNameError} setValue={setfirstName} setError={setFirstNameError}/>
                <Input title='Last Name' value={lastName} error={lastNameError} setValue={setLastName} setError={setLastNameError} />
                <Input title='Password' value={password1} error={password1Error} setValue={setpassword1} setError={setPassword1Error} secureTextEntry={true}/>
                <Input title='Retype Password' value={password2} error={password2Error} setValue={setpassword2} setError={setPassword2Error} secureTextEntry={true}/>

                <Button title='Sign Up' onPress={onSignUp}/>

                <Text style ={{textAlign: 'center', marginTop: 40}}>
                    У Вас есть аккаунта? <Text style={{color: 'blue'}} onPress={()=>navigation.goBack()}>Sign In</Text>

                </Text>
                

           </View>
           </TouchableWithoutFeedback>
           </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUpScreen;