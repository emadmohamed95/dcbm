import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Cinema } from '../screens/Cinema/Cinema';
import { Addcinema } from '../screens/Cinema/AddCinema';
import { AddScreen } from '../screens/Cinema/AddScreen';
const Stack = createStackNavigator();

export const CinemaStack = () => {
    return (
        <Stack.Navigator initialRouteName="Cinemas" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Cinemas" component={Cinema} />
            <Stack.Screen name="AddCinema" component={Addcinema} />
            <Stack.Screen name="AddScreen" component={AddScreen} />

        </Stack.Navigator>
    )
}
