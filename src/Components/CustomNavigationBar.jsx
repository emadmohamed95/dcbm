import React, { useEffect, useState } from 'react';

import { Appbar, Menu, IconButton, Badge } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';
import { useDrawerStatus } from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';



export const CustomNavigationBar = ({ navigation, back ,route, options}) => {
  const [visible, setVisible] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const title = getHeaderTitle(options, route.name);

  useEffect(() => {
    if (user) {
      setUnreadNotifications(user.notifications.filter(notification => !notification.isRead).length)
    }
  }, [user])

  const isDrawerOpen = useDrawerStatus() === 'open';

  console.log(navigation.canGoBack())

  return (
    <Appbar.Header style={styles.header}>
      {navigation.canGoBack() ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      {/* <Appbar.BackAction onPress={navigation.goBack} /> */}
      {!navigation.canGoBack()?!isDrawerOpen ? <IconButton
        icon="menu"
        color={'white'}
        // size={20}
        onPress={() => navigation.toggleDrawer()}
      /> :

        <IconButton
          icon="menu-open"
          color={'white'}
          // size={20}
          onPress={() => navigation.toggleDrawer()}
        />:null}
      <Appbar.Content title={title} />

      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <IconButton
          icon="bell"
          color={'white'}
          // size={20}
          onPress={() => navigation.navigate('Notifications')}
        />
        <Badge  style={{
          position: 'absolute',
          top: 0,
          right: 0

        }} visible={unreadNotifications>0}>{unreadNotifications}</Badge>
      </View>

      {/* {!isDrawerOpen ? <IconButton
        icon="bell"
        color={'white'}
        // size={20}
        onPress={() => navigation.navigate('Notifications')}
      /> :

        <IconButton
          icon="bell"
          color={'white'}
          // size={20}
          onPress={() => navigation.toggleDrawer()}
        />} */}
      {/* {isAuthenticated ? (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action icon="menu" color="white" onPress={openMenu} />
            }>
            <Menu.Item onPress={() => navigation.navigate('Home')} title="Home" />
            <Menu.Item onPress={() => navigation.navigate('Profile')} title="Profile" />
            <Menu.Item onPress={() => {dispatch(logout())}} title="Logout" />
          </Menu>
        ) : null} */}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#005374'
  },


});