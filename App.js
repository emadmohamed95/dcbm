/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { Provider, useDispatch } from "react-redux";
import { store, persistor } from "./src/store/index.js";
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { loadUser } from './src/actions/authActions.js';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
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

  // console.log(auth)


  return (
        <NavigationContainer>
          <AuthStackNavigatior/>
        </NavigationContainer>

  );
};

export default AppWrapper;
