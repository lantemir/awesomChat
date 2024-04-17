import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import './src/core/fontawesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/Splash';
import SignUpScreen from './src/screens/SignUp';
import SignInScreen from './src/screens/Signin';
import HomeScreen from './src/screens/Home';
import SearchScreen from './src/screens/Search';
import MessageScreen from './src/screens/Message';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {

  const [initialized] = useState(true)
  const [authenticated] = useState(true)

  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content' />
      <Stack.Navigator>
        {!initialized ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
          </>
        ) : !authenticated ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Messages" component={MessageScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
