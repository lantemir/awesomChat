
import { useLayoutEffect } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Title from "../common/Title";
import { useFonts } from 'expo-font';
import Input from "../common/Input";
import Button from "../common/Button";




function SignInScreen ({navigation}) {

    const [fontsLoaded] = useFonts({
        'LeckerliOne-Regular': require('../assets/fonts/LeckerliOne-Regular.ttf'),
    });
    if (!fontsLoaded) {        
        return null;     
    }


    useLayoutEffect(() =>{
        navigation.setOptions(
            {
                headerShown: false
            }
        )
    },[])

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
                <Title text='RealtimeChat' color='#202020' />

                <Input title='Username'/>
                <Input title='Password'/>

                <Button title='Sign in' />

                <Text style ={{textAlign: 'center', marginTop: 40}}>
                    У Вас нету аккаунта? <Text style={{color: 'blue'}} onPress={()=>{navigation.navigate('SignUp')}}>Sign Up</Text>

                </Text>
               
            </View>
        </SafeAreaView>
    )
}

export default SignInScreen;