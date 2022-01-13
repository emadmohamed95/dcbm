import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from '../Components/CustomNavigationBar';
import Home from '../screens/Home/Home';
import { Login } from '../screens/Login/Login';
import { HomeDrawerNavigator } from './HomeDrawerNavigatior';
import { useSelector } from 'react-redux';
const Stack = createStackNavigator();



export const AuthStackNavigatior = () => {
    const auth = useSelector(state => state.auth)
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}
        >

            {auth.isAuthenticated ?
              <>
              <Stack.Screen name="Home" component={HomeDrawerNavigator} />
            </>
              :
              <>
                <Stack.Screen name="Login" component={Login} />
              </>
            }
          </Stack.Navigator>
    )
}
