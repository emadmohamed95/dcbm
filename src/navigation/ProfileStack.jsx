import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '../screens/Profile/Profile';
import { ChangePassword } from '../screens/Profile/ChangePassword';
import { CustomNavigationBar } from '../Components/CustomNavigationBar';
const Stack = createStackNavigator();

export const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={{ header: (props) => <CustomNavigationBar {...props} />, title:"Profile" }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
    )
}
