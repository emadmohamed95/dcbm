/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch } from "react-redux";
import { store, persistor } from "./src/store/index.js";
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector } from 'react-redux';
import { Login } from './src/screens/Login/Login.jsx';
import Home from './src/screens/Home/Home.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { loadUser } from './src/actions/authActions.js';



const AppWrapper = () => {

  return (
<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>  )
}

const Stack = createNativeStackNavigator();

const App = () => {

  const auth = useSelector(state => state.auth)
const dispatch = useDispatch()

  useEffect(() => {
   dispatch(loadUser())
  }, [])

  console.log(auth)


  return (

    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>

        <NavigationContainer>
          <Stack.Navigator>

            {auth.isAuthenticated ?
              <>
              <Stack.Screen name="Home" component={Home} />
            </>
              :
              <>
                <Stack.Screen name="Login" component={Login} />
              </>
            }
          </Stack.Navigator>

        </NavigationContainer>
    //   </PersistGate>
    // </Provider>

  );
};

export default AppWrapper;
