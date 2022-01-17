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
import { loadUser } from './src/actions/authActions.js';
import { Admin } from './src/screens/Admin/Admin.jsx';
import { CustomNavigationBar } from './src/Components/CustomNavigationBar.jsx';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import { Profile } from './src/screens/Profile/Profile.jsx';
import { AuthStackNavigatior } from './src/navigation/AuthStackNavigatior.jsx';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#005374',
    accent: '#f1c40f',
  },
};

const AppWrapper = () => {

  return (
<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <PaperProvider theme={theme}>
      <App />
      </PaperProvider>
      </PersistGate>
    </Provider>  )
}


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
          <AuthStackNavigatior/>
          {/* <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>

            {auth.isAuthenticated ?
              <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Admins" component={Admin} />
              <Stack.Screen name="Profile" component={Profile} />

            </>
              :
              <>
                <Stack.Screen name="Login" component={Login} />
              </>
            }
          </Stack.Navigator> */}

        </NavigationContainer>
    //   </PersistGate>
    // </Provider>

  );
};

export default AppWrapper;
