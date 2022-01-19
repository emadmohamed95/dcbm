import React, { useState } from 'react';

import { Appbar, Menu, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';
import { useDrawerStatus } from '@react-navigation/drawer';


export const CustomNavigationBar = ({ navigation, back }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const isDrawerOpen = useDrawerStatus() === 'open';


  return (
    <Appbar.Header style={styles.header}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      {!isDrawerOpen ? <IconButton
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
        />}
      <Appbar.Content title="DCB" />
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