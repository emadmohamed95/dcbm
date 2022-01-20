import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { DistributorMovie } from '../screens/Distribution/DistributorMovie';
import { AssignMovie } from '../screens/Distribution/AssignMovie';

const Stack = createStackNavigator();

export const DistributionStack = () => {
    return (
        <Stack.Navigator initialRouteName="DistributorMovies" screenOptions={{headerShown:false}}>
            <Stack.Screen name="DistributorMovies" component={DistributorMovie} />
            <Stack.Screen name="AssignMovie" component={AssignMovie} />
            {/* <Stack.Screen name="AddMovieVersion" component={Addmovieversion} /> */}

        </Stack.Navigator>
    )
}
