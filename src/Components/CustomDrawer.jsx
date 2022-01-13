import React, { useState } from 'react';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';
// import { View } from 'react-native';
import { IconButton, Button } from 'react-native-paper';


export function CustomDrawer(props) {
    const dispatch = useDispatch()

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {/* <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://google.com')}
      /> */}

            {/* <View > */}
                <Button icon="logout" mode="text" color='red' onPress={() => {dispatch(logout())}}>
                    Logout
                </Button>            
                {/* </View> */}

        </DrawerContentScrollView>
    );
}