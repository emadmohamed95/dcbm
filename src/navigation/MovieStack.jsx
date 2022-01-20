import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Movie } from '../screens/Movie/Movie';
import { Addmovie } from '../screens/Movie/AddMovie';
import { Addmovieversion } from '../screens/Movie/AddMovieVersion';
const Stack = createStackNavigator();

export const MovieStack = () => {
    return (
        <Stack.Navigator initialRouteName="Movies" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Movies" component={Movie} />
            <Stack.Screen name="AddMovie" component={Addmovie} />
            <Stack.Screen name="AddMovieVersion" component={Addmovieversion} />

        </Stack.Navigator>
    )
}
