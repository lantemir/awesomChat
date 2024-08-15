import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, AppState } from 'react-native';

import './src/core/fontawesome';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/Splash';
import SignUpScreen from './src/screens/SignUp';
import SignInScreen from './src/screens/Signin';
import HomeScreen from './src/screens/Home';
import SearchScreen from './src/screens/Search';
import MessageScreen from './src/screens/Message';
import { useEffect, useState } from 'react';

import useGlobal from './src/core/global';

const LightTheme  ={
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
}

const Stack = createNativeStackNavigator();

export default function App() {

  // const [initialized] = useState(true)
  //const [authenticated] = useState(false)


  const initialized = useGlobal( state => state.initialized )
  const authenticated = useGlobal( state => state.authenticated)

  const init = useGlobal(state => state.init)

  const socketConnect = useGlobal(state => state.socketConnect)
  const socketClose = useGlobal(state => state.socketClose)

  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    init();

    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // Приложение снова активно - подключаемся к WebSocket
        socketConnect();
      } else if (nextAppState.match(/inactive|background/)) {
        // Приложение уходит в фон или становится неактивным - отключаемся от WebSocket
        socketClose();
      }
      setAppState(nextAppState)
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    }

  }, [appState])

  return (
    <NavigationContainer theme={LightTheme}>
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
