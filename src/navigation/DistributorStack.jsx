import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Distributor } from '../screens/Distributor/Distributor';
import { Adddistributor } from '../screens/Distributor/AddDistributor';
import { CustomNavigationBar } from '../Components/CustomNavigationBar';
const Stack = createStackNavigator();

export const DistributorStack = () => {
    return (
        <Stack.Navigator initialRouteName="Distributors" screenOptions={{ header: (props) => <CustomNavigationBar {...props} />, title:"Distributors" }}>
            <Stack.Screen name="Distributors" component={Distributor} />
            <Stack.Screen name="AddDistributor" component={Adddistributor} />
        </Stack.Navigator>
    )
}
