import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';


const Home = () => {
    const dispatch = useDispatch()
    return (
        <View
            style={styles.div}>
            <Text style={styles.text}>Hello, world!</Text>
            <Button onPress={e=>{
                dispatch(logout())
            }} title="Logout" />

        </View>
    )

    
}

const styles = StyleSheet.create({
    div: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    text: {
      color: 'red'
    }
  });

  export default Home;