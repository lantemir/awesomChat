import  React, {useEffect, useLayoutEffect } from "react"
import { SafeAreaView, StatusBar, Text, View, Animated } from "react-native"
import { useFonts } from 'expo-font';
import Title from "../common/Title";

function SplashScreen ({navigation}) {

    useLayoutEffect(() =>{
        navigation.setOptions(
            {
                headerShown: false
            }
        )
    },[])

    const translateY = new Animated.Value(0)
    const duration = 800

    useEffect(()=> {
        Animated.loop(
        Animated.sequence([
        Animated.timing(translateY, {
            toValue: 20,
            duration: duration,
            useNativeDriver: true
        }),
        Animated.timing(translateY, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true
        })
    ])).start()
    }, [])

    const [fontsLoaded] = useFonts({
        'LeckerliOne-Regular': require('../assets/fonts/LeckerliOne-Regular.ttf'),
    });

    if (!fontsLoaded) {
        // Шрифты еще не загружены      
        return null; // или что-то другое, например, индикатор загрузки
    
    }
    
    return (
        <SafeAreaView style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
            <StatusBar barStyle='light-content'/>
            <Animated.View style={[{transform: [{translateY}]}]}>            
                <Title text='RealTimeChat' color='white'/>
            </Animated.View>
        </SafeAreaView>

    )
}

export default SplashScreen