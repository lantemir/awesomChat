import { useLayoutEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Input from "../common/Input";
import Button from "../common/Button";

function SignUpScreen ({navigation}) {

    useLayoutEffect(() =>{
        navigation.setOptions({
                headerShown: false
            })
    },[])

    return(
        <SafeAreaView style={{flex: 1}}> 
           <View style={{flex:1, justifyContent: 'center', paddingHorizontal: 16}}>
                <Text style={{textAlign:'center', marginBottom: 24, fontSize:36, fontWeight: 'bold'}}>
                    Sign Up
                </Text>
                <Input title='Username' />
                <Input title='First Name' />
                <Input title='Last Name' />
                <Input title='Password' />
                <Input title='Retype Password' />

                <Button title='Sign Up' />

                <Text style ={{textAlign: 'center', marginTop: 40}}>
                    У Вас есть аккаунта? <Text style={{color: 'blue'}} onPress={()=>navigation.goBack()}>Sign In</Text>

                </Text>
                

           </View>
        </SafeAreaView>
    )
}

export default SignUpScreen;