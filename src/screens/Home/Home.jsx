import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authActions';
import { Dimensions } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { Admin } from '../Admin/Admin';
import { Profile } from '../Profile/Profile';
// const Drawer = createDrawerNavigator();


const Tile = ({ name, iconName, onpress}) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onpress}
    >
      {/* <Image
                style={styles.itemIcon}
                source="..."
              /> */}
      <Text style={styles.itemTitle}>
        {name}
      </Text>
    </TouchableOpacity>
  )

}

const Home = ({navigation}) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)
  // function DrawerContent() {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <Text>Drawer content</Text>
  //     </View>
  //   );
  // }

  return (
    <>
    
    
    <ScrollView>
    {/* <Drawer.Navigator initialRouteName="Home" drawerContent={() => <DrawerContent />} >
        <Drawer.Screen name="Admin" component={Admin} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator> */}
      <View style={styles.div}>

        {/* <Text style={styles.text}>Hello, world!</Text> */}
        {/* <Button onPress={e=>{
                dispatch(logout())
            }} title="Logout" /> */}

        {/* <View style={styles.link}><Text style={styles.text}>Users</Text></View> */}
        {user.type.name == "SystemAdmin" ?
          <Tile name={"Admins"} onpress={() => navigation.navigate('Admins')}></Tile>
          : user.type.name == "Admin" ?

            <><Tile name={"Distributors"}></Tile>
              <Tile name={"Countries"}></Tile>
              <Tile name={"Cinemas"}></Tile>
              <Tile name={"Screens"}></Tile>
              <Tile name={"Producers"}></Tile>
              <Tile name={"Movies"}></Tile>
              <Tile name={"Distributors Actions Report"}></Tile></>
            :
            <><Tile name={"Distribute Movies"}></Tile>
              <Tile name={"History"}></Tile></>
        }
      </View>
    </ScrollView>
    </>
  )


}

const styles = StyleSheet.create({
  div: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  text: {
    color: 'white'
  },
  item: {
    width: Dimensions.get('window').width * 0.5,
    height: 100,
    borderWidth: 1,
    borderColor: "#005374",
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  itemTitle: {
    // marginTop: 16,
    color: "#005374",
  },

});

export default Home;