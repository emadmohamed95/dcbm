import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home/Home';
import { Profile } from '../screens/Profile/Profile';
import { Admin } from '../screens/Admin/Admin';
import { CustomDrawer } from '../Components/CustomDrawer';
import { CustomNavigationBar } from '../Components/CustomNavigationBar';
import { AdminStack } from './AdminStack';
import { DistributorStack } from './DistributorStack';
import { ProducerStack } from './ProducerStack';
import { CountryStack } from './CountryStack';
import { CinemaStack } from './CinemaStack';
import { MovieStack } from './MovieStack';
import { DistributionStack } from './DistributionStack';
import { HistoryStack } from './HistoryStack';
import { ProfileStack } from './ProfileStack';
import { Notification } from '../screens/Notificatiion/Notification';
import { useSelector } from 'react-redux';
import { Loading } from '../screens/Loading/Loading';
import { NotificationStack } from './NotificationStack';

const Drawer = createDrawerNavigator();

export const HomeDrawerNavigator = () => {
    const isLoading = useSelector(state => state.loading.isLoading)
    const user = useSelector(state => state.auth.user)
    // console.log(isLoading)

    return (<>
    
        {/* {!isLoading? */}
        <Drawer.Navigator backBehavior='none' screenOptions={{
            // header: (props) => <CustomNavigationBar back {...props} />,
            headerShown:false,
            drawerActiveTintColor:'#005374'
        }} initialRouteName="Home" drawerContent={(props) => <CustomDrawer {...props} />}>

            {user?.type.name == "SystemAdmin" ?
                <Drawer.Screen name="Admins" component={AdminStack} />
                : <></>}


            {user?.type.name == "Admin" ?
                <>
                    <Drawer.Screen name="Distributors" component={DistributorStack} />
                    <Drawer.Screen name="Producers" component={ProducerStack} />
                    <Drawer.Screen name="Countries" component={CountryStack} />
                    <Drawer.Screen name="Cinemas" component={CinemaStack} />
                    <Drawer.Screen name="Movies" component={MovieStack} />
                </>
                : <></>}

            {user?.type.name == "Distributor" ? <>
                <Drawer.Screen name="Movies" component={DistributionStack} />
                <Drawer.Screen name="History" component={HistoryStack} />
            </>
                : <></>}
            <Drawer.Screen name="Profile" component={ProfileStack} />
            <Drawer.Screen name="Notifications" component={NotificationStack}/>
            {/* <Drawer.Screen name="Loading" component={Loading} /> */}


        </Drawer.Navigator>
        {/* :<></>} */}
        </>
    )
}
