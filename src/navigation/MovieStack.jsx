import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Movie } from '../screens/Movie/Movie';
import { Addmovie } from '../screens/Movie/AddMovie';
import { Addmovieversion } from '../screens/Movie/AddMovieVersion';
import { CustomNavigationBar } from '../Components/CustomNavigationBar';
const Stack = createStackNavigator();

export const MovieStack = () => {
    return (
        <Stack.Navigator initialRouteName="Movies" screenOptions={{ header: (props) => <CustomNavigationBar {...props} />, title:"Movies" }}>
            <Stack.Screen name="Movies" component={Movie} />
            <Stack.Screen name="AddMovie" component={Addmovie} />
            <Stack.Screen name="AddMovieVersion" component={Addmovieversion} />

        </Stack.Navigator>
    )
}
