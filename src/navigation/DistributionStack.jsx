import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { DistributorMovie } from '../screens/Distribution/DistributorMovie';
import { AssignMovie } from '../screens/Distribution/AssignMovie';
import { MovieKDMs } from '../screens/Distribution/MovieKDMs';
import { CustomNavigationBar } from '../Components/CustomNavigationBar';

const Stack = createStackNavigator();

export const DistributionStack = () => {
    return (
        <Stack.Navigator initialRouteName="DistributorMovies" screenOptions={{ header: (props) => <CustomNavigationBar {...props} />, title:"Movies" }}>
            <Stack.Screen name="DistributorMovies" component={DistributorMovie} />
            <Stack.Screen name="AssignMovie" component={AssignMovie} />
            <Stack.Screen name="MovieKDMS" component={MovieKDMs} />
            {/* <Stack.Screen name="AddMovieVersion" component={Addmovieversion} /> */}

        </Stack.Navigator>
    )
}
