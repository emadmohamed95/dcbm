import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Producer } from '../screens/Producer/Producer';
import { AddProducer } from '../screens/Producer/AddProducer';
import { CustomNavigationBar } from '../Components/CustomNavigationBar';
const Stack = createStackNavigator();

export const ProducerStack = () => {
    return (
        <Stack.Navigator initialRouteName="Producers" screenOptions={{ header: (props) => <CustomNavigationBar {...props} />, title:"Producers" }}>
            <Stack.Screen name="Producers" component={Producer} />
            <Stack.Screen name="AddProducer" component={AddProducer} />
        </Stack.Navigator>
    )
}
