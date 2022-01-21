import React from 'react'
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
const Drawer = createDrawerNavigator();
 
export const HomeDrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }} initialRouteName="Home" drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen name="Admins" component={AdminStack} />
            <Drawer.Screen name="Distributors" component={DistributorStack} />
            <Drawer.Screen name="Producers" component={ProducerStack} />
            <Drawer.Screen name="Countries" component={CountryStack} />
            <Drawer.Screen name="Cinemas" component={CinemaStack} />
            <Drawer.Screen name="Movies" component={MovieStack} />
            <Drawer.Screen name="DistributorMovies" component={DistributionStack} />
            <Drawer.Screen name="History" component={HistoryStack} />



            <Drawer.Screen name="Profile" component={ProfileStack} />
            <Drawer.Screen name="Notifications" component={Notification} />

        </Drawer.Navigator>
    )
}
