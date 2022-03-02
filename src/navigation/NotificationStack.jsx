import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { CustomNavigationBar } from '../Components/CustomNavigationBar';
import { Notification } from '../screens/Notificatiion/Notification';
const Stack = createStackNavigator();

export const NotificationStack = () => {
    return (
        <Stack.Navigator initialRouteName="Notifications" screenOptions={{ header: (props) => <CustomNavigationBar {...props} />, title:"Notifications" }}>
            <Stack.Screen name="Notifications" component={Notification} />
        </Stack.Navigator>
    )
}
