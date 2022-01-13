import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Admin } from '../screens/Admin/Admin';
import { AddAdmin } from '../screens/Admin/AddAdmin';
const Stack = createStackNavigator();

export const AdminStack = () => {
    return (
        <Stack.Navigator initialRouteName="Admins" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Admins" component={Admin} />
            <Stack.Screen name="AddAdmin" component={AddAdmin} />
        </Stack.Navigator>
    )
}
