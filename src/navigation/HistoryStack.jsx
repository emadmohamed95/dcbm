import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { History } from '../screens/History/History';
import { RedistributeMovie } from '../screens/History/RedistributeMovie';
import { CustomNavigationBar } from '../Components/CustomNavigationBar';


const Stack = createStackNavigator();

export const HistoryStack = () => {
    return (
        <Stack.Navigator initialRouteName="History" screenOptions={{ header: (props) => <CustomNavigationBar {...props} />, title:"History" }}>
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="RedistributeMovie" component={RedistributeMovie} />
            {/* <Stack.Screen name="AddMovieVersion" component={Addmovieversion} /> */}

        </Stack.Navigator>
    )
}
