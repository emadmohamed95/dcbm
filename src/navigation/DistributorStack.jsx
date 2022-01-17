import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Distributor } from '../screens/Distributor/Distributor';
import { Adddistributor } from '../screens/Distributor/AddDistributor';
const Stack = createStackNavigator();

export const DistributorStack = () => {
    return (
        <Stack.Navigator initialRouteName="Distributors" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Distributors" component={Distributor} />
            <Stack.Screen name="AddDistributor" component={Adddistributor} />
        </Stack.Navigator>
    )
}
