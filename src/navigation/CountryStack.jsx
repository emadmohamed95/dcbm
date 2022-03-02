import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Country } from '../screens/Country/Country';
import { Addcountry } from '../screens/Country/AddCountry';
import { CustomNavigationBar } from '../Components/CustomNavigationBar';
const Stack = createStackNavigator();

export const CountryStack = () => {
    return (
        <Stack.Navigator initialRouteName="Countries" screenOptions={{ header: (props) => <CustomNavigationBar {...props} />, title:"Countries" }}>
            <Stack.Screen name="Countries" component={Country} />
            <Stack.Screen name="AddCountry" component={Addcountry} />
        </Stack.Navigator>
    )
}
