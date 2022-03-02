import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Admin } from '../screens/Admin/Admin';
import { AddAdmin } from '../screens/Admin/AddAdmin';
import { CustomNavigationBar } from '../Components/CustomNavigationBar';
const Stack = createStackNavigator();

export const AdminStack = () => {
    return (
        <Stack.Navigator initialRouteName="Admins" screenOptions={{ header: (props) => <CustomNavigationBar {...props} />, title:"Admin" }}>
            <Stack.Screen name="Admins" component={Admin} />
            <Stack.Screen name="AddAdmin" component={AddAdmin} />
        </Stack.Navigator>
    )
}
